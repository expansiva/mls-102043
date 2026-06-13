/// <mls fileReference="_102043_/l5/cafeFlow/ontology/MenuItem.defs.ts" enhancement="_blank"/>

export const MenuItemEntityDefinition = {
  "schemaVersion": "2026-06-06",
  "artifactType": "ontologyEntity",
  "artifactId": "MenuItem",
  "moduleName": "cafeFlow",
  "status": "incomplete",
  "source": {
    "agentName": "agentPlanEntityDefinition",
    "stepId": 38,
    "planId": ""
  },
  "data": {
    "entityDefinition": {
      "entityId": "MenuItem",
      "title": "Item do Cardápio",
      "description": "Produto vendido no POS com preço, categoria e vínculo de ingredientes.",
      "ownership": "mdmOwned",
      "kind": "master",
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
          "description": "Nome do item do cardápio."
        },
        {
          "fieldId": "description",
          "type": "text",
          "required": false,
          "description": "Descrição do item do cardápio."
        },
        {
          "fieldId": "price",
          "type": "money",
          "required": true,
          "description": "Preço de venda do item do cardápio."
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
          "description": "Indica se o item do cardápio está ativo para venda."
        },
        {
          "fieldId": "createdAt",
          "type": "datetime",
          "required": true,
          "description": "Data e hora de criação do item do cardápio."
        },
        {
          "fieldId": "updatedAt",
          "type": "datetime",
          "required": true,
          "description": "Data e hora da última atualização do item do cardápio."
        }
      ],
      "rulesApplied": [
        "menuItemRequiresCategory"
      ]
    },
    "pendingQuestions": [
      "Como devemos modelar o relacionamento many-to-many entre MenuItem e StockItem: existe uma entidade de junção (por exemplo, MenuItemStockItem) ou devemos usar um campo multi-valor (array) de referências? Caso exista a entidade de junção, qual é o entityId correto?",
      "Existe algum status/lifecycle específico para MenuItem além de isActive (por exemplo, rascunho/ativo/inativo)?"
    ]
  }
} as const;

export default MenuItemEntityDefinition;
