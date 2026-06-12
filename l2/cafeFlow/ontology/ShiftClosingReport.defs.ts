/// <mls fileReference="_102043_/l2/cafeFlow/ontology/ShiftClosingReport.defs.ts" enhancement="_blank"/>

export const ShiftClosingReportEntityDefinition = {
  "schemaVersion": "2026-06-06",
  "artifactType": "ontologyEntity",
  "artifactId": "ShiftClosingReport",
  "moduleName": "cafeFlow",
  "status": "draft",
  "source": {
    "agentName": "agentPlanEntityDefinition",
    "stepId": 42,
    "planId": ""
  },
  "data": {
    "entityDefinition": {
      "entityId": "ShiftClosingReport",
      "title": "Relatório de Fechamento de Turno",
      "description": "Resumo consolidado do turno diário para conferência do gerente.",
      "ownership": "moduleOwned",
      "fields": [
        {
          "fieldId": "shiftClosingReportId",
          "type": "uuid",
          "required": true,
          "description": "Identificador único do relatório de fechamento do turno."
        },
        {
          "fieldId": "dailyShiftId",
          "type": "DailyShift",
          "required": true,
          "description": "Turno diário ao qual este relatório de fechamento se refere."
        },
        {
          "fieldId": "totalSales",
          "type": "money",
          "required": true,
          "description": "Valor total de vendas consolidadas no período do turno."
        },
        {
          "fieldId": "totalOrders",
          "type": "number",
          "required": true,
          "description": "Quantidade total de pedidos consolidados no turno."
        },
        {
          "fieldId": "totalItems",
          "type": "number",
          "required": false,
          "description": "Quantidade total de itens vendidos no turno."
        },
        {
          "fieldId": "cashTotal",
          "type": "money",
          "required": false,
          "description": "Total recebido em dinheiro no turno."
        },
        {
          "fieldId": "cardTotal",
          "type": "money",
          "required": false,
          "description": "Total recebido em cartão no turno."
        },
        {
          "fieldId": "pixTotal",
          "type": "money",
          "required": false,
          "description": "Total recebido via PIX no turno."
        },
        {
          "fieldId": "cancellationsTotal",
          "type": "money",
          "required": false,
          "description": "Valor total de cancelamentos estornados no turno."
        },
        {
          "fieldId": "notes",
          "type": "text",
          "required": false,
          "description": "Observações do gerente sobre o fechamento do turno."
        },
        {
          "fieldId": "createdAt",
          "type": "datetime",
          "required": true,
          "description": "Data e hora de criação do relatório."
        },
        {
          "fieldId": "updatedAt",
          "type": "datetime",
          "required": true,
          "description": "Data e hora da última atualização do relatório."
        }
      ],
      "rulesApplied": [
        "shiftCloseRequiresOrders"
      ]
    }
  }
} as const;

export default ShiftClosingReportEntityDefinition;
