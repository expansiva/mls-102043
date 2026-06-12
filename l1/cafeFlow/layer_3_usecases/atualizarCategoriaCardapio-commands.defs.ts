/// <mls fileReference="_102043_/l1/cafeFlow/layer_3_usecases/atualizarCategoriaCardapio-commands.defs.ts" enhancement="_blank"/>

export const atualizarCategoriaCardapioCommands = {
  "schemaVersion": "2026-06-06",
  "artifactType": "usecaseCommands",
  "artifactId": "atualizarCategoriaCardapio",
  "moduleName": "cafeFlow",
  "status": "incomplete",
  "source": {
    "agentName": "agentPlanUsecaseDefinition",
    "stepId": 61,
    "planId": ""
  },
  "data": {
    "usecaseDefinition": {
      "usecaseId": "atualizarCategoriaCardapio",
      "commands": [
        {
          "commandId": "atualizarCategoriaCardapio",
          "input": [
            {
              "name": "categoryId",
              "type": "string",
              "required": true
            },
            {
              "name": "categoria",
              "type": "CardapioEntity",
              "required": true
            }
          ],
          "output": [
            {
              "name": "categoriaAtualizada",
              "type": "CardapioEntity"
            }
          ]
        }
      ]
    },
    "pendingQuestions": [
      "Quais campos de CardapioEntity podem ser atualizados na categoria (ex.: nome, descrição, status/ativo, ordem)?",
      "O identificador da categoria é um campo do próprio CardapioEntity ou separado (categoryId)? Qual é o nome oficial desse campo?",
      "Há validações obrigatórias (ex.: nome único) que impactem a assinatura do comando?"
    ]
  }
} as const;

export default atualizarCategoriaCardapioCommands;
