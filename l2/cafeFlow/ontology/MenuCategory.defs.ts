/// <mls fileReference="_102043_/l2/cafeFlow/ontology/MenuCategory.defs.ts" enhancement="_blank"/>

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
      "title": "Categoria do Cardápio",
      "description": "Agrupamento de itens do cardápio para navegação rápida no POS.",
      "ownership": "moduleOwned",
      "fields": [
        {
          "fieldId": "menuCategoryId",
          "type": "uuid",
          "required": true,
          "description": "Identificador único da categoria"
        },
        {
          "fieldId": "name",
          "type": "string",
          "required": true,
          "description": "Nome da categoria exibido no POS"
        },
        {
          "fieldId": "description",
          "type": "text",
          "required": false,
          "description": "Descrição opcional da categoria"
        },
        {
          "fieldId": "sortOrder",
          "type": "number",
          "required": false,
          "description": "Ordem de exibição no POS (menor valor aparece primeiro)"
        },
        {
          "fieldId": "color",
          "type": "string",
          "required": false,
          "description": "Cor hexadecimal para identificação visual no POS"
        },
        {
          "fieldId": "isActive",
          "type": "boolean",
          "required": true,
          "description": "Indica se a categoria está ativa e visível no cardápio"
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

export default MenuCategoryEntityDefinition;
