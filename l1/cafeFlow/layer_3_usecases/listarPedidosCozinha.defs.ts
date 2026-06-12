/// <mls fileReference="_102043_/l1/cafeFlow/layer_3_usecases/listarPedidosCozinha.defs.ts" enhancement="_blank"/>

export const useCase = {
  "usecaseId": "listarPedidosCozinha",
  "title": "Listar pedidos da cozinha",
  "purpose": "Lista pedidos pendentes e em preparação para a cozinha.",
  "actor": "cozinha",
  "layer": "layer_3_usecases",
  "inputEntities": [],
  "outputEntities": [
    "PedidoEntity"
  ],
  "readsTables": [
    {
      "tableName": "order",
      "ownership": "moduleOwned"
    }
  ],
  "writesTables": [],
  "rulesApplied": [],
  "entityRefs": [
    "PedidoEntity"
  ]
} as const;

export default useCase;
