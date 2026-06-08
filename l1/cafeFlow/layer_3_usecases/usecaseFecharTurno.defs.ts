/// <mls fileReference="_102043_/l1/cafeFlow/layer_3_usecases/usecaseFecharTurno.defs.ts" enhancement="_blank"/>

export const usecaseFecharTurnoUsecasePlan = {
  "schemaVersion": "2026-06-06",
  "artifactType": "usecase",
  "artifactId": "usecaseFecharTurno",
  "moduleName": "cafeFlow",
  "status": "draft",
  "source": {
    "agentName": "agentPlanUsecaseEntities",
    "stepId": 60,
    "planId": "plan-index-critic:usecasePlan:1"
  },
  "data": {
    "backendArchitecture": {
      "pattern": "layeredUsecaseDriven",
      "layer1Responsibility": "Definições de tabelas transacionais e de métricas (layer_1_external). Acesso direto apenas por layer_3_usecases.",
      "layer2Responsibility": "Controllers BFF que recebem comandos de páginas, workflows e agentes. Devem sempre delegar para usecases de layer_3.",
      "layer3Responsibility": "Usecases que encapsulam regras de negócio, leitura e escrita em tabelas de layer_1, e atualização de métricas."
    },
    "controllerRules": {
      "bffMustCallUsecases": true,
      "bffDirectTableAccessForbidden": true
    },
    "usecase": {
      "usecaseId": "usecaseFecharTurno",
      "title": "Fechar Turno",
      "purpose": "Consolidar vendas do turno diário e gerar resumo para relatório de fechamento.",
      "actor": "gerente",
      "layer": "layer_3_usecases",
      "inputEntities": [
        "dailyShiftEntity",
        "orderAggregateEntity"
      ],
      "outputEntities": [
        "salesSummaryEntity"
      ],
      "readsTables": [
        {
          "tableName": "DailyShift",
          "ownership": "mdmOwned"
        },
        {
          "tableName": "order_aggregate",
          "ownership": "moduleOwned"
        }
      ],
      "writesTables": [
        {
          "tableName": "sales_summary",
          "ownership": "moduleOwned"
        },
        {
          "tableName": "DailyShift",
          "ownership": "mdmOwned"
        },
        {
          "tableName": "daily_sales_metrics",
          "ownership": "moduleOwned"
        }
      ],
      "commands": [
        "closeDailyShift",
        "generateSalesSummary"
      ],
      "rulesApplied": [
        "rule-shift-close-required"
      ]
    }
  }
} as const;

export default usecaseFecharTurnoUsecasePlan;
