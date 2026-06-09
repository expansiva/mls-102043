/// <mls fileReference="_102043_/l1/cafeFlow/layer_3_usecases/usecaseGerarResumoVendasIA.ts" enhancement="_blank" />
import { AppError, type RequestContext } from '/_102034_/l1/server/layer_2_controllers/contracts.js';

export interface SalesSummaryRecord {
  [key: string]: unknown;
  salesSummaryId?: string;
  businessDate?: string;
  totalSales?: number;
  totalOrders?: number;
  createdAt?: string;
}

export interface DailyShiftRecord {
  [key: string]: unknown;
  shiftId?: string;
  shiftName?: string;
  businessDate?: string;
  startAt?: string;
  endAt?: string;
  status?: string;
}

export interface DailySalesMetricsRecord {
  [key: string]: unknown;
  metricsId?: string;
  businessDate?: string;
  grossSales?: number;
  netSales?: number;
  totalOrders?: number;
  avgTicket?: number;
  createdAt?: string;
}

export interface GenerateSalesNarrativeInput {
  businessDate?: string;
  shiftId?: string;
}

export interface GenerateSalesNarrativeOutput {
  narrative: string;
  dataPoints: {
    totalGrossSales: number;
    totalNetSales: number;
    totalOrders: number;
    avgTicket: number;
    summariesFound: number;
    metricsFound: number;
    shiftsFound: number;
  };
}

async function getSalesSummaryRepository(ctx: RequestContext) {
  return await ctx.data.moduleData.getTable<SalesSummaryRecord>('sales_summary');
}

async function getDailyShiftRepository(ctx: RequestContext) {
  return await ctx.data.moduleData.getTable<DailyShiftRecord>('DailyShift');
}

async function getDailySalesMetricsRepository(ctx: RequestContext) {
  return await ctx.data.moduleData.getTable<DailySalesMetricsRecord>('daily_sales_metrics');
}

function toNumber(value: unknown): number {
  if (typeof value === 'number') return value;
  if (typeof value === 'string') {
    const parsed = Number(value);
    return Number.isFinite(parsed) ? parsed : 0;
  }
  return 0;
}

function formatCurrency(value: number): string {
  return value.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
}

export async function generateSalesNarrative(
  ctx: RequestContext,
  input: GenerateSalesNarrativeInput
): Promise<GenerateSalesNarrativeOutput> {
  const salesSummaryRepo = await getSalesSummaryRepository(ctx);
  const dailyShiftRepo = await getDailyShiftRepository(ctx);
  const dailySalesMetricsRepo = await getDailySalesMetricsRepository(ctx);

  const summaries = await salesSummaryRepo.findMany();
  const shifts = await dailyShiftRepo.findMany();
  const metrics = await dailySalesMetricsRepo.findMany();

  const filteredSummaries = input.businessDate
    ? summaries.filter((row) => row.businessDate === input.businessDate)
    : summaries;

  const filteredShifts = input.businessDate || input.shiftId
    ? shifts.filter((row) => {
        const matchDate = input.businessDate ? row.businessDate === input.businessDate : true;
        const matchShift = input.shiftId ? row.shiftId === input.shiftId : true;
        return matchDate && matchShift;
      })
    : shifts;

  const filteredMetrics = input.businessDate
    ? metrics.filter((row) => row.businessDate === input.businessDate)
    : metrics;

  const totalGrossSales = filteredMetrics.reduce((acc, row) => acc + toNumber(row.grossSales), 0);
  const totalNetSales = filteredMetrics.reduce((acc, row) => acc + toNumber(row.netSales), 0);
  const totalOrdersFromMetrics = filteredMetrics.reduce((acc, row) => acc + toNumber(row.totalOrders), 0);
  const totalOrdersFromSummaries = filteredSummaries.reduce(
    (acc, row) => acc + toNumber(row.totalOrders),
    0
  );

  const totalOrders = Math.max(totalOrdersFromMetrics, totalOrdersFromSummaries);
  const avgTicket = totalOrders > 0 ? totalNetSales / totalOrders : 0;

  if (summaries.length === 0 && metrics.length === 0 && shifts.length === 0) {
    throw new AppError(
      'NOT_FOUND',
      'Nenhum dado de vendas disponível para gerar o resumo.',
      404,
      { businessDate: input.businessDate ?? null, shiftId: input.shiftId ?? null }
    );
  }

  const shiftNames = filteredShifts
    .map((row) => (typeof row.shiftName === 'string' ? row.shiftName : null))
    .filter((value): value is string => Boolean(value));

  const shiftPhrase = shiftNames.length > 0
    ? `Turnos considerados: ${shiftNames.join(', ')}.`
    : 'Não há turnos específicos associados ao resumo.';

  const datePhrase = input.businessDate
    ? `Resumo das vendas do dia ${input.businessDate}.`
    : 'Resumo consolidado das vendas recentes.';

  const narrative = [
    datePhrase,
    `Total bruto estimado: ${formatCurrency(totalGrossSales)}.`,
    `Total líquido estimado: ${formatCurrency(totalNetSales)}.`,
    `Total de pedidos: ${totalOrders}.`,
    `Ticket médio aproximado: ${formatCurrency(avgTicket)}.`,
    shiftPhrase,
  ].join(' ');

  return {
    narrative,
    dataPoints: {
      totalGrossSales,
      totalNetSales,
      totalOrders,
      avgTicket,
      summariesFound: filteredSummaries.length,
      metricsFound: filteredMetrics.length,
      shiftsFound: filteredShifts.length,
    },
  };
}
