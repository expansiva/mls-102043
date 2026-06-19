/// <mls fileReference="_102043_/l1/cafeFlow/layer_4_entities/pedidoEntity.defs.ts" enhancement="_blank"/>

export const entity = {
  "entityId": "pedidoEntity",
  "title": "Entidade de caso de uso: Pedido",
  "purpose": "Gerenciar pedidos e histórico de status.",
  "layer": "layer_4_entities",
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
  "sourceTables": [
    {
      "tableName": "orders",
      "ownership": "moduleOwned"
    },
    {
      "tableName": "order_status_history",
      "ownership": "moduleOwned"
    }
  ],
  "storage": [
    {
      "kind": "moduleTable",
      "tableId": "order",
      "tableName": "orders",
      "fileRef": "_102043_/l1/cafeFlow/layer_1_external/order.defs.ts"
    },
    {
      "kind": "moduleTable",
      "tableId": "orderStatusHistory",
      "tableName": "order_status_history",
      "fileRef": "_102043_/l1/cafeFlow/layer_1_external/orderStatusHistory.defs.ts"
    }
  ],
  "allowedOperations": [
    "create",
    "update",
    "read",
    "list"
  ],
  "rulesApplied": [
    "orderRequiresItem",
    "orderStatusTransition"
  ],
  "usecaseRefs": [
    "criarPedido",
    "listarPedidos",
    "obterPedido",
    "listarPedidosCozinha",
    "atualizarStatusPedido",
    "fecharTurno"
  ],
  "materialization": {
    "fileName": "layer_4_entities/PedidoEntity.ts",
    "className": "PedidoEntity",
    "contractName": "IPedidoEntity"
  }
} as const;

export default entity;

export const pipeline = [
  {
    "id": "pedidoEntity__layer_4_entities",
    "type": "layer_4_entities",
    "outputPath": "_102043_/l1/cafeFlow/layer_4_entities/pedidoEntity.ts",
    "defPath": "_102043_/l1/cafeFlow/layer_4_entities/pedidoEntity.defs.ts",
    "dependsFiles": [
      "_102043_/l1/cafeFlow/layer_1_external/order.d.ts",
      "_102043_/l1/cafeFlow/layer_1_external/orderStatusHistory.d.ts"
    ],
    "dependsOn": [],
    "rulesApplied": [
      "orderRequiresItem",
      "orderStatusTransition"
    ],
    "agent": "agentMaterializeGen"
  }
] as const;
