/// <mls fileReference="_102043_/l1/cafeFlow/layer_3_usecases/confirmarAjusteEstoque.defs.ts" enhancement="_blank"/>

export const useCase = {
  "usecaseId": "confirmarAjusteEstoque",
  "title": "Confirmar ajuste de estoque",
  "purpose": "Confirma o ajuste e aplica a movimentação no item de estoque.",
  "actor": "gerente",
  "layer": "layer_3_usecases",
  "inputEntities": [
    "EstoqueEntity"
  ],
  "outputEntities": [
    "EstoqueEntity"
  ],
  "readsTables": [
    {
      "tableName": "inventory_adjustment",
      "ownership": "moduleOwned"
    },
    {
      "tableName": "inventory_item",
      "ownership": "moduleOwned"
    }
  ],
  "writesTables": [
    {
      "tableName": "inventory_adjustment",
      "ownership": "moduleOwned"
    },
    {
      "tableName": "inventory_item",
      "ownership": "moduleOwned"
    },
    {
      "tableName": "low_stock_metrics",
      "ownership": "moduleOwned"
    }
  ],
  "rulesApplied": [
    "inventoryLowStockAlert"
  ],
  "entityRefs": [
    "EstoqueEntity"
  ]
} as const;

export default useCase;
