/// <mls fileReference="_102043_/l1/cafeFlow/layer_2_controllers/cardapioEstoque.ts" enhancement="_blank"/>
import { ok, AppError, type BffHandler } from '/_102034_/l1/server/layer_2_controllers/contracts.js';
import {
listarItensCardapio,
type ListarItensCardapioInput,
type ListarItensCardapioOutput,
} from '/_102043_/l1/cafeFlow/layer_3_usecases/listarItensCardapio.js';
import {
listarCategoriasCardapio,
type ListarCategoriasCardapioInput,
type ListarCategoriasCardapioOutput,
} from '/_102043_/l1/cafeFlow/layer_3_usecases/listarCategoriasCardapio.js';
import {
criarOuAtualizarItemCardapio,
type CriarOuAtualizarItemCardapioInput,
type CriarOuAtualizarItemCardapioOutput,
} from '/_102043_/l1/cafeFlow/layer_3_usecases/criarOuAtualizarItemCardapio.js';
import {
listarItensEstoque,
type ListarItensEstoqueInput,
type ListarItensEstoqueOutput,
} from '/_102043_/l1/cafeFlow/layer_3_usecases/listarItensEstoque.js';
import {
criarOuAtualizarItemEstoque,
type CriarOuAtualizarItemEstoqueInput,
type CriarOuAtualizarItemEstoqueOutput,
} from '/_102043_/l1/cafeFlow/layer_3_usecases/criarOuAtualizarItemEstoque.js';
import {
registrarMovimentacaoEstoque,
type RegistrarMovimentacaoEstoqueInput,
type RegistrarMovimentacaoEstoqueOutput,
} from '/_102043_/l1/cafeFlow/layer_3_usecases/registrarMovimentacaoEstoque.js';
import {
listarMovimentacoesEstoque,
type ListarMovimentacoesEstoqueInput,
type ListarMovimentacoesEstoqueOutput,
} from '/_102043_/l1/cafeFlow/layer_3_usecases/listarMovimentacoesEstoque.js';
import {
listarAlertasEstoqueBaixo,
type ListarAlertasEstoqueBaixoInput,
type ListarAlertasEstoqueBaixoOutput,
} from '/_102043_/l1/cafeFlow/layer_3_usecases/listarAlertasEstoqueBaixo.js';

type CriarOuAtualizarItemCardapioParams = {
menuItemId?: string;
nome?: string;
preco?: number;
categoriaId?: string;
ativo?: boolean;
};

type CriarOuAtualizarItemEstoqueParams = {
stockItemId?: string;
nome?: string;
unidadeMedidaId?: string;
quantidadeMinima?: number;
ativo?: boolean;
};

type RegistrarMovimentacaoEstoqueParams = {
stockItemId?: string;
movementType?: string;
quantity?: number;
reason?: string;
occurredAt?: string | Date;
unitOfMeasureId?: string;
unidadeMedidaId?: string;
};

export const cafeFlowCardapioEstoqueListarItensCardapioHandler: BffHandler = async ({ request, ctx }) => {
const input = request.params as ListarItensCardapioInput;
const result: ListarItensCardapioOutput = await listarItensCardapio(ctx, input);
return ok(result.itensCardapio);
};

export const cafeFlowCardapioEstoqueListarCategoriasCardapioHandler: BffHandler = async ({ request, ctx }) => {
const input = request.params as ListarCategoriasCardapioInput;
const result: ListarCategoriasCardapioOutput = await listarCategoriasCardapio(ctx, input);
return ok(result.categorias);
};

export const cafeFlowCardapioEstoqueCriarOuAtualizarItemCardapioHandler: BffHandler = async ({ request, ctx }) => {
const params = request.params as CriarOuAtualizarItemCardapioParams;
if (params.nome === undefined) {
throw new AppError('VALIDATION_ERROR', 'nome is required', 400, { field: 'nome' });
}
if (params.preco === undefined) {
throw new AppError('VALIDATION_ERROR', 'preco is required', 400, { field: 'preco' });
}
if (params.categoriaId === undefined) {
throw new AppError('VALIDATION_ERROR', 'categoriaId is required', 400, { field: 'categoriaId' });
}
if (params.ativo === undefined) {
throw new AppError('VALIDATION_ERROR', 'ativo is required', 400, { field: 'ativo' });
}
const input: CriarOuAtualizarItemCardapioInput = {
cardapioEntity: {
menuItemId: params.menuItemId,
name: params.nome,
price: params.preco,
menuCategoryId: params.categoriaId,
isActive: params.ativo,
},
};
const result: CriarOuAtualizarItemCardapioOutput = await criarOuAtualizarItemCardapio(ctx, input);
return ok(result);
};

export const cafeFlowCardapioEstoqueListarItensEstoqueHandler: BffHandler = async ({ request, ctx }) => {
const input = request.params as ListarItensEstoqueInput;
const result: ListarItensEstoqueOutput = await listarItensEstoque(ctx, input);
return ok(result.itensEstoque);
};

