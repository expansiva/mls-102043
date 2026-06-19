/// <mls fileReference="_102043_/l1/cafeFlow/layer_2_controllers/fechamentoTurno.ts" enhancement="_blank"/>
import { ok, AppError, type BffHandler } from '/_102034_/l1/server/layer_2_controllers/contracts.js';
import {
  listarTurnos,
  type ListarTurnosInput,
  type ListarTurnosOutput,
} from '/_102043_/l1/cafeFlow/layer_3_usecases/listarTurnos.js';
import {
  listarPedidos,
  type ListarPedidosInput,
  type ListarPedidosOutput,
} from '/_102043_/l1/cafeFlow/layer_3_usecases/listarPedidos.js';
import {
  fecharTurno,
  type FecharTurnoInput,
  type FecharTurnoOutput,
} from '/_102043_/l1/cafeFlow/layer_3_usecases/fecharTurno.js';
import {
  obterRelatorioTurno,
  type ObterRelatorioTurnoInput,
  type ObterRelatorioTurnoOutput,
} from '/_102043_/l1/cafeFlow/layer_3_usecases/obterRelatorioTurno.js';

type ListarPedidosParams = {
  shiftId?: string;
  status?: string;
};

type TurnoParams = {
  shiftId?: string;
};

export const cafeFlowFechamentoTurnoListarTurnosHandler: BffHandler = async ({ request, ctx }) => {
  const input = request.params as ListarTurnosInput;
  const result: ListarTurnosOutput = await listarTurnos(ctx, input);
  return ok(result.turnos);
};

export const cafeFlowFechamentoTurnoListarPedidosHandler: BffHandler = async ({ request, ctx }) => {
  const params = request.params as ListarPedidosParams;
  if (!params.shiftId) {
    throw new AppError('VALIDATION_ERROR', 'shiftId is required', 400, { field: 'shiftId' });
  }
  const input: ListarPedidosInput = {};
  const result: ListarPedidosOutput = await listarPedidos(ctx, input);
  return ok(result.pedidos);
};

export const cafeFlowFechamentoTurnoFecharTurnoHandler: BffHandler = async ({ request, ctx }) => {
  const params = request.params as TurnoParams;
  if (!params.shiftId) {
    throw new AppError('VALIDATION_ERROR', 'shiftId is required', 400, { field: 'shiftId' });
  }
  const input: FecharTurnoInput = {
    turnoId: params.shiftId,
  };
  const result: FecharTurnoOutput = await fecharTurno(ctx, input);
  return ok(result);
};

export const cafeFlowFechamentoTurnoObterRelatorioTurnoHandler: BffHandler = async ({ request, ctx }) => {
  const params = request.params as TurnoParams;
  if (!params.shiftId) {
    throw new AppError('VALIDATION_ERROR', 'shiftId is required', 400, { field: 'shiftId' });
  }
  const input: ObterRelatorioTurnoInput = {
    turnoId: params.shiftId,
  };
  const result: ObterRelatorioTurnoOutput = await obterRelatorioTurno(ctx, input);
  return ok(result);
};

export const fechamentoTurnoRoutes = {
  'cafeFlow.fechamentoTurno.listarTurnos': {
    handlerName: 'cafeFlowFechamentoTurnoListarTurnosHandler',
    importPath: '/_102043_/l1/cafeFlow/layer_2_controllers/fechamentoTurno.js',
  },
  'cafeFlow.fechamentoTurno.listarPedidos': {
    handlerName: 'cafeFlowFechamentoTurnoListarPedidosHandler',
    importPath: '/_102043_/l1/cafeFlow/layer_2_controllers/fechamentoTurno.js',
  },
  'cafeFlow.fechamentoTurno.fecharTurno': {
    handlerName: 'cafeFlowFechamentoTurnoFecharTurnoHandler',
    importPath: '/_102043_/l1/cafeFlow/layer_2_controllers/fechamentoTurno.js',
  },
  'cafeFlow.fechamentoTurno.obterRelatorioTurno': {
    handlerName: 'cafeFlowFechamentoTurnoObterRelatorioTurnoHandler',
    importPath: '/_102043_/l1/cafeFlow/layer_2_controllers/fechamentoTurno.js',
  },
};
