/// <mls fileReference="_102043_/l1/cafeFlow/layer_1_external/inventoryItem.defs.ts" enhancement="_blank"/>

export const inventoryItemTableDefinition = {
  "schemaVersion": "2026-06-06",
  "artifactType": "table",
  "artifactId": "inventoryItem",
  "moduleName": "cafeFlow",
  "status": "draft",
  "source": {
    "agentName": "agentPlanTableDefinition",
    "stepId": 50,
    "planId": ""
  },
  "data": {
    "tableDefinition": {
      "tableId": "inventoryItem",
      "tableName": "inventory_item",
      "moduleId": "cafeFlow",
      "title": "Itens de estoque",
      "purpose": "Controlar estoque básico e níveis para alertas e baixa de insumos.",
      "ownership": "moduleOwned",
      "rootEntity": "InventoryItem",
      "layer": "layer_1_external",
      "tableKind": "transactional",
      "columns": [
        {
          "name": "inventory_item_id",
          "type": "uuid",
          "nullable": false,
          "primaryKey": true,
          "description": "Identificador único do item de estoque."
        },
        {
          "name": "name",
          "type": "string",
          "nullable": false,
          "description": "Nome do insumo ou item de estoque."
        },
        {
          "name": "quantity_available",
          "type": "number",
          "nullable": false,
          "description": "Quantidade disponível em estoque."
        },
        {
          "name": "minimum_level",
          "type": "number",
          "nullable": false,
          "description": "Nível mínimo aceitável para o estoque."
        },
        {
          "name": "status",
          "type": "string",
          "nullable": false,
          "default": "active",
          "description": "Status do item de estoque (ex.: active, inactive)."
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
        "inventory_item_id"
      ],
      "foreignRefs": [],
      "indexes": [
        {
          "indexName": "idx_inventory_item_name",
          "columns": [
            "name"
          ],
          "unique": false,
          "reason": "Busca por nome no gerenciamento de estoque."
        },
        {
          "indexName": "idx_inventory_item_low_stock",
          "columns": [
            "quantity_available",
            "minimum_level"
          ],
          "unique": false,
          "reason": "Filtrar itens abaixo do nível mínimo no dashboard."
        },
        {
          "indexName": "idx_inventory_item_status",
          "columns": [
            "status"
          ],
          "unique": false,
          "reason": "Filtrar itens ativos/inativos no gerenciamento."
        },
        {
          "indexName": "idx_inventory_item_updated_at",
          "columns": [
            "updated_at"
          ],
          "unique": false,
          "reason": "Ordenação e filtros por data para relatórios/turno."
        }
      ],
      "detailsColumn": {
        "enabled": false
      },
      "metricUpdatePolicy": {
        "feedsMetrics": true,
        "updatedByLayer": "layer_3_usecases",
        "metricRefs": [
          "inventoryLowStockAlert"
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
      "fileName": "tables/inventoryItem.defs.ts",
      "exportName": "inventoryItemTableDefinition",
      "saveAsDefs": true
    }
  }
} as const;

export default inventoryItemTableDefinition;
