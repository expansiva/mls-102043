/// <mls fileReference="_102043_/l5/cafeFlow/module.defs.ts" enhancement="_blank"/>

export const modulePlan = {
  "schemaVersion": "2026-06-06",
  "artifactType": "module",
  "artifactId": "cafeFlow",
  "moduleName": "cafeFlow",
  "status": "draft",
  "source": {
    "agentName": "agentFinalizeSolutionPlan",
    "stepId": 11,
    "planId": "plan-finalize-solution-plan"
  },
  "data": {
    "module": {
      "moduleName": "CafeFlow",
      "purpose": "Agilizar pedidos e controle simples de estoque por ingrediente para cafeterias e lanchonetes pequenas, com coordenação de cozinha e métricas operacionais.",
      "businessDomain": "foodServicePos",
      "languages": [
        "pt-BR",
        "en"
      ],
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
      }
    },
    "actors": [
      {
        "actorId": "caixa",
        "title": "Caixa",
        "description": "Registra pedidos no POS e acompanha status até entrega."
      },
      {
        "actorId": "cozinha",
        "title": "Cozinha",
        "description": "Recebe pedidos, atualiza status de preparo e entrega."
      },
      {
        "actorId": "gerente",
        "title": "Gerente",
        "description": "Configura cardápio, estoque e acompanha métricas e fechamento de turno."
      },
      {
        "actorId": "assistenteIA",
        "title": "Assistente IA",
        "description": "Gera resumo de vendas do dia e sugere itens para promover."
      }
    ],
    "capabilities": [
      {
        "capabilityId": "registrarPedido",
        "title": "Registrar pedido",
        "description": "Criar pedido com mesa ou takeout, itens e observações.",
        "actor": "caixa",
        "priority": "now"
      },
      {
        "capabilityId": "atualizarStatusPedido",
        "title": "Atualizar status do pedido",
        "description": "Marcar pedido como Novo, Em preparo, Pronto ou Entregue.",
        "actor": "cozinha",
        "priority": "now"
      },
      {
        "capabilityId": "acompanharFilaCozinha",
        "title": "Acompanhar fila da cozinha",
        "description": "Visualizar pedidos em aberto e seus status.",
        "actor": "cozinha",
        "priority": "now"
      },
      {
        "capabilityId": "gerenciarCardapio",
        "title": "Gerenciar cardápio",
        "description": "Criar e ajustar itens do cardápio, categorias e preços.",
        "actor": "gerente",
        "priority": "now"
      },
      {
        "capabilityId": "gerenciarEstoqueIngredientes",
        "title": "Gerenciar estoque por ingrediente",
        "description": "Cadastrar itens de estoque e níveis mínimos, com baixa automática por ingrediente.",
        "actor": "gerente",
        "priority": "now"
      },
      {
        "capabilityId": "visualizarDashboard",
        "title": "Visualizar dashboard",
        "description": "Ver vendas do dia, itens mais vendidos e alertas de estoque baixo.",
        "actor": "gerente",
        "priority": "now"
      },
      {
        "capabilityId": "fecharTurnoDiario",
        "title": "Fechar turno diário",
        "description": "Gerar relatório de fechamento de turno e totalizadores do dia.",
        "actor": "gerente",
        "priority": "now"
      },
      {
        "capabilityId": "gerarResumoVendasIA",
        "title": "Resumo de vendas com IA",
        "description": "Gerar resumo de vendas do dia.",
        "actor": "assistenteIA",
        "priority": "soon"
      },
      {
        "capabilityId": "sugerirPromocoesIA",
        "title": "Sugestões de promoção com IA",
        "description": "Sugerir itens para promover com base nos últimos 7 dias.",
        "actor": "assistenteIA",
        "priority": "soon"
      }
    ],
    "ontology": {
      "entities": {
        "MenuItem": {
          "title": "Item do Cardápio",
          "description": "Produto vendido no POS com categoria, preço e composição por ingredientes."
        },
        "Ingredient": {
          "title": "Ingrediente",
          "description": "Insumo base usado nas receitas dos itens do cardápio."
        },
        "StockItem": {
          "title": "Item de Estoque",
          "description": "Registro de estoque por ingrediente com quantidade disponível e nível mínimo."
        },
        "Order": {
          "title": "Pedido",
          "description": "Pedido lançado no POS com tipo mesa ou takeout e itens associados."
        },
        "OrderItem": {
          "title": "Item do Pedido",
          "description": "Linha do pedido com item do cardápio, quantidade e observações."
        },
        "DailyShift": {
          "title": "Turno Diário",
          "description": "Período operacional para consolidação de vendas e fechamento."
        },
        "RecipeLine": {
          "title": "Linha de Receita",
          "description": "Vínculo entre item do cardápio e ingrediente com quantidade consumida por unidade."
        },
        "KitchenTicket": {
          "title": "Ticket de Cozinha",
          "description": "Representação operacional do pedido para a fila da cozinha."
        },
        "SalesSummary": {
          "title": "Resumo de Vendas",
          "description": "Resumo consolidado do turno para relatório e IA."
        },
        "PromotionSuggestion": {
          "title": "Sugestão de Promoção",
          "description": "Recomendação de itens a promover com base no histórico de vendas."
        }
      }
    },
    "rules": [
      {
        "ruleId": "rule-order-status-transition",
        "title": "Transições de status do pedido",
        "description": "Um pedido deve seguir a sequência Novo → Em preparo → Pronto → Entregue, sem pular estados.",
        "appliesTo": [
          "Order",
          "KitchenTicket"
        ],
        "layer": "layer_3"
      },
      {
        "ruleId": "rule-stock-deduct-by-ingredient",
        "title": "Baixa de estoque por ingrediente",
        "description": "A confirmação de itens do pedido deve baixar o estoque de ingredientes conforme a receita do item.",
        "appliesTo": [
          "Order",
          "OrderItem",
          "StockItem",
          "RecipeLine"
        ],
        "layer": "layer_3"
      },
      {
        "ruleId": "rule-low-stock-alert",
        "title": "Alerta de estoque baixo",
        "description": "Quando a quantidade disponível do ingrediente ficar abaixo do nível mínimo, gerar alerta no dashboard.",
        "appliesTo": [
          "StockItem"
        ],
        "layer": "layer_2"
      },
      {
        "ruleId": "rule-shift-close-required",
        "title": "Fechamento de turno obrigatório",
        "description": "O turno diário deve ser fechado com geração de relatório antes de iniciar um novo fechamento para o mesmo período.",
        "appliesTo": [
          "DailyShift",
          "SalesSummary"
        ],
        "layer": "layer_3"
      },
      {
        "ruleId": "rule-menuitem-recipe-required",
        "title": "Receita obrigatória para baixa automática",
        "description": "Itens do cardápio vendidos devem ter linhas de receita vinculadas para permitir baixa por ingrediente.",
        "appliesTo": [
          "MenuItem",
          "RecipeLine"
        ],
        "layer": "layer_2"
      }
    ],
    "relationships": [
      {
        "relationshipId": "rel-menuitem-recipe",
        "fromEntity": "MenuItem",
        "toEntity": "RecipeLine",
        "type": "composition",
        "description": "Item do cardápio possui linhas de receita com ingredientes e quantidades."
      },
      {
        "relationshipId": "rel-recipe-ingredient",
        "fromEntity": "RecipeLine",
        "toEntity": "Ingredient",
        "type": "reference",
        "description": "Linha de receita referencia um ingrediente específico."
      },
      {
        "relationshipId": "rel-ingredient-stock",
        "fromEntity": "Ingredient",
        "toEntity": "StockItem",
        "type": "oneToOne",
        "description": "Cada ingrediente possui um registro de estoque."
      },
      {
        "relationshipId": "rel-order-orderitem",
        "fromEntity": "Order",
        "toEntity": "OrderItem",
        "type": "composition",
        "description": "Pedido é composto por itens."
      },
      {
        "relationshipId": "rel-orderitem-menuitem",
        "fromEntity": "OrderItem",
        "toEntity": "MenuItem",
        "type": "reference",
        "description": "Item do pedido referencia um item do cardápio."
      },
      {
        "relationshipId": "rel-order-kitchen",
        "fromEntity": "Order",
        "toEntity": "KitchenTicket",
        "type": "oneToOne",
        "description": "Pedido gera um ticket na fila da cozinha."
      },
      {
        "relationshipId": "rel-shift-order",
        "fromEntity": "DailyShift",
        "toEntity": "Order",
        "type": "aggregation",
        "description": "Turno diário consolida pedidos do período."
      },
      {
        "relationshipId": "rel-shift-sales-summary",
        "fromEntity": "DailyShift",
        "toEntity": "SalesSummary",
        "type": "oneToOne",
        "description": "Turno diário gera um resumo de vendas."
      },
      {
        "relationshipId": "rel-promotion-menuitem",
        "fromEntity": "PromotionSuggestion",
        "toEntity": "MenuItem",
        "type": "reference",
        "description": "Sugestão de promoção referencia os itens do cardápio indicados."
      },
      {
        "relationshipId": "rel-promotion-summary",
        "fromEntity": "PromotionSuggestion",
        "toEntity": "SalesSummary",
        "type": "reference",
        "description": "Sugestão de promoção utiliza o resumo de vendas do período."
      }
    ],
    "userActions": [
      {
        "actionId": "selectOrderType",
        "title": "Selecionar tipo de pedido",
        "actor": "caixa",
        "capabilityId": "registrarPedido",
        "description": "Escolher mesa ou takeout antes de adicionar itens.",
        "commandType": "BFF",
        "affectedEntities": [
          "Order"
        ],
        "rulesApplied": [
          "rule-order-status-transition"
        ]
      },
      {
        "actionId": "addOrderItem",
        "title": "Adicionar item ao pedido",
        "actor": "caixa",
        "capabilityId": "registrarPedido",
        "description": "Buscar item do cardápio e definir quantidade/observações.",
        "commandType": "BFF",
        "affectedEntities": [
          "Order",
          "OrderItem"
        ],
        "rulesApplied": [
          "rule-menuitem-recipe-required"
        ]
      },
      {
        "actionId": "confirmOrderSendKitchen",
        "title": "Confirmar pedido e enviar para cozinha",
        "actor": "caixa",
        "capabilityId": "registrarPedido",
        "description": "Finalizar pedido e criar ticket de cozinha.",
        "commandType": "BFF",
        "affectedEntities": [
          "Order",
          "KitchenTicket"
        ],
        "rulesApplied": [
          "rule-order-status-transition"
        ]
      },
      {
        "actionId": "updateOrderStatusPreparing",
        "title": "Marcar como em preparo",
        "actor": "cozinha",
        "capabilityId": "atualizarStatusPedido",
        "description": "Atualizar status do pedido para Em preparo.",
        "commandType": "BFF",
        "affectedEntities": [
          "Order",
          "KitchenTicket"
        ],
        "rulesApplied": [
          "rule-order-status-transition"
        ]
      },
      {
        "actionId": "updateOrderStatusReady",
        "title": "Marcar como pronto",
        "actor": "cozinha",
        "capabilityId": "atualizarStatusPedido",
        "description": "Atualizar status do pedido para Pronto.",
        "commandType": "BFF",
        "affectedEntities": [
          "Order",
          "KitchenTicket"
        ],
        "rulesApplied": [
          "rule-order-status-transition"
        ]
      },
      {
        "actionId": "updateOrderStatusDelivered",
        "title": "Marcar como entregue",
        "actor": "cozinha",
        "capabilityId": "atualizarStatusPedido",
        "description": "Atualizar status do pedido para Entregue e concluir ticket.",
        "commandType": "BFF",
        "affectedEntities": [
          "Order",
          "KitchenTicket"
        ],
        "rulesApplied": [
          "rule-order-status-transition",
          "rule-stock-deduct-by-ingredient"
        ]
      },
      {
        "actionId": "createMenuItem",
        "title": "Criar item do cardápio",
        "actor": "gerente",
        "capabilityId": "gerenciarCardapio",
        "description": "Cadastrar item com categoria, preço e receita de ingredientes.",
        "commandType": "BFF",
        "affectedEntities": [
          "MenuItem",
          "RecipeLine"
        ],
        "rulesApplied": [
          "rule-menuitem-recipe-required"
        ]
      },
      {
        "actionId": "updateStockItem",
        "title": "Atualizar estoque do ingrediente",
        "actor": "gerente",
        "capabilityId": "gerenciarEstoqueIngredientes",
        "description": "Ajustar quantidade disponível e nível mínimo.",
        "commandType": "BFF",
        "affectedEntities": [
          "StockItem"
        ],
        "rulesApplied": [
          "rule-low-stock-alert"
        ]
      },
      {
        "actionId": "viewDashboard",
        "title": "Visualizar métricas do dashboard",
        "actor": "gerente",
        "capabilityId": "visualizarDashboard",
        "description": "Consultar vendas do dia, itens mais vendidos e estoque baixo.",
        "commandType": "Query",
        "affectedEntities": [
          "SalesSummary",
          "StockItem"
        ]
      },
      {
        "actionId": "closeDailyShift",
        "title": "Fechar turno diário",
        "actor": "gerente",
        "capabilityId": "fecharTurnoDiario",
        "description": "Consolidar vendas e gerar relatório de fechamento.",
        "commandType": "BFF",
        "affectedEntities": [
          "DailyShift",
          "SalesSummary"
        ],
        "rulesApplied": [
          "rule-shift-close-required"
        ]
      },
      {
        "actionId": "generateSalesSummaryIA",
        "title": "Gerar resumo de vendas (IA)",
        "actor": "assistenteIA",
        "capabilityId": "gerarResumoVendasIA",
        "description": "Produzir resumo narrativo das vendas do dia.",
        "commandType": "Agent",
        "affectedEntities": [
          "SalesSummary"
        ]
      },
      {
        "actionId": "generatePromotionSuggestionsIA",
        "title": "Gerar sugestões de promoção (IA)",
        "actor": "assistenteIA",
        "capabilityId": "sugerirPromocoesIA",
        "description": "Sugerir itens para promover com base nos últimos 7 dias.",
        "commandType": "Agent",
        "affectedEntities": [
          "PromotionSuggestion"
        ]
      }
    ],
    "approvedArtifacts": {
      "pages": [
        {
          "signal": "dashboardVendas",
          "title": "Dashboard de Vendas",
          "reason": "Métricas básicas do MVP: vendas do dia, itens mais vendidos e estoque baixo.",
          "priority": "now",
          "actor": "gerente",
          "artifactType": "page",
          "references": [
            "metricTableVendasDiarias",
            "metricTableItensMaisVendidos",
            "metricTableEstoqueBaixo"
          ],
          "rulesApplied": [
            "rule-low-stock-alert"
          ]
        },
        {
          "signal": "posRapido",
          "title": "POS Rápido",
          "reason": "Interface de lançamento de pedido com atualização de status.",
          "priority": "now",
          "actor": "caixa",
          "artifactType": "page",
          "references": [
            "workflowPedidoPos"
          ],
          "rulesApplied": [
            "rule-order-status-transition"
          ]
        },
        {
          "signal": "painelCozinha",
          "title": "Painel da Cozinha",
          "reason": "Fila de pedidos e mudança de status de preparo.",
          "priority": "now",
          "actor": "cozinha",
          "artifactType": "page",
          "references": [
            "workflowStatusCozinha"
          ],
          "rulesApplied": [
            "rule-order-status-transition",
            "rule-stock-deduct-by-ingredient"
          ]
        },
        {
          "signal": "gestaoCardapioEstoque",
          "title": "Gestão de Cardápio e Estoque",
          "reason": "Cadastro e manutenção de itens do cardápio e ingredientes.",
          "priority": "now",
          "actor": "gerente",
          "artifactType": "page",
          "references": [
            "mdmCafeFlow",
            "usecaseGerenciarCardapio",
            "usecaseAjustarEstoque"
          ],
          "rulesApplied": [
            "rule-menuitem-recipe-required",
            "rule-low-stock-alert"
          ]
        },
        {
          "signal": "relatorioFechamentoTurno",
          "title": "Relatório de Fechamento de Turno",
          "reason": "Fechamento diário com totalizadores e resumo.",
          "priority": "now",
          "actor": "gerente",
          "artifactType": "page",
          "references": [
            "workflowFechamentoTurno"
          ],
          "rulesApplied": [
            "rule-shift-close-required"
          ]
        }
      ],
      "workflows": [
        {
          "signal": "workflowPedidoPos",
          "title": "Fluxo de Pedido POS",
          "reason": "Criação do pedido e envio para cozinha.",
          "priority": "now",
          "actor": "caixa",
          "artifactType": "workflow",
          "references": [
            "usecaseCriarPedido"
          ],
          "rulesApplied": [
            "rule-order-status-transition"
          ]
        },
        {
          "signal": "workflowStatusCozinha",
          "title": "Fluxo de Status de Cozinha",
          "reason": "Transições Novo → Em preparo → Pronto → Entregue.",
          "priority": "now",
          "actor": "cozinha",
          "artifactType": "workflow",
          "references": [
            "usecaseAtualizarStatusPedido",
            "usecaseBaixarEstoqueIngredientes"
          ],
          "rulesApplied": [
            "rule-order-status-transition",
            "rule-stock-deduct-by-ingredient"
          ]
        },
        {
          "signal": "workflowFechamentoTurno",
          "title": "Fluxo de Fechamento de Turno",
          "reason": "Consolidação de vendas e geração do relatório.",
          "priority": "now",
          "actor": "gerente",
          "artifactType": "workflow",
          "references": [
            "usecaseFecharTurno"
          ],
          "rulesApplied": [
            "rule-shift-close-required"
          ]
        }
      ],
      "plugins": [],
      "agents": [
        {
          "signal": "agenteResumoVendas",
          "title": "Agente de Resumo de Vendas",
          "reason": "Geração automática do resumo diário.",
          "priority": "soon",
          "actor": "assistenteIA",
          "artifactType": "agent",
          "references": [
            "metricTableVendasDiarias"
          ],
          "rulesApplied": []
        },
        {
          "signal": "agenteSugestoesPromocao",
          "title": "Agente de Sugestões de Promoção",
          "reason": "Sugestões baseadas nos últimos 7 dias.",
          "priority": "soon",
          "actor": "assistenteIA",
          "artifactType": "agent",
          "references": [
            "metricTableItensMaisVendidos"
          ],
          "rulesApplied": []
        }
      ],
      "horizontalModules": [
        {
          "signal": "autenticacaoPerfis",
          "title": "Autenticação e Perfis",
          "reason": "Perfis distintos para Caixa, Cozinha e Gerente.",
          "priority": "now",
          "actor": "gerente",
          "artifactType": "horizontalModule",
          "references": [],
          "rulesApplied": []
        }
      ],
      "mdm": [
        {
          "signal": "mdmCafeFlow",
          "title": "MDM CafeFlow",
          "reason": "Entidades centrais: Item do Cardápio, Ingrediente, Item de Estoque, Pedido, Itens do Pedido e Turno Diário.",
          "priority": "now",
          "actor": "gerente",
          "artifactType": "mdm",
          "references": [
            "MenuItem",
            "Ingredient",
            "StockItem",
            "Order",
            "OrderItem",
            "DailyShift",
            "RecipeLine"
          ],
          "rulesApplied": [
            "rule-menuitem-recipe-required",
            "rule-stock-deduct-by-ingredient"
          ]
        }
      ],
      "metricTables": [
        {
          "signal": "metricTableVendasDiarias",
          "title": "Tabela de Métricas de Vendas Diárias",
          "reason": "Tabela agregada por dia e turno com total de pedidos, itens e receita.",
          "priority": "now",
          "actor": "gerente",
          "artifactType": "metricTable",
          "references": [
            "Order",
            "DailyShift"
          ],
          "rulesApplied": []
        },
        {
          "signal": "metricTableItensMaisVendidos",
          "title": "Tabela de Métricas de Itens Mais Vendidos",
          "reason": "Agregação por item e período para ranking de vendas.",
          "priority": "now",
          "actor": "gerente",
          "artifactType": "metricTable",
          "references": [
            "OrderItem",
            "MenuItem"
          ],
          "rulesApplied": []
        },
        {
          "signal": "metricTableEstoqueBaixo",
          "title": "Tabela de Métricas de Estoque Baixo",
          "reason": "Snapshot de ingredientes abaixo do nível mínimo.",
          "priority": "now",
          "actor": "gerente",
          "artifactType": "metricTable",
          "references": [
            "StockItem",
            "Ingredient"
          ],
          "rulesApplied": [
            "rule-low-stock-alert"
          ]
        }
      ],
      "metricDashboards": [
        {
          "signal": "gerenteDashboardMetricas",
          "title": "Dashboard de Métricas do Gerente",
          "reason": "Painel com vendas do dia, itens mais vendidos e alertas de estoque baixo.",
          "priority": "now",
          "actor": "gerente",
          "artifactType": "metricDashboard",
          "references": [
            "metricTableVendasDiarias",
            "metricTableItensMaisVendidos",
            "metricTableEstoqueBaixo"
          ],
          "rulesApplied": [
            "rule-low-stock-alert"
          ]
        }
      ],
      "usecaseEntities": [
        {
          "signal": "usecaseCriarPedido",
          "title": "Criar Pedido",
          "reason": "Gravação do pedido com itens e tipo mesa/takeout.",
          "priority": "now",
          "actor": "caixa",
          "artifactType": "usecaseEntity",
          "references": [
            "Order",
            "OrderItem",
            "KitchenTicket"
          ],
          "rulesApplied": [
            "rule-order-status-transition"
          ]
        },
        {
          "signal": "usecaseAtualizarStatusPedido",
          "title": "Atualizar Status do Pedido",
          "reason": "Persistir transições de status e atualizar fila.",
          "priority": "now",
          "actor": "cozinha",
          "artifactType": "usecaseEntity",
          "references": [
            "Order",
            "KitchenTicket"
          ],
          "rulesApplied": [
            "rule-order-status-transition"
          ]
        },
        {
          "signal": "usecaseBaixarEstoqueIngredientes",
          "title": "Baixa de Estoque por Ingrediente",
          "reason": "Atualizar estoque com base nos itens vendidos.",
          "priority": "now",
          "actor": "cozinha",
          "artifactType": "usecaseEntity",
          "references": [
            "StockItem",
            "RecipeLine",
            "OrderItem"
          ],
          "rulesApplied": [
            "rule-stock-deduct-by-ingredient"
          ]
        },
        {
          "signal": "usecaseFecharTurno",
          "title": "Fechar Turno",
          "reason": "Consolidar vendas e produzir resumo do turno.",
          "priority": "now",
          "actor": "gerente",
          "artifactType": "usecaseEntity",
          "references": [
            "DailyShift",
            "SalesSummary"
          ],
          "rulesApplied": [
            "rule-shift-close-required"
          ]
        },
        {
          "signal": "usecaseCalcularMetricasDashboard",
          "title": "Calcular Métricas do Dashboard",
          "reason": "Atualizar métricas do dia e itens mais vendidos.",
          "priority": "now",
          "actor": "gerente",
          "artifactType": "usecaseEntity",
          "references": [
            "Order",
            "OrderItem",
            "StockItem"
          ],
          "rulesApplied": []
        },
        {
          "signal": "usecaseGerenciarCardapio",
          "title": "Gerenciar Cardápio e Receitas",
          "reason": "Criar e editar itens do cardápio com linhas de receita vinculadas.",
          "priority": "now",
          "actor": "gerente",
          "artifactType": "usecaseEntity",
          "references": [
            "MenuItem",
            "RecipeLine"
          ],
          "rulesApplied": [
            "rule-menuitem-recipe-required"
          ]
        },
        {
          "signal": "usecaseAjustarEstoque",
          "title": "Ajustar Estoque Manual",
          "reason": "Registrar ajustes de estoque e nível mínimo para ingredientes.",
          "priority": "now",
          "actor": "gerente",
          "artifactType": "usecaseEntity",
          "references": [
            "StockItem"
          ],
          "rulesApplied": [
            "rule-low-stock-alert"
          ]
        }
      ]
    },
    "decisions": [
      {
        "decisionId": "decisionAddUsecaseCardapio",
        "title": "Adicionar caso de uso de gestão de cardápio",
        "decision": "Criado usecaseGerenciarCardapio para suportar ações BFF de criação/edição de itens e receitas.",
        "reason": "Obrigatório para ações BFF com escrita em MenuItem/RecipeLine.",
        "affectedArtifacts": [
          "usecaseGerenciarCardapio",
          "gestaoCardapioEstoque"
        ]
      },
      {
        "decisionId": "decisionAddUsecaseAjusteEstoque",
        "title": "Adicionar caso de uso de ajuste de estoque",
        "decision": "Criado usecaseAjustarEstoque para suportar atualização manual de StockItem.",
        "reason": "Obrigatório para ações BFF de ajuste de estoque.",
        "affectedArtifacts": [
          "usecaseAjustarEstoque",
          "gestaoCardapioEstoque"
        ]
      },
      {
        "decisionId": "decisionLinkBaixaEstoqueWorkflow",
        "title": "Vincular baixa de estoque ao fluxo de cozinha",
        "decision": "workflowStatusCozinha referencia usecaseBaixarEstoqueIngredientes e regra de baixa por ingrediente.",
        "reason": "Garantir vínculo layer_3 para atualização de estoque na entrega.",
        "affectedArtifacts": [
          "workflowStatusCozinha"
        ]
      },
      {
        "decisionId": "decisionAddPromotionRelationships",
        "title": "Relacionar sugestões de promoção a itens e resumo",
        "decision": "Adicionados relacionamentos PromotionSuggestion → MenuItem e PromotionSuggestion → SalesSummary.",
        "reason": "Rastreabilidade das sugestões de IA.",
        "affectedArtifacts": [
          "rel-promotion-menuitem",
          "rel-promotion-summary"
        ]
      }
    ],
    "deferredItems": []
  }
} as const;

export default modulePlan;
