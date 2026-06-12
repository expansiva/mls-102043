/// <mls fileReference="_102043_/l1/cafeFlow/layer_3_usecases/excluirCategoriaCardapio-commands.defs.ts" enhancement="_blank"/>

export const excluirCategoriaCardapioCommands = {
  "schemaVersion": "2026-06-06",
  "artifactType": "usecaseCommands",
  "artifactId": "excluirCategoriaCardapio",
  "moduleName": "cafeFlow",
  "status": "incomplete",
  "source": {
    "agentName": "agentPlanUsecaseDefinition",
    "stepId": 59,
    "planId": ""
  },
  "data": {
    "usecaseDefinition": {
      "usecaseId": "excluirCategoriaCardapio",
      "commands": [
        {
          "commandId": "excluirCategoriaCardapio",
          "input": [
            {
              "name": "cardapioId",
              "type": "string",
              "required": true
            },
            {
              "name": "categoriaId",
              "type": "string",
              "required": true
            }
          ],
          "output": []
        }
      ]
    },
    "pendingQuestions": [
      "Qual é o identificador obrigatório para excluir a categoria: apenas categoriaId ou também cardapioId?",
      "Existe algum retorno esperado (por exemplo, categoria removida ou confirmação)?"
    ]
  }
} as const;

export default excluirCategoriaCardapioCommands;
