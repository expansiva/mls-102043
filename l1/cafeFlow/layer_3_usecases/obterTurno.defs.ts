/// <mls fileReference="_102043_/l1/cafeFlow/layer_3_usecases/obterTurno.defs.ts" enhancement="_blank"/>

export const useCase = {
  "usecaseId": "obterTurno",
  "title": "Obter turno",
  "purpose": "Retorna detalhes de um turno específico.",
  "actor": "gerente",
  "layer": "layer_3_usecases",
  "inputEntities": [
    "TurnoEntity"
  ],
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
