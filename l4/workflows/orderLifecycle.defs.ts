/// <mls fileReference="_102043_/l4/workflows/orderLifecycle.defs.ts" enhancement="_blank"/>

export const orderLifecycleDef = {
  "schemaVersion": "2026-06-06",
  "artifactType": "workflow",
  "artifactId": "orderLifecycle",
  "moduleName": "cafeFlow",
  "status": "draft",
  "source": {
    "agentName": "agentPlanWorkflowDefinition",
    "stepId": 74,
    "planId": ""
  },
  "data": {
    "workflowDefinition": {
      "workflowId": "orderLifecycle",
      "title": "Ciclo de Vida do Pedido",
      "purpose": "Coordenar o pedido desde o registro no POS, passando pela fila da cozinha, até a entrega, incluindo a baixa automática de estoque por ingrediente.",
      "executionMode": "entityLifecycle",
      "createsTask": false,
      "taskConfig": {
        "taskTitleTemplate": "",
        "assigneeRules": [],
        "slaRules": [],
        "taskRoomRequired": false
      },
      "actors": [
        "caixa",
        "cozinha"
      ],
      "states": [
        {
          "stateId": "novo",
          "description": "Pedido registrado no POS e aguardando preparo."
        },
        {
          "stateId": "emPreparo",
          "description": "Pedido em preparo pela cozinha."
        },
        {
          "stateId": "pronto",
          "description": "Pedido finalizado e aguardando entrega."
        },
        {
          "stateId": "entregue",
          "description": "Pedido entregue e fechado."
        }
      ],
      "transitions": [
        {
          "from": "novo",
          "to": "emPreparo",
          "trigger": "startPreparation",
          "actor": "cozinha",
          "conditions": [
            "rule-order-status-transition"
          ],
          "actions": [
            "set orderAggregate.status=Em preparo",
            "set orderAggregate.updated_at=now"
          ],
          "rulesApplied": [
            "rule-order-status-transition"
          ]
        },
        {
          "from": "emPreparo",
          "to": "pronto",
          "trigger": "markReady",
          "actor": "cozinha",
          "conditions": [
            "rule-order-status-transition"
          ],
          "actions": [
            "set orderAggregate.status=Pronto",
            "set orderAggregate.updated_at=now"
          ],
          "rulesApplied": [
            "rule-order-status-transition"
          ]
        },
        {
          "from": "pronto",
          "to": "entregue",
          "trigger": "markDelivered",
          "actor": "cozinha",
          "conditions": [
            "rule-order-status-transition"
          ],
          "actions": [
            "set orderAggregate.status=Entregue",
            "set orderAggregate.updated_at=now",
            "set orderAggregate.closed_at=now"
          ],
          "rulesApplied": [
            "rule-order-status-transition",
            "rule-stock-deduct-by-ingredient"
          ]
        }
      ],
      "requiredEntities": [
        "Order",
        "OrderItem",
        "KitchenTicket"
      ],
      "persistenceRefs": [
        "orderAggregate"
      ],
      "usecaseRefs": [
        "usecaseCriarPedido",
        "usecaseAtualizarStatusPedido",
        "usecaseBaixarEstoqueIngredientes"
      ],
      "metricRefs": [
        "dailySalesMetrics",
        "topSellingItemsMetrics"
      ],
      "userActions": [
        "registrarPedido",
        "atualizarStatusPedido",
        "acompanharFilaCozinha"
      ],
      "relatedPages": [],
      "relatedAgents": [],
      "relatedPlugins": [],
      "rulesApplied": [
        "rule-order-status-transition",
        "rule-stock-deduct-by-ingredient"
      ],
      "implementationSuggestions": [
        {
          "suggestionId": "suggOrderKitchenNotification",
          "title": "Notificação em tempo real para cozinha",
          "priority": "now",
          "description": "Enviar notificação em tempo real quando o pedido sair de Novo para Em preparo, acionada pelo usecaseAtualizarStatusPedido.",
          "tradeoff": "Aumenta a complexidade de infraestrutura em tempo real e exige canal de push confiável."
        },
        {
          "suggestionId": "suggOrderPosSync",
          "title": "Sincronização de status no POS",
          "priority": "now",
          "description": "Atualizar o POS automaticamente quando o status do pedido mudar (Em preparo, Pronto, Entregue), via assinatura de eventos do backend.",
          "tradeoff": "Requer mecanismo de atualização em tempo real no POS e tratamento de reconexão."
        },
        {
          "suggestionId": "suggNoTaskNeeded",
          "title": "Sem tarefas manuais no fluxo",
          "priority": "now",
          "description": "O fluxo é contínuo e operado em tempo real pelo POS e painel da cozinha; tarefas não agregam valor e poderiam atrasar o preparo.",
          "tradeoff": "Perde-se rastreamento explícito de pendências individuais fora do painel operacional."
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
        },
        {
          "moduleId": "cafeFlow",
          "entity": "KitchenTicket"
        }
      ],
      "writesArtifacts": [
        {
          "moduleId": "cafeFlow",
          "artifactType": "table",
          "artifactId": "orderAggregate"
        },
        {
          "moduleId": "cafeFlow",
          "artifactType": "metricTable",
          "artifactId": "dailySalesMetrics"
        },
        {
          "moduleId": "cafeFlow",
          "artifactType": "metricTable",
          "artifactId": "topSellingItemsMetrics"
        },
        {
          "moduleId": "cafeFlow",
          "artifactType": "usecase",
          "artifactId": "usecaseCriarPedido"
        },
        {
          "moduleId": "cafeFlow",
          "artifactType": "usecase",
          "artifactId": "usecaseAtualizarStatusPedido"
        },
        {
          "moduleId": "cafeFlow",
          "artifactType": "usecase",
          "artifactId": "usecaseBaixarEstoqueIngredientes"
        },
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
