/// <mls fileReference="_102043_/l1/cafeFlow/layer_3_usecases/listarPedidos.ts" enhancement="_blank"/>
import { type RequestContext } from '/_102034_/l1/server/layer_2_controllers/contracts.js';
import { PedidoEntity, type PedidoRecord } from '/_102043_/l1/cafeFlow/layer_4_entities/pedidoEntity.js';

export interface ListarPedidosInput {}

export interface ListarPedidosOutput {
  pedidos: PedidoRecord[];
}

export async function listarPedidos(
  ctx: RequestContext,
  _input: ListarPedidosInput
): Promise<ListarPedidosOutput> {
  const pedidos = await PedidoEntity.list(ctx);
  return { pedidos };
}
