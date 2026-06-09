/// <mls fileReference="_102043_/l1/cafeFlow/layer_1_external/topSellingItemsMetrics.ts" enhancement="_blank" />
import type { TableDefinition } from '/_102034_/l1/server/layer_1_external/persistence/contracts.js';

export const topSellingItemsMetricsTableDef: TableDefinition = {
  moduleId: 'cafeFlow',
  repositoryName: 'cafeFlowTopSellingItemsMetrics',
  tableName: 'top_selling_items_metrics',
  purpose: 'controle',
  description: 'Ranking de vendas por item do cardápio para identificar destaques e apoiar sugestões de promoção.',
  backupHot: false,
  storageProfile: 'postgres',
  writeMode: 'sync',
  columns: [
    { name: 'bucket_time', postgresType: 'TIMESTAMPTZ', nullable: false, description: 'Início do bucket temporal de agregação.' },
    { name: 'menu_item_id', postgresType: 'TEXT', nullable: false, description: 'Identificador do item do cardápio.' },
    { name: 'menu_item_name', postgresType: 'TEXT', nullable: false, description: 'Nome do item do cardápio.' },
    { name: 'category', postgresType: 'TEXT', nullable: true, description: 'Categoria do item no cardápio.' },
    { name: 'quantity_sold', postgresType: 'INTEGER', nullable: false, defaultSql: '0', description: 'Quantidade vendida do item no período.' },
    { name: 'revenue', postgresType: 'NUMERIC', nullable: false, defaultSql: '0', description: 'Receita gerada pelo item no período.' },
  ],
  primaryKey: ['bucket_time', 'menu_item_id'],
  indexes: [
    { name: 'idx_top_selling_items_metrics_bucket_time', columns: ['bucket_time'] },
    { name: 'idx_top_selling_items_metrics_menu_item_time', columns: ['menu_item_id', 'bucket_time'] },
    { name: 'idx_top_selling_items_metrics_category_time', columns: ['category', 'bucket_time'] },
  ],
  timescale: {
    hypertable: {
      timeColumn: 'bucket_time',
      chunkTimeInterval: '7 days',
    },
  },
  version: 1,
};
