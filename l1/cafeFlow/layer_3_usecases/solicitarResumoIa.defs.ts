/// <mls fileReference="_102043_/l1/cafeFlow/layer_3_usecases/solicitarResumoIa.defs.ts" enhancement="_blank"/>

export const useCase = {
  "usecaseId": "solicitarResumoIa",
  "title": "Solicitar resumo IA",
  "purpose": "Solicita insights baseados em métricas consolidadas ao assistente IA.",
  "actor": "gerente",
  "layer": "layer_3_usecases",
  "inputEntities": [
    "AiInsightEntity"
  ],
  "outputEntities": [
    "AiInsightEntity"
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
  "writesTables": [
    {
      "tableName": "ai_insight_request",
      "ownership": "moduleOwned"
    }
  ],
  "rulesApplied": [
    "aiInsightsUseMetrics"
  ],
  "entityRefs": [
    "AiInsightEntity",
    "EstoqueEntity",
    "PedidoEntity",
    "TurnoEntity"
  ]
} as const;

export default useCase;
