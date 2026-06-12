/// <mls fileReference="_102043_/l1/cafeFlow/layer_3_usecases/obterSolicitacaoIa.defs.ts" enhancement="_blank"/>

export const useCase = {
  "usecaseId": "obterSolicitacaoIa",
  "title": "Obter solicitação IA",
  "purpose": "Retorna detalhes de uma solicitação de insight.",
  "actor": "gerente",
  "layer": "layer_3_usecases",
  "inputEntities": [
    "AiInsightEntity"
  ],
  "outputEntities": [
    "AiInsightEntity"
  ],
  "readsTables": [
    {
      "tableName": "ai_insight_request",
      "ownership": "moduleOwned"
    }
  ],
  "writesTables": [],
  "rulesApplied": [],
  "entityRefs": [
    "AiInsightEntity"
  ]
} as const;

export default useCase;
