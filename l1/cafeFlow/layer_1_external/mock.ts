/// <mls fileReference="_102043_/l1/cafeFlow/layer_1_external/mock.ts" enhancement="_blank"/>
import type { SeedDefinition } from '/_102034_/l1/server/layer_1_external/persistence/contracts.js';

// UUID seed constants — readable prefixes, valid format
const SHIFT_1   = '11111111-0000-0000-0000-000000000001';
const SHIFT_2   = '11111111-0000-0000-0000-000000000002';
const SC_1      = '22222222-0000-0000-0000-000000000001'; // shift_config (MDM)
const SC_2      = '22222222-0000-0000-0000-000000000002';
const SI_1      = '33333333-0000-0000-0000-000000000001'; // stock_item (MDM)
const SI_2      = '33333333-0000-0000-0000-000000000002';
const UOM_1     = '44444444-0000-0000-0000-000000000001'; // unit_of_measure (MDM)
const UOM_2     = '44444444-0000-0000-0000-000000000002';
const ORDER_1   = '55555555-0000-0000-0000-000000000001';
const ORDER_2   = '55555555-0000-0000-0000-000000000002';
const OSH_1     = '66666666-0000-0000-0000-000000000001'; // order_status_history
const OSH_2     = '66666666-0000-0000-0000-000000000002';
const SM_1      = '77777777-0000-0000-0000-000000000001'; // stock_movement
const SM_2      = '77777777-0000-0000-0000-000000000002';
const LSA_1     = '88888888-0000-0000-0000-000000000001'; // low_stock_alert
const LSA_2     = '88888888-0000-0000-0000-000000000002';
const SR_1      = '99999999-0000-0000-0000-000000000001'; // shift_report
const SR_2      = '99999999-0000-0000-0000-000000000002';
const SSR_1     = 'aaaaaaaa-0000-0000-0000-000000000001'; // sales_summary_request
const SSR_2     = 'aaaaaaaa-0000-0000-0000-000000000002';
const MI_1      = 'bbbbbbbb-0000-0000-0000-000000000001'; // menu_item (MDM)
const MI_2      = 'bbbbbbbb-0000-0000-0000-000000000002';
const MC_1      = 'cccccccc-0000-0000-0000-000000000001'; // menu_category (MDM)
const MC_2      = 'cccccccc-0000-0000-0000-000000000002';

