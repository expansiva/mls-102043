/// <mls fileReference="_102043_/l1/cafeFlow/layer_3_usecases/usecaseGerenciarCardapio.ts" enhancement="_blank" />
import { AppError, type RequestContext } from '/_102034_/l1/server/layer_2_controllers/contracts.js';

export interface MenuItemRecord {
  menuItemId: string;
  name: string;
  description: string | null;
  price: number;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface RecipeLineRecord {
  recipeLineId: string;
  menuItemId: string;
  ingredientId: string;
  quantity: number;
  unit: string | null;
  createdAt: string;
  updatedAt: string;
}

export interface IngredientRecord {
  ingredientId: string;
  name: string;
  unit: string | null;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface RecipeLineInput {
  ingredientId: string;
  quantity: number;
  unit?: string | null;
}

export interface MenuItemPatch {
  name?: string;
  description?: string | null;
  price?: number;
  isActive?: boolean;
}

export interface MenuItemAggregate {
  menuItem: MenuItemRecord;
  recipeLines: RecipeLineRecord[];
}

export interface CreateMenuItemInput {
  name: string;
  description?: string | null;
  price: number;
  isActive?: boolean;
  recipeLines: RecipeLineInput[];
}

export interface CreateMenuItemOutput {
  menuItem: MenuItemRecord;
  recipeLines: RecipeLineRecord[];
}

export interface UpdateMenuItemInput {
  menuItemId: string;
  patch: MenuItemPatch;
}

export interface UpdateMenuItemOutput {
  menuItem: MenuItemRecord;
  recipeLines: RecipeLineRecord[];
}

export interface AddRecipeLineInput {
  menuItemId: string;
  ingredientId: string;
  quantity: number;
  unit?: string | null;
}

export interface AddRecipeLineOutput {
  menuItem: MenuItemRecord;
  recipeLines: RecipeLineRecord[];
}

export interface RemoveRecipeLineInput {
  menuItemId: string;
  recipeLineId: string;
}

export interface RemoveRecipeLineOutput {
  menuItem: MenuItemRecord;
  recipeLines: RecipeLineRecord[];
}

async function getMenuItemRepository(ctx: RequestContext) {
  return await ctx.data.moduleData.getTable<MenuItemRecord>('MenuItem');
}

async function getRecipeLineRepository(ctx: RequestContext) {
  return await ctx.data.moduleData.getTable<RecipeLineRecord>('RecipeLine');
}

async function getIngredientRepository(ctx: RequestContext) {
  return await ctx.data.moduleData.getTable<IngredientRecord>('Ingredient');
}

export async function createMenuItem(
  ctx: RequestContext,
  input: CreateMenuItemInput,
): Promise<CreateMenuItemOutput> {
  if (!input.name) {
    throw new AppError('VALIDATION_ERROR', 'Name is required', 400, { field: 'name' });
  }
  if (typeof input.price !== 'number') {
    throw new AppError('VALIDATION_ERROR', 'Price is required', 400, { field: 'price' });
  }
  if (!input.recipeLines || input.recipeLines.length === 0) {
    throw new AppError(
      'VALIDATION_ERROR',
      'Menu item must have at least one recipe line',
      400,
      { rule: 'rule-menuitem-recipe-required' },
    );
  }

  const nowIso = ctx.clock.nowIso();
  const menuItemId = ctx.idGenerator.newId();

  const menuItemRecord: MenuItemRecord = {
    menuItemId,
    name: input.name,
    description: input.description ?? null,
    price: input.price,
    isActive: input.isActive ?? true,
    createdAt: nowIso,
    updatedAt: nowIso,
  };

  const recipeLineRecords: RecipeLineRecord[] = [];

  await ctx.data.moduleData.runInTransaction(async (txRuntime) => {
    const menuItemRepo = await txRuntime.getTable<MenuItemRecord>('MenuItem');
    const recipeLineRepo = await txRuntime.getTable<RecipeLineRecord>('RecipeLine');
    const ingredientRepo = await txRuntime.getTable<IngredientRecord>('Ingredient');

    for (const line of input.recipeLines) {
      if (!line.ingredientId) {
        throw new AppError('VALIDATION_ERROR', 'Ingredient is required', 400, {
          field: 'ingredientId',
        });
      }
      if (typeof line.quantity !== 'number' || line.quantity <= 0) {
        throw new AppError('VALIDATION_ERROR', 'Quantity must be greater than zero', 400, {
          field: 'quantity',
        });
      }

      const ingredient = await ingredientRepo.findOne({
        where: { ingredientId: line.ingredientId },
      });
      if (!ingredient) {
        throw new AppError('NOT_FOUND', 'Ingredient not found', 404, {
          ingredientId: line.ingredientId,
        });
      }

      recipeLineRecords.push({
        recipeLineId: ctx.idGenerator.newId(),
        menuItemId,
        ingredientId: line.ingredientId,
        quantity: line.quantity,
        unit: line.unit ?? null,
        createdAt: nowIso,
        updatedAt: nowIso,
      });
    }

    await menuItemRepo.insert({ record: menuItemRecord });

    for (const record of recipeLineRecords) {
      await recipeLineRepo.insert({ record });
    }
  });

  return {
    menuItem: menuItemRecord,
    recipeLines: recipeLineRecords,
  };
}

export async function updateMenuItem(
  ctx: RequestContext,
  input: UpdateMenuItemInput,
): Promise<UpdateMenuItemOutput> {
  if (!input.menuItemId) {
    throw new AppError('VALIDATION_ERROR', 'Menu item id is required', 400, {
      field: 'menuItemId',
    });
  }
  if (!input.patch || Object.keys(input.patch).length === 0) {
    throw new AppError('VALIDATION_ERROR', 'Patch is required', 400, { field: 'patch' });
  }

  const menuItemRepo = await getMenuItemRepository(ctx);
  const recipeLineRepo = await getRecipeLineRepository(ctx);

  const existing = await menuItemRepo.findOne({ where: { menuItemId: input.menuItemId } });
  if (!existing) {
    throw new AppError('NOT_FOUND', 'Menu item not found', 404, {
      menuItemId: input.menuItemId,
    });
  }

  const nowIso = ctx.clock.nowIso();

  await menuItemRepo.update({
    where: { menuItemId: input.menuItemId },
    patch: {
      ...input.patch,
      updatedAt: nowIso,
    },
  });

  const updated = await menuItemRepo.findOne({ where: { menuItemId: input.menuItemId } });
  if (!updated) {
    throw new AppError('NOT_FOUND', 'Menu item not found after update', 404, {
      menuItemId: input.menuItemId,
    });
  }

  const recipeLines = await recipeLineRepo.findMany({
    where: { menuItemId: input.menuItemId },
  });

  if (recipeLines.length === 0) {
    throw new AppError(
      'CONFLICT',
      'Menu item must have at least one recipe line',
      409,
      { rule: 'rule-menuitem-recipe-required' },
    );
  }

  return {
    menuItem: updated,
    recipeLines,
  };
}

export async function addRecipeLine(
  ctx: RequestContext,
  input: AddRecipeLineInput,
): Promise<AddRecipeLineOutput> {
  if (!input.menuItemId) {
    throw new AppError('VALIDATION_ERROR', 'Menu item id is required', 400, {
      field: 'menuItemId',
    });
  }
  if (!input.ingredientId) {
    throw new AppError('VALIDATION_ERROR', 'Ingredient id is required', 400, {
      field: 'ingredientId',
    });
  }
  if (typeof input.quantity !== 'number' || input.quantity <= 0) {
    throw new AppError('VALIDATION_ERROR', 'Quantity must be greater than zero', 400, {
      field: 'quantity',
    });
  }

  const menuItemRepo = await getMenuItemRepository(ctx);
  const recipeLineRepo = await getRecipeLineRepository(ctx);
  const ingredientRepo = await getIngredientRepository(ctx);

  const menuItem = await menuItemRepo.findOne({ where: { menuItemId: input.menuItemId } });
  if (!menuItem) {
    throw new AppError('NOT_FOUND', 'Menu item not found', 404, {
      menuItemId: input.menuItemId,
    });
  }

  const ingredient = await ingredientRepo.findOne({
    where: { ingredientId: input.ingredientId },
  });
  if (!ingredient) {
    throw new AppError('NOT_FOUND', 'Ingredient not found', 404, {
      ingredientId: input.ingredientId,
    });
  }

  const nowIso = ctx.clock.nowIso();
  const recipeLine: RecipeLineRecord = {
    recipeLineId: ctx.idGenerator.newId(),
    menuItemId: input.menuItemId,
    ingredientId: input.ingredientId,
    quantity: input.quantity,
    unit: input.unit ?? null,
    createdAt: nowIso,
    updatedAt: nowIso,
  };

  await recipeLineRepo.insert({ record: recipeLine });

  const recipeLines = await recipeLineRepo.findMany({
    where: { menuItemId: input.menuItemId },
  });

  return {
    menuItem,
    recipeLines,
  };
}

export async function removeRecipeLine(
  ctx: RequestContext,
  input: RemoveRecipeLineInput,
): Promise<RemoveRecipeLineOutput> {
  if (!input.menuItemId) {
    throw new AppError('VALIDATION_ERROR', 'Menu item id is required', 400, {
      field: 'menuItemId',
    });
  }
  if (!input.recipeLineId) {
    throw new AppError('VALIDATION_ERROR', 'Recipe line id is required', 400, {
      field: 'recipeLineId',
    });
  }

  let menuItem: MenuItemRecord | null = null;
  let recipeLines: RecipeLineRecord[] = [];

  await ctx.data.moduleData.runInTransaction(async (txRuntime) => {
    const menuItemRepo = await txRuntime.getTable<MenuItemRecord>('MenuItem');
    const recipeLineRepo = await txRuntime.getTable<RecipeLineRecord>('RecipeLine');

    menuItem = await menuItemRepo.findOne({ where: { menuItemId: input.menuItemId } });
    if (!menuItem) {
      throw new AppError('NOT_FOUND', 'Menu item not found', 404, {
        menuItemId: input.menuItemId,
      });
    }

    const recipeLine = await recipeLineRepo.findOne({
      where: { recipeLineId: input.recipeLineId, menuItemId: input.menuItemId },
    });
    if (!recipeLine) {
      throw new AppError('NOT_FOUND', 'Recipe line not found', 404, {
        recipeLineId: input.recipeLineId,
      });
    }

    await recipeLineRepo.delete({
      where: { recipeLineId: input.recipeLineId },
    });

    recipeLines = await recipeLineRepo.findMany({
      where: { menuItemId: input.menuItemId },
    });

    if (recipeLines.length === 0) {
      throw new AppError(
        'CONFLICT',
        'Menu item must have at least one recipe line',
        409,
        { rule: 'rule-menuitem-recipe-required' },
      );
    }
  });

  return {
    menuItem: menuItem as MenuItemRecord,
    recipeLines,
  };
}
