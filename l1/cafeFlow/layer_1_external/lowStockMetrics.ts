/// <mls fileReference="_102043_/l1/cafeFlow/layer_1_external/lowStockMetrics.ts" enhancement="_blank"/>
import type { TableDefinition } from '/_102034_/l1/server/layer_1_external/persistence/contracts.js';

export const lowStockMetricsTableDef: TableDefinition = {
  moduleId: 'cafeFlow',
  repositoryName: 'cafeFlowLowStockMetrics',
  tableName: 'low_stock_metrics',
  purpose: 'controle',
  description: 'Estoque baixo. Monitorar a frequência e evolução de alertas de estoque baixo para evitar rupturas.',
  backupHot: false,
  storageProfile: 'postgres',
  writeMode: 'sync',
  columns: [
    {
      name: 'time',
      postgresType: 'TIMESTAMPTZ',
      nullable: false,
      description: 'Momento de referência da métrica de estoque baixo.',
    },
    {
      name: 'stock_item_id',
      postgresType: 'UUID',
      nullable: false,
      description: 'Item de estoque com alerta ou movimentação.',
    },
    {
      name: 'unit_of_measure_id',
      postgresType: 'UUID',
      nullable: false,
      description: 'Unidade de medida do item.',
    },
    {
      name: 'alert_count',
      postgresType: 'INTEGER',
      nullable: false,
      description: 'Número de alertas de estoque baixo.',
    },
    {
      name: 'current_quantity',
      postgresType: 'NUMERIC',
      nullable: false,
      description: 'Quantidade atual em estoque no momento da métrica.',
    },
    {
      name: 'threshold_value',
      postgresType: 'NUMERIC',
      nullable: false,
      description: 'Valor limite configurado para disparo do alerta.',
    },
  ],
  primaryKey: ['time', 'stock_item_id', 'unit_of_measure_id'],
  indexes: [
    {
      name: 'idx_low_stock_metrics_time',
      columns: ['time'],
      unique: false,
    },
    {
      name: 'idx_low_stock_metrics_stock_item_time',
      columns: ['stock_item_id', 'time'],
      unique: false,
    },
    {
      name: 'idx_low_stock_metrics_uom_time',
      columns: ['unit_of_measure_id', 'time'],
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
