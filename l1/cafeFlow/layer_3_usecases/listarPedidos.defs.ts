/// <mls fileReference="_102043_/l1/cafeFlow/layer_3_usecases/listarPedidos.defs.ts" enhancement="_blank"/>

export const useCase = {
  "usecaseId": "listarPedidos",
  "title": "Listar pedidos",
  "purpose": "Lista pedidos para o atendimento e acompanhamento.",
  "actor": "atendenteCaixa",
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
