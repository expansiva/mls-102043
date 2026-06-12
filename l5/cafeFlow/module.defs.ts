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
      "purpose": "Acelerar o atendimento e organizar pedidos, cozinha e estoque básico para cafeterias e lanchonetes pequenas.",
      "businessDomain": "Food service / cafeterias e lanchonetes",
      "languages": [
        "pt-BR",
        "en"
      ],
      "visualStyle": {
        "tone": "Moderno e minimalista",
        "layout": "Touch-first, foco em velocidade no POS",
        "palette": [
          "#D35400",
          "#F5CBA7",
          "#FFF8F0",
          "#2C3E50"
        ]
      }
    },
    "actors": [
      {
        "actorId": "atendenteCaixa",
        "title": "Atendente/Caixa",
        "description": "Registra pedidos rapidamente no POS e acompanha status básico do pedido."
      },
      {
        "actorId": "cozinha",
        "title": "Cozinha",
        "description": "Acompanha e atualiza o status de preparo dos pedidos."
      },
      {
        "actorId": "gerente",
        "title": "Gerente",
        "description": "Gerencia cardápio, estoque, turnos e acompanha relatórios e dashboard."
      }
    ],
    "capabilities": [
      {
        "capabilityId": "registrarPedidoPos",
        "title": "Registrar pedido no POS",
        "description": "Lançar pedidos de mesa ou takeout com itens do cardápio de forma touch-friendly.",
        "actor": "atendenteCaixa",
        "priority": "now"
      },
      {
        "capabilityId": "atualizarStatusCozinha",
        "title": "Atualizar status do pedido",
        "description": "Mover pedidos no fluxo recebido → preparando → pronto → entregue/cancelado.",
        "actor": "cozinha",
        "priority": "now"
      },
      {
        "capabilityId": "gerenciarCardapio",
        "title": "Gerenciar cardápio",
        "description": "Criar e editar itens do cardápio, categorias, preços e ingredientes vinculados.",
        "actor": "gerente",
        "priority": "now"
      },
      {
        "capabilityId": "gerenciarEstoque",
        "title": "Gerenciar estoque",
        "description": "Controlar itens de estoque e níveis mínimos/alertas de baixo estoque.",
        "actor": "gerente",
        "priority": "now"
      },
      {
        "capabilityId": "fecharTurnoDiario",
        "title": "Fechar turno diário",
        "description": "Consolidar vendas e gerar relatório de fechamento do turno.",
        "actor": "gerente",
        "priority": "now"
      },
      {
        "capabilityId": "acompanharDashboard",
        "title": "Acompanhar dashboard",
        "description": "Ver vendas do dia, itens mais vendidos, estoque baixo e sugestões automáticas.",
        "actor": "gerente",
        "priority": "now"
      },
      {
        "capabilityId": "consultarAssistenteIa",
        "title": "Consultar assistente IA",
        "description": "Gerar resumo de vendas do dia e sugerir itens para promover com base nos últimos 7 dias.",
        "actor": "gerente",
        "priority": "soon"
      }
    ],
    "ontology": {
      "entities": {
        "MenuItem": {
          "title": "Item do Cardápio",
          "description": "Produto vendido no POS com preço e vínculo a ingredientes/estoque.",
          "ownership": "mdmOwned"
        },
        "MenuCategory": {
          "title": "Categoria do Cardápio",
          "description": "Agrupamento de itens do cardápio para navegação rápida no POS.",
          "ownership": "moduleOwned"
        },
        "InventoryItem": {
          "title": "Item de Estoque",
          "description": "Insumo ou item de estoque com nível mínimo e quantidade disponível.",
          "ownership": "moduleOwned"
        },
        "MenuItemIngredient": {
          "title": "Ingrediente do Item do Cardápio",
          "description": "Vínculo entre item do cardápio e itens de estoque para controle de ingredientes.",
          "ownership": "moduleOwned"
        },
        "Order": {
          "title": "Pedido",
          "description": "Compromisso de venda (mesa ou takeout) com itens e status de preparo.",
          "ownership": "moduleOwned"
        },
        "OrderItem": {
          "title": "Item do Pedido",
          "description": "Itens do cardápio associados a um pedido com quantidade e observações.",
          "ownership": "moduleOwned"
        },
        "DailyShift": {
          "title": "Turno Diário",
          "description": "Registro de abertura e fechamento do turno com consolidação de vendas.",
          "ownership": "moduleOwned"
        },
        "ShiftClosingReport": {
          "title": "Relatório de Fechamento de Turno",
          "description": "Resumo consolidado do turno diário para conferência do gerente.",
          "ownership": "moduleOwned"
        },
        "InventoryAdjustment": {
          "title": "Ajuste de Estoque",
          "description": "Registro operacional de baixa ou ajuste de estoque manual.",
          "ownership": "moduleOwned"
        },
        "AiInsightRequest": {
          "title": "Solicitação de Insight IA",
          "description": "Pedido de geração de resumo de vendas ou sugestão de promoções.",
          "ownership": "moduleOwned"
        },
        "OrderUsecase": {
          "title": "Pedido (Caso de Uso)",
          "description": "Entidade operacional para comandos de criação e atualização de pedidos.",
          "ownership": "moduleOwned"
        },
        "InventoryAdjustmentUsecase": {
          "title": "Ajuste de Estoque (Caso de Uso)",
          "description": "Entidade operacional para comandos de ajuste/baixa de estoque.",
          "ownership": "moduleOwned"
        },
        "ShiftCloseUsecase": {
          "title": "Fechamento de Turno (Caso de Uso)",
          "description": "Entidade operacional para o processo de fechamento diário.",
          "ownership": "moduleOwned"
        }
      }
    },
    "relationships": [
      {
        "relationshipId": "menuItemToCategory",
        "fromEntity": "MenuItem",
        "toEntity": "MenuCategory",
        "type": "manyToOne",
        "description": "Cada item do cardápio pertence a uma categoria."
      },
      {
        "relationshipId": "menuItemToIngredient",
        "fromEntity": "MenuItem",
        "toEntity": "MenuItemIngredient",
        "type": "oneToMany",
        "description": "Itens do cardápio possuem lista de ingredientes vinculados a itens de estoque."
      },
      {
        "relationshipId": "ingredientToInventoryItem",
        "fromEntity": "MenuItemIngredient",
        "toEntity": "InventoryItem",
        "type": "manyToOne",
        "description": "Cada ingrediente referencia um item de estoque."
      },
      {
        "relationshipId": "orderToOrderItem",
        "fromEntity": "Order",
        "toEntity": "OrderItem",
        "type": "oneToMany",
        "description": "Pedido contém vários itens."
      },
      {
        "relationshipId": "orderItemToMenuItem",
        "fromEntity": "OrderItem",
        "toEntity": "MenuItem",
        "type": "manyToOne",
        "description": "Cada item do pedido referencia um item do cardápio."
      },
      {
        "relationshipId": "orderToDailyShift",
        "fromEntity": "Order",
        "toEntity": "DailyShift",
        "type": "manyToOne",
        "description": "Pedidos pertencem a um turno diário."
      },
      {
        "relationshipId": "shiftToClosingReport",
        "fromEntity": "DailyShift",
        "toEntity": "ShiftClosingReport",
        "type": "oneToOne",
        "description": "Cada turno fechado gera um relatório de fechamento."
      },
      {
        "relationshipId": "inventoryAdjustmentToInventoryItem",
        "fromEntity": "InventoryAdjustment",
        "toEntity": "InventoryItem",
        "type": "manyToOne",
        "description": "Ajuste de estoque aplica-se a um item de estoque."
      },
      {
        "relationshipId": "aiRequestToShift",
        "fromEntity": "AiInsightRequest",
        "toEntity": "DailyShift",
        "type": "manyToOne",
        "description": "Solicitações de insight podem referenciar o turno do dia."
      }
    ]
  }
} as const;

export default modulePlan;
