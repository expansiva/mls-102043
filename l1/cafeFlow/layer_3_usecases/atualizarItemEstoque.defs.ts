/// <mls fileReference="_102043_/l1/cafeFlow/layer_3_usecases/atualizarItemEstoque.defs.ts" enhancement="_blank"/>

export const useCase = {
  "usecaseId": "atualizarItemEstoque",
  "title": "Atualizar item de estoque",
  "purpose": "Atualiza dados e quantidade de um item de estoque.",
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
      "tableName": "inventory_item",
      "ownership": "moduleOwned"
    }
  ],
  "writesTables": [
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
