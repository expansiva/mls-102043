/// <mls fileReference="_102043_/l5/cafeFlow/ontology/StockMovement.defs.ts" enhancement="_blank"/>

export const StockMovementEntityDefinition = {
  "schemaVersion": "2026-06-06",
  "artifactType": "ontologyEntity",
  "artifactId": "StockMovement",
  "moduleName": "cafeFlow",
  "status": "draft",
  "source": {
    "agentName": "agentPlanEntityDefinition",
    "stepId": 39,
    "planId": ""
  },
  "data": {
    "entityDefinition": {
      "entityId": "StockMovement",
      "title": "Movimentação de Estoque",
      "description": "Entrada, saída e ajuste de estoque vinculado a itens e pedidos.",
      "ownership": "moduleOwned",
      "fields": [
        {
          "fieldId": "stockMovementId",
          "type": "uuid",
          "required": true,
          "description": "Identificador único da movimentação de estoque."
        },
        {
          "fieldId": "stockItemId",
          "type": "StockItem",
          "required": true,
          "description": "Item de estoque associado à movimentação."
        },
        {
          "fieldId": "orderId",
          "type": "Order",
          "required": false,
          "description": "Pedido vinculado à saída de estoque, quando aplicável."
        },
        {
          "fieldId": "movementType",
          "type": "string",
          "required": true,
          "description": "Tipo de movimentação realizada.",
          "enum": [
            "entrada",
            "saida",
            "ajuste"
          ]
        },
        {
          "fieldId": "quantity",
          "type": "number",
          "required": true,
          "description": "Quantidade movimentada do item de estoque."
        },
        {
          "fieldId": "reason",
          "type": "text",
          "required": false,
          "description": "Motivo ou observação da movimentação, especialmente para ajustes."
        },
        {
          "fieldId": "occurredAt",
          "type": "datetime",
          "required": true,
          "description": "Data e hora em que a movimentação ocorreu."
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

export default StockMovementEntityDefinition;
