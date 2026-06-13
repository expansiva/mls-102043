/// <mls fileReference="_102043_/l2/cafeFlow/painelCozinha.defs.ts" enhancement="_blank"/>

export const painelCozinhaPagePlan = {
  "schemaVersion": "2026-06-06",
  "artifactType": "page",
  "artifactId": "painelCozinha",
  "moduleName": "cafeFlow",
  "status": "draft",
  "source": {
    "agentName": "agentPlanPageDefinition",
    "stepId": 56,
    "planId": ""
  },
  "data": {
    "pageDefinition": {
      "pageId": "painelCozinha",
      "pageName": "Painel da cozinha",
      "actor": "cozinha",
      "purpose": "Visualizar a fila de pedidos e atualizar status de preparo e entrega.",
      "capabilities": [
        "atualizarStatusCozinha"
      ],
      "flowRefs": {
        "experienceFlows": [],
        "entityLifecycles": [
          "orderStatusWorkflow"
        ],
        "taskWorkflows": [],
        "automations": []
      },
      "pluginRefs": [],
      "mdmRefs": [],
      "pageInputs": [],
      "navigationRefs": [
        {
          "direction": "inbound",
          "pageId": "posRapido",
          "trigger": "Pedidos enviados para preparo",
          "description": "Pedidos confirmados no POS entram na fila da cozinha."
        }
      ],
      "sections": [
        {
          "sectionName": "Fila de pedidos",
          "mode": "list",
          "organisms": [
            {
              "organismName": "ListaDePedidosCozinha",
              "purpose": "Exibir pedidos recebidos para preparo com status atual e horário.",
              "userActions": [
                "selecionarPedido",
                "iniciarPreparo",
                "finalizarPreparo",
                "cancelarPedido"
              ],
              "requiredEntities": [
                "Order"
              ],
              "readsFields": [
                "Order.orderId",
                "Order.status",
                "Order.createdAt",
                "Order.shiftId"
              ],
              "writesFields": [],
              "rulesApplied": [
                "orderStatusTransition"
              ]
            }
          ]
        },
        {
          "sectionName": "Detalhe e atualização de status",
          "mode": "detail",
          "organisms": [
            {
              "organismName": "AtualizarStatusPedido",
              "purpose": "Atualizar status do pedido selecionado conforme o fluxo de preparo.",
              "userActions": [
                "iniciarPreparo",
                "finalizarPreparo",
                "cancelarPedido"
              ],
              "requiredEntities": [
                "Order",
                "OrderStatusHistory"
              ],
              "readsFields": [
                "Order.orderId",
                "Order.status",
                "Order.updatedAt"
              ],
              "writesFields": [
                "Order.status",
                "Order.updatedAt",
                "OrderStatusHistory.fromStatus",
                "OrderStatusHistory.toStatus",
                "OrderStatusHistory.changedAt",
                "OrderStatusHistory.changedBy"
              ],
              "rulesApplied": [
                "orderStatusTransition"
              ]
            }
          ]
        }
      ]
    },
    "bffCommands": [
      {
        "commandName": "listarPedidosCozinha",
        "purpose": "Carregar pedidos recebidos para a fila da cozinha.",
        "kind": "query",
        "input": [
          {
            "name": "status",
            "type": "string",
            "required": false
          },
          {
            "name": "shiftId",
            "type": "Shift",
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
            "name": "createdAt",
            "type": "date"
          },
          {
            "name": "shiftId",
            "type": "Shift"
          }
        ],
        "readsEntities": [
          "Order"
        ],
        "writesEntities": [],
        "readsTables": [
          "orders"
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
        "purpose": "Atualizar status do pedido conforme preparo e entrega.",
        "kind": "command",
        "input": [
          {
            "name": "orderId",
            "type": "Order",
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
            "type": "Order"
          },
          {
            "name": "status",
            "type": "string"
          },
          {
            "name": "updatedAt",
            "type": "date"
          }
        ],
        "readsEntities": [
          "Order"
        ],
        "writesEntities": [
          "Order",
          "OrderStatusHistory"
        ],
        "readsTables": [
          "orders"
        ],
        "writesTables": [
          "orders",
          "order_status_history",
          "daily_sales_metrics",
          "top_selling_items_metrics"
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
          "orderStatusTransition"
        ]
      }
    ]
  }
} as const;

export default painelCozinhaPagePlan;
