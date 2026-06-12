/// <mls fileReference="_102043_/l1/cafeFlow/layer_1_external/dailyShift.defs.ts" enhancement="_blank"/>

export const dailyShiftTableDefinition = {
  "schemaVersion": "2026-06-06",
  "artifactType": "table",
  "artifactId": "dailyShift",
  "moduleName": "cafeFlow",
  "status": "draft",
  "source": {
    "agentName": "agentPlanTableDefinition",
    "stepId": 53,
    "planId": ""
  },
  "data": {
    "tableDefinition": {
      "tableId": "dailyShift",
      "tableName": "daily_shift",
      "moduleId": "cafeFlow",
      "title": "Turnos diários",
      "purpose": "Controlar abertura e fechamento de turno e consolidar relatório do dia.",
      "ownership": "moduleOwned",
      "rootEntity": "DailyShift",
      "layer": "layer_1_external",
      "tableKind": "transactional",
      "columns": [
        {
          "name": "daily_shift_id",
          "type": "uuid",
          "nullable": false,
          "primaryKey": true,
          "description": "Identificador único do turno diário."
        },
        {
          "name": "shift_date",
          "type": "date",
          "nullable": false,
          "description": "Data do turno diário."
        },
        {
          "name": "status",
          "type": "string",
          "nullable": false,
          "description": "Status do turno diário (aberto/fechado)."
        },
        {
          "name": "opened_at",
          "type": "datetime",
          "nullable": false,
          "description": "Data e hora de abertura do turno."
        },
        {
          "name": "closed_at",
          "type": "datetime",
          "nullable": true,
          "description": "Data e hora de fechamento do turno."
        },
        {
          "name": "opening_cash_amount",
          "type": "money",
          "nullable": true,
          "description": "Valor de caixa informado na abertura do turno."
        },
        {
          "name": "closing_cash_amount",
          "type": "money",
          "nullable": true,
          "description": "Valor de caixa informado no fechamento do turno."
        },
        {
          "name": "total_sales_amount",
          "type": "money",
          "nullable": true,
          "description": "Total de vendas consolidadas no turno."
        },
        {
          "name": "total_orders",
          "type": "number",
          "nullable": true,
          "description": "Quantidade total de pedidos no turno."
        },
        {
          "name": "notes",
          "type": "text",
          "nullable": true,
          "description": "Observações gerais do turno."
        },
        {
          "name": "shift_closing_report_id",
          "type": "uuid",
          "nullable": true,
          "description": "Referência ao relatório de fechamento do turno."
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
        },
        {
          "name": "details",
          "type": "jsonb",
          "nullable": false,
          "description": "Dados agregados do relatório de fechamento e outros detalhes do turno."
        }
      ],
      "primaryKey": [
        "daily_shift_id"
      ],
      "foreignRefs": [
        {
          "fieldName": "shift_closing_report_id",
          "targetEntity": "ShiftClosingReport",
          "targetOwnership": "moduleOwned",
          "reason": "Vincular o relatório de fechamento ao turno diário."
        }
      ],
      "indexes": [
        {
          "indexName": "idx_daily_shift_date",
          "columns": [
            "shift_date"
          ],
          "unique": false,
          "reason": "Filtro por data no dashboard."
        },
        {
          "indexName": "idx_daily_shift_status",
          "columns": [
            "status"
          ],
          "unique": false,
          "reason": "Consulta de turno aberto/fechado para validações de fluxo."
        },
        {
          "indexName": "idx_daily_shift_opened_at",
          "columns": [
            "opened_at"
          ],
          "unique": false,
          "reason": "Ordenação e filtros por período de abertura."
        },
        {
          "indexName": "idx_daily_shift_closed_at",
          "columns": [
            "closed_at"
          ],
          "unique": false,
          "reason": "Filtro por período de fechamento no relatório."
        }
      ],
      "detailsColumn": {
        "enabled": true,
        "columnName": "details",
        "reason": "Armazenar o relatório de fechamento e dados agregados como JSON."
      },
      "metricUpdatePolicy": {
        "feedsMetrics": true,
        "metricRefs": [],
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
        "shiftMustBeOpenForOrders",
        "shiftCloseRequiresOrders"
      ]
    },
    "defsPlan": {
      "fileName": "tables/dailyShift.defs.ts",
      "exportName": "dailyShiftTableDefinition",
      "saveAsDefs": true
    }
  }
} as const;

export default dailyShiftTableDefinition;
