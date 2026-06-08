/// <mls fileReference="_102043_/l1/cafeFlow/layer_3_usecases/usecaseBaixarEstoqueIngredientes.defs.ts" enhancement="_blank"/>

export const usecaseBaixarEstoqueIngredientesUsecasePlan = {
  "schemaVersion": "2026-06-06",
  "artifactType": "usecase",
  "artifactId": "usecaseBaixarEstoqueIngredientes",
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
      "usecaseId": "usecaseBaixarEstoqueIngredientes",
      "title": "Baixa de Estoque por Ingrediente",
      "purpose": "Deduzir estoque de ingredientes com base nos itens do pedido entregue, usando receitas do cardápio.",
      "actor": "cozinha",
      "layer": "layer_3_usecases",
      "inputEntities": [
        "orderAggregateEntity",
        "recipeLineEntity",
        "stockItemEntity"
      ],
      "outputEntities": [
        "stockItemEntity"
      ],
      "readsTables": [
        {
          "tableName": "order_aggregate",
          "ownership": "moduleOwned"
        },
        {
          "tableName": "RecipeLine",
          "ownership": "mdmOwned"
        },
        {
          "tableName": "Ingredient",
          "ownership": "mdmOwned"
        },
        {
          "tableName": "StockItem",
          "ownership": "mdmOwned"
        }
      ],
      "writesTables": [
        {
          "tableName": "StockItem",
          "ownership": "mdmOwned"
        },
        {
          "tableName": "low_stock_metrics",
          "ownership": "moduleOwned"
        }
      ],
      "commands": [
        "deductStockByRecipe"
      ],
      "rulesApplied": [
        "rule-stock-deduct-by-ingredient",
        "rule-low-stock-alert"
      ]
    }
  }
} as const;

export default usecaseBaixarEstoqueIngredientesUsecasePlan;
