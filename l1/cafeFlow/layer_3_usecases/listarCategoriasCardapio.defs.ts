/// <mls fileReference="_102043_/l1/cafeFlow/layer_3_usecases/listarCategoriasCardapio.defs.ts" enhancement="_blank"/>

export const useCase = {
  "usecaseId": "listarCategoriasCardapio",
  "title": "Listar categorias do cardápio",
  "purpose": "Lista todas as categorias do cardápio.",
  "actor": "gerente",
  "layer": "layer_3_usecases",
  "inputEntities": [],
  "outputEntities": [
    "CardapioEntity"
  ],
  "readsTables": [
    {
      "tableName": "menu_category",
      "ownership": "moduleOwned"
    }
  ],
  "writesTables": [],
  "rulesApplied": [],
  "entityRefs": [
    "CardapioEntity"
  ]
} as const;

export default useCase;
