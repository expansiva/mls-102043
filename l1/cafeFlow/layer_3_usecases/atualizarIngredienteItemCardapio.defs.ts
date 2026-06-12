/// <mls fileReference="_102043_/l1/cafeFlow/layer_3_usecases/atualizarIngredienteItemCardapio.defs.ts" enhancement="_blank"/>

export const useCase = {
  "usecaseId": "atualizarIngredienteItemCardapio",
  "title": "Atualizar ingrediente do item do cardápio",
  "purpose": "Atualiza a quantidade ou item de estoque vinculado.",
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
      "tableName": "menu_item_ingredient",
      "ownership": "moduleOwned"
    }
  ],
  "writesTables": [
    {
      "tableName": "menu_item_ingredient",
      "ownership": "moduleOwned"
    }
  ],
  "rulesApplied": [],
  "entityRefs": [
    "CardapioEntity"
  ]
} as const;

export default useCase;
