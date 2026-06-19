/// <mls fileReference="_102043_/l2/cafeFlow/web/desktop/page11/fechamentoTurno.defs.ts" enhancement="_blank"/>

export const definition = `
## Definition
\`\`\`JSON
{
  "pageId": "fechamentoTurno",
  "pageName": "Fechamento de turno",
  "actor": "gerente",
  "purpose": "Validar pedidos do turno e confirmar o fechamento com geração de relatório.",
  "capabilities": [
    "fecharTurno"
  ],
  "flowRefs": {
    "experienceFlows": [],
    "entityLifecycles": [
      "shiftClosureWorkflow"
    ],
    "taskWorkflows": [],
    "automations": []
  },
  "pluginRefs": [],
  "mdmRefs": [
    "shiftConfig"
  ],
  "pageInputs": [],
  "navigationRefs": [
    {
      "direction": "outbound",
      "pageId": "dashboardGerente",
      "trigger": "Ver resumo do turno",
      "description": "Após confirmar o fechamento e revisar o relatório."
    }
  ],
  "sections": [
    {
      "sectionName": "Seleção de turno",
      "mode": "selection",
      "organisms": [
        {
          "organismName": "Seletor de turno",
          "purpose": "Selecionar o turno a fechar e visualizar seu status.",
          "userActions": [
            "selecionarTurno"
          ],
          "requiredEntities": [
            "Shift"
          ],
          "readsFields": [
            "Shift.shiftId",
            "Shift.status",
            "Shift.openedAt",
            "Shift.closedAt",
            "Shift.shiftConfigId"
          ],
          "writesFields": [
            "Shift.shiftId"
          ],
          "rulesApplied": []
        }
      ]
    },
    {
      "sectionName": "Validação de pedidos do turno",
      "mode": "review",
      "organisms": [
        {
          "organismName": "Lista de pedidos do turno",
          "purpose": "Validar se todos os pedidos do turno estão finalizados.",
          "userActions": [
            "filtrarPedidos",
            "revisarStatus"
          ],
          "requiredEntities": [
            "Order"
          ],
          "readsFields": [
            "Order.orderId",
            "Order.status",
            "Order.shiftId",
            "Order.createdAt",
            "Order.updatedAt"
          ],
          "writesFields": [],
          "rulesApplied": [
            "shiftClosureRequiresNoOpenOrders"
          ]
        }
      ]
    },
    {
      "sectionName": "Relatório do turno",
      "mode": "read",
      "organisms": [
        {
          "organismName": "Resumo de fechamento",
          "purpose": "Exibir o relatório consolidado do turno selecionado.",
          "userActions": [
            "visualizarRelatorio"
          ],
          "requiredEntities": [
            "ShiftReport"
          ],
          "readsFields": [
            "ShiftReport.shiftReportId",
            "ShiftReport.shiftId",
            "ShiftReport.totalSalesAmount",
            "ShiftReport.totalOrders",
            "ShiftReport.totalItems",
            "ShiftReport.notes",
            "ShiftReport.createdAt",
            "ShiftReport.updatedAt"
          ],
          "writesFields": [],
          "rulesApplied": []
        }
      ]
    },
    {
      "sectionName": "Confirmação de fechamento",
      "mode": "action",
      "organisms": [
        {
          "organismName": "Confirmar fechamento",
          "purpose": "Confirmar o fechamento do turno e gerar o relatório.",
          "userActions": [
            "confirmarFechamento"
          ],
          "requiredEntities": [
            "Shift",
            "ShiftReport",
            "Order"
          ],
          "readsFields": [
            "Shift.shiftId",
            "Shift.status"
          ],
          "writesFields": [
            "Shift.status",
            "Shift.closedAt",
            "ShiftReport.shiftReportId"
          ],
          "rulesApplied": [
            "shiftClosureRequiresNoOpenOrders"
          ]
        }
      ]
    }
  ]
}
\`\`\`
`;

export const pipeline = [
  {
    "id": "fechamentoTurno__l2_page",
    "type": "l2_page",
    "outputPath": "_102043_/l2/cafeFlow/web/desktop/page11/fechamentoTurno.ts",
    "defPath": "_102043_/l2/cafeFlow/web/desktop/page11/fechamentoTurno.defs.ts",
    "dependsFiles": [
      "_102043_/l2/cafeFlow/web/shared/fechamentoTurno.ts",
      "_102043_/l2/cafeFlow/web/contracts/fechamentoTurno.ts"
    ],
    "dependsOn": [],
    "agent": "agentMaterializeGen"
  }
] as const;
