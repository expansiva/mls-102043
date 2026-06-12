/// <mls fileReference="_102043_/l1/cafeFlow/layer_3_usecases/atualizarStatusPedido-commands.defs.ts" enhancement="_blank"/>

export const atualizarStatusPedidoCommands = {
  "schemaVersion": "2026-06-06",
  "artifactType": "usecaseCommands",
  "artifactId": "atualizarStatusPedido",
  "moduleName": "cafeFlow",
  "status": "draft",
  "source": {
    "agentName": "agentPlanUsecaseDefinition",
    "stepId": 60,
    "planId": ""
  },
  "data": {
    "usecaseDefinition": {
      "usecaseId": "atualizarStatusPedido",
      "commands": [
        {
          "commandId": "atualizarStatusPedido",
          "input": [
            {
              "name": "pedidoId",
              "type": "string",
              "required": true
            },
            {
              "name": "novoStatus",
              "type": "string",
              "required": true
            }
          ],
          "output": [
            {
              "name": "pedidoId",
              "type": "string"
            },
            {
              "name": "status",
              "type": "string"
            }
          ]
        }
      ]
    }
  }
} as const;

export default atualizarStatusPedidoCommands;
