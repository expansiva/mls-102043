/// <mls fileReference="_102043_/l1/cafeFlow/layer_3_usecases/usecaseAtualizarStatusPedido.defs.ts" enhancement="_blank"/>

export const usecaseAtualizarStatusPedidoUsecasePlan = {
  "schemaVersion": "2026-06-06",
  "artifactType": "usecase",
  "artifactId": "usecaseAtualizarStatusPedido",
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
      "usecaseId": "usecaseAtualizarStatusPedido",
      "title": "Atualizar Status do Pedido",
      "purpose": "Transicionar status do pedido (Novo → Em preparo → Pronto → Entregue) e atualizar ticket de cozinha.",
      "actor": "cozinha",
      "layer": "layer_3_usecases",
      "inputEntities": [
        "orderAggregateEntity"
      ],
      "outputEntities": [
        "orderAggregateEntity"
      ],
      "readsTables": [
        {
          "tableName": "order_aggregate",
          "ownership": "moduleOwned"
        }
      ],
      "writesTables": [
        {
          "tableName": "order_aggregate",
          "ownership": "moduleOwned"
        }
      ],
      "commands": [
        "updateOrderStatusPreparing",
        "updateOrderStatusReady",
        "updateOrderStatusDelivered"
      ],
      "rulesApplied": [
        "rule-order-status-transition"
      ]
    }
  },
  "implementation": {
    "functionName": "updateOrderStatusPreparing",
    "inputTypeName": "UpdateOrderStatusPreparingInput",
    "outputTypeName": "OrderAggregate",
    "inputTypeDefinition": "export interface UpdateOrderStatusPreparingInput {\n  orderId: string;\n}",
    "outputTypeDefinition": "export interface OrderAggregate {\n  orderId: string;\n  status: OrderStatus;\n  kitchenTicketStatus?: KitchenTicketStatus;\n  updatedAt?: string;\n}"
  }
} as const;

export default usecaseAtualizarStatusPedidoUsecasePlan;
