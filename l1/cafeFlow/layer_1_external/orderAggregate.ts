/// <mls fileReference="_102043_/l1/cafeFlow/layer_1_external/orderAggregate.ts" enhancement="_blank" />
import type { TableDefinition } from '/_102034_/l1/server/layer_1_external/persistence/contracts.js';
export const orderAggregateTableDef: TableDefinition = {
moduleId: 'cafeFlow',
repositoryName: 'cafeFlowOrderAggregate',
tableName: 'order_aggregate',
purpose: 'transacao',
description: 'Persistir pedidos do POS com itens associados e estado operacional da cozinha em um agregado único para leitura rápida da fila e do POS.',
backupHot: false,
storageProfile: 'postgres',
writeMode: 'sync',
columns: [
{ name: 'order_id', postgresType: 'UUID', nullable: false, description: 'Identificador do pedido.' },
{ name: 'order_number', postgresType: 'TEXT', nullable: false, description: 'Número sequencial visível no POS e na cozinha.' },
{ name: 'order_type', postgresType: 'TEXT', nullable: false, description: 'Tipo do pedido: mesa ou takeout.' },
{ name: 'table_number', postgresType: 'TEXT', nullable: true, description: 'Número da mesa quando aplicável.' },
{ name: 'status', postgresType: 'TEXT', nullable: false, description: 'Status do pedido (Novo, Em preparo, Pronto, Entregue).' },
{ name: 'kitchen_priority', postgresType: 'TEXT', nullable: true, description: 'Prioridade operacional do ticket de cozinha.' },
{ name: 'total_amount', postgresType: 'NUMERIC', nullable: false, description: 'Valor total do pedido.' },
{ name: 'item_count', postgresType: 'NUMERIC', nullable: false, description: 'Quantidade total de itens no pedido.' },
{ name: 'shift_id', postgresType: 'UUID', nullable: true, description: 'Identificador do turno diário associado.' },
{ name: 'created_at', postgresType: 'TIMESTAMPTZ', nullable: false, description: 'Data/hora de criação do pedido.' },
{ name: 'updated_at', postgresType: 'TIMESTAMPTZ', nullable: false, description: 'Data/hora da última atualização.' },
{ name: 'closed_at', postgresType: 'TIMESTAMPTZ', nullable: true, description: 'Data/hora de fechamento/entrega do pedido.' },
],
primaryKey: ['order_id'],
indexes: [
{ name: 'idx_order_aggregate_status_created_at', columns: ['status', 'created_at'], unique: false },
{ name: 'idx_order_aggregate_created_at', columns: ['created_at'], unique: false },
{ name: 'idx_order_aggregate_order_number', columns: ['order_number'], unique: true },
{ name: 'idx_order_aggregate_shift_id', columns: ['shift_id'], unique: false },
],
version: 1,
};
