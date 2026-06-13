/// <mls fileReference="_102043_/l4/workflows/posOrderCaptureWorkflow.defs.ts" enhancement="_blank"/>

export const posOrderCaptureWorkflowDef = {
  "schemaVersion": "2026-06-06",
  "artifactType": "workflow",
  "artifactId": "posOrderCaptureWorkflow",
  "moduleName": "cafeFlow",
  "status": "draft",
  "source": {
    "agentName": "agentPlanWorkflowDefinition",
    "stepId": 29,
    "planId": "plan-validate-solution-coverage"
  },
  "data": {
    "workflowDefinition": {
      "workflowId": "posOrderCaptureWorkflow",
      "title": "Workflow de lançamento rápido de pedido no POS",
      "purpose": "Guiar o atendente no processo de captura rápida de itens, confirmação e envio para a cozinha diretamente na interface do POS.",
      "executionMode": "uiState",
      "createsTask": false,
      "taskConfig": {
        "taskTitleTemplate": "N/A",
        "assigneeRules": [],
        "slaRules": [],
        "taskRoomRequired": false
      },
      "actors": [
        "atendente"
      ],
      "states": [
        {
          "stateId": "draftOrder",
          "description": "Captura rápida de itens e ajustes no pedido ainda não confirmado."
        },
        {
          "stateId": "reviewOrder",
          "description": "Revisão final do pedido antes da confirmação."
        },
        {
          "stateId": "sentToKitchen",
          "description": "Pedido confirmado e enviado para preparo com status recebido."
        }
      ],
      "transitions": [
        {
          "from": "draftOrder",
          "to": "draftOrder",
          "trigger": "addOrUpdateItem",
          "actor": "atendente",
          "conditions": [],
          "actions": [
            "OrderItem.menuItemId",
            "OrderItem.quantity",
            "OrderItem.unitPrice",
            "OrderItem.totalPrice",
            "OrderItem.updatedAt"
          ],
          "rulesApplied": []
        },
        {
          "from": "draftOrder",
          "to": "reviewOrder",
          "trigger": "reviewOrder",
          "actor": "atendente",
          "conditions": [],
          "actions": [
            "Order.updatedAt"
          ],
          "rulesApplied": []
        },
        {
          "from": "reviewOrder",
          "to": "draftOrder",
          "trigger": "editItems",
          "actor": "atendente",
          "conditions": [],
          "actions": [
            "Order.updatedAt"
          ],
          "rulesApplied": []
        },
        {
          "from": "reviewOrder",
          "to": "sentToKitchen",
          "trigger": "confirmAndSend",
          "actor": "atendente",
          "conditions": [
            "orderRequiresItem"
          ],
          "actions": [
            "Order.status=recebido",
            "Order.createdAt",
            "Order.updatedAt"
          ],
          "rulesApplied": [
            "orderRequiresItem"
          ]
        }
      ],
      "requiredEntities": [
        "Order",
        "OrderItem"
      ],
      "persistenceRefs": [
        "order"
      ],
      "usecaseRefs": [
        "criarPedido"
      ],
      "metricRefs": [],
      "userActions": [
        "addOrUpdateItem",
        "reviewOrder",
        "editItems",
        "confirmAndSend"
      ],
      "relatedPages": [
        "posRapido"
      ],
      "relatedAgents": [],
      "relatedPlugins": [],
      "rulesApplied": [
        "orderRequiresItem"
      ],
      "implementationSuggestions": [
        {
          "suggestionId": "fastAddItems",
          "title": "Manter estado local de itens antes de persistir o pedido completo",
          "priority": "now",
          "description": "Use um estado local no POS para adicionar/remover itens rapidamente e apenas persistir no confirmar.",
          "tradeoff": "Exige sincronização cuidadosa ao confirmar para evitar divergências."
        },
        {
          "suggestionId": "oneTapSend",
          "title": "Botão único de enviar para cozinha que dispara o orderStatusWorkflow",
          "priority": "now",
          "description": "Ofereça uma ação única no POS que confirma e inicia o preparo sem navegação extra.",
          "tradeoff": "Menos confirmação intermediária pode aumentar erros de envio."
        },
        {
          "suggestionId": "noTaskNeeded",
          "title": "Sem criação de tarefa para captura rápida no POS",
          "priority": "now",
          "description": "A captura rápida é uma interação síncrona do POS; a criação de tarefa adicionaria fricção sem ganho operacional.",
          "tradeoff": "Sem tarefas, não há fila assíncrona para retomar pedidos abandonados."
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
          "artifactId": "posOrderCaptureWorkflow"
        }
      ]
    },
    "defsPlan": {
      "fileName": "workflows/posOrderCaptureWorkflow.defs.ts",
      "exportName": "posOrderCaptureWorkflowDef",
      "saveAsDefs": true
    }
  }
} as const;

export default posOrderCaptureWorkflowDef;
