/// <mls fileReference="_102043_/l1/cafeFlow/layer_3_usecases/fecharTurno.ts" enhancement="_blank"/>
import { AppError, type RequestContext } from '/_102034_/l1/server/layer_2_controllers/contracts.js';
import { MetricasEntity } from '/_102043_/l1/cafeFlow/layer_4_entities/metricasEntity.js';
import { PedidoEntity, type PedidoRecord } from '/_102043_/l1/cafeFlow/layer_4_entities/pedidoEntity.js';
import { TurnoEntity, type TurnoRecord } from '/_102043_/l1/cafeFlow/layer_4_entities/turnoEntity.js';

export interface FecharTurnoInput {
  turnoId: string;
}

export interface FecharTurnoOutput {
  turnoId: string;
  status: string;
}

export async function fecharTurno(ctx: RequestContext, input: FecharTurnoInput): Promise<FecharTurnoOutput> {
  const missingEntities = ['shift_reports'];
  if (missingEntities.length > 0) {
    throw new AppError(
      'CONFLICT',
      'Missing entityRefs for tables: shift_reports',
      409,
      { tables: missingEntities }
    );
  }

  const turno: TurnoRecord = await TurnoEntity.getById(ctx, input.turnoId);
  if (turno.status === 'fechado') {
    throw new AppError('CONFLICT', 'Turno já está fechado.', 409, { turnoId: turno.shift_id });
  }

  const pedidos: PedidoRecord[] = await PedidoEntity.list(ctx, { shiftId: input.turnoId });
  const pedidosAbertos = pedidos.filter((pedido) => pedido.status === 'recebido' || pedido.status === 'emPreparo');
  if (pedidosAbertos.length > 0) {
    throw new AppError(
      'VALIDATION_ERROR',
      'shiftClosureRequiresNoOpenOrders: Existem pedidos em Recebido ou Em preparo.',
      400,
      {
        ruleId: 'shiftClosureRequiresNoOpenOrders',
        openOrderIds: pedidosAbertos.map((pedido) => pedido.order_id)
      }
    );
  }

  const closedAt = new Date().toISOString();

  const turnoAtualizado = await ctx.data.runInTransaction(async (tx) => {
    const updated = await TurnoEntity.update(
      ctx,
      {
        shiftId: turno.shift_id,
        patch: {
          status: 'fechado',
          closedAt
        }
      },
      tx
    );

    await MetricasEntity.update(
      ctx,
      {
        tableName: 'daily_sales_metrics',
        record: {
          shift_id: turno.shift_id,
          closed_at: closedAt
        }
      },
      tx
    );

    return updated;
  });

  return {
    turnoId: turnoAtualizado.shift_id,
    status: turnoAtualizado.status
  };
}
