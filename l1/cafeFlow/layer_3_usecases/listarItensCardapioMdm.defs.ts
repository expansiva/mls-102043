/// <mls fileReference="_102043_/l1/cafeFlow/layer_3_usecases/listarItensCardapioMdm.defs.ts" enhancement="_blank"/>

export const useCase = {
  "usecaseId": "listarItensCardapioMdm",
  "title": "Listar itens do cardápio MDM",
  "purpose": "Consulta os itens do cardápio mantidos no MDM.",
  "actor": "gerente",
  "layer": "layer_3_usecases",
  "inputEntities": [],
  "outputEntities": [
    "CardapioEntity"
  ],
  "readsTables": [
    {
      "tableName": "menu_item",
      "ownership": "mdmOwned"
    }
  ],
  "writesTables": [],
  "rulesApplied": [],
  "entityRefs": [
    "CardapioEntity"
  ]
} as const;

export default useCase;
