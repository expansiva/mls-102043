/// <mls fileReference="_102043_/l2/cafeFlow/ontology/MenuItemIngredient.defs.ts" enhancement="_blank"/>

export const MenuItemIngredientEntityDefinition = {
  "schemaVersion": "2026-06-06",
  "artifactType": "ontologyEntity",
  "artifactId": "MenuItemIngredient",
  "moduleName": "cafeFlow",
  "status": "draft",
  "source": {
    "agentName": "agentPlanEntityDefinition",
    "stepId": 41,
    "planId": ""
  },
  "data": {
    "entityDefinition": {
      "entityId": "MenuItemIngredient",
      "title": "Ingrediente do Item do Cardápio",
      "description": "Vínculo entre item do cardápio e itens de estoque para controle de ingredientes.",
      "ownership": "moduleOwned",
      "fields": [
        {
          "fieldId": "id",
          "type": "uuid",
          "required": true,
          "description": "Identificador único do vínculo ingrediente-cardápio"
        },
        {
          "fieldId": "menuItemId",
          "type": "MenuItem",
          "required": true,
          "description": "Referência ao item do cardápio"
        },
        {
          "fieldId": "inventoryItemId",
          "type": "InventoryItem",
          "required": true,
          "description": "Referência ao item de estoque utilizado como ingrediente"
        },
        {
          "fieldId": "quantity",
          "type": "number",
          "required": true,
          "description": "Quantidade necessária do ingrediente para o preparo do item"
        },
        {
          "fieldId": "unit",
          "type": "string",
          "required": true,
          "description": "Unidade de medida (ex: g, ml, unidade, colher)"
        },
        {
          "fieldId": "isOptional",
          "type": "boolean",
          "required": true,
          "description": "Indica se o ingrediente é opcional ou pode ser removido do item"
        },
        {
          "fieldId": "createdAt",
          "type": "datetime",
          "required": true,
          "description": "Data e hora de criação do registro"
        },
        {
          "fieldId": "updatedAt",
          "type": "datetime",
          "required": true,
          "description": "Data e hora da última atualização do registro"
        }
      ],
      "rulesApplied": []
    }
  }
} as const;

export default MenuItemIngredientEntityDefinition;
