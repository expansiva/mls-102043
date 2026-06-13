/// <mls fileReference="_102043_/l4/workflows/salesSummaryWorkflow.defs.ts" enhancement="_blank"/>

export const salesSummaryWorkflowDef = {
  "schemaVersion": "2026-06-06",
  "artifactType": "workflow",
  "artifactId": "salesSummaryWorkflow",
  "moduleName": "cafeFlow",
  "status": "draft",
  "source": {
    "agentName": "agentPlanWorkflowDefinition",
    "stepId": 57,
    "planId": ""
  },
  "data": {
    "workflowDefinition": {
      "workflowId": "salesSummaryWorkflow",
      "title": "Workflow de solicitação de resumo de vendas",
      "purpose": "Coordenar a solicitação do gerente, processamento assíncrono pelo assistente de IA e entrega do resumo de vendas.",
      "executionMode": "taskWorkflow",
      "createsTask": true,
      "taskConfig": {
        "taskTitleTemplate": "Resumo de vendas solicitado para o turno {{shiftReportId}}",
        "assigneeRules": [
          "gerente"
        ],
        "slaRules": [
          "responderEm24h"
        ],
        "taskRoomRequired": false
      },
      "actors": [
        "gerente"
      ],
      "states": [
        {
          "stateId": "requested",
          "description": "Solicitação registrada e pronta para processamento."
        },
        {
          "stateId": "processing",
          "description": "Resumo sendo processado de forma assíncrona."
        },
        {
          "stateId": "completed",
          "description": "Resumo pronto para consulta."
        },
        {
          "stateId": "failed",
          "description": "Falha ao processar o resumo."
        }
      ],
      "transitions": [
        {
          "from": "requested",
          "to": "processing",
          "trigger": "startProcessing",
          "actor": "gerente",
          "conditions": [],
          "actions": [
            "set SalesSummaryRequest.updatedAt = now()"
          ],
          "rulesApplied": [
            "salesSummaryUsesLast7Days"
          ]
        },
        {
          "from": "processing",
          "to": "completed",
          "trigger": "finalizeSummary",
          "actor": "gerente",
          "conditions": [],
          "actions": [
            "set SalesSummaryRequest.updatedAt = now()"
          ],
          "rulesApplied": [
            "salesSummaryUsesLast7Days"
          ]
        },
        {
          "from": "processing",
          "to": "failed",
          "trigger": "markFailed",
          "actor": "gerente",
          "conditions": [],
          "actions": [
            "set SalesSummaryRequest.updatedAt = now()"
          ],
          "rulesApplied": []
        }
      ],
      "requiredEntities": [
        "SalesSummaryRequest"
      ],
      "persistenceRefs": [
        "salesSummaryRequest"
      ],
      "usecaseRefs": [
        "solicitarResumoVendasDia",
        "listarSolicitacoesResumoVendas"
      ],
      "metricRefs": [],
      "userActions": [
        "solicitarResumoVendas",
        "acompanharStatusResumo"
      ],
      "relatedPages": [],
      "relatedAgents": [],
      "relatedPlugins": [],
      "rulesApplied": [
        "salesSummaryUsesLast7Days"
      ],
      "implementationSuggestions": [
        {
          "suggestionId": "asyncProcessing",
          "title": "Processar solicitação de forma assíncrona via plugin de LLM",
          "priority": "soon",
          "description": "Executar a geração do resumo em job assíncrono para evitar bloqueio da interface do gerente.",
          "tradeoff": "Aumenta complexidade operacional e demanda orquestração de status."
        },
        {
          "suggestionId": "notifyOnComplete",
          "title": "Notificar gerente quando o resumo estiver pronto",
          "priority": "soon",
          "description": "Disparar notificação quando o processamento for concluído para reduzir polling.",
          "tradeoff": "Requer canal de notificação e controle de preferências."
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
          "entity": "SalesSummaryRequest"
        }
      ],
      "writesArtifacts": [
        {
          "moduleId": "cafeFlow",
          "artifactType": "workflow",
          "artifactId": "salesSummaryWorkflow"
        }
      ]
    },
    "defsPlan": {
      "fileName": "workflows/salesSummaryWorkflow.defs.ts",
      "exportName": "salesSummaryWorkflowDef",
      "saveAsDefs": true
    }
  }
} as const;

export default salesSummaryWorkflowDef;
