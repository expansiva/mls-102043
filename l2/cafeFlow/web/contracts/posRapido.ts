/// <mls fileReference="_102043_/l2/cafeFlow/web/contracts/posRapido.ts" enhancement="_blank" />
export interface PosRapidoListarPedidosInput {
  status?: string;
  dateFrom?: string;
  dateTo?: string;
}

export interface PosRapidoListarPedidosOutput {
  orderId: string;
  status: string;
  createdAt: string;
  updatedAt: string;
}

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
