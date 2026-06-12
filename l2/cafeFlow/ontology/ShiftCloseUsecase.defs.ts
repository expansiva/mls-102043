/// <mls fileReference="_102043_/l2/cafeFlow/ontology/ShiftCloseUsecase.defs.ts" enhancement="_blank"/>

export const ShiftCloseUsecaseEntityDefinition = {
  "schemaVersion": "2026-06-06",
  "artifactType": "ontologyEntity",
  "artifactId": "ShiftCloseUsecase",
  "moduleName": "cafeFlow",
  "status": "draft",
  "source": {
    "agentName": "agentPlanEntityDefinition",
    "stepId": 38,
    "planId": ""
  },
  "data": {
    "entityDefinition": {
      "entityId": "ShiftCloseUsecase",
      "title": "Fechamento de Turno (Caso de Uso)",
      "description": "Entidade operacional para o processo de fechamento diário.",
      "ownership": "moduleOwned",
      "kind": "usecase",
      "fields": [
        {
          "fieldId": "shiftCloseUsecaseId",
          "type": "uuid",
          "required": true,
          "description": "Identificador único do caso de uso de fechamento de turno."
        },
        {
          "fieldId": "status",
          "type": "string",
          "required": true,
          "description": "Status atual do processo de fechamento de turno.",
          "enum": [
            "aberto",
            "emProgresso",
            "concluido",
            "falhou",
            "cancelado"
          ]
        },
        {
          "fieldId": "startedAt",
          "type": "datetime",
          "required": true,
          "description": "Data e hora de início do fechamento de turno."
        },
        {
          "fieldId": "completedAt",
          "type": "datetime",
          "required": false,
          "description": "Data e hora de conclusão do fechamento de turno."
        },
        {
          "fieldId": "notes",
          "type": "text",
          "required": false,
          "description": "Observações gerais registradas durante o fechamento do turno."
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
        "emProgresso",
        "concluido",
        "falhou",
        "cancelado"
      ],
      "lifecycleStates": [
        "aberto",
        "emProgresso",
        "concluido",
        "falhou",
        "cancelado"
      ],
      "rulesApplied": [
        "shiftCloseRequiresOrders"
      ]
    }
  }
} as const;

export default ShiftCloseUsecaseEntityDefinition;
