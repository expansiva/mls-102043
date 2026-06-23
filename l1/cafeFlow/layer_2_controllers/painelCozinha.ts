/// <mls fileReference="_102043_/l1/cafeFlow/layer_2_controllers/painelCozinha.ts" enhancement="_blank"/>
import { ok, AppError, type BffHandler } from '/_102034_/l1/server/layer_2_controllers/contracts.js';
import {
  listarPedidosCozinha,
  type ListarPedidosCozinhaInput,
} from '/_102043_/l1/cafeFlow/layer_3_usecases/listarPedidosCozinha.js';
import {
  atualizarStatusPedido,
  type AtualizarStatusPedidoInput,
} from '/_102043_/l1/cafeFlow/layer_3_usecases/atualizarStatusPedido.js';
import type {
  PainelCozinhaListarPedidosCozinhaInput,
  PainelCozinhaListarPedidosCozinhaOutput,
  PainelCozinhaAtualizarStatusPedidoInput,
  PainelCozinhaAtualizarStatusPedidoOutput,
} from '/_102043_/l2/cafeFlow/web/contracts/painelCozinha.js';

export const cafeFlowPainelCozinhaListarPedidosCozinhaHandler: BffHandler = async ({ request, ctx }) => {
  const input = request.params as PainelCozinhaListarPedidosCozinhaInput;
  const result = await listarPedidosCozinha(ctx, input as ListarPedidosCozinhaInput);
  const output: PainelCozinhaListarPedidosCozinhaOutput = result.pedidos.map((pedido) => ({
    orderId: pedido.order_id,
    status: pedido.status,
    createdAt: pedido.created_at,
    shiftId: pedido.shift_id,
  }));
  return ok(output);
};

export const cafeFlowPainelCozinhaAtualizarStatusPedidoHandler: BffHandler = async ({ request, ctx }) => {
  const input = request.params as PainelCozinhaAtualizarStatusPedidoInput;
  if (!input.orderId) throw new AppError('VALIDATION_ERROR', 'orderId is required', 400, { field: 'orderId' });
  if (!input.novoStatus) {
    throw new AppError('VALIDATION_ERROR', 'novoStatus is required', 400, { field: 'novoStatus' });
  }
  const usecaseInput: AtualizarStatusPedidoInput = {
    pedidoId: input.orderId,
    novoStatus: input.novoStatus,
  };
  const result = await atualizarStatusPedido(ctx, usecaseInput);
  const output: PainelCozinhaAtualizarStatusPedidoOutput = {
    orderId: result.pedido.order_id,
    status: result.pedido.status,
    updatedAt: result.pedido.updated_at,
  };
  return ok(output);
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
} as const;
