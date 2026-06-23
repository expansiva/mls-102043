/// <mls fileReference="_102043_/l1/cafeFlow/layer_2_controllers/fechamentoTurno.ts" enhancement="_blank"/>
import { ok, AppError, type BffHandler } from '/_102034_/l1/server/layer_2_controllers/contracts.js';
import {
  listarTurnos,
  type ListarTurnosInput,
} from '/_102043_/l1/cafeFlow/layer_3_usecases/listarTurnos.js';
import {
  listarPedidos,
  type ListarPedidosInput,
} from '/_102043_/l1/cafeFlow/layer_3_usecases/listarPedidos.js';
import {
  fecharTurno,
  type FecharTurnoInput,
} from '/_102043_/l1/cafeFlow/layer_3_usecases/fecharTurno.js';
import {
  obterRelatorioTurno,
  type ObterRelatorioTurnoInput,
} from '/_102043_/l1/cafeFlow/layer_3_usecases/obterRelatorioTurno.js';
import {
  type FechamentoTurnoListarTurnosInput,
  type FechamentoTurnoListarTurnosOutput,
  type FechamentoTurnoListarPedidosInput,
  type FechamentoTurnoListarPedidosOutput,
  type FechamentoTurnoFecharTurnoInput,
  type FechamentoTurnoFecharTurnoOutput,
  type FechamentoTurnoObterRelatorioTurnoInput,
  type FechamentoTurnoObterRelatorioTurnoOutput,
} from '/_102043_/l2/cafeFlow/web/contracts/fechamentoTurno.js';

export const cafeFlowFechamentoTurnoListarTurnosHandler: BffHandler = async ({ request, ctx }) => {
  const input = request.params as FechamentoTurnoListarTurnosInput;
  const result = await listarTurnos(ctx, input as ListarTurnosInput);
  const output: FechamentoTurnoListarTurnosOutput = result.turnos.map((turno) => ({
    shiftId: turno.shift_id,
    status: turno.status,
    openedAt: turno.opened_at,
    closedAt: turno.closed_at ?? '',
    shiftConfigId: turno.shift_config_id,
  }));
  return ok(output);
};

export const cafeFlowFechamentoTurnoListarPedidosHandler: BffHandler = async ({ request, ctx }) => {
  const input = request.params as FechamentoTurnoListarPedidosInput;
  if (!input.shiftId) {
    throw new AppError('VALIDATION_ERROR', 'shiftId is required', 400, { field: 'shiftId' });
  }
  const result = await listarPedidos(ctx, input as ListarPedidosInput);
  const output: FechamentoTurnoListarPedidosOutput = result.pedidos.map((pedido) => ({
    orderId: pedido.order_id,
    status: pedido.status,
    shiftId: pedido.shift_id,
    createdAt: pedido.created_at,
    updatedAt: pedido.updated_at,
  }));
  return ok(output);
};

export const cafeFlowFechamentoTurnoFecharTurnoHandler: BffHandler = async ({ request, ctx }) => {
  const input = request.params as FechamentoTurnoFecharTurnoInput;
  if (!input.shiftId) {
    throw new AppError('VALIDATION_ERROR', 'shiftId is required', 400, { field: 'shiftId' });
  }
  const result = await fecharTurno(ctx, { turnoId: input.shiftId } as FecharTurnoInput);
  const output: FechamentoTurnoFecharTurnoOutput = {
    shiftId: result.turnoId,
    status: result.status,
    closedAt: (result as { closedAt?: string | null }).closedAt ?? '',
    shiftReportId: (result as { shiftReportId?: string | null }).shiftReportId ?? '',
  };
  return ok(output);
};

export const cafeFlowFechamentoTurnoObterRelatorioTurnoHandler: BffHandler = async ({ request, ctx }) => {
  const input = request.params as FechamentoTurnoObterRelatorioTurnoInput;
  if (!input.shiftId) {
    throw new AppError('VALIDATION_ERROR', 'shiftId is required', 400, { field: 'shiftId' });
  }
  const result = await obterRelatorioTurno(ctx, { turnoId: input.shiftId } as ObterRelatorioTurnoInput);
  const report =
    (result as unknown as { turno?: Record<string, unknown> }).turno ??
    (result as unknown as Record<string, unknown>);
  const output: FechamentoTurnoObterRelatorioTurnoOutput = {
    shiftReportId:
      (report as { shiftReportId?: string; shift_report_id?: string }).shiftReportId ??
      (report as { shiftReportId?: string; shift_report_id?: string }).shift_report_id ??
      '',
    shiftId:
      (report as { shiftId?: string; shift_id?: string }).shiftId ??
      (report as { shiftId?: string; shift_id?: string }).shift_id ??
      input.shiftId,
    totalSalesAmount:
      (report as { totalSalesAmount?: string; total_sales_amount?: string }).totalSalesAmount ??
      (report as { totalSalesAmount?: string; total_sales_amount?: string }).total_sales_amount ??
      '',
    totalOrders:
      (report as { totalOrders?: number; total_orders?: number }).totalOrders ??
      (report as { totalOrders?: number; total_orders?: number }).total_orders ??
      0,
    totalItems:
      (report as { totalItems?: number; total_items?: number }).totalItems ??
      (report as { totalItems?: number; total_items?: number }).total_items ??
      0,
    notes: (report as { notes?: string }).notes ?? '',
    createdAt:
      (report as { createdAt?: string; created_at?: string }).createdAt ??
      (report as { createdAt?: string; created_at?: string }).created_at ??
      '',
    updatedAt:
      (report as { updatedAt?: string; updated_at?: string }).updatedAt ??
      (report as { updatedAt?: string; updated_at?: string }).updated_at ??
      '',
  };
  return ok(output);
};

export const fechamentoTurnoRouter = {
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
