/// <mls fileReference="_102043_/l1/cafeFlow/layer_3_usecases/obterPedido.defs.ts" enhancement="_blank"/>

export const useCase = {
  "usecaseId": "obterPedido",
  "title": "Obter pedido",
  "purpose": "Consultar detalhes de um pedido.",
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
      "commandId": "obterPedido",
      "input": [
        {
          "name": "pedidoId",
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
    "id": "obterPedido__layer_3_usecases",
    "type": "layer_3_usecases",
    "outputPath": "_102043_/l1/cafeFlow/layer_3_usecases/obterPedido.ts",
    "defPath": "_102043_/l1/cafeFlow/layer_3_usecases/obterPedido.defs.ts",
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
