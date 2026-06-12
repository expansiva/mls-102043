/// <mls fileReference="_102043_/l4/workflows/lowStockAlertAutomation.defs.ts" enhancement="_blank"/>

export const lowStockAlertAutomationDef = {
  "schemaVersion": "2026-06-06",
  "artifactType": "workflow",
  "artifactId": "lowStockAlertAutomation",
  "moduleName": "cafeFlow",
  "status": "draft",
  "source": {
    "agentName": "agentPlanWorkflowDefinition",
    "stepId": 29,
    "planId": "plan-validate-solution-coverage"
  },
  "data": {
    "workflowDefinition": {
      "workflowId": "lowStockAlertAutomation",
      "title": "Automação de alerta de estoque baixo",
      "purpose": "Monitorar os níveis de estoque e gerar alertas quando itens atingirem o limite mínimo, alimentando o dashboard do gerente.",
      "executionMode": "automation",
      "createsTask": false,
      "taskConfig": {
        "taskTitleTemplate": "",
        "assigneeRules": [],
        "slaRules": [],
        "taskRoomRequired": false
      },
      "actors": [
        "gerente"
      ],
      "states": [
        {
          "stateId": "monitoring",
          "description": "Monitoramento contínuo do estoque aguardando gatilhos de verificação."
        },
        {
          "stateId": "evaluating",
          "description": "Avaliação dos níveis de estoque contra o mínimo configurado."
        },
        {
          "stateId": "alertPublished",
          "description": "Alerta de estoque baixo sinalizado para o dashboard do gerente."
        }
      ],
      "transitions": [
        {
          "from": "monitoring",
          "to": "evaluating",
          "trigger": "scheduledStockCheck",
          "actor": "gerente",
          "conditions": [],
          "actions": [],
          "rulesApplied": [
            "inventoryLowStockAlert"
          ]
        },
        {
          "from": "monitoring",
          "to": "evaluating",
          "trigger": "inventoryUpdated",
          "actor": "gerente",
          "conditions": [
            "quantityAvailableChanged"
          ],
          "actions": [],
          "rulesApplied": [
            "inventoryLowStockAlert"
          ]
        },
        {
          "from": "evaluating",
          "to": "alertPublished",
          "trigger": "lowStockDetected",
          "actor": "gerente",
          "conditions": [
            "quantityAvailable <= minimumLevel"
          ],
          "actions": [],
          "rulesApplied": [
            "inventoryLowStockAlert"
          ]
        },
        {
          "from": "evaluating",
          "to": "monitoring",
          "trigger": "stockOk",
          "actor": "gerente",
          "conditions": [
            "quantityAvailable > minimumLevel"
          ],
          "actions": [],
          "rulesApplied": [
            "inventoryLowStockAlert"
          ]
        },
        {
          "from": "alertPublished",
          "to": "monitoring",
          "trigger": "inventoryUpdated",
          "actor": "gerente",
          "conditions": [
            "quantityAvailable > minimumLevel"
          ],
          "actions": [],
          "rulesApplied": [
            "inventoryLowStockAlert"
          ]
        }
      ],
      "requiredEntities": [
        "InventoryItem"
      ],
      "persistenceRefs": [
        "inventoryItem",
        "lowStockMetrics"
      ],
      "usecaseRefs": [],
      "metricRefs": [
        "lowStockMetrics"
      ],
      "userActions": [],
      "relatedPages": [
        "dashboard",
        "gerenciamentoCardapioEstoque"
      ],
      "relatedAgents": [],
      "relatedPlugins": [],
      "rulesApplied": [
        "inventoryLowStockAlert"
      ],
      "implementationSuggestions": [
        {
          "suggestionId": "scheduledStockCheck",
          "title": "Verificação agendada de estoque",
          "priority": "now",
          "description": "Executar uma verificação periódica de estoque no backend para garantir alertas mesmo sem movimentação.",
          "tradeoff": "Aumenta o consumo de recursos em horários de pico por execuções periódicas."
        },
        {
          "suggestionId": "realTimeStockUpdate",
          "title": "Atualização em tempo real após baixa de pedido",
          "priority": "now",
          "description": "Disparar avaliação de estoque imediatamente após movimentações de venda ou ajuste.",
          "tradeoff": "Depende de integração consistente com os eventos de baixa de estoque."
        },
        {
          "suggestionId": "noTaskRequired",
          "title": "Sem criação de tarefa para alerta automático",
          "priority": "later",
          "description": "Manter alertas apenas no dashboard para evitar sobrecarga operacional com tarefas manuais.",
          "tradeoff": "Pode exigir monitoramento ativo do dashboard pelo gerente."
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
          "entity": "InventoryItem"
        }
      ],
      "writesArtifacts": [
        {
          "moduleId": "cafeFlow",
          "artifactType": "workflow",
          "artifactId": "lowStockAlertAutomation"
        }
      ]
    },
    "defsPlan": {
      "fileName": "workflows/lowStockAlertAutomation.defs.ts",
      "exportName": "lowStockAlertAutomationDef",
      "saveAsDefs": true
    }
  }
} as const;

export default lowStockAlertAutomationDef;
