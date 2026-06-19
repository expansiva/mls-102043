/// <mls fileReference="_102043_/l1/cafeFlow/layer_3_usecases/consultarDashboardGerente.ts" enhancement="_blank"/>
import { type RequestContext } from '/_102034_/l1/server/layer_2_controllers/contracts.js';
import { MetricasEntity, type MetricasRecord } from '/_102043_/l1/cafeFlow/layer_4_entities/metricasEntity.js';

export interface ConsultarDashboardGerenteInput {}

export interface ConsultarDashboardGerenteOutput {
  metricas: MetricasRecord;
}

export async function consultarDashboardGerente(
  ctx: RequestContext,
  _input: ConsultarDashboardGerenteInput,
): Promise<ConsultarDashboardGerenteOutput> {
  const metricasId = 'current';
  const [dailySales, topSellingItems, lowStock] = await Promise.all([
    MetricasEntity.getById(ctx, { tableName: 'daily_sales_metrics', id: metricasId }),
    MetricasEntity.getById(ctx, { tableName: 'top_selling_items_metrics', id: metricasId }),
    MetricasEntity.getById(ctx, { tableName: 'low_stock_metrics', id: metricasId }),
  ]);

  const metricas: MetricasRecord = {
    dailySales,
    topSellingItems,
    lowStock,
  };

  return { metricas };
}
