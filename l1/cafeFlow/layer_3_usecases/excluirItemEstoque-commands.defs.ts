/// <mls fileReference="_102043_/l1/cafeFlow/layer_3_usecases/excluirItemEstoque-commands.defs.ts" enhancement="_blank"/>

export const excluirItemEstoqueCommands = {
  "schemaVersion": "2026-06-06",
  "artifactType": "usecaseCommands",
  "artifactId": "excluirItemEstoque",
  "moduleName": "cafeFlow",
  "status": "draft",
  "source": {
    "agentName": "agentPlanUsecaseDefinition",
    "stepId": 59,
    "planId": ""
  },
  "data": {
    "usecaseDefinition": {
      "usecaseId": "excluirItemEstoque",
      "commands": [
        {
          "commandId": "excluirItemEstoque",
          "input": [
            {
              "name": "inventoryItemId",
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

export default excluirItemEstoqueCommands;
