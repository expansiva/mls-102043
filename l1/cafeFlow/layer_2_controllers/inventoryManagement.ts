/// <mls fileReference="_102043_/l1/cafeFlow/layer_2_controllers/inventoryManagement.ts" enhancement="_blank" />
import { ok, AppError, type BffHandler, type RequestContext } from '/_102034_/l1/server/layer_2_controllers/contracts.js';
import { adjustStockQuantity, type AdjustStockQuantityInput, type StockItemOutput } from '/_102043_/l1/cafeFlow/layer_3_usecases/usecaseAjustarEstoque.js';

export const cafeFlowListIngredientsHandler: BffHandler = async ({ request, ctx }) => {
  const input = request.params as AdjustStockQuantityInput;

  if (!input?.stockItemId) throw new AppError('VALIDATION_ERROR', 'stockItemId is required', 400);
  if (input?.newQuantity === undefined || input?.newQuantity === null) {
    throw new AppError('VALIDATION_ERROR', 'newQuantity is required', 400);
  }

  const result: StockItemOutput = await adjustStockQuantity(ctx, input);
  return ok(result);
};

export const cafeFlowUpdateIngredientStockHandler: BffHandler = async ({ request, ctx }) => {
  const input = request.params as AdjustStockQuantityInput;

  if (!input?.stockItemId) throw new AppError('VALIDATION_ERROR', 'stockItemId is required', 400);
  if (input?.newQuantity === undefined || input?.newQuantity === null) {
    throw new AppError('VALIDATION_ERROR', 'newQuantity is required', 400);
  }

  const result: StockItemOutput = await adjustStockQuantity(ctx, input);
  return ok(result);
};
