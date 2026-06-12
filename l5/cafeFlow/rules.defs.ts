/// <mls fileReference="_102043_/l5/cafeFlow/rules.defs.ts" enhancement="_blank"/>

export const rulesPlan = {
  "schemaVersion": "2026-06-06",
  "artifactType": "rules",
  "artifactId": "cafeFlowRules",
  "moduleName": "cafeFlow",
  "status": "draft",
  "source": {
    "agentName": "agentFinalizeSolutionPlan",
    "stepId": 11,
    "planId": "plan-finalize-solution-plan"
  },
  "data": {
    "moduleName": "cafeFlow",
    "rules": [
      {
        "ruleId": "orderStatusLifecycle",
        "title": "Ciclo de vida do pedido",
        "description": "Pedido deve seguir o fluxo recebido → preparando → pronto → entregue/cancelado.",
        "appliesTo": [
          "Order"
        ],
        "layer": "layer_1"
      },
      {
        "ruleId": "kitchenStatusUpdates",
        "title": "Atualização de status pela cozinha",
        "description": "A cozinha só pode mover pedidos entre estados de preparo até pronto.",
        "appliesTo": [
          "Order",
          "OrderUsecase"
        ],
        "layer": "layer_3"
      },
      {
        "ruleId": "shiftMustBeOpenForOrders",
        "title": "Turno aberto para registrar pedidos",
        "description": "Pedidos só podem ser registrados quando existir um turno diário aberto.",
        "appliesTo": [
          "Order",
          "DailyShift",
          "OrderUsecase"
        ],
        "layer": "layer_3"
      },
      {
        "ruleId": "inventoryLowStockAlert",
        "title": "Alerta de estoque baixo",
        "description": "Itens de estoque abaixo do nível mínimo devem aparecer como alerta no dashboard.",
        "appliesTo": [
          "InventoryItem"
        ],
        "layer": "layer_2"
      },
      {
        "ruleId": "inventoryDecrementPolicy",
        "title": "Política de baixa de estoque pendente",
        "description": "Definir se a baixa de estoque ocorre no lançamento do pedido ou no fechamento do turno.",
        "appliesTo": [
          "InventoryItem",
          "Order",
          "InventoryAdjustmentUsecase"
        ],
        "layer": "layer_3"
      },
      {
        "ruleId": "shiftCloseRequiresOrders",
        "title": "Fechamento exige consolidação",
        "description": "O fechamento do turno consolida vendas do período e gera relatório.",
        "appliesTo": [
          "DailyShift",
          "ShiftClosingReport",
          "ShiftCloseUsecase"
        ],
        "layer": "layer_3"
      },
      {
        "ruleId": "aiInsightsUseMetrics",
        "title": "Insights IA usam métricas consolidadas",
        "description": "Resumo de vendas e sugestões devem usar métricas dos últimos 7 dias e vendas do dia.",
        "appliesTo": [
          "AiInsightRequest"
        ],
        "layer": "layer_2"
      }
    ]
  }
} as const;

export default rulesPlan;
