/// <mls fileReference="_102043_/l1/cafeFlow/layer_3_usecases/listarAjustesEstoque.defs.ts" enhancement="_blank"/>

export const useCase = {
  "usecaseId": "listarAjustesEstoque",
  "title": "Listar ajustes de estoque",
  "purpose": "Lista histórico de ajustes de estoque.",
  "actor": "gerente",
  "layer": "layer_3_usecases",
  "inputEntities": [],
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
  "writesTables": [],
  "rulesApplied": [],
  "entityRefs": [
    "EstoqueEntity"
  ]
} as const;

export default useCase;
