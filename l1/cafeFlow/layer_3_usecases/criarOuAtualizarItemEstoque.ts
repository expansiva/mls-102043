/// <mls fileReference="_102043_/l1/cafeFlow/layer_3_usecases/criarOuAtualizarItemEstoque.ts" enhancement="_blank"/>
import { type RequestContext } from '/_102034_/l1/server/layer_2_controllers/contracts.js';
import {
  EstoqueEntity,
  type CreateEstoqueInput,
  type UpdateEstoqueInput,
  type EstoqueRecord,
} from '/_102043_/l1/cafeFlow/layer_4_entities/estoqueEntity.js';

export interface CriarOuAtualizarItemEstoqueInput {
  estoqueEntity: CreateEstoqueInput | UpdateEstoqueInput;
}

export interface CriarOuAtualizarItemEstoqueOutput {
  estoqueEntity: EstoqueRecord;
}

export async function criarOuAtualizarItemEstoque(
  ctx: RequestContext,
  input: CriarOuAtualizarItemEstoqueInput,
): Promise<CriarOuAtualizarItemEstoqueOutput> {
  const payload = input.estoqueEntity;
  const estoqueEntity = 'stockMovementId' in payload
    ? await EstoqueEntity.update(ctx, payload)
    : await EstoqueEntity.create(ctx, payload);

  return { estoqueEntity };
}
