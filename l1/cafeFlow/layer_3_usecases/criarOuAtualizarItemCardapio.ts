/// <mls fileReference="_102043_/l1/cafeFlow/layer_3_usecases/criarOuAtualizarItemCardapio.ts" enhancement="_blank"/>
import { AppError, type RequestContext } from '/_102034_/l1/server/layer_2_controllers/contracts.js';
import {
  CardapioEntity,
  type CardapioRecord,
  type CreateCardapioInput,
  type UpdateCardapioInput,
} from '/_102043_/l1/cafeFlow/layer_4_entities/cardapioEntity.js';

export interface CriarOuAtualizarItemCardapioInput {
  cardapioEntity: CreateCardapioInput & { menuItemId?: string };
}

export interface CriarOuAtualizarItemCardapioOutput {
  cardapioEntity: CardapioRecord;
}

const buildUpdatePatch = (
  input: CreateCardapioInput,
): UpdateCardapioInput['patch'] => {
  const patch: UpdateCardapioInput['patch'] = {};
  if (input.name !== undefined) {
    patch.name = input.name;
  }
  if (input.description !== undefined) {
    patch.description = input.description;
  }
  if (input.price !== undefined) {
    patch.price = input.price;
  }
  if (input.menuCategoryId !== undefined) {
    patch.menuCategoryId = input.menuCategoryId;
  }
  if (input.isActive !== undefined) {
    patch.isActive = input.isActive;
  }
  return patch;
};

const ensureCategoria = (menuCategoryId?: string) => {
  if (!menuCategoryId) {
    throw new AppError(
      'VALIDATION_ERROR',
      'menuItemRequiresCategory: item do cardápio deve ter categoria ativa.',
      400,
      { ruleId: 'menuItemRequiresCategory' },
    );
  }
};

export async function criarOuAtualizarItemCardapio(
  ctx: RequestContext,
  input: CriarOuAtualizarItemCardapioInput,
): Promise<CriarOuAtualizarItemCardapioOutput> {
  const { menuItemId, ...payload } = input.cardapioEntity;

  ensureCategoria(payload.menuCategoryId);

  if (menuItemId) {
    const patch = buildUpdatePatch(payload);
    const updated = await CardapioEntity.update(ctx, { menuItemId, patch });
    return { cardapioEntity: updated };
  }

  const created = await CardapioEntity.create(ctx, payload);
  return { cardapioEntity: created };
}
