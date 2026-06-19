/// <mls fileReference="_102043_/l1/cafeFlow/layer_1_external/dailySalesMetrics.ts" enhancement="_blank"/>
import type { TableDefinition } from '/_102034_/l1/server/layer_1_external/persistence/contracts.js';

export const dailySalesMetricsTableDef: TableDefinition = {
  moduleId: 'cafeFlow',
  repositoryName: 'cafeFlowDailySalesMetrics',
  tableName: 'daily_sales_metrics',
  purpose: 'controle',
  description:
    'Vendas diárias. Acompanhar faturamento, quantidade de pedidos e ticket médio por turno e dia para tomada de decisão do gerente.',
  backupHot: false,
  storageProfile: 'postgres',
  writeMode: 'sync',
  columns: [
    {
      name: 'time',
      postgresType: 'TIMESTAMPTZ',
      nullable: false,
      description: 'Timestamp de referência da métrica.',
    },
    {
      name: 'shift_id',
      postgresType: 'UUID',
      nullable: false,
      description: 'Turno em que o pedido foi realizado.',
    },
    {
      name: 'status',
      postgresType: 'TEXT',
      nullable: false,
      description: 'Status do pedido no momento da métrica.',
    },
    {
      name: 'order_item_id',
      postgresType: 'TEXT',
      nullable: false,
      description: 'FK para item de pedido relacionado.',
    },
    {
      name: 'order_status_history_id',
      postgresType: 'TEXT',
      nullable: false,
      description: 'FK para histórico de status do pedido relacionado.',
    },
    {
      name: 'shift_report_id',
      postgresType: 'TEXT',
      nullable: false,
      description: 'FK para relatório de fechamento do turno.',
    },
    {
      name: 'shift_config_id',
      postgresType: 'TEXT',
      nullable: false,
      description: 'FK para configuração de turno utilizada.',
    },
    {
      name: 'total_revenue',
      postgresType: 'NUMERIC',
      nullable: false,
      defaultSql: '0',
      description: 'Receita total dos pedidos.',
    },
    {
      name: 'order_count',
      postgresType: 'INTEGER',
      nullable: false,
      defaultSql: '0',
      description: 'Quantidade de pedidos.',
    },
    {
      name: 'average_ticket',
      postgresType: 'NUMERIC',
      nullable: true,
      description: 'Ticket médio por pedido.',
    },
    {
      name: 'items_sold',
      postgresType: 'INTEGER',
      nullable: false,
      defaultSql: '0',
      description: 'Quantidade total de itens vendidos.',
    },
  ],
  primaryKey: [
    'time',
    'shift_id',
    'status',
    'order_item_id',
    'order_status_history_id',
    'shift_report_id',
    'shift_config_id',
  ],
  indexes: [
    {
      name: 'idx_daily_sales_metrics_time',
      columns: ['time'],
      unique: false,
    },
    {
      name: 'idx_daily_sales_metrics_shift_id_time',
      columns: ['shift_id', 'time'],
      unique: false,
    },
    {
      name: 'idx_daily_sales_metrics_status_time',
      columns: ['status', 'time'],
      unique: false,
    },
    {
      name: 'idx_daily_sales_metrics_order_item_id',
      columns: ['order_item_id'],
      unique: false,
    },
    {
      name: 'idx_daily_sales_metrics_order_status_history_id',
      columns: ['order_status_history_id'],
      unique: false,
    },
    {
      name: 'idx_daily_sales_metrics_shift_report_id',
      columns: ['shift_report_id'],
      unique: false,
    },
    {
      name: 'idx_daily_sales_metrics_shift_config_id',
      columns: ['shift_config_id'],
      unique: false,
    },
  ],
  timescale: {
    hypertable: {
      timeColumn: 'time',
      chunkTimeInterval: '7 days',
    },
  },
  version: 1,
};
