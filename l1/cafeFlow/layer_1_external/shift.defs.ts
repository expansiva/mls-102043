/// <mls fileReference="_102043_/l1/cafeFlow/layer_1_external/shift.defs.ts" enhancement="_blank"/>

export const shiftTableDefinition = {
  "schemaVersion": "2026-06-06",
  "artifactType": "table",
  "artifactId": "shift",
  "moduleName": "cafeFlow",
  "status": "draft",
  "source": {
    "agentName": "agentPlanTableDefinition",
    "stepId": 49,
    "planId": ""
  },
  "data": {
    "tableDefinition": {
      "tableId": "shift",
      "tableName": "shifts",
      "moduleId": "cafeFlow",
      "title": "Turnos",
      "purpose": "Controlar abertura e fechamento de turnos diários.",
      "ownership": "moduleOwned",
      "rootEntity": "Shift",
      "layer": "layer_1_external",
      "tableKind": "transactional",
      "columns": [
        {
          "name": "shift_id",
          "type": "uuid",
          "nullable": false,
          "primaryKey": true,
          "description": "Identificador único do turno."
        },
        {
          "name": "shift_config_id",
          "type": "uuid",
          "nullable": false,
          "description": "Configuração de turno aplicada ao período operacional."
        },
        {
          "name": "status",
          "type": "string",
          "nullable": false,
          "description": "Status atual do turno."
        },
        {
          "name": "opened_at",
          "type": "datetime",
          "nullable": false,
          "description": "Data e hora de abertura do turno."
        },
        {
          "name": "closed_at",
          "type": "datetime",
          "nullable": true,
          "description": "Data e hora de fechamento do turno."
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
        "shift_id"
      ],
      "foreignRefs": [
        {
          "fieldName": "shift_config_id",
          "targetEntity": "ShiftConfig",
          "targetOwnership": "mdmOwned",
          "reason": "Configuração de turno é entidade mestre MDM."
        }
      ],
      "indexes": [
        {
          "indexName": "idx_shifts_status",
          "columns": [
            "status"
          ],
          "reason": "Filtrar turnos por status em dashboard e workflow."
        },
        {
          "indexName": "idx_shifts_opened_at",
          "columns": [
            "opened_at"
          ],
          "reason": "Filtro por data para relatórios e dashboard."
        },
        {
          "indexName": "idx_shifts_shift_config_id",
          "columns": [
            "shift_config_id"
          ],
          "reason": "Lookup por configuração de turno aplicada."
        }
      ],
      "detailsColumn": {
        "enabled": false
      },
      "metricUpdatePolicy": {
        "feedsMetrics": true,
        "metricRefs": [
          "dailySalesMetricTable"
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
        "shiftClosureRequiresNoOpenOrders"
      ]
    },
    "defsPlan": {
      "fileName": "tables/shift.defs.ts",
      "exportName": "shiftTableDefinition",
      "saveAsDefs": true
    }
  }
} as const;

export default shiftTableDefinition;

export const pipeline = [
  {
    "id": "shift__layer_1_external",
    "type": "layer_1_external",
    "outputPath": "_102043_/l1/cafeFlow/layer_1_external/shift.ts",
    "defPath": "_102043_/l1/cafeFlow/layer_1_external/shift.defs.ts",
    "dependsFiles": [],
    "dependsOn": [],
    "agent": "agentMaterializeGen"
  }
] as const;
