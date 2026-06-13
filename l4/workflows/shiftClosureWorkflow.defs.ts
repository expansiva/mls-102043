/// <mls fileReference="_102043_/l4/workflows/shiftClosureWorkflow.defs.ts" enhancement="_blank"/>

export const shiftClosureWorkflowDef = {
  "schemaVersion": "2026-06-06",
  "artifactType": "workflow",
  "artifactId": "shiftClosureWorkflow",
  "moduleName": "cafeFlow",
  "status": "draft",
  "source": {
    "agentName": "agentPlanWorkflowDefinition",
    "stepId": 29,
    "planId": "plan-validate-solution-coverage"
  },
  "data": {
    "workflowDefinition": {
      "workflowId": "shiftClosureWorkflow",
      "title": "Workflow de fechamento de turno",
      "purpose": "Gerenciar o ciclo de vida do turno diário, garantindo que todos os pedidos estejam finalizados antes do fechamento e gerando o relatório consolidado.",
      "executionMode": "entityLifecycle",
      "createsTask": true,
      "taskConfig": {
        "taskTitleTemplate": "Revisar fechamento do turno {{shiftId}}",
        "assigneeRules": [
          "gerente"
        ],
        "slaRules": [
          "reviewWithin4h"
        ],
        "taskRoomRequired": true
      },
      "actors": [
        "gerente"
      ],
      "states": [
        {
          "stateId": "aberto",
          "description": "Turno aberto para operação diária."
        },
        {
          "stateId": "emFechamento",
          "description": "Turno em processo de conferência e validação para fechamento."
        },
        {
          "stateId": "fechado",
          "description": "Turno fechado e consolidado com relatório gerado."
        }
      ],
      "transitions": [
        {
          "from": "aberto",
          "to": "emFechamento",
          "trigger": "iniciarFechamento",
          "actor": "gerente",
          "conditions": [],
          "actions": [
            "setShift.status=emFechamento",
            "setShift.updatedAt=now"
          ],
          "rulesApplied": []
        },
        {
          "from": "emFechamento",
          "to": "fechado",
          "trigger": "confirmarFechamento",
          "actor": "gerente",
          "conditions": [
            "shiftHasNoOpenOrders"
          ],
          "actions": [
            "setShift.status=fechado",
            "setShift.closedAt=now",
            "setShift.updatedAt=now"
          ],
          "rulesApplied": [
            "shiftClosureRequiresNoOpenOrders"
          ]
        }
      ],
      "requiredEntities": [
        "Shift",
        "ShiftReport"
      ],
      "persistenceRefs": [
        "shift",
        "shiftReport",
        "dailySalesMetrics"
      ],
      "usecaseRefs": [
        "abrirTurno",
        "fecharTurno",
        "listarTurnos",
        "obterRelatorioTurno"
      ],
      "metricRefs": [
        "dailySalesMetrics"
      ],
      "userActions": [
        "iniciarFechamento",
        "confirmarFechamento",
        "consultarRelatorioTurno"
      ],
      "relatedPages": [
        "fechamentoTurno"
      ],
      "relatedAgents": [],
      "relatedPlugins": [],
      "rulesApplied": [
        "shiftClosureRequiresNoOpenOrders"
      ],
      "implementationSuggestions": [
        {
          "suggestionId": "blockClosureOpenOrders",
          "title": "Bloquear transição para 'fechado' se houver pedidos abertos",
          "priority": "now",
          "description": "Aplicar a regra shiftClosureRequiresNoOpenOrders no caso de uso fecharTurno para impedir fechamento com pedidos em aberto.",
          "tradeoff": "Pode exigir uma etapa adicional de resolução de pendências, aumentando o tempo de fechamento."
        },
        {
          "suggestionId": "generateReportOnClosure",
          "title": "Gerar ShiftReport automaticamente ao concluir o fechamento",
          "priority": "now",
          "description": "No caso de uso fecharTurno, criar o ShiftReport e consolidar os totais do turno ao final da transição.",
          "tradeoff": "Aumenta o tempo de execução do fechamento devido à consolidação."
        },
        {
          "suggestionId": "taskReviewOnClosure",
          "title": "Criar tarefa de revisão para o gerente ao iniciar 'emFechamento'",
          "priority": "now",
          "description": "Ao disparar iniciarFechamento, criar uma tarefa de revisão vinculada ao turno para conferência final.",
          "tradeoff": "Introduz dependência de tarefas e pode atrasar o fechamento caso não seja cumprida."
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
          "entity": "Shift"
        },
        {
          "moduleId": "cafeFlow",
          "entity": "ShiftReport"
        }
      ],
      "writesArtifacts": [
        {
          "moduleId": "cafeFlow",
          "artifactType": "workflow",
          "artifactId": "shiftClosureWorkflow"
        }
      ]
    },
    "defsPlan": {
      "fileName": "workflows/shiftClosureWorkflow.defs.ts",
      "exportName": "shiftClosureWorkflowDef",
      "saveAsDefs": true
    }
  }
} as const;

export default shiftClosureWorkflowDef;
