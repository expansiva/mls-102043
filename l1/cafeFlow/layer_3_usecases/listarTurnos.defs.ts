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
