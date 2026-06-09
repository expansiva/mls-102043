/// <mls fileReference="_102043_/l1/cafeFlow/layer_1_external/salesSummary.ts" enhancement="_blank" />
import type { TableDefinition } from '/_102034_/l1/server/layer_1_external/persistence/contracts.js';

export const salesSummaryTableDef: TableDefinition = {
moduleId: 'cafeFlow',
repositoryName: 'cafeFlowSalesSummary',
tableName: 'sales_summary',
purpose: 'transacao',
description: 'Armazenar o resumo consolidado do turno para relatório de fechamento e geração de insights.',
backupHot: false,
storageProfile: 'postgres',
writeMode: 'sync',
columns: [
{ name: 'sales_summary_id', postgresType: 'UUID', nullable: false, description: 'Identificador único do resumo de vendas.' },
{ name: 'shift_id', postgresType: 'UUID', nullable: false, description: 'Identificador do turno diário relacionado.' },
{ name: 'status', postgresType: 'TEXT', nullable: false, description: 'Status do resumo do turno (ex.: fechado, reaberto).' },
{ name: 'period_start_at', postgresType: 'TIMESTAMPTZ', nullable: false, description: 'Início do período do turno consolidado.' },
{ name: 'period_end_at', postgresType: 'TIMESTAMPTZ', nullable: false, description: 'Fim do período do turno consolidado.' },
{ name: 'total_orders', postgresType: 'INTEGER', nullable: false, defaultSql: '0', description: 'Quantidade total de pedidos no turno.' },
{ name: 'total_items', postgresType: 'INTEGER', nullable: false, defaultSql: '0', description: 'Quantidade total de itens vendidos no turno.' },
{ name: 'gross_amount', postgresType: 'NUMERIC', nullable: false, defaultSql: '0', description: 'Valor bruto total do turno.' },
{ name: 'discount_amount', postgresType: 'NUMERIC', nullable: false, defaultSql: '0', description: 'Total de descontos aplicados no turno.' },
{ name: 'net_amount', postgresType: 'NUMERIC', nullable: false, defaultSql: '0', description: 'Valor líquido total do turno.' },
{ name: 'created_at', postgresType: 'TIMESTAMPTZ', nullable: false, description: 'Data de criação do resumo.' },
{ name: 'updated_at', postgresType: 'TIMESTAMPTZ', nullable: false, description: 'Data da última atualização do resumo.' },
],
primaryKey: ['sales_summary_id'],
indexes: [
{ name: 'idx_sales_summary_shift', columns: ['shift_id'], unique: true },
{ name: 'idx_sales_summary_period', columns: ['period_start_at', 'period_end_at'] },
{ name: 'idx_sales_summary_status', columns: ['status'] },
],
version: 1,
};
