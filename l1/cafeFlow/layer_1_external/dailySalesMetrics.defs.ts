/// <mls fileReference="_102043_/l1/cafeFlow/layer_1_external/dailySalesMetrics.defs.ts" enhancement="_blank"/>

export const dailySalesMetricsTableDefinition = {
  "schemaVersion": "2026-06-06",
  "artifactType": "metricTable",
  "artifactId": "dailySalesMetrics",
  "moduleName": "cafeFlow",
  "status": "draft",
  "source": {
    "agentName": "agentPlanMetricTableDefinition",
    "stepId": 49,
    "planId": ""
  },
  "data": {
    "metricTableDefinition": {
      "metricTableId": "dailySalesMetrics",
      "tableName": "daily_sales_metrics",
      "moduleId": "cafeFlow",
      "title": "Vendas diárias",
      "purpose": "Acompanhar faturamento, quantidade de pedidos e ticket médio por turno e dia para tomada de decisão do gerente.",
      "tableKind": "metricTimeseries",
      "storageEngine": "postgresTimescaleDB",
      "layer": "layer_1_external",
      "timeColumn": "time",
      "columns": [
        {
          "name": "time",
          "type": "timestamptz",
          "nullable": false,
          "description": "Timestamp de referência da métrica."
        },
        {
          "name": "shift_id",
          "type": "uuid",
          "nullable": false,
          "description": "Turno em que o pedido foi realizado."
        },
        {
          "name": "status",
          "type": "text",
          "nullable": false,
          "description": "Status do pedido no momento da métrica."
        },
        {
          "name": "order_item_id",
          "type": "text",
          "nullable": false,
          "description": "FK para item de pedido relacionado."
        },
        {
          "name": "order_status_history_id",
          "type": "text",
          "nullable": false,
          "description": "FK para histórico de status do pedido relacionado."
        },
        {
          "name": "shift_report_id",
          "type": "text",
          "nullable": false,
          "description": "FK para relatório de fechamento do turno."
        },
        {
          "name": "shift_config_id",
          "type": "text",
          "nullable": false,
          "description": "FK para configuração de turno utilizada."
        },
        {
          "name": "total_revenue",
          "type": "numeric",
          "nullable": false,
          "default": 0,
          "description": "Receita total dos pedidos."
        },
        {
          "name": "order_count",
          "type": "integer",
          "nullable": false,
          "default": 0,
          "description": "Quantidade de pedidos."
        },
        {
          "name": "average_ticket",
          "type": "numeric",
          "nullable": true,
          "description": "Ticket médio por pedido."
        },
        {
          "name": "items_sold",
          "type": "integer",
          "nullable": false,
          "default": 0,
          "description": "Quantidade total de itens vendidos."
        }
      ],
      "dimensions": [
        {
          "dimensionId": "shiftId",
          "column": "shift_id",
          "type": "uuid",
          "description": "Turno em que o pedido foi realizado."
        },
        {
          "dimensionId": "orderStatus",
          "column": "status",
          "type": "string",
          "description": "Status do pedido no momento da métrica."
        },
        {
          "dimensionId": "orderItemId",
          "column": "order_item_id",
          "type": "text",
          "description": "FK dimension derived from ontology relationship orderHasItems (Order -> OrderItem)."
        },
        {
          "dimensionId": "orderStatusHistoryId",
          "column": "order_status_history_id",
          "type": "text",
          "description": "FK dimension derived from ontology relationship orderHasStatusHistory (Order -> OrderStatusHistory)."
        },
        {
          "dimensionId": "shiftReportId",
          "column": "shift_report_id",
          "type": "text",
          "description": "FK dimension derived from ontology relationship shiftHasReport (Shift -> ShiftReport)."
        },
        {
          "dimensionId": "shiftConfigId",
          "column": "shift_config_id",
          "type": "text",
          "description": "FK dimension derived from ontology relationship shiftUsesConfig (Shift -> ShiftConfig)."
        }
      ],
      "measures": [
        {
          "measureId": "totalRevenue",
          "column": "total_revenue",
          "aggregation": "sum",
          "unit": "BRL",
          "description": "Receita total dos pedidos."
        },
        {
          "measureId": "orderCount",
          "column": "order_count",
          "aggregation": "sum",
          "unit": "count",
          "description": "Quantidade de pedidos."
        },
        {
          "measureId": "averageTicket",
          "column": "average_ticket",
          "aggregation": "avg",
          "unit": "BRL",
          "description": "Ticket médio por pedido."
        },
        {
          "measureId": "itemsSold",
          "column": "items_sold",
          "aggregation": "sum",
          "unit": "count",
          "description": "Quantidade total de itens vendidos."
        }
      ],
      "sourceWriteEvents": [
        "orderCreated",
        "orderStatusUpdated",
        "shiftClosed"
      ],
      "hypertable": {
        "timeColumn": "time",
        "chunkTimeInterval": "7 days",
        "retentionPolicy": "1 year",
        "compressionPolicy": "30 days",
        "indexes": [
          {
            "indexName": "idx_daily_sales_metrics_time",
            "columns": [
              "time"
            ],
            "purpose": "Consulta temporal por janela de agregação."
          },
          {
            "indexName": "idx_daily_sales_metrics_shift_id_time",
            "columns": [
              "shift_id",
              "time"
            ],
            "purpose": "Filtro por turno e período."
          },
          {
            "indexName": "idx_daily_sales_metrics_status_time",
            "columns": [
              "status",
              "time"
            ],
            "purpose": "Filtro por status e período."
          },
          {
            "indexName": "idx_daily_sales_metrics_order_item_id",
            "columns": [
              "order_item_id"
            ],
            "purpose": "Lookup por item do pedido."
          },
          {
            "indexName": "idx_daily_sales_metrics_order_status_history_id",
            "columns": [
              "order_status_history_id"
            ],
            "purpose": "Lookup por histórico de status."
          },
          {
            "indexName": "idx_daily_sales_metrics_shift_report_id",
            "columns": [
              "shift_report_id"
            ],
            "purpose": "Lookup por relatório de turno."
          },
          {
            "indexName": "idx_daily_sales_metrics_shift_config_id",
            "columns": [
              "shift_config_id"
            ],
            "purpose": "Lookup por configuração de turno."
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
        "shiftClosureRequiresNoOpenOrders"
      ]
    },
    "defsPlan": {
      "fileName": "tables/dailySalesMetrics.defs.ts",
      "exportName": "dailySalesMetricsTableDefinition",
      "saveAsDefs": true
    }
  }
} as const;

export default dailySalesMetricsTableDefinition;

export const pipeline = [
  {
    "id": "dailySalesMetrics__layer_1_external",
    "type": "layer_1_external",
    "outputPath": "_102043_/l1/cafeFlow/layer_1_external/dailySalesMetrics.ts",
    "defPath": "_102043_/l1/cafeFlow/layer_1_external/dailySalesMetrics.defs.ts",
    "dependsFiles": [],
    "dependsOn": [],
    "skills": [
      "_102021_/l2/skills/layer_1.md",
      "_102034_.d.ts"
    ],
    "afterSaveBackEnd": "_102021_/l2/agentMaterializeSolution/registerBackEnd.ts?registerLayer1",
    "agent": "agentMaterializeGen"
  }
] as const;
