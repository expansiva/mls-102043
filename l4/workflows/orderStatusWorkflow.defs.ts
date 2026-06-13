/// <mls fileReference="_102043_/l4/workflows/orderStatusWorkflow.defs.ts" enhancement="_blank"/>

export const orderStatusWorkflowDef = {
  "schemaVersion": "2026-06-06",
  "artifactType": "workflow",
  "artifactId": "orderStatusWorkflow",
  "moduleName": "cafeFlow",
  "status": "draft",
  "source": {
    "agentName": "agentPlanWorkflowDefinition",
    "stepId": 29,
    "planId": "plan-validate-solution-coverage"
  },
  "data": {
    "workflowDefinition": {
      "workflowId": "orderStatusWorkflow",
      "title": "Workflow de status do pedido",
      "purpose": "Controlar o ciclo de vida de um pedido desde o recebimento até a entrega ou cancelamento, coordenando a cozinha e registrando histórico.",
      "executionMode": "entityLifecycle",
      "createsTask": true,
      "taskConfig": {
        "taskTitleTemplate": "Pedido {{orderId}} em preparo",
        "assigneeRules": [
          "cozinhaQueue"
        ],
        "slaRules": [
          "preparoDentroDe15Min"
        ],
        "taskRoomRequired": true
      },
      "actors": [
        "atendente",
        "cozinha"
      ],
      "states": [
        {
          "stateId": "recebido",
          "description": "Pedido registrado e aguardando início do preparo."
        },
        {
          "stateId": "emPreparo",
          "description": "Pedido em preparação pela cozinha."
        },
        {
          "stateId": "pronto",
          "description": "Pedido finalizado e aguardando entrega."
        },
        {
          "stateId": "entregue",
          "description": "Pedido entregue ao cliente."
        },
        {
          "stateId": "cancelado",
          "description": "Pedido cancelado antes da entrega."
        }
      ],
      "transitions": [
        {
          "from": "recebido",
          "to": "emPreparo",
          "trigger": "iniciarPreparo",
          "actor": "cozinha",
          "conditions": [
            "orderStatusTransition"
          ],
          "actions": [
            "Order.status=emPreparo",
            "Order.updatedAt=now",
            "OrderStatusHistory.fromStatus=Recebido",
            "OrderStatusHistory.toStatus=Em preparo",
            "OrderStatusHistory.changedAt=now",
            "OrderStatusHistory.changedBy=actorId",
            "OrderStatusHistory.createdAt=now",
            "OrderStatusHistory.updatedAt=now"
          ],
          "rulesApplied": [
            "orderStatusTransition"
          ]
        },
        {
          "from": "emPreparo",
          "to": "pronto",
          "trigger": "finalizarPreparo",
          "actor": "cozinha",
          "conditions": [
            "orderStatusTransition"
          ],
          "actions": [
            "Order.status=pronto",
            "Order.updatedAt=now",
            "OrderStatusHistory.fromStatus=Em preparo",
            "OrderStatusHistory.toStatus=Pronto",
            "OrderStatusHistory.changedAt=now",
            "OrderStatusHistory.changedBy=actorId",
            "OrderStatusHistory.createdAt=now",
            "OrderStatusHistory.updatedAt=now"
          ],
          "rulesApplied": [
            "orderStatusTransition"
          ]
        },
        {
          "from": "pronto",
          "to": "entregue",
          "trigger": "confirmarEntrega",
          "actor": "atendente",
          "conditions": [
            "orderStatusTransition"
          ],
          "actions": [
            "Order.status=entregue",
            "Order.updatedAt=now",
            "OrderStatusHistory.fromStatus=Pronto",
            "OrderStatusHistory.toStatus=Entregue",
            "OrderStatusHistory.changedAt=now",
            "OrderStatusHistory.changedBy=actorId",
            "OrderStatusHistory.createdAt=now",
            "OrderStatusHistory.updatedAt=now"
          ],
          "rulesApplied": [
            "orderStatusTransition"
          ]
        },
        {
          "from": "recebido",
          "to": "cancelado",
          "trigger": "cancelarPedido",
          "actor": "atendente",
          "conditions": [
            "orderStatusTransition"
          ],
          "actions": [
            "Order.status=cancelado",
            "Order.updatedAt=now",
            "OrderStatusHistory.fromStatus=Recebido",
            "OrderStatusHistory.toStatus=Cancelado",
            "OrderStatusHistory.changedAt=now",
            "OrderStatusHistory.changedBy=actorId",
            "OrderStatusHistory.createdAt=now",
            "OrderStatusHistory.updatedAt=now"
          ],
          "rulesApplied": [
            "orderStatusTransition"
          ]
        },
        {
          "from": "emPreparo",
          "to": "cancelado",
          "trigger": "cancelarPedido",
          "actor": "cozinha",
          "conditions": [
            "orderStatusTransition"
          ],
          "actions": [
            "Order.status=cancelado",
            "Order.updatedAt=now",
            "OrderStatusHistory.fromStatus=Em preparo",
            "OrderStatusHistory.toStatus=Cancelado",
            "OrderStatusHistory.changedAt=now",
            "OrderStatusHistory.changedBy=actorId",
            "OrderStatusHistory.createdAt=now",
            "OrderStatusHistory.updatedAt=now"
          ],
          "rulesApplied": [
            "orderStatusTransition"
          ]
        },
        {
          "from": "pronto",
          "to": "cancelado",
          "trigger": "cancelarPedido",
          "actor": "atendente",
          "conditions": [
            "orderStatusTransition"
          ],
          "actions": [
            "Order.status=cancelado",
            "Order.updatedAt=now",
            "OrderStatusHistory.fromStatus=Pronto",
            "OrderStatusHistory.toStatus=Cancelado",
            "OrderStatusHistory.changedAt=now",
            "OrderStatusHistory.changedBy=actorId",
            "OrderStatusHistory.createdAt=now",
            "OrderStatusHistory.updatedAt=now"
          ],
          "rulesApplied": [
            "orderStatusTransition"
          ]
        }
      ],
      "requiredEntities": [
        "Order",
        "OrderStatusHistory"
      ],
      "persistenceRefs": [
        "order",
        "orderStatusHistory",
        "dailySalesMetrics",
        "topSellingItemsMetrics"
      ],
      "usecaseRefs": [
        "criarPedido",
        "listarPedidos",
        "listarPedidosCozinha",
        "atualizarStatusPedido"
      ],
      "metricRefs": [
        "dailySalesMetrics",
        "topSellingItemsMetrics"
      ],
      "userActions": [
        "criarPedido",
        "iniciarPreparo",
        "finalizarPreparo",
        "confirmarEntrega",
        "cancelarPedido"
      ],
      "relatedPages": [
        "fechamentoTurno",
        "painelCozinha",
        "posRapido"
      ],
      "relatedAgents": [],
      "relatedPlugins": [],
      "rulesApplied": [
        "orderStatusTransition",
        "orderRequiresItem"
      ],
      "implementationSuggestions": [
        {
          "suggestionId": "taskOnPreparo",
          "title": "Criar tarefa para cozinha ao mudar para 'emPreparo'",
          "priority": "now",
          "description": "Criar tarefa vinculada ao pedido quando a transição para emPreparo ocorrer via atualizarStatusPedido, garantindo visibilidade na fila da cozinha.",
          "tradeoff": "Aumenta volume de tarefas e requer limpeza automática após entrega ou cancelamento."
        },
        {
          "suggestionId": "historyOnTransition",
          "title": "Registrar histórico em OrderStatusHistory a cada transição válida",
          "priority": "now",
          "description": "Persistir um registro de histórico em cada mudança de status usando OrderStatusHistory para auditoria e métricas de tempo.",
          "tradeoff": "Cresce o volume de registros e exige indexação eficiente."
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
          "entity": "OrderStatusHistory"
        }
      ],
      "writesArtifacts": [
        {
          "moduleId": "cafeFlow",
          "artifactType": "workflow",
          "artifactId": "orderStatusWorkflow"
        }
      ]
    },
    "defsPlan": {
      "fileName": "workflows/orderStatusWorkflow.defs.ts",
      "exportName": "orderStatusWorkflowDef",
      "saveAsDefs": true
    }
  }
} as const;

export default orderStatusWorkflowDef;
