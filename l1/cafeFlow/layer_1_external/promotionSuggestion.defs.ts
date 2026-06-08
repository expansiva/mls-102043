/// <mls fileReference="_102043_/l1/cafeFlow/layer_1_external/promotionSuggestion.defs.ts" enhancement="_blank"/>

export const promotionSuggestionTableDefinition = {
  "schemaVersion": "2026-06-06",
  "artifactType": "table",
  "artifactId": "promotionSuggestion",
  "moduleName": "cafeFlow",
  "status": "draft",
  "source": {
    "agentName": "agentPlanTableDefinition",
    "stepId": 44,
    "planId": "plan-table-definition:promotionSuggestion"
  },
  "data": {
    "tableDefinition": {
      "tableId": "promotionSuggestion",
      "tableName": "promotion_suggestion",
      "moduleId": "cafeFlow",
      "title": "Sugestões de promoção",
      "purpose": "Registrar sugestões geradas por IA para itens do cardápio com base no histórico de vendas.",
      "ownership": "moduleOwned",
      "rootEntity": "PromotionSuggestion",
      "layer": "layer_1_external",
      "tableKind": "transactional",
      "columns": [
        {
          "name": "promotion_suggestion_id",
          "type": "uuid",
          "nullable": false,
          "primaryKey": true,
          "description": "Identificador único da sugestão de promoção."
        },
        {
          "name": "menu_item_id",
          "type": "uuid",
          "nullable": false,
          "description": "Item do cardápio sugerido para promoção (MDM)."
        },
        {
          "name": "suggestion_status",
          "type": "text",
          "nullable": false,
          "default": "new",
          "description": "Status da sugestão (ex.: new, reviewed, approved, rejected, expired)."
        },
        {
          "name": "suggested_at",
          "type": "timestamptz",
          "nullable": false,
          "description": "Data e hora em que a sugestão foi gerada."
        },
        {
          "name": "valid_until",
          "type": "timestamptz",
          "nullable": true,
          "description": "Data e hora limite recomendada para a promoção."
        },
        {
          "name": "score",
          "type": "numeric",
          "nullable": true,
          "description": "Pontuação de relevância calculada pelo agente."
        },
        {
          "name": "reason_summary",
          "type": "text",
          "nullable": true,
          "description": "Resumo do motivo da recomendação."
        },
        {
          "name": "created_at",
          "type": "timestamptz",
          "nullable": false,
          "description": "Data de criação do registro."
        },
        {
          "name": "updated_at",
          "type": "timestamptz",
          "nullable": false,
          "description": "Data da última atualização do registro."
        }
      ],
      "primaryKey": [
        "promotion_suggestion_id"
      ],
      "foreignRefs": [
        {
          "fieldName": "menu_item_id",
          "targetEntity": "MenuItem",
          "targetOwnership": "mdmOwned",
          "reason": "Relacionar a sugestão ao item de cardápio mestre."
        }
      ],
      "indexes": [
        {
          "indexName": "idx_promotion_suggestion_menu_item_id",
          "columns": [
            "menu_item_id"
          ],
          "unique": false,
          "reason": "Busca por sugestões por item do cardápio."
        },
        {
          "indexName": "idx_promotion_suggestion_status",
          "columns": [
            "suggestion_status"
          ],
          "unique": false,
          "reason": "Filtrar sugestões por status no fluxo de revisão."
        },
        {
          "indexName": "idx_promotion_suggestion_suggested_at",
          "columns": [
            "suggested_at"
          ],
          "unique": false,
          "reason": "Ordenação e filtros por data de geração."
        },
        {
          "indexName": "idx_promotion_suggestion_valid_until",
          "columns": [
            "valid_until"
          ],
          "unique": false,
          "reason": "Filtro por validade da sugestão."
        }
      ],
      "detailsColumn": {
        "enabled": false
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
      "rulesApplied": []
    },
    "defsPlan": {
      "fileName": "tables/promotionSuggestion.defs.ts",
      "exportName": "promotionSuggestionTableDefinition",
      "saveAsDefs": true
    }
  }
} as const;

export default promotionSuggestionTableDefinition;
