/// <mls fileReference="_102043_/l5/cafeFlow/ontology/OrderStatusHistory.defs.ts" enhancement="_blank"/>

export const OrderStatusHistoryEntityDefinition = {
  "schemaVersion": "2026-06-06",
  "artifactType": "ontologyEntity",
  "artifactId": "OrderStatusHistory",
  "moduleName": "cafeFlow",
  "status": "draft",
  "source": {
    "agentName": "agentPlanEntityDefinition",
    "stepId": 40,
    "planId": ""
  },
  "data": {
    "entityDefinition": {
      "entityId": "OrderStatusHistory",
      "title": "Histórico de Status do Pedido",
      "description": "Registro de transições de status para rastreio de cozinha.",
      "ownership": "moduleOwned",
      "fields": [
        {
          "fieldId": "orderStatusHistoryId",
          "type": "uuid",
          "required": true,
          "description": "Identificador único do histórico de status do pedido."
        },
        {
          "fieldId": "orderId",
          "type": "Order",
          "required": true,
          "description": "Referência ao pedido relacionado a este registro de status."
        },
        {
          "fieldId": "fromStatus",
          "type": "string",
          "required": true,
          "description": "Status anterior do pedido antes da transição.",
          "enum": [
            "Recebido",
            "Em preparo",
            "Pronto",
            "Entregue",
            "Cancelado"
          ]
        },
        {
          "fieldId": "toStatus",
          "type": "string",
          "required": true,
          "description": "Novo status do pedido após a transição.",
          "enum": [
            "Recebido",
            "Em preparo",
            "Pronto",
            "Entregue",
            "Cancelado"
          ]
        },
        {
          "fieldId": "changedAt",
          "type": "datetime",
          "required": true,
          "description": "Data e hora em que a transição de status ocorreu."
        },
        {
          "fieldId": "changedBy",
          "type": "string",
          "required": false,
          "description": "Identificador ou nome do colaborador que efetuou a mudança de status."
        },
        {
          "fieldId": "note",
          "type": "text",
          "required": false,
          "description": "Observação sobre a mudança de status, se aplicável."
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
        "orderStatusTransition"
      ]
    }
  }
} as const;

export default OrderStatusHistoryEntityDefinition;
