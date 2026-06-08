/// <mls fileReference="_102043_/l5/ingredient/module.defs.ts" enhancement="_blank"/>

export const ingredientMdmModulePlan = {
  "schemaVersion": "2026-06-06",
  "artifactType": "mdmDomain",
  "artifactId": "ingredient",
  "moduleName": "ingredient",
  "status": "draft",
  "source": {
    "agentName": "agentPlanMDM",
    "stepId": 12,
    "planId": "plan-mdm"
  },
  "data": {
    "kind": "mdm",
    "moduleId": "ingredient",
    "domainId": "ingredient",
    "plannedByModule": "cafeFlow",
    "referencesExisting": false,
    "domain": {
      "domainId": "ingredient",
      "title": "Ingrediente e Estoque",
      "masterEntities": [
        "Ingredient",
        "StockItem"
      ],
      "sourceOfTruth": "usecaseAjustarEstoque",
      "consumers": [
        "RecipeLine",
        "Order",
        "OrderItem",
        "metricTableEstoqueBaixo",
        "dashboardVendas",
        "painelCozinha",
        "usecaseBaixarEstoqueIngredientes",
        "usecaseCalcularMetricasDashboard",
        "workflowStatusCozinha",
        "gestaoCardapioEstoque"
      ],
      "governanceRules": [
        "rule-low-stock-alert",
        "rule-stock-deduct-by-ingredient"
      ]
    }
  }
} as const;

export default ingredientMdmModulePlan;
