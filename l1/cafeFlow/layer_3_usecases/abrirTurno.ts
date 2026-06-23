/// <mls fileReference="_102043_/l1/cafeFlow/layer_3_usecases/abrirTurno.ts" enhancement="_blank"/>
import { AppError, type RequestContext } from '/_102034_/l1/server/layer_2_controllers/contracts.js';

export interface AbrirTurnoInput {
  turnoId: string;
}

export interface AbrirTurnoOutput {
  turnoId: string;
}

export async function abrirTurno(
  _ctx: RequestContext,
  _input: AbrirTurnoInput,
): Promise<AbrirTurnoOutput> {
  throw new AppError(
    'CONFLICT',
    'Planning error: missing entity for ShiftConfig table required to abrirTurno.',
    409,
    {
      tableName: 'ShiftConfig',
      usecaseId: 'abrirTurno',
    },
  );
}
