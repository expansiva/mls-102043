/// <mls fileReference="_102043_/l1/cafeFlow/layer_3_usecases/excluirCategoriaCardapio.defs.ts" enhancement="_blank"/>

export const useCase = {
  "usecaseId": "excluirCategoriaCardapio",
  "title": "Excluir categoria do cardápio",
  "purpose": "Remove uma categoria do cardápio.",
  "actor": "gerente",
  "layer": "layer_3_usecases",
  "inputEntities": [
    "CardapioEntity"
  ],
  "outputEntities": [],
  "readsTables": [
    {
      "tableName": "menu_category",
      "ownership": "moduleOwned"
    }
  ],
  "writesTables": [
    {
      "tableName": "menu_category",
      "ownership": "moduleOwned"
    }
  ],
  "rulesApplied": [],
  "entityRefs": [
    "CardapioEntity"
  ]
} as const;

export default useCase;
