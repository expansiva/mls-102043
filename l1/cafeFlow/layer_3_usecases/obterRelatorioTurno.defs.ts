/// <mls fileReference="_102043_/l1/cafeFlow/layer_3_usecases/obterRelatorioTurno.defs.ts" enhancement="_blank"/>

export const useCase = {
  "usecaseId": "obterRelatorioTurno",
  "title": "Obter relatório de turno",
  "purpose": "Consultar relatório de fechamento de um turno.",
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
      "tableName": "shift_reports",
      "ownership": "moduleOwned"
    }
  ],
  "writesTables": [],
  "rulesApplied": [],
  "entityRefs": [
    "turnoEntity"
  ],
  "commands": [
    {
      "commandId": "obterRelatorioTurno",
      "input": [
        {
          "name": "turnoId",
          "type": "string",
          "required": true
        }
      ],
      "output": [
        {
          "name": "turno",
          "type": "turnoEntity"
        }
      ]
    }
  ]
} as const;

export default useCase;

export const pipeline = [
  {
    "id": "obterRelatorioTurno__layer_3_usecases",
    "type": "layer_3_usecases",
    "outputPath": "_102043_/l1/cafeFlow/layer_3_usecases/obterRelatorioTurno.ts",
    "defPath": "_102043_/l1/cafeFlow/layer_3_usecases/obterRelatorioTurno.defs.ts",
    "dependsFiles": [
      "_102043_/l1/cafeFlow/layer_4_entities/turnoEntity.d.ts"
    ],
    "dependsOn": [],
    "skills": [
      "_102021_/l2/skills/layer_3.md"
    ],
    "agent": "agentMaterializeGen"
  }
] as const;
