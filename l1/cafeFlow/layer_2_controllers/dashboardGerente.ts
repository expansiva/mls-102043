/// <mls fileReference="_102043_/l1/cafeFlow/layer_2_controllers/dashboardGerente.ts" enhancement="_blank"/>
import { ok, type BffHandler } from '/_102034_/l1/server/layer_2_controllers/contracts.js';
import {
  consultarDashboardGerente,
  type ConsultarDashboardGerenteInput,
  type ConsultarDashboardGerenteResult,
} from '/_102043_/l1/cafeFlow/layer_3_usecases/consultarDashboardGerente.js';
import {
  listarAlertasEstoqueBaixo,
  type ListarAlertasEstoqueBaixoInput,
  type ListarAlertasEstoqueBaixoOutput,
} from '/_102043_/l1/cafeFlow/layer_3_usecases/listarAlertasEstoqueBaixo.js';
import type {
  DashboardGerenteConsultarDashboardGerenteInput,
  DashboardGerenteConsultarDashboardGerenteOutput,
  DashboardGerenteListarAlertasEstoqueBaixoInput,
  DashboardGerenteListarAlertasEstoqueBaixoOutput,
} from '/_102043_/l2/cafeFlow/web/contracts/dashboardGerente.js';

export const cafeFlowDashboardGerenteConsultarDashboardGerenteHandler: BffHandler = async ({ request, ctx }) => {
  const input = request.params as DashboardGerenteConsultarDashboardGerenteInput;
  const result = await consultarDashboardGerente(ctx, input as ConsultarDashboardGerenteInput);
  const metricas = (result as ConsultarDashboardGerenteResult).metricas;
  const dailySalesMetrics = metricas?.dailySalesMetrics as Record<string, unknown> | undefined;
  const topSellingItemsMetrics = metricas?.topSellingItemsMetrics as Record<string, unknown> | undefined;
  const response: DashboardGerenteConsultarDashboardGerenteOutput = {
    totalRevenue: Number(dailySalesMetrics?.totalRevenue ?? 0),
    orderCount: Number(dailySalesMetrics?.orderCount ?? 0),
    averageTicket: Number(dailySalesMetrics?.averageTicket ?? 0),
    itemsSold: Number(dailySalesMetrics?.itemsSold ?? 0),
    serieVendasPorTurno:
      typeof dailySalesMetrics?.serieVendasPorTurno === 'string'
        ? dailySalesMetrics.serieVendasPorTurno
        : JSON.stringify(dailySalesMetrics?.serieVendasPorTurno ?? ''),
    rankingItensMaisVendidos:
      typeof topSellingItemsMetrics?.rankingItensMaisVendidos === 'string'
        ? topSellingItemsMetrics.rankingItensMaisVendidos
        : JSON.stringify(topSellingItemsMetrics ?? ''),
  };
  return ok(response);
};

export const cafeFlowDashboardGerenteListarAlertasEstoqueBaixoHandler: BffHandler = async ({ request, ctx }) => {
  const input = request.params as DashboardGerenteListarAlertasEstoqueBaixoInput;
  const result = await listarAlertasEstoqueBaixo(ctx, input as ListarAlertasEstoqueBaixoInput);
  const response: DashboardGerenteListarAlertasEstoqueBaixoOutput = (result as ListarAlertasEstoqueBaixoOutput).alertas.map(
    (alerta) => ({
      alertas: alerta.stock_movement_id,
    }),
  );
  return ok(response);
};

export const dashboardGerenteRoutes = {
  'cafeFlow.dashboardGerente.consultarDashboardGerente': {
    handlerName: 'cafeFlowDashboardGerenteConsultarDashboardGerenteHandler',
    importPath: '/_102043_/l1/cafeFlow/layer_2_controllers/dashboardGerente.js',
  },
  'cafeFlow.dashboardGerente.listarAlertasEstoqueBaixo': {
    handlerName: 'cafeFlowDashboardGerenteListarAlertasEstoqueBaixoHandler',
    importPath: '/_102043_/l1/cafeFlow/layer_2_controllers/dashboardGerente.js',
  },
} as const;