export const seedDefinitions: SeedDefinition[] = [
  {
    tableName: 'shifts',
    records: [
      {
        shift_id: SHIFT_1,
        shift_config_id: SC_1,
        status: 'aberto',
        opened_at: '2026-06-19T07:00:00Z',
        closed_at: null,
        created_at: '2026-06-19T07:00:00Z',
        updated_at: '2026-06-19T07:00:00Z',
      },
      {
        shift_id: SHIFT_2,
        shift_config_id: SC_2,
        status: 'fechado',
        opened_at: '2026-06-18T07:00:00Z',
        closed_at: '2026-06-18T23:00:00Z',
        created_at: '2026-06-18T07:00:00Z',
        updated_at: '2026-06-18T23:00:00Z',
      },
    ],
  },
  {
    tableName: 'low_stock_alerts',
    records: [
      {
        low_stock_alert_id: LSA_1,
        stock_item_id: SI_1,
        triggered_at: '2026-06-19T09:00:00Z',
        current_quantity: 3,
        minimum_quantity: 10,
        status: 'ativo',
        created_at: '2026-06-19T09:00:00Z',
        updated_at: '2026-06-19T09:00:00Z',
      },
      {
        low_stock_alert_id: LSA_2,
        stock_item_id: SI_2,
        triggered_at: '2026-06-19T10:15:00Z',
        current_quantity: 1,
        minimum_quantity: 5,
        status: 'resolvido',
        created_at: '2026-06-19T10:15:00Z',
        updated_at: '2026-06-19T11:00:00Z',
      },
    ],
  },
  {
    tableName: 'low_stock_metrics',
    records: [
      {
        time: '2026-06-19T09:00:00Z',
        stock_item_id: SI_1,
        unit_of_measure_id: UOM_1,
        alert_count: 1,
        current_quantity: 3,
        threshold_value: 10,
      },
      {
        time: '2026-06-19T10:00:00Z',
        stock_item_id: SI_2,
        unit_of_measure_id: UOM_2,
        alert_count: 2,
        current_quantity: 1,
        threshold_value: 5,
      },
    ],
  },
  {
    tableName: 'orders',
    records: [
      {
        order_id: ORDER_1,
        status: 'recebido',
        shift_id: SHIFT_1,
        details: null,
        created_at: '2026-06-19T08:05:00Z',
        updated_at: '2026-06-19T08:05:00Z',
      },
      {
        order_id: ORDER_2,
        status: 'emPreparo',
        shift_id: SHIFT_1,
        details: null,
        created_at: '2026-06-19T08:10:00Z',
        updated_at: '2026-06-19T08:20:00Z',
      },
    ],
  },
  {
    tableName: 'order_status_history',
    records: [
      {
        order_status_history_id: OSH_1,
        order_id: ORDER_1,
        from_status: 'recebido',
        to_status: 'emPreparo',
        changed_at: '2026-06-19T08:15:00Z',
        changed_by: 'Ana',
        note: 'Iniciado preparo',
        created_at: '2026-06-19T08:15:00Z',
        updated_at: '2026-06-19T08:15:00Z',
      },
      {
        order_status_history_id: OSH_2,
        order_id: ORDER_2,
        from_status: 'emPreparo',
        to_status: 'pronto',
        changed_at: '2026-06-19T08:25:00Z',
        changed_by: 'Bruno',
        note: 'Pronto para entrega',
        created_at: '2026-06-19T08:25:00Z',
        updated_at: '2026-06-19T08:25:00Z',
      },
    ],
  },
  {
    tableName: 'stock_movements',
    records: [
      {
        stock_movement_id: SM_1,
        stock_item_id: SI_1,
        order_id: ORDER_1,
        movement_type: 'saida',
        quantity: 2,
        reason: 'Consumo pedido 1',
        status: 'active',
        occurred_at: '2026-06-19T08:06:00Z',
        created_at: '2026-06-19T08:06:00Z',
        updated_at: '2026-06-19T08:06:00Z',
      },
      {
        stock_movement_id: SM_2,
        stock_item_id: SI_2,
        order_id: null,
        movement_type: 'ajuste',
        quantity: 5,
        reason: 'Ajuste inventario',
        status: 'active',
        occurred_at: '2026-06-19T09:30:00Z',
        created_at: '2026-06-19T09:30:00Z',
        updated_at: '2026-06-19T09:30:00Z',
      },
    ],
  },
  {
    tableName: 'shift_reports',
    records: [
      {
        shift_report_id: SR_1,
        shift_id: SHIFT_1,
        report_status: 'gerado',
        total_sales_amount: 125.5,
        total_orders: 5,
        total_items: 7,
        shift_opened_at: '2026-06-19T07:00:00Z',
        shift_closed_at: null,
        notes: 'Turno em andamento',
        details: null,
        created_at: '2026-06-19T07:05:00Z',
        updated_at: '2026-06-19T07:05:00Z',
      },
      {
        shift_report_id: SR_2,
        shift_id: SHIFT_2,
        report_status: 'finalizado',
        total_sales_amount: 340,
        total_orders: 12,
        total_items: 18,
        shift_opened_at: '2026-06-18T07:00:00Z',
        shift_closed_at: '2026-06-18T23:00:00Z',
        notes: 'Fechamento OK',
        details: null,
        created_at: '2026-06-18T23:05:00Z',
        updated_at: '2026-06-18T23:05:00Z',
      },
    ],
  },
  {
    tableName: 'daily_sales_metrics',
    records: [
      {
        time: '2026-06-19T08:00:00Z',
        shift_id: SHIFT_1,
        status: 'recebido',
        order_item_id: 'oi-001',
        order_status_history_id: 'osh-001',
        shift_report_id: 'sr-001',
        shift_config_id: 'sc-001',
        total_revenue: 125.5,
        order_count: 5,
        average_ticket: 25.1,
        items_sold: 7,
      },
      {
        time: '2026-06-19T14:30:00Z',
        shift_id: SHIFT_2,
        status: 'entregue',
        order_item_id: 'oi-002',
        order_status_history_id: 'osh-002',
        shift_report_id: 'sr-002',
        shift_config_id: 'sc-002',
        total_revenue: 340,
        order_count: 12,
        average_ticket: 28.33,
        items_sold: 18,
      },
    ],
  },
  {
    tableName: 'top_selling_items_metrics',
    records: [
      {
        time: '2026-06-19T08:00:00Z',
        order_id: ORDER_1,
        menu_item_id: MI_1,
        menu_category_id: MC_1,
        shift_id: SHIFT_1,
        stock_item_id: 'si-001',
        order_item_id: 'oi-001',
        order_status_history_id: 'osh-001',
        shift_report_id: 'sr-001',
        shift_config_id: 'sc-001',
        quantity_sold: 2,
        item_revenue: 30,
        order_count: 1,
      },
      {
        time: '2026-06-19T14:00:00Z',
        order_id: ORDER_2,
        menu_item_id: MI_2,
        menu_category_id: MC_2,
        shift_id: SHIFT_1,
        stock_item_id: 'si-002',
        order_item_id: 'oi-002',
        order_status_history_id: 'osh-002',
        shift_report_id: 'sr-002',
        shift_config_id: 'sc-002',
        quantity_sold: 5,
        item_revenue: 75,
        order_count: 2,
      },
    ],
  },
  {
    tableName: 'sales_summary_requests',
    records: [
      {
        sales_summary_request_id: SSR_1,
        shift_report_id: SR_1,
        request_status: 'pending',
        created_at: '2026-06-19T16:00:00Z',
        updated_at: '2026-06-19T16:00:00Z',
      },
      {
        sales_summary_request_id: SSR_2,
        shift_report_id: SR_2,
        request_status: 'completed',
        created_at: '2026-06-19T16:05:00Z',
        updated_at: '2026-06-19T16:10:00Z',
      },
    ],
  },
];
