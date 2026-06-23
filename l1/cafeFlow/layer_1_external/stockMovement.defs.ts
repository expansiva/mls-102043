/// <mls fileReference="_102043_/l1/cafeFlow/layer_1_external/stockMovement.defs.ts" enhancement="_blank"/>

export const stockMovementTableDefinition = {
  "schemaVersion": "2026-06-06",
  "artifactType": "table",
  "artifactId": "stockMovement",
  "moduleName": "cafeFlow",
  "status": "draft",
  "source": {
    "agentName": "agentPlanTableDefinition",
    "stepId": 51,
    "planId": ""
  },
  "data": {
    "tableDefinition": {
      "tableId": "stockMovement",
      "tableName": "stock_movements",
      "moduleId": "cafeFlow",
      "title": "Movimentações de Estoque",
      "purpose": "Registrar entradas e saídas de estoque ligadas à operação diária.",
      "ownership": "moduleOwned",
      "rootEntity": "StockMovement",
      "layer": "layer_1_external",
      "tableKind": "transactional",
      "columns": [
        {
          "name": "stock_movement_id",
          "type": "uuid",
          "nullable": false,
          "primaryKey": true,
          "description": "Identificador único da movimentação de estoque."
        },
        {
          "name": "stock_item_id",
          "type": "uuid",
          "nullable": false,
          "description": "Item de estoque associado à movimentação."
        },
        {
          "name": "order_id",
          "type": "uuid",
          "nullable": true,
          "description": "Pedido vinculado à saída de estoque, quando aplicável."
        },
        {
          "name": "movement_type",
          "type": "string",
          "nullable": false,
          "description": "Tipo de movimentação realizada."
        },
        {
          "name": "quantity",
          "type": "number",
          "nullable": false,
          "description": "Quantidade movimentada do item de estoque."
        },
        {
          "name": "reason",
          "type": "text",
          "nullable": true,
          "description": "Motivo ou observação da movimentação, especialmente para ajustes."
        },
        {
          "name": "status",
          "type": "string",
          "nullable": false,
          "default": "active",
          "description": "Status do registro de movimentação."
        },
        {
          "name": "occurred_at",
          "type": "datetime",
          "nullable": false,
          "description": "Data e hora em que a movimentação ocorreu."
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
        "stock_movement_id"
      ],
      "foreignRefs": [
        {
          "fieldName": "stock_item_id",
          "targetEntity": "StockItem",
          "targetOwnership": "mdmOwned",
          "reason": "Movimentação vinculada a item de estoque master."
        },
        {
          "fieldName": "order_id",
          "targetEntity": "Order",
          "targetOwnership": "existingModuleOwned",
          "reason": "Saídas podem estar vinculadas a pedidos existentes no módulo."
        }
      ],
      "indexes": [
        {
          "indexName": "idx_stock_movements_stock_item_id",
          "columns": [
            "stock_item_id"
          ],
          "unique": false,
          "reason": "Consulta por item de estoque para alertas e gestão."
        },
        {
          "indexName": "idx_stock_movements_order_id",
          "columns": [
            "order_id"
          ],
          "unique": false,
          "reason": "Rastrear movimentações relacionadas a pedidos."
        },
        {
          "indexName": "idx_stock_movements_occurred_at",
          "columns": [
            "occurred_at"
          ],
          "unique": false,
          "reason": "Filtros por período no dashboard e auditoria."
        },
        {
          "indexName": "idx_stock_movements_movement_type",
          "columns": [
            "movement_type"
          ],
          "unique": false,
          "reason": "Filtragem por tipo de movimentação."
        }
      ],
      "detailsColumn": {
        "enabled": false
      },
      "metricUpdatePolicy": {
        "feedsMetrics": true,
        "metricRefs": [
          "lowStockMetricTable",
          "dailySalesMetricTable",
          "topSellingItemsMetricTable"
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
      "fileName": "tables/stockMovement.defs.ts",
      "exportName": "stockMovementTableDefinition",
      "saveAsDefs": true
    }
  }
} as const;

export default stockMovementTableDefinition;

export const pipeline = [
  {
    "id": "stockMovement__layer_1_external",
    "type": "layer_1_external",
    "outputPath": "_102043_/l1/cafeFlow/layer_1_external/stockMovement.ts",
    "defPath": "_102043_/l1/cafeFlow/layer_1_external/stockMovement.defs.ts",
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
