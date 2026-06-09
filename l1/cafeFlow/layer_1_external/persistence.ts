/// <mls fileReference="_102043_/l1/cafeFlow/layer_1_external/persistence.ts" enhancement="_blank" />
import type { TableDefinition } from '/_102034_/l1/server/layer_1_external/persistence/contracts.js';
import { orderAggregateTableDef } from '/_102043_/l1/cafeFlow/layer_1_external/orderAggregate.js';
import { lowStockMetricsTableDef } from '/_102043_/l1/cafeFlow/layer_1_external/lowStockMetrics.js';
import { promotionSuggestionTableDef } from '/_102043_/l1/cafeFlow/layer_1_external/promotionSuggestion.js';
import { dailySalesMetricsTableDef } from '/_102043_/l1/cafeFlow/layer_1_external/dailySalesMetrics.js';
import { salesSummaryTableDef } from '/_102043_/l1/cafeFlow/layer_1_external/salesSummary.js';
import { topSellingItemsMetricsTableDef } from '/_102043_/l1/cafeFlow/layer_1_external/topSellingItemsMetrics.js';
export const tableDefinitions: TableDefinition[] = [orderAggregateTableDef, lowStockMetricsTableDef, promotionSuggestionTableDef, dailySalesMetricsTableDef, salesSummaryTableDef, topSellingItemsMetricsTableDef];
