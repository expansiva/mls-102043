/// <mls fileReference="_102043_/l1/cafeFlow/layer_3_usecases/solicitarResumoIa-commands.defs.ts" enhancement="_blank"/>

export const solicitarResumoIaCommands = {
  "schemaVersion": "2026-06-06",
  "artifactType": "usecaseCommands",
  "artifactId": "solicitarResumoIa",
  "moduleName": "cafeFlow",
  "status": "draft",
  "source": {
    "agentName": "agentPlanUsecaseDefinition",
    "stepId": 61,
    "planId": ""
  },
  "data": {
    "usecaseDefinition": {
      "usecaseId": "solicitarResumoIa",
      "commands": [
        {
          "commandId": "solicitarResumoIa",
          "input": [],
          "output": [
            {
              "name": "aiInsight",
              "type": "AiInsightEntity"
            }
          ]
        }
      ]
    }
  }
} as const;

export default solicitarResumoIaCommands;
