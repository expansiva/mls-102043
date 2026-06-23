/// <mls fileReference="_102043_/l1/cafeFlow/layer_2_controllers/cardapioEstoque.ts" enhancement="_blank"/>
import { ok, AppError, type BffHandler } from '/_102034_/l1/server/layer_2_controllers/contracts.js';
import {
  listarItensCardapio,
  type ListarItensCardapioInput,
} from '/_102043_/l1/cafeFlow/layer_3_usecases/listarItensCardapio.js';
import {
  listarCategoriasCardapio,
  type ListarCategoriasCardapioInput,
} from '/_102043_/l1/cafeFlow/layer_3_usecases/listarCategoriasCardapio.js';
import {
  criarOuAtualizarItemCardapio,
  type CriarOuAtualizarItemCardapioInput,
} from '/_102043_/l1/cafeFlow/layer_3_usecases/criarOuAtualizarItemCardapio.js';
import {
  listarItensEstoque,
  type ListarItensEstoqueInput,
} from '/_102043_/l1/cafeFlow/layer_3_usecases/listarItensEstoque.js';
import {
  criarOuAtualizarItemEstoque,
  type CriarOuAtualizarItemEstoqueInput,
} from '/_102043_/l1/cafeFlow/layer_3_usecases/criarOuAtualizarItemEstoque.js';
import {
  registrarMovimentacaoEstoque,
  type RegistrarMovimentacaoEstoqueInput,
} from '/_102043_/l1/cafeFlow/layer_3_usecases/registrarMovimentacaoEstoque.js';
import {
  listarMovimentacoesEstoque,
  type ListarMovimentacoesEstoqueInput,
} from '/_102043_/l1/cafeFlow/layer_3_usecases/listarMovimentacoesEstoque.js';
import {
  listarAlertasEstoqueBaixo,
  type ListarAlertasEstoqueBaixoInput,
} from '/_102043_/l1/cafeFlow/layer_3_usecases/listarAlertasEstoqueBaixo.js';
import type {
  CardapioEstoqueListarItensCardapioInput,
  CardapioEstoqueListarItensCardapioOutput,
  CardapioEstoqueListarCategoriasCardapioOutput,
  CardapioEstoqueCriarOuAtualizarItemCardapioInput,
  CardapioEstoqueCriarOuAtualizarItemCardapioOutput,
  CardapioEstoqueListarItensEstoqueOutput,
  CardapioEstoqueCriarOuAtualizarItemEstoqueInput,
  CardapioEstoqueCriarOuAtualizarItemEstoqueOutput,
  CardapioEstoqueRegistrarMovimentacaoEstoqueInput,
  CardapioEstoqueRegistrarMovimentacaoEstoqueOutput,
  CardapioEstoqueListarMovimentacoesEstoqueOutput,
  CardapioEstoqueListarAlertasEstoqueBaixoOutput,
} from '/_102043_/l2/cafeFlow/web/contracts/cardapioEstoque.js';

export const CafeFlowCardapioEstoqueListarItensCardapioHandler: BffHandler = async ({ request, ctx }) => {
  const input = request.params as CardapioEstoqueListarItensCardapioInput;
  const result = await listarItensCardapio(ctx, input as ListarItensCardapioInput);
  const output: CardapioEstoqueListarItensCardapioOutput = result.itensCardapio.map((item) => ({
    menuItemId: item.menuItemId,
    nome: item.name,
    preco: item.price,
    categoriaId: item.menuCategoryId,
    ativo: item.isActive,
  }));
  return ok(output);
};

export const CafeFlowCardapioEstoqueListarCategoriasCardapioHandler: BffHandler = async ({ ctx }) => {
  const result = await listarCategoriasCardapio(ctx, {} as ListarCategoriasCardapioInput);
  const output: CardapioEstoqueListarCategoriasCardapioOutput = result.categorias.map((categoria) => ({
    categoriaId: (categoria as any).categoriaId ?? (categoria as any).menuCategoryId ?? (categoria as any).id ?? '',
    nome: (categoria as any).nome ?? (categoria as any).name ?? '',
    ativo: (categoria as any).ativo ?? (categoria as any).isActive ?? false,
  }));
  return ok(output);
};

