/// <mls fileReference="_102043_/l1/cafeFlow/layer_3_usecases/listarSolicitacoesIa.defs.ts" enhancement="_blank"/>

export const useCase = {
  "usecaseId": "listarSolicitacoesIa",
  "title": "Listar solicitações IA",
  "purpose": "Lista histórico de solicitações de insights.",
  "actor": "gerente",
  "layer": "layer_3_usecases",
  "inputEntities": [],
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
