/// <mls fileReference="_102043_/l2/cafeFlow/ontology/InventoryItem.defs.ts" enhancement="_blank"/>

export const InventoryItemEntityDefinition = {
  "schemaVersion": "2026-06-06",
  "artifactType": "ontologyEntity",
  "artifactId": "InventoryItem",
  "moduleName": "cafeFlow",
  "status": "draft",
  "source": {
    "agentName": "agentPlanEntityDefinition",
    "stepId": 40,
    "planId": ""
  },
  "data": {
    "entityDefinition": {
      "entityId": "InventoryItem",
      "title": "Item de Estoque",
      "description": "Insumo ou item de estoque com nível mínimo e quantidade disponível.",
      "ownership": "moduleOwned",
      "fields": [
        {
          "fieldId": "inventoryItemId",
          "type": "uuid",
          "required": true,
          "description": "Identificador único do item de estoque."
        },
        {
          "fieldId": "name",
          "type": "string",
          "required": true,
          "description": "Nome do insumo ou item de estoque."
        },
        {
          "fieldId": "quantityAvailable",
          "type": "number",
          "required": true,
          "description": "Quantidade disponível em estoque."
        },
        {
          "fieldId": "minimumLevel",
          "type": "number",
          "required": true,
          "description": "Nível mínimo aceitável para o estoque."
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
      "rulesApplied": [
        "inventoryLowStockAlert",
        "inventoryDecrementPolicy"
      ]
    }
  }
} as const;

export default InventoryItemEntityDefinition;