export const CafeFlowCardapioEstoqueCriarOuAtualizarItemCardapioHandler: BffHandler = async ({ request, ctx }) => {
  const input = request.params as CardapioEstoqueCriarOuAtualizarItemCardapioInput;
  if (!input.nome) throw new AppError('VALIDATION_ERROR', 'nome is required', 400, { field: 'nome' });
  if (input.preco === undefined) throw new AppError('VALIDATION_ERROR', 'preco is required', 400, { field: 'preco' });
  if (!input.categoriaId) throw new AppError('VALIDATION_ERROR', 'categoriaId is required', 400, { field: 'categoriaId' });
  if (input.ativo === undefined) throw new AppError('VALIDATION_ERROR', 'ativo is required', 400, { field: 'ativo' });
  const usecaseInput: CriarOuAtualizarItemCardapioInput = {
    cardapioEntity: input as unknown as CriarOuAtualizarItemCardapioInput['cardapioEntity'],
  };
  const result = await criarOuAtualizarItemCardapio(ctx, usecaseInput);
  const output: CardapioEstoqueCriarOuAtualizarItemCardapioOutput = {
    menuItemId: result.cardapioEntity.menuItemId,
  };
  return ok(output);
};

export const CafeFlowCardapioEstoqueListarItensEstoqueHandler: BffHandler = async ({ request, ctx }) => {
  const input = request.params as Record<string, unknown>;
  const result = await listarItensEstoque(ctx, input as ListarItensEstoqueInput);
  const output: CardapioEstoqueListarItensEstoqueOutput = result.itensEstoque.map((item) => ({
    stockItemId: (item as any).stockItemId ?? (item as any).stock_item_id ?? '',
    nome: (item as any).nome ?? (item as any).name ?? '',
    quantidadeAtual: (item as any).quantidadeAtual ?? (item as any).quantity ?? 0,
    unidadeMedidaId: (item as any).unidadeMedidaId ?? (item as any).unitOfMeasureId ?? (item as any).unit_of_measure_id ?? '',
    quantidadeMinima: (item as any).quantidadeMinima ?? (item as any).minimumQuantity ?? (item as any).minimum_quantity ?? 0,
    status: (item as any).status ?? (item as any).movement_type ?? '',
  }));
  return ok(output);
};

export const CafeFlowCardapioEstoqueCriarOuAtualizarItemEstoqueHandler: BffHandler = async ({ request, ctx }) => {
  const input = request.params as CardapioEstoqueCriarOuAtualizarItemEstoqueInput;
  if (!input.nome) throw new AppError('VALIDATION_ERROR', 'nome is required', 400, { field: 'nome' });
  if (!input.unidadeMedidaId) {
    throw new AppError('VALIDATION_ERROR', 'unidadeMedidaId is required', 400, { field: 'unidadeMedidaId' });
  }
  if (input.quantidadeMinima === undefined) {
    throw new AppError('VALIDATION_ERROR', 'quantidadeMinima is required', 400, { field: 'quantidadeMinima' });
  }
  if (input.ativo === undefined) throw new AppError('VALIDATION_ERROR', 'ativo is required', 400, { field: 'ativo' });
  const usecaseInput: CriarOuAtualizarItemEstoqueInput = {
    estoqueEntity: input as unknown as CriarOuAtualizarItemEstoqueInput['estoqueEntity'],
  };
  const result = await criarOuAtualizarItemEstoque(ctx, usecaseInput);
  const estoqueEntity = result.estoqueEntity as any;
  const output: CardapioEstoqueCriarOuAtualizarItemEstoqueOutput = {
    stockItemId: estoqueEntity.stockItemId ?? estoqueEntity.stock_item_id ?? estoqueEntity.stock_movement_id ?? '',
  };
  return ok(output);
};

export const CafeFlowCardapioEstoqueRegistrarMovimentacaoEstoqueHandler: BffHandler = async ({ request, ctx }) => {
  const input = request.params as CardapioEstoqueRegistrarMovimentacaoEstoqueInput & {
    unitOfMeasureId?: string;
  };
  if (!input.stockItemId) throw new AppError('VALIDATION_ERROR', 'stockItemId is required', 400, { field: 'stockItemId' });
  if (!input.movementType) {
    throw new AppError('VALIDATION_ERROR', 'movementType is required', 400, { field: 'movementType' });
  }
  if (input.quantity === undefined) throw new AppError('VALIDATION_ERROR', 'quantity is required', 400, { field: 'quantity' });
  if (!input.occurredAt) {
    throw new AppError('VALIDATION_ERROR', 'occurredAt is required', 400, { field: 'occurredAt' });
  }
  if (!input.unitOfMeasureId) {
    throw new AppError('VALIDATION_ERROR', 'unitOfMeasureId is required', 400, { field: 'unitOfMeasureId' });
  }
  const usecaseInput: RegistrarMovimentacaoEstoqueInput = {
    stockItemId: input.stockItemId,
    movementType: input.movementType,
    quantity: input.quantity,
    unitOfMeasureId: input.unitOfMeasureId,
    movementDate: new Date(input.occurredAt),
    reason: input.reason,
  };
  const result = await registrarMovimentacaoEstoque(ctx, usecaseInput);
  const output: CardapioEstoqueRegistrarMovimentacaoEstoqueOutput = {
    stockMovementId: (result as any).stockMovementId ?? (result as any).stock_movement_id ?? '',
  };
  return ok(output);
};

