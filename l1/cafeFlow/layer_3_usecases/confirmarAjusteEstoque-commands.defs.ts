/// <mls fileReference="_102043_/l1/cafeFlow/layer_3_usecases/confirmarAjusteEstoque-commands.defs.ts" enhancement="_blank"/>

export const confirmarAjusteEstoqueCommands = {
  "schemaVersion": "2026-06-06",
  "artifactType": "usecaseCommands",
  "artifactId": "confirmarAjusteEstoque",
  "moduleName": "cafeFlow",
  "status": "draft",
  "source": {
    "agentName": "agentPlanUsecaseDefinition",
    "stepId": 62,
    "planId": ""
  },
  "data": {
    "usecaseDefinition": {
      "usecaseId": "confirmarAjusteEstoque",
      "commands": [
        {
          "commandId": "confirmarAjusteEstoque",
          "input": [
            {
              "name": "ajusteEstoqueId",
              "type": "string",
              "required": true
            }
          ],
          "output": [
            {
              "name": "estoqueId",
              "type": "string"
            }
          ]
        }
      ]
    }
  }
} as const;

export default confirmarAjusteEstoqueCommands;
