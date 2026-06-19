/// <mls fileReference="_102043_/l1/cafeFlow/layer_3_usecases/obterPedido.ts" enhancement="_blank"/>
import { type RequestContext } from '/_102034_/l1/server/layer_2_controllers/contracts.js';
import { PedidoEntity, type PedidoRecord } from '/_102043_/l1/cafeFlow/layer_4_entities/pedidoEntity.js';

export interface ObterPedidoInput {
  pedidoId: string;
}

export interface ObterPedidoOutput {
  pedido: PedidoRecord;
}

export async function obterPedido(
  ctx: RequestContext,
  input: ObterPedidoInput
): Promise<ObterPedidoOutput> {
  const pedido = await PedidoEntity.getById(ctx, input.pedidoId);
  return { pedido };
}
