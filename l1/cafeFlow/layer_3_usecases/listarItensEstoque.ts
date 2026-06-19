/// <mls fileReference="_102043_/l1/cafeFlow/layer_3_usecases/listarItensEstoque.ts" enhancement="_blank"/>
import { type RequestContext } from '/_102034_/l1/server/layer_2_controllers/contracts.js';
import { EstoqueEntity, type EstoqueRecord } from '/_102043_/l1/cafeFlow/layer_4_entities/estoqueEntity.js';

export interface ListarItensEstoqueInput {}

export interface ListarItensEstoqueOutput {
  itensEstoque: EstoqueRecord[];
}

export async function listarItensEstoque(
  ctx: RequestContext,
  _input: ListarItensEstoqueInput,
): Promise<ListarItensEstoqueOutput> {
  const itensEstoque = await EstoqueEntity.list(ctx);

  return { itensEstoque };
}
