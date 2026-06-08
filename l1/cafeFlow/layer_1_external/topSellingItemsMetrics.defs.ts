/// <mls fileReference="_102043_/l1/cafeFlow/layer_1_external/topSellingItemsMetrics.defs.ts" enhancement="_blank"/>

export const topSellingItemsMetricsTableDefinition = {
  "schemaVersion": "2026-06-06",
  "artifactType": "metricTable",
  "artifactId": "topSellingItemsMetrics",
  "moduleName": "cafeFlow",
  "status": "draft",
  "source": {
    "agentName": "agentPlanMetricTableDefinition",
    "stepId": 56,
    "planId": "plan-metric-table-definition:topSellingItemsMetrics"
  },
  "data": {
    "metricTableDefinition": {
      "metricTableId": "topSellingItemsMetrics",
      "tableName": "top_selling_items_metrics",
      "moduleId": "cafeFlow",
      "title": "Métricas de Itens Mais Vendidos",
      "purpose": "Ranking de vendas por item do cardápio para identificar destaques e apoiar sugestões de promoção.",
      "tableKind": "metricTimeseries",
      "storageEngine": "postgresTimescaleDB",
      "layer": "layer_1_external",
      "timeColumn": "bucket_time",
      "columns": [
        {
          "name": "bucket_time",
          "type": "timestamptz",
          "nullable": false,
          "description": "Início do bucket temporal de agregação."
        },
        {
          "name": "menu_item_id",
          "type": "text",
          "nullable": false,
          "description": "Identificador do item do cardápio."
        },
        {
          "name": "menu_item_name",
          "type": "text",
          "nullable": false,
          "description": "Nome do item do cardápio."
        },
        {
          "name": "category",
          "type": "text",
          "nullable": true,
          "description": "Categoria do item no cardápio."
        },
        {
          "name": "quantity_sold",
          "type": "bigint",
          "nullable": false,
          "default": 0,
          "description": "Quantidade vendida do item no período."
        },
        {
          "name": "revenue",
          "type": "numeric(12,2)",
          "nullable": false,
          "default": 0,
          "description": "Receita gerada pelo item no período."
        }
      ],
      "dimensions": [
        {
          "dimensionId": "menuItemId",
          "column": "menu_item_id",
          "type": "string",
          "description": "Identificador do item do cardápio."
        },
        {
          "dimensionId": "menuItemName",
          "column": "menu_item_name",
          "type": "string",
          "description": "Nome do item do cardápio."
        },
        {
          "dimensionId": "category",
          "column": "category",
          "type": "string",
          "description": "Categoria do item no cardápio."
        }
      ],
      "measures": [
        {
          "measureId": "quantitySold",
          "column": "quantity_sold",
          "aggregation": "sum",
          "unit": "units",
          "description": "Quantidade vendida do item no período."
        },
        {
          "measureId": "revenue",
          "column": "revenue",
          "aggregation": "sum",
          "unit": "BRL",
          "description": "Receita gerada pelo item no período."
        }
      ],
      "sourceWriteEvents": [
        "orderCreated",
        "orderDelivered",
        "orderItemAdded"
      ],
      "hypertable": {
        "timeColumn": "bucket_time",
        "chunkTimeInterval": "7 days",
        "retentionPolicy": "1 year",
        "compressionPolicy": "30 days",
        "indexes": [
          {
            "indexName": "idx_top_selling_items_metrics_bucket_time",
            "columns": [
              "bucket_time"
            ],
            "purpose": "Acelerar consultas por período no TimescaleDB."
          },
          {
            "indexName": "idx_top_selling_items_metrics_menu_item_time",
            "columns": [
              "menu_item_id",
              "bucket_time"
            ],
            "purpose": "Ranking e séries temporais por item do cardápio."
          },
          {
            "indexName": "idx_top_selling_items_metrics_category_time",
            "columns": [
              "category",
              "bucket_time"
            ],
            "purpose": "Filtros por categoria e período."
          }
        ]
      },
      "updatePolicy": {
        "updatedByLayer": "layer_3_usecases",
        "pagesMayUpdate": false,
        "controllersMayUpdate": false,
        "usecaseRefs": [
          "usecaseCalcularMetricasDashboard"
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
      "fileName": "tables/topSellingItemsMetrics.defs.ts",
      "exportName": "topSellingItemsMetricsTableDefinition",
      "saveAsDefs": true
    }
  }
} as const;

export default topSellingItemsMetricsTableDefinition;
