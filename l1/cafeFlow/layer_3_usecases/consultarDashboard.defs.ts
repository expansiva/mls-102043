/// <mls fileReference="_102043_/l1/cafeFlow/layer_3_usecases/consultarDashboard.defs.ts" enhancement="_blank"/>

export const useCase = {
  "usecaseId": "consultarDashboard",
  "title": "Consultar dashboard",
  "purpose": "Consolida métricas e dados operacionais para o dashboard do gerente.",
  "actor": "gerente",
  "layer": "layer_3_usecases",
  "inputEntities": [],
  "outputEntities": [
    "PedidoEntity",
    "EstoqueEntity",
    "TurnoEntity"
  ],
  "readsTables": [
    {
      "tableName": "daily_sales_metrics",
      "ownership": "moduleOwned"
    },
    {
      "tableName": "top_selling_items_metrics",
      "ownership": "moduleOwned"
    },
    {
      "tableName": "low_stock_metrics",
      "ownership": "moduleOwned"
    },
    {
      "tableName": "order",
      "ownership": "moduleOwned"
    },
    {
      "tableName": "daily_shift",
      "ownership": "moduleOwned"
    },
    {
      "tableName": "inventory_item",
      "ownership": "moduleOwned"
    }
  ],
  "writesTables": [],
  "rulesApplied": [],
  "entityRefs": [
    "EstoqueEntity",
    "PedidoEntity",
    "TurnoEntity"
  ]
} as const;

export default useCase;
