/// <mls fileReference="_102043_/l5/menuItem/module.defs.ts" enhancement="_blank"/>

export const menuItemMdmModulePlan = {
  "schemaVersion": "2026-06-06",
  "artifactType": "mdmDomain",
  "artifactId": "menuItem",
  "moduleName": "menuItem",
  "status": "draft",
  "source": {
    "agentName": "agentPlanMDM",
    "stepId": 12,
    "planId": "plan-mdm"
  },
  "data": {
    "kind": "mdm",
    "moduleId": "menuItem",
    "domainId": "menuItem",
    "plannedByModule": "cafeFlow",
    "referencesExisting": false,
    "domain": {
      "domainId": "menuItem",
      "title": "Item do Cardápio",
      "masterEntities": [
        "MenuItem",
        "RecipeLine"
      ],
      "sourceOfTruth": "usecaseGerenciarCardapio",
      "consumers": [
        "OrderItem",
        "KitchenTicket",
        "PromotionSuggestion",
        "metricTableItensMaisVendidos",
        "workflowPedidoPos",
        "posRapido",
        "painelCozinha",
        "usecaseCriarPedido",
        "usecaseAtualizarStatusPedido",
        "usecaseBaixarEstoqueIngredientes",
        "agenteSugestoesPromocao"
      ],
      "governanceRules": [
        "rule-menuitem-recipe-required"
      ]
    }
  }
} as const;

export default menuItemMdmModulePlan;
