/// <mls fileReference="_102043_/l1/cafeFlow/layer_1_external/dailySalesMetrics.defs.ts" enhancement="_blank"/>

export const dailySalesMetricsMetricTableDefinition = {
  "schemaVersion": "2026-06-06",
  "artifactType": "metricTable",
  "artifactId": "dailySalesMetrics",
  "moduleName": "cafeFlow",
  "status": "draft",
  "source": {
    "agentName": "agentPlanMetricTableDefinition",
    "stepId": 54,
    "planId": "plan-metric-table-definition:dailySalesMetrics"
  },
  "data": {
    "metricTableDefinition": {
      "metricTableId": "dailySalesMetrics",
      "tableName": "daily_sales_metrics",
      "moduleId": "cafeFlow",
      "title": "Métricas de Vendas Diárias",
      "purpose": "Agregação diária e por turno de pedidos, itens e receita para acompanhamento operacional e fechamento.",
      "tableKind": "metricTimeseries",
      "storageEngine": "postgresTimescaleDB",
      "layer": "layer_1_external",
      "timeColumn": "bucket_time",
      "columns": [
        {
          "name": "bucket_time",
          "type": "timestamptz",
          "nullable": false,
          "description": "Timestamp do bucket de agregação."
        },
        {
          "name": "shift_id",
          "type": "string",
          "nullable": false,
          "description": "Identificador do turno diário."
        },
        {
          "name": "order_type",
          "type": "string",
          "nullable": false,
          "description": "Tipo do pedido: mesa ou takeout."
        },
        {
          "name": "total_orders",
          "type": "int",
          "nullable": false,
          "default": 0,
          "description": "Quantidade total de pedidos no período."
        },
        {
          "name": "total_items",
          "type": "int",
          "nullable": false,
          "default": 0,
          "description": "Quantidade total de itens vendidos no período."
        },
        {
          "name": "gross_amount",
          "type": "numeric(12,2)",
          "nullable": false,
          "default": 0,
          "description": "Valor bruto total no período."
        },
        {
          "name": "net_amount",
          "type": "numeric(12,2)",
          "nullable": false,
          "default": 0,
          "description": "Valor líquido total no período."
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
          "dimensionId": "orderType",
          "column": "order_type",
          "type": "string",
          "description": "Tipo do pedido: mesa ou takeout."
        }
      ],
      "measures": [
        {
          "measureId": "totalOrders",
          "column": "total_orders",
          "aggregation": "sum",
          "unit": "orders",
          "description": "Quantidade total de pedidos no período."
        },
        {
          "measureId": "totalItems",
          "column": "total_items",
          "aggregation": "sum",
          "unit": "items",
          "description": "Quantidade total de itens vendidos no período."
        },
        {
          "measureId": "grossAmount",
          "column": "gross_amount",
          "aggregation": "sum",
          "unit": "BRL",
          "description": "Valor bruto total no período."
        },
        {
          "measureId": "netAmount",
          "column": "net_amount",
          "aggregation": "sum",
          "unit": "BRL",
          "description": "Valor líquido total no período."
        }
      ],
      "sourceWriteEvents": [
        "orderCreated",
        "orderDelivered",
        "dailyShiftClosed"
      ],
      "hypertable": {
        "timeColumn": "bucket_time",
        "chunkTimeInterval": "1 day",
        "retentionPolicy": "1 year",
        "compressionPolicy": "30 days",
        "indexes": [
          {
            "indexName": "idx_daily_sales_metrics_bucket_time",
            "columns": [
              "bucket_time"
            ],
            "purpose": "Ordenação e recortes por tempo."
          },
          {
            "indexName": "idx_daily_sales_metrics_shift_time",
            "columns": [
              "shift_id",
              "bucket_time"
            ],
            "purpose": "Filtros por turno e período."
          },
          {
            "indexName": "idx_daily_sales_metrics_order_type_time",
            "columns": [
              "order_type",
              "bucket_time"
            ],
            "purpose": "Filtros por tipo de pedido e período."
          }
        ]
      },
      "updatePolicy": {
        "updatedByLayer": "layer_3_usecases",
        "pagesMayUpdate": false,
        "controllersMayUpdate": false,
        "usecaseRefs": [
          "usecaseCalcularMetricasDashboard",
          "usecaseFecharTurno"
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
      "rulesApplied": []
    },
    "defsPlan": {
      "fileName": "tables/dailySalesMetrics.defs.ts",
      "exportName": "dailySalesMetricsMetricTableDefinition",
      "saveAsDefs": true
    }
  }
} as const;

export default dailySalesMetricsMetricTableDefinition;
