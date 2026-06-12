/// <mls fileReference="_102043_/l1/cafeFlow/layer_3_usecases/atualizarCategoriaCardapio.defs.ts" enhancement="_blank"/>

export const useCase = {
  "usecaseId": "atualizarCategoriaCardapio",
  "title": "Atualizar categoria do cardápio",
  "purpose": "Atualiza os dados de uma categoria existente.",
  "actor": "gerente",
  "layer": "layer_3_usecases",
  "inputEntities": [
    "CardapioEntity"
  ],
  "outputEntities": [
    "CardapioEntity"
  ],
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
