/// <mls fileReference="_102043_/l1/cafeFlow/layer_1_external/lowStockMetrics.ts" enhancement="_blank" />
import type { TableDefinition } from '/_102034_/l1/server/layer_1_external/persistence/contracts.js';
export const lowStockMetricsTableDef: TableDefinition = {
moduleId: 'cafeFlow',
repositoryName: 'cafeFlowLowStockMetrics',
tableName: 'low_stock_metrics',
purpose: 'controle',
description: 'Snapshot periódico de ingredientes com quantidade abaixo do nível mínimo para alertas operacionais.',
backupHot: false,
storageProfile: 'postgres',
writeMode: 'sync',
columns: [
{ name: 'checked_at', postgresType: 'TIMESTAMPTZ', nullable: false, description: 'Data e hora da verificação do estoque.' },
{ name: 'ingredient_id', postgresType: 'TEXT', nullable: false, description: 'Identificador do ingrediente.' },
{ name: 'ingredient_name', postgresType: 'TEXT', nullable: false, description: 'Nome do ingrediente.' },
{ name: 'current_quantity', postgresType: 'NUMERIC', nullable: false, description: 'Quantidade disponível no momento da coleta.' },
{ name: 'min_level', postgresType: 'NUMERIC', nullable: false, description: 'Nível mínimo configurado para o ingrediente.' },
{ name: 'shortage', postgresType: 'NUMERIC', nullable: false, description: 'Diferença negativa entre quantidade atual e nível mínimo.' },
],
primaryKey: ['checked_at', 'ingredient_id'],
indexes: [
{ name: 'idx_low_stock_metrics_checked_at', columns: ['checked_at'] },
{ name: 'idx_low_stock_metrics_ingredient_id_checked_at', columns: ['ingredient_id', 'checked_at'] },
{ name: 'idx_low_stock_metrics_ingredient_name_checked_at', columns: ['ingredient_name', 'checked_at'] },
],
timescale: { hypertable: { timeColumn: 'checked_at', chunkTimeInterval: '7 days' } },
retentionDays: 90,
version: 1,
};
