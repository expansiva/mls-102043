/// <mls fileReference="_102043_/l1/cafeFlow/layer_3_usecases/adicionarItemPedido.defs.ts" enhancement="_blank"/>

export const useCase = {
  "usecaseId": "adicionarItemPedido",
  "title": "Adicionar item ao pedido",
  "purpose": "Adiciona um item ao pedido existente e atualiza métricas de itens vendidos.",
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
    },
    {
      "tableName": "menu_item",
      "ownership": "mdmOwned"
    }
  ],
  "writesTables": [
    {
      "tableName": "order",
      "ownership": "moduleOwned"
    },
    {
      "tableName": "top_selling_items_metrics",
      "ownership": "moduleOwned"
    }
  ],
  "rulesApplied": [
    "inventoryDecrementPolicy"
  ],
  "entityRefs": [
    "CardapioEntity",
    "PedidoEntity"
  ]
} as const;

export default useCase;
