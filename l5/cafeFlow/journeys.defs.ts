/// <mls fileReference="_102043_/l5/cafeFlow/journeys.defs.ts" enhancement="_blank"/>

export const userJourneysPlan = {
  "schemaVersion": "2026-06-06",
  "artifactType": "userJourneys",
  "artifactId": "journeys",
  "moduleName": "cafeFlow",
  "status": "draft",
  "source": {
    "agentName": "agentPlanUserJourneys",
    "stepId": 12,
    "planId": "plan-user-journeys"
  },
  "data": {
    "journeys": [
      {
        "journeyId": "registrarPedidoPos",
        "title": "Registrar pedido no POS",
        "actor": "atendente",
        "capabilityIds": [
          "registrarPedido"
        ],
        "description": "O atendente registra rapidamente um pedido no POS, confirma itens e envia para a cozinha.",
        "steps": [
          {
            "intent": "Iniciar um novo pedido rapidamente",
            "action": "Acessa a interface rápida de POS e abre um pedido em branco",
            "entities": [
              "Order"
            ],
            "pageHint": "posRapido",
            "outcome": "Pedido criado em status recebido"
          },
          {
            "intent": "Adicionar itens e quantidades",
            "action": "Seleciona itens do cardápio e ajusta quantidades",
            "entities": [
              "Order",
              "OrderItem",
              "MenuItem"
            ],
            "pageHint": "posRapido",
            "outcome": "Itens adicionados ao pedido"
          },
          {
            "intent": "Revisar total e observações",
            "action": "Confere itens e adiciona observações do cliente",
            "entities": [
              "Order",
              "OrderItem"
            ],
            "pageHint": "posRapido",
            "outcome": "Pedido pronto para envio"
          },
          {
            "intent": "Enviar para a cozinha",
            "action": "Confirma o pedido e dispara para o painel da cozinha",
            "entities": [
              "Order",
              "OrderStatusHistory"
            ],
            "pageHint": "posRapido",
            "outcome": "Pedido visível na cozinha com status recebido"
          },
          {
            "intent": "Cancelar um pedido antes do preparo",
            "action": "Seleciona o pedido e solicita cancelamento",
            "entities": [
              "Order",
              "OrderStatusHistory"
            ],
            "pageHint": "posRapido",
            "outcome": "Pedido marcado como cancelado e removido do fluxo da cozinha"
          }
        ]
      },
      {
        "journeyId": "atualizarStatusCozinha",
        "title": "Atualizar status do pedido na cozinha",
        "actor": "cozinha",
        "capabilityIds": [
          "atualizarStatusCozinha"
        ],
        "description": "A equipe de cozinha acompanha os pedidos e atualiza o status conforme o preparo avança.",
        "steps": [
          {
            "intent": "Ver fila de pedidos recebidos",
            "action": "Abre o painel de status da cozinha",
            "entities": [
              "Order"
            ],
            "pageHint": "painelCozinha",
            "outcome": "Lista de pedidos recebidos visível"
          },
          {
            "intent": "Iniciar preparo do pedido",
            "action": "Seleciona um pedido e muda status para em preparo",
            "entities": [
              "Order",
              "OrderStatusHistory"
            ],
            "pageHint": "painelCozinha",
            "outcome": "Pedido passa para emPreparo"
          },
          {
            "intent": "Marcar pedido como pronto",
            "action": "Atualiza o pedido para pronto quando finaliza",
            "entities": [
              "Order",
              "OrderStatusHistory"
            ],
            "pageHint": "painelCozinha",
            "outcome": "Pedido fica disponível para entrega"
          },
          {
            "intent": "Entregar pedido ao cliente",
            "action": "Confirma a entrega quando o pedido é retirado",
            "entities": [
              "Order",
              "OrderStatusHistory"
            ],
            "pageHint": "painelCozinha",
            "outcome": "Pedido marcado como entregue"
          },
          {
            "intent": "Sinalizar cancelamento informado pelo atendimento",
            "action": "Atualiza o pedido para cancelado quando necessário",
            "entities": [
              "Order",
              "OrderStatusHistory"
            ],
            "pageHint": "painelCozinha",
            "outcome": "Pedido removido do fluxo de preparo"
          }
        ]
      },
      {
        "journeyId": "gerenciarCardapio",
        "title": "Gerenciar itens do cardápio",
        "actor": "gerente",
        "capabilityIds": [
          "gerenciarCardapio"
        ],
        "description": "O gerente cria e ajusta itens do cardápio com categorias e disponibilidade.",
        "steps": [
          {
            "intent": "Acessar gestão de cardápio",
            "action": "Entra no módulo de gerenciamento de cardápio e estoque",
            "entities": [
              "MenuItem",
              "MenuCategory"
            ],
            "pageHint": "cardapioEstoque",
            "outcome": "Lista de itens do cardápio exibida"
          },
          {
            "intent": "Criar um novo item",
            "action": "Clica em adicionar item, define nome, preço e categoria",
            "entities": [
              "MenuItem",
              "MenuCategory"
            ],
            "pageHint": "cardapioEstoque",
            "outcome": "Item criado e disponível no POS"
          },
          {
            "intent": "Editar um item existente",
            "action": "Seleciona um item e ajusta preço ou descrição",
            "entities": [
              "MenuItem"
            ],
            "pageHint": "cardapioEstoque",
            "outcome": "Item atualizado no cardápio"
          },
          {
            "intent": "Desativar item temporariamente",
            "action": "Marca o item como indisponível",
            "entities": [
              "MenuItem"
            ],
            "pageHint": "cardapioEstoque",
            "outcome": "Item oculto no POS e cozinha"
          },
          {
            "intent": "Bloqueio por falta de categoria",
            "action": "Tenta salvar item sem categoria e corrige",
            "entities": [
              "MenuItem",
              "MenuCategory"
            ],
            "pageHint": "cardapioEstoque",
            "outcome": "Item salvo somente após definir categoria"
          }
        ]
      },
      {
        "journeyId": "gerenciarEstoque",
        "title": "Gerenciar estoque e alertas",
        "actor": "gerente",
        "capabilityIds": [
          "gerenciarEstoque"
        ],
        "description": "O gerente controla níveis de estoque e reage a alertas de baixo estoque.",
        "steps": [
          {
            "intent": "Visualizar estoque atual",
            "action": "Acessa o painel de cardápio e estoque e filtra por estoque",
            "entities": [
              "StockItem"
            ],
            "pageHint": "cardapioEstoque",
            "outcome": "Lista de itens com quantidades exibida"
          },
          {
            "intent": "Registrar entrada ou saída",
            "action": "Seleciona um item e registra movimentação de estoque",
            "entities": [
              "StockItem",
              "StockMovement",
              "UnitOfMeasure"
            ],
            "pageHint": "cardapioEstoque",
            "outcome": "Quantidade atualizada"
          },
          {
            "intent": "Ajustar estoque por contagem",
            "action": "Corrige quantidade após contagem física",
            "entities": [
              "StockItem",
              "StockMovement"
            ],
            "pageHint": "cardapioEstoque",
            "outcome": "Estoque reconciliado"
          },
          {
            "intent": "Tratar alerta de estoque baixo",
            "action": "Abre alerta e define reposição ou marca indisponível",
            "entities": [
              "LowStockAlert",
              "StockItem"
            ],
            "pageHint": "cardapioEstoque",
            "outcome": "Alerta resolvido e item ajustado"
          }
        ]
      },
      {
        "journeyId": "fecharTurnoDiario",
        "title": "Fechar turno diário",
        "actor": "gerente",
        "capabilityIds": [
          "fecharTurno"
        ],
        "description": "O gerente fecha o turno após garantir que não há pedidos abertos e gera relatório.",
        "steps": [
          {
            "intent": "Iniciar fechamento do turno",
            "action": "Acessa o relatório de fechamento de turno",
            "entities": [
              "Shift"
            ],
            "pageHint": "fechamentoTurno",
            "outcome": "Turno em status emFechamento"
          },
          {
            "intent": "Validar pedidos finalizados",
            "action": "Confere lista de pedidos do turno",
            "entities": [
              "Order",
              "Shift"
            ],
            "pageHint": "fechamentoTurno",
            "outcome": "Pedidos verificados para fechamento"
          },
          {
            "intent": "Bloqueio por pedidos abertos",
            "action": "Tenta fechar e recebe aviso de pedidos não finalizados",
            "entities": [
              "Order",
              "Shift"
            ],
            "pageHint": "fechamentoTurno",
            "outcome": "Fechamento impedido até finalizar pedidos"
          },
          {
            "intent": "Confirmar fechamento",
            "action": "Finaliza o turno e gera relatório",
            "entities": [
              "Shift",
              "ShiftReport"
            ],
            "pageHint": "fechamentoTurno",
            "outcome": "Turno fechado e relatório disponível"
          }
        ]
      },
      {
        "journeyId": "consultarDashboardGerente",
        "title": "Consultar dashboard do gerente",
        "actor": "gerente",
        "capabilityIds": [
          "consultarDashboard"
        ],
        "description": "O gerente acompanha métricas operacionais e de vendas em um dashboard.",
        "steps": [
          {
            "intent": "Abrir visão geral do dia",
            "action": "Acessa o dashboard administrativo de métricas",
            "entities": [
              "Shift",
              "Order"
            ],
            "pageHint": "dashboardGerente",
            "outcome": "Métricas do dia carregadas"
          },
          {
            "intent": "Analisar itens mais vendidos",
            "action": "Aplica filtro de itens mais vendidos",
            "entities": [
              "MenuItem",
              "OrderItem"
            ],
            "pageHint": "dashboardGerente",
            "outcome": "Ranking de itens exibido"
          },
          {
            "intent": "Monitorar estoque baixo",
            "action": "Consulta o painel de alertas de estoque",
            "entities": [
              "LowStockAlert",
              "StockItem"
            ],
            "pageHint": "dashboardGerente",
            "outcome": "Alertas visíveis para ação"
          }
        ]
      }
    ]
  }
} as const;

export default userJourneysPlan;
