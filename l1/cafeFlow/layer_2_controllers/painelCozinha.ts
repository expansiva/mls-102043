/// <mls fileReference="_102043_/l1/cafeFlow/layer_2_controllers/painelCozinha.ts" enhancement="_blank"/>
import { ok, AppError, type BffHandler } from '/_102034_/l1/server/layer_2_controllers/contracts.js';
import {
  listarPedidosCozinha,
  type ListarPedidosCozinhaInput,
  type ListarPedidosCozinhaOutput,
} from '/_102043_/l1/cafeFlow/layer_3_usecases/listarPedidosCozinha.js';
import {
  atualizarStatusPedido,
  type AtualizarStatusPedidoInput,
  type AtualizarStatusPedidoResult,
} from '/_102043_/l1/cafeFlow/layer_3_usecases/atualizarStatusPedido.js';

type AtualizarStatusPedidoParams = {
  orderId?: string;
  novoStatus?: AtualizarStatusPedidoInput['novoStatus'];
};

export const cafeFlowPainelCozinhaListarPedidosCozinhaHandler: BffHandler = async ({ request, ctx }) => {
  const input = request.params as ListarPedidosCozinhaInput;
  const result: ListarPedidosCozinhaOutput = await listarPedidosCozinha(ctx, input);
  return ok(result.pedidos);
};

export const cafeFlowPainelCozinhaAtualizarStatusPedidoHandler: BffHandler = async ({ request, ctx }) => {
  const params = request.params as AtualizarStatusPedidoParams;
  if (!params.orderId) {
    throw new AppError('VALIDATION_ERROR', 'orderId is required', 400, { field: 'orderId' });
  }
  if (!params.novoStatus) {
    throw new AppError('VALIDATION_ERROR', 'novoStatus is required', 400, { field: 'novoStatus' });
  }
  const input: AtualizarStatusPedidoInput = {
    pedidoId: params.orderId,
    novoStatus: params.novoStatus,
  };
  const result: AtualizarStatusPedidoResult = await atualizarStatusPedido(ctx, input);
  return ok(result);
};

export const painelCozinhaRouter = {
  'cafeFlow.painelCozinha.listarPedidosCozinha': {
    handlerName: 'cafeFlowPainelCozinhaListarPedidosCozinhaHandler',
    importPath: '/_102043_/l1/cafeFlow/layer_2_controllers/painelCozinha.js',
  },
  'cafeFlow.painelCozinha.atualizarStatusPedido': {
    handlerName: 'cafeFlowPainelCozinhaAtualizarStatusPedidoHandler',
    importPath: '/_102043_/l1/cafeFlow/layer_2_controllers/painelCozinha.js',
  },
};
