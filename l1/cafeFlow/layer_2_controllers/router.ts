/// <mls fileReference="_102043_/l1/cafeFlow/layer_2_controllers/router.ts" enhancement="_blank" />
import type { BffHandler } from '/_102034_/l1/server/layer_2_controllers/contracts.js';

import {
  cafeFlowDashboardGerenteConsultarDashboardGerenteHandler,
  cafeFlowDashboardGerenteListarAlertasEstoqueBaixoHandler,
} from '/_102043_/l1/cafeFlow/layer_2_controllers/dashboardGerente.js';
import {
  cafeFlowFechamentoTurnoListarTurnosHandler,
  cafeFlowFechamentoTurnoListarPedidosHandler,
  cafeFlowFechamentoTurnoFecharTurnoHandler,
  cafeFlowFechamentoTurnoObterRelatorioTurnoHandler,
} from '/_102043_/l1/cafeFlow/layer_2_controllers/fechamentoTurno.js';
import {
  cafeFlowPainelCozinhaListarPedidosCozinhaHandler,
  cafeFlowPainelCozinhaAtualizarStatusPedidoHandler,
} from '/_102043_/l1/cafeFlow/layer_2_controllers/painelCozinha.js';
import {
  cafeFlowCardapioEstoqueListarItensCardapioHandler,
  cafeFlowCardapioEstoqueListarCategoriasCardapioHandler,
  cafeFlowCardapioEstoqueCriarOuAtualizarItemCardapioHandler,
  cafeFlowCardapioEstoqueListarItensEstoqueHandler,
  cafeFlowCardapioEstoqueCriarOuAtualizarItemEstoqueHandler,
  cafeFlowCardapioEstoqueRegistrarMovimentacaoEstoqueHandler,
  cafeFlowCardapioEstoqueListarMovimentacoesEstoqueHandler,
  cafeFlowCardapioEstoqueListarAlertasEstoqueBaixoHandler,
} from '/_102043_/l1/cafeFlow/layer_2_controllers/cardapioEstoque.js';
import {
  cafeFlowPosRapidoListarPedidosHandler,
  cafeFlowPosRapidoCriarPedidoHandler,
} from '/_102043_/l1/cafeFlow/layer_2_controllers/posRapido.js';

export function createCafeFlowRouter(): Map<string, BffHandler> {
  return new Map<string, BffHandler>([
    ['cafeFlow.dashboardGerente.consultarDashboardGerente', cafeFlowDashboardGerenteConsultarDashboardGerenteHandler],
    ['cafeFlow.dashboardGerente.listarAlertasEstoqueBaixo', cafeFlowDashboardGerenteListarAlertasEstoqueBaixoHandler],
    ['cafeFlow.fechamentoTurno.listarTurnos', cafeFlowFechamentoTurnoListarTurnosHandler],
    ['cafeFlow.fechamentoTurno.listarPedidos', cafeFlowFechamentoTurnoListarPedidosHandler],
    ['cafeFlow.fechamentoTurno.fecharTurno', cafeFlowFechamentoTurnoFecharTurnoHandler],
    ['cafeFlow.fechamentoTurno.obterRelatorioTurno', cafeFlowFechamentoTurnoObterRelatorioTurnoHandler],
    ['cafeFlow.painelCozinha.listarPedidosCozinha', cafeFlowPainelCozinhaListarPedidosCozinhaHandler],
    ['cafeFlow.painelCozinha.atualizarStatusPedido', cafeFlowPainelCozinhaAtualizarStatusPedidoHandler],
    ['cafeFlow.cardapioEstoque.listarItensCardapio', cafeFlowCardapioEstoqueListarItensCardapioHandler],
    ['cafeFlow.cardapioEstoque.listarCategoriasCardapio', cafeFlowCardapioEstoqueListarCategoriasCardapioHandler],
    ['cafeFlow.cardapioEstoque.criarOuAtualizarItemCardapio', cafeFlowCardapioEstoqueCriarOuAtualizarItemCardapioHandler],
    ['cafeFlow.cardapioEstoque.listarItensEstoque', cafeFlowCardapioEstoqueListarItensEstoqueHandler],
    ['cafeFlow.cardapioEstoque.criarOuAtualizarItemEstoque', cafeFlowCardapioEstoqueCriarOuAtualizarItemEstoqueHandler],
    ['cafeFlow.cardapioEstoque.registrarMovimentacaoEstoque', cafeFlowCardapioEstoqueRegistrarMovimentacaoEstoqueHandler],
    ['cafeFlow.cardapioEstoque.listarMovimentacoesEstoque', cafeFlowCardapioEstoqueListarMovimentacoesEstoqueHandler],
    ['cafeFlow.cardapioEstoque.listarAlertasEstoqueBaixo', cafeFlowCardapioEstoqueListarAlertasEstoqueBaixoHandler],
    ['cafeFlow.posRapido.listarPedidos', cafeFlowPosRapidoListarPedidosHandler],
    ['cafeFlow.posRapido.criarPedido', cafeFlowPosRapidoCriarPedidoHandler],
  ]);
}