/// <mls fileReference="_102043_/l4/workflows/orderLifecycle.defs.ts" enhancement="_blank"/>

export const orderLifecycleDef = {
  "schemaVersion": "2026-06-06",
  "artifactType": "workflow",
  "artifactId": "orderLifecycle",
  "moduleName": "cafeFlow",
  "status": "draft",
  "source": {
    "agentName": "agentPlanWorkflowDefinition",
    "stepId": 29,
    "planId": "plan-validate-solution-coverage"
  },
  "data": {
    "workflowDefinition": {
      "workflowId": "orderLifecycle",
      "title": "Ciclo de vida do pedido",
      "purpose": "Gerenciar o fluxo completo de um pedido desde o registro no POS até a entrega ou cancelamento, coordenando atendente e cozinha.",
      "executionMode": "entityLifecycle",
      "createsTask": false,
      "taskConfig": {
        "taskTitleTemplate": "",
        "assigneeRules": [],
        "slaRules": [],
        "taskRoomRequired": false
      },
      "actors": [
        "atendenteCaixa",
        "cozinha"
      ],
      "states": [
        {
          "stateId": "recebido",
          "description": "Pedido registrado no POS e aguardando preparação."
        },
        {
          "stateId": "preparando",
          "description": "Pedido em preparo pela cozinha."
        },
        {
          "stateId": "pronto",
          "description": "Pedido finalizado e pronto para entrega."
        },
        {
          "stateId": "entregue",
          "description": "Pedido entregue ao cliente."
        },
        {
          "stateId": "cancelado",
          "description": "Pedido cancelado."
        }
      ],
      "transitions": [
        {
          "from": "recebido",
          "to": "recebido",
          "trigger": "adicionarItemPedido",
          "actor": "atendenteCaixa",
          "conditions": [],
          "actions": [
            "OrderItem.orderId set",
            "OrderItem.menuItemId set",
            "OrderItem.quantity set",
            "OrderItem.unitPrice set",
            "OrderItem.itemNote set",
            "OrderItem.createdAt set",
            "OrderItem.updatedAt set",
            "Order.updatedAt set"
          ],
          "rulesApplied": [
            "inventoryDecrementPolicy"
          ]
        },
        {
          "from": "recebido",
          "to": "preparando",
          "trigger": "iniciarPreparo",
          "actor": "cozinha",
          "conditions": [],
          "actions": [
            "Order.status set: preparando",
            "Order.updatedAt set"
          ],
          "rulesApplied": [
            "orderStatusLifecycle",
            "kitchenStatusUpdates"
          ]
        },
        {
          "from": "preparando",
          "to": "pronto",
          "trigger": "finalizarPreparo",
          "actor": "cozinha",
          "conditions": [],
          "actions": [
            "Order.status set: pronto",
            "Order.updatedAt set"
          ],
          "rulesApplied": [
            "orderStatusLifecycle",
            "kitchenStatusUpdates"
          ]
        },
        {
          "from": "pronto",
          "to": "entregue",
          "trigger": "confirmarEntrega",
          "actor": "cozinha",
          "conditions": [],
          "actions": [
            "Order.status set: entregue",
            "Order.updatedAt set"
          ],
          "rulesApplied": [
            "orderStatusLifecycle",
            "kitchenStatusUpdates"
          ]
        },
        {
          "from": "recebido",
          "to": "cancelado",
          "trigger": "cancelarPedido",
          "actor": "atendenteCaixa",
          "conditions": [],
          "actions": [
            "Order.status set: cancelado",
            "Order.updatedAt set"
          ],
          "rulesApplied": [
            "orderStatusLifecycle"
          ]
        },
        {
          "from": "preparando",
          "to": "cancelado",
          "trigger": "cancelarPedido",
          "actor": "atendenteCaixa",
          "conditions": [],
          "actions": [
            "Order.status set: cancelado",
            "Order.updatedAt set"
          ],
          "rulesApplied": [
            "orderStatusLifecycle"
          ]
        },
        {
          "from": "pronto",
          "to": "cancelado",
          "trigger": "cancelarPedido",
          "actor": "atendenteCaixa",
          "conditions": [],
          "actions": [
            "Order.status set: cancelado",
            "Order.updatedAt set"
          ],
          "rulesApplied": [
            "orderStatusLifecycle"
          ]
        },
        {
          "from": "recebido",
          "to": "recebido",
          "trigger": "criarPedido",
          "actor": "atendenteCaixa",
          "conditions": [],
          "actions": [
            "Order.orderId set",
            "Order.dailyShiftId set",
            "Order.status set: recebido",
            "Order.serviceType set",
            "Order.tableNumber set",
            "Order.notes set",
            "Order.createdAt set",
            "Order.updatedAt set"
          ],
          "rulesApplied": [
            "orderStatusLifecycle",
            "shiftMustBeOpenForOrders",
            "inventoryDecrementPolicy"
          ]
        }
      ],
      "requiredEntities": [
        "Order",
        "OrderItem"
      ],
      "persistenceRefs": [
        "order",
        "dailySalesMetrics",
        "topSellingItemsMetrics"
      ],
      "usecaseRefs": [
        "criarPedido",
        "adicionarItemPedido",
        "atualizarStatusPedido",
        "listarPedidos",
        "listarPedidosCozinha",
        "obterPedido"
      ],
      "metricRefs": [
        "dailySalesMetrics",
        "topSellingItemsMetrics"
      ],
      "userActions": [
        "registrarPedidoPos",
        "atualizarStatusCozinha"
      ],
      "relatedPages": [
        "posRapido",
        "telaCozinha"
      ],
      "relatedAgents": [],
      "relatedPlugins": [],
      "rulesApplied": [
        "orderStatusLifecycle",
        "kitchenStatusUpdates",
        "shiftMustBeOpenForOrders",
        "inventoryDecrementPolicy"
      ],
      "implementationSuggestions": [
        {
          "suggestionId": "posTouchInterface",
          "title": "Interface touch otimizada para POS",
          "priority": "now",
          "description": "O atendente precisa registrar pedidos rapidamente em dispositivos touch.",
          "tradeoff": "Exige investimento em testes de usabilidade e ajustes de layout para diferentes tamanhos de tela."
        },
        {
          "suggestionId": "kitchenDisplayIntegration",
          "title": "Integração com tela da cozinha em tempo real",
          "priority": "now",
          "description": "A cozinha precisa visualizar novos pedidos e atualizações instantaneamente.",
          "tradeoff": "Requer sincronização em tempo real e possível hardware adicional."
        },
        {
          "suggestionId": "noTaskWorkflow",
          "title": "Sem tarefas dedicadas para o ciclo do pedido",
          "priority": "now",
          "description": "Este fluxo é totalmente operado via POS e tela da cozinha, portanto não cria tarefas separadas.",
          "tradeoff": "Se precisar de auditoria detalhada por tarefa no futuro, será necessário adicionar um fluxo de tarefas específico."
        }
      ],
      "workflowScope": "singleModule",
      "moduleRefs": [
        "cafeFlow"
      ],
      "pageRefsByModule": [],
      "entityRefsByModule": [
        {
          "moduleId": "cafeFlow",
          "entity": "Order"
        },
        {
          "moduleId": "cafeFlow",
          "entity": "OrderItem"
        }
      ],
      "writesArtifacts": [
        {
          "moduleId": "cafeFlow",
          "artifactType": "workflow",
          "artifactId": "orderLifecycle"
        }
      ]
    },
    "defsPlan": {
      "fileName": "workflows/orderLifecycle.defs.ts",
      "exportName": "orderLifecycleDef",
      "saveAsDefs": true
    }
  }
} as const;

export default orderLifecycleDef;
