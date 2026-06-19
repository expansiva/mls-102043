/// <mls fileReference="_102043_/l1/cafeFlow/layer_3_usecases/listarAlertasEstoqueBaixo.defs.ts" enhancement="_blank"/>

export const useCase = {
  "usecaseId": "listarAlertasEstoqueBaixo",
  "title": "Listar alertas de estoque baixo",
  "purpose": "Consultar alertas de estoque baixo.",
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
      "tableName": "low_stock_alerts",
      "ownership": "moduleOwned"
    }
  ],
  "writesTables": [],
  "rulesApplied": [],
  "entityRefs": [
    "estoqueEntity"
  ],
  "commands": [
    {
      "commandId": "listarAlertasEstoqueBaixo",
      "input": [],
      "output": [
        {
          "name": "alertas",
          "type": "estoqueEntity[]"
        }
      ]
    }
  ]
} as const;

export default useCase;

export const pipeline = [
  {
    "id": "listarAlertasEstoqueBaixo__layer_3_usecases",
    "type": "layer_3_usecases",
    "outputPath": "_102043_/l1/cafeFlow/layer_3_usecases/listarAlertasEstoqueBaixo.ts",
    "defPath": "_102043_/l1/cafeFlow/layer_3_usecases/listarAlertasEstoqueBaixo.defs.ts",
    "dependsFiles": [
      "_102043_/l1/cafeFlow/layer_4_entities/estoqueEntity.d.ts"
    ],
    "dependsOn": [],
    "agent": "agentMaterializeGen"
  }
] as const;
