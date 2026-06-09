/// <mls fileReference="_102043_/l1/cafeFlow/layer_3_usecases/usecaseCalcularMetricasDashboard.defs.ts" enhancement="_blank"/>

export const usecaseCalcularMetricasDashboardUsecasePlan = {
  "schemaVersion": "2026-06-06",
  "artifactType": "usecase",
  "artifactId": "usecaseCalcularMetricasDashboard",
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
      "usecaseId": "usecaseCalcularMetricasDashboard",
      "title": "Calcular Métricas do Dashboard",
      "purpose": "Atualizar métricas de vendas diárias e itens mais vendidos para o dashboard do gerente.",
      "actor": "gerente",
      "layer": "layer_3_usecases",
      "inputEntities": [
        "orderAggregateEntity",
        "menuItemEntity"
      ],
      "outputEntities": [],
      "readsTables": [
        {
          "tableName": "order_aggregate",
          "ownership": "moduleOwned"
        },
        {
          "tableName": "MenuItem",
          "ownership": "mdmOwned"
        }
      ],
      "writesTables": [
        {
          "tableName": "daily_sales_metrics",
          "ownership": "moduleOwned"
        },
        {
          "tableName": "top_selling_items_metrics",
          "ownership": "moduleOwned"
        }
      ],
      "commands": [
        "refreshDailySalesMetrics",
        "refreshTopSellingItemsMetrics"
      ],
      "rulesApplied": []
    }
  },
  "implementation": {
    "functionName": "refreshDailySalesMetrics",
    "inputTypeName": "RefreshDailySalesMetricsInput",
    "outputTypeName": "RefreshDailySalesMetricsOutput",
    "inputTypeDefinition": "export interface RefreshDailySalesMetricsInput {\n  metricDate: string; // YYYY-MM-DD\n}",
    "outputTypeDefinition": "export interface RefreshDailySalesMetricsOutput {\n  metricDate: string;\n  totalSales: number;\n  totalOrders: number;\n  updatedAt: string;\n}"
  }
} as const;

export default usecaseCalcularMetricasDashboardUsecasePlan;
