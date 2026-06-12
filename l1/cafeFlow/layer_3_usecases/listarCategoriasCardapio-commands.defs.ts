/// <mls fileReference="_102043_/l1/cafeFlow/layer_3_usecases/listarCategoriasCardapio-commands.defs.ts" enhancement="_blank"/>

export const listarCategoriasCardapioCommands = {
  "schemaVersion": "2026-06-06",
  "artifactType": "usecaseCommands",
  "artifactId": "listarCategoriasCardapio",
  "moduleName": "cafeFlow",
  "status": "draft",
  "source": {
    "agentName": "agentPlanUsecaseDefinition",
    "stepId": 62,
    "planId": ""
  },
  "data": {
    "usecaseDefinition": {
      "usecaseId": "listarCategoriasCardapio",
      "commands": [
        {
          "commandId": "listarCategoriasCardapio",
          "input": [],
          "output": [
            {
              "name": "categorias",
              "type": "CardapioEntity[]"
            }
          ]
        }
      ]
    }
  }
} as const;

export default listarCategoriasCardapioCommands;
