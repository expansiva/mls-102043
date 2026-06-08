/// <mls fileReference="_102043_/l4/workflows/dailyShiftClose.defs.ts" enhancement="_blank"/>

export const dailyShiftCloseDef = {
  "schemaVersion": "2026-06-06",
  "artifactType": "workflow",
  "artifactId": "dailyShiftClose",
  "moduleName": "cafeFlow",
  "status": "draft",
  "source": {
    "agentName": "agentPlanWorkflowDefinition",
    "stepId": 75,
    "planId": ""
  },
  "data": {
    "workflowDefinition": {
      "workflowId": "dailyShiftClose",
      "title": "Fechamento de Turno Diário",
      "purpose": "Consolidar as vendas do período, gerar o resumo de vendas e concluir o turno diário com totalizadores e auditoria.",
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
          "stateId": "shiftOpen",
          "description": "Turno diário aberto e elegível para fechamento."
        },
        {
          "stateId": "shiftClosed",
          "description": "Turno diário fechado com resumo de vendas gerado."
        }
      ],
      "transitions": [
        {
          "from": "shiftOpen",
          "to": "shiftClosed",
          "trigger": "confirmShiftClose",
          "actor": "gerente",
          "conditions": [
            "rule-shift-close-required"
          ],
          "actions": [
            "set SalesSummary.status=fechado",
            "set SalesSummary.period_end_at=now",
            "set SalesSummary.updated_at=now"
          ],
          "rulesApplied": [
            "rule-shift-close-required"
          ]
        }
      ],
      "requiredEntities": [
        "DailyShift",
        "SalesSummary"
      ],
      "persistenceRefs": [
        "salesSummary"
      ],
      "usecaseRefs": [
        "usecaseFecharTurno"
      ],
      "metricRefs": [
        "dailySalesMetrics"
      ],
      "userActions": [
        "confirmarFechamentoTurno"
      ],
      "relatedPages": [],
      "relatedAgents": [],
      "relatedPlugins": [],
      "rulesApplied": [
        "rule-shift-close-required"
      ],
      "implementationSuggestions": [
        {
          "suggestionId": "suggShiftCloseConfirmation",
          "title": "Confirmação com totalizadores antes de fechar",
          "priority": "now",
          "description": "Exibir resumo dos totalizadores do turno para conferência do gerente antes da confirmação final.",
          "tradeoff": "Pode adicionar uma etapa extra e alguns segundos ao fluxo de fechamento."
        },
        {
          "suggestionId": "suggShiftReopenAudit",
          "title": "Auditoria de reabertura de turno",
          "priority": "later",
          "description": "Permitir reabertura apenas com justificativa registrada para fins de auditoria.",
          "tradeoff": "Requer trilha de auditoria e governança adicional."
        },
        {
          "suggestionId": "suggNoTaskNeeded",
          "title": "Sem tarefa dedicada para fechamento",
          "priority": "now",
          "description": "O fechamento é realizado em fluxo direto pelo gerente, sem criação de tarefa paralela.",
          "tradeoff": "Menos rastreabilidade de pendências, porém mais agilidade operacional."
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
          "entity": "SalesSummary"
        },
        {
          "moduleId": "cafeFlow",
          "entity": "DailyShift"
        }
      ],
      "writesArtifacts": [
        {
          "moduleId": "cafeFlow",
          "artifactType": "workflow",
          "artifactId": "dailyShiftClose"
        }
      ]
    },
    "defsPlan": {
      "fileName": "workflows/dailyShiftClose.defs.ts",
      "exportName": "dailyShiftCloseDef",
      "saveAsDefs": true
    }
  }
} as const;

export default dailyShiftCloseDef;
