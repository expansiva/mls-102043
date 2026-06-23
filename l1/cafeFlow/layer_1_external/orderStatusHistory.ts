/// <mls fileReference="_102043_/l1/cafeFlow/layer_1_external/orderStatusHistory.ts" enhancement="_blank" />
import type { TableDefinition } from '/_102034_/l1/server/layer_1_external/persistence/contracts.js';

export const orderStatusHistoryTableDef: TableDefinition = {
  moduleId: 'cafeFlow',
  repositoryName: 'cafeFlowOrderStatusHistory',
  tableName: 'order_status_history',
  purpose: 'transacao',
  description:
    'Histórico de Status do Pedido. Registrar transições de status do pedido para auditoria e acompanhamento de cozinha.',
  backupHot: false,
  storageProfile: 'postgres',
  writeMode: 'sync',
  columns: [
    {
      name: 'order_status_history_id',
      postgresType: 'UUID',
      nullable: false,
      description: 'Identificador único do histórico de status do pedido.',
    },
    {
      name: 'order_id',
      postgresType: 'UUID',
      nullable: false,
      description: 'Referência ao pedido relacionado a este registro de status.',
    },
    {
      name: 'from_status',
      postgresType: 'TEXT',
      nullable: false,
      description: 'Status anterior do pedido antes da transição.',
    },
    {
      name: 'to_status',
      postgresType: 'TEXT',
      nullable: false,
      description: 'Novo status do pedido após a transição.',
    },
    {
      name: 'changed_at',
      postgresType: 'TIMESTAMPTZ',
      nullable: false,
      description: 'Data e hora em que a transição de status ocorreu.',
    },
    {
      name: 'changed_by',
      postgresType: 'TEXT',
      nullable: true,
      description: 'Identificador ou nome do colaborador que efetuou a mudança de status.',
    },
    {
      name: 'note',
      postgresType: 'TEXT',
      nullable: true,
      description: 'Observação sobre a mudança de status, se aplicável.',
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
  primaryKey: ['order_status_history_id'],
  indexes: [
    {
      name: 'idx_order_status_history_order_id_changed_at',
      columns: ['order_id', 'changed_at'],
      unique: false,
    },
    {
      name: 'idx_order_status_history_changed_at',
      columns: ['changed_at'],
      unique: false,
    },
    {
      name: 'idx_order_status_history_to_status',
      columns: ['to_status'],
      unique: false,
    },
  ],
  version: 1,
};
