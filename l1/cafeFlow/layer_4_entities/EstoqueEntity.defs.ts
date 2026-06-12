/// <mls fileReference="_102043_/l1/cafeFlow/layer_4_entities/EstoqueEntity.defs.ts" enhancement="_blank"/>

export const entity = {
  "entityId": "EstoqueEntity",
  "title": "Entidade de Estoque",
  "purpose": "Agrega itens de estoque e ajustes, com alertas de estoque baixo e baixa automática.",
  "layer": "layer_4_entities",
  "fields": [
    {
      "fieldId": "inventoryItemId",
      "type": "uuid",
      "required": true,
      "description": "Identificador único do item de estoque."
    },
    {
      "fieldId": "name",
      "type": "string",
      "required": true,
      "description": "Nome do insumo ou item de estoque."
    },
    {
      "fieldId": "quantityAvailable",
      "type": "number",
      "required": true,
      "description": "Quantidade disponível em estoque."
    },
    {
      "fieldId": "minimumLevel",
      "type": "number",
      "required": true,
      "description": "Nível mínimo aceitável para o estoque."
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
  "sourceTables": [
    {
      "tableName": "inventory_item",
      "ownership": "moduleOwned"
    },
    {
      "tableName": "inventory_adjustment",
      "ownership": "moduleOwned"
    },
    {
      "tableName": "low_stock_metrics",
      "ownership": "moduleOwned"
    }
  ],
  "storage": [
    {
      "kind": "moduleTable",
      "tableId": "inventoryItem",
      "tableName": "inventory_item",
      "fileRef": "_102043_/l1/cafeFlow/layer_1_external/inventoryItem.defs.ts"
    },
    {
      "kind": "moduleTable",
      "tableId": "inventoryAdjustment",
      "tableName": "inventory_adjustment",
      "fileRef": "_102043_/l1/cafeFlow/layer_1_external/inventoryAdjustment.defs.ts"
    },
    {
      "kind": "metricTable",
      "metricTableId": "lowStockMetrics",
      "tableName": "low_stock_metrics",
      "fileRef": "_102043_/l1/cafeFlow/layer_1_external/lowStockMetrics.defs.ts"
    }
  ],
  "allowedOperations": [
    "create",
    "read",
    "update",
    "delete",
    "list",
    "search"
  ],
  "rulesApplied": [
    "inventoryLowStockAlert",
    "inventoryDecrementPolicy"
  ],
  "usecaseRefs": [
    "criarIngredienteItemCardapio",
    "listarIngredientesItemCardapio",
    "criarItemEstoque",
    "atualizarItemEstoque",
    "excluirItemEstoque",
    "listarItensEstoque",
    "criarAjusteEstoque",
    "confirmarAjusteEstoque",
    "listarAjustesEstoque",
    "solicitarResumoIa",
    "consultarDashboard"
  ],
  "materialization": {
    "fileName": "layer_4_entities/EstoqueEntity.ts",
    "className": "EstoqueEntity",
    "contractName": "IEstoqueEntity"
  }
} as const;

export default entity;
