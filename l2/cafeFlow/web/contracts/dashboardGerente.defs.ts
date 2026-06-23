/// <mls fileReference="_102043_/l2/cafeFlow/web/contracts/dashboardGerente.defs.ts" enhancement="_blank"/>

export const definition = [
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
];

export const pipeline = [
  {
    "id": "dashboardGerente__l2_contract",
    "type": "l2_contract",
    "outputPath": "_102043_/l2/cafeFlow/web/contracts/dashboardGerente.ts",
    "defPath": "_102043_/l2/cafeFlow/web/contracts/dashboardGerente.defs.ts",
    "dependsFiles": [],
    "dependsOn": [],
    "skills": [
      "_102020_/l2/agentMaterializeSolution/skills/genContract.ts"
    ],
    "agent": "agentMaterializeGen"
  }
] as const;
