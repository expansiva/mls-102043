/// <mls fileReference="_102043_/l1/cafeFlow/layer_3_usecases/usecaseGerarResumoVendasIA.defs.ts" enhancement="_blank"/>

export const usecaseGerarResumoVendasIAUsecasePlan = {
  "schemaVersion": "2026-06-06",
  "artifactType": "usecase",
  "artifactId": "usecaseGerarResumoVendasIA",
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
      "usecaseId": "usecaseGerarResumoVendasIA",
      "title": "Gerar Resumo de Vendas (IA)",
      "purpose": "Produzir resumo narrativo das vendas do dia para o agente de IA.",
      "actor": "assistenteIA",
      "layer": "layer_3_usecases",
      "inputEntities": [
        "salesSummaryEntity",
        "dailyShiftEntity"
      ],
      "outputEntities": [],
      "readsTables": [
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
      "writesTables": [],
      "commands": [
        "generateSalesNarrative"
      ],
      "rulesApplied": []
    }
  },
  "implementation": {
    "functionName": "generateSalesNarrative",
    "inputTypeName": "GenerateSalesNarrativeInput",
    "outputTypeName": "GenerateSalesNarrativeOutput",
    "inputTypeDefinition": "export interface GenerateSalesNarrativeInput {\n  businessDate?: string;\n  shiftId?: string;\n}",
    "outputTypeDefinition": "export interface GenerateSalesNarrativeOutput {\n  narrative: string;\n  dataPoints: {\n    totalGrossSales: number;\n    totalNetSales: number;\n    totalOrders: number;\n    avgTicket: number;\n    summariesFound: number;\n    metricsFound: number;\n    shiftsFound: number;\n  };\n}"
  }
} as const;

export default usecaseGerarResumoVendasIAUsecasePlan;
