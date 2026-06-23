/// <mls fileReference="_102043_/l1/cafeFlow/layer_3_usecases/listarPedidosCozinha.ts" enhancement="_blank"/>
import { type RequestContext } from '/_102034_/l1/server/layer_2_controllers/contracts.js';
import { PedidoEntity, type PedidoRecord } from '/_102043_/l1/cafeFlow/layer_4_entities/pedidoEntity.js';

export interface ListarPedidosCozinhaInput {}

export interface ListarPedidosCozinhaOutput {
  pedidos: PedidoRecord[];
}

export async function listarPedidosCozinha(
  ctx: RequestContext,
  _input: ListarPedidosCozinhaInput,
): Promise<ListarPedidosCozinhaOutput> {
  const pedidos = await PedidoEntity.list(ctx);
  return { pedidos };
}
