/// <mls fileReference="_102043_/l1/cafeFlow/layer_3_usecases/criarCategoriaCardapio-commands.defs.ts" enhancement="_blank"/>

export const criarCategoriaCardapioCommands = {
  "schemaVersion": "2026-06-06",
  "artifactType": "usecaseCommands",
  "artifactId": "criarCategoriaCardapio",
  "moduleName": "cafeFlow",
  "status": "incomplete",
  "source": {
    "agentName": "agentPlanUsecaseDefinition",
    "stepId": 60,
    "planId": ""
  },
  "data": {
    "usecaseDefinition": {
      "usecaseId": "criarCategoriaCardapio",
      "commands": [
        {
          "commandId": "criarCategoriaCardapio",
          "input": [
            {
              "name": "nome",
              "type": "string",
              "required": true
            }
          ],
          "output": [
            {
              "name": "categoriaId",
              "type": "string"
            }
          ]
        }
      ]
    },
    "pendingQuestions": [
      "Além do nome, quais outros campos são obrigatórios para criar uma categoria (ex.: descrição, ordem de exibição, cardapioId)?",
      "O comando deve retornar apenas o identificador da categoria ou a entidade completa? Quais campos no retorno?"
    ]
  }
} as const;

export default criarCategoriaCardapioCommands;
