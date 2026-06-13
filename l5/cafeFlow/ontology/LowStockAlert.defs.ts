/// <mls fileReference="_102043_/l5/cafeFlow/ontology/LowStockAlert.defs.ts" enhancement="_blank"/>

export const LowStockAlertEntityDefinition = {
  "schemaVersion": "2026-06-06",
  "artifactType": "ontologyEntity",
  "artifactId": "LowStockAlert",
  "moduleName": "cafeFlow",
  "status": "draft",
  "source": {
    "agentName": "agentPlanEntityDefinition",
    "stepId": 40,
    "planId": ""
  },
  "data": {
    "entityDefinition": {
      "entityId": "LowStockAlert",
      "title": "Alerta de Estoque Baixo",
      "description": "Sinalização de itens abaixo do nível mínimo.",
      "ownership": "moduleOwned",
      "kind": "event",
      "fields": [
        {
          "fieldId": "lowStockAlertId",
          "type": "uuid",
          "required": true,
          "description": "Identificador único do alerta de estoque baixo."
        },
        {
          "fieldId": "stockItemId",
          "type": "StockItem",
          "required": true,
          "description": "Item de estoque associado ao alerta."
        },
        {
          "fieldId": "triggeredAt",
          "type": "datetime",
          "required": true,
          "description": "Data e hora em que o alerta foi gerado."
        },
        {
          "fieldId": "currentQuantity",
          "type": "number",
          "required": true,
          "description": "Quantidade atual do item quando o alerta foi gerado."
        },
        {
          "fieldId": "minimumQuantity",
          "type": "number",
          "required": true,
          "description": "Quantidade mínima configurada para o item."
        },
        {
          "fieldId": "status",
          "type": "string",
          "required": true,
          "description": "Situação atual do alerta.",
          "enum": [
            "ativo",
            "resolvido",
            "ignorado"
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
        "ativo",
        "resolvido",
        "ignorado"
      ],
      "lifecycleStates": [
        "ativo",
        "resolvido",
        "ignorado"
      ],
      "rulesApplied": [
        "lowStockThresholdRule"
      ]
    }
  }
} as const;

export default LowStockAlertEntityDefinition;
