/// <mls fileReference="_102043_/l2/cafeFlow/ontology/MenuItem.defs.ts" enhancement="_blank"/>

export const MenuItemEntityDefinition = {
  "schemaVersion": "2026-06-06",
  "artifactType": "ontologyEntity",
  "artifactId": "MenuItem",
  "moduleName": "cafeFlow",
  "status": "draft",
  "source": {
    "agentName": "agentPlanEntityDefinition",
    "stepId": 38,
    "planId": ""
  },
  "data": {
    "entityDefinition": {
      "entityId": "MenuItem",
      "title": "Item do Cardápio",
      "description": "Produto vendido no POS com preço e vínculo a ingredientes/estoque.",
      "ownership": "mdmOwned",
      "fields": [
        {
          "fieldId": "menuItemId",
          "type": "uuid",
          "required": true,
          "description": "Identificador único do item do cardápio."
        },
        {
          "fieldId": "name",
          "type": "string",
          "required": true,
          "description": "Nome do item exibido no cardápio."
        },
        {
          "fieldId": "description",
          "type": "text",
          "required": false,
          "description": "Descrição detalhada do item."
        },
        {
          "fieldId": "price",
          "type": "money",
          "required": true,
          "description": "Preço de venda do item."
        },
        {
          "fieldId": "menuCategoryId",
          "type": "MenuCategory",
          "required": true,
          "description": "Categoria à qual o item do cardápio pertence."
        },
        {
          "fieldId": "isActive",
          "type": "boolean",
          "required": true,
          "description": "Indica se o item está ativo para venda."
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
      "rulesApplied": []
    }
  }
} as const;

export default MenuItemEntityDefinition;
