/// <mls fileReference="_102043_/l2/cafeFlow/ontology/AiInsightRequest.defs.ts" enhancement="_blank"/>

export const AiInsightRequestEntityDefinition = {
  "schemaVersion": "2026-06-06",
  "artifactType": "ontologyEntity",
  "artifactId": "AiInsightRequest",
  "moduleName": "cafeFlow",
  "status": "draft",
  "source": {
    "agentName": "agentPlanEntityDefinition",
    "stepId": 42,
    "planId": ""
  },
  "data": {
    "entityDefinition": {
      "entityId": "AiInsightRequest",
      "title": "Solicitação de Insight IA",
      "description": "Pedido de geração de resumo de vendas ou sugestão de promoções.",
      "ownership": "moduleOwned",
      "kind": "entity",
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
      "rulesApplied": [
        "aiInsightsUseMetrics"
      ]
    }
  }
} as const;

export default AiInsightRequestEntityDefinition;
