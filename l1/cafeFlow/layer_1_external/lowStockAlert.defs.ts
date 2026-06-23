/// <mls fileReference="_102043_/l1/cafeFlow/layer_1_external/lowStockAlert.defs.ts" enhancement="_blank"/>

export const lowStockAlertTableDefinition = {
  "schemaVersion": "2026-06-06",
  "artifactType": "table",
  "artifactId": "lowStockAlert",
  "moduleName": "cafeFlow",
  "status": "draft",
  "source": {
    "agentName": "agentPlanTableDefinition",
    "stepId": 48,
    "planId": ""
  },
  "data": {
    "tableDefinition": {
      "tableId": "lowStockAlert",
      "tableName": "low_stock_alerts",
      "moduleId": "cafeFlow",
      "title": "Alertas de Estoque Baixo",
      "purpose": "Persistir alertas de estoque baixo para acompanhamento do gerente.",
      "ownership": "moduleOwned",
      "rootEntity": "LowStockAlert",
      "layer": "layer_1_external",
      "tableKind": "transactional",
      "columns": [
        {
          "name": "low_stock_alert_id",
          "type": "uuid",
          "nullable": false,
          "primaryKey": true,
          "description": "Identificador único do alerta de estoque baixo."
        },
        {
          "name": "stock_item_id",
          "type": "uuid",
          "nullable": false,
          "description": "Item de estoque associado ao alerta."
        },
        {
          "name": "triggered_at",
          "type": "datetime",
          "nullable": false,
          "description": "Data e hora em que o alerta foi gerado."
        },
        {
          "name": "current_quantity",
          "type": "number",
          "nullable": false,
          "description": "Quantidade atual do item quando o alerta foi gerado."
        },
        {
          "name": "minimum_quantity",
          "type": "number",
          "nullable": false,
          "description": "Quantidade mínima configurada para o item."
        },
        {
          "name": "status",
          "type": "string",
          "nullable": false,
          "description": "Situação atual do alerta."
        },
        {
          "name": "created_at",
          "type": "datetime",
          "nullable": false,
          "description": "Data e hora de criação do registro."
        },
        {
          "name": "updated_at",
          "type": "datetime",
          "nullable": false,
          "description": "Data e hora da última atualização do registro."
        }
      ],
      "primaryKey": [
        "low_stock_alert_id"
      ],
      "foreignRefs": [
        {
          "fieldName": "stock_item_id",
          "targetEntity": "StockItem",
          "targetOwnership": "mdmOwned",
          "reason": "Item de estoque é entidade MDM referenciada pelo alerta."
        }
      ],
      "indexes": [
        {
          "indexName": "idx_low_stock_alerts_stock_item_id",
          "columns": [
            "stock_item_id"
          ],
          "unique": false,
          "reason": "Lookup rápido por item de estoque."
        },
        {
          "indexName": "idx_low_stock_alerts_status",
          "columns": [
            "status"
          ],
          "unique": false,
          "reason": "Filtragem por situação do alerta."
        },
        {
          "indexName": "idx_low_stock_alerts_triggered_at",
          "columns": [
            "triggered_at"
          ],
          "unique": false,
          "reason": "Ordenação e filtros por data do alerta."
        },
        {
          "indexName": "idx_low_stock_alerts_created_at",
          "columns": [
            "created_at"
          ],
          "unique": false,
          "reason": "Filtros por período no dashboard."
        }
      ],
      "detailsColumn": {
        "enabled": false
      },
      "metricUpdatePolicy": {
        "feedsMetrics": true,
        "metricRefs": [
          "lowStockMetricTable"
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
        "lowStockThresholdRule"
      ]
    },
    "defsPlan": {
      "fileName": "tables/lowStockAlert.defs.ts",
      "exportName": "lowStockAlertTableDefinition",
      "saveAsDefs": true
    }
  }
} as const;

export default lowStockAlertTableDefinition;
