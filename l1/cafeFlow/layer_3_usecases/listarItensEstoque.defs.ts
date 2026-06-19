/// <mls fileReference="_102043_/l1/cafeFlow/layer_3_usecases/listarItensEstoque.defs.ts" enhancement="_blank"/>

export const useCase = {
  "usecaseId": "listarItensEstoque",
  "title": "Listar itens de estoque",
  "purpose": "Consultar itens de estoque cadastrados.",
  "actor": "gerente",
  "layer": "layer_3_usecases",
  "inputEntities": [
    "estoqueEntity"
  ],
  "outputEntities": [
    "estoqueEntity"
  ],
  "readsTables": [
    {
      "tableName": "StockItem",
      "ownership": "mdmOwned"
    },
    {
      "tableName": "UnitOfMeasure",
      "ownership": "mdmOwned"
    }
  ],
  "writesTables": [],
  "rulesApplied": [],
  "entityRefs": [
    "estoqueEntity"
  ],
  "commands": [
    {
      "commandId": "listarItensEstoque",
      "input": [],
      "output": [
        {
          "name": "itensEstoque",
          "type": "estoqueEntity[]"
        }
      ]
    }
  ]
} as const;

export default useCase;

export const pipeline = [
  {
    "id": "listarItensEstoque__layer_3_usecases",
    "type": "layer_3_usecases",
    "outputPath": "_102043_/l1/cafeFlow/layer_3_usecases/listarItensEstoque.ts",
    "defPath": "_102043_/l1/cafeFlow/layer_3_usecases/listarItensEstoque.defs.ts",
    "dependsFiles": [
      "_102043_/l1/cafeFlow/layer_4_entities/estoqueEntity.d.ts"
    ],
    "dependsOn": [],
    "agent": "agentMaterializeGen"
  }
] as const;
