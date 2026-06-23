/// <mls fileReference="_102043_/l1/cafeFlow/layer_3_usecases/criarOuAtualizarItemCardapio.ts" enhancement="_blank"/>
import { AppError, type RequestContext } from '/_102034_/l1/server/layer_2_controllers/contracts.js';
import {
  CardapioEntity,
  type CardapioRecord,
  type CreateCardapioInput,
  type UpdateCardapioInput,
} from '/_102043_/l1/cafeFlow/layer_4_entities/cardapioEntity.js';

export interface CriarOuAtualizarItemCardapioInput {
  cardapioEntity: CardapioRecord;
}

export interface CriarOuAtualizarItemCardapioOutput {
  cardapioEntity: CardapioRecord;
}

export async function criarOuAtualizarItemCardapio(
  ctx: RequestContext,
  input: CriarOuAtualizarItemCardapioInput,
): Promise<CriarOuAtualizarItemCardapioOutput> {
  if (!input?.cardapioEntity) {
    throw new AppError('VALIDATION_ERROR', 'cardapioEntity é obrigatório.', 400);
  }

  if (!input.cardapioEntity.menuCategoryId) {
    throw new AppError(
      'VALIDATION_ERROR',
      'menuItemRequiresCategory: menuCategoryId obrigatório.',
      400,
      { ruleId: 'menuItemRequiresCategory' },
    );
  }

  throw new AppError(
    'CONFLICT',
    'Uso de MenuCategory requer entidade dedicada. Planejamento incompleto para menuItemRequiresCategory.',
    409,
    { ruleId: 'menuItemRequiresCategory', tableName: 'MenuCategory' },
  );

  // eslint-disable-next-line no-unreachable
  const cardapioEntity = await (async () => {
    const current = input.cardapioEntity;

    if (current.menuItemId) {
      await CardapioEntity.getById(ctx, current.menuItemId);

      const updateInput: UpdateCardapioInput = {
        menuItemId: current.menuItemId,
        patch: {
          name: current.name,
          description: current.description ?? null,
          price: current.price,
          menuCategoryId: current.menuCategoryId,
          isActive: current.isActive,
        },
      };

      return CardapioEntity.update(ctx, updateInput);
    }

    if (!current.name || current.price === undefined || current.isActive === undefined) {
      throw new AppError('VALIDATION_ERROR', 'Campos obrigatórios para criação ausentes.', 400);
    }

    const createInput: CreateCardapioInput = {
      name: current.name,
      description: current.description ?? null,
      price: current.price,
      menuCategoryId: current.menuCategoryId,
      isActive: current.isActive,
    };

    return CardapioEntity.create(ctx, createInput);
  })();

  return { cardapioEntity };
}
