/// <mls fileReference="_102043_/l1/cafeFlow/layer_3_usecases/listarItensCardapio.ts" enhancement="_blank"/>
import { type RequestContext } from '/_102034_/l1/server/layer_2_controllers/contracts.js';
import { CardapioEntity, type CardapioRecord } from '/_102043_/l1/cafeFlow/layer_4_entities/cardapioEntity.js';

export interface ListarItensCardapioInput {}

export interface ListarItensCardapioOutput {
  itensCardapio: CardapioRecord[];
}

export async function listarItensCardapio(
  ctx: RequestContext,
  _input: ListarItensCardapioInput
): Promise<ListarItensCardapioOutput> {
  const itensCardapio = await CardapioEntity.list(ctx);
  return { itensCardapio };
}
