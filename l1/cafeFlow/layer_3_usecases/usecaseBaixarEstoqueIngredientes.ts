/// <mls fileReference="_102043_/l1/cafeFlow/layer_3_usecases/usecaseBaixarEstoqueIngredientes.ts" enhancement="_blank" />
import { AppError, type RequestContext } from '/_102034_/l1/server/layer_2_controllers/contracts.js';

export type OrderStatus = 'created' | 'preparing' | 'delivered' | 'cancelled';

export interface OrderItemLine {
  menu_item_id: string;
  quantity: number;
}

export interface OrderAggregateRecord {
  order_id: string;
  status: OrderStatus;
  items: OrderItemLine[];
  delivered_at?: string | null;
  created_at: string;
}

export interface RecipeLineRecord {
  recipe_line_id: string;
  menu_item_id: string;
  ingredient_id: string;
  quantity_per_unit: number;
}

export interface IngredientRecord {
  ingredient_id: string;
  name: string;
  unit: string;
  low_stock_threshold: number;
}

export interface StockItemRecord {
  stock_item_id: string;
  ingredient_id: string;
  quantity_available: number;
  updated_at: string;
}

export interface LowStockMetricRecord {
  metric_id: string;
  ingredient_id: string;
  quantity_available: number;
  threshold: number;
  order_id: string;
  created_at: string;
}

export interface DeductStockByRecipeInput {
  orderId: string;
}

export interface DeductStockByRecipeOutput {
  stockItems: StockItemRecord[];
}

export async function deductStockByRecipe(
  ctx: RequestContext,
  input: DeductStockByRecipeInput,
): Promise<DeductStockByRecipeOutput> {
  if (!input.orderId) {
    throw new AppError('VALIDATION_ERROR', 'Order id is required', 400, { field: 'orderId' });
  }

  const nowIso = ctx.clock.nowIso();

  return await ctx.data.moduleData.runInTransaction(async (txRuntime) => {
    const orderRepo = await txRuntime.getTable<OrderAggregateRecord>('order_aggregate');
    const recipeLineRepo = await txRuntime.getTable<RecipeLineRecord>('RecipeLine');
    const ingredientRepo = await txRuntime.getTable<IngredientRecord>('Ingredient');
    const stockRepo = await txRuntime.getTable<StockItemRecord>('StockItem');
    const lowStockRepo = await txRuntime.getTable<LowStockMetricRecord>('low_stock_metrics');

    const order = await orderRepo.findOne({ where: { order_id: input.orderId } });
    if (!order) {
      throw new AppError('NOT_FOUND', 'Order not found', 404, { orderId: input.orderId });
    }

    if (order.status !== 'delivered') {
      throw new AppError('CONFLICT', 'Order must be delivered to deduct stock', 409, {
        orderId: input.orderId,
        status: order.status,
      });
    }

    if (!order.items || order.items.length === 0) {
      throw new AppError('VALIDATION_ERROR', 'Order has no items to deduct', 400, {
        orderId: input.orderId,
      });
    }

    const menuItemIds = Array.from(new Set(order.items.map((item) => item.menu_item_id)));

    const recipeLines = await recipeLineRepo.findManyByValues({
      field: 'menu_item_id',
      values: menuItemIds,
    });

    if (recipeLines.length === 0) {
      throw new AppError('NOT_FOUND', 'No recipe lines found for order items', 404, {
        orderId: input.orderId,
      });
    }

    const requiredByIngredient = new Map<string, number>();

    for (const item of order.items) {
      const itemRecipeLines = recipeLines.filter((line) => line.menu_item_id === item.menu_item_id);
      if (itemRecipeLines.length === 0) {
        throw new AppError('NOT_FOUND', 'Recipe not found for menu item', 404, {
          menuItemId: item.menu_item_id,
          orderId: input.orderId,
        });
      }

      for (const line of itemRecipeLines) {
        const required = line.quantity_per_unit * item.quantity;
        const current = requiredByIngredient.get(line.ingredient_id) ?? 0;
        requiredByIngredient.set(line.ingredient_id, current + required);
      }
    }

    const ingredientIds = Array.from(requiredByIngredient.keys());

    const ingredients = await ingredientRepo.findManyByValues({
      field: 'ingredient_id',
      values: ingredientIds,
    });

    if (ingredients.length !== ingredientIds.length) {
      const foundIds = new Set(ingredients.map((ing) => ing.ingredient_id));
      const missing = ingredientIds.filter((id) => !foundIds.has(id));
      throw new AppError('NOT_FOUND', 'Ingredient not found', 404, { missing });
    }

    const stockItems = await stockRepo.findManyByValues({
      field: 'ingredient_id',
      values: ingredientIds,
    });

    if (stockItems.length !== ingredientIds.length) {
      const foundIds = new Set(stockItems.map((stock) => stock.ingredient_id));
      const missing = ingredientIds.filter((id) => !foundIds.has(id));
      throw new AppError('NOT_FOUND', 'Stock item not found for ingredient', 404, { missing });
    }

    const ingredientById = new Map(ingredients.map((ing) => [ing.ingredient_id, ing] as const));
    const stockByIngredient = new Map(stockItems.map((stock) => [stock.ingredient_id, stock] as const));

    const updatedStockItems: StockItemRecord[] = [];

    for (const ingredientId of ingredientIds) {
      const required = requiredByIngredient.get(ingredientId) ?? 0;
      const stockItem = stockByIngredient.get(ingredientId);

      if (!stockItem) {
        throw new AppError('NOT_FOUND', 'Stock item not found for ingredient', 404, { ingredientId });
      }

      if (stockItem.quantity_available < required) {
        throw new AppError('CONFLICT', 'Insufficient stock to deduct ingredient', 409, {
          ingredientId,
          required,
          available: stockItem.quantity_available,
        });
      }

      const newQuantity = stockItem.quantity_available - required;

      await stockRepo.update({
        where: { stock_item_id: stockItem.stock_item_id },
        patch: { quantity_available: newQuantity, updated_at: nowIso },
      });

      const updatedStock: StockItemRecord = {
        ...stockItem,
        quantity_available: newQuantity,
        updated_at: nowIso,
      };

      updatedStockItems.push(updatedStock);

      const ingredient = ingredientById.get(ingredientId);
      if (!ingredient) {
        throw new AppError('NOT_FOUND', 'Ingredient not found for stock check', 404, {
          ingredientId,
        });
      }

      if (newQuantity < ingredient.low_stock_threshold) {
        await lowStockRepo.insert({
          record: {
            metric_id: ctx.idGenerator.newId(),
            ingredient_id: ingredientId,
            quantity_available: newQuantity,
            threshold: ingredient.low_stock_threshold,
            order_id: order.order_id,
            created_at: nowIso,
          },
        });
      }
    }

    return { stockItems: updatedStockItems };
  });
}
