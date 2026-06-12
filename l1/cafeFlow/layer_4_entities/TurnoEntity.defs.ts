/// <mls fileReference="_102043_/l1/cafeFlow/layer_4_entities/TurnoEntity.defs.ts" enhancement="_blank"/>

export const entity = {
  "entityId": "TurnoEntity",
  "title": "Entidade de Turno",
  "purpose": "Agrega turnos diários e relatórios de fechamento, consolidando métricas do dia.",
  "layer": "layer_4_entities",
  "fields": [
    {
      "fieldId": "dailyShiftId",
      "type": "uuid",
      "required": true,
      "description": "Identificador único do turno diário."
    },
    {
      "fieldId": "shiftDate",
      "type": "date",
      "required": true,
      "description": "Data do turno diário."
    },
    {
      "fieldId": "status",
      "type": "string",
      "required": true,
      "description": "Status do turno diário.",
      "enum": [
        "aberto",
        "fechado"
      ]
    },
    {
      "fieldId": "openedAt",
      "type": "datetime",
      "required": true,
      "description": "Data e hora de abertura do turno."
    },
    {
      "fieldId": "closedAt",
      "type": "datetime",
      "required": false,
      "description": "Data e hora de fechamento do turno."
    },
    {
      "fieldId": "openingCashAmount",
      "type": "money",
      "required": false,
      "description": "Valor de caixa informado na abertura do turno."
    },
    {
      "fieldId": "closingCashAmount",
      "type": "money",
      "required": false,
      "description": "Valor de caixa informado no fechamento do turno."
    },
    {
      "fieldId": "totalSalesAmount",
      "type": "money",
      "required": false,
      "description": "Total de vendas consolidadas no turno."
    },
    {
      "fieldId": "totalOrders",
      "type": "number",
      "required": false,
      "description": "Quantidade total de pedidos no turno."
    },
    {
      "fieldId": "notes",
      "type": "text",
      "required": false,
      "description": "Observações gerais do turno."
    },
    {
      "fieldId": "shiftClosingReportId",
      "type": "ShiftClosingReport",
      "required": false,
      "description": "Referência ao relatório de fechamento do turno."
    },
    {
      "fieldId": "createdAt",
      "type": "datetime",
      "required": true,
      "description": "Data e hora de criação do registro."
    },
    {
      "fieldId": "updatedAt",
      "type": "datetime",
      "required": true,
      "description": "Data e hora da última atualização do registro."
    }
  ],
  "statusEnum": [
    "aberto",
    "fechado"
  ],
  "sourceTables": [
    {
      "tableName": "daily_shift",
      "ownership": "moduleOwned"
    },
    {
      "tableName": "daily_sales_metrics",
      "ownership": "moduleOwned"
    }
  ],
  "storage": [
    {
      "kind": "moduleTable",
      "tableId": "dailyShift",
      "tableName": "daily_shift",
      "fileRef": "_102043_/l1/cafeFlow/layer_1_external/dailyShift.defs.ts"
    },
    {
      "kind": "metricTable",
      "metricTableId": "dailySalesMetrics",
      "tableName": "daily_sales_metrics",
      "fileRef": "_102043_/l1/cafeFlow/layer_1_external/dailySalesMetrics.defs.ts"
    }
  ],
  "allowedOperations": [
    "create",
    "read",
    "update",
    "list"
  ],
  "rulesApplied": [
    "shiftMustBeOpenForOrders",
    "shiftCloseRequiresOrders"
  ],
  "usecaseRefs": [
    "criarPedido",
    "atualizarStatusPedido",
    "abrirTurno",
    "fecharTurno",
    "listarTurnos",
    "obterTurno",
    "solicitarResumoIa",
    "consultarDashboard"
  ],
  "materialization": {
    "fileName": "layer_4_entities/TurnoEntity.ts",
    "className": "TurnoEntity",
    "contractName": "ITurnoEntity"
  }
} as const;

export default entity;
