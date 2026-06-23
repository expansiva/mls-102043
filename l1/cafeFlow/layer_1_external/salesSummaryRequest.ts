/// <mls fileReference="_102043_/l1/cafeFlow/layer_1_external/salesSummaryRequest.ts" enhancement="_blank"/>
import type { TableDefinition } from '/_102034_/l1/server/layer_1_external/persistence/contracts.js';

export const salesSummaryRequestTableDef: TableDefinition = {
  moduleId: 'cafeFlow',
  repositoryName: 'cafeFlowSalesSummaryRequests',
  tableName: 'sales_summary_requests',
  purpose: 'transacao',
  description: 'Solicitações de Resumo de Vendas - Rastrear solicitações de resumo de vendas para o assistente IA.',
  backupHot: false,
  storageProfile: 'postgres',
  writeMode: 'sync',
  columns: [
    {
      name: 'sales_summary_request_id',
      postgresType: 'UUID',
      nullable: false,
      description: 'Identificador único da solicitação de resumo de vendas.',
    },
    {
      name: 'shift_report_id',
      postgresType: 'UUID',
      nullable: false,
      description: 'Referência à consolidação de vendas usada na solicitação.',
    },
    {
      name: 'request_status',
      postgresType: 'TEXT',
      nullable: false,
      defaultSql: "'pending'",
      description: 'Status da solicitação de resumo de vendas.',
    },
    {
      name: 'created_at',
      postgresType: 'TIMESTAMPTZ',
      nullable: false,
      description: 'Data e hora de criação da solicitação.',
    },
    {
      name: 'updated_at',
      postgresType: 'TIMESTAMPTZ',
      nullable: false,
      description: 'Data e hora da última atualização da solicitação.',
    },
  ],
  primaryKey: ['sales_summary_request_id'],
  indexes: [
    {
      name: 'ix_sales_summary_requests_shift_report_id',
      columns: ['shift_report_id'],
      unique: false,
    },
    {
      name: 'ix_sales_summary_requests_created_at',
      columns: ['created_at'],
      unique: false,
    },
    {
      name: 'ix_sales_summary_requests_status',
      columns: ['request_status'],
      unique: false,
    },
  ],
  version: 1,
};
