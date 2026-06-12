/// <mls fileReference="_102043_/l1/cafeFlow/layer_3_usecases/listarAjustesEstoque-commands.defs.ts" enhancement="_blank"/>

export const listarAjustesEstoqueCommands = {
  "schemaVersion": "2026-06-06",
  "artifactType": "usecaseCommands",
  "artifactId": "listarAjustesEstoque",
  "moduleName": "cafeFlow",
  "status": "draft",
  "source": {
    "agentName": "agentPlanUsecaseDefinition",
    "stepId": 58,
    "planId": ""
  },
  "data": {
    "usecaseDefinition": {
      "usecaseId": "listarAjustesEstoque",
      "commands": [
        {
          "commandId": "listarAjustesEstoque",
          "input": [],
          "output": [
            {
              "name": "ajustesEstoque",
              "type": "EstoqueEntity[]"
            }
          ]
        }
      ]
    }
  }
} as const;

export default listarAjustesEstoqueCommands;
