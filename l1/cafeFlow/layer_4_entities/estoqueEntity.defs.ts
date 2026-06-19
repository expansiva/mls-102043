/// <mls fileReference="_102043_/l1/cafeFlow/layer_4_entities/estoqueEntity.defs.ts" enhancement="_blank"/>

export const entity = {
  "entityId": "estoqueEntity",
  "title": "Entidade de caso de uso: Estoque",
  "purpose": "Controlar movimentações e alertas de estoque.",
  "layer": "layer_4_entities",
  "fields": [
    {
      "fieldId": "stockMovementId",
      "type": "uuid",
      "required": true,
      "description": "Identificador único da movimentação de estoque."
    },
    {
      "fieldId": "stockItemId",
      "type": "StockItem",
      "required": true,
      "description": "Item de estoque associado à movimentação."
    },
    {
      "fieldId": "orderId",
      "type": "Order",
      "required": false,
      "description": "Pedido vinculado à saída de estoque, quando aplicável."
    },
    {
      "fieldId": "movementType",
      "type": "string",
      "required": true,
      "description": "Tipo de movimentação realizada.",
      "enum": [
        "entrada",
        "saida",
        "ajuste"
      ]
    },
    {
      "fieldId": "quantity",
      "type": "number",
      "required": true,
      "description": "Quantidade movimentada do item de estoque."
    },
    {
      "fieldId": "reason",
      "type": "text",
      "required": false,
      "description": "Motivo ou observação da movimentação, especialmente para ajustes."
    },
    {
      "fieldId": "occurredAt",
      "type": "datetime",
      "required": true,
      "description": "Data e hora em que a movimentação ocorreu."
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
  "sourceTables": [
    {
      "tableName": "stock_movements",
      "ownership": "moduleOwned"
    },
    {
      "tableName": "low_stock_alerts",
      "ownership": "moduleOwned"
    },
    {
      "tableName": "StockItem",
      "ownership": "mdmOwned"
    },
    {
      "tableName": "UnitOfMeasure",
      "ownership": "mdmOwned"
    }
  ],
  "storage": [
    {
      "kind": "moduleTable",
      "tableId": "stockMovement",
      "tableName": "stock_movements",
      "fileRef": "_102043_/l1/cafeFlow/layer_1_external/stockMovement.defs.ts"
    },
    {
      "kind": "moduleTable",
      "tableId": "lowStockAlert",
      "tableName": "low_stock_alerts",
      "fileRef": "_102043_/l1/cafeFlow/layer_1_external/lowStockAlert.defs.ts"
    },
    {
      "kind": "mdm",
      "moduleRef": "102034",
      "entity": "StockItem",
      "domainId": "stock",
      "sourceOfTruth": "102034",
      "governanceRules": [
        "Gerar alerta quando nível de estoque ficar abaixo do mínimo definido (regra lowStockThresholdRule).",
        "Apenas o ator gerente pode cadastrar ou ajustar itens de estoque e unidades de medida.",
        "Unidades de medida não podem ser excluídas se estiverem vinculadas a itens de estoque."
      ]
    },
    {
      "kind": "mdm",
      "moduleRef": "102034",
      "entity": "UnitOfMeasure",
      "domainId": "stock",
      "sourceOfTruth": "102034",
      "governanceRules": [
        "Gerar alerta quando nível de estoque ficar abaixo do mínimo definido (regra lowStockThresholdRule).",
        "Apenas o ator gerente pode cadastrar ou ajustar itens de estoque e unidades de medida.",
        "Unidades de medida não podem ser excluídas se estiverem vinculadas a itens de estoque."
      ]
    }
  ],
  "allowedOperations": [
    "create",
    "update",
    "read",
    "list"
  ],
  "rulesApplied": [
    "lowStockThresholdRule"
  ],
  "usecaseRefs": [
    "criarOuAtualizarItemEstoque",
    "listarItensEstoque",
    "registrarMovimentacaoEstoque",
    "listarMovimentacoesEstoque",
    "listarAlertasEstoqueBaixo"
  ],
  "materialization": {
    "fileName": "layer_4_entities/EstoqueEntity.ts",
    "className": "EstoqueEntity",
    "contractName": "IEstoqueEntity"
  }
} as const;

export default entity;

export const pipeline = [
  {
    "id": "estoqueEntity__layer_4_entities",
    "type": "layer_4_entities",
    "outputPath": "_102043_/l1/cafeFlow/layer_4_entities/estoqueEntity.ts",
    "defPath": "_102043_/l1/cafeFlow/layer_4_entities/estoqueEntity.defs.ts",
    "dependsFiles": [
      "_102043_/l1/cafeFlow/layer_1_external/stockMovement.d.ts",
      "_102043_/l1/cafeFlow/layer_1_external/lowStockAlert.d.ts"
    ],
    "dependsOn": [],
    "rulesApplied": [
      "lowStockThresholdRule"
    ],
    "agent": "agentMaterializeGen"
  }
] as const;
