/// <mls fileReference="_102043_/l1/cafeFlow/layer_4_entities/resumoVendasEntity.defs.ts" enhancement="_blank"/>

export const entity = {
  "entityId": "resumoVendasEntity",
  "title": "Entidade de caso de uso: Resumo de vendas",
  "purpose": "Registrar solicitações de resumo de vendas do dia.",
  "layer": "layer_4_entities",
  "fields": [
    {
      "fieldId": "salesSummaryRequestId",
      "type": "uuid",
      "required": true,
      "description": "Identificador único da solicitação de resumo de vendas."
    },
    {
      "fieldId": "shiftReportId",
      "type": "ShiftReport",
      "required": true,
      "description": "Referência à consolidação de vendas usada na solicitação."
    },
    {
      "fieldId": "createdAt",
      "type": "datetime",
      "required": true,
      "description": "Data e hora de criação da solicitação."
    },
    {
      "fieldId": "updatedAt",
      "type": "datetime",
      "required": true,
      "description": "Data e hora da última atualização da solicitação."
    }
  ],
  "sourceTables": [
    {
      "tableName": "sales_summary_requests",
      "ownership": "moduleOwned"
    }
  ],
  "storage": [
    {
      "kind": "moduleTable",
      "tableId": "salesSummaryRequest",
      "tableName": "sales_summary_requests",
      "fileRef": "_102043_/l1/cafeFlow/layer_1_external/salesSummaryRequest.defs.ts"
    }
  ],
  "allowedOperations": [
    "create",
    "read",
    "list"
  ],
  "rulesApplied": [
    "salesSummaryUsesLast7Days"
  ],
  "usecaseRefs": [
    "solicitarResumoVendasDia",
    "listarSolicitacoesResumoVendas"
  ],
  "materialization": {
    "fileName": "layer_4_entities/ResumoVendasEntity.ts",
    "className": "ResumoVendasEntity",
    "contractName": "IResumoVendasEntity"
  }
} as const;

export default entity;
