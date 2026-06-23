/// <mls fileReference="_102043_/l1/cafeFlow/layer_3_usecases/consultarDashboardGerente.ts" enhancement="_blank"/>
import { type RequestContext } from '/_102034_/l1/server/layer_2_controllers/contracts.js';
import {
  MetricasEntity,
  type DailySalesMetricsRecord,
  type TopSellingItemsMetricsRecord,
  type LowStockMetricsRecord,
} from '/_102043_/l1/cafeFlow/layer_4_entities/metricasEntity.js';

export interface ConsultarDashboardGerenteInput {}

export interface ConsultarDashboardGerenteResult {
  metricas: {
    dailySalesMetrics: DailySalesMetricsRecord;
    topSellingItemsMetrics: TopSellingItemsMetricsRecord;
    lowStockMetrics: LowStockMetricsRecord;
  };
}

export async function consultarDashboardGerente(
  ctx: RequestContext,
  _input: ConsultarDashboardGerenteInput,
): Promise<ConsultarDashboardGerenteResult> {
  const [dailySalesMetrics, topSellingItemsMetrics, lowStockMetrics] = await Promise.all([
    MetricasEntity.getById(ctx, { tableName: 'daily_sales_metrics', key: {} }),
    MetricasEntity.getById(ctx, { tableName: 'top_selling_items_metrics', key: {} }),
    MetricasEntity.getById(ctx, { tableName: 'low_stock_metrics', key: {} }),
  ]);

  return {
    metricas: {
      dailySalesMetrics: dailySalesMetrics as DailySalesMetricsRecord,
      topSellingItemsMetrics: topSellingItemsMetrics as TopSellingItemsMetricsRecord,
      lowStockMetrics: lowStockMetrics as LowStockMetricsRecord,
    },
  };
}
