/// <mls fileReference="_102043_/l1/cafeFlow/layer_1_external/shift.ts" enhancement="_blank"/>
import type { TableDefinition } from '/_102034_/l1/server/layer_1_external/persistence/contracts.js';

export const shiftTableDef: TableDefinition = {
  moduleId: 'cafeFlow',
  repositoryName: 'cafeFlowShifts',
  tableName: 'shifts',
  purpose: 'transacao',
  description: 'Turnos - Controlar abertura e fechamento de turnos diários.',
  backupHot: false,
  storageProfile: 'postgres',
  writeMode: 'sync',
  columns: [
    {
      name: 'shift_id',
      postgresType: 'UUID',
      nullable: false,
      description: 'Identificador único do turno.',
    },
    {
      name: 'shift_config_id',
      postgresType: 'UUID',
      nullable: false,
      description: 'Configuração de turno aplicada ao período operacional.',
    },
    {
      name: 'status',
      postgresType: 'TEXT',
      nullable: false,
      description: 'Status atual do turno.',
    },
    {
      name: 'opened_at',
      postgresType: 'TIMESTAMPTZ',
      nullable: false,
      description: 'Data e hora de abertura do turno.',
    },
    {
      name: 'closed_at',
      postgresType: 'TIMESTAMPTZ',
      nullable: true,
      description: 'Data e hora de fechamento do turno.',
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
  primaryKey: ['shift_id'],
  indexes: [
    {
      name: 'idx_shifts_status',
      columns: ['status'],
      unique: false,
    },
    {
      name: 'idx_shifts_opened_at',
      columns: ['opened_at'],
      unique: false,
    },
    {
      name: 'idx_shifts_shift_config_id',
      columns: ['shift_config_id'],
      unique: false,
    },
  ],
  version: 1,
};
