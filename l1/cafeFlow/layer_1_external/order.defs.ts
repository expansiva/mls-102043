/// <mls fileReference="_102043_/l1/cafeFlow/layer_1_external/order.defs.ts" enhancement="_blank"/>

export const orderTableDefinition = {
  "schemaVersion": "2026-06-06",
  "artifactType": "table",
  "artifactId": "order",
  "moduleName": "cafeFlow",
  "status": "draft",
  "source": {
    "agentName": "agentPlanTableDefinition",
    "stepId": 47,
    "planId": ""
  },
  "data": {
    "tableDefinition": {
      "tableId": "order",
      "tableName": "orders",
      "moduleId": "cafeFlow",
      "title": "Pedidos",
      "purpose": "Persistir pedidos do POS com itens para operação e status atual.",
      "ownership": "moduleOwned",
      "rootEntity": "Order",
      "layer": "layer_1_external",
      "tableKind": "transactional",
      "columns": [
        {
          "name": "order_id",
          "type": "uuid",
          "nullable": false,
          "primaryKey": true,
          "description": "Identificador único do pedido."
        },
        {
          "name": "status",
          "type": "text",
          "nullable": false,
          "description": "Status atual do pedido."
        },
        {
          "name": "shift_id",
          "type": "uuid",
          "nullable": false,
          "description": "Turno em que o pedido foi registrado."
        },
        {
          "name": "created_at",
          "type": "timestamptz",
          "nullable": false,
          "description": "Data e hora de criação do pedido."
        },
        {
          "name": "updated_at",
          "type": "timestamptz",
          "nullable": false,
          "description": "Data e hora da última atualização do pedido."
        }
      ],
      "primaryKey": [
        "order_id"
      ],
      "foreignRefs": [
        {
          "fieldName": "shift_id",
          "targetEntity": "Shift",
          "targetOwnership": "mdmOwned",
          "reason": "Pedido pertence a um turno."
        }
      ],
      "indexes": [
        {
          "indexName": "idx_orders_status",
          "columns": [
            "status"
          ],
          "reason": "Filtro rápido por status no painel da cozinha e workflow."
        },
        {
          "indexName": "idx_orders_created_at",
          "columns": [
            "created_at"
          ],
          "reason": "Listagens por data para POS e dashboard."
        },
        {
          "indexName": "idx_orders_shift_id",
          "columns": [
            "shift_id"
          ],
          "reason": "Consulta por turno para fechamento e operações."
        }
      ],
      "detailsColumn": {
        "enabled": true,
        "columnName": "details",
        "reason": "Itens do pedido e dados agregados do OrderItem armazenados como JSON."
      },
      "metricUpdatePolicy": {
        "feedsMetrics": false,
        "updatedByLayer": "layer_3_usecases"
      },
      "accessPolicy": {
        "directAccessAllowedFor": [
          "layer_3_usecases"
        ],
        "forbiddenFor": [
          "pages",
          "layer_2_controllers",
          "agents"
        ]
      },
      "rulesApplied": [
        "orderRequiresItem",
        "orderStatusTransition",
        "shiftClosureRequiresNoOpenOrders"
      ]
    },
    "defsPlan": {
      "fileName": "tables/order.defs.ts",
      "exportName": "orderTableDefinition",
      "saveAsDefs": true
    }
  }
} as const;

export default orderTableDefinition;

export const pipeline = [
  {
    "id": "order__layer_1_external",
    "type": "layer_1_external",
    "outputPath": "_102043_/l1/cafeFlow/layer_1_external/order.ts",
    "defPath": "_102043_/l1/cafeFlow/layer_1_external/order.defs.ts",
    "dependsFiles": [],
    "dependsOn": [],
    "agent": "agentMaterializeGen"
  }
] as const;
