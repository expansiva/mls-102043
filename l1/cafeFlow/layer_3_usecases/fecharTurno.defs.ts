/// <mls fileReference="_102043_/l1/cafeFlow/layer_3_usecases/fecharTurno.defs.ts" enhancement="_blank"/>

export const useCase = {
  "usecaseId": "fecharTurno",
  "title": "Fechar turno",
  "purpose": "Encerrar o turno e gerar relatório de fechamento.",
  "actor": "gerente",
  "layer": "layer_3_usecases",
  "inputEntities": [
    "turnoEntity",
    "pedidoEntity"
  ],
  "outputEntities": [
    "turnoEntity"
  ],
  "readsTables": [
    {
      "tableName": "shifts",
      "ownership": "moduleOwned"
    },
    {
      "tableName": "orders",
      "ownership": "moduleOwned"
    }
  ],
  "writesTables": [
    {
      "tableName": "shifts",
      "ownership": "moduleOwned"
    },
    {
      "tableName": "shift_reports",
      "ownership": "moduleOwned"
    },
    {
      "tableName": "daily_sales_metrics",
      "ownership": "moduleOwned"
    }
  ],
  "rulesApplied": [
    "shiftClosureRequiresNoOpenOrders"
  ],
  "entityRefs": [
    "metricasEntity",
    "pedidoEntity",
    "turnoEntity"
  ],
  "commands": [
    {
      "commandId": "fecharTurno",
      "input": [
        {
          "name": "turnoId",
          "type": "string",
          "required": true
        }
      ],
      "output": [
        {
          "name": "turnoId",
          "type": "string"
        },
        {
          "name": "status",
          "type": "string"
        }
      ]
    }
  ]
} as const;

export default useCase;

export const pipeline = [
  {
    "id": "fecharTurno__layer_3_usecases",
    "type": "layer_3_usecases",
    "outputPath": "_102043_/l1/cafeFlow/layer_3_usecases/fecharTurno.ts",
    "defPath": "_102043_/l1/cafeFlow/layer_3_usecases/fecharTurno.defs.ts",
    "dependsFiles": [
      "_102043_/l1/cafeFlow/layer_4_entities/metricasEntity.d.ts",
      "_102043_/l1/cafeFlow/layer_4_entities/pedidoEntity.d.ts",
      "_102043_/l1/cafeFlow/layer_4_entities/turnoEntity.d.ts"
    ],
    "dependsOn": [],
    "skills": [
      "_102021_/l2/skills/layer_3.md"
    ],
    "rulesPath": "_102043_/l5/cafeFlow/rules.defs.ts",
    "rulesApplied": [
      "shiftClosureRequiresNoOpenOrders"
    ],
    "agent": "agentMaterializeGen"
  }
] as const;
