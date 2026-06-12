/// <mls fileReference="_102043_/l1/cafeFlow/layer_3_usecases/listarSolicitacoesIa-commands.defs.ts" enhancement="_blank"/>

export const listarSolicitacoesIaCommands = {
  "schemaVersion": "2026-06-06",
  "artifactType": "usecaseCommands",
  "artifactId": "listarSolicitacoesIa",
  "moduleName": "cafeFlow",
  "status": "draft",
  "source": {
    "agentName": "agentPlanUsecaseDefinition",
    "stepId": 60,
    "planId": ""
  },
  "data": {
    "usecaseDefinition": {
      "usecaseId": "listarSolicitacoesIa",
      "commands": [
        {
          "commandId": "listarSolicitacoesIa",
          "input": [],
          "output": [
            {
              "name": "solicitacoes",
              "type": "AiInsightEntity[]"
            }
          ]
        }
      ]
    }
  }
} as const;

export default listarSolicitacoesIaCommands;
