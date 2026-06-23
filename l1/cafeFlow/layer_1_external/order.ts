/// <mls fileReference="_102043_/l1/cafeFlow/layer_1_external/order.ts" enhancement="_blank"/>
import type { TableDefinition } from '/_102034_/l1/server/layer_1_external/persistence/contracts.js';

export const orderTableDef: TableDefinition = {
  moduleId: 'cafeFlow',
  repositoryName: 'cafeFlowOrders',
  tableName: 'orders',
  purpose: 'transacao',
  description: 'Persistir pedidos do POS com itens para operação e status atual.',
  backupHot: false,
  storageProfile: 'postgres',
  writeMode: 'sync',
  columns: [
    {
      name: 'order_id',
      postgresType: 'UUID',
      nullable: false,
      description: 'Identificador único do pedido.',
    },
    {
      name: 'status',
      postgresType: 'TEXT',
      nullable: false,
      description: 'Status atual do pedido.',
    },
    {
      name: 'shift_id',
      postgresType: 'UUID',
      nullable: false,
      description: 'Turno em que o pedido foi registrado.',
    },
    {
      name: 'created_at',
      postgresType: 'TIMESTAMPTZ',
      nullable: false,
      description: 'Data e hora de criação do pedido.',
    },
    {
      name: 'updated_at',
      postgresType: 'TIMESTAMPTZ',
      nullable: false,
      description: 'Data e hora da última atualização do pedido.',
    },
    {
      name: 'details',
      postgresType: 'JSONB',
      nullable: true,
      description: 'Itens do pedido e dados agregados do OrderItem armazenados como JSON.',
    },
  ],
  primaryKey: ['order_id'],
  indexes: [
    {
      name: 'idx_orders_status',
      columns: ['status'],
      unique: false,
    },
    {
      name: 'idx_orders_created_at',
      columns: ['created_at'],
      unique: false,
    },
    {
      name: 'idx_orders_shift_id',
      columns: ['shift_id'],
      unique: false,
    },
  ],
  version: 1,
};
