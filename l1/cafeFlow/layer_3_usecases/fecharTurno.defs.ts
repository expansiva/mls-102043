/// <mls fileReference="_102043_/l1/cafeFlow/layer_3_usecases/fecharTurno.defs.ts" enhancement="_blank"/>

export const useCase = {
  "usecaseId": "fecharTurno",
  "title": "Fechar turno",
  "purpose": "Encerrar o turno e gerar relatório de fechamento.",
  "actor": "gerente",
  "layer": "layer_3_usecases",
  "inputEntities": [
    "turnoEntity",
    "pedidoEntity"
  ],
  "outputEntities": [
    "turnoEntity"
  ],
  "readsTables": [
    {
      "tableName": "shifts",
      "ownership": "moduleOwned"
    },
    {
      "tableName": "orders",
      "ownership": "moduleOwned"
    }
  ],
  "writesTables": [
    {
      "tableName": "shifts",
      "ownership": "moduleOwned"
    },
    {
      "tableName": "shift_reports",
      "ownership": "moduleOwned"
    },
    {
      "tableName": "daily_sales_metrics",
      "ownership": "moduleOwned"
    }
  ],
  "rulesApplied": [
    "shiftClosureRequiresNoOpenOrders"
  ],
  "entityRefs": [
    "metricasEntity",
    "pedidoEntity",
    "turnoEntity"
  ],
  "commands": [
    {
      "commandId": "fecharTurno",
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
        },
        {
          "name": "status",
          "type": "string"
        }
      ]
    }
  ]
} as const;

export default useCase;

