/// <mls fileReference="_102043_/l1/cafeFlow/layer_2_controllers/menuManagement.ts" enhancement="_blank" />
import { ok, AppError, type BffHandler, type RequestContext } from '/_102034_/l1/server/layer_2_controllers/contracts.js';
import { createMenuItem, type CreateMenuItemInput, type CreateMenuItemOutput } from '/_102043_/l1/cafeFlow/layer_3_usecases/usecaseGerenciarCardapio.js';
import { listMenuItems, listIngredientsForRecipe } from '/_102043_/l1/cafeFlow/layer_3_usecases/usecaseGerenciarCardapio.js';

export interface ListMenuItemsInput {
  filtros?: {
    nome?: string;
    ativo?: boolean;
  };
}

export interface ListMenuItemsOutput {
  items: Array<{
    id: string;
    nome: string;
    preco: number;
    receita: Array<{
      ingredientId: string;
      quantidade: number;
    }>;
  }>;
}

export interface ListIngredientsForRecipeInput {
  filtros?: {
    nome?: string;
  };
}

export interface ListIngredientsForRecipeOutput {
  items: Array<{
    id: string;
    nome: string;
    unidadeMedida: string;
  }>;
}

export interface CreateMenuItemCommandInput {
  nome: string;
  preco: number;
  receita: Array<{
    ingredientId: string;
    quantidade: number;
  }>;
}

export const cafeFlowMenuManagementListMenuItemsHandler: BffHandler = async ({ request, ctx }) => {
  const input = request.params as ListMenuItemsInput;
  const result = await listMenuItems(ctx, input);
  return ok(result as ListMenuItemsOutput);
};

export const cafeFlowMenuManagementListIngredientsForRecipeHandler: BffHandler = async ({ request, ctx }) => {
  const input = request.params as ListIngredientsForRecipeInput;
  const result = await listIngredientsForRecipe(ctx, input);
  return ok(result as ListIngredientsForRecipeOutput);
};

export const cafeFlowMenuManagementCreateMenuItemHandler: BffHandler = async ({ request, ctx }) => {
  const input = request.params as CreateMenuItemCommandInput;

  if (!input?.nome) throw new AppError('VALIDATION_ERROR', 'nome is required', 400);
  if (input?.preco === undefined || input?.preco === null) throw new AppError('VALIDATION_ERROR', 'preco is required', 400);
  if (!input?.receita || input.receita.length === 0) throw new AppError('VALIDATION_ERROR', 'receita is required', 400);
  for (const [index, linha] of input.receita.entries()) {
    if (!linha?.ingredientId) throw new AppError('VALIDATION_ERROR', `receita[${index}].ingredientId is required`, 400);
    if (linha?.quantidade === undefined || linha?.quantidade === null) throw new AppError('VALIDATION_ERROR', `receita[${index}].quantidade is required`, 400);
  }

  const usecaseInput: CreateMenuItemInput = {
    name: input.nome,
    price: input.preco,
    recipeLines: input.receita.map((linha) => ({
      ingredientId: linha.ingredientId,
      quantity: linha.quantidade,
    })),
  };

  const result: CreateMenuItemOutput = await createMenuItem(ctx, usecaseInput);
  return ok(result);
};
