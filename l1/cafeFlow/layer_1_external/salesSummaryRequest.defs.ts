/// <mls fileReference="_102043_/l1/cafeFlow/layer_1_external/salesSummaryRequest.defs.ts" enhancement="_blank"/>

export const salesSummaryRequestTableDefinition = {
  "schemaVersion": "2026-06-06",
  "artifactType": "table",
  "artifactId": "salesSummaryRequest",
  "moduleName": "cafeFlow",
  "status": "draft",
  "source": {
    "agentName": "agentPlanTableDefinition",
    "stepId": 49,
    "planId": ""
  },
  "data": {
    "tableDefinition": {
      "tableId": "salesSummaryRequest",
      "tableName": "sales_summary_requests",
      "moduleId": "cafeFlow",
      "title": "Solicitações de Resumo de Vendas",
      "purpose": "Rastrear solicitações de resumo de vendas para o assistente IA.",
      "ownership": "moduleOwned",
      "rootEntity": "SalesSummaryRequest",
      "layer": "layer_1_external",
      "tableKind": "transactional",
      "columns": [
        {
          "name": "sales_summary_request_id",
          "type": "uuid",
          "nullable": false,
          "primaryKey": true,
          "description": "Identificador único da solicitação de resumo de vendas."
        },
        {
          "name": "shift_report_id",
          "type": "uuid",
          "nullable": false,
          "description": "Referência à consolidação de vendas usada na solicitação."
        },
        {
          "name": "request_status",
          "type": "text",
          "nullable": false,
          "default": "pending",
          "description": "Status da solicitação de resumo de vendas."
        },
        {
          "name": "created_at",
          "type": "datetime",
          "nullable": false,
          "description": "Data e hora de criação da solicitação."
        },
        {
          "name": "updated_at",
          "type": "datetime",
          "nullable": false,
          "description": "Data e hora da última atualização da solicitação."
        }
      ],
      "primaryKey": [
        "sales_summary_request_id"
      ],
      "foreignRefs": [
        {
          "fieldName": "shift_report_id",
          "targetEntity": "ShiftReport",
          "targetOwnership": "existingModuleOwned",
          "reason": "Solicitação depende da consolidação de vendas."
        }
      ],
      "indexes": [
        {
          "indexName": "ix_sales_summary_requests_shift_report_id",
          "columns": [
            "shift_report_id"
          ],
          "reason": "Busca por solicitações vinculadas ao relatório de turno."
        },
        {
          "indexName": "ix_sales_summary_requests_created_at",
          "columns": [
            "created_at"
          ],
          "reason": "Filtro por período para geração e auditoria."
        },
        {
          "indexName": "ix_sales_summary_requests_status",
          "columns": [
            "request_status"
          ],
          "reason": "Filtrar solicitações pendentes ou concluídas."
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
        "salesSummaryUsesLast7Days"
      ]
    },
    "defsPlan": {
      "fileName": "tables/salesSummaryRequest.defs.ts",
      "exportName": "salesSummaryRequestTableDefinition",
      "saveAsDefs": true
    }
  }
} as const;

export default salesSummaryRequestTableDefinition;
