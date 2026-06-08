/// <mls fileReference="_102043_/l2/cafeFlow/posOrderConfirm.defs.ts" enhancement="_blank"/>

export const posOrderConfirmPagePlan = {
  "schemaVersion": "2026-06-06",
  "artifactType": "page",
  "artifactId": "posOrderConfirm",
  "moduleName": "cafeFlow",
  "status": "draft",
  "source": {
    "agentName": "agentPlanPageDefinition",
    "stepId": 80,
    "planId": ""
  },
  "data": {
    "pageDefinition": {
      "pageId": "posOrderConfirm",
      "pageName": "POS - Confirmar Pedido",
      "actor": "caixa",
      "purpose": "Revisar itens e confirmar envio do pedido para a cozinha.",
      "capabilities": [
        "registrarPedido"
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
      "mdmRefs": [
        "menuItem"
      ],
      "pageInputs": [
        {
          "name": "orderId",
          "type": "uuid",
          "required": true,
          "sources": [
            "routeParam",
            "previousStepResult"
          ],
          "description": "Identificador do pedido em rascunho para confirmação.",
          "entityRef": "Order",
          "fieldRef": "order_id"
        }
      ],
      "navigationRefs": [
        {
          "direction": "inbound",
          "pageId": "posOrderCreate",
          "trigger": "pedido montado",
          "description": "Após montar itens e tipo de pedido."
        },
        {
          "direction": "outbound",
          "pageId": "kitchenQueue",
          "trigger": "pedido enviado para cozinha",
          "description": "Depois da confirmação do caixa."
        }
      ],
      "sections": [
        {
          "sectionName": "Resumo do pedido",
          "mode": "read",
          "organisms": [
            {
              "organismName": "orderSummaryPanel",
              "purpose": "Exibir tipo de pedido, mesa e totais para validação do caixa.",
              "userActions": [],
              "requiredEntities": [
                "orderAggregateEntity"
              ],
              "readsFields": [
                "order_type",
                "table_number",
                "item_count",
                "total_amount"
              ],
              "writesFields": [],
              "rulesApplied": [
                "rule-order-status-transition"
              ]
            }
          ]
        },
        {
          "sectionName": "Itens do pedido",
          "mode": "read",
          "organisms": [
            {
              "organismName": "orderItemsList",
              "purpose": "Revisar itens do pedido antes de enviar para a cozinha.",
              "userActions": [],
              "requiredEntities": [
                "orderAggregateEntity",
                "menuItemEntity"
              ],
              "readsFields": [
                "details.items",
                "details.notes"
              ],
              "writesFields": [],
              "rulesApplied": [
                "rule-menuitem-recipe-required"
              ]
            }
          ]
        },
        {
          "sectionName": "Confirmação de envio",
          "mode": "confirm",
          "organisms": [
            {
              "organismName": "confirmSendToKitchenAction",
              "purpose": "Confirmar envio do pedido para a cozinha.",
              "userActions": [
                "confirmOrderSendKitchen"
              ],
              "requiredEntities": [
                "orderAggregateEntity"
              ],
              "readsFields": [
                "order_id",
                "status"
              ],
              "writesFields": [
                "status",
                "updated_at"
              ],
              "rulesApplied": [
                "rule-order-status-transition"
              ]
            }
          ]
        }
      ]
    },
    "bffCommands": [
      {
        "commandName": "getOrderDraft",
        "purpose": "Carregar resumo do pedido para confirmação.",
        "kind": "query",
        "input": {
          "orderId": "uuid"
        },
        "output": {
          "order": {
            "orderId": "uuid",
            "orderNumber": "string",
            "orderType": "string",
            "tableNumber": "string?",
            "status": "string",
            "itemCount": "number",
            "totalAmount": "number",
            "items": [
              {
                "menuItemId": "uuid",
                "menuItemName": "string",
                "quantity": "number",
                "unitPrice": "number",
                "lineTotal": "number",
                "notes": "string?"
              }
            ],
            "notes": "string?"
          }
        },
        "readsEntities": [
          "orderAggregateEntity",
          "menuItemEntity"
        ],
        "writesEntities": [],
        "readsTables": [
          "order_aggregate"
        ],
        "writesTables": [],
        "usecaseRefs": [
          "usecaseCriarPedido"
        ],
        "layerContract": {
          "controllerLayer": "layer_2_controllers",
          "mustCallLayer": "layer_3_usecases",
          "directTableAccessForbidden": true
        },
        "rulesApplied": [
          "rule-menuitem-recipe-required"
        ]
      },
      {
        "commandName": "submitOrderToKitchen",
        "purpose": "Confirmar pedido e enviar para a cozinha.",
        "kind": "command",
        "input": {
          "orderId": "uuid",
          "confirmedByCashier": "boolean"
        },
        "output": {
          "order": {
            "orderId": "uuid",
            "status": "string",
            "updatedAt": "timestamp"
          }
        },
        "readsEntities": [
          "orderAggregateEntity"
        ],
        "writesEntities": [
          "orderAggregateEntity"
        ],
        "readsTables": [
          "order_aggregate"
        ],
        "writesTables": [
          "order_aggregate"
        ],
        "usecaseRefs": [
          "usecaseCriarPedido"
        ],
        "layerContract": {
          "controllerLayer": "layer_2_controllers",
          "mustCallLayer": "layer_3_usecases",
          "directTableAccessForbidden": true
        },
        "rulesApplied": [
          "rule-order-status-transition"
        ]
      }
    ]
  }
} as const;

export default posOrderConfirmPagePlan;
