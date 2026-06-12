/// <mls fileReference="_102043_/l1/cafeFlow/layer_3_usecases/listarPedidosCozinha-commands.defs.ts" enhancement="_blank"/>

export const listarPedidosCozinhaCommands = {
  "schemaVersion": "2026-06-06",
  "artifactType": "usecaseCommands",
  "artifactId": "listarPedidosCozinha",
  "moduleName": "cafeFlow",
  "status": "draft",
  "source": {
    "agentName": "agentPlanUsecaseDefinition",
    "stepId": 62,
    "planId": ""
  },
  "data": {
    "usecaseDefinition": {
      "usecaseId": "listarPedidosCozinha",
      "commands": [
        {
          "commandId": "listarPedidosCozinha",
          "input": [],
          "output": [
            {
              "name": "pedidos",
              "type": "PedidoEntity[]"
            }
          ]
        }
      ]
    }
  }
} as const;

export default listarPedidosCozinhaCommands;
