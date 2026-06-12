/// <mls fileReference="_102043_/l1/cafeFlow/layer_3_usecases/criarAjusteEstoque-commands.defs.ts" enhancement="_blank"/>

export const criarAjusteEstoqueCommands = {
  "schemaVersion": "2026-06-06",
  "artifactType": "usecaseCommands",
  "artifactId": "criarAjusteEstoque",
  "moduleName": "cafeFlow",
  "status": "draft",
  "source": {
    "agentName": "agentPlanUsecaseDefinition",
    "stepId": 60,
    "planId": ""
  },
  "data": {
    "usecaseDefinition": {
      "usecaseId": "criarAjusteEstoque",
      "commands": [
        {
          "commandId": "criarAjusteEstoque",
          "input": [
            {
              "name": "inventoryItemId",
              "type": "string",
              "required": true
            },
            {
              "name": "ajusteTipo",
              "type": "string",
              "required": true
            },
            {
              "name": "quantidade",
              "type": "number",
              "required": true
            }
          ],
          "output": [
            {
              "name": "inventoryItemId",
              "type": "string"
            },
            {
              "name": "quantidadeAtual",
              "type": "number"
            }
          ]
        }
      ]
    }
  }
} as const;

export default criarAjusteEstoqueCommands;
