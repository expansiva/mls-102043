/// <mls fileReference="_102043_/l1/cafeFlow/layer_3_usecases/obterSolicitacaoIa-commands.defs.ts" enhancement="_blank"/>

export const obterSolicitacaoIaCommands = {
  "schemaVersion": "2026-06-06",
  "artifactType": "usecaseCommands",
  "artifactId": "obterSolicitacaoIa",
  "moduleName": "cafeFlow",
  "status": "incomplete",
  "source": {
    "agentName": "agentPlanUsecaseDefinition",
    "stepId": 62,
    "planId": ""
  },
  "data": {
    "usecaseDefinition": {
      "usecaseId": "obterSolicitacaoIa",
      "commands": [
        {
          "commandId": "obterSolicitacaoIa",
          "input": [
            {
              "name": "aiInsightId",
              "type": "string",
              "required": true
            }
          ],
          "output": [
            {
              "name": "aiInsight",
              "type": "AiInsightEntity"
            }
          ]
        }
      ]
    },
    "pendingQuestions": [
      "Qual é o identificador usado para buscar a solicitação (por exemplo, aiInsightId ou outro campo)?"
    ]
  }
} as const;

export default obterSolicitacaoIaCommands;
