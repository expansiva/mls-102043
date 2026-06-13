/// <mls fileReference="_102043_/l1/cafeFlow/layer_3_usecases/registrarMovimentacaoEstoque.defs.ts" enhancement="_blank"/>

export const useCase = {
  "usecaseId": "registrarMovimentacaoEstoque",
  "title": "Registrar movimentação de estoque",
  "purpose": "Registrar entrada ou saída de estoque e gerar alerta quando necessário.",
  "actor": "gerente",
  "layer": "layer_3_usecases",
  "inputEntities": [
    "estoqueEntity"
  ],
  "outputEntities": [
    "estoqueEntity"
  ],
  "readsTables": [
    {
      "tableName": "StockItem",
      "ownership": "mdmOwned"
    },
    {
      "tableName": "UnitOfMeasure",
      "ownership": "mdmOwned"
    }
  ],
  "writesTables": [
    {
      "tableName": "stock_movements",
      "ownership": "moduleOwned"
    },
    {
      "tableName": "low_stock_alerts",
      "ownership": "moduleOwned"
    },
    {
      "tableName": "low_stock_metrics",
      "ownership": "moduleOwned"
    }
  ],
  "rulesApplied": [
    "lowStockThresholdRule"
  ],
  "entityRefs": [
    "estoqueEntity",
    "metricasEntity"
  ],
  "commands": [
    {
      "commandId": "registrarMovimentacaoEstoque",
      "input": [
        {
          "name": "stockItemId",
          "type": "string",
          "required": true
        },
        {
          "name": "movementType",
          "type": "string",
          "required": true
        },
        {
          "name": "quantity",
          "type": "number",
          "required": true
        },
        {
          "name": "unitOfMeasureId",
          "type": "string",
          "required": true
        },
        {
          "name": "movementDate",
          "type": "date",
          "required": false
        },
        {
          "name": "reason",
          "type": "string",
          "required": false
        }
      ],
      "output": [
        {
          "name": "stockItemId",
          "type": "string"
        },
        {
          "name": "quantity",
          "type": "number"
        }
      ]
    }
  ],
  "pendingQuestions": [
    "Quais campos obrigatórios devem compor a movimentação (ex.: data, motivo)?",
    "O tipo de movimentação é um enum específico (ex.: ENTRADA/SAÍDA)? Se sim, qual o identificador do enum?",
    "A resposta deve incluir algum indicador/ID de alerta de estoque baixo ou apenas o estoque atualizado?"
  ]
} as const;

export default useCase;
