/// <mls fileReference="_102043_/l1/cafeFlow/layer_1_external/shiftReport.defs.ts" enhancement="_blank"/>

export const shiftReportTableDefinition = {
  "schemaVersion": "2026-06-06",
  "artifactType": "table",
  "artifactId": "shiftReport",
  "moduleName": "cafeFlow",
  "status": "draft",
  "source": {
    "agentName": "agentPlanTableDefinition",
    "stepId": 50,
    "planId": ""
  },
  "data": {
    "tableDefinition": {
      "tableId": "shiftReport",
      "tableName": "shift_reports",
      "moduleId": "cafeFlow",
      "title": "Relatórios de Fechamento de Turno",
      "purpose": "Armazenar resumo do fechamento do turno para consulta gerencial.",
      "ownership": "moduleOwned",
      "rootEntity": "ShiftReport",
      "layer": "layer_1_external",
      "tableKind": "transactional",
      "columns": [
        {
          "name": "shift_report_id",
          "type": "uuid",
          "nullable": false,
          "primaryKey": true,
          "description": "Identificador único do relatório de fechamento de turno."
        },
        {
          "name": "shift_id",
          "type": "uuid",
          "nullable": false,
          "description": "Referência ao turno consolidado por este relatório."
        },
        {
          "name": "report_status",
          "type": "string",
          "nullable": false,
          "default": "gerado",
          "description": "Status do relatório de fechamento do turno."
        },
        {
          "name": "total_sales_amount",
          "type": "money",
          "nullable": false,
          "description": "Total de vendas consolidadas no turno."
        },
        {
          "name": "total_orders",
          "type": "number",
          "nullable": false,
          "description": "Quantidade total de pedidos no turno."
        },
        {
          "name": "total_items",
          "type": "number",
          "nullable": true,
          "description": "Quantidade total de itens vendidos no turno."
        },
        {
          "name": "shift_opened_at",
          "type": "datetime",
          "nullable": false,
          "description": "Data e hora de abertura do turno reportado."
        },
        {
          "name": "shift_closed_at",
          "type": "datetime",
          "nullable": true,
          "description": "Data e hora de fechamento do turno reportado."
        },
        {
          "name": "notes",
          "type": "text",
          "nullable": true,
          "description": "Observações adicionais do fechamento do turno."
        },
        {
          "name": "created_at",
          "type": "datetime",
          "nullable": false,
          "description": "Data e hora de criação do relatório."
        },
        {
          "name": "updated_at",
          "type": "datetime",
          "nullable": false,
          "description": "Data e hora da última atualização do relatório."
        }
      ],
      "primaryKey": [
        "shift_report_id"
      ],
      "foreignRefs": [
        {
          "fieldName": "shift_id",
          "targetEntity": "Shift",
          "targetOwnership": "moduleOwned",
          "reason": "Relatório consolida um turno específico."
        }
      ],
      "indexes": [
        {
          "indexName": "idx_shift_reports_shift_id_unique",
          "columns": [
            "shift_id"
          ],
          "unique": true,
          "reason": "Garante um relatório por turno e lookup rápido pelo turno."
        },
        {
          "indexName": "idx_shift_reports_created_at",
          "columns": [
            "created_at"
          ],
          "unique": false,
          "reason": "Filtro por período de criação em consultas gerenciais."
        },
        {
          "indexName": "idx_shift_reports_shift_closed_at",
          "columns": [
            "shift_closed_at"
          ],
          "unique": false,
          "reason": "Filtro por data de fechamento do turno no dashboard."
        }
      ],
      "detailsColumn": {
        "enabled": true,
        "columnName": "details",
        "jsonSchemaRef": "ShiftReportDetails",
        "reason": "Armazenar quebras consolidadas (formas de pagamento, categorias, descontos) sem necessidade de colunas próprias."
      },
      "metricUpdatePolicy": {
        "feedsMetrics": true,
        "metricRefs": [
          "dailySalesMetricTable"
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
        "shiftClosureRequiresNoOpenOrders"
      ]
    },
    "defsPlan": {
      "fileName": "tables/shiftReport.defs.ts",
      "exportName": "shiftReportTableDefinition",
      "saveAsDefs": true
    }
  }
} as const;

export default shiftReportTableDefinition;

export const pipeline = [
  {
    "id": "shiftReport__layer_1_external",
    "type": "layer_1_external",
    "outputPath": "_102043_/l1/cafeFlow/layer_1_external/shiftReport.ts",
    "defPath": "_102043_/l1/cafeFlow/layer_1_external/shiftReport.defs.ts",
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
