/// <mls fileReference="_102043_/l1/cafeFlow/layer_3_usecases/criarPedido.defs.ts" enhancement="_blank"/>

export const useCase = {
  "usecaseId": "criarPedido",
  "title": "Criar pedido",
  "purpose": "Registrar um novo pedido no POS com itens.",
  "actor": "atendente",
  "layer": "layer_3_usecases",
  "inputEntities": [
    "pedidoEntity",
    "cardapioEntity"
  ],
  "outputEntities": [
    "pedidoEntity"
  ],
  "readsTables": [
    {
      "tableName": "MenuItem",
      "ownership": "mdmOwned"
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
    "orderRequiresItem"
  ],
  "entityRefs": [
    "cardapioEntity",
    "metricasEntity",
    "pedidoEntity"
  ],
  "commands": [
    {
      "commandId": "criarPedido",
      "input": [
        {
          "name": "pedido",
          "type": "pedidoEntity",
          "required": true
        },
        {
          "name": "itens",
          "type": "cardapioEntity[]",
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
    "id": "criarPedido__layer_3_usecases",
    "type": "layer_3_usecases",
    "outputPath": "_102043_/l1/cafeFlow/layer_3_usecases/criarPedido.ts",
    "defPath": "_102043_/l1/cafeFlow/layer_3_usecases/criarPedido.defs.ts",
    "dependsFiles": [
      "_102043_/l1/cafeFlow/layer_4_entities/cardapioEntity.d.ts",
      "_102043_/l1/cafeFlow/layer_4_entities/metricasEntity.d.ts",
      "_102043_/l1/cafeFlow/layer_4_entities/pedidoEntity.d.ts"
    ],
    "dependsOn": [],
    "rulesApplied": [
      "orderRequiresItem"
    ],
    "agent": "agentMaterializeGen"
  }
] as const;
