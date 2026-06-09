/// <mls fileReference="_102043_/l1/cafeFlow/layer_3_usecases/usecaseGerarSugestoesPromocaoIA.ts" enhancement="_blank" />
import { AppError, type RequestContext } from '/_102034_/l1/server/layer_2_controllers/contracts.js';

// ===============================
// Table Record Types
// ===============================
export interface MenuItemRecord {
  menu_item_id: string;
  name: string;
  is_active: boolean;
  category?: string | null;
}

export interface TopSellingItemsMetricsRecord {
  menu_item_id: string;
  total_sold_7d: number;
  last_calculated_at?: string | null;
}

export interface SalesSummaryRecord {
  menu_item_id: string;
  sale_date: string; // ISO date
  sold_quantity: number;
}

export interface PromotionSuggestionRecord {
  suggestion_id: string;
  menu_item_id: string;
  reason: string;
  created_at: string;
  created_by: string;
}

// ===============================
// Usecase Input/Output Types
// ===============================
export interface AnalyzeSellingTrendsInput {
  limit?: number;
}

export interface SellingTrend {
  menuItemId: string;
  menuItemName: string;
  totalSold7d: number;
}

export interface AnalyzeSellingTrendsOutput {
  trends: SellingTrend[];
}

export interface CreatePromotionSuggestionInput {
  menuItemId: string;
  reason: string;
}

export interface CreatePromotionSuggestionOutput {
  suggestionId: string;
  createdAt: string;
}

// ===============================
// Table Access Helpers
// ===============================
async function getMenuItemRepository(ctx: RequestContext) {
  return await ctx.data.moduleData.getTable<MenuItemRecord>('MenuItem');
}

async function getTopSellingMetricsRepository(ctx: RequestContext) {
  return await ctx.data.moduleData.getTable<TopSellingItemsMetricsRecord>('top_selling_items_metrics');
}

async function getSalesSummaryRepository(ctx: RequestContext) {
  return await ctx.data.moduleData.getTable<SalesSummaryRecord>('sales_summary');
}

async function getPromotionSuggestionRepository(ctx: RequestContext) {
  return await ctx.data.moduleData.getTable<PromotionSuggestionRecord>('promotion_suggestion');
}

// ===============================
// Usecase Functions
// ===============================
export async function analyzeSellingTrends(
  ctx: RequestContext,
  input: AnalyzeSellingTrendsInput,
): Promise<AnalyzeSellingTrendsOutput> {
  const limit = input.limit ?? 10;
  if (limit <= 0) {
    throw new AppError('VALIDATION_ERROR', 'Limit must be greater than zero', 400, { field: 'limit' });
  }

  const metricsRepo = await getTopSellingMetricsRepository(ctx);
  const menuRepo = await getMenuItemRepository(ctx);
  const salesRepo = await getSalesSummaryRepository(ctx);

  let metrics = await metricsRepo.findMany();

  if (metrics.length === 0) {
    const now = new Date(ctx.clock.nowIso());
    const sevenDaysAgo = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);

    const sales = await salesRepo.findMany();
    const filtered = sales.filter((row) => {
      const saleDate = new Date(row.sale_date);
      return saleDate >= sevenDaysAgo && saleDate <= now;
    });

    const totals = new Map<string, number>();
    for (const row of filtered) {
      const prev = totals.get(row.menu_item_id) ?? 0;
      totals.set(row.menu_item_id, prev + row.sold_quantity);
    }

    metrics = Array.from(totals.entries()).map(([menu_item_id, total_sold_7d]) => ({
      menu_item_id,
      total_sold_7d,
      last_calculated_at: ctx.clock.nowIso(),
    }));
  }

  if (metrics.length === 0) {
    return { trends: [] };
  }

  const sorted = metrics
    .slice()
    .sort((a, b) => b.total_sold_7d - a.total_sold_7d)
    .slice(0, limit);

  const menuItemIds = sorted.map((m) => m.menu_item_id);
  const menuItems = await menuRepo.findManyByValues({ field: 'menu_item_id', values: menuItemIds });
  const menuMap = new Map(menuItems.map((m) => [m.menu_item_id, m]));

  const trends: SellingTrend[] = sorted.map((m) => {
    const item = menuMap.get(m.menu_item_id);
    return {
      menuItemId: m.menu_item_id,
      menuItemName: item?.name ?? 'Item desconhecido',
      totalSold7d: m.total_sold_7d,
    };
  });

  return { trends };
}

export async function createPromotionSuggestion(
  ctx: RequestContext,
  input: CreatePromotionSuggestionInput,
): Promise<CreatePromotionSuggestionOutput> {
  if (!input.menuItemId) {
    throw new AppError('VALIDATION_ERROR', 'menuItemId is required', 400, { field: 'menuItemId' });
  }
  if (!input.reason) {
    throw new AppError('VALIDATION_ERROR', 'reason is required', 400, { field: 'reason' });
  }

  const menuRepo = await getMenuItemRepository(ctx);
  const suggestionRepo = await getPromotionSuggestionRepository(ctx);

  const menuItem = await menuRepo.findOne({ where: { menu_item_id: input.menuItemId } });
  if (!menuItem) {
    throw new AppError('NOT_FOUND', 'Menu item not found', 404, { menuItemId: input.menuItemId });
  }
  if (!menuItem.is_active) {
    throw new AppError('CONFLICT', 'Menu item is inactive', 409, { menuItemId: input.menuItemId });
  }

  const suggestionId = ctx.idGenerator.newId();
  const createdAt = ctx.clock.nowIso();

  await suggestionRepo.insert({
    record: {
      suggestion_id: suggestionId,
      menu_item_id: input.menuItemId,
      reason: input.reason,
      created_at: createdAt,
      created_by: 'assistenteIA',
    },
  });

  return { suggestionId, createdAt };
}
