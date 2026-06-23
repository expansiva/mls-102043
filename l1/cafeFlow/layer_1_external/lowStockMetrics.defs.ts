/// <mls fileReference="_102043_/l1/cafeFlow/layer_1_external/lowStockMetrics.defs.ts" enhancement="_blank"/>

export const lowStockMetricsMetricTableDefinition = {
  "schemaVersion": "2026-06-06",
  "artifactType": "metricTable",
  "artifactId": "lowStockMetrics",
  "moduleName": "cafeFlow",
  "status": "draft",
  "source": {
    "agentName": "agentPlanMetricTableDefinition",
    "stepId": 51,
    "planId": ""
  },
  "data": {
    "metricTableDefinition": {
      "metricTableId": "lowStockMetrics",
      "tableName": "low_stock_metrics",
      "moduleId": "cafeFlow",
      "title": "Estoque baixo",
      "purpose": "Monitorar a frequência e evolução de alertas de estoque baixo para evitar rupturas.",
      "tableKind": "metricTimeseries",
      "storageEngine": "postgresTimescaleDB",
      "layer": "layer_1_external",
      "timeColumn": "time",
      "columns": [
        {
          "name": "time",
          "type": "timestamptz",
          "nullable": false,
          "description": "Momento de referência da métrica de estoque baixo."
        },
        {
          "name": "stock_item_id",
          "type": "uuid",
          "nullable": false,
          "description": "Item de estoque com alerta ou movimentação."
        },
        {
          "name": "unit_of_measure_id",
          "type": "uuid",
          "nullable": false,
          "description": "Unidade de medida do item."
        },
        {
          "name": "alert_count",
          "type": "integer",
          "nullable": false,
          "description": "Número de alertas de estoque baixo."
        },
        {
          "name": "current_quantity",
          "type": "numeric",
          "nullable": false,
          "description": "Quantidade atual em estoque no momento da métrica."
        },
        {
          "name": "threshold_value",
          "type": "numeric",
          "nullable": false,
          "description": "Valor limite configurado para disparo do alerta."
        }
      ],
      "dimensions": [
        {
          "dimensionId": "stockItemId",
          "column": "stock_item_id",
          "type": "uuid",
          "description": "Item de estoque com alerta ou movimentação."
        },
        {
          "dimensionId": "unitOfMeasureId",
          "column": "unit_of_measure_id",
          "type": "uuid",
          "description": "Unidade de medida do item."
        }
      ],
      "measures": [
        {
          "measureId": "alertCount",
          "column": "alert_count",
          "aggregation": "sum",
          "unit": "count",
          "description": "Número de alertas de estoque baixo."
        },
        {
          "measureId": "currentQuantity",
          "column": "current_quantity",
          "aggregation": "last",
          "unit": "unit",
          "description": "Quantidade atual em estoque no momento da métrica."
        },
        {
          "measureId": "thresholdValue",
          "column": "threshold_value",
          "aggregation": "last",
          "unit": "unit",
          "description": "Valor limite configurado para disparo do alerta."
        }
      ],
      "sourceWriteEvents": [
        "lowStockAlertCreated",
        "stockMovementCreated"
      ],
      "hypertable": {
        "timeColumn": "time",
        "chunkTimeInterval": "1 day",
        "retentionPolicy": "6 months",
        "compressionPolicy": "30 days",
        "indexes": [
          {
            "indexName": "idx_low_stock_metrics_time",
            "columns": [
              "time"
            ],
            "purpose": "Suporte a consultas por janela temporal."
          },
          {
            "indexName": "idx_low_stock_metrics_stock_item_time",
            "columns": [
              "stock_item_id",
              "time"
            ],
            "purpose": "Consultas por item de estoque ao longo do tempo."
          },
          {
            "indexName": "idx_low_stock_metrics_uom_time",
            "columns": [
              "unit_of_measure_id",
              "time"
            ],
            "purpose": "Consultas por unidade de medida ao longo do tempo."
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
        "lowStockThresholdRule"
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
