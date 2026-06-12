/// <mls fileReference="_102043_/l2/cafeFlow/ontology/InventoryAdjustmentUsecase.defs.ts" enhancement="_blank"/>

export const InventoryAdjustmentUsecaseEntityDefinition = {
  "schemaVersion": "2026-06-06",
  "artifactType": "ontologyEntity",
  "artifactId": "InventoryAdjustmentUsecase",
  "moduleName": "cafeFlow",
  "status": "incomplete",
  "source": {
    "agentName": "agentPlanEntityDefinition",
    "stepId": 39,
    "planId": ""
  },
  "data": {
    "entityDefinition": {
      "entityId": "InventoryAdjustmentUsecase",
      "title": "Ajuste de Estoque (Caso de Uso)",
      "description": "Entidade operacional para comandos de ajuste/baixa de estoque.",
      "ownership": "moduleOwned",
      "fields": [
        {
          "fieldId": "inventoryAdjustmentUsecaseId",
          "type": "uuid",
          "required": true,
          "description": "Identificador do caso de uso de ajuste de estoque."
        },
        {
          "fieldId": "commandType",
          "type": "string",
          "required": true,
          "description": "Tipo de comando de estoque executado (ajuste ou baixa).",
          "enum": [
            "ajuste",
            "baixa"
          ]
        }
      ],
      "rulesApplied": [
        "inventoryDecrementPolicy"
      ]
    },
    "pendingQuestions": [
      "Quais são todos os atributos obrigatórios deste caso de uso (ex.: motivo, quantidade, item-alvo, origem do comando, usuário responsável)?",
      "Este caso de uso é persistido? Se sim, devo incluir createdAt/updatedAt?",
      "Há estados/lifecycle (ex.: rascunho, validado, executado, cancelado) para este caso de uso?",
      "Existem relações obrigatórias com outras entidades (ex.: InventoryAdjustment, InventoryItem, Order, DailyShift) que devem virar campos de referência?"
    ]
  }
} as const;

export default InventoryAdjustmentUsecaseEntityDefinition;
