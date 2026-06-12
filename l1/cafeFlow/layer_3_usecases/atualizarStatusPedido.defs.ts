/// <mls fileReference="_102043_/l1/cafeFlow/layer_3_usecases/atualizarStatusPedido.defs.ts" enhancement="_blank"/>

export const useCase = {
  "usecaseId": "atualizarStatusPedido",
  "title": "Atualizar status do pedido",
  "purpose": "Atualiza o status do pedido na cozinha (preparando, pronto, entregue).",
  "actor": "cozinha",
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
  "writesTables": [
    {
      "tableName": "order",
      "ownership": "moduleOwned"
    },
    {
      "tableName": "daily_sales_metrics",
      "ownership": "moduleOwned"
    }
  ],
  "rulesApplied": [
    "orderStatusLifecycle",
    "kitchenStatusUpdates"
  ],
  "entityRefs": [
    "PedidoEntity",
    "TurnoEntity"
  ]
} as const;

export default useCase;
