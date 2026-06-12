/// <mls fileReference="_102043_/l1/cafeFlow/layer_3_usecases/listarPedidos-commands.defs.ts" enhancement="_blank"/>

export const listarPedidosCommands = {
  "schemaVersion": "2026-06-06",
  "artifactType": "usecaseCommands",
  "artifactId": "listarPedidos",
  "moduleName": "cafeFlow",
  "status": "draft",
  "source": {
    "agentName": "agentPlanUsecaseDefinition",
    "stepId": 61,
    "planId": ""
  },
  "data": {
    "usecaseDefinition": {
      "usecaseId": "listarPedidos",
      "commands": [
        {
          "commandId": "listarPedidos",
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

export default listarPedidosCommands;
