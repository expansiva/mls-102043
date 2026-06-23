/// <mls fileReference="_102043_/l2/cafeFlow/web/contracts/fechamentoTurno.defs.ts" enhancement="_blank"/>

export const definition = [
  {
    "commandName": "listarTurnos",
    "purpose": "Carregar turnos para seleção.",
    "kind": "query",
    "input": [
      {
        "name": "dataInicio",
        "type": "date",
        "required": false
      },
      {
        "name": "dataFim",
        "type": "date",
        "required": false
      },
      {
        "name": "status",
        "type": "string",
        "required": false
      }
    ],
    "output": [
      {
        "name": "shiftId",
        "type": "Shift"
      },
      {
        "name": "status",
        "type": "string"
      },
      {
        "name": "openedAt",
        "type": "datetime"
      },
      {
        "name": "closedAt",
        "type": "datetime"
      },
      {
        "name": "shiftConfigId",
        "type": "ShiftConfig"
      }
    ],
    "readsEntities": [
      "Shift"
    ],
    "writesEntities": [],
    "readsTables": [
      "shifts"
    ],
    "writesTables": [],
    "usecaseRefs": [
      "listarTurnos"
    ],
    "layerContract": {
      "controllerLayer": "layer_2_controllers",
      "mustCallLayer": "layer_3_usecases",
      "directTableAccessForbidden": true
    },
    "rulesApplied": []
  },
  {
    "commandName": "listarPedidos",
    "purpose": "Listar pedidos do turno para validação.",
    "kind": "query",
    "input": [
      {
        "name": "shiftId",
        "type": "Shift",
        "required": true
      },
      {
        "name": "status",
        "type": "string",
        "required": false
      }
    ],
    "output": [
      {
        "name": "orderId",
        "type": "Order"
      },
      {
        "name": "status",
        "type": "string"
      },
      {
        "name": "shiftId",
        "type": "Shift"
      },
      {
        "name": "createdAt",
        "type": "datetime"
      },
      {
        "name": "updatedAt",
        "type": "datetime"
      }
    ],
    "readsEntities": [
      "Order"
    ],
    "writesEntities": [],
    "readsTables": [
      "orders",
      "order_status_history"
    ],
    "writesTables": [],
    "usecaseRefs": [
      "listarPedidos"
    ],
    "layerContract": {
      "controllerLayer": "layer_2_controllers",
      "mustCallLayer": "layer_3_usecases",
      "directTableAccessForbidden": true
    },
    "rulesApplied": []
  },
  {
    "commandName": "fecharTurno",
    "purpose": "Confirmar fechamento do turno e gerar relatório.",
    "kind": "command",
    "input": [
      {
        "name": "shiftId",
        "type": "Shift",
        "required": true
      }
    ],
    "output": [
      {
        "name": "shiftId",
        "type": "Shift"
      },
      {
        "name": "status",
        "type": "string"
      },
      {
        "name": "closedAt",
        "type": "datetime"
      },
      {
        "name": "shiftReportId",
        "type": "ShiftReport"
      }
    ],
    "readsEntities": [
      "Shift",
      "Order"
    ],
    "writesEntities": [
      "Shift",
      "ShiftReport"
    ],
    "readsTables": [
      "shifts",
      "orders"
    ],
    "writesTables": [
      "shifts",
      "shift_reports",
      "daily_sales_metrics"
    ],
    "usecaseRefs": [
      "fecharTurno"
    ],
    "layerContract": {
      "controllerLayer": "layer_2_controllers",
      "mustCallLayer": "layer_3_usecases",
      "directTableAccessForbidden": true
    },
    "rulesApplied": [
      "shiftClosureRequiresNoOpenOrders"
    ]
  },
  {
    "commandName": "obterRelatorioTurno",
    "purpose": "Exibir relatório do turno selecionado.",
    "kind": "query",
    "input": [
      {
        "name": "shiftId",
        "type": "Shift",
        "required": true
      }
    ],
    "output": [
      {
        "name": "shiftReportId",
        "type": "ShiftReport"
      },
      {
        "name": "shiftId",
        "type": "Shift"
      },
      {
        "name": "totalSalesAmount",
        "type": "money"
      },
      {
        "name": "totalOrders",
        "type": "number"
      },
      {
        "name": "totalItems",
        "type": "number"
      },
      {
        "name": "notes",
        "type": "text"
      },
      {
        "name": "createdAt",
        "type": "datetime"
      },
      {
        "name": "updatedAt",
        "type": "datetime"
      }
    ],
    "readsEntities": [
      "ShiftReport"
    ],
    "writesEntities": [],
    "readsTables": [
      "shift_reports"
    ],
    "writesTables": [],
    "usecaseRefs": [
      "obterRelatorioTurno"
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
    "id": "fechamentoTurno__l2_contract",
    "type": "l2_contract",
    "outputPath": "_102043_/l2/cafeFlow/web/contracts/fechamentoTurno.ts",
    "defPath": "_102043_/l2/cafeFlow/web/contracts/fechamentoTurno.defs.ts",
    "dependsFiles": [],
    "dependsOn": [],
    "skills": [
      "_102020_/l2/agentMaterializeSolution/skills/genContract.ts"
    ],
    "agent": "agentMaterializeGen"
  }
] as const;
