/// <mls fileReference="_102043_/l1/cafeFlow/layer_3_usecases/listarTurnos.defs.ts" enhancement="_blank"/>

export const useCase = {
  "usecaseId": "listarTurnos",
  "title": "Listar turnos",
  "purpose": "Consultar turnos diários.",
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
      "tableName": "shifts",
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
      "commandId": "listarTurnos",
      "input": [],
      "output": [
        {
          "name": "turnos",
          "type": "turnoEntity[]"
        }
      ]
    }
  ]
} as const;

export default useCase;

export const pipeline = [
  {
    "id": "listarTurnos__layer_3_usecases",
    "type": "layer_3_usecases",
    "outputPath": "_102043_/l1/cafeFlow/layer_3_usecases/listarTurnos.ts",
    "defPath": "_102043_/l1/cafeFlow/layer_3_usecases/listarTurnos.defs.ts",
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
