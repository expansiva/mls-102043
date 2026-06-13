/// <mls fileReference="_102043_/l4/workflows/lowStockAlertWorkflow.defs.ts" enhancement="_blank"/>

export const lowStockAlertWorkflowDef = {
  "schemaVersion": "2026-06-06",
  "artifactType": "workflow",
  "artifactId": "lowStockAlertWorkflow",
  "moduleName": "cafeFlow",
  "status": "draft",
  "source": {
    "agentName": "agentPlanWorkflowDefinition",
    "stepId": 29,
    "planId": "plan-validate-solution-coverage"
  },
  "data": {
    "workflowDefinition": {
      "workflowId": "lowStockAlertWorkflow",
      "title": "Workflow de alerta de estoque baixo",
      "purpose": "Monitorar movimentações de estoque e gerar alertas automáticos quando itens atingirem o limite mínimo configurado.",
      "executionMode": "automation",
      "createsTask": true,
      "taskConfig": {
        "taskTitleTemplate": "Verificar alerta de estoque baixo para item {{stockItemId}}",
        "assigneeRules": [
          "gerente"
        ],
        "slaRules": [],
        "taskRoomRequired": false
      },
      "actors": [
        "gerente"
      ],
      "states": [
        {
          "stateId": "monitoring",
          "description": "Monitoramento contínuo das movimentações de estoque."
        },
        {
          "stateId": "alertCreated",
          "description": "Alerta de estoque baixo registrado e ativo."
        }
      ],
      "transitions": [
        {
          "from": "monitoring",
          "to": "alertCreated",
          "trigger": "registrarMovimentacaoEstoque",
          "actor": "gerente",
          "conditions": [
            "lowStockThresholdRule"
          ],
          "actions": [
            "create StockMovement with stockItemId, orderId, movementType, quantity, reason, occurredAt, createdAt, updatedAt",
            "create LowStockAlert with stockItemId, triggeredAt, currentQuantity, minimumQuantity, status=ativo, createdAt, updatedAt"
          ],
          "rulesApplied": [
            "lowStockThresholdRule"
          ]
        }
      ],
      "requiredEntities": [
        "StockMovement",
        "LowStockAlert"
      ],
      "persistenceRefs": [
        "stockMovement",
        "lowStockAlert",
        "lowStockMetrics"
      ],
      "usecaseRefs": [
        "registrarMovimentacaoEstoque",
        "listarMovimentacoesEstoque",
        "listarAlertasEstoqueBaixo"
      ],
      "metricRefs": [
        "lowStockMetrics"
      ],
      "userActions": [],
      "relatedPages": [
        "cardapioEstoque",
        "dashboardGerente"
      ],
      "relatedAgents": [],
      "relatedPlugins": [],
      "rulesApplied": [
        "lowStockThresholdRule"
      ],
      "implementationSuggestions": [
        {
          "suggestionId": "autoAlertOnMovement",
          "title": "Disparar alerta automaticamente após movimentação que cruze o limite",
          "priority": "now",
          "description": "Disparar alerta automaticamente via registrarMovimentacaoEstoque quando a movimentação reduzir o estoque abaixo do mínimo.",
          "tradeoff": "Pode aumentar o volume de alertas em períodos de alta rotatividade."
        },
        {
          "suggestionId": "deduplicateAlerts",
          "title": "Evitar duplicidade de alertas para o mesmo item enquanto não reabastecido",
          "priority": "soon",
          "description": "Antes de criar novo LowStockAlert ativo para o mesmo stockItemId, verificar se já existe alerta ativo e manter um único registro.",
          "tradeoff": "Exige lógica adicional no caso de uso e potencialmente mais consultas."
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
          "entity": "StockMovement"
        },
        {
          "moduleId": "cafeFlow",
          "entity": "LowStockAlert"
        }
      ],
      "writesArtifacts": [
        {
          "moduleId": "cafeFlow",
          "artifactType": "workflow",
          "artifactId": "lowStockAlertWorkflow"
        }
      ]
    },
    "defsPlan": {
      "fileName": "workflows/lowStockAlertWorkflow.defs.ts",
      "exportName": "lowStockAlertWorkflowDef",
      "saveAsDefs": true
    }
  }
} as const;

export default lowStockAlertWorkflowDef;
