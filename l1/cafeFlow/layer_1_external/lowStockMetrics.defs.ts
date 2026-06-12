/// <mls fileReference="_102043_/l1/cafeFlow/layer_1_external/lowStockMetrics.defs.ts" enhancement="_blank"/>

export const lowStockMetricsMetricTableDefinition = {
  "schemaVersion": "2026-06-06",
  "artifactType": "metricTable",
  "artifactId": "lowStockMetrics",
  "moduleName": "cafeFlow",
  "status": "draft",
  "source": {
    "agentName": "agentPlanMetricTableDefinition",
    "stepId": 58,
    "planId": ""
  },
  "data": {
    "metricTableDefinition": {
      "metricTableId": "lowStockMetrics",
      "tableName": "low_stock_metrics",
      "moduleId": "cafeFlow",
      "title": "Tabela de métricas: Estoque baixo",
      "purpose": "Monitorar níveis de estoque e alertas de baixa quantidade.",
      "tableKind": "metricTimeseries",
      "storageEngine": "postgresTimescaleDB",
      "layer": "layer_1_external",
      "timeColumn": "event_time",
      "columns": [
        {
          "name": "event_time",
          "type": "timestamptz",
          "nullable": false,
          "description": "Data e hora do evento de métrica."
        },
        {
          "name": "inventory_item_id",
          "type": "uuid",
          "nullable": false,
          "description": "Identificador do item de estoque."
        },
        {
          "name": "menu_item_id",
          "type": "uuid",
          "nullable": true,
          "description": "Identificador do item do cardápio relacionado."
        },
        {
          "name": "adjustment_id",
          "type": "uuid",
          "nullable": true,
          "description": "Identificador do ajuste de estoque."
        },
        {
          "name": "current_quantity",
          "type": "numeric",
          "nullable": false,
          "description": "Quantidade atual em estoque."
        },
        {
          "name": "threshold_quantity",
          "type": "numeric",
          "nullable": false,
          "description": "Quantidade mínima definida para alerta."
        },
        {
          "name": "low_stock_count",
          "type": "integer",
          "nullable": false,
          "default": 1,
          "description": "Contagem de ocorrências de estoque baixo."
        }
      ],
      "dimensions": [
        {
          "dimensionId": "inventoryItemId",
          "column": "inventory_item_id",
          "type": "string",
          "description": "Identificador do item de estoque."
        },
        {
          "dimensionId": "menuItemId",
          "column": "menu_item_id",
          "type": "string",
          "description": "Identificador do item do cardápio relacionado."
        },
        {
          "dimensionId": "adjustmentId",
          "column": "adjustment_id",
          "type": "string",
          "description": "Identificador do ajuste de estoque."
        }
      ],
      "measures": [
        {
          "measureId": "currentQuantity",
          "column": "current_quantity",
          "aggregation": "last",
          "unit": "units",
          "description": "Quantidade atual em estoque."
        },
        {
          "measureId": "thresholdQuantity",
          "column": "threshold_quantity",
          "aggregation": "last",
          "unit": "units",
          "description": "Quantidade mínima definida para alerta."
        },
        {
          "measureId": "lowStockCount",
          "column": "low_stock_count",
          "aggregation": "count",
          "unit": "alerts",
          "description": "Contagem de ocorrências de estoque baixo."
        }
      ],
      "sourceWriteEvents": [
        "inventoryAdjusted",
        "inventoryItemUpdated"
      ],
      "hypertable": {
        "timeColumn": "event_time",
        "chunkTimeInterval": "7 days",
        "retentionPolicy": "6 months",
        "compressionPolicy": "30 days",
        "indexes": [
          {
            "indexName": "idx_low_stock_metrics_event_time",
            "columns": [
              "event_time"
            ],
            "purpose": "Ordenação e filtros por período."
          },
          {
            "indexName": "idx_low_stock_metrics_event_time_inventory_item",
            "columns": [
              "event_time",
              "inventory_item_id"
            ],
            "purpose": "Filtrar métricas de estoque por item e período."
          },
          {
            "indexName": "idx_low_stock_metrics_menu_item",
            "columns": [
              "menu_item_id"
            ],
            "purpose": "Filtrar métricas por item do cardápio relacionado."
          },
          {
            "indexName": "idx_low_stock_metrics_adjustment",
            "columns": [
              "adjustment_id"
            ],
            "purpose": "Rastrear métricas por ajuste de estoque."
          }
        ]
      },
      "updatePolicy": {
        "updatedByLayer": "layer_3_usecases",
        "pagesMayUpdate": false,
        "controllersMayUpdate": false,
        "usecaseRefs": [
          "gerenciarEstoque"
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
        "inventoryLowStockAlert",
        "inventoryDecrementPolicy"
      ]
    },
    "defsPlan": {
      "fileName": "tables/lowStockMetrics.defs.ts",
      "exportName": "lowStockMetricsMetricTableDefinition",
      "saveAsDefs": true
    }
  }
} as const;

export default lowStockMetricsMetricTableDefinition;
