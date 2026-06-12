/// <mls fileReference="_102043_/l2/cafeFlow/ontology/OrderUsecase.defs.ts" enhancement="_blank"/>

export const OrderUsecaseEntityDefinition = {
  "schemaVersion": "2026-06-06",
  "artifactType": "ontologyEntity",
  "artifactId": "OrderUsecase",
  "moduleName": "cafeFlow",
  "status": "draft",
  "source": {
    "agentName": "agentPlanEntityDefinition",
    "stepId": 40,
    "planId": ""
  },
  "data": {
    "entityDefinition": {
      "entityId": "OrderUsecase",
      "title": "Pedido (Caso de Uso)",
      "description": "Entidade operacional para comandos de criação e atualização de pedidos.",
      "ownership": "moduleOwned",
      "kind": "usecase",
      "fields": [
        {
          "fieldId": "orderUsecaseId",
          "type": "uuid",
          "required": true,
          "description": "Identificador único do caso de uso de pedido."
        },
        {
          "fieldId": "orderId",
          "type": "Order",
          "required": false,
          "description": "Referência ao pedido alvo quando aplicável."
        },
        {
          "fieldId": "operation",
          "type": "string",
          "required": true,
          "description": "Operação solicitada sobre o pedido."
        },
        {
          "fieldId": "payload",
          "type": "text",
          "required": false,
          "description": "Dados do comando para criação ou atualização do pedido."
        },
        {
          "fieldId": "createdAt",
          "type": "datetime",
          "required": true,
          "description": "Data e hora de criação do caso de uso."
        },
        {
          "fieldId": "updatedAt",
          "type": "datetime",
          "required": true,
          "description": "Data e hora da última atualização do caso de uso."
        }
      ],
      "rulesApplied": [
        "kitchenStatusUpdates",
        "shiftMustBeOpenForOrders"
      ]
    }
  }
} as const;

export default OrderUsecaseEntityDefinition;
