/// <mls fileReference="_102043_/l1/cafeFlow/layer_1_external/promotionSuggestion.ts" enhancement="_blank" />
import type { TableDefinition } from '/_102034_/l1/server/layer_1_external/persistence/contracts.js';

export const promotionSuggestionTableDef: TableDefinition = {
  moduleId: 'cafeFlow',
  repositoryName: 'cafeFlowPromotionSuggestion',
  tableName: 'promotion_suggestion',
  purpose: 'transacao',
  description: 'Registrar sugestões geradas por IA para itens do cardápio com base no histórico de vendas.',
  backupHot: false,
  storageProfile: 'postgres',
  writeMode: 'sync',
  columns: [
    {
      name: 'promotion_suggestion_id',
      postgresType: 'UUID',
      nullable: false,
      description: 'Identificador único da sugestão de promoção.',
    },
    {
      name: 'menu_item_id',
      postgresType: 'UUID',
      nullable: false,
      description: 'Item do cardápio sugerido para promoção (MDM).',
    },
    {
      name: 'suggestion_status',
      postgresType: 'TEXT',
      nullable: false,
      defaultSql: "'new'",
      description: 'Status da sugestão (ex.: new, reviewed, approved, rejected, expired).',
    },
    {
      name: 'suggested_at',
      postgresType: 'TIMESTAMPTZ',
      nullable: false,
      description: 'Data e hora em que a sugestão foi gerada.',
    },
    {
      name: 'valid_until',
      postgresType: 'TIMESTAMPTZ',
      nullable: true,
      description: 'Data e hora limite recomendada para a promoção.',
    },
    {
      name: 'score',
      postgresType: 'NUMERIC',
      nullable: true,
      description: 'Pontuação de relevância calculada pelo agente.',
    },
    {
      name: 'reason_summary',
      postgresType: 'TEXT',
      nullable: true,
      description: 'Resumo do motivo da recomendação.',
    },
    {
      name: 'created_at',
      postgresType: 'TIMESTAMPTZ',
      nullable: false,
      description: 'Data de criação do registro.',
    },
    {
      name: 'updated_at',
      postgresType: 'TIMESTAMPTZ',
      nullable: false,
      description: 'Data da última atualização do registro.',
    },
  ],
  primaryKey: ['promotion_suggestion_id'],
  indexes: [
    {
      name: 'idx_promotion_suggestion_menu_item_id',
      columns: ['menu_item_id'],
      unique: false,
    },
    {
      name: 'idx_promotion_suggestion_status',
      columns: ['suggestion_status'],
      unique: false,
    },
    {
      name: 'idx_promotion_suggestion_suggested_at',
      columns: ['suggested_at'],
      unique: false,
    },
    {
      name: 'idx_promotion_suggestion_valid_until',
      columns: ['valid_until'],
      unique: false,
    },
  ],
  version: 1,
};
