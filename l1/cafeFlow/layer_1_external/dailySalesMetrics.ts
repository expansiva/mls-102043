/// <mls fileReference="_102043_/l1/cafeFlow/layer_1_external/dailySalesMetrics.ts" enhancement="_blank" />
import type { TableDefinition } from '/_102034_/l1/server/layer_1_external/persistence/contracts.js';

export const dailySalesMetricsTableDef: TableDefinition = {
moduleId: 'cafeFlow',
repositoryName: 'cafeFlowDailySalesMetrics',
tableName: 'daily_sales_metrics',
purpose: 'controle',
description: 'Agregação diária e por turno de pedidos, itens e receita para acompanhamento operacional e fechamento.',
backupHot: false,
storageProfile: 'postgres',
writeMode: 'sync',
columns: [
{ name: 'bucket_time', postgresType: 'TIMESTAMPTZ', nullable: false, description: 'Timestamp do bucket de agregação.' },
{ name: 'shift_id', postgresType: 'TEXT', nullable: false, description: 'Identificador do turno diário.' },
{ name: 'order_type', postgresType: 'TEXT', nullable: false, description: 'Tipo do pedido: mesa ou takeout.' },
{ name: 'total_orders', postgresType: 'INTEGER', nullable: false, defaultSql: '0', description: 'Quantidade total de pedidos no período.' },
{ name: 'total_items', postgresType: 'INTEGER', nullable: false, defaultSql: '0', description: 'Quantidade total de itens vendidos no período.' },
{ name: 'gross_amount', postgresType: 'NUMERIC', nullable: false, defaultSql: '0', description: 'Valor bruto total no período.' },
{ name: 'net_amount', postgresType: 'NUMERIC', nullable: false, defaultSql: '0', description: 'Valor líquido total no período.' },
],
primaryKey: ['bucket_time', 'shift_id', 'order_type'],
indexes: [
{ name: 'idx_daily_sales_metrics_bucket_time', columns: ['bucket_time'] },
{ name: 'idx_daily_sales_metrics_shift_time', columns: ['shift_id', 'bucket_time'] },
{ name: 'idx_daily_sales_metrics_order_type_time', columns: ['order_type', 'bucket_time'] },
],
timescale: {
  hypertable: {
    timeColumn: 'bucket_time',
    chunkTimeInterval: '1 day',
  },
},
retentionDays: 365,
version: 1,
};
