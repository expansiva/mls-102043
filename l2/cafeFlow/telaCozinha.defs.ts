/// <mls fileReference="_102043_/l2/cafeFlow/telaCozinha.defs.ts" enhancement="_blank"/>

export const telaCozinhaPagePlan = {
  "schemaVersion": "2026-06-06",
  "artifactType": "page",
  "artifactId": "telaCozinha",
  "moduleName": "cafeFlow",
  "status": "draft",
  "source": {
    "agentName": "agentPlanPageDefinition",
    "stepId": 63,
    "planId": ""
  },
  "data": {
    "pageDefinition": {
      "pageId": "telaCozinha",
      "pageName": "Tela da cozinha",
      "actor": "cozinha",
      "purpose": "Organizar a fila de pedidos e atualizar o status até a entrega.",
      "capabilities": [
        "atualizarStatusCozinha"
      ],
      "flowRefs": {
        "experienceFlows": [],
        "entityLifecycles": [
          "orderLifecycle"
        ],
        "taskWorkflows": [],
        "automations": []
      },
      "pluginRefs": [],
      "mdmRefs": [],
      "pageInputs": [
        {
          "name": "statusFiltro",
          "type": "string",
          "required": false,
          "sources": [
            "queryParam",
            "userPreference"
          ],
          "description": "Filtro de status para a fila da cozinha (recebido, preparando, pronto).",
          "entityRef": "Order",
          "fieldRef": "status"
        },
        {
          "name": "periodo",
          "type": "date",
          "required": false,
          "sources": [
            "queryParam"
          ],
          "description": "Período para listar pedidos recentes.",
          "entityRef": "Order",
          "fieldRef": "createdAt"
        },
        {
          "name": "dailyShiftId",
          "type": "string",
          "required": false,
          "sources": [
            "queryParam"
          ],
          "description": "Turno diário opcional para filtrar pedidos.",
          "entityRef": "Order",
          "fieldRef": "dailyShiftId"
        }
      ],
      "navigationRefs": [],
      "sections": [
        {
          "sectionName": "Filtros da fila",
          "mode": "filter",
          "organisms": [
            {
              "organismName": "FiltroStatusPeriodo",
              "purpose": "Permitir filtrar pedidos por status, período e turno.",
              "userActions": [
                "filtrarPedidos",
                "limparFiltros"
              ],
              "requiredEntities": [
                "Order"
              ],
              "readsFields": [
                "Order.status",
                "Order.createdAt",
                "Order.dailyShiftId"
              ],
              "writesFields": [],
              "rulesApplied": []
            }
          ]
        },
        {
          "sectionName": "Fila de pedidos",
          "mode": "list",
          "organisms": [
            {
              "organismName": "ListaPedidosCozinha",
              "purpose": "Exibir pedidos pendentes e em preparo com dados essenciais.",
              "userActions": [
                "selecionarPedido",
                "atualizarStatusPedido"
              ],
              "requiredEntities": [
                "Order"
              ],
              "readsFields": [
                "Order.orderId",
                "Order.status",
                "Order.serviceType",
                "Order.tableNumber",
                "Order.notes",
                "Order.createdAt",
                "Order.updatedAt"
              ],
              "writesFields": [
                "Order.status",
                "Order.updatedAt"
              ],
              "rulesApplied": [
                "orderStatusLifecycle",
                "kitchenStatusUpdates"
              ]
            }
          ]
        }
      ]
    },
    "bffCommands": [
      {
        "commandName": "listarPedidosCozinha",
        "purpose": "Listar pedidos da fila da cozinha por status, período e turno.",
        "kind": "query",
        "input": [
          {
            "name": "statusFiltro",
            "type": "string",
            "required": false
          },
          {
            "name": "periodo",
            "type": "date",
            "required": false
          },
          {
            "name": "dailyShiftId",
            "type": "string",
            "required": false
          }
        ],
        "output": [
          {
            "name": "orderId",
            "type": "uuid"
          },
          {
            "name": "status",
            "type": "string"
          },
          {
            "name": "serviceType",
            "type": "string"
          },
          {
            "name": "tableNumber",
            "type": "string"
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
          "Order"
        ],
        "writesEntities": [],
        "readsTables": [
          "order"
        ],
        "writesTables": [],
        "usecaseRefs": [
          "listarPedidosCozinha"
        ],
        "layerContract": {
          "controllerLayer": "layer_2_controllers",
          "mustCallLayer": "layer_3_usecases",
          "directTableAccessForbidden": true
        },
        "rulesApplied": []
      },
      {
        "commandName": "atualizarStatusPedido",
        "purpose": "Mover pedido entre recebido, preparando, pronto e entregue.",
        "kind": "command",
        "input": [
          {
            "name": "orderId",
            "type": "uuid",
            "required": true
          },
          {
            "name": "novoStatus",
            "type": "string",
            "required": true
          }
        ],
        "output": [
          {
            "name": "orderId",
            "type": "uuid"
          },
          {
            "name": "status",
            "type": "string"
          },
          {
            "name": "updatedAt",
            "type": "datetime"
          }
        ],
        "readsEntities": [
          "Order"
        ],
        "writesEntities": [
          "Order"
        ],
        "readsTables": [
          "order"
        ],
        "writesTables": [
          "order",
          "daily_sales_metrics"
        ],
        "usecaseRefs": [
          "atualizarStatusPedido"
        ],
        "layerContract": {
          "controllerLayer": "layer_2_controllers",
          "mustCallLayer": "layer_3_usecases",
          "directTableAccessForbidden": true
        },
        "rulesApplied": [
          "orderStatusLifecycle",
          "kitchenStatusUpdates"
        ]
      }
    ]
  }
} as const;

export default telaCozinhaPagePlan;
