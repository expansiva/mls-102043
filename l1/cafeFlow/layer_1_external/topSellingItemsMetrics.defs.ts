/// <mls fileReference="_102043_/l1/cafeFlow/layer_1_external/topSellingItemsMetrics.defs.ts" enhancement="_blank"/>

export const topSellingItemsMetricsTableDefinition = {
  "schemaVersion": "2026-06-06",
  "artifactType": "metricTable",
  "artifactId": "topSellingItemsMetrics",
  "moduleName": "cafeFlow",
  "status": "draft",
  "source": {
    "agentName": "agentPlanMetricTableDefinition",
    "stepId": 57,
    "planId": ""
  },
  "data": {
    "metricTableDefinition": {
      "metricTableId": "topSellingItemsMetrics",
      "tableName": "top_selling_items_metrics",
      "moduleId": "cafeFlow",
      "title": "Tabela de métricas: Itens mais vendidos",
      "purpose": "Rastrear desempenho e popularidade dos itens do cardápio.",
      "tableKind": "metricTimeseries",
      "storageEngine": "postgresTimescaleDB",
      "layer": "layer_1_external",
      "timeColumn": "event_time",
      "columns": [
        {
          "name": "event_time",
          "type": "timestamptz",
          "nullable": false,
          "description": "Timestamp do evento de venda/atualização usado para séries temporais."
        },
        {
          "name": "menu_item_id",
          "type": "text",
          "nullable": false,
          "description": "Identificador do item do cardápio."
        },
        {
          "name": "category_id",
          "type": "text",
          "nullable": false,
          "description": "Identificador da categoria do cardápio."
        },
        {
          "name": "order_id",
          "type": "text",
          "nullable": false,
          "description": "Identificador do pedido."
        },
        {
          "name": "menu_category_id",
          "type": "text",
          "nullable": true,
          "description": "FK dimension derived from ontology relationship menuItemToCategory (MenuItem -> MenuCategory)"
        },
        {
          "name": "menu_item_ingredient_id",
          "type": "text",
          "nullable": true,
          "description": "FK dimension derived from ontology relationship menuItemToIngredient (MenuItem -> MenuItemIngredient)"
        },
        {
          "name": "quantity_sold",
          "type": "integer",
          "nullable": false,
          "description": "Quantidade vendida do item."
        },
        {
          "name": "item_revenue",
          "type": "numeric",
          "nullable": false,
          "description": "Receita gerada pelo item."
        },
        {
          "name": "order_count",
          "type": "integer",
          "nullable": false,
          "description": "Número de pedidos que incluíram o item."
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
          "dimensionId": "categoryId",
          "column": "category_id",
          "type": "string",
          "description": "Identificador da categoria do cardápio."
        },
        {
          "dimensionId": "orderId",
          "column": "order_id",
          "type": "string",
          "description": "Identificador do pedido."
        },
        {
          "dimensionId": "menuCategoryId",
          "column": "menu_category_id",
          "type": "text",
          "description": "FK dimension derived from ontology relationship menuItemToCategory (MenuItem -> MenuCategory)"
        },
        {
          "dimensionId": "menuItemIngredientId",
          "column": "menu_item_ingredient_id",
          "type": "text",
          "description": "FK dimension derived from ontology relationship menuItemToIngredient (MenuItem -> MenuItemIngredient)"
        }
      ],
      "measures": [
        {
          "measureId": "quantitySold",
          "column": "quantity_sold",
          "aggregation": "sum",
          "unit": "items",
          "description": "Quantidade vendida do item."
        },
        {
          "measureId": "itemRevenue",
          "column": "item_revenue",
          "aggregation": "sum",
          "unit": "BRL",
          "description": "Receita gerada pelo item."
        },
        {
          "measureId": "orderCount",
          "column": "order_count",
          "aggregation": "count",
          "unit": "orders",
          "description": "Número de pedidos que incluíram o item."
        }
      ],
      "sourceWriteEvents": [
        "orderItemAdded",
        "orderStatusUpdated"
      ],
      "hypertable": {
        "timeColumn": "event_time",
        "chunkTimeInterval": "7 days",
        "retentionPolicy": "2 years",
        "compressionPolicy": "30 days",
        "indexes": [
          {
            "indexName": "idx_top_selling_items_metrics_event_time",
            "columns": [
              "event_time"
            ],
            "purpose": "Acelerar consultas por janela temporal."
          },
          {
            "indexName": "idx_top_selling_items_metrics_menu_item_time",
            "columns": [
              "menu_item_id",
              "event_time"
            ],
            "purpose": "Ranking temporal por item do cardápio."
          },
          {
            "indexName": "idx_top_selling_items_metrics_category_time",
            "columns": [
              "category_id",
              "event_time"
            ],
            "purpose": "Ranking temporal por categoria."
          },
          {
            "indexName": "idx_top_selling_items_metrics_order_id",
            "columns": [
              "order_id"
            ],
            "purpose": "Consulta por pedido específico."
          },
          {
            "indexName": "idx_top_selling_items_metrics_menu_category_id",
            "columns": [
              "menu_category_id"
            ],
            "purpose": "Filtro por categoria derivada."
          },
          {
            "indexName": "idx_top_selling_items_metrics_menu_item_ingredient_id",
            "columns": [
              "menu_item_ingredient_id"
            ],
            "purpose": "Filtro por ingrediente vinculado."
          }
        ]
      },
      "updatePolicy": {
        "updatedByLayer": "layer_3_usecases",
        "pagesMayUpdate": false,
        "controllersMayUpdate": false,
        "usecaseRefs": [
          "registrarPedidoPos",
          "atualizarStatusCozinha"
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
        "orderStatusLifecycle",
        "kitchenStatusUpdates"
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
