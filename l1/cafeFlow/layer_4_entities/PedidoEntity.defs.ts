/// <mls fileReference="_102043_/l1/cafeFlow/layer_4_entities/PedidoEntity.defs.ts" enhancement="_blank"/>

export const entity = {
  "entityId": "PedidoEntity",
  "title": "Entidade de Pedido",
  "purpose": "Agrega pedidos e itens do pedido, responsável pelo ciclo de vida do pedido e atualização das métricas de vendas.",
  "layer": "layer_4_entities",
  "fields": [
    {
      "fieldId": "orderId",
      "type": "uuid",
      "required": true,
      "description": "Identificador único do pedido."
    },
    {
      "fieldId": "dailyShiftId",
      "type": "DailyShift",
      "required": true,
      "description": "Referência ao turno diário ao qual o pedido pertence."
    },
    {
      "fieldId": "status",
      "type": "string",
      "required": true,
      "description": "Status atual do pedido.",
      "enum": [
        "recebido",
        "preparando",
        "pronto",
        "entregue",
        "cancelado"
      ]
    },
    {
      "fieldId": "serviceType",
      "type": "string",
      "required": true,
      "description": "Tipo de atendimento do pedido (mesa ou takeout).",
      "enum": [
        "mesa",
        "takeout"
      ]
    },
    {
      "fieldId": "tableNumber",
      "type": "string",
      "required": false,
      "description": "Número/identificador da mesa quando o atendimento é em mesa."
    },
    {
      "fieldId": "notes",
      "type": "text",
      "required": false,
      "description": "Observações gerais do pedido."
    },
    {
      "fieldId": "createdAt",
      "type": "datetime",
      "required": true,
      "description": "Data e hora de criação do pedido."
    },
    {
      "fieldId": "updatedAt",
      "type": "datetime",
      "required": true,
      "description": "Data e hora da última atualização do pedido."
    }
  ],
  "statusEnum": [
    "recebido",
    "preparando",
    "pronto",
    "entregue",
    "cancelado"
  ],
  "lifecycleStates": [
    "recebido",
    "preparando",
    "pronto",
    "entregue",
    "cancelado"
  ],
  "sourceTables": [
    {
      "tableName": "order",
      "ownership": "moduleOwned"
    },
    {
      "tableName": "daily_sales_metrics",
      "ownership": "moduleOwned"
    },
    {
      "tableName": "top_selling_items_metrics",
      "ownership": "moduleOwned"
    }
  ],
  "storage": [
    {
      "kind": "moduleTable",
      "tableId": "order",
      "tableName": "order",
      "fileRef": "_102043_/l1/cafeFlow/layer_1_external/order.defs.ts"
    },
    {
      "kind": "metricTable",
      "metricTableId": "dailySalesMetrics",
      "tableName": "daily_sales_metrics",
      "fileRef": "_102043_/l1/cafeFlow/layer_1_external/dailySalesMetrics.defs.ts"
    },
    {
      "kind": "metricTable",
      "metricTableId": "topSellingItemsMetrics",
      "tableName": "top_selling_items_metrics",
      "fileRef": "_102043_/l1/cafeFlow/layer_1_external/topSellingItemsMetrics.defs.ts"
    }
  ],
  "allowedOperations": [
    "create",
    "read",
    "update",
    "list",
    "search"
  ],
  "rulesApplied": [
    "orderStatusLifecycle",
    "kitchenStatusUpdates",
    "shiftMustBeOpenForOrders",
    "inventoryDecrementPolicy"
  ],
  "usecaseRefs": [
    "criarPedido",
    "adicionarItemPedido",
    "atualizarStatusPedido",
    "listarPedidos",
    "listarPedidosCozinha",
    "obterPedido",
    "fecharTurno",
    "solicitarResumoIa",
    "consultarDashboard"
  ],
  "materialization": {
    "fileName": "layer_4_entities/PedidoEntity.ts",
    "className": "PedidoEntity",
    "contractName": "IPedidoEntity"
  }
} as const;

export default entity;
