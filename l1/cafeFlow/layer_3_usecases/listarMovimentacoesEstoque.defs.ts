/// <mls fileReference="_102043_/l1/cafeFlow/layer_3_usecases/listarMovimentacoesEstoque.defs.ts" enhancement="_blank"/>

export const useCase = {
  "usecaseId": "listarMovimentacoesEstoque",
  "title": "Listar movimentações de estoque",
  "purpose": "Consultar histórico de movimentações de estoque.",
  "actor": "gerente",
  "layer": "layer_3_usecases",
  "inputEntities": [
    "estoqueEntity"
  ],
  "outputEntities": [
    "estoqueEntity"
  ],
  "readsTables": [
    {
      "tableName": "stock_movements",
      "ownership": "moduleOwned"
    }
  ],
  "writesTables": [],
  "rulesApplied": [],
  "entityRefs": [
    "estoqueEntity"
  ],
  "commands": [
    {
      "commandId": "listarMovimentacoesEstoque",
      "input": [],
      "output": [
        {
          "name": "movimentacoes",
          "type": "estoqueEntity[]"
        }
      ]
    }
  ],
  "pendingQuestions": [
    "Quais filtros de entrada são obrigatórios ou opcionais para listar movimentações (por exemplo, estoqueId, período, produto, depósito)?",
    "Quais campos devem compor cada item retornado em uma movimentação de estoque?"
  ]
} as const;

export default useCase;

