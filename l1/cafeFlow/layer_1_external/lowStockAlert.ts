/// <mls fileReference="_102043_/l1/cafeFlow/layer_1_external/lowStockAlert.ts" enhancement="_blank"/>
import type { TableDefinition } from '/_102034_/l1/server/layer_1_external/persistence/contracts.js';

export const lowStockAlertTableDef: TableDefinition = {
  moduleId: 'cafeFlow',
  repositoryName: 'cafeFlowLowStockAlerts',
  tableName: 'low_stock_alerts',
  purpose: 'transacao',
  description: 'Alertas de Estoque Baixo. Persistir alertas de estoque baixo para acompanhamento do gerente.',
  backupHot: false,
  storageProfile: 'postgres',
  writeMode: 'sync',
  columns: [
    {
      name: 'low_stock_alert_id',
      postgresType: 'UUID',
      nullable: false,
      description: 'Identificador único do alerta de estoque baixo.',
    },
    {
      name: 'stock_item_id',
      postgresType: 'UUID',
      nullable: false,
      description: 'Item de estoque associado ao alerta.',
    },
    {
      name: 'triggered_at',
      postgresType: 'TIMESTAMPTZ',
      nullable: false,
      description: 'Data e hora em que o alerta foi gerado.',
    },
    {
      name: 'current_quantity',
      postgresType: 'NUMERIC',
      nullable: false,
      description: 'Quantidade atual do item quando o alerta foi gerado.',
    },
    {
      name: 'minimum_quantity',
      postgresType: 'NUMERIC',
      nullable: false,
      description: 'Quantidade mínima configurada para o item.',
    },
    {
      name: 'status',
      postgresType: 'TEXT',
      nullable: false,
      description: 'Situação atual do alerta.',
    },
    {
      name: 'created_at',
      postgresType: 'TIMESTAMPTZ',
      nullable: false,
      description: 'Data e hora de criação do registro.',
    },
    {
      name: 'updated_at',
      postgresType: 'TIMESTAMPTZ',
      nullable: false,
      description: 'Data e hora da última atualização do registro.',
    },
  ],
  primaryKey: ['low_stock_alert_id'],
  indexes: [
    {
      name: 'idx_low_stock_alerts_stock_item_id',
      columns: ['stock_item_id'],
      unique: false,
    },
    {
      name: 'idx_low_stock_alerts_status',
      columns: ['status'],
      unique: false,
    },
    {
      name: 'idx_low_stock_alerts_triggered_at',
      columns: ['triggered_at'],
      unique: false,
    },
    {
      name: 'idx_low_stock_alerts_created_at',
      columns: ['created_at'],
      unique: false,
    },
  ],
  version: 1,
};
