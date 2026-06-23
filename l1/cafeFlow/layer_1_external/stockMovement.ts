/// <mls fileReference="_102043_/l1/cafeFlow/layer_1_external/stockMovement.ts" enhancement="_blank"/>
import type { TableDefinition } from '/_102034_/l1/server/layer_1_external/persistence/contracts.js';

export const stockMovementTableDef: TableDefinition = {
  moduleId: 'cafeFlow',
  repositoryName: 'cafeFlowStockMovements',
  tableName: 'stock_movements',
  purpose: 'transacao',
  description: 'Movimentações de Estoque — Registrar entradas e saídas de estoque ligadas à operação diária.',
  backupHot: false,
  storageProfile: 'postgres',
  writeMode: 'sync',
  columns: [
    {
      name: 'stock_movement_id',
      postgresType: 'UUID',
      nullable: false,
      description: 'Identificador único da movimentação de estoque.',
    },
    {
      name: 'stock_item_id',
      postgresType: 'UUID',
      nullable: false,
      description: 'Item de estoque associado à movimentação.',
    },
    {
      name: 'order_id',
      postgresType: 'UUID',
      nullable: true,
      description: 'Pedido vinculado à saída de estoque, quando aplicável.',
    },
    {
      name: 'movement_type',
      postgresType: 'TEXT',
      nullable: false,
      description: 'Tipo de movimentação realizada.',
    },
    {
      name: 'quantity',
      postgresType: 'NUMERIC',
      nullable: false,
      description: 'Quantidade movimentada do item de estoque.',
    },
    {
      name: 'reason',
      postgresType: 'TEXT',
      nullable: true,
      description: 'Motivo ou observação da movimentação, especialmente para ajustes.',
    },
    {
      name: 'status',
      postgresType: 'TEXT',
      nullable: false,
      defaultSql: "'active'",
      description: 'Status do registro de movimentação.',
    },
    {
      name: 'occurred_at',
      postgresType: 'TIMESTAMPTZ',
      nullable: false,
      description: 'Data e hora em que a movimentação ocorreu.',
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
  primaryKey: ['stock_movement_id'],
  indexes: [
    {
      name: 'idx_stock_movements_stock_item_id',
      columns: ['stock_item_id'],
      unique: false,
    },
    {
      name: 'idx_stock_movements_order_id',
      columns: ['order_id'],
      unique: false,
    },
    {
      name: 'idx_stock_movements_occurred_at',
      columns: ['occurred_at'],
      unique: false,
    },
    {
      name: 'idx_stock_movements_movement_type',
      columns: ['movement_type'],
      unique: false,
    },
  ],
  version: 1,
};
