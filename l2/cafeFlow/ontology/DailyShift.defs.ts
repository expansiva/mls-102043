/// <mls fileReference="_102043_/l2/cafeFlow/ontology/DailyShift.defs.ts" enhancement="_blank"/>

export const DailyShiftEntityDefinition = {
  "schemaVersion": "2026-06-06",
  "artifactType": "ontologyEntity",
  "artifactId": "DailyShift",
  "moduleName": "cafeFlow",
  "status": "draft",
  "source": {
    "agentName": "agentPlanEntityDefinition",
    "stepId": 40,
    "planId": ""
  },
  "data": {
    "entityDefinition": {
      "entityId": "DailyShift",
      "title": "Turno Diário",
      "description": "Registro de abertura e fechamento do turno com consolidação de vendas.",
      "ownership": "moduleOwned",
      "kind": "core",
      "fields": [
        {
          "fieldId": "dailyShiftId",
          "type": "uuid",
          "required": true,
          "description": "Identificador único do turno diário."
        },
        {
          "fieldId": "shiftDate",
          "type": "date",
          "required": true,
          "description": "Data do turno diário."
        },
        {
          "fieldId": "status",
          "type": "string",
          "required": true,
          "description": "Status do turno diário.",
          "enum": [
            "aberto",
            "fechado"
          ]
        },
        {
          "fieldId": "openedAt",
          "type": "datetime",
          "required": true,
          "description": "Data e hora de abertura do turno."
        },
        {
          "fieldId": "closedAt",
          "type": "datetime",
          "required": false,
          "description": "Data e hora de fechamento do turno."
        },
        {
          "fieldId": "openingCashAmount",
          "type": "money",
          "required": false,
          "description": "Valor de caixa informado na abertura do turno."
        },
        {
          "fieldId": "closingCashAmount",
          "type": "money",
          "required": false,
          "description": "Valor de caixa informado no fechamento do turno."
        },
        {
          "fieldId": "totalSalesAmount",
          "type": "money",
          "required": false,
          "description": "Total de vendas consolidadas no turno."
        },
        {
          "fieldId": "totalOrders",
          "type": "number",
          "required": false,
          "description": "Quantidade total de pedidos no turno."
        },
        {
          "fieldId": "notes",
          "type": "text",
          "required": false,
          "description": "Observações gerais do turno."
        },
        {
          "fieldId": "shiftClosingReportId",
          "type": "ShiftClosingReport",
          "required": false,
          "description": "Referência ao relatório de fechamento do turno."
        },
        {
          "fieldId": "createdAt",
          "type": "datetime",
          "required": true,
          "description": "Data e hora de criação do registro."
        },
        {
          "fieldId": "updatedAt",
          "type": "datetime",
          "required": true,
          "description": "Data e hora da última atualização do registro."
        }
      ],
      "statusEnum": [
        "aberto",
        "fechado"
      ],
      "rulesApplied": [
        "shiftMustBeOpenForOrders",
        "shiftCloseRequiresOrders"
      ]
    }
  }
} as const;

export default DailyShiftEntityDefinition;
