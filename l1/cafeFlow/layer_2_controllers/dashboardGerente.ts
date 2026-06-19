/// <mls fileReference="_102043_/l1/cafeFlow/layer_2_controllers/dashboardGerente.ts" enhancement="_blank"/>
import { ok, AppError, type BffHandler } from '/_102034_/l1/server/layer_2_controllers/contracts.js';
import {
consultarDashboardGerente,
type ConsultarDashboardGerenteInput,
type ConsultarDashboardGerenteOutput,
} from '/_102043_/l1/cafeFlow/layer_3_usecases/consultarDashboardGerente.js';
import {
listarAlertasEstoqueBaixo,
type ListarAlertasEstoqueBaixoInput,
type ListarAlertasEstoqueBaixoOutput,
} from '/_102043_/l1/cafeFlow/layer_3_usecases/listarAlertasEstoqueBaixo.js';

export const cafeFlowDashboardGerenteConsultarDashboardGerenteHandler: BffHandler = async ({ request, ctx }) => {
const input = request.params as ConsultarDashboardGerenteInput;
const result: ConsultarDashboardGerenteOutput = await consultarDashboardGerente(ctx, input);
return ok(result.metricas);
};

export const cafeFlowDashboardGerenteListarAlertasEstoqueBaixoHandler: BffHandler = async ({ request, ctx }) => {
const input = request.params as ListarAlertasEstoqueBaixoInput;
const result: ListarAlertasEstoqueBaixoOutput = await listarAlertasEstoqueBaixo(ctx, input);
return ok(result.alertas);
};

export const dashboardGerenteRouter = {
'cafeFlow.dashboardGerente.consultarDashboardGerente': {
handlerName: 'cafeFlowDashboardGerenteConsultarDashboardGerenteHandler',
importPath: '/_102043_/l1/cafeFlow/layer_2_controllers/dashboardGerente.js',
},
'cafeFlow.dashboardGerente.listarAlertasEstoqueBaixo': {
handlerName: 'cafeFlowDashboardGerenteListarAlertasEstoqueBaixoHandler',
importPath: '/_102043_/l1/cafeFlow/layer_2_controllers/dashboardGerente.js',
},
};
