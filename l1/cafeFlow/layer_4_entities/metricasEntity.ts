/// <mls fileReference="_102043_/l1/cafeFlow/layer_4_entities/metricasEntity.ts" enhancement="_blank"/>
import { AppError, type RequestContext } from '/_102034_/l1/server/layer_2_controllers/contracts.js';
import type { IDataRuntime } from '/_102034_/l1/server/layer_1_external/data/runtime.js';

export type DailySalesMetricsRecord = Record<string, unknown>;
export type TopSellingItemsMetricsRecord = Record<string, unknown>;
export type LowStockMetricsRecord = Record<string, unknown>;

export type MetricasMetricTableName = 'daily_sales_metrics' | 'top_selling_items_metrics' | 'low_stock_metrics';
export type MetricasMetricRecord = DailySalesMetricsRecord | TopSellingItemsMetricsRecord | LowStockMetricsRecord;

export interface MetricasGetByIdInput {
  tableName: MetricasMetricTableName;
  key: Record<string, unknown>;
}

export interface MetricasUpdateInput {
  tableName: MetricasMetricTableName;
  record: MetricasMetricRecord;
}

export interface IMetricasEntity {
  getById(ctx: RequestContext, input: MetricasGetByIdInput, runtime?: IDataRuntime): Promise<MetricasMetricRecord>;
  update(ctx: RequestContext, input: MetricasUpdateInput, runtime?: IDataRuntime): Promise<MetricasMetricRecord>;
}

const tableRepositoryMap = {
  daily_sales_metrics: async (data: IDataRuntime) => data.moduleData.getTable<DailySalesMetricsRecord>('daily_sales_metrics'),
  top_selling_items_metrics: async (data: IDataRuntime) =>
    data.moduleData.getTable<TopSellingItemsMetricsRecord>('top_selling_items_metrics'),
  low_stock_metrics: async (data: IDataRuntime) => data.moduleData.getTable<LowStockMetricsRecord>('low_stock_metrics'),
} as const;

async function getMetricasRepo(
  data: IDataRuntime,
  tableName: MetricasMetricTableName,
): Promise<Awaited<ReturnType<(typeof tableRepositoryMap)[MetricasMetricTableName]>>> {
  return tableRepositoryMap[tableName](data);
}

export const MetricasEntity: IMetricasEntity = {
  async getById(ctx, input, runtime) {
    const data = runtime ?? ctx.data;
    const repo = await getMetricasRepo(data, input.tableName);
    const record = await repo.findOne({ where: input.key as Partial<MetricasMetricRecord> });

    if (!record) {
      throw new AppError('NOT_FOUND', 'Metricas record not found', 404, {
        tableName: input.tableName,
        key: input.key,
      });
    }

    return record as MetricasMetricRecord;
  },
  async update(ctx, input, runtime) {
    const data = runtime ?? ctx.data;
    const repo = await getMetricasRepo(data, input.tableName);

    await repo.insert({ record: input.record as MetricasMetricRecord });

    return input.record;
  },
};
