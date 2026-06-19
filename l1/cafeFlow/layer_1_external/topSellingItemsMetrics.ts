/// <mls fileReference="_102043_/l1/cafeFlow/layer_1_external/topSellingItemsMetrics.ts" enhancement="_blank"/>
import type { TableDefinition } from '/_102034_/l1/server/layer_1_external/persistence/contracts.js';

export const topSellingItemsMetricsTableDef: TableDefinition = {
  moduleId: 'cafeFlow',
  repositoryName: 'cafeFlowTopSellingItemsMetrics',
  tableName: 'top_selling_items_metrics',
  purpose: 'controle',
  description: 'Itens mais vendidos. Identificar os produtos com maior saída e receita para otimização de cardápio e compras.',
  backupHot: false,
  storageProfile: 'postgres',
  writeMode: 'sync',
  columns: [
    {
      name: 'time',
      postgresType: 'TIMESTAMPTZ',
      nullable: false,
      description: 'Timestamp da métrica agregada.',
    },
    {
      name: 'order_id',
      postgresType: 'UUID',
      nullable: false,
      description: 'Pedido de origem do item',
    },
    {
      name: 'menu_item_id',
      postgresType: 'UUID',
      nullable: false,
      description: 'Item do cardápio vendido',
    },
    {
      name: 'menu_category_id',
      postgresType: 'UUID',
      nullable: false,
      description: 'Categoria do item no cardápio',
    },
    {
      name: 'shift_id',
      postgresType: 'UUID',
      nullable: false,
      description: 'Turno em que o item foi vendido',
    },
    {
      name: 'stock_item_id',
      postgresType: 'TEXT',
      nullable: true,
      description: 'FK dimension derived from ontology relationship menuItemUsesStockItem (MenuItem -> StockItem)',
    },
    {
      name: 'order_item_id',
      postgresType: 'TEXT',
      nullable: true,
      description: 'FK dimension derived from ontology relationship orderHasItems (Order -> OrderItem)',
    },
    {
      name: 'order_status_history_id',
      postgresType: 'TEXT',
      nullable: true,
      description: 'FK dimension derived from ontology relationship orderHasStatusHistory (Order -> OrderStatusHistory)',
    },
    {
      name: 'shift_report_id',
      postgresType: 'TEXT',
      nullable: true,
      description: 'FK dimension derived from ontology relationship shiftHasReport (Shift -> ShiftReport)',
    },
    {
      name: 'shift_config_id',
      postgresType: 'TEXT',
      nullable: true,
      description: 'FK dimension derived from ontology relationship shiftUsesConfig (Shift -> ShiftConfig)',
    },
    {
      name: 'quantity_sold',
      postgresType: 'INTEGER',
      nullable: false,
      defaultSql: '0',
      description: 'Quantidade vendida do item',
    },
    {
      name: 'item_revenue',
      postgresType: 'NUMERIC',
      nullable: false,
      defaultSql: '0',
      description: 'Receita gerada pelo item',
    },
    {
      name: 'order_count',
      postgresType: 'INTEGER',
      nullable: false,
      defaultSql: '0',
      description: 'Número de pedidos contendo o item',
    },
  ],
  primaryKey: ['time', 'order_id', 'menu_item_id', 'menu_category_id', 'shift_id'],
  indexes: [
    {
      name: 'idx_top_selling_items_metrics_time',
      columns: ['time'],
      unique: false,
    },
    {
      name: 'idx_top_selling_items_metrics_time_menu_item',
      columns: ['time', 'menu_item_id'],
      unique: false,
    },
    {
      name: 'idx_top_selling_items_metrics_time_menu_category',
      columns: ['time', 'menu_category_id'],
      unique: false,
    },
    {
      name: 'idx_top_selling_items_metrics_time_shift',
      columns: ['time', 'shift_id'],
      unique: false,
    },
    {
      name: 'idx_top_selling_items_metrics_time_order',
      columns: ['time', 'order_id'],
      unique: false,
    },
    {
      name: 'idx_top_selling_items_metrics_stock_item',
      columns: ['stock_item_id'],
      unique: false,
    },
    {
      name: 'idx_top_selling_items_metrics_order_item',
      columns: ['order_item_id'],
      unique: false,
    },
    {
      name: 'idx_top_selling_items_metrics_order_status_history',
      columns: ['order_status_history_id'],
      unique: false,
    },
    {
      name: 'idx_top_selling_items_metrics_shift_report',
      columns: ['shift_report_id'],
      unique: false,
    },
    {
      name: 'idx_top_selling_items_metrics_shift_config',
      columns: ['shift_config_id'],
      unique: false,
    },
  ],
  timescale: {
    hypertable: {
      timeColumn: 'time',
      chunkTimeInterval: '1 day',
    },
  },
  version: 1,
};
