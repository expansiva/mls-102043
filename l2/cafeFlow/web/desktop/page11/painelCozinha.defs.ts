/// <mls fileReference="_102043_/l2/cafeFlow/web/desktop/page11/painelCozinha.defs.ts" enhancement="_blank"/>

export const definition = `
## Definition
\`\`\`JSON
{
  "sections": [
    {
      "sectionName": "Fila de pedidos",
      "mode": "list",
      "organisms": [
        {
          "organismName": "ListaDePedidosCozinha",
          "purpose": "Exibir pedidos recebidos para preparo com status atual e horário.",
          "userActions": [
            "selecionarPedido",
            "iniciarPreparo",
            "finalizarPreparo",
            "cancelarPedido"
          ],
          "requiredEntities": [
            "Order"
          ],
          "readsFields": [
            "Order.orderId",
            "Order.status",
            "Order.createdAt",
            "Order.shiftId"
          ],
          "writesFields": [],
          "rulesApplied": [
            "orderStatusTransition"
          ]
        }
      ]
    },
    {
      "sectionName": "Detalhe e atualização de status",
      "mode": "detail",
      "organisms": [
        {
          "organismName": "AtualizarStatusPedido",
          "purpose": "Atualizar status do pedido selecionado conforme o fluxo de preparo.",
          "userActions": [
            "iniciarPreparo",
            "finalizarPreparo",
            "cancelarPedido"
          ],
          "requiredEntities": [
            "Order",
            "OrderStatusHistory"
          ],
          "readsFields": [
            "Order.orderId",
            "Order.status",
            "Order.updatedAt"
          ],
          "writesFields": [
            "Order.status",
            "Order.updatedAt",
            "OrderStatusHistory.fromStatus",
            "OrderStatusHistory.toStatus",
            "OrderStatusHistory.changedAt",
            "OrderStatusHistory.changedBy"
          ],
          "rulesApplied": [
            "orderStatusTransition"
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
    "id": "painelCozinha__l2_page",
    "type": "l2_page",
    "outputPath": "_102043_/l2/cafeFlow/web/desktop/page11/painelCozinha.ts",
    "defPath": "_102043_/l2/cafeFlow/web/desktop/page11/painelCozinha.defs.ts",
    "dependsFiles": [
      "_102043_/l2/cafeFlow/web/shared/painelCozinha.ts",
      "_102043_/l2/cafeFlow/web/contracts/painelCozinha.ts"
    ],
    "dependsOn": [],
    "agent": "agentMaterializeGen"
  }
] as const;
