/// <mls fileReference="_102043_/l1/cafeFlow/layer_1_external/salesSummary.defs.ts" enhancement="_blank"/>

export const salesSummaryTableDefinition = {
  "schemaVersion": "2026-06-06",
  "artifactType": "table",
  "artifactId": "salesSummary",
  "moduleName": "cafeFlow",
  "status": "draft",
  "source": {
    "agentName": "agentPlanTableDefinition",
    "stepId": 42,
    "planId": "plan-table-definition:salesSummary"
  },
  "data": {
    "tableDefinition": {
      "tableId": "salesSummary",
      "tableName": "sales_summary",
      "moduleId": "cafeFlow",
      "title": "Resumo de vendas do turno",
      "purpose": "Armazenar o resumo consolidado do turno para relatório de fechamento e geração de insights.",
      "ownership": "moduleOwned",
      "rootEntity": "SalesSummary",
      "layer": "layer_1_external",
      "tableKind": "transactional",
      "columns": [
        {
          "name": "sales_summary_id",
          "type": "uuid",
          "nullable": false,
          "primaryKey": true,
          "description": "Identificador único do resumo de vendas."
        },
        {
          "name": "shift_id",
          "type": "uuid",
          "nullable": false,
          "description": "Identificador do turno diário relacionado."
        },
        {
          "name": "status",
          "type": "varchar(30)",
          "nullable": false,
          "description": "Status do resumo do turno (ex.: fechado, reaberto)."
        },
        {
          "name": "period_start_at",
          "type": "timestamp",
          "nullable": false,
          "description": "Início do período do turno consolidado."
        },
        {
          "name": "period_end_at",
          "type": "timestamp",
          "nullable": false,
          "description": "Fim do período do turno consolidado."
        },
        {
          "name": "total_orders",
          "type": "int",
          "nullable": false,
          "default": 0,
          "description": "Quantidade total de pedidos no turno."
        },
        {
          "name": "total_items",
          "type": "int",
          "nullable": false,
          "default": 0,
          "description": "Quantidade total de itens vendidos no turno."
        },
        {
          "name": "gross_amount",
          "type": "numeric(12,2)",
          "nullable": false,
          "default": 0,
          "description": "Valor bruto total do turno."
        },
        {
          "name": "discount_amount",
          "type": "numeric(12,2)",
          "nullable": false,
          "default": 0,
          "description": "Total de descontos aplicados no turno."
        },
        {
          "name": "net_amount",
          "type": "numeric(12,2)",
          "nullable": false,
          "default": 0,
          "description": "Valor líquido total do turno."
        },
        {
          "name": "created_at",
          "type": "timestamp",
          "nullable": false,
          "description": "Data de criação do resumo."
        },
        {
          "name": "updated_at",
          "type": "timestamp",
          "nullable": false,
          "description": "Data da última atualização do resumo."
        }
      ],
      "primaryKey": [
        "sales_summary_id"
      ],
      "foreignRefs": [
        {
          "fieldName": "shift_id",
          "targetEntity": "DailyShift",
          "targetOwnership": "mdmOwned",
          "reason": "Relacionar o resumo ao turno diário fechado."
        }
      ],
      "indexes": [
        {
          "indexName": "idx_sales_summary_shift",
          "columns": [
            "shift_id"
          ],
          "unique": true,
          "reason": "Busca rápida do resumo pelo turno e garantia de um resumo por turno."
        },
        {
          "indexName": "idx_sales_summary_period",
          "columns": [
            "period_start_at",
            "period_end_at"
          ],
          "reason": "Filtragem por período para relatórios e dashboards."
        },
        {
          "indexName": "idx_sales_summary_status",
          "columns": [
            "status"
          ],
          "reason": "Filtragem por status do fechamento."
        }
      ],
      "detailsColumn": {
        "enabled": false
      },
      "metricUpdatePolicy": {
        "feedsMetrics": true,
        "metricRefs": [
          "metricTableVendasDiarias"
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
        "rule-shift-close-required"
      ]
    },
    "defsPlan": {
      "fileName": "tables/salesSummary.defs.ts",
      "exportName": "salesSummaryTableDefinition",
      "saveAsDefs": true
    }
  }
} as const;

export default salesSummaryTableDefinition;
