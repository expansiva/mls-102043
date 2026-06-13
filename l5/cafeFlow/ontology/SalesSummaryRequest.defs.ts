/// <mls fileReference="_102043_/l5/cafeFlow/ontology/SalesSummaryRequest.defs.ts" enhancement="_blank"/>

export const SalesSummaryRequestEntityDefinition = {
  "schemaVersion": "2026-06-06",
  "artifactType": "ontologyEntity",
  "artifactId": "SalesSummaryRequest",
  "moduleName": "cafeFlow",
  "status": "draft",
  "source": {
    "agentName": "agentPlanEntityDefinition",
    "stepId": 42,
    "planId": ""
  },
  "data": {
    "entityDefinition": {
      "entityId": "SalesSummaryRequest",
      "title": "Solicitação de Resumo de Vendas",
      "description": "Pedido de geração de resumo e recomendações via IA.",
      "ownership": "moduleOwned",
      "fields": [
        {
          "fieldId": "salesSummaryRequestId",
          "type": "uuid",
          "required": true,
          "description": "Identificador único da solicitação de resumo de vendas."
        },
        {
          "fieldId": "shiftReportId",
          "type": "ShiftReport",
          "required": true,
          "description": "Referência à consolidação de vendas usada na solicitação."
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
      "rulesApplied": [
        "salesSummaryUsesLast7Days"
      ]
    }
  }
} as const;

export default SalesSummaryRequestEntityDefinition;
