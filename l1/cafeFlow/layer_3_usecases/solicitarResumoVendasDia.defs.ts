/// <mls fileReference="_102043_/l1/cafeFlow/layer_3_usecases/solicitarResumoVendasDia.defs.ts" enhancement="_blank"/>

export const useCase = {
  "usecaseId": "solicitarResumoVendasDia",
  "title": "Solicitar resumo de vendas do dia",
  "purpose": "Registrar solicitação de resumo de vendas para o assistente IA.",
  "actor": "gerente",
  "layer": "layer_3_usecases",
  "inputEntities": [
    "resumoVendasEntity"
  ],
  "outputEntities": [
    "resumoVendasEntity"
  ],
  "readsTables": [],
  "writesTables": [
    {
      "tableName": "sales_summary_requests",
      "ownership": "moduleOwned"
    }
  ],
  "rulesApplied": [
    "salesSummaryUsesLast7Days"
  ],
  "entityRefs": [
    "resumoVendasEntity"
  ],
  "commands": [
    {
      "commandId": "solicitarResumoVendasDia",
      "input": [
        {
          "name": "resumoVendas",
          "type": "resumoVendasEntity",
          "required": true
        }
      ],
      "output": [
        {
          "name": "resumoVendas",
          "type": "resumoVendasEntity"
        }
      ]
    }
  ]
} as const;

export default useCase;

export const pipeline = [
  {
    "id": "solicitarResumoVendasDia__layer_3_usecases",
    "type": "layer_3_usecases",
    "outputPath": "_102043_/l1/cafeFlow/layer_3_usecases/solicitarResumoVendasDia.ts",
    "defPath": "_102043_/l1/cafeFlow/layer_3_usecases/solicitarResumoVendasDia.defs.ts",
    "dependsFiles": [
      "_102043_/l1/cafeFlow/layer_4_entities/resumoVendasEntity.d.ts"
    ],
    "dependsOn": [],
    "rulesApplied": [
      "salesSummaryUsesLast7Days"
    ],
    "agent": "agentMaterializeGen"
  }
] as const;
