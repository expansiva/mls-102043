/// <mls fileReference="_102043_/l1/cafeFlow/layer_4_entities/AiInsightEntity.defs.ts" enhancement="_blank"/>

export const entity = {
  "entityId": "AiInsightEntity",
  "title": "Entidade de Insight IA",
  "purpose": "Gerencia solicitações de insights da IA baseadas em métricas consolidadas.",
  "layer": "layer_4_entities",
  "fields": [
    {
      "fieldId": "aiInsightRequestId",
      "type": "uuid",
      "required": true,
      "description": "Identificador único da solicitação de insight IA."
    },
    {
      "fieldId": "insightType",
      "type": "string",
      "required": true,
      "description": "Tipo de insight solicitado.",
      "enum": [
        "resumoVendas",
        "sugestaoPromocoes"
      ]
    },
    {
      "fieldId": "status",
      "type": "string",
      "required": true,
      "description": "Status atual da solicitação de insight.",
      "enum": [
        "solicitado",
        "gerado",
        "falhou"
      ]
    },
    {
      "fieldId": "dailyShiftId",
      "type": "DailyShift",
      "required": false,
      "description": "Referência ao turno do dia relacionado à solicitação."
    },
    {
      "fieldId": "createdAt",
      "type": "datetime",
      "required": true,
      "description": "Data e hora de criação da solicitação."
    },
    {
      "fieldId": "updatedAt",
      "type": "datetime",
      "required": true,
      "description": "Data e hora da última atualização da solicitação."
    }
  ],
  "statusEnum": [
    "solicitado",
    "gerado",
    "falhou"
  ],
  "lifecycleStates": [
    "solicitado",
    "gerado",
    "falhou"
  ],
  "sourceTables": [
    {
      "tableName": "ai_insight_request",
      "ownership": "moduleOwned"
    }
  ],
  "storage": [
    {
      "kind": "moduleTable",
      "tableId": "aiInsightRequest",
      "tableName": "ai_insight_request",
      "fileRef": "_102043_/l1/cafeFlow/layer_1_external/aiInsightRequest.defs.ts"
    }
  ],
  "allowedOperations": [
    "create",
    "read",
    "update",
    "list"
  ],
  "rulesApplied": [
    "aiInsightsUseMetrics"
  ],
  "usecaseRefs": [
    "solicitarResumoIa",
    "listarSolicitacoesIa",
    "obterSolicitacaoIa"
  ],
  "materialization": {
    "fileName": "layer_4_entities/AiInsightEntity.ts",
    "className": "AiInsightEntity",
    "contractName": "IAiInsightEntity"
  }
} as const;

export default entity;
