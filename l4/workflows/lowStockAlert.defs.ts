/// <mls fileReference="_102043_/l4/workflows/lowStockAlert.defs.ts" enhancement="_blank"/>

export const lowStockAlertDef = {
  "schemaVersion": "2026-06-06",
  "artifactType": "workflow",
  "artifactId": "lowStockAlert",
  "moduleName": "cafeFlow",
  "status": "draft",
  "source": {
    "agentName": "agentPlanWorkflowDefinition",
    "stepId": 77,
    "planId": ""
  },
  "data": {
    "workflowDefinition": {
      "workflowId": "lowStockAlert",
      "title": "Automação de Alerta de Estoque Baixo",
      "purpose": "Monitorar periodicamente os níveis de estoque e gerar alertas operacionais quando ingredientes estiverem abaixo do nível mínimo configurado.",
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
          "stateId": "scheduledCheck",
          "description": "A verificação automática de estoque está agendada para executar."
        },
        {
          "stateId": "lowStockDetected",
          "description": "Foram encontrados ingredientes com estoque abaixo do nível mínimo e o alerta foi registrado para o dashboard."
        },
        {
          "stateId": "noLowStock",
          "description": "Nenhum ingrediente abaixo do nível mínimo foi encontrado na verificação."
        }
      ],
      "transitions": [
        {
          "from": "scheduledCheck",
          "to": "lowStockDetected",
          "trigger": "scheduledScan",
          "actor": "gerente",
          "conditions": [
            "rule-low-stock-alert"
          ],
          "actions": [],
          "rulesApplied": [
            "rule-low-stock-alert"
          ]
        },
        {
          "from": "scheduledCheck",
          "to": "noLowStock",
          "trigger": "scheduledScan",
          "actor": "gerente",
          "conditions": [],
          "actions": [],
          "rulesApplied": []
        }
      ],
      "requiredEntities": [
        "StockItem",
        "Ingredient"
      ],
      "persistenceRefs": [],
      "usecaseRefs": [],
      "metricRefs": [
        "lowStockMetrics"
      ],
      "userActions": [],
      "relatedPages": [],
      "relatedAgents": [],
      "relatedPlugins": [],
      "rulesApplied": [
        "rule-low-stock-alert"
      ],
      "implementationSuggestions": [
        {
          "suggestionId": "suggStockDashboardBadge",
          "title": "Badge de alerta no dashboard operacional",
          "priority": "now",
          "description": "O alerta deve ser exibido em destaque no dashboard do gerente para ação imediata.",
          "tradeoff": "Sem badge destacado, o gerente pode perder alertas críticos em horários de pico."
        },
        {
          "suggestionId": "suggStockPushNotification",
          "title": "Notificação push para o gerente",
          "priority": "soon",
          "description": "Garantir que o gerente seja notificado fora da aplicação quando o estoque estiver crítico.",
          "tradeoff": "Notificações fora da aplicação exigem integração com serviço push e podem aumentar custos."
        },
        {
          "suggestionId": "suggNoTaskNeeded",
          "title": "Manter alerta sem criação de tarefas",
          "priority": "now",
          "description": "Como o alerta é operacional e imediato, ele deve aparecer no dashboard e nas notificações sem criar tarefas formais, reduzindo ruído e burocracia.",
          "tradeoff": "Sem tarefas, não há rastreio formal de resolução do alerta."
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
          "entity": "StockItem"
        },
        {
          "moduleId": "cafeFlow",
          "entity": "Ingredient"
        }
      ],
      "writesArtifacts": [
        {
          "moduleId": "cafeFlow",
          "artifactType": "workflow",
          "artifactId": "lowStockAlert"
        },
        {
          "moduleId": "cafeFlow",
          "artifactType": "metricTable",
          "artifactId": "lowStockMetrics"
        }
      ]
    },
    "defsPlan": {
      "fileName": "workflows/lowStockAlert.defs.ts",
      "exportName": "lowStockAlertDef",
      "saveAsDefs": true
    }
  }
} as const;

export default lowStockAlertDef;
