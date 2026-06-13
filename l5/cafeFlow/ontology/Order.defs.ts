/// <mls fileReference="_102043_/l5/cafeFlow/ontology/Order.defs.ts" enhancement="_blank"/>

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
      "description": "Compromisso de venda para mesa ou takeout com itens e status.",
      "ownership": "moduleOwned",
      "fields": [
        {
          "fieldId": "orderId",
          "type": "uuid",
          "required": true,
          "description": "Identificador único do pedido."
        },
        {
          "fieldId": "status",
          "type": "string",
          "required": true,
          "description": "Status atual do pedido.",
          "enum": [
            "recebido",
            "emPreparo",
            "pronto",
            "entregue",
            "cancelado"
          ]
        },
        {
          "fieldId": "shiftId",
          "type": "Shift",
          "required": true,
          "description": "Turno em que o pedido foi registrado."
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
        "emPreparo",
        "pronto",
        "entregue",
        "cancelado"
      ],
      "rulesApplied": [
        "orderStatusTransition",
        "orderRequiresItem",
        "shiftClosureRequiresNoOpenOrders"
      ]
    }
  }
} as const;

export default OrderEntityDefinition;
