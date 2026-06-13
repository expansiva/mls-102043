/// <mls fileReference="_102043_/l1/cafeFlow/layer_3_usecases/listarSolicitacoesResumoVendas.defs.ts" enhancement="_blank"/>

export const useCase = {
  "usecaseId": "listarSolicitacoesResumoVendas",
  "title": "Listar solicitações de resumo de vendas",
  "purpose": "Consultar solicitações de resumo de vendas registradas.",
  "actor": "gerente",
  "layer": "layer_3_usecases",
  "inputEntities": [
    "resumoVendasEntity"
  ],
  "outputEntities": [
    "resumoVendasEntity"
  ],
  "readsTables": [
    {
      "tableName": "sales_summary_requests",
      "ownership": "moduleOwned"
    }
  ],
  "writesTables": [],
  "rulesApplied": [],
  "entityRefs": [
    "resumoVendasEntity"
  ],
  "commands": [
    {
      "commandId": "listarSolicitacoesResumoVendas",
      "input": [],
      "output": [
        {
          "name": "solicitacoes",
          "type": "resumoVendasEntity[]"
        }
      ]
    }
  ]
} as const;

export default useCase;
