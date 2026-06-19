/// <mls fileReference="_102043_/l1/cafeFlow/layer_3_usecases/abrirTurno.defs.ts" enhancement="_blank"/>

export const useCase = {
  "usecaseId": "abrirTurno",
  "title": "Abrir turno",
  "purpose": "Iniciar um turno diário.",
  "actor": "gerente",
  "layer": "layer_3_usecases",
  "inputEntities": [
    "turnoEntity"
  ],
  "outputEntities": [
    "turnoEntity"
  ],
  "readsTables": [
    {
      "tableName": "ShiftConfig",
      "ownership": "mdmOwned"
    }
  ],
  "writesTables": [
    {
      "tableName": "shifts",
      "ownership": "moduleOwned"
    },
    {
      "tableName": "daily_sales_metrics",
      "ownership": "moduleOwned"
    }
  ],
  "rulesApplied": [],
  "entityRefs": [
    "metricasEntity",
    "turnoEntity"
  ],
  "commands": [
    {
      "commandId": "abrirTurno",
      "input": [
        {
          "name": "turnoId",
          "type": "string",
          "required": true
        }
      ],
      "output": [
        {
          "name": "turnoId",
          "type": "string"
        }
      ]
    }
  ],
  "pendingQuestions": [
    "Quais campos obrigatórios do turnoEntity devem ser informados para abrir o turno (ex.: data, lojaId, gerenteId), além de um possível turnoId?"
  ]
} as const;

export default useCase;

export const pipeline = [
  {
    "id": "abrirTurno__layer_3_usecases",
    "type": "layer_3_usecases",
    "outputPath": "_102043_/l1/cafeFlow/layer_3_usecases/abrirTurno.ts",
    "defPath": "_102043_/l1/cafeFlow/layer_3_usecases/abrirTurno.defs.ts",
    "dependsFiles": [
      "_102043_/l1/cafeFlow/layer_4_entities/metricasEntity.d.ts",
      "_102043_/l1/cafeFlow/layer_4_entities/turnoEntity.d.ts"
    ],
    "dependsOn": [],
    "agent": "agentMaterializeGen"
  }
] as const;
