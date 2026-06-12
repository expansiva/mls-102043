/// <mls fileReference="_102043_/l1/cafeFlow/layer_3_usecases/criarPedido-commands.defs.ts" enhancement="_blank"/>

export const criarPedidoCommands = {
  "schemaVersion": "2026-06-06",
  "artifactType": "usecaseCommands",
  "artifactId": "criarPedido",
  "moduleName": "cafeFlow",
  "status": "draft",
  "source": {
    "agentName": "agentPlanUsecaseDefinition",
    "stepId": 58,
    "planId": ""
  },
  "data": {
    "usecaseDefinition": {
      "usecaseId": "criarPedido",
      "commands": [
        {
          "commandId": "criarPedido",
          "input": [
            {
              "name": "pedido",
              "type": "PedidoEntity",
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
    }
  }
} as const;

export default criarPedidoCommands;
