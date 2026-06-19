/// <mls fileReference="_102043_/l1/cafeFlow/layer_4_entities/metricasEntity.defs.ts" enhancement="_blank"/>

export const entity = {
  "entityId": "metricasEntity",
  "title": "Entidade de caso de uso: Métricas",
  "purpose": "Ler métricas operacionais e atualizar métricas derivadas.",
  "layer": "layer_4_entities",
  "sourceTables": [
    {
      "tableName": "daily_sales_metrics",
      "ownership": "moduleOwned"
    },
    {
      "tableName": "top_selling_items_metrics",
      "ownership": "moduleOwned"
    },
    {
      "tableName": "low_stock_metrics",
      "ownership": "moduleOwned"
    }
  ],
  "storage": [
    {
      "kind": "metricTable",
      "metricTableId": "dailySalesMetrics",
      "tableName": "daily_sales_metrics",
      "fileRef": "_102043_/l1/cafeFlow/layer_1_external/dailySalesMetrics.defs.ts"
    },
    {
      "kind": "metricTable",
      "metricTableId": "topSellingItemsMetrics",
      "tableName": "top_selling_items_metrics",
      "fileRef": "_102043_/l1/cafeFlow/layer_1_external/topSellingItemsMetrics.defs.ts"
    },
    {
      "kind": "metricTable",
      "metricTableId": "lowStockMetrics",
      "tableName": "low_stock_metrics",
      "fileRef": "_102043_/l1/cafeFlow/layer_1_external/lowStockMetrics.defs.ts"
    }
  ],
  "allowedOperations": [
    "read",
    "update"
  ],
  "rulesApplied": [],
  "usecaseRefs": [
    "criarPedido",
    "atualizarStatusPedido",
    "registrarMovimentacaoEstoque",
    "abrirTurno",
    "fecharTurno",
    "consultarDashboardGerente"
  ],
  "materialization": {
    "fileName": "layer_4_entities/MetricasEntity.ts",
    "className": "MetricasEntity",
    "contractName": "IMetricasEntity"
  }
} as const;

export default entity;

export const pipeline = [
  {
    "id": "metricasEntity__layer_4_entities",
    "type": "layer_4_entities",
    "outputPath": "_102043_/l1/cafeFlow/layer_4_entities/metricasEntity.ts",
    "defPath": "_102043_/l1/cafeFlow/layer_4_entities/metricasEntity.defs.ts",
    "dependsFiles": [
      "_102043_/l1/cafeFlow/layer_1_external/dailySalesMetrics.d.ts",
      "_102043_/l1/cafeFlow/layer_1_external/topSellingItemsMetrics.d.ts",
      "_102043_/l1/cafeFlow/layer_1_external/lowStockMetrics.d.ts"
    ],
    "dependsOn": [],
    "agent": "agentMaterializeGen"
  }
] as const;
