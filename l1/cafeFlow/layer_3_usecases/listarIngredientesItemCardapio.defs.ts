/// <mls fileReference="_102043_/l1/cafeFlow/layer_3_usecases/listarIngredientesItemCardapio.defs.ts" enhancement="_blank"/>

export const useCase = {
  "usecaseId": "listarIngredientesItemCardapio",
  "title": "Listar ingredientes do item do cardápio",
  "purpose": "Lista ingredientes com referências aos itens MDM e estoque.",
  "actor": "gerente",
  "layer": "layer_3_usecases",
  "inputEntities": [],
  "outputEntities": [
    "CardapioEntity"
  ],
  "readsTables": [
    {
      "tableName": "menu_item_ingredient",
      "ownership": "moduleOwned"
    },
    {
      "tableName": "menu_item",
      "ownership": "mdmOwned"
    },
    {
      "tableName": "inventory_item",
      "ownership": "moduleOwned"
    }
  ],
  "writesTables": [],
  "rulesApplied": [],
  "entityRefs": [
    "CardapioEntity",
    "EstoqueEntity"
  ]
} as const;

export default useCase;
