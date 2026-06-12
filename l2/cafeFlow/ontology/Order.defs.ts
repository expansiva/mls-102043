/// <mls fileReference="_102043_/l2/cafeFlow/ontology/Order.defs.ts" enhancement="_blank"/>

export const OrderEntityDefinition = {
  "schemaVersion": "2026-06-06",
  "artifactType": "ontologyEntity",
  "artifactId": "Order",
  "moduleName": "cafeFlow",
  "status": "draft",
  "source": {
    "agentName": "agentPlanEntityDefinition",
    "stepId": 42,
    "planId": ""
  },
  "data": {
    "entityDefinition": {
      "entityId": "Order",
      "title": "Pedido",
      "description": "Compromisso de venda (mesa ou takeout) com itens e status de preparo.",
      "ownership": "moduleOwned",
      "kind": "entity",
      "fields": [
        {
          "fieldId": "orderId",
          "type": "uuid",
          "required": true,
          "description": "Identificador único do pedido."
        },
        {
          "fieldId": "dailyShiftId",
          "type": "DailyShift",
          "required": true,
          "description": "Referência ao turno diário ao qual o pedido pertence."
        },
        {
          "fieldId": "status",
          "type": "string",
          "required": true,
          "description": "Status atual do pedido.",
          "enum": [
            "recebido",
            "preparando",
            "pronto",
            "entregue",
            "cancelado"
          ]
        },
        {
          "fieldId": "serviceType",
          "type": "string",
          "required": true,
          "description": "Tipo de atendimento do pedido (mesa ou takeout).",
          "enum": [
            "mesa",
            "takeout"
          ]
        },
        {
          "fieldId": "tableNumber",
          "type": "string",
          "required": false,
          "description": "Número/identificador da mesa quando o atendimento é em mesa."
        },
        {
          "fieldId": "notes",
          "type": "text",
          "required": false,
          "description": "Observações gerais do pedido."
        },
        {
          "fieldId": "createdAt",
          "type": "datetime",
          "required": true,
          "description": "Data e hora de criação do pedido."
        },
        {
          "fieldId": "updatedAt",
          "type": "datetime",
          "required": true,
          "description": "Data e hora da última atualização do pedido."
        }
      ],
      "statusEnum": [
        "recebido",
        "preparando",
        "pronto",
        "entregue",
        "cancelado"
      ],
      "lifecycleStates": [
        "recebido",
        "preparando",
        "pronto",
        "entregue",
        "cancelado"
      ],
      "rulesApplied": [
        "orderStatusLifecycle",
        "kitchenStatusUpdates",
        "shiftMustBeOpenForOrders",
        "inventoryDecrementPolicy"
      ]
    }
  }
} as const;

export default OrderEntityDefinition;
