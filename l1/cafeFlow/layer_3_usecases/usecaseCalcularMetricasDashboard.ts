/// <mls fileReference="_102043_/l1/cafeFlow/layer_3_usecases/usecaseCalcularMetricasDashboard.ts" enhancement="_blank" />
import { AppError, type RequestContext } from '/_102034_/l1/server/layer_2_controllers/contracts.js';

export interface OrderItemAggregate {
  menu_item_id: string;
  quantity: number;
}

export interface OrderAggregateRecord {
  order_id: string;
  order_date: string; // YYYY-MM-DD
  total_amount: number;
  items: OrderItemAggregate[];
}

export interface MenuItemRecord {
  menu_item_id: string;
  name: string;
}

export interface DailySalesMetricsRecord {
  metric_date: string; // YYYY-MM-DD
  total_sales: number;
  total_orders: number;
  updated_at: string;
}

export interface TopSellingItemsMetricsRecord {
  metric_date: string; // YYYY-MM-DD
  menu_item_id: string;
  total_quantity: number;
  updated_at: string;
}

export interface RefreshDailySalesMetricsInput {
  metricDate: string; // YYYY-MM-DD
}

export interface RefreshDailySalesMetricsOutput {
  metricDate: string;
  totalSales: number;
  totalOrders: number;
  updatedAt: string;
}

export interface RefreshTopSellingItemsMetricsInput {
  metricDate: string; // YYYY-MM-DD
  topN?: number;
}

export interface TopSellingItemMetric {
  menuItemId: string;
  totalQuantity: number;
}

export interface RefreshTopSellingItemsMetricsOutput {
  metricDate: string;
  items: TopSellingItemMetric[];
  updatedAt: string;
}

async function getOrderAggregateRepository(ctx: RequestContext) {
  return await ctx.data.moduleData.getTable<OrderAggregateRecord>('order_aggregate');
}

async function getMenuItemRepository(ctx: RequestContext) {
  return await ctx.data.moduleData.getTable<MenuItemRecord>('MenuItem');
}

async function getDailySalesMetricsRepository(ctx: RequestContext) {
  return await ctx.data.moduleData.getTable<DailySalesMetricsRecord>('daily_sales_metrics');
}

async function getTopSellingItemsMetricsRepository(ctx: RequestContext) {
  return await ctx.data.moduleData.getTable<TopSellingItemsMetricsRecord>('top_selling_items_metrics');
}

export async function refreshDailySalesMetrics(
  ctx: RequestContext,
  input: RefreshDailySalesMetricsInput,
): Promise<RefreshDailySalesMetricsOutput> {
  if (!input.metricDate) {
    throw new AppError('VALIDATION_ERROR', 'Metric date is required', 400, { field: 'metricDate' });
  }

  const orderRepo = await getOrderAggregateRepository(ctx);
  const metricsRepo = await getDailySalesMetricsRepository(ctx);

  const orders = await orderRepo.findMany({
    where: { order_date: input.metricDate },
  });

  const totalSales = orders.reduce((sum, order) => sum + (order.total_amount || 0), 0);
  const totalOrders = orders.length;
  const updatedAt = ctx.clock.nowIso();

  await metricsRepo.upsert({
    record: {
      metric_date: input.metricDate,
      total_sales: totalSales,
      total_orders: totalOrders,
      updated_at: updatedAt,
    },
  });

  return {
    metricDate: input.metricDate,
    totalSales,
    totalOrders,
    updatedAt,
  };
}

export async function refreshTopSellingItemsMetrics(
  ctx: RequestContext,
  input: RefreshTopSellingItemsMetricsInput,
): Promise<RefreshTopSellingItemsMetricsOutput> {
  if (!input.metricDate) {
    throw new AppError('VALIDATION_ERROR', 'Metric date is required', 400, { field: 'metricDate' });
  }

  const orderRepo = await getOrderAggregateRepository(ctx);
  const menuItemRepo = await getMenuItemRepository(ctx);
  const metricsRepo = await getTopSellingItemsMetricsRepository(ctx);

  const orders = await orderRepo.findMany({
    where: { order_date: input.metricDate },
  });

  const quantityByItem = new Map<string, number>();
  for (const order of orders) {
    for (const item of order.items || []) {
      const current = quantityByItem.get(item.menu_item_id) || 0;
      quantityByItem.set(item.menu_item_id, current + (item.quantity || 0));
    }
  }

  const menuItemIds = Array.from(quantityByItem.keys());
  if (menuItemIds.length > 0) {
    await menuItemRepo.findManyByValues({ field: 'menu_item_id', values: menuItemIds });
  }

  const topN = input.topN && input.topN > 0 ? input.topN : menuItemIds.length;
  const sortedItems = Array.from(quantityByItem.entries())
    .sort((a, b) => b[1] - a[1])
    .slice(0, topN);

  const updatedAt = ctx.clock.nowIso();

  for (const [menuItemId, totalQuantity] of sortedItems) {
    await metricsRepo.upsert({
      record: {
        metric_date: input.metricDate,
        menu_item_id: menuItemId,
        total_quantity: totalQuantity,
        updated_at: updatedAt,
      },
    });
  }

  return {
    metricDate: input.metricDate,
    items: sortedItems.map(([menuItemId, totalQuantity]) => ({
      menuItemId,
      totalQuantity,
    })),
    updatedAt,
  };
}
