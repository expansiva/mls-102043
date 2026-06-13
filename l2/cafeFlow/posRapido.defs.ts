/// <mls fileReference="_102043_/l2/cafeFlow/posRapido.defs.ts" enhancement="_blank"/>

export const posRapidoPagePlan = {
  "schemaVersion": "2026-06-06",
  "artifactType": "page",
  "artifactId": "posRapido",
  "moduleName": "cafeFlow",
  "status": "draft",
  "source": {
    "agentName": "agentPlanPageDefinition",
    "stepId": 55,
    "planId": ""
  },
  "data": {
    "pageDefinition": {
      "pageId": "posRapido",
      "pageName": "POS rápido",
      "actor": "atendente",
      "purpose": "Registrar pedidos rapidamente no POS, revisar itens e confirmar envio para a cozinha.",
      "capabilities": [
        "registrarPedido"
      ],
      "flowRefs": {
        "experienceFlows": [
          "posOrderCaptureWorkflow"
        ],
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
          "direction": "outbound",
          "pageId": "painelCozinha",
          "trigger": "Pedido enviado para a cozinha",
          "description": "Após confirmação e envio do pedido para preparo."
        }
      ],
      "sections": [
        {
          "sectionName": "Pedidos do dia",
          "mode": "view",
          "organisms": [
            {
              "organismName": "Lista de pedidos do dia",
              "purpose": "Consultar rapidamente pedidos recentes e seus status atuais.",
              "userActions": [
                "filtrarPorStatus",
                "filtrarPorPeriodo",
                "visualizarResumo"
              ],
              "requiredEntities": [
                "Order"
              ],
              "readsFields": [
                "orderId",
                "status",
                "createdAt",
                "updatedAt"
              ],
              "writesFields": [],
              "rulesApplied": []
            }
          ]
        },
        {
          "sectionName": "Captura rápida",
          "mode": "edit",
          "organisms": [
            {
              "organismName": "Editor rápido de itens",
              "purpose": "Adicionar e ajustar itens do pedido e observações antes da confirmação.",
              "userActions": [
                "adicionarItem",
                "alterarQuantidade",
                "removerItem",
                "adicionarObservacao"
              ],
              "requiredEntities": [
                "Order"
              ],
              "readsFields": [],
              "writesFields": [],
              "rulesApplied": []
            }
          ]
        },
        {
          "sectionName": "Revisão e envio",
          "mode": "confirm",
          "organisms": [
            {
              "organismName": "Resumo e envio para cozinha",
              "purpose": "Revisar o pedido e confirmar o envio para preparo.",
              "userActions": [
                "confirmarEEnviar",
                "voltarParaEditar"
              ],
              "requiredEntities": [
                "Order",
                "OrderStatusHistory"
              ],
              "readsFields": [],
              "writesFields": [],
              "rulesApplied": [
                "orderRequiresItem",
                "orderStatusTransition"
              ]
            }
          ]
        }
      ]
    },
    "bffCommands": [
      {
        "commandName": "listarPedidos",
        "purpose": "Listar pedidos do dia para consulta rápida no POS.",
        "kind": "query",
        "input": [
          {
            "name": "status",
            "type": "string",
            "required": false
          },
          {
            "name": "dateFrom",
            "type": "date",
            "required": false
          },
          {
            "name": "dateTo",
            "type": "date",
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
            "name": "createdAt",
            "type": "date"
          },
          {
            "name": "updatedAt",
            "type": "date"
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
        "commandName": "criarPedido",
        "purpose": "Criar um pedido com itens e enviar para a cozinha com status recebido.",
        "kind": "command",
        "input": [
          {
            "name": "orderItems",
            "type": "OrderItem[]",
            "required": true
          },
          {
            "name": "observacao",
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
            "name": "createdAt",
            "type": "date"
          },
          {
            "name": "updatedAt",
            "type": "date"
          }
        ],
        "readsEntities": [
          "cardapioEntity"
        ],
        "writesEntities": [
          "Order",
          "OrderStatusHistory"
        ],
        "readsTables": [],
        "writesTables": [
          "orders",
          "order_status_history",
          "daily_sales_metrics",
          "top_selling_items_metrics"
        ],
        "usecaseRefs": [
          "criarPedido"
        ],
        "layerContract": {
          "controllerLayer": "layer_2_controllers",
          "mustCallLayer": "layer_3_usecases",
          "directTableAccessForbidden": true
        },
        "rulesApplied": [
          "orderRequiresItem"
        ]
      }
    ]
  }
} as const;

export default posRapidoPagePlan;
