/// <mls fileReference="_102043_/l1/cafeFlow/layer_3_usecases/abrirTurno.defs.ts" enhancement="_blank"/>

export const useCase = {
  "usecaseId": "abrirTurno",
  "title": "Abrir turno diário",
  "purpose": "Inicia um novo turno de vendas.",
  "actor": "gerente",
  "layer": "layer_3_usecases",
  "inputEntities": [
    "TurnoEntity"
  ],
  "outputEntities": [
    "TurnoEntity"
  ],
  "readsTables": [],
  "writesTables": [
    {
      "tableName": "daily_shift",
      "ownership": "moduleOwned"
    }
  ],
  "rulesApplied": [],
  "entityRefs": [
    "TurnoEntity"
  ]
} as const;

export default useCase;
