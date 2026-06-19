/// <mls fileReference="_102043_/l1/cafeFlow/layer_3_usecases/listarSolicitacoesResumoVendas.ts" enhancement="_blank"/>
import { type RequestContext } from '/_102034_/l1/server/layer_2_controllers/contracts.js';
import { ResumoVendasEntity, type ResumoVendasRecord } from '/_102043_/l1/cafeFlow/layer_4_entities/resumoVendasEntity.js';

export interface ListarSolicitacoesResumoVendasInput {}

export interface ListarSolicitacoesResumoVendasOutput {
solicitacoes: ResumoVendasRecord[];
}

export async function listarSolicitacoesResumoVendas(
ctx: RequestContext,
_input: ListarSolicitacoesResumoVendasInput
): Promise<ListarSolicitacoesResumoVendasOutput> {
const solicitacoes = await ResumoVendasEntity.list(ctx);
return { solicitacoes };
}
