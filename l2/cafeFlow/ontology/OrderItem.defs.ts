/// <mls fileReference="_102043_/l2/cafeFlow/ontology/OrderItem.defs.ts" enhancement="_blank"/>

export const OrderItemEntityDefinition = {
  "schemaVersion": "2026-06-06",
  "artifactType": "ontologyEntity",
  "artifactId": "OrderItem",
  "moduleName": "cafeFlow",
  "status": "draft",
  "source": {
    "agentName": "agentPlanEntityDefinition",
    "stepId": 38,
    "planId": ""
  },
  "data": {
    "entityDefinition": {
      "entityId": "OrderItem",
      "title": "Item do Pedido",
      "description": "Itens do cardápio associados a um pedido com quantidade e observações.",
      "ownership": "moduleOwned",
      "fields": [
        {
          "fieldId": "orderItemId",
          "type": "uuid",
          "required": true,
          "description": "Identificador único do item do pedido."
        },
        {
          "fieldId": "orderId",
          "type": "Order",
          "required": true,
          "description": "Referência ao pedido ao qual este item pertence."
        },
        {
          "fieldId": "menuItemId",
          "type": "MenuItem",
          "required": true,
          "description": "Referência ao item do cardápio selecionado."
        },
        {
          "fieldId": "quantity",
          "type": "number",
          "required": true,
          "description": "Quantidade do item no pedido."
        },
        {
          "fieldId": "unitPrice",
          "type": "money",
          "required": true,
          "description": "Preço unitário aplicado no momento do pedido."
        },
        {
          "fieldId": "itemNote",
          "type": "text",
          "required": false,
          "description": "Observações ou instruções especiais para o item."
        },
        {
          "fieldId": "createdAt",
          "type": "datetime",
          "required": true,
          "description": "Data e hora de criação do item do pedido."
        },
        {
          "fieldId": "updatedAt",
          "type": "datetime",
          "required": true,
          "description": "Data e hora da última atualização do item do pedido."
        }
      ],
      "rulesApplied": []
    }
  }
} as const;

export default OrderItemEntityDefinition;
