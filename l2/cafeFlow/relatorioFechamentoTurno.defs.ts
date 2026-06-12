/// <mls fileReference="_102043_/l2/cafeFlow/relatorioFechamentoTurno.defs.ts" enhancement="_blank"/>

export const relatorioFechamentoTurnoPagePlan = {
  "schemaVersion": "2026-06-06",
  "artifactType": "page",
  "artifactId": "relatorioFechamentoTurno",
  "moduleName": "cafeFlow",
  "status": "draft",
  "source": {
    "agentName": "agentPlanPageDefinition",
    "stepId": 65,
    "planId": ""
  },
  "data": {
    "pageDefinition": {
      "pageId": "relatorioFechamentoTurno",
      "pageName": "Relatório de fechamento do turno",
      "actor": "gerente",
      "purpose": "Conferir pedidos, resolver pendências e fechar o turno diário com consolidação.",
      "capabilities": [
        "fecharTurnoDiario"
      ],
      "flowRefs": {
        "experienceFlows": [],
        "entityLifecycles": [
          "shiftLifecycle"
        ],
        "taskWorkflows": [],
        "automations": [
          "dailySalesMetricsAutomation"
        ]
      },
      "pluginRefs": [],
      "mdmRefs": [],
      "pageInputs": [
        {
          "name": "shiftId",
          "type": "string",
          "required": true,
          "sources": [
            "routeParam",
            "query",
            "previousStepResult"
          ],
          "description": "Identificador do turno diário selecionado para conferência e fechamento.",
          "entityRef": "DailyShift",
          "fieldRef": "dailyShiftId"
        },
        {
          "name": "shiftDateStart",
          "type": "date",
          "required": false,
          "sources": [
            "query"
          ],
          "description": "Data inicial para filtrar turnos disponíveis."
        },
        {
          "name": "shiftDateEnd",
          "type": "date",
          "required": false,
          "sources": [
            "query"
          ],
          "description": "Data final para filtrar turnos disponíveis."
        }
      ],
      "navigationRefs": [
        {
          "direction": "outbound",
          "pageId": "dashboard",
          "trigger": "Turno fechado com sucesso",
          "description": "Após o fechamento e geração do relatório, retornar ao dashboard."
        }
      ],
      "sections": [
        {
          "sectionName": "Seleção de turno",
          "mode": "list",
          "organisms": [
            {
              "organismName": "listaTurnosParaFechamento",
              "purpose": "Listar turnos disponíveis para seleção e conferência.",
              "userActions": [
                "filtrarTurnosPorPeriodo",
                "selecionarTurno"
              ],
              "requiredEntities": [
                "DailyShift"
              ],
              "readsFields": [
                "DailyShift.dailyShiftId",
                "DailyShift.shiftDate",
                "DailyShift.status",
                "DailyShift.openedAt",
                "DailyShift.closedAt",
                "DailyShift.totalSalesAmount",
                "DailyShift.totalOrders"
              ],
              "writesFields": [],
              "rulesApplied": []
            }
          ]
        },
        {
          "sectionName": "Resumo e pendências do turno",
          "mode": "read",
          "organisms": [
            {
              "organismName": "detalhesTurnoConsolidacao",
              "purpose": "Exibir detalhes do turno selecionado, totais e pendências antes do fechamento.",
              "userActions": [
                "visualizarTotais",
                "visualizarPendencias"
              ],
              "requiredEntities": [
                "DailyShift",
                "Order"
              ],
              "readsFields": [
                "DailyShift.dailyShiftId",
                "DailyShift.shiftDate",
                "DailyShift.status",
                "DailyShift.openedAt",
                "DailyShift.closedAt",
                "DailyShift.openingCashAmount",
                "DailyShift.closingCashAmount",
                "DailyShift.totalSalesAmount",
                "DailyShift.totalOrders",
                "DailyShift.notes"
              ],
              "writesFields": [],
              "rulesApplied": [
                "shiftCloseRequiresOrders"
              ]
            }
          ]
        },
        {
          "sectionName": "Confirmação de fechamento",
          "mode": "confirm",
          "organisms": [
            {
              "organismName": "confirmacaoFechamentoTurno",
              "purpose": "Confirmar o fechamento do turno diário e gerar o relatório final.",
              "userActions": [
                "confirmarFechamentoTurno"
              ],
              "requiredEntities": [
                "DailyShift",
                "Order"
              ],
              "readsFields": [
                "DailyShift.dailyShiftId",
                "DailyShift.status",
                "DailyShift.totalSalesAmount",
                "DailyShift.totalOrders"
              ],
              "writesFields": [
                "DailyShift.status",
                "DailyShift.closedAt",
                "DailyShift.closingCashAmount",
                "DailyShift.totalSalesAmount",
                "DailyShift.totalOrders",
                "DailyShift.shiftClosingReportId"
              ],
              "rulesApplied": [
                "shiftCloseRequiresOrders"
              ]
            }
          ]
        }
      ]
    },
    "bffCommands": [
      {
        "commandName": "listarTurnos",
        "purpose": "Listar turnos disponíveis para fechamento.",
        "kind": "query",
        "input": [
          {
            "name": "shiftDateStart",
            "type": "date",
            "required": false
          },
          {
            "name": "shiftDateEnd",
            "type": "date",
            "required": false
          },
          {
            "name": "status",
            "type": "string",
            "required": false
          }
        ],
        "output": [
          {
            "name": "dailyShiftId",
            "type": "string"
          },
          {
            "name": "shiftDate",
            "type": "date"
          },
          {
            "name": "status",
            "type": "string"
          },
          {
            "name": "openedAt",
            "type": "datetime"
          },
          {
            "name": "closedAt",
            "type": "datetime"
          },
          {
            "name": "totalSalesAmount",
            "type": "money"
          },
          {
            "name": "totalOrders",
            "type": "number"
          }
        ],
        "readsEntities": [
          "DailyShift"
        ],
        "writesEntities": [],
        "readsTables": [
          "daily_shift"
        ],
        "writesTables": [],
        "usecaseRefs": [
          "listarTurnos"
        ],
        "layerContract": {
          "controllerLayer": "layer_2_controllers",
          "mustCallLayer": "layer_3_usecases",
          "directTableAccessForbidden": true
        },
        "rulesApplied": []
      },
      {
        "commandName": "obterTurno",
        "purpose": "Obter detalhes do turno e consolidação preliminar.",
        "kind": "query",
        "input": [
          {
            "name": "shiftId",
            "type": "string",
            "required": true
          }
        ],
        "output": [
          {
            "name": "dailyShiftId",
            "type": "string"
          },
          {
            "name": "shiftDate",
            "type": "date"
          },
          {
            "name": "status",
            "type": "string"
          },
          {
            "name": "openedAt",
            "type": "datetime"
          },
          {
            "name": "closedAt",
            "type": "datetime"
          },
          {
            "name": "openingCashAmount",
            "type": "money"
          },
          {
            "name": "closingCashAmount",
            "type": "money"
          },
          {
            "name": "totalSalesAmount",
            "type": "money"
          },
          {
            "name": "totalOrders",
            "type": "number"
          },
          {
            "name": "notes",
            "type": "string"
          },
          {
            "name": "pendingOrdersCount",
            "type": "number"
          }
        ],
        "readsEntities": [
          "DailyShift",
          "Order"
        ],
        "writesEntities": [],
        "readsTables": [
          "daily_shift",
          "order"
        ],
        "writesTables": [],
        "usecaseRefs": [
          "obterTurno"
        ],
        "layerContract": {
          "controllerLayer": "layer_2_controllers",
          "mustCallLayer": "layer_3_usecases",
          "directTableAccessForbidden": true
        },
        "rulesApplied": [
          "shiftCloseRequiresOrders"
        ]
      },
      {
        "commandName": "fecharTurno",
        "purpose": "Confirmar fechamento do turno diário e gerar relatório.",
        "kind": "command",
        "input": [
          {
            "name": "shiftId",
            "type": "string",
            "required": true
          },
          {
            "name": "confirmacao",
            "type": "boolean",
            "required": true
          }
        ],
        "output": [
          {
            "name": "dailyShiftId",
            "type": "string"
          },
          {
            "name": "status",
            "type": "string"
          },
          {
            "name": "closedAt",
            "type": "datetime"
          },
          {
            "name": "shiftClosingReportId",
            "type": "string"
          },
          {
            "name": "totalSalesAmount",
            "type": "money"
          },
          {
            "name": "totalOrders",
            "type": "number"
          }
        ],
        "readsEntities": [
          "DailyShift",
          "Order"
        ],
        "writesEntities": [
          "DailyShift"
        ],
        "readsTables": [
          "daily_shift",
          "order"
        ],
        "writesTables": [
          "daily_shift",
          "daily_sales_metrics"
        ],
        "usecaseRefs": [
          "fecharTurno"
        ],
        "layerContract": {
          "controllerLayer": "layer_2_controllers",
          "mustCallLayer": "layer_3_usecases",
          "directTableAccessForbidden": true
        },
        "rulesApplied": [
          "shiftCloseRequiresOrders"
        ]
      }
    ]
  }
} as const;

export default relatorioFechamentoTurnoPagePlan;
