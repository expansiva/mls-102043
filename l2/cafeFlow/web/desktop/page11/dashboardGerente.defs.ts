/// <mls fileReference="_102043_/l2/cafeFlow/web/desktop/page11/dashboardGerente.defs.ts" enhancement="_blank"/>

export const definition = `
## Definition
\`\`\`JSON
{
  "pageId": "dashboardGerente",
  "pageName": "Dashboard do gerente",
  "actor": "gerente",
  "purpose": "Acompanhar métricas operacionais e de vendas do dia.",
  "capabilities": [
    "consultarDashboard"
  ],
  "flowRefs": {
    "experienceFlows": [],
    "entityLifecycles": [],
    "taskWorkflows": [],
    "automations": []
  },
  "pluginRefs": [],
  "mdmRefs": [],
  "pageInputs": [
    {
      "name": "periodoInicio",
      "type": "date",
      "required": false,
      "sources": [
        "queryParam"
      ],
      "description": "Data inicial do período para filtros do dashboard."
    },
    {
      "name": "periodoFim",
      "type": "date",
      "required": false,
      "sources": [
        "queryParam"
      ],
      "description": "Data final do período para filtros do dashboard."
    },
    {
      "name": "turnoId",
      "type": "turnoId",
      "required": false,
      "sources": [
        "queryParam"
      ],
      "description": "Turno selecionado para filtrar métricas.",
      "entityRef": "turnoEntity",
      "fieldRef": "turnoId"
    },
    {
      "name": "statusAlerta",
      "type": "string",
      "required": false,
      "sources": [
        "queryParam"
      ],
      "description": "Status do alerta de estoque baixo para filtragem."
    }
  ],
  "navigationRefs": [
    {
      "direction": "inbound",
      "pageId": "cardapioEstoque",
      "trigger": "Acessar métricas a partir do cardápio/estoque"
    },
    {
      "direction": "inbound",
      "pageId": "fechamentoTurno",
      "trigger": "Acessar métricas após fechamento"
    }
  ],
  "sections": [
    {
      "sectionName": "VisaoGeralDoDia",
      "mode": "view",
      "organisms": [
        {
          "organismName": "ResumoVendasDiarias",
          "purpose": "Exibir receita total, quantidade de pedidos e ticket médio do período.",
          "userActions": [
            "viewDashboard"
          ],
          "requiredEntities": [
            "metricasEntity"
          ],
          "readsFields": [
            "metricasEntity.totalRevenue",
            "metricasEntity.orderCount",
            "metricasEntity.averageTicket",
            "metricasEntity.itemsSold"
          ],
          "writesFields": [],
          "rulesApplied": []
        },
        {
          "organismName": "GraficoVendasPorTurno",
          "purpose": "Exibir evolução de vendas por turno no período selecionado.",
          "userActions": [
            "viewDashboard"
          ],
          "requiredEntities": [
            "metricasEntity"
          ],
          "readsFields": [
            "metricasEntity.totalRevenue",
            "metricasEntity.orderCount",
            "metricasEntity.shiftId"
          ],
          "writesFields": [],
          "rulesApplied": []
        }
      ]
    },
    {
      "sectionName": "ItensMaisVendidos",
      "mode": "view",
      "organisms": [
        {
          "organismName": "RankingItensMaisVendidos",
          "purpose": "Listar itens mais vendidos e receita gerada.",
          "userActions": [
            "viewDashboard"
          ],
          "requiredEntities": [
            "metricasEntity"
          ],
          "readsFields": [
            "metricasEntity.menuItemId",
            "metricasEntity.menuCategoryId",
            "metricasEntity.quantitySold",
            "metricasEntity.itemRevenue",
            "metricasEntity.orderCount"
          ],
          "writesFields": [],
          "rulesApplied": []
        }
      ]
    },
    {
      "sectionName": "AlertasDeEstoqueBaixo",
      "mode": "view",
      "organisms": [
        {
          "organismName": "ListaAlertasEstoqueBaixo",
          "purpose": "Exibir alertas ativos de estoque baixo.",
          "userActions": [
            "viewDashboard"
          ],
          "requiredEntities": [
            "estoqueEntity"
          ],
          "readsFields": [
            "estoqueEntity.stockItemId",
            "estoqueEntity.currentQuantity",
            "estoqueEntity.thresholdValue",
            "estoqueEntity.alertCount"
          ],
          "writesFields": [],
          "rulesApplied": []
        }
      ]
    }
  ]
}
\`\`\`
`;

export const pipeline = [
  {
    "id": "dashboardGerente__l2_page",
    "type": "l2_page",
    "outputPath": "_102043_/l2/cafeFlow/web/desktop/page11/dashboardGerente.ts",
    "defPath": "_102043_/l2/cafeFlow/web/desktop/page11/dashboardGerente.defs.ts",
    "dependsFiles": [
      "_102043_/l2/cafeFlow/web/shared/dashboardGerente.ts",
      "_102043_/l2/cafeFlow/web/contracts/dashboardGerente.ts"
    ],
    "dependsOn": [],
    "agent": "agentMaterializeGen"
  }
] as const;
