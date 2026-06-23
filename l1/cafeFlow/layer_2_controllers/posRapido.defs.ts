/// <mls fileReference="_102043_/l1/cafeFlow/layer_2_controllers/posRapido.defs.ts" enhancement="_blank"/>

export const definition = [
  {
    "commandName": "listarPedidos",
    "purpose": "Listar pedidos do dia para consulta rápida no POS.",
    "kind": "query",
    "input": [
      {
        "name": "status",
        "type": "string",
        "required": false
      },
      {
        "name": "dateFrom",
        "type": "date",
        "required": false
      },
      {
        "name": "dateTo",
        "type": "date",
        "required": false
      }
    ],
    "output": [
      {
        "name": "orderId",
        "type": "uuid"
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
        "name": "updatedAt",
        "type": "date"
      }
    ],
    "readsEntities": [
      "Order"
    ],
    "writesEntities": [],
    "readsTables": [
      "orders",
      "order_status_history"
    ],
    "writesTables": [],
    "usecaseRefs": [
      "listarPedidos"
    ],
    "layerContract": {
      "controllerLayer": "layer_2_controllers",
      "mustCallLayer": "layer_3_usecases",
      "directTableAccessForbidden": true
    },
    "rulesApplied": []
  },
  {
    "commandName": "criarPedido",
    "purpose": "Criar um pedido com itens e enviar para a cozinha com status recebido.",
    "kind": "command",
    "input": [
      {
        "name": "orderItems",
        "type": "OrderItem[]",
        "required": true
      },
      {
        "name": "observacao",
        "type": "string",
        "required": false
      }
    ],
    "output": [
      {
        "name": "orderId",
        "type": "uuid"
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
        "name": "updatedAt",
        "type": "date"
      }
    ],
    "readsEntities": [
      "cardapioEntity"
    ],
    "writesEntities": [
      "Order",
      "OrderStatusHistory"
    ],
    "readsTables": [],
    "writesTables": [
      "orders",
      "order_status_history",
      "daily_sales_metrics",
      "top_selling_items_metrics"
    ],
    "usecaseRefs": [
      "criarPedido"
    ],
    "layerContract": {
      "controllerLayer": "layer_2_controllers",
      "mustCallLayer": "layer_3_usecases",
      "directTableAccessForbidden": true
    },
    "rulesApplied": [
      "orderRequiresItem"
    ]
  }
];

export const pipeline = [
  {
    "id": "posRapido__layer_2_controllers",
    "type": "layer_2_controllers",
    "outputPath": "_102043_/l1/cafeFlow/layer_2_controllers/posRapido.ts",
    "defPath": "_102043_/l1/cafeFlow/layer_2_controllers/posRapido.defs.ts",
    "dependsFiles": [
      "_102043_/l1/cafeFlow/layer_3_usecases/listarPedidos.d.ts",
      "_102043_/l1/cafeFlow/layer_3_usecases/criarPedido.d.ts",
      "_102043_/l2/cafeFlow/web/contracts/posRapido.ts"
    ],
    "dependsOn": [],
    "skills": [
      "_102021_/l2/skills/layer_2.md"
    ],
    "afterSaveBackEnd": "_102021_/l2/agentMaterializeSolution/registerBackEnd.ts?registerController",
    "rulesPath": "_102043_/l5/cafeFlow/rules.defs.ts",
    "rulesApplied": [
      "orderRequiresItem"
    ],
    "agent": "agentMaterializeGen"
  }
] as const;
