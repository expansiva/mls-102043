/// <mls fileReference="_102043_/l1/cafeFlow/layer_3_usecases/atualizarStatusPedido.ts" enhancement="_blank"/>
import { AppError, type RequestContext } from '/_102034_/l1/server/layer_2_controllers/contracts.js';
import { MetricasEntity } from '/_102043_/l1/cafeFlow/layer_4_entities/metricasEntity.js';
import { PedidoEntity, type PedidoRecord, type PedidoStatus } from '/_102043_/l1/cafeFlow/layer_4_entities/pedidoEntity.js';

export interface AtualizarStatusPedidoInput {
  pedidoId: string;
  novoStatus: PedidoStatus;
}

export interface AtualizarStatusPedidoResult {
  pedido: PedidoRecord;
}

const allowedTransitions: Record<PedidoStatus, PedidoStatus[]> = {
  recebido: ['emPreparo', 'cancelado'],
  emPreparo: ['pronto', 'cancelado'],
  pronto: ['entregue', 'cancelado'],
  entregue: [],
  cancelado: [],
};

const validateStatusTransition = (current: PedidoStatus, next: PedidoStatus) => {
  const allowed = allowedTransitions[current] ?? [];
  if (!allowed.includes(next)) {
    throw new AppError(
      'CONFLICT',
      'Transição de status inválida (orderStatusTransition).',
      409,
      {
        ruleId: 'orderStatusTransition',
        currentStatus: current,
        nextStatus: next,
      },
    );
  }
};

export async function atualizarStatusPedido(
  ctx: RequestContext,
  input: AtualizarStatusPedidoInput,
): Promise<AtualizarStatusPedidoResult> {
  const pedidoAtual = await PedidoEntity.getById(ctx, input.pedidoId);
  validateStatusTransition(pedidoAtual.status, input.novoStatus);

  const pedido = await ctx.data.runInTransaction(async (tx) => {
    const atualizado = await PedidoEntity.update(
      ctx,
      { orderId: input.pedidoId, status: input.novoStatus },
      tx,
    );
    const now = ctx.clock.nowIso();
    await MetricasEntity.update(
      ctx,
      {
        tableName: 'daily_sales_metrics',
        record: {
          id: ctx.idGenerator.newId(),
          order_id: atualizado.order_id,
          status: input.novoStatus,
          created_at: now,
        },
      },
      tx,
    );
    await MetricasEntity.update(
      ctx,
      {
        tableName: 'top_selling_items_metrics',
        record: {
          id: ctx.idGenerator.newId(),
          order_id: atualizado.order_id,
          status: input.novoStatus,
          created_at: now,
        },
      },
      tx,
    );
    return atualizado;
  });

  return { pedido };
}
