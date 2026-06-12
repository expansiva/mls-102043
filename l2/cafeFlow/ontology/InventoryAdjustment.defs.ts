/// <mls fileReference="_102043_/l2/cafeFlow/ontology/InventoryAdjustment.defs.ts" enhancement="_blank"/>

export const InventoryAdjustmentEntityDefinition = {
  "schemaVersion": "2026-06-06",
  "artifactType": "ontologyEntity",
  "artifactId": "InventoryAdjustment",
  "moduleName": "cafeFlow",
  "status": "draft",
  "source": {
    "agentName": "agentPlanEntityDefinition",
    "stepId": 38,
    "planId": ""
  },
  "data": {
    "entityDefinition": {
      "entityId": "InventoryAdjustment",
      "title": "Ajuste de Estoque",
      "description": "Registro operacional de baixa ou ajuste de estoque manual.",
      "ownership": "moduleOwned",
      "kind": "entity",
      "fields": [
        {
          "fieldId": "inventoryAdjustmentId",
          "type": "uuid",
          "required": true,
          "description": "Identificador único do ajuste de estoque."
        },
        {
          "fieldId": "inventoryItemId",
          "type": "InventoryItem",
          "required": true,
          "description": "Item de estoque ao qual o ajuste se aplica."
        },
        {
          "fieldId": "status",
          "type": "string",
          "required": true,
          "description": "Status do ajuste de estoque.",
          "enum": [
            "pendente",
            "confirmado",
            "cancelado"
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
        "pendente",
        "confirmado",
        "cancelado"
      ],
      "rulesApplied": []
    }
  }
} as const;

export default InventoryAdjustmentEntityDefinition;
