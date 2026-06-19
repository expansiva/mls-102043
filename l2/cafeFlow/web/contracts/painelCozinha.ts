/// <mls fileReference="_102043_/l2/cafeFlow/web/contracts/painelCozinha.ts" enhancement="_blank" />
export interface PainelCozinhaListarPedidosCozinhaInput {
  status?: string;
  shiftId?: string;
}

export interface PainelCozinhaListarPedidosCozinhaOutput {
  orderId: string;
  status: string;
  createdAt: string;
  shiftId: string;
}

export interface PainelCozinhaAtualizarStatusPedidoInput {
  orderId: string;
  novoStatus: string;
}

export interface PainelCozinhaAtualizarStatusPedidoOutput {
  orderId: string;
  status: string;
  updatedAt: string;
}
