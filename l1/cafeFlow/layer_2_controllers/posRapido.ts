/// <mls fileReference="_102043_/l1/cafeFlow/layer_2_controllers/posRapido.ts" enhancement="_blank"/>
import { ok, AppError, type BffHandler } from '/_102034_/l1/server/layer_2_controllers/contracts.js';
import { listarPedidos, type ListarPedidosInput } from '/_102043_/l1/cafeFlow/layer_3_usecases/listarPedidos.js';
import { criarPedido, type CriarPedidoInput } from '/_102043_/l1/cafeFlow/layer_3_usecases/criarPedido.js';
import type {
  PosRapidoListarPedidosInput,
  PosRapidoListarPedidosOutput,
  PosRapidoCriarPedidoInput,
  PosRapidoCriarPedidoOutput,
} from '/_102043_/l2/cafeFlow/web/contracts/posRapido.js';

export const cafeFlowPosRapidoListarPedidosHandler: BffHandler = async ({ request, ctx }) => {
  const input = request.params as PosRapidoListarPedidosInput;
  const result = await listarPedidos(ctx, input as unknown as ListarPedidosInput);
  const output: PosRapidoListarPedidosOutput = result.pedidos.map((pedido) => ({
    orderId: pedido.order_id,
    status: pedido.status,
    createdAt: pedido.created_at,
    updatedAt: pedido.updated_at,
  }));

  return ok(output);
};

export const cafeFlowPosRapidoCriarPedidoHandler: BffHandler = async ({ request, ctx }) => {
  const input = request.params as PosRapidoCriarPedidoInput;

  if (!input.orderItems || (typeof input.orderItems === 'string' && input.orderItems.trim().length === 0)) {
    throw new AppError('VALIDATION_ERROR', 'orderItems is required', 400, { field: 'orderItems' });
  }

  const result = await criarPedido(ctx, input as unknown as CriarPedidoInput);
  const output: PosRapidoCriarPedidoOutput = {
    orderId: result.pedido.order_id,
    status: result.pedido.status,
    createdAt: result.pedido.created_at,
    updatedAt: result.pedido.updated_at,
  };

  return ok(output);
};

export const posRapidoRoutes = {
  'cafeFlow.posRapido.listarPedidos': {
    handler: cafeFlowPosRapidoListarPedidosHandler,
    importPath: '/_102043_/l1/cafeFlow/layer_2_controllers/posRapido.js',
  },
  'cafeFlow.posRapido.criarPedido': {
    handler: cafeFlowPosRapidoCriarPedidoHandler,
    importPath: '/_102043_/l1/cafeFlow/layer_2_controllers/posRapido.js',
  },
};
