/// <mls fileReference="_102043_/l1/cafeFlow/layer_3_usecases/solicitarResumoVendasDia.ts" enhancement="_blank"/>
import { type RequestContext } from '/_102034_/l1/server/layer_2_controllers/contracts.js';
import {
  ResumoVendasEntity,
  type CreateResumoVendasInput,
  type ResumoVendasRecord,
} from '/_102043_/l1/cafeFlow/layer_4_entities/resumoVendasEntity.js';

export interface SolicitarResumoVendasDiaInput {
  resumoVendas: CreateResumoVendasInput;
}

export interface SolicitarResumoVendasDiaOutput {
  resumoVendas: ResumoVendasRecord;
}

export async function solicitarResumoVendasDia(
  ctx: RequestContext,
  input: SolicitarResumoVendasDiaInput
): Promise<SolicitarResumoVendasDiaOutput> {
  const resumoVendas = await ResumoVendasEntity.create(ctx, input.resumoVendas);

  return { resumoVendas };
}
