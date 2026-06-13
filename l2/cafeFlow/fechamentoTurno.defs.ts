/// <mls fileReference="_102043_/l2/cafeFlow/fechamentoTurno.defs.ts" enhancement="_blank"/>

export const fechamentoTurnoPagePlan = {
  "schemaVersion": "2026-06-06",
  "artifactType": "page",
  "artifactId": "fechamentoTurno",
  "moduleName": "cafeFlow",
  "status": "draft",
  "source": {
    "agentName": "agentPlanPageDefinition",
    "stepId": 58,
    "planId": ""
  },
  "data": {
    "pageDefinition": {
      "pageId": "fechamentoTurno",
      "pageName": "Fechamento de turno",
      "actor": "gerente",
      "purpose": "Validar pedidos do turno e confirmar o fechamento com geração de relatório.",
      "capabilities": [
        "fecharTurno"
      ],
      "flowRefs": {
        "experienceFlows": [],
        "entityLifecycles": [
          "shiftClosureWorkflow"
        ],
        "taskWorkflows": [],
        "automations": []
      },
      "pluginRefs": [],
      "mdmRefs": [
        "shiftConfig"
      ],
      "pageInputs": [],
      "navigationRefs": [
        {
          "direction": "outbound",
          "pageId": "dashboardGerente",
          "trigger": "Ver resumo do turno",
          "description": "Após confirmar o fechamento e revisar o relatório."
        }
      ],
      "sections": [
        {
          "sectionName": "Seleção de turno",
          "mode": "selection",
          "organisms": [
            {
              "organismName": "Seletor de turno",
              "purpose": "Selecionar o turno a fechar e visualizar seu status.",
              "userActions": [
                "selecionarTurno"
              ],
              "requiredEntities": [
                "Shift"
              ],
              "readsFields": [
                "Shift.shiftId",
                "Shift.status",
                "Shift.openedAt",
                "Shift.closedAt",
                "Shift.shiftConfigId"
              ],
              "writesFields": [
                "Shift.shiftId"
              ],
              "rulesApplied": []
            }
          ]
        },
        {
          "sectionName": "Validação de pedidos do turno",
          "mode": "review",
          "organisms": [
            {
              "organismName": "Lista de pedidos do turno",
              "purpose": "Validar se todos os pedidos do turno estão finalizados.",
              "userActions": [
                "filtrarPedidos",
                "revisarStatus"
              ],
              "requiredEntities": [
                "Order"
              ],
              "readsFields": [
                "Order.orderId",
                "Order.status",
                "Order.shiftId",
                "Order.createdAt",
                "Order.updatedAt"
              ],
              "writesFields": [],
              "rulesApplied": [
                "shiftClosureRequiresNoOpenOrders"
              ]
            }
          ]
        },
        {
          "sectionName": "Relatório do turno",
          "mode": "read",
          "organisms": [
            {
              "organismName": "Resumo de fechamento",
              "purpose": "Exibir o relatório consolidado do turno selecionado.",
              "userActions": [
                "visualizarRelatorio"
              ],
              "requiredEntities": [
                "ShiftReport"
              ],
              "readsFields": [
                "ShiftReport.shiftReportId",
                "ShiftReport.shiftId",
                "ShiftReport.totalSalesAmount",
                "ShiftReport.totalOrders",
                "ShiftReport.totalItems",
                "ShiftReport.notes",
                "ShiftReport.createdAt",
                "ShiftReport.updatedAt"
              ],
              "writesFields": [],
              "rulesApplied": []
            }
          ]
        },
        {
          "sectionName": "Confirmação de fechamento",
          "mode": "action",
          "organisms": [
            {
              "organismName": "Confirmar fechamento",
              "purpose": "Confirmar o fechamento do turno e gerar o relatório.",
              "userActions": [
                "confirmarFechamento"
              ],
              "requiredEntities": [
                "Shift",
                "ShiftReport",
                "Order"
              ],
              "readsFields": [
                "Shift.shiftId",
                "Shift.status"
              ],
              "writesFields": [
                "Shift.status",
                "Shift.closedAt",
                "ShiftReport.shiftReportId"
              ],
              "rulesApplied": [
                "shiftClosureRequiresNoOpenOrders"
              ]
            }
          ]
        }
      ]
    },
    "bffCommands": [
      {
        "commandName": "listarTurnos",
        "purpose": "Carregar turnos para seleção.",
        "kind": "query",
        "input": [
          {
            "name": "dataInicio",
            "type": "date",
            "required": false
          },
          {
            "name": "dataFim",
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
            "name": "shiftId",
            "type": "Shift"
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
            "name": "shiftConfigId",
            "type": "ShiftConfig"
          }
        ],
        "readsEntities": [
          "Shift"
        ],
        "writesEntities": [],
        "readsTables": [
          "shifts"
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
        "commandName": "listarPedidos",
        "purpose": "Listar pedidos do turno para validação.",
        "kind": "query",
        "input": [
          {
            "name": "shiftId",
            "type": "Shift",
            "required": true
          },
          {
            "name": "status",
            "type": "string",
            "required": false
          }
        ],
        "output": [
          {
            "name": "orderId",
            "type": "Order"
          },
          {
            "name": "status",
            "type": "string"
          },
          {
            "name": "shiftId",
            "type": "Shift"
          },
          {
            "name": "createdAt",
            "type": "datetime"
          },
          {
            "name": "updatedAt",
            "type": "datetime"
          }
        ],
        "readsEntities": [
          "Order"
        ],
        "writesEntities": [],
        "readsTables": [
          "orders",
          "order_status_history"
        ],
        "writesTables": [],
        "usecaseRefs": [
          "listarPedidos"
        ],
        "layerContract": {
          "controllerLayer": "layer_2_controllers",
          "mustCallLayer": "layer_3_usecases",
          "directTableAccessForbidden": true
        },
        "rulesApplied": []
      },
      {
        "commandName": "fecharTurno",
        "purpose": "Confirmar fechamento do turno e gerar relatório.",
        "kind": "command",
        "input": [
          {
            "name": "shiftId",
            "type": "Shift",
            "required": true
          }
        ],
        "output": [
          {
            "name": "shiftId",
            "type": "Shift"
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
            "name": "shiftReportId",
            "type": "ShiftReport"
          }
        ],
        "readsEntities": [
          "Shift",
          "Order"
        ],
        "writesEntities": [
          "Shift",
          "ShiftReport"
        ],
        "readsTables": [
          "shifts",
          "orders"
        ],
        "writesTables": [
          "shifts",
          "shift_reports",
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
          "shiftClosureRequiresNoOpenOrders"
        ]
      },
      {
        "commandName": "obterRelatorioTurno",
        "purpose": "Exibir relatório do turno selecionado.",
        "kind": "query",
        "input": [
          {
            "name": "shiftId",
            "type": "Shift",
            "required": true
          }
        ],
        "output": [
          {
            "name": "shiftReportId",
            "type": "ShiftReport"
          },
          {
            "name": "shiftId",
            "type": "Shift"
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
            "name": "totalItems",
            "type": "number"
          },
          {
            "name": "notes",
            "type": "text"
          },
          {
            "name": "createdAt",
            "type": "datetime"
          },
          {
            "name": "updatedAt",
            "type": "datetime"
          }
        ],
        "readsEntities": [
          "ShiftReport"
        ],
        "writesEntities": [],
        "readsTables": [
          "shift_reports"
        ],
        "writesTables": [],
        "usecaseRefs": [
          "obterRelatorioTurno"
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

export default fechamentoTurnoPagePlan;
