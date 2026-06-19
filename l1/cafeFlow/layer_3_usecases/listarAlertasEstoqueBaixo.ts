/// <mls fileReference="_102043_/l1/cafeFlow/layer_3_usecases/listarAlertasEstoqueBaixo.ts" enhancement="_blank"/>
import { AppError, type RequestContext } from '/_102034_/l1/server/layer_2_controllers/contracts.js';
import { type EstoqueRecord } from '/_102043_/l1/cafeFlow/layer_4_entities/estoqueEntity.js';

export interface ListarAlertasEstoqueBaixoInput {}

export interface ListarAlertasEstoqueBaixoOutput {
  alertas: EstoqueRecord[];
}

export async function listarAlertasEstoqueBaixo(
  _ctx: RequestContext,
  _input: ListarAlertasEstoqueBaixoInput,
): Promise<ListarAlertasEstoqueBaixoOutput> {
  throw new AppError(
    'CONFLICT',
    'Planning error: missing entity ownership for table low_stock_alerts in usecase listarAlertasEstoqueBaixo.',
    409,
    { tableName: 'low_stock_alerts', usecaseId: 'listarAlertasEstoqueBaixo' },
  );
}
