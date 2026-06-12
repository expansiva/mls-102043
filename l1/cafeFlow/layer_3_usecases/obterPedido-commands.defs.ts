/// <mls fileReference="_102043_/l1/cafeFlow/layer_3_usecases/obterPedido-commands.defs.ts" enhancement="_blank"/>

export const obterPedidoCommands = {
  "schemaVersion": "2026-06-06",
  "artifactType": "usecaseCommands",
  "artifactId": "obterPedido",
  "moduleName": "cafeFlow",
  "status": "incomplete",
  "source": {
    "agentName": "agentPlanUsecaseDefinition",
    "stepId": 58,
    "planId": ""
  },
  "data": {
    "usecaseDefinition": {
      "usecaseId": "obterPedido",
      "commands": [
        {
          "commandId": "obterPedido",
          "input": [
            {
              "name": "pedidoId",
              "type": "string",
              "required": true
            }
          ],
          "output": [
            {
              "name": "pedido",
              "type": "PedidoEntity"
            }
          ]
        }
      ]
    },
    "pendingQuestions": [
      "Qual é o identificador do pedido que deve ser usado como entrada (ex.: pedidoId)?"
    ]
  }
} as const;

export default obterPedidoCommands;
