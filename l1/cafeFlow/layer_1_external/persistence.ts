/// <mls fileReference="_102043_/l1/cafeFlow/layer_1_external/persistence.ts" enhancement="_blank" />
import type { TableDefinition } from '/_102034_/l1/server/layer_1_external/persistence/contracts.js';

import { orderTableDef } from '/_102043_/l1/cafeFlow/layer_1_external/order.js';
import {
  lowStockAlertTableDef,
} from '/_102043_/l1/cafeFlow/layer_1_external/lowStockAlert.js';
import {
  orderStatusHistoryTableDef,
} from '/_102043_/l1/cafeFlow/layer_1_external/orderStatusHistory.js';
import {
  salesSummaryRequestTableDef,
} from '/_102043_/l1/cafeFlow/layer_1_external/salesSummaryRequest.js';
import { shiftTableDef } from '/_102043_/l1/cafeFlow/layer_1_external/shift.js';
import {
  stockMovementTableDef,
} from '/_102043_/l1/cafeFlow/layer_1_external/stockMovement.js';
import {
  lowStockMetricsTableDef,
} from '/_102043_/l1/cafeFlow/layer_1_external/lowStockMetrics.js';
import {
  dailySalesMetricsTableDef,
} from '/_102043_/l1/cafeFlow/layer_1_external/dailySalesMetrics.js';
import {
  shiftReportTableDef,
} from '/_102043_/l1/cafeFlow/layer_1_external/shiftReport.js';
import {
  topSellingItemsMetricsTableDef,
} from '/_102043_/l1/cafeFlow/layer_1_external/topSellingItemsMetrics.js';
export const tableDefinitions: TableDefinition[] = [
  orderTableDef,
  lowStockAlertTableDef,
  orderStatusHistoryTableDef,
  salesSummaryRequestTableDef,
  shiftTableDef,
  stockMovementTableDef,
  lowStockMetricsTableDef,
  dailySalesMetricsTableDef,
  shiftReportTableDef,
  topSellingItemsMetricsTableDef,
];
