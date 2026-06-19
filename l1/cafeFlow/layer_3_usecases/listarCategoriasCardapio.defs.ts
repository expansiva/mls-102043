/// <mls fileReference="_102043_/l1/cafeFlow/layer_3_usecases/listarCategoriasCardapio.defs.ts" enhancement="_blank"/>

export const useCase = {
  "usecaseId": "listarCategoriasCardapio",
  "title": "Listar categorias do cardápio",
  "purpose": "Consultar categorias disponíveis para cardápio.",
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
  "writesTables": [],
  "rulesApplied": [],
  "entityRefs": [
    "cardapioEntity"
  ],
  "commands": [
    {
      "commandId": "listarCategoriasCardapio",
      "input": [],
      "output": [
        {
          "name": "categorias",
          "type": "MenuCategory[]"
        }
      ]
    }
  ]
} as const;

export default useCase;

export const pipeline = [
  {
    "id": "listarCategoriasCardapio__layer_3_usecases",
    "type": "layer_3_usecases",
    "outputPath": "_102043_/l1/cafeFlow/layer_3_usecases/listarCategoriasCardapio.ts",
    "defPath": "_102043_/l1/cafeFlow/layer_3_usecases/listarCategoriasCardapio.defs.ts",
    "dependsFiles": [
      "_102043_/l1/cafeFlow/layer_4_entities/cardapioEntity.d.ts"
    ],
    "dependsOn": [],
    "agent": "agentMaterializeGen"
  }
] as const;
