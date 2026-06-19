/// <mls fileReference="_102043_/l1/cafeFlow/layer_3_usecases/abrirTurno.ts" enhancement="_blank"/>
import { AppError, type RequestContext } from '/_102034_/l1/server/layer_2_controllers/contracts.js';

export interface AbrirTurnoInput {
  turnoId: string;
}

export interface AbrirTurnoResult {
  turnoId: string;
}

export async function abrirTurno(
  _ctx: RequestContext,
  _input: AbrirTurnoInput
): Promise<AbrirTurnoResult> {
  throw new AppError(
    'CONFLICT',
    'Planejamento incompleto: leitura de ShiftConfig sem entidade correspondente em entityRefs para abrirTurno.',
    409,
    {
      missingEntityForTable: 'ShiftConfig',
      usecaseId: 'abrirTurno'
    }
  );
}
