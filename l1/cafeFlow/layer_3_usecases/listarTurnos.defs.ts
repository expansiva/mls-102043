/// <mls fileReference="_102043_/l1/cafeFlow/layer_3_usecases/listarTurnos.defs.ts" enhancement="_blank"/>

export const useCase = {
  "usecaseId": "listarTurnos",
  "title": "Listar turnos",
  "purpose": "Lista histórico de turnos diários.",
  "actor": "gerente",
  "layer": "layer_3_usecases",
  "inputEntities": [],
  "outputEntities": [
    "TurnoEntity"
  ],
  "readsTables": [
    {
      "tableName": "daily_shift",
      "ownership": "moduleOwned"
    }
  ],
  "writesTables": [],
  "rulesApplied": [],
  "entityRefs": [
    "TurnoEntity"
  ]
} as const;

export default useCase;
