/// <mls fileReference="_102043_/l1/cafeFlow/layer_3_usecases/criarPedido.defs.ts" enhancement="_blank"/>

export const useCase = {
  "usecaseId": "criarPedido",
  "title": "Criar pedido",
  "purpose": "Registra um novo pedido no POS vinculado ao turno aberto.",
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
      "tableName": "daily_shift",
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
    },
    {
      "tableName": "top_selling_items_metrics",
      "ownership": "moduleOwned"
    }
  ],
  "rulesApplied": [
    "orderStatusLifecycle",
    "shiftMustBeOpenForOrders",
    "inventoryDecrementPolicy"
  ],
  "entityRefs": [
    "PedidoEntity",
    "TurnoEntity"
  ]
} as const;

export default useCase;
