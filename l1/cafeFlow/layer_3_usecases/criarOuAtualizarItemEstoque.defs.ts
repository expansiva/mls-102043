/// <mls fileReference="_102043_/l1/cafeFlow/layer_3_usecases/criarOuAtualizarItemEstoque.defs.ts" enhancement="_blank"/>

export const useCase = {
  "usecaseId": "criarOuAtualizarItemEstoque",
  "title": "Criar ou atualizar item de estoque",
  "purpose": "Cadastrar ou editar item de estoque.",
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
      "tableName": "UnitOfMeasure",
      "ownership": "mdmOwned"
    }
  ],
  "writesTables": [
    {
      "tableName": "StockItem",
      "ownership": "mdmOwned"
    }
  ],
  "rulesApplied": [],
  "entityRefs": [
    "estoqueEntity"
  ],
  "commands": [
    {
      "commandId": "criarOuAtualizarItemEstoque",
      "input": [
        {
          "name": "estoqueEntity",
          "type": "estoqueEntity",
          "required": true
        }
      ],
      "output": [
        {
          "name": "estoqueEntity",
          "type": "estoqueEntity"
        }
      ]
    }
  ]
} as const;

export default useCase;

export const pipeline = [
  {
    "id": "criarOuAtualizarItemEstoque__layer_3_usecases",
    "type": "layer_3_usecases",
    "outputPath": "_102043_/l1/cafeFlow/layer_3_usecases/criarOuAtualizarItemEstoque.ts",
    "defPath": "_102043_/l1/cafeFlow/layer_3_usecases/criarOuAtualizarItemEstoque.defs.ts",
    "dependsFiles": [
      "_102043_/l1/cafeFlow/layer_4_entities/estoqueEntity.d.ts"
    ],
    "dependsOn": [],
    "skills": [
      "_102021_/l2/skills/layer_3.md"
    ],
    "agent": "agentMaterializeGen"
  }
] as const;
