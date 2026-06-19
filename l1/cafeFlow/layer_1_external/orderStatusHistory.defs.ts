/// <mls fileReference="_102043_/l1/cafeFlow/layer_1_external/orderStatusHistory.defs.ts" enhancement="_blank"/>

export const orderStatusHistoryTableDefinition = {
  "schemaVersion": "2026-06-06",
  "artifactType": "table",
  "artifactId": "orderStatusHistory",
  "moduleName": "cafeFlow",
  "status": "draft",
  "source": {
    "agentName": "agentPlanTableDefinition",
    "stepId": 48,
    "planId": ""
  },
  "data": {
    "tableDefinition": {
      "tableId": "orderStatusHistory",
      "tableName": "order_status_history",
      "moduleId": "cafeFlow",
      "title": "Histórico de Status do Pedido",
      "purpose": "Registrar transições de status do pedido para auditoria e acompanhamento de cozinha.",
      "ownership": "moduleOwned",
      "rootEntity": "OrderStatusHistory",
      "layer": "layer_1_external",
      "tableKind": "transactional",
      "columns": [
        {
          "name": "order_status_history_id",
          "type": "uuid",
          "nullable": false,
          "primaryKey": true,
          "description": "Identificador único do histórico de status do pedido."
        },
        {
          "name": "order_id",
          "type": "uuid",
          "nullable": false,
          "description": "Referência ao pedido relacionado a este registro de status."
        },
        {
          "name": "from_status",
          "type": "string",
          "nullable": false,
          "description": "Status anterior do pedido antes da transição."
        },
        {
          "name": "to_status",
          "type": "string",
          "nullable": false,
          "description": "Novo status do pedido após a transição."
        },
        {
          "name": "changed_at",
          "type": "datetime",
          "nullable": false,
          "description": "Data e hora em que a transição de status ocorreu."
        },
        {
          "name": "changed_by",
          "type": "string",
          "nullable": true,
          "description": "Identificador ou nome do colaborador que efetuou a mudança de status."
        },
        {
          "name": "note",
          "type": "text",
          "nullable": true,
          "description": "Observação sobre a mudança de status, se aplicável."
        },
        {
          "name": "created_at",
          "type": "datetime",
          "nullable": false,
          "description": "Data e hora de criação do registro."
        },
        {
          "name": "updated_at",
          "type": "datetime",
          "nullable": false,
          "description": "Data e hora da última atualização do registro."
        }
      ],
      "primaryKey": [
        "order_status_history_id"
      ],
      "foreignRefs": [
        {
          "fieldName": "order_id",
          "targetEntity": "Order",
          "targetOwnership": "moduleOwned",
          "reason": "Histórico vinculado ao pedido para rastreio de transições."
        }
      ],
      "indexes": [
        {
          "indexName": "idx_order_status_history_order_id_changed_at",
          "columns": [
            "order_id",
            "changed_at"
          ],
          "unique": false,
          "reason": "Consulta do histórico por pedido e linha do tempo no painel e workflow."
        },
        {
          "indexName": "idx_order_status_history_changed_at",
          "columns": [
            "changed_at"
          ],
          "unique": false,
          "reason": "Ordenação e filtros por período para auditoria."
        },
        {
          "indexName": "idx_order_status_history_to_status",
          "columns": [
            "to_status"
          ],
          "unique": false,
          "reason": "Filtrar transições por status no painel de cozinha."
        }
      ],
      "detailsColumn": {
        "enabled": false
      },
      "metricUpdatePolicy": {
        "feedsMetrics": true,
        "metricRefs": [
          "orderStatusTransitions"
        ],
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
        "orderStatusTransition"
      ]
    },
    "defsPlan": {
      "fileName": "tables/orderStatusHistory.defs.ts",
      "exportName": "orderStatusHistoryTableDefinition",
      "saveAsDefs": true
    }
  }
} as const;

export default orderStatusHistoryTableDefinition;

export const pipeline = [
  {
    "id": "orderStatusHistory__layer_1_external",
    "type": "layer_1_external",
    "outputPath": "_102043_/l1/cafeFlow/layer_1_external/orderStatusHistory.ts",
    "defPath": "_102043_/l1/cafeFlow/layer_1_external/orderStatusHistory.defs.ts",
    "dependsFiles": [],
    "dependsOn": [],
    "agent": "agentMaterializeGen"
  }
] as const;
