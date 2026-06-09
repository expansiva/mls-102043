/// <mls fileReference="_102043_/l1/cafeFlow/layer_3_usecases/usecaseAjustarEstoque.ts" enhancement="_blank" />
import { AppError, type RequestContext } from '/_102034_/l1/server/layer_2_controllers/contracts.js';

export interface StockItemRecord {
  stockItemId: string;
  ingredientId: string;
  quantity: number;
  minStockLevel: number | null;
  updatedAt: string;
}

export interface IngredientRecord {
  ingredientId: string;
  name: string | null;
}

export interface LowStockMetricsRecord {
  metricId: string;
  stockItemId: string;
  ingredientId: string;
  quantity: number;
  minStockLevel: number;
  createdAt: string;
}

export interface AdjustStockQuantityInput {
  stockItemId: string;
  newQuantity: number;
}

export interface SetMinStockLevelInput {
  stockItemId: string;
  minStockLevel: number;
}

export type StockItemOutput = StockItemRecord;

async function getStockItemRepository(ctx: RequestContext) {
  return await ctx.data.moduleData.getTable<StockItemRecord>('StockItem');
}

async function getIngredientRepository(ctx: RequestContext) {
  return await ctx.data.moduleData.getTable<IngredientRecord>('Ingredient');
}

async function getLowStockMetricsRepository(ctx: RequestContext) {
  return await ctx.data.moduleData.getTable<LowStockMetricsRecord>('low_stock_metrics');
}

function assertNonNegative(value: number, field: string) {
  if (Number.isNaN(value)) {
    throw new AppError('VALIDATION_ERROR', 'Field must be a number', 400, { field });
  }
  if (value < 0) {
    throw new AppError('VALIDATION_ERROR', 'Field must be non-negative', 400, { field });
  }
}

export async function adjustStockQuantity(
  ctx: RequestContext,
  input: AdjustStockQuantityInput,
): Promise<StockItemOutput> {
  if (!input.stockItemId) {
    throw new AppError('VALIDATION_ERROR', 'Field is required', 400, { field: 'stockItemId' });
  }
  if (input.newQuantity === undefined || input.newQuantity === null) {
    throw new AppError('VALIDATION_ERROR', 'Field is required', 400, { field: 'newQuantity' });
  }
  assertNonNegative(input.newQuantity, 'newQuantity');

  const now = ctx.clock.nowIso();

  let updatedStockItem: StockItemRecord | null = null;

  await ctx.data.moduleData.runInTransaction(async (txRuntime) => {
    const stockRepo = await txRuntime.getTable<StockItemRecord>('StockItem');
    const ingredientRepo = await txRuntime.getTable<IngredientRecord>('Ingredient');
    const lowStockRepo = await txRuntime.getTable<LowStockMetricsRecord>('low_stock_metrics');

    const stockItem = await stockRepo.findOne({ where: { stockItemId: input.stockItemId } });
    if (!stockItem) {
      throw new AppError('NOT_FOUND', 'Stock item not found', 404, { stockItemId: input.stockItemId });
    }

    const ingredient = await ingredientRepo.findOne({ where: { ingredientId: stockItem.ingredientId } });
    if (!ingredient) {
      throw new AppError('NOT_FOUND', 'Ingredient not found', 404, { ingredientId: stockItem.ingredientId });
    }

    await stockRepo.update({
      where: { stockItemId: input.stockItemId },
      patch: { quantity: input.newQuantity, updatedAt: now },
    });

    const minLevel = stockItem.minStockLevel;
    if (minLevel !== null && input.newQuantity < minLevel) {
      const metric: LowStockMetricsRecord = {
        metricId: ctx.idGenerator.newId(),
        stockItemId: stockItem.stockItemId,
        ingredientId: stockItem.ingredientId,
        quantity: input.newQuantity,
        minStockLevel: minLevel,
        createdAt: now,
      };
      await lowStockRepo.insert({ record: metric });
    }

    updatedStockItem = await stockRepo.findOne({ where: { stockItemId: input.stockItemId } });
  });

  if (!updatedStockItem) {
    throw new AppError('NOT_FOUND', 'Stock item not found after update', 404, { stockItemId: input.stockItemId });
  }

  return updatedStockItem;
}

export async function setMinStockLevel(
  ctx: RequestContext,
  input: SetMinStockLevelInput,
): Promise<StockItemOutput> {
  if (!input.stockItemId) {
    throw new AppError('VALIDATION_ERROR', 'Field is required', 400, { field: 'stockItemId' });
  }
  if (input.minStockLevel === undefined || input.minStockLevel === null) {
    throw new AppError('VALIDATION_ERROR', 'Field is required', 400, { field: 'minStockLevel' });
  }
  assertNonNegative(input.minStockLevel, 'minStockLevel');

  const now = ctx.clock.nowIso();
  let updatedStockItem: StockItemRecord | null = null;

  await ctx.data.moduleData.runInTransaction(async (txRuntime) => {
    const stockRepo = await txRuntime.getTable<StockItemRecord>('StockItem');
    const ingredientRepo = await txRuntime.getTable<IngredientRecord>('Ingredient');
    const lowStockRepo = await txRuntime.getTable<LowStockMetricsRecord>('low_stock_metrics');

    const stockItem = await stockRepo.findOne({ where: { stockItemId: input.stockItemId } });
    if (!stockItem) {
      throw new AppError('NOT_FOUND', 'Stock item not found', 404, { stockItemId: input.stockItemId });
    }

    const ingredient = await ingredientRepo.findOne({ where: { ingredientId: stockItem.ingredientId } });
    if (!ingredient) {
      throw new AppError('NOT_FOUND', 'Ingredient not found', 404, { ingredientId: stockItem.ingredientId });
    }

    await stockRepo.update({
      where: { stockItemId: input.stockItemId },
      patch: { minStockLevel: input.minStockLevel, updatedAt: now },
    });

    if (stockItem.quantity < input.minStockLevel) {
      const metric: LowStockMetricsRecord = {
        metricId: ctx.idGenerator.newId(),
        stockItemId: stockItem.stockItemId,
        ingredientId: stockItem.ingredientId,
        quantity: stockItem.quantity,
        minStockLevel: input.minStockLevel,
        createdAt: now,
      };
      await lowStockRepo.insert({ record: metric });
    }

    updatedStockItem = await stockRepo.findOne({ where: { stockItemId: input.stockItemId } });
  });

  if (!updatedStockItem) {
    throw new AppError('NOT_FOUND', 'Stock item not found after update', 404, { stockItemId: input.stockItemId });
  }

  return updatedStockItem;
}
