/// <mls fileReference="_102043_/l2/cafeFlow/web/desktop/page11/posRapido.defs.ts" enhancement="_blank"/>

export const definition = {
  "pageId": "posRapido",
  "pageName": "POS rápido",
  "actor": "atendente",
  "purpose": "Registrar pedidos rapidamente no POS, revisar itens e confirmar envio para a cozinha.",
  "capabilities": [
    "registrarPedido"
  ],
  "flowRefs": {
    "experienceFlows": [
      "posOrderCaptureWorkflow"
    ],
    "entityLifecycles": [
      "orderStatusWorkflow"
    ],
    "taskWorkflows": [],
    "automations": []
  },
  "pluginRefs": [],
  "mdmRefs": [],
  "pageInputs": [],
  "navigationRefs": [
    {
      "direction": "outbound",
      "pageId": "painelCozinha",
      "trigger": "Pedido enviado para a cozinha",
      "description": "Após confirmação e envio do pedido para preparo."
    }
  ],
  "sections": [
    {
      "sectionName": "Pedidos do dia",
      "mode": "view",
      "organisms": [
        {
          "organismName": "Lista de pedidos do dia",
          "purpose": "Consultar rapidamente pedidos recentes e seus status atuais.",
          "userActions": [
            "filtrarPorStatus",
            "filtrarPorPeriodo",
            "visualizarResumo"
          ],
          "requiredEntities": [
            "Order"
          ],
          "readsFields": [
            "orderId",
            "status",
            "createdAt",
            "updatedAt"
          ],
          "writesFields": [],
          "rulesApplied": []
        }
      ]
    },
    {
      "sectionName": "Captura rápida",
      "mode": "edit",
      "organisms": [
        {
          "organismName": "Editor rápido de itens",
          "purpose": "Adicionar e ajustar itens do pedido e observações antes da confirmação.",
          "userActions": [
            "adicionarItem",
            "alterarQuantidade",
            "removerItem",
            "adicionarObservacao"
          ],
          "requiredEntities": [
            "Order"
          ],
          "readsFields": [],
          "writesFields": [],
          "rulesApplied": []
        }
      ]
    },
    {
      "sectionName": "Revisão e envio",
      "mode": "confirm",
      "organisms": [
        {
          "organismName": "Resumo e envio para cozinha",
          "purpose": "Revisar o pedido e confirmar o envio para preparo.",
          "userActions": [
            "confirmarEEnviar",
            "voltarParaEditar"
          ],
          "requiredEntities": [
            "Order",
            "OrderStatusHistory"
          ],
          "readsFields": [],
          "writesFields": [],
          "rulesApplied": [
            "orderRequiresItem",
            "orderStatusTransition"
          ]
        }
      ]
    }
  ]
};

export const pipeline = [
  {
    "id": "posRapido__l2_page",
    "type": "l2_page",
    "outputPath": "_102043_/l2/cafeFlow/web/desktop/page11/posRapido.ts",
    "defPath": "_102043_/l2/cafeFlow/web/desktop/page11/posRapido.defs.ts",
    "dependsFiles": [
      "_102043_/l2/cafeFlow/web/shared/posRapido.ts",
      "_102043_/l2/cafeFlow/web/contracts/posRapido.ts"
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
