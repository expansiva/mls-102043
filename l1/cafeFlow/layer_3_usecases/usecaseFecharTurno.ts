/// <mls fileReference="_102043_/l1/cafeFlow/layer_3_usecases/usecaseFecharTurno.ts" enhancement="_blank" />
import { AppError, type RequestContext } from '/_102034_/l1/server/layer_2_controllers/contracts.js';

export type DailyShiftStatus = 'aberto' | 'fechado' | 'cancelado';

export interface DailyShiftRecord {
  daily_shift_id: string;
  status: DailyShiftStatus;
  opened_at: string;
  closed_at?: string | null;
  closed_by?: string | null;
}

export interface OrderAggregateRecord {
  order_id: string;
  daily_shift_id: string;
  total_amount: number;
  created_at: string;
}

export interface SalesSummaryRecord {
  sales_summary_id: string;
  daily_shift_id: string;
  total_sales: number;
  order_count: number;
  created_at: string;
}

export interface DailySalesMetricsRecord {
  daily_sales_metrics_id: string;
  daily_shift_id: string;
  total_sales: number;
  order_count: number;
  created_at: string;
}

export interface CloseDailyShiftInput {
  dailyShiftId: string;
  closedByUserId: string;
}

export interface CloseDailyShiftOutput {
  dailyShiftId: string;
  status: DailyShiftStatus;
  closedAt: string;
}

export interface GenerateSalesSummaryInput {
  dailyShiftId: string;
}

export interface GenerateSalesSummaryOutput {
  salesSummaryId: string;
  dailyShiftId: string;
  totalSales: number;
  orderCount: number;
  createdAt: string;
}

async function getDailyShiftRepository(ctx: RequestContext) {
  return await ctx.data.moduleData.getTable<DailyShiftRecord>('DailyShift');
}

async function getOrderAggregateRepository(ctx: RequestContext) {
  return await ctx.data.moduleData.getTable<OrderAggregateRecord>('order_aggregate');
}

async function getSalesSummaryRepository(ctx: RequestContext) {
  return await ctx.data.moduleData.getTable<SalesSummaryRecord>('sales_summary');
}

async function getDailySalesMetricsRepository(ctx: RequestContext) {
  return await ctx.data.moduleData.getTable<DailySalesMetricsRecord>('daily_sales_metrics');
}

function assertShiftCloseRequired(input: CloseDailyShiftInput) {
  if (!input.dailyShiftId) {
    throw new AppError('VALIDATION_ERROR', 'dailyShiftId é obrigatório para fechar o turno.', 400, { field: 'dailyShiftId' });
  }
  if (!input.closedByUserId) {
    throw new AppError('VALIDATION_ERROR', 'closedByUserId é obrigatório para fechar o turno.', 400, { field: 'closedByUserId' });
  }
}

export async function closeDailyShift(
  ctx: RequestContext,
  input: CloseDailyShiftInput,
): Promise<CloseDailyShiftOutput> {
  assertShiftCloseRequired(input);

  const shiftRepo = await getDailyShiftRepository(ctx);
  const shift = await shiftRepo.findOne({ where: { daily_shift_id: input.dailyShiftId } });

  if (!shift) {
    throw new AppError('NOT_FOUND', 'Turno diário não encontrado.', 404, { dailyShiftId: input.dailyShiftId });
  }

  if (shift.status === 'fechado') {
    throw new AppError('CONFLICT', 'O turno diário já está fechado.', 409, { dailyShiftId: input.dailyShiftId });
  }

  if (shift.status !== 'aberto') {
    throw new AppError('CONFLICT', 'Apenas turnos abertos podem ser fechados.', 409, { dailyShiftId: input.dailyShiftId, status: shift.status });
  }

  const closedAt = ctx.clock.nowIso();

  await shiftRepo.update({
    where: { daily_shift_id: input.dailyShiftId },
    patch: {
      status: 'fechado',
      closed_at: closedAt,
      closed_by: input.closedByUserId,
    },
  });

  return {
    dailyShiftId: input.dailyShiftId,
    status: 'fechado',
    closedAt,
  };
}

export async function generateSalesSummary(
  ctx: RequestContext,
  input: GenerateSalesSummaryInput,
): Promise<GenerateSalesSummaryOutput> {
  if (!input.dailyShiftId) {
    throw new AppError('VALIDATION_ERROR', 'dailyShiftId é obrigatório para gerar o resumo.', 400, { field: 'dailyShiftId' });
  }

  const shiftRepo = await getDailyShiftRepository(ctx);
  const shift = await shiftRepo.findOne({ where: { daily_shift_id: input.dailyShiftId } });

  if (!shift) {
    throw new AppError('NOT_FOUND', 'Turno diário não encontrado.', 404, { dailyShiftId: input.dailyShiftId });
  }

  if (shift.status !== 'fechado') {
    throw new AppError('CONFLICT', 'O turno precisa estar fechado para gerar o resumo.', 409, { dailyShiftId: input.dailyShiftId, status: shift.status });
  }

  const orderRepo = await getOrderAggregateRepository(ctx);
  const orders = await orderRepo.findMany({
    where: { daily_shift_id: input.dailyShiftId },
  });

  const totalSales = orders.reduce((sum, order) => sum + (order.total_amount ?? 0), 0);
  const orderCount = orders.length;
  const createdAt = ctx.clock.nowIso();
  const salesSummaryId = ctx.idGenerator.newId();
  const dailySalesMetricsId = ctx.idGenerator.newId();

  await ctx.data.moduleData.runInTransaction(async (txRuntime) => {
    const salesSummaryRepo = await txRuntime.getTable<SalesSummaryRecord>('sales_summary');
    const dailySalesMetricsRepo = await txRuntime.getTable<DailySalesMetricsRecord>('daily_sales_metrics');

    await salesSummaryRepo.insert({
      record: {
        sales_summary_id: salesSummaryId,
        daily_shift_id: input.dailyShiftId,
        total_sales: totalSales,
        order_count: orderCount,
        created_at: createdAt,
      },
    });

    await dailySalesMetricsRepo.insert({
      record: {
        daily_sales_metrics_id: dailySalesMetricsId,
        daily_shift_id: input.dailyShiftId,
        total_sales: totalSales,
        order_count: orderCount,
        created_at: createdAt,
      },
    });
  });

  return {
    salesSummaryId,
    dailyShiftId: input.dailyShiftId,
    totalSales,
    orderCount,
    createdAt,
  };
}
