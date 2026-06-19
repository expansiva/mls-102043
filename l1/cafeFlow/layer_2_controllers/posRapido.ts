/// <mls fileReference="_102043_/l1/cafeFlow/layer_2_controllers/posRapido.ts" enhancement="_blank"/>
import { ok, AppError, type BffHandler } from '/_102034_/l1/server/layer_2_controllers/contracts.js';
import { listarPedidos, type ListarPedidosInput } from '/_102043_/l1/cafeFlow/layer_3_usecases/listarPedidos.js';
import { criarPedido, type CriarPedidoInput } from '/_102043_/l1/cafeFlow/layer_3_usecases/criarPedido.js';

export const cafeFlowPosRapidoListarPedidosHandler: BffHandler = async ({ request, ctx }) => {
  const input = request.params as ListarPedidosInput;
  const result = await listarPedidos(ctx, input);
  return ok(result.pedidos);
};

export const cafeFlowPosRapidoCriarPedidoHandler: BffHandler = async ({ request, ctx }) => {
  const params = request.params as Partial<CriarPedidoInput> & {
    orderItems?: CriarPedidoInput['itens'];
    observacao?: string;
  };
  const itens = params.orderItems ?? params.itens;
  if (!itens) {
    throw new AppError('VALIDATION_ERROR', 'orderItems is required', 400, { field: 'orderItems' });
  }
  if (!params.pedido) {
    throw new AppError('VALIDATION_ERROR', 'pedido is required', 400, { field: 'pedido' });
  }
  const input: CriarPedidoInput = {
    pedido: params.pedido,
    itens,
  };
  const result = await criarPedido(ctx, input);
  return ok(result);
};

export const posRapidoRouterEntries = [
  {
    key: 'cafeFlow.posRapido.listarPedidos',
    handlerName: 'cafeFlowPosRapidoListarPedidosHandler',
    importPath: '/_102043_/l1/cafeFlow/layer_2_controllers/posRapido.js',
  },
  {
    key: 'cafeFlow.posRapido.criarPedido',
    handlerName: 'cafeFlowPosRapidoCriarPedidoHandler',
    importPath: '/_102043_/l1/cafeFlow/layer_2_controllers/posRapido.js',
  },
] as const;
