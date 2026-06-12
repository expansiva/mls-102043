/// <mls fileReference="_102043_/l4/workflows/inventoryAdjustmentLifecycle.defs.ts" enhancement="_blank"/>

export const inventoryAdjustmentLifecycleDef = {
  "schemaVersion": "2026-06-06",
  "artifactType": "workflow",
  "artifactId": "inventoryAdjustmentLifecycle",
  "moduleName": "cafeFlow",
  "status": "draft",
  "source": {
    "agentName": "agentPlanWorkflowDefinition",
    "stepId": 29,
    "planId": "plan-validate-solution-coverage"
  },
  "data": {
    "workflowDefinition": {
      "workflowId": "inventoryAdjustmentLifecycle",
      "title": "Ciclo de vida do ajuste de estoque",
      "purpose": "Gerenciar solicitações de ajuste de estoque com confirmação do gerente, evitando alterações acidentais no estoque.",
      "executionMode": "entityLifecycle",
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
          "stateId": "pendente",
          "description": "Ajuste registrado aguardando confirmação do gerente."
        },
        {
          "stateId": "confirmado",
          "description": "Ajuste confirmado e aplicado ao item de estoque."
        },
        {
          "stateId": "cancelado",
          "description": "Ajuste cancelado sem impactar o estoque."
        }
      ],
      "transitions": [
        {
          "from": "pendente",
          "to": "pendente",
          "trigger": "criarAjuste",
          "actor": "gerente",
          "conditions": [],
          "actions": [
            "InventoryAdjustment.status=pendente"
          ],
          "rulesApplied": []
        },
        {
          "from": "pendente",
          "to": "confirmado",
          "trigger": "confirmarAjuste",
          "actor": "gerente",
          "conditions": [],
          "actions": [
            "InventoryAdjustment.status=confirmado"
          ],
          "rulesApplied": [
            "inventoryLowStockAlert"
          ]
        },
        {
          "from": "pendente",
          "to": "cancelado",
          "trigger": "cancelarAjuste",
          "actor": "gerente",
          "conditions": [],
          "actions": [
            "InventoryAdjustment.status=cancelado"
          ],
          "rulesApplied": []
        }
      ],
      "requiredEntities": [
        "InventoryAdjustment",
        "InventoryItem"
      ],
      "persistenceRefs": [
        "inventoryAdjustment",
        "inventoryItem"
      ],
      "usecaseRefs": [
        "criarAjusteEstoque",
        "confirmarAjusteEstoque",
        "listarAjustesEstoque"
      ],
      "metricRefs": [],
      "userActions": [
        "criarAjuste",
        "confirmarAjuste",
        "cancelarAjuste",
        "listarAjustes"
      ],
      "relatedPages": [
        "gerenciamentoCardapioEstoque"
      ],
      "relatedAgents": [],
      "relatedPlugins": [],
      "rulesApplied": [],
      "implementationSuggestions": [
        {
          "suggestionId": "pendingAdjustmentReview",
          "title": "Revisão de ajustes pendentes antes de confirmar",
          "priority": "now",
          "description": "Adicionar revisão obrigatória do gerente antes de confirmar para reduzir risco de erros.",
          "tradeoff": "Aumenta o tempo até a aplicação do ajuste."
        },
        {
          "suggestionId": "adjustmentAuditTrail",
          "title": "Rastreamento de auditoria do ajuste",
          "priority": "now",
          "description": "Registrar criador, aprovador e timestamps de confirmação/cancelamento.",
          "tradeoff": "Maior volume de dados e complexidade de relatório."
        },
        {
          "suggestionId": "noTaskWorkflow",
          "title": "Fluxo sem tarefas formais",
          "priority": "now",
          "description": "Sem tarefas porque o gerente executa criação e confirmação no mesmo fluxo operacional; se precisar SLA, considerar criar tarefas de revisão.",
          "tradeoff": "Menos rastreio de pendências com SLA."
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
          "entity": "InventoryAdjustment"
        },
        {
          "moduleId": "cafeFlow",
          "entity": "InventoryItem"
        }
      ],
      "writesArtifacts": [
        {
          "moduleId": "cafeFlow",
          "artifactType": "workflow",
          "artifactId": "inventoryAdjustmentLifecycle"
        }
      ]
    },
    "defsPlan": {
      "fileName": "workflows/inventoryAdjustmentLifecycle.defs.ts",
      "exportName": "inventoryAdjustmentLifecycleDef",
      "saveAsDefs": true
    }
  }
} as const;

export default inventoryAdjustmentLifecycleDef;
