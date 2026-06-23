/// <mls fileReference="_102043_/l1/cafeFlow/layer_3_usecases/listarTurnos.ts" enhancement="_blank" />
import { type RequestContext } from '/_102034_/l1/server/layer_2_controllers/contracts.js';
import { TurnoEntity, type TurnoRecord } from '/_102043_/l1/cafeFlow/layer_4_entities/turnoEntity.js';

export interface ListarTurnosInput {}

export interface ListarTurnosResult {
  turnos: TurnoRecord[];
}

export async function listarTurnos(
  ctx: RequestContext,
  _input: ListarTurnosInput,
): Promise<ListarTurnosResult> {
  const turnos = await TurnoEntity.list(ctx);
  return { turnos };
}
