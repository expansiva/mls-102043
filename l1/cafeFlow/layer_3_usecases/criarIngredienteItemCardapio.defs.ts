/// <mls fileReference="_102043_/l1/cafeFlow/layer_3_usecases/criarIngredienteItemCardapio.defs.ts" enhancement="_blank"/>

export const useCase = {
  "usecaseId": "criarIngredienteItemCardapio",
  "title": "Criar ingrediente do item do cardápio",
  "purpose": "Vincula um item de estoque como ingrediente de um item do cardápio MDM.",
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
      "tableName": "menu_item",
      "ownership": "mdmOwned"
    },
    {
      "tableName": "inventory_item",
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
    "CardapioEntity",
    "EstoqueEntity"
  ]
} as const;

export default useCase;
