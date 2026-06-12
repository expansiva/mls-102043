/// <mls fileReference="_102043_/l1/cafeFlow/layer_1_external/aiInsightRequest.defs.ts" enhancement="_blank"/>

export const aiInsightRequestTableDefinition = {
  "schemaVersion": "2026-06-06",
  "artifactType": "table",
  "artifactId": "aiInsightRequest",
  "moduleName": "cafeFlow",
  "status": "draft",
  "source": {
    "agentName": "agentPlanTableDefinition",
    "stepId": 49,
    "planId": ""
  },
  "data": {
    "tableDefinition": {
      "tableId": "aiInsightRequest",
      "tableName": "ai_insight_request",
      "moduleId": "cafeFlow",
      "title": "Solicitações de insight IA",
      "purpose": "Rastrear solicitações e resultados do assistente IA usando métricas consolidadas.",
      "ownership": "moduleOwned",
      "rootEntity": "AiInsightRequest",
      "layer": "layer_1_external",
      "tableKind": "transactional",
      "columns": [
        {
          "name": "ai_insight_request_id",
          "type": "uuid",
          "nullable": false,
          "primaryKey": true,
          "description": "Identificador único da solicitação de insight IA."
        },
        {
          "name": "insight_type",
          "type": "string",
          "nullable": false,
          "description": "Tipo de insight solicitado."
        },
        {
          "name": "status",
          "type": "string",
          "nullable": false,
          "description": "Status atual da solicitação de insight."
        },
        {
          "name": "daily_shift_id",
          "type": "uuid",
          "nullable": true,
          "description": "Referência ao turno do dia relacionado à solicitação."
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
        "ai_insight_request_id"
      ],
      "foreignRefs": [
        {
          "fieldName": "daily_shift_id",
          "targetEntity": "DailyShift",
          "targetOwnership": "moduleOwned",
          "reason": "Solicitação pode estar vinculada a um turno específico."
        }
      ],
      "indexes": [
        {
          "indexName": "idx_ai_insight_request_status",
          "columns": [
            "status"
          ],
          "unique": false,
          "reason": "Filtrar solicitações por status no fluxo de geração."
        },
        {
          "indexName": "idx_ai_insight_request_created_at",
          "columns": [
            "created_at"
          ],
          "unique": false,
          "reason": "Filtrar por período para relatórios e auditoria."
        },
        {
          "indexName": "idx_ai_insight_request_daily_shift_id",
          "columns": [
            "daily_shift_id"
          ],
          "unique": false,
          "reason": "Consultar solicitações por turno."
        },
        {
          "indexName": "idx_ai_insight_request_insight_type",
          "columns": [
            "insight_type"
          ],
          "unique": false,
          "reason": "Filtrar por tipo de insight solicitado."
        }
      ],
      "detailsColumn": {
        "enabled": false
      },
      "metricUpdatePolicy": {
        "feedsMetrics": true,
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
        "aiInsightsUseMetrics"
      ]
    },
    "defsPlan": {
      "fileName": "tables/aiInsightRequest.defs.ts",
      "exportName": "aiInsightRequestTableDefinition",
      "saveAsDefs": true
    }
  }
} as const;

export default aiInsightRequestTableDefinition;
