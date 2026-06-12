/// <mls fileReference="_102043_/l1/cafeFlow/layer_3_usecases/listarItensCardapioMdm-commands.defs.ts" enhancement="_blank"/>

export const listarItensCardapioMdmCommands = {
  "schemaVersion": "2026-06-06",
  "artifactType": "usecaseCommands",
  "artifactId": "listarItensCardapioMdm",
  "moduleName": "cafeFlow",
  "status": "draft",
  "source": {
    "agentName": "agentPlanUsecaseDefinition",
    "stepId": 61,
    "planId": ""
  },
  "data": {
    "usecaseDefinition": {
      "usecaseId": "listarItensCardapioMdm",
      "commands": [
        {
          "commandId": "listarItensCardapioMdm",
          "input": [],
          "output": [
            {
              "name": "itensCardapio",
              "type": "CardapioEntity[]"
            }
          ]
        }
      ]
    }
  }
} as const;

export default listarItensCardapioMdmCommands;
