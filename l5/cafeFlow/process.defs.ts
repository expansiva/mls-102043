/// <mls fileReference="_102043_/l5/cafeFlow/process.defs.ts" enhancement="_blank"/>

export const cafeFlowProcess = {
  "schemaVersion": "2026-06-08",
  "moduleName": "cafeFlow",
  "runs": [
    {
      "runId": "newSolution",
      "kind": "newSolution",
      "startedAt": "2026-06-12T14:54:54.064Z",
      "initialPrompt": "Gere um app profissional chamado CafeFlow para cafeterias e lanchonetes pequenas.\nEntidades principais: Item do Cardápio (categoria, preço, ingredientes em estoque), Pedido (mesa ou takeout, itens, status), Turno Diário, Item de Estoque.\nTelas chave: Dashboard (vendas de hoje, itens mais vendidos, estoque baixo), Interface rápida de POS (lançamento de pedido + status cozinha), Gerenciamento de cardápio e estoque, Relatório de fechamento de turno.\nFuncionalidade LLM: Assistente IA que gera \"resumo de vendas do dia\" ou sugere \"quais itens promover com base nos últimos 7 dias\".\nFoco: Atendimento rápido de pedidos, coordenação de cozinha e controle simples de estoque para food service.\nlinguagem: en, pt-br",
      "userLanguage": "pt-BR",
      "decisions": [
        {
          "decisionId": "decisionMenuItemMdm",
          "title": "Manter MDM de Item do Cardápio",
          "decision": "Aprovar MDM de Item do Cardápio como domínio mestre.",
          "reason": "Decisão aceita em 'Decisoes de implementacao' para menuItemMdm, com motivo de entidade central compartilhada.",
          "affectedArtifacts": [
            "menuItemMdm"
          ],
          "revisedBy": "agentPlanMDM",
          "revisedAt": "2026-06-12T14:54:54.064Z",
          "revisedScope": {
            "mdmDomains": [
              {
                "domainId": "menuItem",
                "masterEntities": [
                  "MenuItem"
                ]
              }
            ]
          }
        },
        {
          "decisionId": "decisionOrderUsecaseEntity",
          "title": "Manter entidade de caso de uso Pedido",
          "decision": "Aprovar entidade de caso de uso para comandos e mudanças de status de pedido.",
          "reason": "Decisão aceita em 'Decisoes de implementacao' para orderUsecaseEntity.",
          "affectedArtifacts": [
            "orderUsecaseEntity"
          ]
        },
        {
          "decisionId": "decisionInventoryUsecaseEntity",
          "title": "Manter entidade de caso de uso Ajuste de Estoque",
          "decision": "Aprovar entidade de caso de uso para ajustes e baixas de estoque.",
          "reason": "Decisão aceita em 'Decisoes de implementacao' para inventoryUsecaseEntity.",
          "affectedArtifacts": [
            "inventoryUsecaseEntity"
          ]
        },
        {
          "decisionId": "decisionShiftCloseUsecaseEntity",
          "title": "Manter entidade de caso de uso Fechamento de Turno",
          "decision": "Aprovar entidade de caso de uso para consolidação e fechamento diário.",
          "reason": "Decisão aceita em 'Decisoes de implementacao' para shiftCloseUsecaseEntity.",
          "affectedArtifacts": [
            "shiftCloseUsecaseEntity"
          ]
        },
        {
          "decisionId": "decisionPagesCore",
          "title": "Aprovar páginas operacionais principais",
          "decision": "Aprovar páginas POS, cozinha, cardápio/estoque, fechamento e dashboard.",
          "reason": "Decisões aceitas em 'Decisoes de implementacao' para posRapidPage, kitchenOrdersPage, menuStockManagementPage, shiftCloseReportPage e dashboardPage.",
          "affectedArtifacts": [
            "posRapidoPage",
            "cozinhaPedidosPage",
            "cardapioEstoquePage",
            "fechamentoTurnoReportPage",
            "dashboardPage"
          ]
        },
        {
          "decisionId": "decisionWorkflowsCore",
          "title": "Aprovar workflows de pedido e fechamento",
          "decision": "Aprovar workflows de status do pedido e fechamento do turno.",
          "reason": "Decisões aceitas em 'Decisoes de implementacao' para orderStatusWorkflow e shiftCloseWorkflow.",
          "affectedArtifacts": [
            "pedidoWorkflow",
            "fechamentoTurnoWorkflow"
          ]
        },
        {
          "decisionId": "decisionMetricsCore",
          "title": "Aprovar métricas e dashboard do gerente",
          "decision": "Aprovar tabelas de métricas e dashboard de vendas do gerente.",
          "reason": "Decisões aceitas em 'Decisoes de implementacao' para salesDailyMetricTable, topItemsMetricTable, lowStockMetricTable e gerenteSalesDashboard.",
          "affectedArtifacts": [
            "salesDailyMetricTable",
            "topItemsMetricTable",
            "lowStockMetricTable",
            "gerenteSalesDashboard"
          ]
        },
        {
          "decisionId": "decisionSalesAiAgent",
          "title": "Aprovar assistente IA de vendas",
          "decision": "Aprovar agente de IA para resumo e sugestões de promoções.",
          "reason": "Decisão aceita em 'Decisoes de implementacao' para salesAiAssistantAgent.",
          "affectedArtifacts": [
            "assistenteIaVendas"
          ]
        }
      ],
      "deferredItems": [],
      "openDetails": [
        {
          "title": "Impressão de pedidos na cozinha",
          "description": "O sistema deve integrar com impressora térmica na cozinha ou a comunicação será apenas por tela/visual?"
        },
        {
          "title": "Formas de pagamento e fechamento",
          "description": "Quais métodos de pagamento devem ser suportados (dinheiro, PIX, cartão) e em que momento o pedido é considerado pago?"
        },
        {
          "title": "Perfis de acesso e multiusuário",
          "description": "Haverá controle de perfis distintos (garçom, caixa, gerente, cozinha) ou todos acessam com o mesmo login?"
        }
      ],
      "healthReport": {
        "summary": {
          "passed": true,
          "errorCount": 0,
          "warningCount": 9
        },
        "issues": [
          {
            "severity": "warning",
            "code": "entity.fieldColumn.unmapped",
            "message": "entity CardapioEntity field menuCategoryId maps to no column of table menu_item_ingredient (and the table has no details JSONB)",
            "path": "entity.CardapioEntity.fields.menuCategoryId",
            "evidence": []
          },
          {
            "severity": "warning",
            "code": "entity.fieldColumn.unmapped",
            "message": "entity CardapioEntity field name maps to no column of table menu_item_ingredient (and the table has no details JSONB)",
            "path": "entity.CardapioEntity.fields.name",
            "evidence": []
          },
          {
            "severity": "warning",
            "code": "entity.fieldColumn.unmapped",
            "message": "entity CardapioEntity field description maps to no column of table menu_item_ingredient (and the table has no details JSONB)",
            "path": "entity.CardapioEntity.fields.description",
            "evidence": []
          },
          {
            "severity": "warning",
            "code": "entity.fieldColumn.unmapped",
            "message": "entity CardapioEntity field sortOrder maps to no column of table menu_item_ingredient (and the table has no details JSONB)",
            "path": "entity.CardapioEntity.fields.sortOrder",
            "evidence": []
          },
          {
            "severity": "warning",
            "code": "entity.fieldColumn.unmapped",
            "message": "entity CardapioEntity field color maps to no column of table menu_item_ingredient (and the table has no details JSONB)",
            "path": "entity.CardapioEntity.fields.color",
            "evidence": []
          },
          {
            "severity": "warning",
            "code": "entity.fieldColumn.unmapped",
            "message": "entity CardapioEntity field isActive maps to no column of table menu_item_ingredient (and the table has no details JSONB)",
            "path": "entity.CardapioEntity.fields.isActive",
            "evidence": []
          },
          {
            "severity": "warning",
            "code": "entity.fieldColumn.unmapped",
            "message": "entity EstoqueEntity field name maps to no column of table inventory_adjustment (and the table has no details JSONB)",
            "path": "entity.EstoqueEntity.fields.name",
            "evidence": []
          },
          {
            "severity": "warning",
            "code": "entity.fieldColumn.unmapped",
            "message": "entity EstoqueEntity field quantityAvailable maps to no column of table inventory_adjustment (and the table has no details JSONB)",
            "path": "entity.EstoqueEntity.fields.quantityAvailable",
            "evidence": []
          },
          {
            "severity": "warning",
            "code": "entity.fieldColumn.unmapped",
            "message": "entity EstoqueEntity field minimumLevel maps to no column of table inventory_adjustment (and the table has no details JSONB)",
            "path": "entity.EstoqueEntity.fields.minimumLevel",
            "evidence": []
          }
        ],
        "checklistResults": null,
        "readyToSaveDefs": true,
        "deterministicOnly": true,
        "refreshedAt": "2026-06-12T14:54:54.617Z",
        "refreshedBy": "agentNewSolutionFinal (T-016 deterministic re-validation)"
      },
      "nextSteps": []
    }
  ]
} as const;

export default cafeFlowProcess;
