/// <mls fileReference="_102043_/l1/cafeFlow/layer_3_usecases/criarCategoriaCardapio.defs.ts" enhancement="_blank"/>

export const useCase = {
  "usecaseId": "criarCategoriaCardapio",
  "title": "Criar categoria do cardápio",
  "purpose": "Cria uma nova categoria no cardápio.",
  "actor": "gerente",
  "layer": "layer_3_usecases",
  "inputEntities": [
    "CardapioEntity"
  ],
  "outputEntities": [
    "CardapioEntity"
  ],
  "readsTables": [],
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
