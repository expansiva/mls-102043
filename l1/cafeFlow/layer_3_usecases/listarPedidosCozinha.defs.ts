/// <mls fileReference="_102043_/l1/cafeFlow/layer_3_usecases/listarPedidosCozinha.defs.ts" enhancement="_blank"/>

export const useCase = {
  "usecaseId": "listarPedidosCozinha",
  "title": "Listar pedidos para cozinha",
  "purpose": "Exibir fila de pedidos para preparo.",
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
  "writesTables": [],
  "rulesApplied": [],
  "entityRefs": [
    "pedidoEntity"
  ],
  "commands": [
    {
      "commandId": "listarPedidosCozinha",
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
