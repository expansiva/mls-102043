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
    "planId": "plan-metric-table-definition:lowStockMetrics"
  },
  "data": {
    "metricTableDefinition": {
      "metricTableId": "lowStockMetrics",
      "tableName": "low_stock_metrics",
      "moduleId": "cafeFlow",
      "title": "Métricas de Estoque Baixo",
      "purpose": "Snapshot periódico de ingredientes com quantidade abaixo do nível mínimo para alertas operacionais.",
      "tableKind": "metricTimeseries",
      "storageEngine": "postgresTimescaleDB",
      "layer": "layer_1_external",
      "timeColumn": "checked_at",
      "columns": [
        {
          "name": "checked_at",
          "type": "timestamptz",
          "nullable": false,
          "description": "Data e hora da verificação do estoque."
        },
        {
          "name": "ingredient_id",
          "type": "string",
          "nullable": false,
          "description": "Identificador do ingrediente."
        },
        {
          "name": "ingredient_name",
          "type": "string",
          "nullable": false,
          "description": "Nome do ingrediente."
        },
        {
          "name": "current_quantity",
          "type": "numeric",
          "nullable": false,
          "description": "Quantidade disponível no momento da coleta."
        },
        {
          "name": "min_level",
          "type": "numeric",
          "nullable": false,
          "description": "Nível mínimo configurado para o ingrediente."
        },
        {
          "name": "shortage",
          "type": "numeric",
          "nullable": false,
          "description": "Diferença negativa entre quantidade atual e nível mínimo."
        }
      ],
      "dimensions": [
        {
          "dimensionId": "ingredientId",
          "column": "ingredient_id",
          "type": "string",
          "description": "Identificador do ingrediente."
        },
        {
          "dimensionId": "ingredientName",
          "column": "ingredient_name",
          "type": "string",
          "description": "Nome do ingrediente."
        }
      ],
      "measures": [
        {
          "measureId": "currentQuantity",
          "column": "current_quantity",
          "aggregation": "last",
          "unit": "units",
          "description": "Quantidade disponível no momento da coleta."
        },
        {
          "measureId": "minLevel",
          "column": "min_level",
          "aggregation": "last",
          "unit": "units",
          "description": "Nível mínimo configurado para o ingrediente."
        },
        {
          "measureId": "shortage",
          "column": "shortage",
          "aggregation": "last",
          "unit": "units",
          "description": "Diferença negativa entre quantidade atual e nível mínimo."
        }
      ],
      "sourceWriteEvents": [
        "stockItemUpdated",
        "stockDeducted",
        "stockAdjusted"
      ],
      "hypertable": {
        "timeColumn": "checked_at",
        "chunkTimeInterval": "7 days",
        "retentionPolicy": "90 days",
        "indexes": [
          {
            "indexName": "idx_low_stock_metrics_checked_at",
            "columns": [
              "checked_at"
            ],
            "purpose": "Ordenação e consultas por tempo."
          },
          {
            "indexName": "idx_low_stock_metrics_ingredient_id_checked_at",
            "columns": [
              "ingredient_id",
              "checked_at"
            ],
            "purpose": "Filtro por ingrediente e janela temporal."
          },
          {
            "indexName": "idx_low_stock_metrics_ingredient_name_checked_at",
            "columns": [
              "ingredient_name",
              "checked_at"
            ],
            "purpose": "Filtro por nome do ingrediente e janela temporal."
          }
        ]
      },
      "updatePolicy": {
        "updatedByLayer": "layer_3_usecases",
        "pagesMayUpdate": false,
        "controllersMayUpdate": false,
        "usecaseRefs": [
          "usecaseBaixarEstoqueIngredientes",
          "usecaseAjustarEstoque"
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
        "rule-low-stock-alert"
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
