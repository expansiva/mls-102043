/// <mls fileReference="_102043_/l1/cafeFlow/layer_3_usecases/fecharTurno.ts" enhancement="_blank"/>
import { AppError, type RequestContext } from '/_102034_/l1/server/layer_2_controllers/contracts.js';
import { MetricasEntity, type DailySalesMetricsRecord } from '/_102043_/l1/cafeFlow/layer_4_entities/metricasEntity.js';
import { PedidoEntity } from '/_102043_/l1/cafeFlow/layer_4_entities/pedidoEntity.js';
import { TurnoEntity } from '/_102043_/l1/cafeFlow/layer_4_entities/turnoEntity.js';

export interface FecharTurnoInput {
  turnoId: string;
}

export interface FecharTurnoOutput {
  turnoId: string;
  status: string;
}

export async function fecharTurno(ctx: RequestContext, input: FecharTurnoInput): Promise<FecharTurnoOutput> {
  const turno = await TurnoEntity.getById(ctx, input.turnoId);

  if (turno.status === 'fechado') {
    throw new AppError('CONFLICT', 'Turno já está fechado.', 409, { turnoId: input.turnoId });
  }

  const pedidos = await PedidoEntity.list(ctx, { shiftId: input.turnoId });
  const pedidosAbertos = pedidos.filter((pedido) => pedido.status === 'recebido' || pedido.status === 'emPreparo');

  if (pedidosAbertos.length > 0) {
    throw new AppError(
      'VALIDATION_ERROR',
      'Regra shiftClosureRequiresNoOpenOrders: existem pedidos em Recebido ou Em preparo.',
      400,
      {
        ruleId: 'shiftClosureRequiresNoOpenOrders',
        openOrders: pedidosAbertos.map((pedido) => pedido.order_id),
      },
    );
  }

  const missingShiftReportEntity = true;
  if (missingShiftReportEntity) {
    throw new AppError('CONFLICT', 'Missing entity for table shift_reports.', 409, {
      tableName: 'shift_reports',
    });
  }

  const closedAt = new Date().toISOString();
  const metricsRecord: DailySalesMetricsRecord = {
    shiftId: input.turnoId,
    closedAt,
    event: 'shift_closed',
  };

  const updatedTurno = await ctx.data.runInTransaction(async (tx) => {
    const updated = await TurnoEntity.update(ctx, {
      shiftId: input.turnoId,
      patch: {
        status: 'fechado',
        closedAt,
      },
    }, tx);

    await MetricasEntity.update(ctx, { tableName: 'daily_sales_metrics', record: metricsRecord }, tx);

    return updated;
  });

  return {
    turnoId: updatedTurno.shift_id,
    status: updatedTurno.status,
  };
}
