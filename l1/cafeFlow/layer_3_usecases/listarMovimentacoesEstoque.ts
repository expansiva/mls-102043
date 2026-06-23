/// <mls fileReference="_102043_/l1/cafeFlow/layer_3_usecases/listarMovimentacoesEstoque.ts" enhancement="_blank"/>
import { type RequestContext } from '/_102034_/l1/server/layer_2_controllers/contracts.js';
import { EstoqueEntity, type StockMovementRecord } from '/_102043_/l1/cafeFlow/layer_4_entities/estoqueEntity.js';

export interface ListarMovimentacoesEstoqueInput {}

export interface ListarMovimentacoesEstoqueOutput {
  movimentacoes: StockMovementRecord[];
}

export async function listarMovimentacoesEstoque(
  ctx: RequestContext,
  _input: ListarMovimentacoesEstoqueInput
): Promise<ListarMovimentacoesEstoqueOutput> {
  const movimentacoes = await EstoqueEntity.list(ctx);

  return { movimentacoes };
}