export const CafeFlowCardapioEstoqueListarMovimentacoesEstoqueHandler: BffHandler = async ({ request, ctx }) => {
  const input = request.params as Record<string, unknown>;
  const result = await listarMovimentacoesEstoque(ctx, input as ListarMovimentacoesEstoqueInput);
  const output: CardapioEstoqueListarMovimentacoesEstoqueOutput = result.movimentacoes.map((movimentacao) => ({
    stockMovementId: movimentacao.stock_movement_id,
    stockItemId: movimentacao.stock_item_id,
    movementType: movimentacao.movement_type,
    quantity: movimentacao.quantity,
    reason: movimentacao.reason ?? '',
    occurredAt: movimentacao.occurred_at,
  }));
  return ok(output);
};

export const CafeFlowCardapioEstoqueListarAlertasEstoqueBaixoHandler: BffHandler = async ({ request, ctx }) => {
  const input = request.params as Record<string, unknown>;
  const result = await listarAlertasEstoqueBaixo(ctx, input as ListarAlertasEstoqueBaixoInput);
  const output: CardapioEstoqueListarAlertasEstoqueBaixoOutput = result.alertas.map((alerta) => ({
    lowStockAlertId: (alerta as any).lowStockAlertId ?? (alerta as any).low_stock_alert_id ?? (alerta as any).stock_movement_id ?? '',
    stockItemId: (alerta as any).stockItemId ?? (alerta as any).stock_item_id ?? '',
    triggeredAt: (alerta as any).triggeredAt ?? (alerta as any).triggered_at ?? (alerta as any).occurred_at ?? '',
    currentQuantity: (alerta as any).currentQuantity ?? (alerta as any).current_quantity ?? (alerta as any).quantity ?? 0,
    minimumQuantity: (alerta as any).minimumQuantity ?? (alerta as any).minimum_quantity ?? 0,
    status: (alerta as any).status ?? '',
  }));
  return ok(output);
};

export const cardapioEstoqueRouter = {
  'cafeFlow.cardapioEstoque.listarItensCardapio': {
    handlerName: 'CafeFlowCardapioEstoqueListarItensCardapioHandler',
    importPath: '/_102043_/l1/cafeFlow/layer_2_controllers/cardapioEstoque.js',
  },
  'cafeFlow.cardapioEstoque.listarCategoriasCardapio': {
    handlerName: 'CafeFlowCardapioEstoqueListarCategoriasCardapioHandler',
    importPath: '/_102043_/l1/cafeFlow/layer_2_controllers/cardapioEstoque.js',
  },
  'cafeFlow.cardapioEstoque.criarOuAtualizarItemCardapio': {
    handlerName: 'CafeFlowCardapioEstoqueCriarOuAtualizarItemCardapioHandler',
    importPath: '/_102043_/l1/cafeFlow/layer_2_controllers/cardapioEstoque.js',
  },
  'cafeFlow.cardapioEstoque.listarItensEstoque': {
    handlerName: 'CafeFlowCardapioEstoqueListarItensEstoqueHandler',
    importPath: '/_102043_/l1/cafeFlow/layer_2_controllers/cardapioEstoque.js',
  },
  'cafeFlow.cardapioEstoque.criarOuAtualizarItemEstoque': {
    handlerName: 'CafeFlowCardapioEstoqueCriarOuAtualizarItemEstoqueHandler',
    importPath: '/_102043_/l1/cafeFlow/layer_2_controllers/cardapioEstoque.js',
  },
  'cafeFlow.cardapioEstoque.registrarMovimentacaoEstoque': {
    handlerName: 'CafeFlowCardapioEstoqueRegistrarMovimentacaoEstoqueHandler',
    importPath: '/_102043_/l1/cafeFlow/layer_2_controllers/cardapioEstoque.js',
  },
  'cafeFlow.cardapioEstoque.listarMovimentacoesEstoque': {
    handlerName: 'CafeFlowCardapioEstoqueListarMovimentacoesEstoqueHandler',
    importPath: '/_102043_/l1/cafeFlow/layer_2_controllers/cardapioEstoque.js',
  },
  'cafeFlow.cardapioEstoque.listarAlertasEstoqueBaixo': {
    handlerName: 'CafeFlowCardapioEstoqueListarAlertasEstoqueBaixoHandler',
    importPath: '/_102043_/l1/cafeFlow/layer_2_controllers/cardapioEstoque.js',
  },
} as const;
