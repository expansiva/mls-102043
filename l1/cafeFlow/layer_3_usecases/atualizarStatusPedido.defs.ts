/// <mls fileReference="_102043_/l1/cafeFlow/layer_3_usecases/atualizarStatusPedido.defs.ts" enhancement="_blank"/>

export const useCase = {
  "usecaseId": "atualizarStatusPedido",
  "title": "Atualizar status do pedido",
  "purpose": "Atualizar status de preparo e entrega do pedido.",
  "actor": "cozinha",
  "layer": "layer_3_usecases",
  "inputEntities": [
    "pedidoEntity"
  ],
  "outputEntities": [
    "pedidoEntity"
  ],
  "readsTables": [
    {
      "tableName": "orders",
      "ownership": "moduleOwned"
    }
  ],
  "writesTables": [
    {
      "tableName": "orders",
      "ownership": "moduleOwned"
    },
    {
      "tableName": "order_status_history",
      "ownership": "moduleOwned"
    },
    {
      "tableName": "daily_sales_metrics",
      "ownership": "moduleOwned"
    },
    {
      "tableName": "top_selling_items_metrics",
      "ownership": "moduleOwned"
    }
  ],
  "rulesApplied": [
    "orderStatusTransition"
  ],
  "entityRefs": [
    "metricasEntity",
    "pedidoEntity"
  ],
  "commands": [
    {
      "commandId": "atualizarStatusPedido",
      "input": [
        {
          "name": "pedidoId",
          "type": "string",
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
          "name": "pedido",
          "type": "pedidoEntity"
        }
      ]
    }
  ]
} as const;

export default useCase;

export const pipeline = [
  {
    "id": "atualizarStatusPedido__layer_3_usecases",
    "type": "layer_3_usecases",
    "outputPath": "_102043_/l1/cafeFlow/layer_3_usecases/atualizarStatusPedido.ts",
    "defPath": "_102043_/l1/cafeFlow/layer_3_usecases/atualizarStatusPedido.defs.ts",
    "dependsFiles": [
      "_102043_/l1/cafeFlow/layer_4_entities/metricasEntity.d.ts",
      "_102043_/l1/cafeFlow/layer_4_entities/pedidoEntity.d.ts"
    ],
    "dependsOn": [],
    "skills": [
      "_102021_/l2/skills/layer_3.md"
    ],
    "rulesPath": "_102043_/l5/cafeFlow/rules.defs.ts",
    "rulesApplied": [
      "orderStatusTransition"
    ],
    "agent": "agentMaterializeGen"
  }
] as const;
