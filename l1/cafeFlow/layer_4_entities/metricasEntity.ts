/// <mls fileReference="_102043_/l1/cafeFlow/layer_4_entities/metricasEntity.ts" enhancement="_blank"/>
import { AppError, type RequestContext } from '/_102034_/l1/server/layer_2_controllers/contracts.js';
import type { IDataRuntime } from '/_102034_/l1/server/layer_1_external/data/runtime.js';

export type MetricasTableName = 'daily_sales_metrics' | 'top_selling_items_metrics' | 'low_stock_metrics';

export interface DailySalesMetricsRecord {
  [key: string]: unknown;
}

export interface TopSellingItemsMetricsRecord {
  [key: string]: unknown;
}

export interface LowStockMetricsRecord {
  [key: string]: unknown;
}

export type MetricasRecord = DailySalesMetricsRecord | TopSellingItemsMetricsRecord | LowStockMetricsRecord;

export interface GetMetricasByIdInput {
  tableName: MetricasTableName;
  id: string;
}

export interface UpdateMetricasInput {
  tableName: MetricasTableName;
  record: MetricasRecord;
}

export interface IMetricasEntity {
  getById(ctx: RequestContext, input: GetMetricasByIdInput, runtime?: IDataRuntime): Promise<MetricasRecord>;
  update(ctx: RequestContext, input: UpdateMetricasInput, runtime?: IDataRuntime): Promise<MetricasRecord>;
}

const resolveRepo = async (data: IDataRuntime, tableName: MetricasTableName) => {
  switch (tableName) {
    case 'daily_sales_metrics':
      return data.moduleData.getTable<DailySalesMetricsRecord>('daily_sales_metrics');
    case 'top_selling_items_metrics':
      return data.moduleData.getTable<TopSellingItemsMetricsRecord>('top_selling_items_metrics');
    case 'low_stock_metrics':
      return data.moduleData.getTable<LowStockMetricsRecord>('low_stock_metrics');
    default: {
      const _exhaustive: never = tableName;
      throw new AppError('INVALID_OPERATION', 'Tabela de métricas inválida.', 400, { tableName: _exhaustive });
    }
  }
};

export const MetricasEntity: IMetricasEntity = {
  async getById(ctx, input, runtime) {
    const data = runtime ?? ctx.data;
    const repo = await resolveRepo(data, input.tableName);
    const record = await repo.findOne({
      where: { id: input.id } as Partial<MetricasRecord>,
    });

    if (!record) {
      throw new AppError('NOT_FOUND', 'Métrica não encontrada.', 404, {
        id: input.id,
        tableName: input.tableName,
      });
    }

    return record;
  },

  async update(ctx, input, runtime) {
    const data = runtime ?? ctx.data;
    const repo = await resolveRepo(data, input.tableName);
    await repo.insert({ record: input.record as MetricasRecord });
    return input.record;
  },
};
