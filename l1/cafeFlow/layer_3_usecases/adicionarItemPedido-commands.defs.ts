/// <mls fileReference="_102043_/l1/cafeFlow/layer_3_usecases/adicionarItemPedido-commands.defs.ts" enhancement="_blank"/>

export const adicionarItemPedidoCommands = {
  "schemaVersion": "2026-06-06",
  "artifactType": "usecaseCommands",
  "artifactId": "adicionarItemPedido",
  "moduleName": "cafeFlow",
  "status": "draft",
  "source": {
    "agentName": "agentPlanUsecaseDefinition",
    "stepId": 59,
    "planId": ""
  },
  "data": {
    "usecaseDefinition": {
      "usecaseId": "adicionarItemPedido",
      "commands": [
        {
          "commandId": "adicionarItemPedido",
          "input": [
            {
              "name": "pedidoId",
              "type": "string",
              "required": true
            },
            {
              "name": "menuItemId",
              "type": "string",
              "required": true
            },
            {
              "name": "quantidade",
              "type": "number",
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

export default adicionarItemPedidoCommands;
