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
      "moduleName": "cafeFlow",
      "purpose": "Agilizar o atendimento de pedidos, coordenação de cozinha e controle simples de estoque para cafeterias e lanchonetes pequenas.",
      "businessDomain": "Food service para cafeterias e lanchonetes pequenas",
      "languages": [
        "pt-BR",
        "en"
      ],
      "visualStyle": {
        "tone": "Moderno e minimalista",
        "layout": "Alta legibilidade e uso rápido em POS e cozinha",
        "palette": [
          "#1F2937",
          "#F9FAFB",
          "#F59E0B",
          "#10B981"
        ]
      }
    },
    "actors": [
      {
        "actorId": "atendente",
        "title": "Atendente",
        "description": "Registra pedidos no POS e acompanha status do pedido."
      },
      {
        "actorId": "cozinha",
        "title": "Cozinha",
        "description": "Atualiza o status de preparo dos pedidos e acompanha fila."
      },
      {
        "actorId": "gerente",
        "title": "Gerente",
        "description": "Gerencia cardápio, estoque, turnos e acompanha métricas e relatórios."
      }
    ],
    "capabilities": [
      {
        "capabilityId": "registrarPedido",
        "title": "Registrar pedido no POS",
        "description": "Lançar pedido para mesa ou takeout com itens do cardápio.",
        "actor": "atendente",
        "priority": "now"
      },
      {
        "capabilityId": "atualizarStatusCozinha",
        "title": "Atualizar status de cozinha",
        "description": "Mover pedido por estados de preparo até pronto/entregue.",
        "actor": "cozinha",
        "priority": "now"
      },
      {
        "capabilityId": "gerenciarCardapio",
        "title": "Gerenciar cardápio",
        "description": "Criar e atualizar itens do cardápio, categorias, preços e ingredientes.",
        "actor": "gerente",
        "priority": "now"
      },
      {
        "capabilityId": "gerenciarEstoque",
        "title": "Gerenciar estoque",
        "description": "Controlar itens de estoque e sinalizar baixo estoque.",
        "actor": "gerente",
        "priority": "now"
      },
      {
        "capabilityId": "fecharTurno",
        "title": "Fechar turno diário",
        "description": "Consolidar vendas e gerar relatório de fechamento do turno.",
        "actor": "gerente",
        "priority": "now"
      },
      {
        "capabilityId": "consultarDashboard",
        "title": "Consultar dashboard",
        "description": "Ver vendas de hoje, itens mais vendidos e estoque baixo.",
        "actor": "gerente",
        "priority": "now"
      },
      {
        "capabilityId": "usarAssistenteIA",
        "title": "Usar assistente IA",
        "description": "Gerar resumo de vendas do dia e sugestões de itens para promoção com base nos últimos 7 dias.",
        "actor": "gerente",
        "priority": "soon"
      }
    ],
    "ontology": {
      "entities": {
        "MenuItem": {
          "title": "Item do Cardápio",
          "description": "Produto vendido no POS com preço, categoria e vínculo de ingredientes.",
          "ownership": "mdmOwned"
        },
        "MenuCategory": {
          "title": "Categoria de Cardápio",
          "description": "Agrupamento de itens do cardápio para organização e filtros.",
          "ownership": "mdmOwned"
        },
        "StockItem": {
          "title": "Item de Estoque",
          "description": "Insumo controlado com unidade e nível mínimo.",
          "ownership": "mdmOwned"
        },
        "UnitOfMeasure": {
          "title": "Unidade de Medida",
          "description": "Unidade usada nos itens de estoque e receitas.",
          "ownership": "mdmOwned"
        },
        "ShiftConfig": {
          "title": "Configuração de Turno",
          "description": "Parâmetros e horários de turnos usados no fechamento diário.",
          "ownership": "mdmOwned"
        },
        "Order": {
          "title": "Pedido",
          "description": "Compromisso de venda para mesa ou takeout com itens e status.",
          "ownership": "moduleOwned"
        },
        "OrderItem": {
          "title": "Item do Pedido",
          "description": "Linha do pedido com item do cardápio e quantidade.",
          "ownership": "moduleOwned"
        },
        "OrderStatusHistory": {
          "title": "Histórico de Status do Pedido",
          "description": "Registro de transições de status para rastreio de cozinha.",
          "ownership": "moduleOwned"
        },
        "Shift": {
          "title": "Turno Diário",
          "description": "Período operacional com abertura e fechamento.",
          "ownership": "moduleOwned"
        },
        "ShiftReport": {
          "title": "Relatório de Fechamento de Turno",
          "description": "Consolidação de vendas e indicadores do turno.",
          "ownership": "moduleOwned"
        },
        "StockMovement": {
          "title": "Movimentação de Estoque",
          "description": "Entrada, saída e ajuste de estoque vinculado a itens e pedidos.",
          "ownership": "moduleOwned"
        },
        "LowStockAlert": {
          "title": "Alerta de Estoque Baixo",
          "description": "Sinalização de itens abaixo do nível mínimo.",
          "ownership": "moduleOwned"
        },
        "SalesSummaryRequest": {
          "title": "Solicitação de Resumo de Vendas",
          "description": "Pedido de geração de resumo e recomendações via IA.",
          "ownership": "moduleOwned"
        }
      }
    },
    "relationships": [
      {
        "relationshipId": "menuItemBelongsToCategory",
        "fromEntity": "MenuItem",
        "toEntity": "MenuCategory",
        "type": "manyToOne",
        "description": "Item do cardápio pertence a uma categoria."
      },
      {
        "relationshipId": "menuItemUsesStockItem",
        "fromEntity": "MenuItem",
        "toEntity": "StockItem",
        "type": "manyToMany",
        "description": "Item do cardápio referencia ingredientes em estoque."
      },
      {
        "relationshipId": "orderHasItems",
        "fromEntity": "Order",
        "toEntity": "OrderItem",
        "type": "oneToMany",
        "description": "Pedido contém itens de pedido."
      },
      {
        "relationshipId": "orderItemReferencesMenuItem",
        "fromEntity": "OrderItem",
        "toEntity": "MenuItem",
        "type": "manyToOne",
        "description": "Item do pedido referencia item do cardápio."
      },
      {
        "relationshipId": "orderHasStatusHistory",
        "fromEntity": "Order",
        "toEntity": "OrderStatusHistory",
        "type": "oneToMany",
        "description": "Pedido possui histórico de status."
      },
      {
        "relationshipId": "stockMovementForStockItem",
        "fromEntity": "StockMovement",
        "toEntity": "StockItem",
        "type": "manyToOne",
        "description": "Movimentação associada a um item de estoque."
      },
      {
        "relationshipId": "stockMovementLinkedToOrder",
        "fromEntity": "StockMovement",
        "toEntity": "Order",
        "type": "manyToOne",
        "description": "Saídas de estoque podem ser vinculadas a pedidos."
      },
      {
        "relationshipId": "shiftHasOrders",
        "fromEntity": "Shift",
        "toEntity": "Order",
        "type": "oneToMany",
        "description": "Pedidos são registrados dentro de um turno."
      },
      {
        "relationshipId": "shiftHasReport",
        "fromEntity": "Shift",
        "toEntity": "ShiftReport",
        "type": "oneToOne",
        "description": "Relatório consolidado por turno."
      },
      {
        "relationshipId": "alertForStockItem",
        "fromEntity": "LowStockAlert",
        "toEntity": "StockItem",
        "type": "manyToOne",
        "description": "Alerta aponta o item de estoque em ruptura."
      },
      {
        "relationshipId": "salesSummaryUsesMetrics",
        "fromEntity": "SalesSummaryRequest",
        "toEntity": "ShiftReport",
        "type": "manyToOne",
        "description": "Solicitação de resumo referencia consolidações de vendas."
      },
      {
        "relationshipId": "stockItemUsesUnitOfMeasure",
        "fromEntity": "StockItem",
        "toEntity": "UnitOfMeasure",
        "type": "manyToOne",
        "description": "Item de estoque usa unidade de medida padronizada."
      },
      {
        "relationshipId": "shiftUsesConfig",
        "fromEntity": "Shift",
        "toEntity": "ShiftConfig",
        "type": "manyToOne",
        "description": "Turno utiliza configurações de horário e parâmetros operacionais."
      }
    ]
  }
} as const;

export default modulePlan;
