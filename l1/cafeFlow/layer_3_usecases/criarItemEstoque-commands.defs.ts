/// <mls fileReference="_102043_/l1/cafeFlow/layer_3_usecases/criarItemEstoque-commands.defs.ts" enhancement="_blank"/>

export const criarItemEstoqueCommands = {
  "schemaVersion": "2026-06-06",
  "artifactType": "usecaseCommands",
  "artifactId": "criarItemEstoque",
  "moduleName": "cafeFlow",
  "status": "incomplete",
  "source": {
    "agentName": "agentPlanUsecaseDefinition",
    "stepId": 62,
    "planId": ""
  },
  "data": {
    "usecaseDefinition": {
      "usecaseId": "criarItemEstoque",
      "commands": [
        {
          "commandId": "criarItemEstoque",
          "input": [
            {
              "name": "estoque",
              "type": "EstoqueEntity",
              "required": true
            }
          ],
          "output": [
            {
              "name": "estoque",
              "type": "EstoqueEntity"
            }
          ]
        }
      ]
    },
    "pendingQuestions": [
      "Quais campos compõem a EstoqueEntity para o cadastro do item?",
      "Existe algum identificador gerado que precise ser retornado além da EstoqueEntity completa?"
    ]
  }
} as const;

export default criarItemEstoqueCommands;
