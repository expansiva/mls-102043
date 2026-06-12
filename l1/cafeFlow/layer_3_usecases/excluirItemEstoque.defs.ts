/// <mls fileReference="_102043_/l1/cafeFlow/layer_3_usecases/excluirItemEstoque.defs.ts" enhancement="_blank"/>

export const useCase = {
  "usecaseId": "excluirItemEstoque",
  "title": "Excluir item de estoque",
  "purpose": "Remove um item de estoque.",
  "actor": "gerente",
  "layer": "layer_3_usecases",
  "inputEntities": [
    "EstoqueEntity"
  ],
  "outputEntities": [],
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
  "rulesApplied": [],
  "entityRefs": [
    "EstoqueEntity"
  ]
} as const;

export default useCase;
