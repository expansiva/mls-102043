/// <mls fileReference="_102043_/l2/cafeFlow/web/shared/cardapioEstoque.defs.ts" enhancement="_blank"/>

export const definition = {
  "bffCommands": [
    {
      "commandName": "listarItensCardapio",
      "purpose": "Exibir itens do cardápio",
      "kind": "query",
      "input": [
        {
          "name": "categoriaId",
          "type": "string",
          "required": false
        },
        {
          "name": "disponivel",
          "type": "boolean",
          "required": false
        }
      ],
      "output": [
        {
          "name": "menuItemId",
          "type": "string"
        },
        {
          "name": "nome",
          "type": "string"
        },
        {
          "name": "preco",
          "type": "number"
        },
        {
          "name": "categoriaId",
          "type": "string"
        },
        {
          "name": "ativo",
          "type": "boolean"
        }
      ],
      "readsEntities": [
        "MenuItem",
        "MenuCategory"
      ],
      "writesEntities": [],
      "readsTables": [],
      "writesTables": [],
      "usecaseRefs": [
        "listarItensCardapio"
      ],
      "layerContract": {
        "controllerLayer": "layer_2_controllers",
        "mustCallLayer": "layer_3_usecases",
        "directTableAccessForbidden": true
      },
      "rulesApplied": []
    },
    {
      "commandName": "listarCategoriasCardapio",
      "purpose": "Exibir categorias do cardápio para seleção",
      "kind": "query",
      "input": [],
      "output": [
        {
          "name": "categoriaId",
          "type": "string"
        },
        {
          "name": "nome",
          "type": "string"
        },
        {
          "name": "ativo",
          "type": "boolean"
        }
      ],
      "readsEntities": [
        "MenuCategory"
      ],
      "writesEntities": [],
      "readsTables": [],
      "writesTables": [],
      "usecaseRefs": [
        "listarCategoriasCardapio"
      ],
      "layerContract": {
        "controllerLayer": "layer_2_controllers",
        "mustCallLayer": "layer_3_usecases",
        "directTableAccessForbidden": true
      },
      "rulesApplied": []
    },
    {
      "commandName": "criarOuAtualizarItemCardapio",
      "purpose": "Criar ou atualizar item do cardápio",
      "kind": "command",
      "input": [
        {
          "name": "menuItemId",
          "type": "string",
          "required": false
        },
        {
          "name": "nome",
          "type": "string",
          "required": true
        },
        {
          "name": "preco",
          "type": "number",
          "required": true
        },
        {
          "name": "categoriaId",
          "type": "string",
          "required": true
        },
        {
          "name": "ativo",
          "type": "boolean",
          "required": true
        }
      ],
      "output": [
        {
          "name": "menuItemId",
          "type": "string"
        }
      ],
      "readsEntities": [
        "MenuCategory"
      ],
      "writesEntities": [
        "MenuItem"
      ],
      "readsTables": [],
      "writesTables": [],
      "usecaseRefs": [
        "criarOuAtualizarItemCardapio"
      ],
      "layerContract": {
        "controllerLayer": "layer_2_controllers",
        "mustCallLayer": "layer_3_usecases",
        "directTableAccessForbidden": true
      },
      "rulesApplied": [
        "menuItemRequiresCategory"
      ]
    },
    {
      "commandName": "listarItensEstoque",
      "purpose": "Exibir itens de estoque com quantidades",
      "kind": "query",
      "input": [
        {
          "name": "categoriaId",
          "type": "string",
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
          "name": "stockItemId",
          "type": "string"
        },
        {
          "name": "nome",
          "type": "string"
        },
        {
          "name": "quantidadeAtual",
          "type": "number"
        },
        {
          "name": "unidadeMedidaId",
          "type": "string"
        },
        {
          "name": "quantidadeMinima",
          "type": "number"
        },
        {
          "name": "status",
          "type": "string"
        }
      ],
      "readsEntities": [
        "StockItem",
        "UnitOfMeasure"
      ],
      "writesEntities": [],
      "readsTables": [],
      "writesTables": [],
      "usecaseRefs": [
        "listarItensEstoque"
      ],
      "layerContract": {
        "controllerLayer": "layer_2_controllers",
        "mustCallLayer": "layer_3_usecases",
        "directTableAccessForbidden": true
      },
      "rulesApplied": []
    },
    {
      "commandName": "criarOuAtualizarItemEstoque",
      "purpose": "Criar ou atualizar item de estoque",
      "kind": "command",
      "input": [
        {
          "name": "stockItemId",
          "type": "string",
          "required": false
        },
        {
          "name": "nome",
          "type": "string",
          "required": true
        },
        {
          "name": "unidadeMedidaId",
          "type": "string",
          "required": true
        },
        {
          "name": "quantidadeMinima",
          "type": "number",
          "required": true
        },
        {
          "name": "ativo",
          "type": "boolean",
          "required": true
        }
      ],
      "output": [
        {
          "name": "stockItemId",
          "type": "string"
        }
      ],
      "readsEntities": [
        "UnitOfMeasure"
      ],
      "writesEntities": [
        "StockItem"
      ],
      "readsTables": [],
      "writesTables": [],
      "usecaseRefs": [
        "criarOuAtualizarItemEstoque"
      ],
      "layerContract": {
        "controllerLayer": "layer_2_controllers",
        "mustCallLayer": "layer_3_usecases",
        "directTableAccessForbidden": true
      },
      "rulesApplied": []
    },
    {
      "commandName": "registrarMovimentacaoEstoque",
      "purpose": "Registrar entrada/saída/ajuste de estoque",
      "kind": "command",
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
          "name": "reason",
          "type": "string",
          "required": false
        },
        {
          "name": "occurredAt",
          "type": "date",
          "required": true
        }
      ],
      "output": [
        {
          "name": "stockMovementId",
          "type": "string"
        }
      ],
      "readsEntities": [
        "StockItem",
        "UnitOfMeasure"
      ],
      "writesEntities": [
        "StockMovement",
        "LowStockAlert"
      ],
      "readsTables": [],
      "writesTables": [
        "stock_movements",
        "low_stock_alerts",
        "low_stock_metrics"
      ],
      "usecaseRefs": [
        "registrarMovimentacaoEstoque"
      ],
      "layerContract": {
        "controllerLayer": "layer_2_controllers",
        "mustCallLayer": "layer_3_usecases",
        "directTableAccessForbidden": true
      },
      "rulesApplied": [
        "lowStockThresholdRule"
      ]
    },
    {
      "commandName": "listarMovimentacoesEstoque",
      "purpose": "Exibir histórico de movimentações",
      "kind": "query",
      "input": [
        {
          "name": "stockItemId",
          "type": "string",
          "required": false
        },
        {
          "name": "dataInicio",
          "type": "date",
          "required": false
        },
        {
          "name": "dataFim",
          "type": "date",
          "required": false
        }
      ],
      "output": [
        {
          "name": "stockMovementId",
          "type": "string"
        },
        {
          "name": "stockItemId",
          "type": "string"
        },
        {
          "name": "movementType",
          "type": "string"
        },
        {
          "name": "quantity",
          "type": "number"
        },
        {
          "name": "reason",
          "type": "string"
        },
        {
          "name": "occurredAt",
          "type": "date"
        }
      ],
      "readsEntities": [
        "StockMovement"
      ],
      "writesEntities": [],
      "readsTables": [
        "stock_movements"
      ],
      "writesTables": [],
      "usecaseRefs": [
        "listarMovimentacoesEstoque"
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
      "purpose": "Exibir alertas de estoque baixo",
      "kind": "query",
      "input": [
        {
          "name": "status",
          "type": "string",
          "required": false
        }
      ],
      "output": [
        {
          "name": "lowStockAlertId",
          "type": "string"
        },
        {
          "name": "stockItemId",
          "type": "string"
        },
        {
          "name": "triggeredAt",
          "type": "date"
        },
        {
          "name": "currentQuantity",
          "type": "number"
        },
        {
          "name": "minimumQuantity",
          "type": "number"
        },
        {
          "name": "status",
          "type": "string"
        }
      ],
      "readsEntities": [
        "LowStockAlert"
      ],
      "writesEntities": [],
      "readsTables": [
        "low_stock_alerts"
      ],
      "writesTables": [],
      "usecaseRefs": [
        "listarAlertasEstoqueBaixo"
      ],
      "layerContract": {
        "controllerLayer": "layer_2_controllers",
        "mustCallLayer": "layer_3_usecases",
        "directTableAccessForbidden": true
      },
      "rulesApplied": [
        "lowStockThresholdRule"
      ]
    }
  ],
  "navigationRefs": [
    {
      "direction": "outbound",
      "pageId": "dashboardGerente",
      "trigger": "Ver métricas de vendas/estoque"
    }
  ]
};

export const pipeline = [
  {
    "id": "cardapioEstoque__l2_shared",
    "type": "l2_shared",
    "outputPath": "_102043_/l2/cafeFlow/web/shared/cardapioEstoque.ts",
    "defPath": "_102043_/l2/cafeFlow/web/shared/cardapioEstoque.defs.ts",
    "dependsFiles": [
      "_102043_/l2/cafeFlow/web/contracts/cardapioEstoque.ts"
    ],
    "dependsOn": [],
    "skills": [
      "/_102020_/l2/agentMaterializeSolution/skills/genPageShared.ts"
    ],
    "rulesPath": "_102043_/l5/cafeFlow/rules.defs.ts",
    "rulesApplied": [
      "menuItemRequiresCategory",
      "lowStockThresholdRule"
    ],
    "agent": "agentMaterializeGen"
  }
] as const;
