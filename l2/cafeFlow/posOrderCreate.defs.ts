/// <mls fileReference="_102043_/l2/cafeFlow/posOrderCreate.defs.ts" enhancement="_blank"/>

export const posOrderCreatePagePlan = {
  "schemaVersion": "2026-06-06",
  "artifactType": "page",
  "artifactId": "posOrderCreate",
  "moduleName": "cafeFlow",
  "status": "draft",
  "source": {
    "agentName": "agentPlanPageDefinition",
    "stepId": 79,
    "planId": ""
  },
  "data": {
    "pageDefinition": {
      "pageId": "posOrderCreate",
      "pageName": "POS - Novo Pedido",
      "actor": "caixa",
      "purpose": "Selecionar tipo de pedido e montar itens antes de confirmar envio à cozinha.",
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
      "pageInputs": [],
      "navigationRefs": [
        {
          "direction": "outbound",
          "pageId": "posOrderConfirm",
          "trigger": "continuar para confirmação",
          "description": "Seguir para revisar itens e confirmar envio à cozinha."
        }
      ],
      "sections": [
        {
          "sectionName": "Tipo de Pedido",
          "mode": "edit",
          "organisms": [
            {
              "organismName": "orderTypeSelector",
              "purpose": "Selecionar o tipo de pedido antes de adicionar itens.",
              "userActions": [
                "selectOrderType"
              ],
              "requiredEntities": [
                "Order"
              ],
              "readsFields": [],
              "writesFields": [
                "orderAggregate.order_type",
                "orderAggregate.table_number"
              ],
              "rulesApplied": []
            }
          ]
        },
        {
          "sectionName": "Itens do Cardápio",
          "mode": "edit",
          "organisms": [
            {
              "organismName": "menuItemCatalog",
              "purpose": "Listar itens do cardápio disponíveis para seleção.",
              "userActions": [
                "addOrderItem"
              ],
              "requiredEntities": [
                "MenuItem"
              ],
              "readsFields": [
                "menuItem.id",
                "menuItem.name",
                "menuItem.price",
                "menuItem.category",
                "menuItem.availability"
              ],
              "writesFields": [],
              "rulesApplied": [
                "rule-menuitem-recipe-required"
              ]
            },
            {
              "organismName": "orderItemBuilder",
              "purpose": "Adicionar itens selecionados ao rascunho do pedido.",
              "userActions": [
                "addOrderItem"
              ],
              "requiredEntities": [
                "Order"
              ],
              "readsFields": [
                "orderAggregate.order_id",
                "orderAggregate.details.items"
              ],
              "writesFields": [
                "orderAggregate.details.items",
                "orderAggregate.item_count",
                "orderAggregate.total_amount"
              ],
              "rulesApplied": []
            }
          ]
        },
        {
          "sectionName": "Resumo do Pedido",
          "mode": "view",
          "organisms": [
            {
              "organismName": "orderDraftSummary",
              "purpose": "Exibir resumo do rascunho do pedido antes da confirmação.",
              "userActions": [
                "continueToConfirm"
              ],
              "requiredEntities": [
                "Order"
              ],
              "readsFields": [
                "orderAggregate.order_id",
                "orderAggregate.order_type",
                "orderAggregate.table_number",
                "orderAggregate.item_count",
                "orderAggregate.total_amount"
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
        "commandName": "listMenuItems",
        "purpose": "Listar itens do cardápio disponíveis para venda.",
        "kind": "query",
        "input": {
          "categoryId?": "string",
          "onlyAvailable?": "boolean"
        },
        "output": {
          "menuItems": [
            {
              "menuItemId": "string",
              "name": "string",
              "price": "number",
              "categoryId": "string",
              "availability": "string"
            }
          ]
        },
        "readsEntities": [
          "menuItemEntity"
        ],
        "writesEntities": [],
        "readsTables": [],
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
        "commandName": "startOrderDraft",
        "purpose": "Iniciar rascunho de pedido com tipo selecionado.",
        "kind": "command",
        "input": {
          "orderType": "string",
          "tableNumber?": "string"
        },
        "output": {
          "orderId": "string",
          "orderType": "string",
          "tableNumber?": "string",
          "items": [],
          "itemCount": "number",
          "totalAmount": "number"
        },
        "readsEntities": [
          "menuItemEntity",
          "dailyShiftEntity"
        ],
        "writesEntities": [
          "orderAggregateEntity"
        ],
        "readsTables": [],
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
        "rulesApplied": []
      }
    ]
  }
} as const;

export default posOrderCreatePagePlan;
