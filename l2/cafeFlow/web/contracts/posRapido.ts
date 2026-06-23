/// <mls fileReference="_102043_/l2/cafeFlow/web/contracts/posRapido.ts" enhancement="_blank"/>
export interface PosRapidoListarPedidosInput {
  status?: string;
  dateFrom?: string;
  dateTo?: string;
}

export interface PosRapidoListarPedidosOutputItem {
  orderId: string;
  status: string;
  createdAt: string;
  updatedAt: string;
}

export type PosRapidoListarPedidosOutput = PosRapidoListarPedidosOutputItem[];

export interface PosRapidoCriarPedidoInput {
  orderItems: string;
  observacao?: string;
}

export interface PosRapidoCriarPedidoOutput {
  orderId: string;
  status: string;
  createdAt: string;
  updatedAt: string;
}
