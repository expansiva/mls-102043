/// <mls fileReference="_102043_/l1/cafeFlow/layer_3_usecases/consultarDashboardGerente.defs.ts" enhancement="_blank"/>

export const useCase = {
  "usecaseId": "consultarDashboardGerente",
  "title": "Consultar dashboard do gerente",
  "purpose": "Consultar métricas de vendas, itens mais vendidos e estoque baixo.",
  "actor": "gerente",
  "layer": "layer_3_usecases",
  "inputEntities": [
    "metricasEntity"
  ],
  "outputEntities": [
    "metricasEntity"
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
    }
  ],
  "writesTables": [],
  "rulesApplied": [],
  "entityRefs": [
    "metricasEntity"
  ],
  "commands": [
    {
      "commandId": "consultarDashboardGerente",
      "input": [],
      "output": [
        {
          "name": "metricas",
          "type": "metricasEntity"
        }
      ]
    }
  ]
} as const;

export default useCase;
