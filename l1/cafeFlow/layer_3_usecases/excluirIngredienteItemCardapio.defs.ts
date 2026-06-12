/// <mls fileReference="_102043_/l1/cafeFlow/layer_3_usecases/excluirIngredienteItemCardapio.defs.ts" enhancement="_blank"/>

export const useCase = {
  "usecaseId": "excluirIngredienteItemCardapio",
  "title": "Excluir ingrediente do item do cardápio",
  "purpose": "Remove o vínculo entre item do cardápio e ingrediente.",
  "actor": "gerente",
  "layer": "layer_3_usecases",
  "inputEntities": [
    "CardapioEntity"
  ],
  "outputEntities": [],
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
