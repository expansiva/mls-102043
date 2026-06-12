/// <mls fileReference="_102043_/l1/cafeFlow/layer_3_usecases/fecharTurno.defs.ts" enhancement="_blank"/>

export const useCase = {
  "usecaseId": "fecharTurno",
  "title": "Fechar turno diário",
  "purpose": "Consolida o turno, gera relatório e atualiza métricas de vendas.",
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
    },
    {
      "tableName": "order",
      "ownership": "moduleOwned"
    }
  ],
  "writesTables": [
    {
      "tableName": "daily_shift",
      "ownership": "moduleOwned"
    },
    {
      "tableName": "daily_sales_metrics",
      "ownership": "moduleOwned"
    }
  ],
  "rulesApplied": [
    "shiftCloseRequiresOrders",
    "shiftMustBeOpenForOrders"
  ],
  "entityRefs": [
    "PedidoEntity",
    "TurnoEntity"
  ]
} as const;

export default useCase;
