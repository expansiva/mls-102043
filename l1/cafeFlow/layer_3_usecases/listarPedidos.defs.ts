/// <mls fileReference="_102043_/l1/cafeFlow/layer_3_usecases/listarPedidos.defs.ts" enhancement="_blank"/>

export const useCase = {
  "usecaseId": "listarPedidos",
  "title": "Listar pedidos",
  "purpose": "Listar pedidos com status atual.",
  "actor": "atendente",
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
    },
    {
      "tableName": "order_status_history",
      "ownership": "moduleOwned"
    }
  ],
  "writesTables": [],
  "rulesApplied": [],
  "entityRefs": [
    "pedidoEntity"
  ],
  "commands": [
    {
      "commandId": "listarPedidos",
      "input": [],
      "output": [
        {
          "name": "pedidos",
          "type": "pedidoEntity[]"
        }
      ]
    }
  ]
} as const;

export default useCase;

export const pipeline = [
  {
    "id": "listarPedidos__layer_3_usecases",
    "type": "layer_3_usecases",
    "outputPath": "_102043_/l1/cafeFlow/layer_3_usecases/listarPedidos.ts",
    "defPath": "_102043_/l1/cafeFlow/layer_3_usecases/listarPedidos.defs.ts",
    "dependsFiles": [
      "_102043_/l1/cafeFlow/layer_4_entities/pedidoEntity.d.ts"
    ],
    "dependsOn": [],
    "skills": [
      "_102021_/l2/skills/layer_3.md"
    ],
    "agent": "agentMaterializeGen"
  }
] as const;
