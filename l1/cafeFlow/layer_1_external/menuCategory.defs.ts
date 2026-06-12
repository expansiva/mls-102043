/// <mls fileReference="_102043_/l1/cafeFlow/layer_1_external/menuCategory.defs.ts" enhancement="_blank"/>

export const menuCategoryTableDefinition = {
  "schemaVersion": "2026-06-06",
  "artifactType": "table",
  "artifactId": "menuCategory",
  "moduleName": "cafeFlow",
  "status": "draft",
  "source": {
    "agentName": "agentPlanTableDefinition",
    "stepId": 49,
    "planId": ""
  },
  "data": {
    "tableDefinition": {
      "tableId": "menuCategory",
      "tableName": "menu_category",
      "moduleId": "cafeFlow",
      "title": "Categorias do cardápio",
      "purpose": "Organizar itens do cardápio por categoria para gestão e exibição no POS.",
      "ownership": "moduleOwned",
      "rootEntity": "MenuCategory",
      "layer": "layer_1_external",
      "tableKind": "transactional",
      "columns": [
        {
          "name": "menu_category_id",
          "type": "uuid",
          "nullable": false,
          "primaryKey": true,
          "description": "Identificador único da categoria"
        },
        {
          "name": "name",
          "type": "varchar",
          "nullable": false,
          "description": "Nome da categoria exibido no POS"
        },
        {
          "name": "description",
          "type": "text",
          "nullable": true,
          "description": "Descrição opcional da categoria"
        },
        {
          "name": "sort_order",
          "type": "int",
          "nullable": true,
          "description": "Ordem de exibição no POS (menor valor aparece primeiro)"
        },
        {
          "name": "color",
          "type": "varchar",
          "nullable": true,
          "description": "Cor hexadecimal para identificação visual no POS"
        },
        {
          "name": "is_active",
          "type": "boolean",
          "nullable": false,
          "default": true,
          "description": "Indica se a categoria está ativa e visível no cardápio"
        },
        {
          "name": "created_at",
          "type": "timestamptz",
          "nullable": false,
          "description": "Data e hora de criação do registro"
        },
        {
          "name": "updated_at",
          "type": "timestamptz",
          "nullable": false,
          "description": "Data e hora da última atualização do registro"
        }
      ],
      "primaryKey": [
        "menu_category_id"
      ],
      "foreignRefs": [],
      "indexes": [
        {
          "indexName": "idx_menu_category_name",
          "columns": [
            "name"
          ],
          "unique": false,
          "reason": "Busca por nome na gestão do cardápio"
        },
        {
          "indexName": "idx_menu_category_active_sort",
          "columns": [
            "is_active",
            "sort_order"
          ],
          "unique": false,
          "reason": "Ordenação e filtragem de categorias ativas no POS"
        },
        {
          "indexName": "idx_menu_category_created_at",
          "columns": [
            "created_at"
          ],
          "unique": false,
          "reason": "Filtros por data em relatórios e auditoria"
        }
      ],
      "detailsColumn": {
        "enabled": false,
        "reason": "Campos estruturados suficientes para filtros e exibição no POS"
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
      "rulesApplied": []
    },
    "defsPlan": {
      "fileName": "tables/menuCategory.defs.ts",
      "exportName": "menuCategoryTableDefinition",
      "saveAsDefs": true
    }
  }
} as const;

export default menuCategoryTableDefinition;
