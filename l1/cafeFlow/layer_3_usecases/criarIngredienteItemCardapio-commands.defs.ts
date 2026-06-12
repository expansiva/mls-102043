/// <mls fileReference="_102043_/l1/cafeFlow/layer_3_usecases/criarIngredienteItemCardapio-commands.defs.ts" enhancement="_blank"/>

export const criarIngredienteItemCardapioCommands = {
  "schemaVersion": "2026-06-06",
  "artifactType": "usecaseCommands",
  "artifactId": "criarIngredienteItemCardapio",
  "moduleName": "cafeFlow",
  "status": "draft",
  "source": {
    "agentName": "agentPlanUsecaseDefinition",
    "stepId": 58,
    "planId": ""
  },
  "data": {
    "usecaseDefinition": {
      "usecaseId": "criarIngredienteItemCardapio",
      "commands": [
        {
          "commandId": "criarIngredienteItemCardapio",
          "input": [
            {
              "name": "menuItemId",
              "type": "string",
              "required": true
            },
            {
              "name": "inventoryItemId",
              "type": "string",
              "required": true
            }
          ],
          "output": [
            {
              "name": "cardapioId",
              "type": "string"
            }
          ]
        }
      ]
    }
  }
} as const;

export default criarIngredienteItemCardapioCommands;
