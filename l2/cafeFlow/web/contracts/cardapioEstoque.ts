/// <mls fileReference="_102043_/l2/cafeFlow/web/contracts/cardapioEstoque.ts" enhancement="_blank"/>
export interface CardapioEstoqueListarItensCardapioInput {
  categoriaId?: string;
  disponivel?: boolean;
}

export interface CardapioEstoqueListarItensCardapioOutputItem {
  menuItemId: string;
  nome: string;
  preco: number;
  categoriaId: string;
  ativo: boolean;
}

export type CardapioEstoqueListarItensCardapioOutput = CardapioEstoqueListarItensCardapioOutputItem[];

export interface CardapioEstoqueListarCategoriasCardapioInput {
}

export interface CardapioEstoqueListarCategoriasCardapioOutputItem {
  categoriaId: string;
  nome: string;
  ativo: boolean;
}

export type CardapioEstoqueListarCategoriasCardapioOutput = CardapioEstoqueListarCategoriasCardapioOutputItem[];

export interface CardapioEstoqueCriarOuAtualizarItemCardapioInput {
  menuItemId?: string;
  nome: string;
  preco: number;
  categoriaId: string;
  ativo: boolean;
}

export interface CardapioEstoqueCriarOuAtualizarItemCardapioOutput {
  menuItemId: string;
}

export interface CardapioEstoqueListarItensEstoqueInput {
  categoriaId?: string;
  status?: string;
}

export interface CardapioEstoqueListarItensEstoqueOutputItem {
  stockItemId: string;
  nome: string;
  quantidadeAtual: number;
  unidadeMedidaId: string;
  quantidadeMinima: number;
  status: string;
}

export type CardapioEstoqueListarItensEstoqueOutput = CardapioEstoqueListarItensEstoqueOutputItem[];

export interface CardapioEstoqueCriarOuAtualizarItemEstoqueInput {
  stockItemId?: string;
  nome: string;
  unidadeMedidaId: string;
  quantidadeMinima: number;
  ativo: boolean;
}

export interface CardapioEstoqueCriarOuAtualizarItemEstoqueOutput {
  stockItemId: string;
}

export interface CardapioEstoqueRegistrarMovimentacaoEstoqueInput {
  stockItemId: string;
  movementType: string;
  quantity: number;
  reason?: string;
  occurredAt: string;
}

export interface CardapioEstoqueRegistrarMovimentacaoEstoqueOutput {
  stockMovementId: string;
}

export interface CardapioEstoqueListarMovimentacoesEstoqueInput {
  stockItemId?: string;
  dataInicio?: string;
  dataFim?: string;
}

export interface CardapioEstoqueListarMovimentacoesEstoqueOutputItem {
  stockMovementId: string;
  stockItemId: string;
  movementType: string;
  quantity: number;
  reason: string;
  occurredAt: string;
}

export type CardapioEstoqueListarMovimentacoesEstoqueOutput = CardapioEstoqueListarMovimentacoesEstoqueOutputItem[];

export interface CardapioEstoqueListarAlertasEstoqueBaixoInput {
  status?: string;
}

export interface CardapioEstoqueListarAlertasEstoqueBaixoOutputItem {
  lowStockAlertId: string;
  stockItemId: string;
  triggeredAt: string;
  currentQuantity: number;
  minimumQuantity: number;
  status: string;
}

export type CardapioEstoqueListarAlertasEstoqueBaixoOutput = CardapioEstoqueListarAlertasEstoqueBaixoOutputItem[];
