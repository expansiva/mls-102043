/// <mls fileReference="_102043_/l4/workflows/aiInsightAutomation.defs.ts" enhancement="_blank"/>

export const aiInsightAutomationDef = {
  "schemaVersion": "2026-06-06",
  "artifactType": "workflow",
  "artifactId": "aiInsightAutomation",
  "moduleName": "cafeFlow",
  "status": "draft",
  "source": {
    "agentName": "agentPlanWorkflowDefinition",
    "stepId": 62,
    "planId": ""
  },
  "data": {
    "workflowDefinition": {
      "workflowId": "aiInsightAutomation",
      "title": "Automação de insights por IA",
      "purpose": "Processar solicitações de resumo e análise de vendas via assistente IA, consumindo métricas consolidadas e gerando respostas assíncronas.",
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
          "stateId": "solicitado",
          "description": "Solicitação criada e aguardando geração do insight."
        },
        {
          "stateId": "gerado",
          "description": "Insight gerado e disponível para consulta."
        },
        {
          "stateId": "falhou",
          "description": "Falha no processamento do insight."
        }
      ],
      "transitions": [
        {
          "from": "solicitado",
          "to": "solicitado",
          "trigger": "solicitacaoCriada",
          "actor": "gerente",
          "conditions": [],
          "actions": [
            "aiInsightRequest.status=solicitado",
            "aiInsightRequest.createdAt=now",
            "aiInsightRequest.updatedAt=now"
          ],
          "rulesApplied": [
            "aiInsightsUseMetrics"
          ]
        },
        {
          "from": "solicitado",
          "to": "gerado",
          "trigger": "insightGerado",
          "actor": "gerente",
          "conditions": [],
          "actions": [
            "aiInsightRequest.status=gerado",
            "aiInsightRequest.updatedAt=now"
          ],
          "rulesApplied": [
            "aiInsightsUseMetrics"
          ]
        },
        {
          "from": "solicitado",
          "to": "falhou",
          "trigger": "insightFalhou",
          "actor": "gerente",
          "conditions": [],
          "actions": [
            "aiInsightRequest.status=falhou",
            "aiInsightRequest.updatedAt=now"
          ],
          "rulesApplied": [
            "aiInsightsUseMetrics"
          ]
        }
      ],
      "requiredEntities": [
        "AiInsightRequest"
      ],
      "persistenceRefs": [
        "aiInsightRequest"
      ],
      "usecaseRefs": [
        "solicitarResumoIa",
        "listarSolicitacoesIa",
        "obterSolicitacaoIa"
      ],
      "metricRefs": [],
      "userActions": [
        "solicitarResumoIa",
        "listarSolicitacoesIa",
        "obterSolicitacaoIa"
      ],
      "relatedPages": [],
      "relatedAgents": [],
      "relatedPlugins": [],
      "rulesApplied": [
        "aiInsightsUseMetrics"
      ],
      "implementationSuggestions": [
        {
          "suggestionId": "asyncAiProcessing",
          "title": "Processamento assíncrono da solicitação IA",
          "priority": "soon",
          "description": "Executar a geração em segundo plano e atualizar o status quando concluir.",
          "tradeoff": "Maior complexidade operacional e necessidade de monitoramento."
        },
        {
          "suggestionId": "metricsCacheForAi",
          "title": "Cache de métricas para consulta da IA",
          "priority": "soon",
          "description": "Cachear métricas consolidadas para reduzir latência no assistente.",
          "tradeoff": "Risco de dados ligeiramente desatualizados e necessidade de invalidação."
        },
        {
          "suggestionId": "noHumanTaskFlow",
          "title": "Sem tarefas humanas no fluxo",
          "priority": "now",
          "description": "Manter o fluxo totalmente automático, exibindo apenas status e resultado para o gerente.",
          "tradeoff": "Menos oportunidades de intervenção manual em falhas; exige bons mecanismos de retry e observabilidade."
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
          "entity": "AiInsightRequest"
        }
      ],
      "writesArtifacts": [
        {
          "moduleId": "cafeFlow",
          "artifactType": "workflow",
          "artifactId": "aiInsightAutomation"
        },
        {
          "moduleId": "cafeFlow",
          "artifactType": "table",
          "artifactId": "aiInsightRequest"
        },
        {
          "moduleId": "cafeFlow",
          "artifactType": "usecase",
          "artifactId": "solicitarResumoIa"
        },
        {
          "moduleId": "cafeFlow",
          "artifactType": "usecase",
          "artifactId": "listarSolicitacoesIa"
        },
        {
          "moduleId": "cafeFlow",
          "artifactType": "usecase",
          "artifactId": "obterSolicitacaoIa"
        }
      ]
    },
    "defsPlan": {
      "fileName": "workflows/aiInsightAutomation.defs.ts",
      "exportName": "aiInsightAutomationDef",
      "saveAsDefs": true
    }
  }
} as const;

export default aiInsightAutomationDef;
