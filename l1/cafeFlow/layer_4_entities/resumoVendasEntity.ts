/// <mls fileReference="_102043_/l1/cafeFlow/layer_4_entities/resumoVendasEntity.ts" enhancement="_blank"/>
import { AppError, type RequestContext } from '/_102034_/l1/server/layer_2_controllers/contracts.js';
import type { IDataRuntime } from '/_102034_/l1/server/layer_1_external/data/runtime.js';

export interface ResumoVendasRecord {
  sales_summary_request_id: string;
  shift_report_id: string;
  created_at: string;
  updated_at: string;
}

export interface CreateResumoVendasInput {
  shiftReportId: string;
}

export interface ListResumoVendasFilter {
  shiftReportId?: string;
}

export interface IResumoVendasEntity {
  create(ctx: RequestContext, input: CreateResumoVendasInput, runtime?: IDataRuntime): Promise<ResumoVendasRecord>;
  getById(ctx: RequestContext, salesSummaryRequestId: string, runtime?: IDataRuntime): Promise<ResumoVendasRecord>;
  list(ctx: RequestContext, filter?: ListResumoVendasFilter, runtime?: IDataRuntime): Promise<ResumoVendasRecord[]>;
}

export const ResumoVendasEntity: IResumoVendasEntity = {
  async create(ctx, input, runtime) {
    const data = runtime ?? ctx.data;
    const repo = await data.moduleData.getTable<ResumoVendasRecord>('salesSummaryRequest');
    const now = ctx.clock.nowIso();
    const record: ResumoVendasRecord = {
      sales_summary_request_id: ctx.idGenerator.newId(),
      shift_report_id: input.shiftReportId,
      created_at: now,
      updated_at: now,
    };
    await repo.insert({ record });
    return record;
  },
  async getById(ctx, salesSummaryRequestId, runtime) {
    const data = runtime ?? ctx.data;
    const repo = await data.moduleData.getTable<ResumoVendasRecord>('salesSummaryRequest');
    const record = await repo.findOne({
      where: {
        sales_summary_request_id: salesSummaryRequestId,
      },
    });
    if (!record) {
      throw new AppError('NOT_FOUND', 'Resumo de vendas não encontrado.', 404, { id: salesSummaryRequestId });
    }
    return record;
  },
  async list(ctx, filter, runtime) {
    const data = runtime ?? ctx.data;
    const repo = await data.moduleData.getTable<ResumoVendasRecord>('salesSummaryRequest');
    const where: Partial<ResumoVendasRecord> = {};
    if (filter?.shiftReportId) {
      where.shift_report_id = filter.shiftReportId;
    }
    return repo.findMany({
      where,
      orderBy: {
        field: 'created_at',
        direction: 'desc',
      },
    });
  },
};