export const cafeFlowCardapioEstoqueCriarOuAtualizarItemEstoqueHandler: BffHandler = async ({ request, ctx }) => {
const params = request.params as CriarOuAtualizarItemEstoqueParams;
if (params.nome === undefined) {
throw new AppError('VALIDATION_ERROR', 'nome is required', 400, { field: 'nome' });
}
if (params.unidadeMedidaId === undefined) {
throw new AppError('VALIDATION_ERROR', 'unidadeMedidaId is required', 400, { field: 'unidadeMedidaId' });
}
if (params.quantidadeMinima === undefined) {
throw new AppError('VALIDATION_ERROR', 'quantidadeMinima is required', 400, { field: 'quantidadeMinima' });
}
if (params.ativo === undefined) {
throw new AppError('VALIDATION_ERROR', 'ativo is required', 400, { field: 'ativo' });
}
const input: CriarOuAtualizarItemEstoqueInput = {
estoqueEntity: params as unknown as CriarOuAtualizarItemEstoqueInput['estoqueEntity'],
};
const result: CriarOuAtualizarItemEstoqueOutput = await criarOuAtualizarItemEstoque(ctx, input);
return ok(result);
};

export const cafeFlowCardapioEstoqueRegistrarMovimentacaoEstoqueHandler: BffHandler = async ({ request, ctx }) => {
const params = request.params as RegistrarMovimentacaoEstoqueParams;
if (params.stockItemId === undefined) {
throw new AppError('VALIDATION_ERROR', 'stockItemId is required', 400, { field: 'stockItemId' });
}
if (params.movementType === undefined) {
throw new AppError('VALIDATION_ERROR', 'movementType is required', 400, { field: 'movementType' });
}
if (params.quantity === undefined) {
throw new AppError('VALIDATION_ERROR', 'quantity is required', 400, { field: 'quantity' });
}
if (params.occurredAt === undefined) {
throw new AppError('VALIDATION_ERROR', 'occurredAt is required', 400, { field: 'occurredAt' });
}
const unitOfMeasureId = params.unitOfMeasureId ?? params.unidadeMedidaId;
if (unitOfMeasureId === undefined) {
throw new AppError('VALIDATION_ERROR', 'unitOfMeasureId is required', 400, { field: 'unitOfMeasureId' });
}
const movementDate = params.occurredAt instanceof Date
? params.occurredAt
: new Date(params.occurredAt);
const input: RegistrarMovimentacaoEstoqueInput = {
stockItemId: params.stockItemId,
movementType: params.movementType,
quantity: params.quantity,
unitOfMeasureId,
movementDate,
reason: params.reason,
};
const result: RegistrarMovimentacaoEstoqueOutput = await registrarMovimentacaoEstoque(ctx, input);
return ok(result);
};

export const cafeFlowCardapioEstoqueListarMovimentacoesEstoqueHandler: BffHandler = async ({ request, ctx }) => {
const input = request.params as ListarMovimentacoesEstoqueInput;
const result: ListarMovimentacoesEstoqueOutput = await listarMovimentacoesEstoque(ctx, input);
return ok(result.movimentacoes);
};

export const cafeFlowCardapioEstoqueListarAlertasEstoqueBaixoHandler: BffHandler = async ({ request, ctx }) => {
const input = request.params as ListarAlertasEstoqueBaixoInput;
const result: ListarAlertasEstoqueBaixoOutput = await listarAlertasEstoqueBaixo(ctx, input);
return ok(result.alertas);
};

export const cardapioEstoqueRoutes = {
'cafeFlow.cardapioEstoque.listarItensCardapio': {
handlerName: 'cafeFlowCardapioEstoqueListarItensCardapioHandler',
importPath: '/_102043_/l1/cafeFlow/layer_2_controllers/cardapioEstoque.js',
},
'cafeFlow.cardapioEstoque.listarCategoriasCardapio': {
handlerName: 'cafeFlowCardapioEstoqueListarCategoriasCardapioHandler',
importPath: '/_102043_/l1/cafeFlow/layer_2_controllers/cardapioEstoque.js',
},
'cafeFlow.cardapioEstoque.criarOuAtualizarItemCardapio': {
handlerName: 'cafeFlowCardapioEstoqueCriarOuAtualizarItemCardapioHandler',
importPath: '/_102043_/l1/cafeFlow/layer_2_controllers/cardapioEstoque.js',
},
'cafeFlow.cardapioEstoque.listarItensEstoque': {
handlerName: 'cafeFlowCardapioEstoqueListarItensEstoqueHandler',
importPath: '/_102043_/l1/cafeFlow/layer_2_controllers/cardapioEstoque.js',
},
'cafeFlow.cardapioEstoque.criarOuAtualizarItemEstoque': {
handlerName: 'cafeFlowCardapioEstoqueCriarOuAtualizarItemEstoqueHandler',
importPath: '/_102043_/l1/cafeFlow/layer_2_controllers/cardapioEstoque.js',
},
'cafeFlow.cardapioEstoque.registrarMovimentacaoEstoque': {
handlerName: 'cafeFlowCardapioEstoqueRegistrarMovimentacaoEstoqueHandler',
importPath: '/_102043_/l1/cafeFlow/layer_2_controllers/cardapioEstoque.js',
},
'cafeFlow.cardapioEstoque.listarMovimentacoesEstoque': {
handlerName: 'cafeFlowCardapioEstoqueListarMovimentacoesEstoqueHandler',
importPath: '/_102043_/l1/cafeFlow/layer_2_controllers/cardapioEstoque.js',
},
'cafeFlow.cardapioEstoque.listarAlertasEstoqueBaixo': {
handlerName: 'cafeFlowCardapioEstoqueListarAlertasEstoqueBaixoHandler',
importPath: '/_102043_/l1/cafeFlow/layer_2_controllers/cardapioEstoque.js',
},
} as const;
