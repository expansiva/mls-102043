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
        "ruleId": "orderStatusTransition",
        "title": "Transições válidas de status do pedido",
        "description": "Pedidos seguem o fluxo Recebido → Em preparo → Pronto → Entregue, podendo cancelar antes de Entregue.",
        "appliesTo": [
          "Order",
          "OrderStatusHistory"
        ],
        "layer": "layer_1"
      },
      {
        "ruleId": "orderRequiresItem",
        "title": "Pedido deve ter itens",
        "description": "Um pedido só pode ser confirmado se houver ao menos um item.",
        "appliesTo": [
          "Order",
          "OrderItem"
        ],
        "layer": "layer_1"
      },
      {
        "ruleId": "shiftClosureRequiresNoOpenOrders",
        "title": "Fechamento de turno exige pedidos finalizados",
        "description": "Não permitir fechar turno com pedidos em Recebido ou Em preparo.",
        "appliesTo": [
          "Shift",
          "Order"
        ],
        "layer": "layer_3"
      },
      {
        "ruleId": "lowStockThresholdRule",
        "title": "Regra de estoque baixo",
        "description": "Gerar alerta quando nível de estoque ficar abaixo do mínimo definido.",
        "appliesTo": [
          "StockItem",
          "LowStockAlert",
          "StockMovement"
        ],
        "layer": "layer_3"
      },
      {
        "ruleId": "salesSummaryUsesLast7Days",
        "title": "Resumo de vendas usa últimos 7 dias",
        "description": "Resumo e sugestões devem considerar métricas dos últimos 7 dias.",
        "appliesTo": [
          "SalesSummaryRequest"
        ],
        "layer": "layer_3"
      },
      {
        "ruleId": "menuItemRequiresCategory",
        "title": "Item do cardápio deve ter categoria",
        "description": "Todo item do cardápio deve estar associado a uma categoria ativa.",
        "appliesTo": [
          "MenuItem",
          "MenuCategory"
        ],
        "layer": "layer_1"
      }
    ]
  }
} as const;

export default rulesPlan;
