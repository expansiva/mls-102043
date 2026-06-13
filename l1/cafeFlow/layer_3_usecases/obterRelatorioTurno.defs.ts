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
