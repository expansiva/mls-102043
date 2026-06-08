/// <mls fileReference="_102043_/l1/cafeFlow/layer_3_usecases/usecaseAjustarEstoque.defs.ts" enhancement="_blank"/>

export const usecaseAjustarEstoqueUsecasePlan = {
  "schemaVersion": "2026-06-06",
  "artifactType": "usecase",
  "artifactId": "usecaseAjustarEstoque",
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
      "usecaseId": "usecaseAjustarEstoque",
      "title": "Ajustar Estoque Manual",
      "purpose": "Registrar ajustes manuais de estoque e nível mínimo para ingredientes, gerando alertas quando necessário.",
      "actor": "gerente",
      "layer": "layer_3_usecases",
      "inputEntities": [
        "stockItemEntity",
        "ingredientEntity"
      ],
      "outputEntities": [
        "stockItemEntity"
      ],
      "readsTables": [
        {
          "tableName": "StockItem",
          "ownership": "mdmOwned"
        },
        {
          "tableName": "Ingredient",
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
        "adjustStockQuantity",
        "setMinStockLevel"
      ],
      "rulesApplied": [
        "rule-low-stock-alert"
      ]
    }
  }
} as const;

export default usecaseAjustarEstoqueUsecasePlan;
