/// <mls fileReference="_102043_/l5/cafeFlow/uiConsolidation.defs.ts" enhancement="_blank"/>

export const uiConsolidationPlan = {
  "schemaVersion": "2026-06-06",
  "artifactType": "uiConsolidation",
  "artifactId": "uiConsolidation",
  "moduleName": "cafeFlow",
  "status": "draft",
  "source": {
    "agentName": "agentPlanUiConsolidation",
    "stepId": 28,
    "planId": "plan-ui-consolidation"
  },
  "data": {
    "sharedComponents": [
      {
        "componentId": "lowStockAlertsList",
        "title": "Lista de alertas de estoque baixo",
        "kind": "organism",
        "pages": [
          "cardapioEstoque",
          "dashboardGerente"
        ],
        "replacesOrganisms": [
          "cardapioEstoque.AlertasEstoqueBaixo",
          "dashboardGerente.ListaAlertasEstoqueBaixo"
        ],
        "responsibilities": "Exibir alertas ativos de estoque baixo com possibilidade de filtrar e ver detalhes."
      }
    ],
    "namingFixes": [
      {
        "pageId": "cardapioEstoque",
        "organismName": "FiltroEListaItensCardapio",
        "suggestedName": "filtroEListaItensCardapio",
        "reason": "Padronizar para camelCase."
      },
      {
        "pageId": "cardapioEstoque",
        "organismName": "CadastroEdicaoItemCardapio",
        "suggestedName": "cadastroEdicaoItemCardapio",
        "reason": "Padronizar para camelCase."
      },
      {
        "pageId": "cardapioEstoque",
        "organismName": "ListaCategoriasCardapio",
        "suggestedName": "listaCategoriasCardapio",
        "reason": "Padronizar para camelCase."
      },
      {
        "pageId": "cardapioEstoque",
        "organismName": "FiltroEListaItensEstoque",
        "suggestedName": "filtroEListaItensEstoque",
        "reason": "Padronizar para camelCase."
      },
      {
        "pageId": "cardapioEstoque",
        "organismName": "CadastroEdicaoItemEstoque",
        "suggestedName": "cadastroEdicaoItemEstoque",
        "reason": "Padronizar para camelCase."
      },
      {
        "pageId": "cardapioEstoque",
        "organismName": "RegistroMovimentacaoEstoque",
        "suggestedName": "registroMovimentacaoEstoque",
        "reason": "Padronizar para camelCase."
      },
      {
        "pageId": "cardapioEstoque",
        "organismName": "HistoricoMovimentacoesEstoque",
        "suggestedName": "historicoMovimentacoesEstoque",
        "reason": "Padronizar para camelCase."
      },
      {
        "pageId": "cardapioEstoque",
        "organismName": "AlertasEstoqueBaixo",
        "suggestedName": "alertasEstoqueBaixo",
        "reason": "Padronizar para camelCase."
      },
      {
        "pageId": "dashboardGerente",
        "organismName": "ResumoVendasDiarias",
        "suggestedName": "resumoVendasDiarias",
        "reason": "Padronizar para camelCase."
      },
      {
        "pageId": "dashboardGerente",
        "organismName": "GraficoVendasPorTurno",
        "suggestedName": "graficoVendasPorTurno",
        "reason": "Padronizar para camelCase."
      },
      {
        "pageId": "dashboardGerente",
        "organismName": "RankingItensMaisVendidos",
        "suggestedName": "rankingItensMaisVendidos",
        "reason": "Padronizar para camelCase."
      },
      {
        "pageId": "dashboardGerente",
        "organismName": "ListaAlertasEstoqueBaixo",
        "suggestedName": "listaAlertasEstoqueBaixo",
        "reason": "Padronizar para camelCase."
      },
      {
        "pageId": "fechamentoTurno",
        "organismName": "Seletor de turno",
        "suggestedName": "seletorTurno",
        "reason": "Remover espaços e padronizar para camelCase."
      },
      {
        "pageId": "fechamentoTurno",
        "organismName": "Lista de pedidos do turno",
        "suggestedName": "listaPedidosTurno",
        "reason": "Remover espaços e padronizar para camelCase."
      },
      {
        "pageId": "fechamentoTurno",
        "organismName": "Resumo de fechamento",
        "suggestedName": "resumoFechamento",
        "reason": "Remover espaços e padronizar para camelCase."
      },
      {
        "pageId": "fechamentoTurno",
        "organismName": "Confirmar fechamento",
        "suggestedName": "confirmarFechamento",
        "reason": "Remover espaços e padronizar para camelCase."
      },
      {
        "pageId": "painelCozinha",
        "organismName": "ListaDePedidosCozinha",
        "suggestedName": "listaPedidosCozinha",
        "reason": "Padronizar para camelCase."
      },
      {
        "pageId": "painelCozinha",
        "organismName": "AtualizarStatusPedido",
        "suggestedName": "atualizarStatusPedido",
        "reason": "Padronizar para camelCase."
      },
      {
        "pageId": "posRapido",
        "organismName": "Lista de pedidos do dia",
        "suggestedName": "listaPedidosDia",
        "reason": "Remover espaços e padronizar para camelCase."
      },
      {
        "pageId": "posRapido",
        "organismName": "Editor rápido de itens",
        "suggestedName": "editorRapidoItens",
        "reason": "Remover espaços e padronizar para camelCase."
      },
      {
        "pageId": "posRapido",
        "organismName": "Resumo e envio para cozinha",
        "suggestedName": "resumoEnvioCozinha",
        "reason": "Remover espaços e padronizar para camelCase."
      }
    ],
    "notes": [
      "Consolidar os alertas de estoque baixo em um único organismo compartilhado entre cardápio/estoque e dashboard.",
      "Demais organismos mantidos por diferenças de contexto e entidades."
    ]
  }
} as const;

export default uiConsolidationPlan;
