/// <mls fileReference="_102043_/l1/cafeFlow/layer_3_usecases/criarAjusteEstoque.defs.ts" enhancement="_blank"/>

export const useCase = {
  "usecaseId": "criarAjusteEstoque",
  "title": "Criar ajuste de estoque",
  "purpose": "Registra um ajuste de entrada ou saída no estoque.",
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
      "tableName": "inventory_adjustment",
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
