/// <mls fileReference="_102043_/l1/cafeFlow/layer_1_external/topSellingItemsMetrics.defs.ts" enhancement="_blank"/>

export const topSellingItemsMetricsTableDefinition = {
  "schemaVersion": "2026-06-06",
  "artifactType": "metricTable",
  "artifactId": "topSellingItemsMetrics",
  "moduleName": "cafeFlow",
  "status": "draft",
  "source": {
    "agentName": "agentPlanMetricTableDefinition",
    "stepId": 50,
    "planId": ""
  },
  "data": {
    "metricTableDefinition": {
      "metricTableId": "topSellingItemsMetrics",
      "tableName": "top_selling_items_metrics",
      "moduleId": "cafeFlow",
      "title": "Itens mais vendidos",
      "purpose": "Identificar os produtos com maior saída e receita para otimização de cardápio e compras.",
      "tableKind": "metricTimeseries",
      "storageEngine": "postgresTimescaleDB",
      "layer": "layer_1_external",
      "timeColumn": "time",
      "columns": [
        {
          "name": "time",
          "type": "timestamptz",
          "nullable": false,
          "description": "Timestamp da métrica agregada."
        },
        {
          "name": "order_id",
          "type": "uuid",
          "nullable": false,
          "description": "Pedido de origem do item"
        },
        {
          "name": "menu_item_id",
          "type": "uuid",
          "nullable": false,
          "description": "Item do cardápio vendido"
        },
        {
          "name": "menu_category_id",
          "type": "uuid",
          "nullable": false,
          "description": "Categoria do item no cardápio"
        },
        {
          "name": "shift_id",
          "type": "uuid",
          "nullable": false,
          "description": "Turno em que o item foi vendido"
        },
        {
          "name": "stock_item_id",
          "type": "text",
          "nullable": true,
          "description": "FK dimension derived from ontology relationship menuItemUsesStockItem (MenuItem -> StockItem)"
        },
        {
          "name": "order_item_id",
          "type": "text",
          "nullable": true,
          "description": "FK dimension derived from ontology relationship orderHasItems (Order -> OrderItem)"
        },
        {
          "name": "order_status_history_id",
          "type": "text",
          "nullable": true,
          "description": "FK dimension derived from ontology relationship orderHasStatusHistory (Order -> OrderStatusHistory)"
        },
        {
          "name": "shift_report_id",
          "type": "text",
          "nullable": true,
          "description": "FK dimension derived from ontology relationship shiftHasReport (Shift -> ShiftReport)"
        },
        {
          "name": "shift_config_id",
          "type": "text",
          "nullable": true,
          "description": "FK dimension derived from ontology relationship shiftUsesConfig (Shift -> ShiftConfig)"
        },
        {
          "name": "quantity_sold",
          "type": "integer",
          "nullable": false,
          "default": 0,
          "description": "Quantidade vendida do item"
        },
        {
          "name": "item_revenue",
          "type": "numeric",
          "nullable": false,
          "default": 0,
          "description": "Receita gerada pelo item"
        },
        {
          "name": "order_count",
          "type": "integer",
          "nullable": false,
          "default": 0,
          "description": "Número de pedidos contendo o item"
        }
      ],
      "dimensions": [
        {
          "dimensionId": "orderId",
          "column": "order_id",
          "type": "uuid",
          "description": "Pedido de origem do item"
        },
        {
          "dimensionId": "menuItemId",
          "column": "menu_item_id",
          "type": "uuid",
          "description": "Item do cardápio vendido"
        },
        {
          "dimensionId": "menuCategoryId",
          "column": "menu_category_id",
          "type": "uuid",
          "description": "Categoria do item no cardápio"
        },
        {
          "dimensionId": "shiftId",
          "column": "shift_id",
          "type": "uuid",
          "description": "Turno em que o item foi vendido"
        },
        {
          "dimensionId": "stockItemId",
          "column": "stock_item_id",
          "type": "text",
          "description": "FK dimension derived from ontology relationship menuItemUsesStockItem (MenuItem -> StockItem)"
        },
        {
          "dimensionId": "orderItemId",
          "column": "order_item_id",
          "type": "text",
          "description": "FK dimension derived from ontology relationship orderHasItems (Order -> OrderItem)"
        },
        {
          "dimensionId": "orderStatusHistoryId",
          "column": "order_status_history_id",
          "type": "text",
          "description": "FK dimension derived from ontology relationship orderHasStatusHistory (Order -> OrderStatusHistory)"
        },
        {
          "dimensionId": "shiftReportId",
          "column": "shift_report_id",
          "type": "text",
          "description": "FK dimension derived from ontology relationship shiftHasReport (Shift -> ShiftReport)"
        },
        {
          "dimensionId": "shiftConfigId",
          "column": "shift_config_id",
          "type": "text",
          "description": "FK dimension derived from ontology relationship shiftUsesConfig (Shift -> ShiftConfig)"
        }
      ],
      "measures": [
        {
          "measureId": "quantitySold",
          "column": "quantity_sold",
          "aggregation": "sum",
          "unit": "count",
          "description": "Quantidade vendida do item"
        },
        {
          "measureId": "itemRevenue",
          "column": "item_revenue",
          "aggregation": "sum",
          "unit": "BRL",
          "description": "Receita gerada pelo item"
        },
        {
          "measureId": "orderCount",
          "column": "order_count",
          "aggregation": "sum",
          "unit": "count",
          "description": "Número de pedidos contendo o item"
        }
      ],
      "sourceWriteEvents": [
        "orderCreated",
        "orderStatusUpdated"
      ],
      "hypertable": {
        "timeColumn": "time",
        "chunkTimeInterval": "1 day",
        "retentionPolicy": "1 year",
        "compressionPolicy": "30 days",
        "indexes": [
          {
            "indexName": "idx_top_selling_items_metrics_time",
            "columns": [
              "time"
            ],
            "purpose": "Ordenação e retenção por tempo."
          },
          {
            "indexName": "idx_top_selling_items_metrics_time_menu_item",
            "columns": [
              "time",
              "menu_item_id"
            ],
            "purpose": "Ranking de itens por período."
          },
          {
            "indexName": "idx_top_selling_items_metrics_time_menu_category",
            "columns": [
              "time",
              "menu_category_id"
            ],
            "purpose": "Análise por categoria ao longo do tempo."
          },
          {
            "indexName": "idx_top_selling_items_metrics_time_shift",
            "columns": [
              "time",
              "shift_id"
            ],
            "purpose": "Comparação de vendas por turno."
          },
          {
            "indexName": "idx_top_selling_items_metrics_time_order",
            "columns": [
              "time",
              "order_id"
            ],
            "purpose": "Rastreio por pedido."
          },
          {
            "indexName": "idx_top_selling_items_metrics_stock_item",
            "columns": [
              "stock_item_id"
            ],
            "purpose": "Análise de consumo por insumo."
          },
          {
            "indexName": "idx_top_selling_items_metrics_order_item",
            "columns": [
              "order_item_id"
            ],
            "purpose": "Rastreio por item de pedido."
          },
          {
            "indexName": "idx_top_selling_items_metrics_order_status_history",
            "columns": [
              "order_status_history_id"
            ],
            "purpose": "Conciliação com transições de status."
          },
          {
            "indexName": "idx_top_selling_items_metrics_shift_report",
            "columns": [
              "shift_report_id"
            ],
            "purpose": "Vincular ao relatório de turno."
          },
          {
            "indexName": "idx_top_selling_items_metrics_shift_config",
            "columns": [
              "shift_config_id"
            ],
            "purpose": "Análise por configuração de turno."
          }
        ]
      },
      "updatePolicy": {
        "updatedByLayer": "layer_3_usecases",
        "pagesMayUpdate": false,
        "controllersMayUpdate": false,
        "usecaseRefs": [
          "registrarPedido",
          "atualizarStatusCozinha",
          "fecharTurno"
        ]
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
        "orderStatusTransition",
        "orderRequiresItem",
        "menuItemRequiresCategory"
      ]
    },
    "defsPlan": {
      "fileName": "tables/topSellingItemsMetrics.defs.ts",
      "exportName": "topSellingItemsMetricsTableDefinition",
      "saveAsDefs": true
    }
  }
} as const;

export default topSellingItemsMetricsTableDefinition;
