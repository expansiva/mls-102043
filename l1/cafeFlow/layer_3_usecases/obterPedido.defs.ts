/// <mls fileReference="_102043_/l1/cafeFlow/layer_3_usecases/obterPedido.defs.ts" enhancement="_blank"/>

export const useCase = {
  "usecaseId": "obterPedido",
  "title": "Obter pedido",
  "purpose": "Retorna os detalhes de um pedido específico.",
  "actor": "atendenteCaixa",
  "layer": "layer_3_usecases",
  "inputEntities": [
    "PedidoEntity"
  ],
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
