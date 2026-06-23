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
