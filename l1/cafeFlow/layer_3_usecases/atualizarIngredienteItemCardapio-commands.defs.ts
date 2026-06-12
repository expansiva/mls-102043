/// <mls fileReference="_102043_/l1/cafeFlow/layer_3_usecases/atualizarIngredienteItemCardapio-commands.defs.ts" enhancement="_blank"/>

export const atualizarIngredienteItemCardapioCommands = {
  "schemaVersion": "2026-06-06",
  "artifactType": "usecaseCommands",
  "artifactId": "atualizarIngredienteItemCardapio",
  "moduleName": "cafeFlow",
  "status": "draft",
  "source": {
    "agentName": "agentPlanUsecaseDefinition",
    "stepId": 59,
    "planId": ""
  },
  "data": {
    "usecaseDefinition": {
      "usecaseId": "atualizarIngredienteItemCardapio",
      "commands": [
        {
          "commandId": "atualizarIngredienteItemCardapio",
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
            },
            {
              "name": "quantidade",
              "type": "number",
              "required": false
            },
            {
              "name": "itemEstoqueId",
              "type": "string",
              "required": false
            }
          ],
          "output": [
            {
              "name": "cardapio",
              "type": "CardapioEntity"
            }
          ]
        }
      ]
    }
  }
} as const;

export default atualizarIngredienteItemCardapioCommands;
