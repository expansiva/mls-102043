/// <mls fileReference="_102043_/l1/cafeFlow/layer_1_external/shiftReport.ts" enhancement="_blank"/>
import type { TableDefinition } from '/_102034_/l1/server/layer_1_external/persistence/contracts.js';

export const shiftReportTableDef: TableDefinition = {
  moduleId: 'cafeFlow',
  repositoryName: 'cafeFlowShiftReports',
  tableName: 'shift_reports',
  purpose: 'transacao',
  description: 'Relatórios de Fechamento de Turno. Armazenar resumo do fechamento do turno para consulta gerencial.',
  backupHot: false,
  storageProfile: 'postgres',
  writeMode: 'sync',
  columns: [
    {
      name: 'shift_report_id',
      postgresType: 'UUID',
      nullable: false,
      description: 'Identificador único do relatório de fechamento de turno.'
    },
    {
      name: 'shift_id',
      postgresType: 'UUID',
      nullable: false,
      description: 'Referência ao turno consolidado por este relatório.'
    },
    {
      name: 'report_status',
      postgresType: 'TEXT',
      nullable: false,
      defaultSql: "'gerado'",
      description: 'Status do relatório de fechamento do turno.'
    },
    {
      name: 'total_sales_amount',
      postgresType: 'NUMERIC',
      nullable: false,
      description: 'Total de vendas consolidadas no turno.'
    },
    {
      name: 'total_orders',
      postgresType: 'INTEGER',
      nullable: false,
      description: 'Quantidade total de pedidos no turno.'
    },
    {
      name: 'total_items',
      postgresType: 'INTEGER',
      nullable: true,
      description: 'Quantidade total de itens vendidos no turno.'
    },
    {
      name: 'shift_opened_at',
      postgresType: 'TIMESTAMPTZ',
      nullable: false,
      description: 'Data e hora de abertura do turno reportado.'
    },
    {
      name: 'shift_closed_at',
      postgresType: 'TIMESTAMPTZ',
      nullable: true,
      description: 'Data e hora de fechamento do turno reportado.'
    },
    {
      name: 'notes',
      postgresType: 'TEXT',
      nullable: true,
      description: 'Observações adicionais do fechamento do turno.'
    },
    {
      name: 'created_at',
      postgresType: 'TIMESTAMPTZ',
      nullable: false,
      description: 'Data e hora de criação do relatório.'
    },
    {
      name: 'updated_at',
      postgresType: 'TIMESTAMPTZ',
      nullable: false,
      description: 'Data e hora da última atualização do relatório.'
    },
    {
      name: 'details',
      postgresType: 'JSONB',
      nullable: true,
      description: 'Armazenar quebras consolidadas (formas de pagamento, categorias, descontos) sem necessidade de colunas próprias.'
    }
  ],
  primaryKey: ['shift_report_id'],
  indexes: [
    {
      name: 'idx_shift_reports_shift_id_unique',
      columns: ['shift_id'],
      unique: true
    },
    {
      name: 'idx_shift_reports_created_at',
      columns: ['created_at'],
      unique: false
    },
    {
      name: 'idx_shift_reports_shift_closed_at',
      columns: ['shift_closed_at'],
      unique: false
    }
  ],
  version: 1
};
