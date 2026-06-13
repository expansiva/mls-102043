/// <mls fileReference="_102043_/l1/cafeFlow/layer_3_usecases/listarItensCardapio.defs.ts" enhancement="_blank"/>

export const useCase = {
  "usecaseId": "listarItensCardapio",
  "title": "Listar itens do cardápio",
  "purpose": "Consultar itens do cardápio e suas categorias.",
  "actor": "gerente",
  "layer": "layer_3_usecases",
  "inputEntities": [
    "cardapioEntity"
  ],
  "outputEntities": [
    "cardapioEntity"
  ],
  "readsTables": [
    {
      "tableName": "MenuItem",
      "ownership": "mdmOwned"
    },
    {
      "tableName": "MenuCategory",
      "ownership": "mdmOwned"
    }
  ],
  "writesTables": [],
  "rulesApplied": [],
  "entityRefs": [
    "cardapioEntity"
  ],
  "commands": [
    {
      "commandId": "listarItensCardapio",
      "input": [],
      "output": [
        {
          "name": "itensCardapio",
          "type": "cardapioEntity[]"
        }
      ]
    }
  ]
} as const;

export default useCase;
