/// <mls fileReference="_102043_/l1/cafeFlow/layer_1_external/inventoryAdjustment.defs.ts" enhancement="_blank"/>

export const inventoryAdjustmentTableDefinition = {
  "schemaVersion": "2026-06-06",
  "artifactType": "table",
  "artifactId": "inventoryAdjustment",
  "moduleName": "cafeFlow",
  "status": "draft",
  "source": {
    "agentName": "agentPlanTableDefinition",
    "stepId": 50,
    "planId": ""
  },
  "data": {
    "tableDefinition": {
      "tableId": "inventoryAdjustment",
      "tableName": "inventory_adjustment",
      "title": "Ajustes de estoque",
      "purpose": "Registrar ajustes de estoque com status de confirmação.",
      "moduleId": "cafeFlow",
      "ownership": "moduleOwned",
      "layer": "layer_1_external",
      "tableKind": "transactional",
      "rootEntity": "InventoryAdjustment",
      "primaryKey": [
        "inventory_adjustment_id"
      ],
      "columns": [
        {
          "name": "inventory_adjustment_id",
          "type": "uuid",
          "nullable": false,
          "primaryKey": true,
          "description": "Identificador único do ajuste de estoque."
        },
        {
          "name": "inventory_item_id",
          "type": "uuid",
          "nullable": false,
          "description": "Item de estoque ao qual o ajuste se aplica."
        },
        {
          "name": "status",
          "type": "string",
          "nullable": false,
          "description": "Status do ajuste de estoque."
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
      "foreignRefs": [
        {
          "fieldName": "inventory_item_id",
          "targetEntity": "InventoryItem",
          "targetOwnership": "moduleOwned",
          "reason": "Referência ao item de estoque ajustado."
        }
      ],
      "indexes": [
        {
          "indexName": "idx_inventory_adjustment_item_id",
          "columns": [
            "inventory_item_id"
          ],
          "reason": "Lookup por item de estoque para listar ajustes.",
          "unique": false
        },
        {
          "indexName": "idx_inventory_adjustment_status",
          "columns": [
            "status"
          ],
          "reason": "Filtragem por status do ajuste.",
          "unique": false
        },
        {
          "indexName": "idx_inventory_adjustment_created_at",
          "columns": [
            "created_at"
          ],
          "reason": "Ordenação e filtragem por data de criação.",
          "unique": false
        }
      ],
      "detailsColumn": {
        "enabled": false
      },
      "metricUpdatePolicy": {
        "feedsMetrics": true,
        "updatedByLayer": "layer_3_usecases",
        "metricRefs": []
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
        "inventoryDecrementPolicy",
        "inventoryLowStockAlert"
      ]
    },
    "defsPlan": {
      "fileName": "tables/inventoryAdjustment.defs.ts",
      "exportName": "inventoryAdjustmentTableDefinition",
      "saveAsDefs": true
    }
  }
} as const;

export default inventoryAdjustmentTableDefinition;
