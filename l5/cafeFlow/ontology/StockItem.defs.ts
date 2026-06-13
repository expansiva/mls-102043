/// <mls fileReference="_102043_/l5/cafeFlow/ontology/StockItem.defs.ts" enhancement="_blank"/>

export const StockItemEntityDefinition = {
  "schemaVersion": "2026-06-06",
  "artifactType": "ontologyEntity",
  "artifactId": "StockItem",
  "moduleName": "cafeFlow",
  "status": "draft",
  "source": {
    "agentName": "agentPlanEntityDefinition",
    "stepId": 40,
    "planId": ""
  },
  "data": {
    "entityDefinition": {
      "entityId": "StockItem",
      "title": "Item de Estoque",
      "description": "Insumo controlado com unidade e nível mínimo.",
      "ownership": "mdmOwned",
      "fields": [
        {
          "fieldId": "stockItemId",
          "type": "uuid",
          "required": true,
          "description": "Identificador único do item de estoque."
        },
        {
          "fieldId": "name",
          "type": "string",
          "required": true,
          "description": "Nome do insumo em estoque."
        },
        {
          "fieldId": "description",
          "type": "text",
          "required": false,
          "description": "Descrição detalhada do insumo."
        },
        {
          "fieldId": "unitOfMeasureId",
          "type": "UnitOfMeasure",
          "required": true,
          "description": "Unidade de medida padronizada usada para o item."
        },
        {
          "fieldId": "currentQuantity",
          "type": "number",
          "required": true,
          "description": "Quantidade atual disponível em estoque."
        },
        {
          "fieldId": "minimumQuantity",
          "type": "number",
          "required": true,
          "description": "Nível mínimo de estoque para disparo de alerta."
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
        "lowStockThresholdRule"
      ]
    }
  }
} as const;

export default StockItemEntityDefinition;
