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
