/// <mls fileReference="_102043_/l1/cafeFlow/layer_3_usecases/listarIngredientesItemCardapio-commands.defs.ts" enhancement="_blank"/>

export const listarIngredientesItemCardapioCommands = {
  "schemaVersion": "2026-06-06",
  "artifactType": "usecaseCommands",
  "artifactId": "listarIngredientesItemCardapio",
  "moduleName": "cafeFlow",
  "status": "draft",
  "source": {
    "agentName": "agentPlanUsecaseDefinition",
    "stepId": 60,
    "planId": ""
  },
  "data": {
    "usecaseDefinition": {
      "usecaseId": "listarIngredientesItemCardapio",
      "commands": [
        {
          "commandId": "listarIngredientesItemCardapio",
          "input": [
            {
              "name": "menuItemId",
              "type": "string",
              "required": true
            }
          ],
          "output": [
            {
              "name": "ingredientes",
              "type": "CardapioIngrediente[]"
            }
          ]
        }
      ]
    }
  }
} as const;

export default listarIngredientesItemCardapioCommands;
