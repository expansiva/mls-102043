/// <mls fileReference="_102043_/l5/cafeFlow/ontology/MenuCategory.defs.ts" enhancement="_blank"/>

export const MenuCategoryEntityDefinition = {
  "schemaVersion": "2026-06-06",
  "artifactType": "ontologyEntity",
  "artifactId": "MenuCategory",
  "moduleName": "cafeFlow",
  "status": "draft",
  "source": {
    "agentName": "agentPlanEntityDefinition",
    "stepId": 39,
    "planId": ""
  },
  "data": {
    "entityDefinition": {
      "entityId": "MenuCategory",
      "title": "Categoria de Cardápio",
      "description": "Agrupamento de itens do cardápio para organização e filtros.",
      "ownership": "mdmOwned",
      "fields": [
        {
          "fieldId": "menuCategoryId",
          "type": "uuid",
          "required": true,
          "description": "Identificador único da categoria de cardápio."
        },
        {
          "fieldId": "name",
          "type": "string",
          "required": true,
          "description": "Nome da categoria exibido no cardápio e filtros."
        },
        {
          "fieldId": "description",
          "type": "text",
          "required": false,
          "description": "Descrição opcional da categoria."
        },
        {
          "fieldId": "status",
          "type": "string",
          "required": true,
          "description": "Estado da categoria para uso no cardápio.",
          "enum": [
            "ativa",
            "inativa"
          ]
        },
        {
          "fieldId": "createdAt",
          "type": "datetime",
          "required": true,
          "description": "Data e hora de criação do registro."
        },
        {
          "fieldId": "updatedAt",
          "type": "datetime",
          "required": true,
          "description": "Data e hora da última atualização do registro."
        }
      ],
      "statusEnum": [
        "ativa",
        "inativa"
      ],
      "rulesApplied": [
        "menuItemRequiresCategory"
      ]
    }
  }
} as const;

export default MenuCategoryEntityDefinition;
