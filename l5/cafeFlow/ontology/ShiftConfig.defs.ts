/// <mls fileReference="_102043_/l5/cafeFlow/ontology/ShiftConfig.defs.ts" enhancement="_blank"/>

export const ShiftConfigEntityDefinition = {
  "schemaVersion": "2026-06-06",
  "artifactType": "ontologyEntity",
  "artifactId": "ShiftConfig",
  "moduleName": "cafeFlow",
  "status": "draft",
  "source": {
    "agentName": "agentPlanEntityDefinition",
    "stepId": 42,
    "planId": ""
  },
  "data": {
    "entityDefinition": {
      "entityId": "ShiftConfig",
      "title": "Configuração de Turno",
      "description": "Parâmetros e horários de turnos usados no fechamento diário.",
      "ownership": "mdmOwned",
      "fields": [
        {
          "fieldId": "shiftConfigId",
          "type": "uuid",
          "required": true,
          "description": "Identificador único da configuração de turno."
        },
        {
          "fieldId": "name",
          "type": "string",
          "required": true,
          "description": "Nome da configuração de turno."
        },
        {
          "fieldId": "startTime",
          "type": "string",
          "required": true,
          "description": "Horário de início do turno (HH:mm)."
        },
        {
          "fieldId": "endTime",
          "type": "string",
          "required": true,
          "description": "Horário de término do turno (HH:mm)."
        },
        {
          "fieldId": "gracePeriodMinutes",
          "type": "number",
          "required": false,
          "description": "Minutos de tolerância para abertura/fechamento do turno."
        },
        {
          "fieldId": "breakMinutes",
          "type": "number",
          "required": false,
          "description": "Duração do intervalo padrão do turno em minutos."
        },
        {
          "fieldId": "isActive",
          "type": "boolean",
          "required": true,
          "description": "Indica se a configuração está ativa para uso."
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
      ]
    }
  }
} as const;

export default ShiftConfigEntityDefinition;
