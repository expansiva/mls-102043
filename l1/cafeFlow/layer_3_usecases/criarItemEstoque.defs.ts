/// <mls fileReference="_102043_/l1/cafeFlow/layer_3_usecases/criarItemEstoque.defs.ts" enhancement="_blank"/>

export const useCase = {
  "usecaseId": "criarItemEstoque",
  "title": "Criar item de estoque",
  "purpose": "Cadastra um novo item no estoque.",
  "actor": "gerente",
  "layer": "layer_3_usecases",
  "inputEntities": [
    "EstoqueEntity"
  ],
  "outputEntities": [
    "EstoqueEntity"
  ],
  "readsTables": [],
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
