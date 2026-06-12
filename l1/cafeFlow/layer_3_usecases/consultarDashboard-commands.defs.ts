/// <mls fileReference="_102043_/l1/cafeFlow/layer_3_usecases/consultarDashboard-commands.defs.ts" enhancement="_blank"/>

export const consultarDashboardCommands = {
  "schemaVersion": "2026-06-06",
  "artifactType": "usecaseCommands",
  "artifactId": "consultarDashboard",
  "moduleName": "cafeFlow",
  "status": "draft",
  "source": {
    "agentName": "agentPlanUsecaseDefinition",
    "stepId": 59,
    "planId": ""
  },
  "data": {
    "usecaseDefinition": {
      "usecaseId": "consultarDashboard",
      "commands": [
        {
          "commandId": "consultarDashboard",
          "input": [],
          "output": [
            {
              "name": "pedidos",
              "type": "PedidoEntity[]"
            },
            {
              "name": "turnos",
              "type": "TurnoEntity[]"
            },
            {
              "name": "estoqueItens",
              "type": "EstoqueEntity[]"
            },
            {
              "name": "metricasVendasDiarias",
              "type": "DailySalesMetric[]"
            },
            {
              "name": "itensMaisVendidos",
              "type": "TopSellingItemMetric[]"
            },
            {
              "name": "alertasBaixoEstoque",
              "type": "LowStockMetric[]"
            }
          ]
        }
      ]
    }
  }
} as const;

export default consultarDashboardCommands;
