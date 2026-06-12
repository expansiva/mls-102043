/// <mls fileReference="_102043_/l1/cafeFlow/layer_3_usecases/atualizarItemEstoque-commands.defs.ts" enhancement="_blank"/>

export const atualizarItemEstoqueCommands = {
  "schemaVersion": "2026-06-06",
  "artifactType": "usecaseCommands",
  "artifactId": "atualizarItemEstoque",
  "moduleName": "cafeFlow",
  "status": "incomplete",
  "source": {
    "agentName": "agentPlanUsecaseDefinition",
    "stepId": 61,
    "planId": ""
  },
  "data": {
    "usecaseDefinition": {
      "usecaseId": "atualizarItemEstoque",
      "commands": [
        {
          "commandId": "atualizarItemEstoque",
          "input": [
            {
              "name": "estoqueItemId",
              "type": "string",
              "required": true
            },
            {
              "name": "quantidade",
              "type": "number",
              "required": false
            },
            {
              "name": "dadosItem",
              "type": "string",
              "required": false
            }
          ],
          "output": [
            {
              "name": "estoqueItem",
              "type": "EstoqueEntity"
            }
          ]
        }
      ]
    },
    "pendingQuestions": [
      "Quais campos específicos de EstoqueEntity podem ser atualizados além da quantidade (ex.: nome, categoria, localização, custo)?",
      "Existe um identificador oficial do item de estoque que deve ser usado (ex.: itemId, sku)?",
      "A atualização deve permitir campos parciais?",
      "O retorno deve incluir apenas o item atualizado ou algum indicador extra (ex.: métricas de baixo estoque)?"
    ]
  }
} as const;

export default atualizarItemEstoqueCommands;
