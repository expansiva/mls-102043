/// <mls fileReference="_102043_/l5/cafeFlow/ontology/UnitOfMeasure.defs.ts" enhancement="_blank"/>

export const UnitOfMeasureEntityDefinition = {
  "schemaVersion": "2026-06-06",
  "artifactType": "ontologyEntity",
  "artifactId": "UnitOfMeasure",
  "moduleName": "cafeFlow",
  "status": "draft",
  "source": {
    "agentName": "agentPlanEntityDefinition",
    "stepId": 41,
    "planId": ""
  },
  "data": {
    "entityDefinition": {
      "entityId": "UnitOfMeasure",
      "title": "Unidade de Medida",
      "description": "Unidade usada nos itens de estoque e receitas.",
      "ownership": "mdmOwned",
      "fields": [
        {
          "fieldId": "unitOfMeasureId",
          "type": "uuid",
          "required": true,
          "description": "Identificador único da unidade de medida."
        },
        {
          "fieldId": "name",
          "type": "string",
          "required": true,
          "description": "Nome da unidade de medida."
        },
        {
          "fieldId": "symbol",
          "type": "string",
          "required": true,
          "description": "Símbolo ou abreviação da unidade de medida."
        },
        {
          "fieldId": "description",
          "type": "text",
          "required": false,
          "description": "Descrição complementar da unidade de medida."
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
      "rulesApplied": []
    }
  }
} as const;

export default UnitOfMeasureEntityDefinition;
