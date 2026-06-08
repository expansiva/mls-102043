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
        "ruleId": "rule-order-status-transition",
        "title": "Transições de status do pedido",
        "description": "Um pedido deve seguir a sequência Novo → Em preparo → Pronto → Entregue, sem pular estados.",
        "appliesTo": [
          "Order",
          "KitchenTicket"
        ],
        "layer": "layer_3"
      },
      {
        "ruleId": "rule-stock-deduct-by-ingredient",
        "title": "Baixa de estoque por ingrediente",
        "description": "A confirmação de itens do pedido deve baixar o estoque de ingredientes conforme a receita do item.",
        "appliesTo": [
          "Order",
          "OrderItem",
          "StockItem",
          "RecipeLine"
        ],
        "layer": "layer_3"
      },
      {
        "ruleId": "rule-low-stock-alert",
        "title": "Alerta de estoque baixo",
        "description": "Quando a quantidade disponível do ingrediente ficar abaixo do nível mínimo, gerar alerta no dashboard.",
        "appliesTo": [
          "StockItem"
        ],
        "layer": "layer_2"
      },
      {
        "ruleId": "rule-shift-close-required",
        "title": "Fechamento de turno obrigatório",
        "description": "O turno diário deve ser fechado com geração de relatório antes de iniciar um novo fechamento para o mesmo período.",
        "appliesTo": [
          "DailyShift",
          "SalesSummary"
        ],
        "layer": "layer_3"
      },
      {
        "ruleId": "rule-menuitem-recipe-required",
        "title": "Receita obrigatória para baixa automática",
        "description": "Itens do cardápio vendidos devem ter linhas de receita vinculadas para permitir baixa por ingrediente.",
        "appliesTo": [
          "MenuItem",
          "RecipeLine"
        ],
        "layer": "layer_2"
      }
    ]
  }
} as const;

export default rulesPlan;
