/// <mls fileReference="_102043_/l5/cafeFlow/process.defs.ts" enhancement="_blank"/>

export const cafeFlowProcess = {
  "schemaVersion": "2026-06-08",
  "moduleName": "cafeFlow",
  "runs": [
    {
      "runId": "newSolution",
      "kind": "newSolution",
      "startedAt": "2026-06-13T12:56:48.046Z",
      "initialPrompt": "Gere um app profissional chamado CafeFlow para cafeterias e lanchonetes pequenas.\nEntidades principais: Item do Cardápio (categoria, preço, ingredientes em estoque), Pedido (mesa ou takeout, itens, status), Turno Diário, Item de Estoque.\nTelas chave: Dashboard (vendas de hoje, itens mais vendidos, estoque baixo), Interface rápida de POS (lançamento de pedido + status cozinha), Gerenciamento de cardápio e estoque, Relatório de fechamento de turno.\nFuncionalidade LLM: Assistente IA que gera \"resumo de vendas do dia\" ou sugere \"quais itens promover com base nos últimos 7 dias\".\nFoco: Atendimento rápido de pedidos, coordenação de cozinha e controle simples de estoque para food service.\nlinguagem: en, pt-br",
      "userLanguage": "pt-BR",
      "decisions": [
        {
          "decisionId": "addMissingRelationships",
          "title": "Adicionar relacionamentos faltantes de MDM",
          "decision": "Incluídos relacionamentos StockItem→UnitOfMeasure e Shift→ShiftConfig.",
          "reason": "Correção dos erros missing_relationship identificados na revisão do blueprint.",
          "affectedArtifacts": [
            "stockItemMdm",
            "shiftConfigMdm"
          ],
          "revisedBy": "agentPlanMDM",
          "revisedAt": "2026-06-13T12:56:48.046Z",
          "revisedScope": {
            "mdmDomains": [
              {
                "domainId": "menu",
                "masterEntities": [
                  "MenuItem",
                  "MenuCategory"
                ]
              },
              {
                "domainId": "stock",
                "masterEntities": [
                  "StockItem",
                  "UnitOfMeasure"
                ]
              },
              {
                "domainId": "shiftConfig",
                "masterEntities": [
                  "ShiftConfig"
                ]
              }
            ]
          }
        },
        {
          "decisionId": "addMenuUsecaseEntity",
          "title": "Adicionar entidade de caso de uso para cardápio",
          "decision": "Incluída menuUsecaseEntity para cobrir comandos de escrita do cardápio.",
          "reason": "Correção do erro missing_layer3_usecase para a capacidade gerenciarCardapio apontado na revisão.",
          "affectedArtifacts": [
            "menuUsecaseEntity"
          ]
        },
        {
          "decisionId": "linkOrderToStockMovement",
          "title": "Vincular criação de pedido a movimentação de estoque",
          "decision": "createOrder passou a afetar StockMovement e aplicar lowStockThresholdRule.",
          "reason": "Correção do aviso de falta de vínculo entre pedido e consumo de estoque na revisão.",
          "affectedArtifacts": [
            "orderUsecaseEntity"
          ]
        },
        {
          "decisionId": "addSalesSummaryUsecaseEntity",
          "title": "Adicionar entidade de caso de uso para resumo de vendas",
          "decision": "Incluída salesSummaryUsecaseEntity para a solicitação de resumo via IA.",
          "reason": "Correção do aviso missing_layer3_usecase para requestSalesSummary na revisão.",
          "affectedArtifacts": [
            "salesSummaryUsecaseEntity"
          ]
        }
      ],
      "deferredItems": [],
      "openDetails": [
        {
          "title": "Impressão de comandas",
          "description": "O sistema deve suportar impressão térmica de comandas para a cozinha ou apenas exibição em tela?"
        },
        {
          "title": "Multi-dispositivo e sincronização",
          "description": "O POS deve permitir múltiplos tablets simultâneos com sincronização em tempo real dos pedidos?"
        },
        {
          "title": "Provedor e modelo de LLM",
          "description": "Qual provedor/modelo de IA será utilizado para o assistente de resumo de vendas e sugestões promocionais?"
        }
      ],
      "healthReport": {
        "summary": {
          "passed": true,
          "errorCount": 0,
          "warningCount": 1
        },
        "issues": [
          {
            "severity": "warning",
            "code": "usecase.consumer.missing",
            "message": "usecase obterPedido has no consumer (no page BFF command, workflow or agent references it)",
            "path": "usecase.obterPedido",
            "evidence": []
          }
        ],
        "checklistResults": null,
        "readyToSaveDefs": true,
        "deterministicOnly": true,
        "refreshedAt": "2026-06-13T12:56:48.157Z",
        "refreshedBy": "agentNewSolutionFinal (T-016 deterministic re-validation)"
      },
      "nextSteps": [
        {
          "id": "horizontalModule:notifications",
          "kind": "horizontalModule",
          "title": "notifications",
          "description": "Alertas de estoque baixo e avisos operacionais precisam de comunicação ao gerente conforme workflow de alerta.",
          "moduleId": "notifications",
          "status": "dismissed"
        },
        {
          "id": "plugin:llmSalesAssistant",
          "kind": "plugin",
          "title": "llmSalesAssistant",
          "description": "Necessário para executar o assistente IA de vendas previsto para a fase soon.",
          "pluginId": "llmSalesAssistant",
          "status": "dismissed"
        }
      ],
      "finishedAt": "2026-06-13T14:49:58.312Z"
    }
  ]
} as const;

export default cafeFlowProcess;
