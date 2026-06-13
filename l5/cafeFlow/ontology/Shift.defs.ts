/// <mls fileReference="_102043_/l5/cafeFlow/ontology/Shift.defs.ts" enhancement="_blank"/>

export const ShiftEntityDefinition = {
  "schemaVersion": "2026-06-06",
  "artifactType": "ontologyEntity",
  "artifactId": "Shift",
  "moduleName": "cafeFlow",
  "status": "draft",
  "source": {
    "agentName": "agentPlanEntityDefinition",
    "stepId": 41,
    "planId": ""
  },
  "data": {
    "entityDefinition": {
      "entityId": "Shift",
      "title": "Turno Diário",
      "description": "Período operacional com abertura e fechamento.",
      "ownership": "moduleOwned",
      "fields": [
        {
          "fieldId": "shiftId",
          "type": "uuid",
          "required": true,
          "description": "Identificador único do turno."
        },
        {
          "fieldId": "shiftConfigId",
          "type": "ShiftConfig",
          "required": true,
          "description": "Configuração de turno aplicada ao período operacional."
        },
        {
          "fieldId": "status",
          "type": "string",
          "required": true,
          "description": "Status atual do turno.",
          "enum": [
            "aberto",
            "emFechamento",
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
        "emFechamento",
        "fechado"
      ],
      "rulesApplied": [
        "shiftClosureRequiresNoOpenOrders"
      ]
    }
  }
} as const;

export default ShiftEntityDefinition;
