/// <mls fileReference="_102043_/l1/cafeFlow/layer_3_usecases/excluirIngredienteItemCardapio-commands.defs.ts" enhancement="_blank"/>

export const excluirIngredienteItemCardapioCommands = {
  "schemaVersion": "2026-06-06",
  "artifactType": "usecaseCommands",
  "artifactId": "excluirIngredienteItemCardapio",
  "moduleName": "cafeFlow",
  "status": "draft",
  "source": {
    "agentName": "agentPlanUsecaseDefinition",
    "stepId": 62,
    "planId": ""
  },
  "data": {
    "usecaseDefinition": {
      "usecaseId": "excluirIngredienteItemCardapio",
      "commands": [
        {
          "commandId": "excluirIngredienteItemCardapio",
          "input": [
            {
              "name": "itemCardapioId",
              "type": "string",
              "required": true
            },
            {
              "name": "ingredienteId",
              "type": "string",
              "required": true
            }
          ],
          "output": []
        }
      ]
    }
  }
} as const;

export default excluirIngredienteItemCardapioCommands;
