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

export const pipeline = [
  {
    "id": "listarItensCardapio__layer_3_usecases",
    "type": "layer_3_usecases",
    "outputPath": "_102043_/l1/cafeFlow/layer_3_usecases/listarItensCardapio.ts",
    "defPath": "_102043_/l1/cafeFlow/layer_3_usecases/listarItensCardapio.defs.ts",
    "dependsFiles": [
      "_102043_/l1/cafeFlow/layer_4_entities/cardapioEntity.d.ts"
    ],
    "dependsOn": [],
    "skills": [
      "_102021_/l2/skills/layer_3.md"
    ],
    "agent": "agentMaterializeGen"
  }
] as const;
