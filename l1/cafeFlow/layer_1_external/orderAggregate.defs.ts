/// <mls fileReference="_102043_/l1/cafeFlow/layer_1_external/orderAggregate.defs.ts" enhancement="_blank"/>

export const orderAggregateTableDefinition = {
  "schemaVersion": "2026-06-06",
  "artifactType": "table",
  "artifactId": "orderAggregate",
  "moduleName": "cafeFlow",
  "status": "draft",
  "source": {
    "agentName": "agentPlanTableDefinition",
    "stepId": 40,
    "planId": "plan-table-definition:orderAggregate"
  },
  "data": {
    "tableDefinition": {
      "tableId": "orderAggregate",
      "tableName": "order_aggregate",
      "moduleId": "cafeFlow",
      "title": "Pedidos com itens e ticket de cozinha",
      "purpose": "Persistir pedidos do POS com itens associados e estado operacional da cozinha em um agregado único para leitura rápida da fila e do POS.",
      "ownership": "moduleOwned",
      "rootEntity": "Order",
      "layer": "layer_1_external",
      "tableKind": "transactional",
      "columns": [
        {
          "name": "order_id",
          "type": "uuid",
          "nullable": false,
          "primaryKey": true,
          "description": "Identificador do pedido."
        },
        {
          "name": "order_number",
          "type": "string",
          "nullable": false,
          "description": "Número sequencial visível no POS e na cozinha."
        },
        {
          "name": "order_type",
          "type": "string",
          "nullable": false,
          "description": "Tipo do pedido: mesa ou takeout."
        },
        {
          "name": "table_number",
          "type": "string",
          "nullable": true,
          "description": "Número da mesa quando aplicável."
        },
        {
          "name": "status",
          "type": "string",
          "nullable": false,
          "description": "Status do pedido (Novo, Em preparo, Pronto, Entregue)."
        },
        {
          "name": "kitchen_priority",
          "type": "string",
          "nullable": true,
          "description": "Prioridade operacional do ticket de cozinha."
        },
        {
          "name": "total_amount",
          "type": "number",
          "nullable": false,
          "description": "Valor total do pedido."
        },
        {
          "name": "item_count",
          "type": "number",
          "nullable": false,
          "description": "Quantidade total de itens no pedido."
        },
        {
          "name": "shift_id",
          "type": "uuid",
          "nullable": true,
          "description": "Identificador do turno diário associado."
        },
        {
          "name": "created_at",
          "type": "timestamp",
          "nullable": false,
          "description": "Data/hora de criação do pedido."
        },
        {
          "name": "updated_at",
          "type": "timestamp",
          "nullable": false,
          "description": "Data/hora da última atualização."
        },
        {
          "name": "closed_at",
          "type": "timestamp",
          "nullable": true,
          "description": "Data/hora de fechamento/entrega do pedido."
        }
      ],
      "primaryKey": [
        "order_id"
      ],
      "foreignRefs": [
        {
          "fieldName": "shift_id",
          "targetEntity": "DailyShift",
          "targetOwnership": "mdmOwned",
          "reason": "Vincular pedido ao turno diário para relatórios operacionais."
        }
      ],
      "indexes": [
        {
          "indexName": "idx_order_aggregate_status_created_at",
          "columns": [
            "status",
            "created_at"
          ],
          "unique": false,
          "reason": "Fila operacional e filtros por status e data no painel da cozinha."
        },
        {
          "indexName": "idx_order_aggregate_created_at",
          "columns": [
            "created_at"
          ],
          "unique": false,
          "reason": "Consultas do POS e métricas por período."
        },
        {
          "indexName": "idx_order_aggregate_order_number",
          "columns": [
            "order_number"
          ],
          "unique": true,
          "reason": "Busca rápida por número do pedido no POS."
        },
        {
          "indexName": "idx_order_aggregate_shift_id",
          "columns": [
            "shift_id"
          ],
          "unique": false,
          "reason": "Agregações por turno diário para métricas."
        }
      ],
      "detailsColumn": {
        "enabled": true,
        "columnName": "details",
        "jsonSchemaRef": "orderAggregateDetails",
        "reason": "Armazenar itens do pedido e ticket de cozinha sem ciclo de vida independente."
      },
      "metricUpdatePolicy": {
        "feedsMetrics": true,
        "metricRefs": [
          "dashboardOperacionalDiario",
          "itensMaisVendidos"
        ],
        "updatedByLayer": "layer_3_usecases"
      },
      "accessPolicy": {
        "directAccessAllowedFor": [
          "layer_3_usecases"
        ],
        "forbiddenFor": [
          "pages",
          "layer_2_controllers",
          "agents"
        ]
      },
      "rulesApplied": [
        "rule-order-status-transition",
        "rule-stock-deduct-by-ingredient"
      ]
    },
    "defsPlan": {
      "fileName": "tables/orderAggregate.defs.ts",
      "exportName": "orderAggregateTableDefinition",
      "saveAsDefs": true
    }
  }
} as const;

export default orderAggregateTableDefinition;
