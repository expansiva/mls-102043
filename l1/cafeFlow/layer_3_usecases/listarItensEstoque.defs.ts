/// <mls fileReference="_102043_/l1/cafeFlow/layer_3_usecases/listarItensEstoque.defs.ts" enhancement="_blank"/>

export const useCase = {
  "usecaseId": "listarItensEstoque",
  "title": "Listar itens de estoque",
  "purpose": "Lista todos os itens de estoque.",
  "actor": "gerente",
  "layer": "layer_3_usecases",
  "inputEntities": [],
  "outputEntities": [
    "EstoqueEntity"
  ],
  "readsTables": [
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
