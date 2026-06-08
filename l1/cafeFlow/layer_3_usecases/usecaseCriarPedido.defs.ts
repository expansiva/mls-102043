/// <mls fileReference="_102043_/l1/cafeFlow/layer_3_usecases/usecaseCriarPedido.defs.ts" enhancement="_blank"/>

export const usecaseCriarPedidoUsecasePlan = {
  "schemaVersion": "2026-06-06",
  "artifactType": "usecase",
  "artifactId": "usecaseCriarPedido",
  "moduleName": "cafeFlow",
  "status": "draft",
  "source": {
    "agentName": "agentPlanUsecaseEntities",
    "stepId": 60,
    "planId": "plan-index-critic:usecasePlan:1"
  },
  "data": {
    "backendArchitecture": {
      "pattern": "layeredUsecaseDriven",
      "layer1Responsibility": "Definições de tabelas transacionais e de métricas (layer_1_external). Acesso direto apenas por layer_3_usecases.",
      "layer2Responsibility": "Controllers BFF que recebem comandos de páginas, workflows e agentes. Devem sempre delegar para usecases de layer_3.",
      "layer3Responsibility": "Usecases que encapsulam regras de negócio, leitura e escrita em tabelas de layer_1, e atualização de métricas."
    },
    "controllerRules": {
      "bffMustCallUsecases": true,
      "bffDirectTableAccessForbidden": true
    },
    "usecase": {
      "usecaseId": "usecaseCriarPedido",
      "title": "Criar Pedido",
      "purpose": "Registrar novo pedido com itens e criar ticket de cozinha para fila operacional.",
      "actor": "caixa",
      "layer": "layer_3_usecases",
      "inputEntities": [
        "orderAggregateEntity",
        "menuItemEntity"
      ],
      "outputEntities": [
        "orderAggregateEntity"
      ],
      "readsTables": [
        {
          "tableName": "MenuItem",
          "ownership": "mdmOwned"
        },
        {
          "tableName": "DailyShift",
          "ownership": "mdmOwned"
        }
      ],
      "writesTables": [
        {
          "tableName": "order_aggregate",
          "ownership": "moduleOwned"
        }
      ],
      "commands": [
        "createOrder",
        "addOrderItem",
        "sendToKitchen"
      ],
      "rulesApplied": [
        "rule-order-status-transition"
      ]
    }
  }
} as const;

export default usecaseCriarPedidoUsecasePlan;
