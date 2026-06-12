/// <mls fileReference="_102043_/l1/cafeFlow/layer_1_external/dailySalesMetrics.defs.ts" enhancement="_blank"/>

export const dailySalesMetricsMetricTableDefinition = {
  "schemaVersion": "2026-06-06",
  "artifactType": "metricTable",
  "artifactId": "dailySalesMetrics",
  "moduleName": "cafeFlow",
  "status": "draft",
  "source": {
    "agentName": "agentPlanMetricTableDefinition",
    "stepId": 56,
    "planId": ""
  },
  "data": {
    "metricTableDefinition": {
      "metricTableId": "dailySalesMetrics",
      "tableName": "daily_sales_metrics",
      "moduleId": "cafeFlow",
      "title": "Tabela de métricas: Vendas do dia",
      "purpose": "Consolidar métricas de vendas por turno e período.",
      "tableKind": "metricTimeseries",
      "storageEngine": "postgresTimescaleDB",
      "layer": "layer_1_external",
      "timeColumn": "event_time",
      "columns": [
        {
          "name": "event_time",
          "type": "timestamptz",
          "nullable": false,
          "description": "Momento do evento agregado para a métrica."
        },
        {
          "name": "shift_id",
          "type": "text",
          "nullable": false,
          "description": "Identificador do turno diário."
        },
        {
          "name": "order_id",
          "type": "text",
          "nullable": false,
          "description": "Identificador do pedido."
        },
        {
          "name": "menu_item_id",
          "type": "text",
          "nullable": true,
          "description": "Identificador do item do cardápio."
        },
        {
          "name": "category_id",
          "type": "text",
          "nullable": true,
          "description": "Identificador da categoria do cardápio."
        },
        {
          "name": "order_item_id",
          "type": "text",
          "nullable": true,
          "description": "FK dimension derived from ontology relationship orderToOrderItem (Order -> OrderItem)"
        },
        {
          "name": "daily_shift_id",
          "type": "text",
          "nullable": false,
          "description": "FK dimension derived from ontology relationship orderToDailyShift (Order -> DailyShift)"
        },
        {
          "name": "shift_closing_report_id",
          "type": "text",
          "nullable": true,
          "description": "FK dimension derived from ontology relationship shiftToClosingReport (DailyShift -> ShiftClosingReport)"
        },
        {
          "name": "total_revenue",
          "type": "numeric",
          "nullable": false,
          "default": 0,
          "description": "Receita total gerada."
        },
        {
          "name": "order_count",
          "type": "integer",
          "nullable": false,
          "default": 0,
          "description": "Quantidade de pedidos."
        },
        {
          "name": "items_sold",
          "type": "integer",
          "nullable": false,
          "default": 0,
          "description": "Quantidade total de itens vendidos."
        },
        {
          "name": "average_ticket",
          "type": "numeric",
          "nullable": true,
          "description": "Ticket médio por pedido."
        }
      ],
      "dimensions": [
        {
          "dimensionId": "shiftId",
          "column": "shift_id",
          "type": "string",
          "description": "Identificador do turno diário."
        },
        {
          "dimensionId": "orderId",
          "column": "order_id",
          "type": "string",
          "description": "Identificador do pedido."
        },
        {
          "dimensionId": "menuItemId",
          "column": "menu_item_id",
          "type": "string",
          "description": "Identificador do item do cardápio."
        },
        {
          "dimensionId": "categoryId",
          "column": "category_id",
          "type": "string",
          "description": "Identificador da categoria do cardápio."
        },
        {
          "dimensionId": "orderItemId",
          "column": "order_item_id",
          "type": "text",
          "description": "FK dimension derived from ontology relationship orderToOrderItem (Order -> OrderItem)"
        },
        {
          "dimensionId": "dailyShiftId",
          "column": "daily_shift_id",
          "type": "text",
          "description": "FK dimension derived from ontology relationship orderToDailyShift (Order -> DailyShift)"
        },
        {
          "dimensionId": "shiftClosingReportId",
          "column": "shift_closing_report_id",
          "type": "text",
          "description": "FK dimension derived from ontology relationship shiftToClosingReport (DailyShift -> ShiftClosingReport)"
        }
      ],
      "measures": [
        {
          "measureId": "totalRevenue",
          "column": "total_revenue",
          "aggregation": "sum",
          "unit": "BRL",
          "description": "Receita total gerada."
        },
        {
          "measureId": "orderCount",
          "column": "order_count",
          "aggregation": "count",
          "unit": "orders",
          "description": "Quantidade de pedidos."
        },
        {
          "measureId": "itemsSold",
          "column": "items_sold",
          "aggregation": "sum",
          "unit": "items",
          "description": "Quantidade total de itens vendidos."
        },
        {
          "measureId": "averageTicket",
          "column": "average_ticket",
          "aggregation": "avg",
          "unit": "BRL",
          "description": "Ticket médio por pedido."
        }
      ],
      "sourceWriteEvents": [
        "orderCreated",
        "orderItemAdded",
        "orderStatusUpdated",
        "shiftClosed"
      ],
      "hypertable": {
        "timeColumn": "event_time",
        "chunkTimeInterval": "1 day",
        "retentionPolicy": "1 year",
        "indexes": [
          {
            "indexName": "idx_daily_sales_metrics_event_time_shift",
            "columns": [
              "event_time",
              "shift_id"
            ],
            "purpose": "Consultas por período e turno."
          },
          {
            "indexName": "idx_daily_sales_metrics_order_id",
            "columns": [
              "order_id",
              "event_time"
            ],
            "purpose": "Consulta por pedido no recorte temporal."
          },
          {
            "indexName": "idx_daily_sales_metrics_menu_item_id",
            "columns": [
              "menu_item_id",
              "event_time"
            ],
            "purpose": "Consultas por item do cardápio ao longo do tempo."
          },
          {
            "indexName": "idx_daily_sales_metrics_category_id",
            "columns": [
              "category_id",
              "event_time"
            ],
            "purpose": "Consultas por categoria ao longo do tempo."
          },
          {
            "indexName": "idx_daily_sales_metrics_daily_shift_id",
            "columns": [
              "daily_shift_id",
              "event_time"
            ],
            "purpose": "Consultas por turno diário ao longo do tempo."
          },
          {
            "indexName": "idx_daily_sales_metrics_order_item_id",
            "columns": [
              "order_item_id",
              "event_time"
            ],
            "purpose": "Consultas por item do pedido ao longo do tempo."
          },
          {
            "indexName": "idx_daily_sales_metrics_shift_closing_report_id",
            "columns": [
              "shift_closing_report_id",
              "event_time"
            ],
            "purpose": "Consultas por relatório de fechamento ao longo do tempo."
          }
        ]
      },
      "updatePolicy": {
        "updatedByLayer": "layer_3_usecases",
        "pagesMayUpdate": false,
        "controllersMayUpdate": false
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
        "orderStatusLifecycle",
        "shiftCloseRequiresOrders"
      ]
    },
    "defsPlan": {
      "fileName": "tables/dailySalesMetrics.defs.ts",
      "exportName": "dailySalesMetricsMetricTableDefinition",
      "saveAsDefs": true
    }
  }
} as const;

export default dailySalesMetricsMetricTableDefinition;
