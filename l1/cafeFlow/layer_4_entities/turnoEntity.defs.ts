/// <mls fileReference="_102043_/l1/cafeFlow/layer_4_entities/turnoEntity.defs.ts" enhancement="_blank"/>

export const entity = {
  "entityId": "turnoEntity",
  "title": "Entidade de caso de uso: Turno",
  "purpose": "Gerenciar turnos diários e relatórios de fechamento.",
  "layer": "layer_4_entities",
  "fields": [
    {
      "fieldId": "shiftId",
      "type": "uuid",
      "required": true,
      "description": "Identificador único do turno."
    },
    {
      "fieldId": "shiftConfigId",
      "type": "ShiftConfig",
      "required": true,
      "description": "Configuração de turno aplicada ao período operacional."
    },
    {
      "fieldId": "status",
      "type": "string",
      "required": true,
      "description": "Status atual do turno.",
      "enum": [
        "aberto",
        "emFechamento",
        "fechado"
      ]
    },
    {
      "fieldId": "openedAt",
      "type": "datetime",
      "required": true,
      "description": "Data e hora de abertura do turno."
    },
    {
      "fieldId": "closedAt",
      "type": "datetime",
      "required": false,
      "description": "Data e hora de fechamento do turno."
    },
    {
      "fieldId": "createdAt",
      "type": "datetime",
      "required": true,
      "description": "Data e hora de criação do registro."
    },
    {
      "fieldId": "updatedAt",
      "type": "datetime",
      "required": true,
      "description": "Data e hora da última atualização do registro."
    }
  ],
  "statusEnum": [
    "aberto",
    "emFechamento",
    "fechado"
  ],
  "sourceTables": [
    {
      "tableName": "shifts",
      "ownership": "moduleOwned"
    },
    {
      "tableName": "shift_reports",
      "ownership": "moduleOwned"
    },
    {
      "tableName": "ShiftConfig",
      "ownership": "mdmOwned"
    }
  ],
  "storage": [
    {
      "kind": "moduleTable",
      "tableId": "shift",
      "tableName": "shifts",
      "fileRef": "_102043_/l1/cafeFlow/layer_1_external/shift.defs.ts"
    },
    {
      "kind": "moduleTable",
      "tableId": "shiftReport",
      "tableName": "shift_reports",
      "fileRef": "_102043_/l1/cafeFlow/layer_1_external/shiftReport.defs.ts"
    },
    {
      "kind": "mdm",
      "moduleRef": "102034",
      "entity": "ShiftConfig",
      "domainId": "shiftConfig",
      "sourceOfTruth": "102034",
      "governanceRules": [
        "Apenas o ator gerente pode alterar configurações de turno.",
        "Configurações de turno não podem ser removidas se houver turnos históricos vinculados."
      ]
    }
  ],
  "allowedOperations": [
    "create",
    "update",
    "read",
    "list"
  ],
  "rulesApplied": [
    "shiftClosureRequiresNoOpenOrders"
  ],
  "usecaseRefs": [
    "abrirTurno",
    "fecharTurno",
    "listarTurnos",
    "obterRelatorioTurno"
  ],
  "materialization": {
    "fileName": "layer_4_entities/TurnoEntity.ts",
    "className": "TurnoEntity",
    "contractName": "ITurnoEntity"
  }
} as const;

export default entity;

export const pipeline = [
  {
    "id": "turnoEntity__layer_4_entities",
    "type": "layer_4_entities",
    "outputPath": "_102043_/l1/cafeFlow/layer_4_entities/turnoEntity.ts",
    "defPath": "_102043_/l1/cafeFlow/layer_4_entities/turnoEntity.defs.ts",
    "dependsFiles": [
      "_102043_/l1/cafeFlow/layer_1_external/shift.d.ts",
      "_102043_/l1/cafeFlow/layer_1_external/shiftReport.d.ts"
    ],
    "dependsOn": [],
    "skills": [
      "_102021_/l2/skills/layer_4.md",
      "_102034_.d.ts"
    ],
    "rulesPath": "_102043_/l5/cafeFlow/rules.defs.ts",
    "rulesApplied": [
      "shiftClosureRequiresNoOpenOrders"
    ],
    "agent": "agentMaterializeGen"
  }
] as const;
