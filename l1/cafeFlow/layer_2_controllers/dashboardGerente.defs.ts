/// <mls fileReference="_102043_/l1/cafeFlow/layer_2_controllers/dashboardGerente.defs.ts" enhancement="_blank"/>

export const definition = `
## Definition
\`\`\`JSON
[
  {
    "commandName": "consultarDashboardGerente",
    "purpose": "Carregar métricas e visão geral do dia.",
    "kind": "query",
    "input": [
      {
        "name": "periodoInicio",
        "type": "date",
        "required": false
      },
      {
        "name": "periodoFim",
        "type": "date",
        "required": false
      },
      {
        "name": "turnoId",
        "type": "turnoId",
        "required": false
      }
    ],
    "output": [
      {
        "name": "totalRevenue",
        "type": "number"
      },
      {
        "name": "orderCount",
        "type": "number"
      },
      {
        "name": "averageTicket",
        "type": "number"
      },
      {
        "name": "itemsSold",
        "type": "number"
      },
      {
        "name": "serieVendasPorTurno",
        "type": "metricasEntityId"
      },
      {
        "name": "rankingItensMaisVendidos",
        "type": "metricasEntityId"
      }
    ],
    "readsEntities": [
      "metricasEntity"
    ],
    "writesEntities": [],
    "readsTables": [],
    "writesTables": [],
    "usecaseRefs": [
      "consultarDashboardGerente"
    ],
    "layerContract": {
      "controllerLayer": "layer_2_controllers",
      "mustCallLayer": "layer_3_usecases",
      "directTableAccessForbidden": true
    },
    "rulesApplied": []
  },
  {
    "commandName": "listarAlertasEstoqueBaixo",
    "purpose": "Exibir alertas de estoque baixo no painel.",
    "kind": "query",
    "input": [
      {
        "name": "statusAlerta",
        "type": "string",
        "required": false
      }
    ],
    "output": [
      {
        "name": "alertas",
        "type": "estoqueEntityId"
      }
    ],
    "readsEntities": [
      "estoqueEntity"
    ],
    "writesEntities": [],
    "readsTables": [],
    "writesTables": [],
    "usecaseRefs": [
      "listarAlertasEstoqueBaixo"
    ],
    "layerContract": {
      "controllerLayer": "layer_2_controllers",
      "mustCallLayer": "layer_3_usecases",
      "directTableAccessForbidden": true
    },
    "rulesApplied": []
  }
]
\`\`\`
`;

export const pipeline = [
  {
    "id": "dashboardGerente__layer_2_controllers",
    "type": "layer_2_controllers",
    "outputPath": "_102043_/l1/cafeFlow/layer_2_controllers/dashboardGerente.ts",
    "defPath": "_102043_/l1/cafeFlow/layer_2_controllers/dashboardGerente.defs.ts",
    "dependsFiles": [
      "_102043_/l1/cafeFlow/layer_3_usecases/consultarDashboardGerente.d.ts",
      "_102043_/l1/cafeFlow/layer_3_usecases/listarAlertasEstoqueBaixo.d.ts"
    ],
    "dependsOn": [],
    "agent": "agentMaterializeGen"
  }
] as const;
