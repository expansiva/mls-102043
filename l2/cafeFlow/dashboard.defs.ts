/// <mls fileReference="_102043_/l2/cafeFlow/dashboard.defs.ts" enhancement="_blank"/>

export const dashboardPagePlan = {
  "schemaVersion": "2026-06-06",
  "artifactType": "page",
  "artifactId": "dashboard",
  "moduleName": "cafeFlow",
  "status": "draft",
  "source": {
    "agentName": "agentPlanPageDefinition",
    "stepId": 66,
    "planId": ""
  },
  "data": {
    "pageDefinition": {
      "pageId": "dashboard",
      "pageName": "Dashboard do gerente",
      "actor": "gerente",
      "purpose": "Acompanhar métricas de vendas, itens mais vendidos e alertas de estoque baixo.",
      "capabilities": [
        "acompanharDashboard"
      ],
      "flowRefs": {
        "experienceFlows": [],
        "entityLifecycles": [],
        "taskWorkflows": [],
        "automations": [
          "dailySalesMetricsAutomation",
          "lowStockAlertAutomation"
        ]
      },
      "pluginRefs": [],
      "mdmRefs": [],
      "pageInputs": [
        {
          "name": "periodStart",
          "type": "date",
          "required": false,
          "sources": [
            "queryParam",
            "defaultValue"
          ],
          "description": "Início do período para consolidação do dashboard."
        },
        {
          "name": "periodEnd",
          "type": "date",
          "required": false,
          "sources": [
            "queryParam",
            "defaultValue"
          ],
          "description": "Fim do período para consolidação do dashboard."
        },
        {
          "name": "shiftId",
          "type": "string",
          "required": false,
          "sources": [
            "queryParam",
            "userSelection"
          ],
          "description": "Identificador do turno diário quando o gerente filtra por turno."
        }
      ],
      "navigationRefs": [
        {
          "direction": "outbound",
          "pageId": "gerenciamentoCardapioEstoque",
          "trigger": "Ação em alerta de estoque baixo",
          "description": "Abrir gestão de estoque para tratar o item com estoque baixo."
        }
      ],
      "sections": [
        {
          "sectionName": "Filtros do dashboard",
          "mode": "filter",
          "organisms": [
            {
              "organismName": "Seletor de período e turno",
              "purpose": "Permitir filtrar as métricas por dia e turno.",
              "userActions": [
                "selecionarPeriodo",
                "selecionarTurno",
                "aplicarFiltros"
              ],
              "requiredEntities": [],
              "readsFields": [],
              "writesFields": [],
              "rulesApplied": []
            }
          ]
        },
        {
          "sectionName": "Resumo de vendas",
          "mode": "view",
          "organisms": [
            {
              "organismName": "Cards de métricas de vendas",
              "purpose": "Exibir receita total, quantidade de pedidos, itens vendidos e ticket médio.",
              "userActions": [
                "consultarDashboard"
              ],
              "requiredEntities": [
                "PedidoEntity",
                "TurnoEntity"
              ],
              "readsFields": [
                "dailySalesMetrics.totalRevenue",
                "dailySalesMetrics.orderCount",
                "dailySalesMetrics.itemsSold",
                "dailySalesMetrics.averageTicket"
              ],
              "writesFields": [],
              "rulesApplied": []
            }
          ]
        },
        {
          "sectionName": "Itens mais vendidos",
          "mode": "view",
          "organisms": [
            {
              "organismName": "Ranking de itens mais vendidos",
              "purpose": "Listar itens mais vendidos e receita por item.",
              "userActions": [
                "consultarDashboard"
              ],
              "requiredEntities": [
                "PedidoEntity"
              ],
              "readsFields": [
                "topSellingItemsMetrics.menuItemId",
                "topSellingItemsMetrics.quantitySold",
                "topSellingItemsMetrics.itemRevenue",
                "topSellingItemsMetrics.orderCount"
              ],
              "writesFields": [],
              "rulesApplied": []
            }
          ]
        },
        {
          "sectionName": "Alertas de estoque baixo",
          "mode": "view",
          "organisms": [
            {
              "organismName": "Lista de alertas de estoque baixo",
              "purpose": "Exibir itens com estoque abaixo do mínimo e permitir ação para gestão.",
              "userActions": [
                "consultarDashboard",
                "abrirGestaoEstoque"
              ],
              "requiredEntities": [
                "EstoqueEntity"
              ],
              "readsFields": [
                "lowStockMetrics.inventoryItemId",
                "lowStockMetrics.currentQuantity",
                "lowStockMetrics.thresholdQuantity",
                "lowStockMetrics.lowStockCount"
              ],
              "writesFields": [],
              "rulesApplied": []
            }
          ]
        }
      ]
    },
    "bffCommands": [
      {
        "commandName": "consultarDashboard",
        "purpose": "Carregar métricas consolidadas para o dashboard do gerente.",
        "kind": "query",
        "input": [
          {
            "name": "periodStart",
            "type": "date",
            "required": false
          },
          {
            "name": "periodEnd",
            "type": "date",
            "required": false
          },
          {
            "name": "shiftId",
            "type": "string",
            "required": false
          }
        ],
        "output": [
          {
            "name": "totalRevenue",
            "type": "number"
          },
          {
            "name": "orderCount",
            "type": "number"
          },
          {
            "name": "itemsSold",
            "type": "number"
          },
          {
            "name": "averageTicket",
            "type": "number"
          },
          {
            "name": "topSellingItems",
            "type": "TopSellingItem[]"
          },
          {
            "name": "lowStockAlerts",
            "type": "LowStockAlert[]"
          }
        ],
        "readsEntities": [
          "PedidoEntity",
          "EstoqueEntity",
          "TurnoEntity"
        ],
        "writesEntities": [],
        "readsTables": [
          "daily_sales_metrics",
          "top_selling_items_metrics",
          "low_stock_metrics",
          "order",
          "daily_shift",
          "inventory_item"
        ],
        "writesTables": [],
        "usecaseRefs": [
          "consultarDashboard"
        ],
        "layerContract": {
          "controllerLayer": "layer_2_controllers",
          "mustCallLayer": "layer_3_usecases",
          "directTableAccessForbidden": true
        },
        "rulesApplied": []
      }
    ]
  }
} as const;

export default dashboardPagePlan;
