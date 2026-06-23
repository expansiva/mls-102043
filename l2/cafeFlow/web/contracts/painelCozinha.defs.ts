/// <mls fileReference="_102043_/l2/cafeFlow/web/contracts/painelCozinha.defs.ts" enhancement="_blank"/>

export const definition = [
  {
    "commandName": "listarPedidosCozinha",
    "purpose": "Carregar pedidos recebidos para a fila da cozinha.",
    "kind": "query",
    "input": [
      {
        "name": "status",
        "type": "string",
        "required": false
      },
      {
        "name": "shiftId",
        "type": "Shift",
        "required": false
      }
    ],
    "output": [
      {
        "name": "orderId",
        "type": "Order"
      },
      {
        "name": "status",
        "type": "string"
      },
      {
        "name": "createdAt",
        "type": "date"
      },
      {
        "name": "shiftId",
        "type": "Shift"
      }
    ],
    "readsEntities": [
      "Order"
    ],
    "writesEntities": [],
    "readsTables": [
      "orders"
    ],
    "writesTables": [],
    "usecaseRefs": [
      "listarPedidosCozinha"
    ],
    "layerContract": {
      "controllerLayer": "layer_2_controllers",
      "mustCallLayer": "layer_3_usecases",
      "directTableAccessForbidden": true
    },
    "rulesApplied": []
  },
  {
    "commandName": "atualizarStatusPedido",
    "purpose": "Atualizar status do pedido conforme preparo e entrega.",
    "kind": "command",
    "input": [
      {
        "name": "orderId",
        "type": "Order",
        "required": true
      },
      {
        "name": "novoStatus",
        "type": "string",
        "required": true
      }
    ],
    "output": [
      {
        "name": "orderId",
        "type": "Order"
      },
      {
        "name": "status",
        "type": "string"
      },
      {
        "name": "updatedAt",
        "type": "date"
      }
    ],
    "readsEntities": [
      "Order"
    ],
    "writesEntities": [
      "Order",
      "OrderStatusHistory"
    ],
    "readsTables": [
      "orders"
    ],
    "writesTables": [
      "orders",
      "order_status_history",
      "daily_sales_metrics",
      "top_selling_items_metrics"
    ],
    "usecaseRefs": [
      "atualizarStatusPedido"
    ],
    "layerContract": {
      "controllerLayer": "layer_2_controllers",
      "mustCallLayer": "layer_3_usecases",
      "directTableAccessForbidden": true
    },
    "rulesApplied": [
      "orderStatusTransition"
    ]
  }
];

export const pipeline = [
  {
    "id": "painelCozinha__l2_contract",
    "type": "l2_contract",
    "outputPath": "_102043_/l2/cafeFlow/web/contracts/painelCozinha.ts",
    "defPath": "_102043_/l2/cafeFlow/web/contracts/painelCozinha.defs.ts",
    "dependsFiles": [],
    "dependsOn": [],
    "skills": [
      "_102020_/l2/agentMaterializeSolution/skills/genContract.ts"
    ],
    "agent": "agentMaterializeGen"
  }
] as const;
