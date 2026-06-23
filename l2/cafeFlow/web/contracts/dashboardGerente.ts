/// <mls fileReference="_102043_/l2/cafeFlow/web/contracts/dashboardGerente.ts" enhancement="_blank"/>
export interface DashboardGerenteConsultarDashboardGerenteInput {
  periodoInicio?: string;
  periodoFim?: string;
  turnoId?: string;
}

export interface DashboardGerenteConsultarDashboardGerenteOutput {
  totalRevenue: number;
  orderCount: number;
  averageTicket: number;
  itemsSold: number;
  serieVendasPorTurno: string;
  rankingItensMaisVendidos: string;
}

export interface DashboardGerenteListarAlertasEstoqueBaixoInput {
  statusAlerta?: string;
}

export interface DashboardGerenteListarAlertasEstoqueBaixoOutputItem {
  alertas: string;
}

export type DashboardGerenteListarAlertasEstoqueBaixoOutput = DashboardGerenteListarAlertasEstoqueBaixoOutputItem[];
