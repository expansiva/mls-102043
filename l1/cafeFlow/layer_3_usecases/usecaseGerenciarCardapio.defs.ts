/// <mls fileReference="_102043_/l1/cafeFlow/layer_3_usecases/usecaseGerenciarCardapio.defs.ts" enhancement="_blank"/>

export const usecaseGerenciarCardapioUsecasePlan = {
  "schemaVersion": "2026-06-06",
  "artifactType": "usecase",
  "artifactId": "usecaseGerenciarCardapio",
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
      "usecaseId": "usecaseGerenciarCardapio",
      "title": "Gerenciar Cardápio e Receitas",
      "purpose": "Criar e editar itens do cardápio com linhas de receita vinculadas para baixa automática de estoque.",
      "actor": "gerente",
      "layer": "layer_3_usecases",
      "inputEntities": [
        "menuItemEntity",
        "recipeLineEntity",
        "ingredientEntity"
      ],
      "outputEntities": [
        "menuItemEntity",
        "recipeLineEntity"
      ],
      "readsTables": [
        {
          "tableName": "MenuItem",
          "ownership": "mdmOwned"
        },
        {
          "tableName": "RecipeLine",
          "ownership": "mdmOwned"
        },
        {
          "tableName": "Ingredient",
          "ownership": "mdmOwned"
        }
      ],
      "writesTables": [
        {
          "tableName": "MenuItem",
          "ownership": "mdmOwned"
        },
        {
          "tableName": "RecipeLine",
          "ownership": "mdmOwned"
        }
      ],
      "commands": [
        "createMenuItem",
        "updateMenuItem",
        "addRecipeLine",
        "removeRecipeLine"
      ],
      "rulesApplied": [
        "rule-menuitem-recipe-required"
      ]
    }
  },
  "implementation": {
    "functionName": "createMenuItem",
    "inputTypeName": "CreateMenuItemInput",
    "outputTypeName": "CreateMenuItemOutput",
    "inputTypeDefinition": "export interface CreateMenuItemInput {\n  name: string;\n  description?: string | null;\n  price: number;\n  isActive?: boolean;\n  recipeLines: RecipeLineInput[];\n}",
    "outputTypeDefinition": "export interface CreateMenuItemOutput {\n  menuItem: MenuItemRecord;\n  recipeLines: RecipeLineRecord[];\n}"
  }
} as const;

export default usecaseGerenciarCardapioUsecasePlan;
