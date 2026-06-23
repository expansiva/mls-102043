/// <mls fileReference="_102043_/l1/cafeFlow/layer_2_controllers/router.ts" enhancement="_blank" />
import type { BffHandler } from '/_102034_/l1/server/layer_2_controllers/contracts.js';

import {
  cafeFlowDashboardGerenteConsultarDashboardGerenteHandler,
  cafeFlowDashboardGerenteListarAlertasEstoqueBaixoHandler,
} from '/_102043_/l1/cafeFlow/layer_2_controllers/dashboardGerente.js';
import {
  cafeFlowPainelCozinhaListarPedidosCozinhaHandler,
  cafeFlowPainelCozinhaAtualizarStatusPedidoHandler,
} from '/_102043_/l1/cafeFlow/layer_2_controllers/painelCozinha.js';
import {
  cafeFlowFechamentoTurnoListarTurnosHandler,
  cafeFlowFechamentoTurnoListarPedidosHandler,
  cafeFlowFechamentoTurnoFecharTurnoHandler,
  cafeFlowFechamentoTurnoObterRelatorioTurnoHandler,
} from '/_102043_/l1/cafeFlow/layer_2_controllers/fechamentoTurno.js';
import {
  CafeFlowCardapioEstoqueListarItensCardapioHandler,
  CafeFlowCardapioEstoqueListarCategoriasCardapioHandler,
  CafeFlowCardapioEstoqueCriarOuAtualizarItemCardapioHandler,
  CafeFlowCardapioEstoqueListarItensEstoqueHandler,
  CafeFlowCardapioEstoqueCriarOuAtualizarItemEstoqueHandler,
  CafeFlowCardapioEstoqueRegistrarMovimentacaoEstoqueHandler,
  CafeFlowCardapioEstoqueListarMovimentacoesEstoqueHandler,
  CafeFlowCardapioEstoqueListarAlertasEstoqueBaixoHandler,
} from '/_102043_/l1/cafeFlow/layer_2_controllers/cardapioEstoque.js';
export function createCafeFlowRouter(): Map<string, BffHandler> {
  return new Map<string, BffHandler>([
    ['cafeFlow.dashboardGerente.consultarDashboardGerente', cafeFlowDashboardGerenteConsultarDashboardGerenteHandler],
    ['cafeFlow.dashboardGerente.listarAlertasEstoqueBaixo', cafeFlowDashboardGerenteListarAlertasEstoqueBaixoHandler],
    ['cafeFlow.painelCozinha.listarPedidosCozinha', cafeFlowPainelCozinhaListarPedidosCozinhaHandler],
    ['cafeFlow.painelCozinha.atualizarStatusPedido', cafeFlowPainelCozinhaAtualizarStatusPedidoHandler],
    ['cafeFlow.fechamentoTurno.listarTurnos', cafeFlowFechamentoTurnoListarTurnosHandler],
    ['cafeFlow.fechamentoTurno.listarPedidos', cafeFlowFechamentoTurnoListarPedidosHandler],
    ['cafeFlow.fechamentoTurno.fecharTurno', cafeFlowFechamentoTurnoFecharTurnoHandler],
    ['cafeFlow.fechamentoTurno.obterRelatorioTurno', cafeFlowFechamentoTurnoObterRelatorioTurnoHandler],
    ['cafeFlow.cardapioEstoque.listarItensCardapio', CafeFlowCardapioEstoqueListarItensCardapioHandler],
    ['cafeFlow.cardapioEstoque.listarCategoriasCardapio', CafeFlowCardapioEstoqueListarCategoriasCardapioHandler],
    ['cafeFlow.cardapioEstoque.criarOuAtualizarItemCardapio', CafeFlowCardapioEstoqueCriarOuAtualizarItemCardapioHandler],
    ['cafeFlow.cardapioEstoque.listarItensEstoque', CafeFlowCardapioEstoqueListarItensEstoqueHandler],
    ['cafeFlow.cardapioEstoque.criarOuAtualizarItemEstoque', CafeFlowCardapioEstoqueCriarOuAtualizarItemEstoqueHandler],
    ['cafeFlow.cardapioEstoque.registrarMovimentacaoEstoque', CafeFlowCardapioEstoqueRegistrarMovimentacaoEstoqueHandler],
    ['cafeFlow.cardapioEstoque.listarMovimentacoesEstoque', CafeFlowCardapioEstoqueListarMovimentacoesEstoqueHandler],
    ['cafeFlow.cardapioEstoque.listarAlertasEstoqueBaixo', CafeFlowCardapioEstoqueListarAlertasEstoqueBaixoHandler],
  ]);
}
