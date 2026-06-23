/// <mls fileReference="_102043_/l1/cafeFlow/layer_2_controllers/painelCozinha.defs.ts" enhancement="_blank"/>

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
    "id": "painelCozinha__layer_2_controllers",
    "type": "layer_2_controllers",
    "outputPath": "_102043_/l1/cafeFlow/layer_2_controllers/painelCozinha.ts",
    "defPath": "_102043_/l1/cafeFlow/layer_2_controllers/painelCozinha.defs.ts",
    "dependsFiles": [
      "_102043_/l1/cafeFlow/layer_3_usecases/listarPedidosCozinha.d.ts",
      "_102043_/l1/cafeFlow/layer_3_usecases/atualizarStatusPedido.d.ts",
      "_102043_/l2/cafeFlow/web/contracts/painelCozinha.ts"
    ],
    "dependsOn": [],
    "skills": [
      "_102021_/l2/skills/layer_2.md"
    ],
    "afterSaveBackEnd": "_102021_/l2/agentMaterializeSolution/registerBackEnd.ts?registerController",
    "rulesPath": "_102043_/l5/cafeFlow/rules.defs.ts",
    "rulesApplied": [
      "orderStatusTransition"
    ],
    "agent": "agentMaterializeGen"
  }
] as const;
