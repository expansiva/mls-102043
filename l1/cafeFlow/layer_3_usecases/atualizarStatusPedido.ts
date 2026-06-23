/// <mls fileReference="_102043_/l1/cafeFlow/layer_3_usecases/atualizarStatusPedido.ts" enhancement="_blank"/>
import { AppError, type RequestContext } from '/_102034_/l1/server/layer_2_controllers/contracts.js';
import {
  PedidoEntity,
  type PedidoRecord,
  type PedidoStatus,
} from '/_102043_/l1/cafeFlow/layer_4_entities/pedidoEntity.js';
import { MetricasEntity } from '/_102043_/l1/cafeFlow/layer_4_entities/metricasEntity.js';

export interface AtualizarStatusPedidoInput {
  pedidoId: string;
  novoStatus: string;
}

export interface AtualizarStatusPedidoOutput {
  pedido: PedidoRecord;
}

const missingEntities = ['order_status_history'];

const isValidTransition = (fromStatus: PedidoStatus, toStatus: PedidoStatus): boolean => {
  if (fromStatus === toStatus) {
    return false;
  }
  if (fromStatus === 'entregue' || fromStatus === 'cancelado') {
    return false;
  }
  const flow: Record<PedidoStatus, PedidoStatus[]> = {
    recebido: ['emPreparo', 'cancelado'],
    emPreparo: ['pronto', 'cancelado'],
    pronto: ['entregue', 'cancelado'],
    entregue: [],
    cancelado: [],
  };
  return flow[fromStatus].includes(toStatus);
};

export async function atualizarStatusPedido(
  ctx: RequestContext,
  input: AtualizarStatusPedidoInput,
): Promise<AtualizarStatusPedidoOutput> {
  if (missingEntities.length > 0) {
    throw new Error(
      `Planning error: missing entity reference for tables: ${missingEntities.join(', ')}.`,
    );
  }

  const pedidoAtual = await PedidoEntity.getById(ctx, input.pedidoId);
  const novoStatus = input.novoStatus as PedidoStatus;

  if (!isValidTransition(pedidoAtual.status, novoStatus)) {
    throw new AppError(
      'CONFLICT',
      'Transição de status inválida para orderStatusTransition.',
      409,
      {
        ruleId: 'orderStatusTransition',
        fromStatus: pedidoAtual.status,
        toStatus: novoStatus,
      },
    );
  }

  const pedido = await ctx.data.runInTransaction(async (tx) => {
    const atualizado = await PedidoEntity.update(
      ctx,
      { orderId: pedidoAtual.order_id, status: novoStatus },
      tx,
    );

    await MetricasEntity.update(
      ctx,
      {
        tableName: 'daily_sales_metrics',
        record: {
          orderId: atualizado.order_id,
          status: atualizado.status,
          shiftId: atualizado.shift_id,
        },
      },
      tx,
    );

    await MetricasEntity.update(
      ctx,
      {
        tableName: 'top_selling_items_metrics',
        record: {
          orderId: atualizado.order_id,
          status: atualizado.status,
        },
      },
      tx,
    );

    return atualizado;
  });

  return { pedido };
}
