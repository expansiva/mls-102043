/// <mls fileReference="_102043_/l1/cafeFlow/layer_3_usecases/criarOuAtualizarItemCardapio.defs.ts" enhancement="_blank"/>

export const useCase = {
  "usecaseId": "criarOuAtualizarItemCardapio",
  "title": "Criar ou atualizar item do cardápio",
  "purpose": "Cadastrar ou editar item do cardápio.",
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
      "tableName": "MenuCategory",
      "ownership": "mdmOwned"
    }
  ],
  "writesTables": [
    {
      "tableName": "MenuItem",
      "ownership": "mdmOwned"
    }
  ],
  "rulesApplied": [
    "menuItemRequiresCategory"
  ],
  "entityRefs": [
    "cardapioEntity"
  ],
  "commands": [
    {
      "commandId": "criarOuAtualizarItemCardapio",
      "input": [
        {
          "name": "cardapioEntity",
          "type": "cardapioEntity",
          "required": true
        }
      ],
      "output": [
        {
          "name": "cardapioEntity",
          "type": "cardapioEntity"
        }
      ]
    }
  ]
} as const;

export default useCase;
