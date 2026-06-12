/// <mls fileReference="_102043_/l1/cafeFlow/layer_3_usecases/listarItensEstoque-commands.defs.ts" enhancement="_blank"/>

export const listarItensEstoqueCommands = {
  "schemaVersion": "2026-06-06",
  "artifactType": "usecaseCommands",
  "artifactId": "listarItensEstoque",
  "moduleName": "cafeFlow",
  "status": "draft",
  "source": {
    "agentName": "agentPlanUsecaseDefinition",
    "stepId": 58,
    "planId": ""
  },
  "data": {
    "usecaseDefinition": {
      "usecaseId": "listarItensEstoque",
      "commands": [
        {
          "commandId": "listarItensEstoque",
          "input": [],
          "output": [
            {
              "name": "itensEstoque",
              "type": "EstoqueEntity[]"
            }
          ]
        }
      ]
    }
  }
} as const;

export default listarItensEstoqueCommands;
