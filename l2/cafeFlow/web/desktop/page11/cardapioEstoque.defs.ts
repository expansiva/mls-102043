/// <mls fileReference="_102043_/l2/cafeFlow/web/desktop/page11/cardapioEstoque.defs.ts" enhancement="_blank"/>

export const definition = {
  "pageId": "cardapioEstoque",
  "pageName": "Cardápio e estoque",
  "actor": "gerente",
  "purpose": "Gerenciar itens do cardápio, categorias, estoque e alertas de baixo estoque.",
  "capabilities": [
    "gerenciarCardapio",
    "gerenciarEstoque"
  ],
  "flowRefs": {
    "experienceFlows": [],
    "entityLifecycles": [],
    "taskWorkflows": [],
    "automations": [
      "lowStockAlertWorkflow"
    ]
  },
  "pluginRefs": [],
  "mdmRefs": [
    "menu",
    "stock"
  ],
  "pageInputs": [],
  "navigationRefs": [
    {
      "direction": "outbound",
      "pageId": "dashboardGerente",
      "trigger": "Ver métricas de vendas/estoque"
    }
  ],
  "sections": [
    {
      "sectionName": "Gestão de cardápio",
      "mode": "edit",
      "organisms": [
        {
          "organismName": "FiltroEListaItensCardapio",
          "purpose": "Filtrar e visualizar itens do cardápio e suas categorias.",
          "userActions": [
            "filtrarItensCardapio",
            "selecionarItemCardapio"
          ],
          "requiredEntities": [
            "MenuItem",
            "MenuCategory"
          ],
          "readsFields": [],
          "writesFields": [],
          "rulesApplied": []
        },
        {
          "organismName": "CadastroEdicaoItemCardapio",
          "purpose": "Criar ou atualizar item do cardápio associado a uma categoria.",
          "userActions": [
            "criarItemCardapio",
            "editarItemCardapio"
          ],
          "requiredEntities": [
            "MenuItem",
            "MenuCategory"
          ],
          "readsFields": [],
          "writesFields": [],
          "rulesApplied": [
            "menuItemRequiresCategory"
          ]
        },
        {
          "organismName": "ListaCategoriasCardapio",
          "purpose": "Exibir categorias disponíveis para seleção no item do cardápio.",
          "userActions": [
            "selecionarCategoriaCardapio"
          ],
          "requiredEntities": [
            "MenuCategory"
          ],
          "readsFields": [],
          "writesFields": [],
          "rulesApplied": []
        }
      ]
    },
    {
      "sectionName": "Gestão de estoque",
      "mode": "edit",
      "organisms": [
        {
          "organismName": "FiltroEListaItensEstoque",
          "purpose": "Filtrar e visualizar itens de estoque com quantidades.",
          "userActions": [
            "filtrarItensEstoque",
            "selecionarItemEstoque"
          ],
          "requiredEntities": [
            "StockItem",
            "UnitOfMeasure"
          ],
          "readsFields": [],
          "writesFields": [],
          "rulesApplied": []
        },
        {
          "organismName": "CadastroEdicaoItemEstoque",
          "purpose": "Criar ou atualizar item de estoque e unidade de medida.",
          "userActions": [
            "criarItemEstoque",
            "editarItemEstoque"
          ],
          "requiredEntities": [
            "StockItem",
            "UnitOfMeasure"
          ],
          "readsFields": [],
          "writesFields": [],
          "rulesApplied": []
        },
        {
          "organismName": "RegistroMovimentacaoEstoque",
          "purpose": "Registrar entrada, saída ou ajuste de estoque.",
          "userActions": [
            "registrarEntradaEstoque",
            "registrarSaidaEstoque",
            "registrarAjusteEstoque"
          ],
          "requiredEntities": [
            "StockMovement",
            "StockItem"
          ],
          "readsFields": [
            "stockItemId",
            "movementType",
            "quantity",
            "reason",
            "occurredAt"
          ],
          "writesFields": [
            "stockItemId",
            "movementType",
            "quantity",
            "reason",
            "occurredAt"
          ],
          "rulesApplied": [
            "lowStockThresholdRule"
          ]
        },
        {
          "organismName": "HistoricoMovimentacoesEstoque",
          "purpose": "Exibir histórico de movimentações por item e período.",
          "userActions": [
            "filtrarMovimentacoesEstoque",
            "inspecionarMovimentacao"
          ],
          "requiredEntities": [
            "StockMovement"
          ],
          "readsFields": [
            "stockMovementId",
            "stockItemId",
            "movementType",
            "quantity",
            "reason",
            "occurredAt"
          ],
          "writesFields": [],
          "rulesApplied": []
        },
        {
          "organismName": "AlertasEstoqueBaixo",
          "purpose": "Visualizar alertas de estoque baixo e status.",
          "userActions": [
            "filtrarAlertasEstoqueBaixo",
            "verDetalheAlerta"
          ],
          "requiredEntities": [
            "LowStockAlert"
          ],
          "readsFields": [
            "lowStockAlertId",
            "stockItemId",
            "triggeredAt",
            "currentQuantity",
            "minimumQuantity",
            "status"
          ],
          "writesFields": [],
          "rulesApplied": [
            "lowStockThresholdRule"
          ]
        }
      ]
    }
  ]
};

export const pipeline = [
  {
    "id": "cardapioEstoque__l2_page",
    "type": "l2_page",
    "outputPath": "_102043_/l2/cafeFlow/web/desktop/page11/cardapioEstoque.ts",
    "defPath": "_102043_/l2/cafeFlow/web/desktop/page11/cardapioEstoque.defs.ts",
    "dependsFiles": [
      "_102043_/l2/cafeFlow/web/shared/cardapioEstoque.ts",
      "_102043_/l2/cafeFlow/web/contracts/cardapioEstoque.ts"
    ],
    "dependsOn": [],
    "skills": [
      "_102020_/l2/agentMaterializeSolution/skills/genPageRender.ts",
      "_102020_/l2/agentMaterializeSolution/skills/genPageDS.ts"
    ],
    "afterSaveFrontEnd": "_102020_/l2/agentMaterializeSolution/registerFrontEnd.ts?registerPage",
    "visualStyle": {
      "tone": "Moderno e minimalista",
      "layout": "Interface rápida com foco em POS e painéis operacionais",
      "palette": [
        "#C85A2A",
        "#F2C57C",
        "#F6F1EB",
        "#3B2F2F",
        "#2E7D32"
      ]
    },
    "agent": "agentMaterializeGen"
  }
] as const;
