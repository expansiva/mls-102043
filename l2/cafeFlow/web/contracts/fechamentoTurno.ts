/// <mls fileReference="_102043_/l2/cafeFlow/web/contracts/fechamentoTurno.ts" enhancement="_blank"/>
export interface FechamentoTurnoListarTurnosInput {
  dataInicio?: string;
  dataFim?: string;
  status?: string;
}

export interface FechamentoTurnoListarTurnosOutputItem {
  shiftId: string;
  status: string;
  openedAt: string;
  closedAt: string;
  shiftConfigId: string;
}

export type FechamentoTurnoListarTurnosOutput = FechamentoTurnoListarTurnosOutputItem[];

export interface FechamentoTurnoListarPedidosInput {
  shiftId: string;
  status?: string;
}

export interface FechamentoTurnoListarPedidosOutputItem {
  orderId: string;
  status: string;
  shiftId: string;
  createdAt: string;
  updatedAt: string;
}

export type FechamentoTurnoListarPedidosOutput = FechamentoTurnoListarPedidosOutputItem[];

export interface FechamentoTurnoFecharTurnoInput {
  shiftId: string;
}

export interface FechamentoTurnoFecharTurnoOutput {
  shiftId: string;
  status: string;
  closedAt: string;
  shiftReportId: string;
}

export interface FechamentoTurnoObterRelatorioTurnoInput {
  shiftId: string;
}

export interface FechamentoTurnoObterRelatorioTurnoOutput {
  shiftReportId: string;
  shiftId: string;
  totalSalesAmount: string;
  totalOrders: number;
  totalItems: number;
  notes: string;
  createdAt: string;
  updatedAt: string;
}
