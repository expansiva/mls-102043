/// <mls fileReference="_102043_/l1/cafeFlow/layer_1_external/menuItemIngredient.defs.ts" enhancement="_blank"/>

export const menuItemIngredientTableDefinition = {
  "schemaVersion": "2026-06-06",
  "artifactType": "table",
  "artifactId": "menuItemIngredient",
  "moduleName": "cafeFlow",
  "status": "draft",
  "source": {
    "agentName": "agentPlanTableDefinition",
    "stepId": 51,
    "planId": ""
  },
  "data": {
    "tableDefinition": {
      "tableId": "menuItemIngredient",
      "tableName": "menu_item_ingredient",
      "moduleId": "cafeFlow",
      "title": "Ingredientes por item do cardápio",
      "purpose": "Mapear insumos usados por item do cardápio para baixa e alerta de estoque.",
      "ownership": "moduleOwned",
      "rootEntity": "MenuItemIngredient",
      "layer": "layer_1_external",
      "tableKind": "transactional",
      "columns": [
        {
          "name": "id",
          "type": "uuid",
          "nullable": false,
          "primaryKey": true,
          "description": "Identificador único do vínculo ingrediente-cardápio"
        },
        {
          "name": "menuItemId",
          "type": "uuid",
          "nullable": false,
          "description": "Referência ao item do cardápio"
        },
        {
          "name": "inventoryItemId",
          "type": "uuid",
          "nullable": false,
          "description": "Referência ao item de estoque utilizado como ingrediente"
        },
        {
          "name": "quantity",
          "type": "number",
          "nullable": false,
          "description": "Quantidade necessária do ingrediente para o preparo do item"
        },
        {
          "name": "unit",
          "type": "string",
          "nullable": false,
          "description": "Unidade de medida (ex: g, ml, unidade, colher)"
        },
        {
          "name": "isOptional",
          "type": "boolean",
          "nullable": false,
          "description": "Indica se o ingrediente é opcional ou pode ser removido do item"
        },
        {
          "name": "status",
          "type": "string",
          "nullable": false,
          "default": "active",
          "description": "Status do vínculo ingrediente-cardápio"
        },
        {
          "name": "createdAt",
          "type": "datetime",
          "nullable": false,
          "description": "Data e hora de criação do registro"
        },
        {
          "name": "updatedAt",
          "type": "datetime",
          "nullable": false,
          "description": "Data e hora da última atualização do registro"
        }
      ],
      "primaryKey": [
        "id"
      ],
      "foreignRefs": [
        {
          "fieldName": "menuItemId",
          "targetEntity": "MenuItem",
          "targetOwnership": "mdmOwned",
          "reason": "rule:mdmOwned"
        },
        {
          "fieldName": "inventoryItemId",
          "targetEntity": "InventoryItem",
          "targetOwnership": "mdmOwned",
          "reason": "rule:mdmOwned"
        }
      ],
      "indexes": [
        {
          "indexName": "idx_menu_item_ingredient_menu_item",
          "columns": [
            "menuItemId"
          ],
          "reason": "Consultas por item do cardápio"
        },
        {
          "indexName": "idx_menu_item_ingredient_inventory_item",
          "columns": [
            "inventoryItemId"
          ],
          "reason": "Consulta de uso por item de estoque"
        },
        {
          "indexName": "ux_menu_item_ingredient_menu_item_inventory_item",
          "columns": [
            "menuItemId",
            "inventoryItemId"
          ],
          "unique": true,
          "reason": "Evitar duplicidade de vínculo por item e ingrediente"
        },
        {
          "indexName": "idx_menu_item_ingredient_status",
          "columns": [
            "status"
          ],
          "reason": "Filtragem por status"
        },
        {
          "indexName": "idx_menu_item_ingredient_created_at",
          "columns": [
            "createdAt"
          ],
          "reason": "Filtro temporal"
        }
      ],
      "detailsColumn": {
        "enabled": false
      },
      "metricUpdatePolicy": {
        "feedsMetrics": false,
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
        "inventoryDecrementPolicy"
      ]
    },
    "defsPlan": {
      "fileName": "tables/menuItemIngredient.defs.ts",
      "exportName": "menuItemIngredientTableDefinition",
      "saveAsDefs": true
    }
  }
} as const;

export default menuItemIngredientTableDefinition;
