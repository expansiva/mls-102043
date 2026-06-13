/// <mls fileReference="_102043_/l5/cafeFlow/ontology/ShiftReport.defs.ts" enhancement="_blank"/>

export const ShiftReportEntityDefinition = {
  "schemaVersion": "2026-06-06",
  "artifactType": "ontologyEntity",
  "artifactId": "ShiftReport",
  "moduleName": "cafeFlow",
  "status": "draft",
  "source": {
    "agentName": "agentPlanEntityDefinition",
    "stepId": 38,
    "planId": ""
  },
  "data": {
    "entityDefinition": {
      "entityId": "ShiftReport",
      "title": "Relatório de Fechamento de Turno",
      "description": "Consolidação de vendas e indicadores do turno.",
      "ownership": "moduleOwned",
      "fields": [
        {
          "fieldId": "shiftReportId",
          "type": "uuid",
          "required": true,
          "description": "Identificador único do relatório de fechamento de turno."
        },
        {
          "fieldId": "shiftId",
          "type": "Shift",
          "required": true,
          "description": "Referência ao turno consolidado por este relatório."
        },
        {
          "fieldId": "totalSalesAmount",
          "type": "money",
          "required": true,
          "description": "Total de vendas consolidadas no turno."
        },
        {
          "fieldId": "totalOrders",
          "type": "number",
          "required": true,
          "description": "Quantidade total de pedidos no turno."
        },
        {
          "fieldId": "totalItems",
          "type": "number",
          "required": false,
          "description": "Quantidade total de itens vendidos no turno."
        },
        {
          "fieldId": "notes",
          "type": "text",
          "required": false,
          "description": "Observações adicionais do fechamento do turno."
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
      "rulesApplied": []
    }
  }
} as const;

export default ShiftReportEntityDefinition;
