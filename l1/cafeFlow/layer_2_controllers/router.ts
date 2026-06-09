/// <mls fileReference="_102043_/l1/cafeFlow/layer_2_controllers/router.ts" enhancement="_blank" />
import type { BffHandler } from '/_102034_/l1/server/layer_2_controllers/contracts.js';
import { cafeFlowListMenuItemsHandler } from '/_102043_/l1/cafeFlow/layer_2_controllers/posOrderCreate.js';
import { cafeFlowStartOrderDraftHandler } from '/_102043_/l1/cafeFlow/layer_2_controllers/posOrderCreate.js';

import { cafeFlowListIngredientsHandler } from '/_102043_/l1/cafeFlow/layer_2_controllers/inventoryManagement.js';
import { cafeFlowUpdateIngredientStockHandler } from '/_102043_/l1/cafeFlow/layer_2_controllers/inventoryManagement.js';
import { cafeFlowGetOrderDraftHandler } from '/_102043_/l1/cafeFlow/layer_2_controllers/posOrderConfirm.js';
import { cafeFlowSubmitOrderToKitchenHandler } from '/_102043_/l1/cafeFlow/layer_2_controllers/posOrderConfirm.js';
import { cafeFlowMenuManagementListMenuItemsHandler } from '_102043_/l1/cafeFlow/layer_2_controllers/menuManagement.js';
import { cafeFlowMenuManagementListIngredientsForRecipeHandler } from '_102043_/l1/cafeFlow/layer_2_controllers/menuManagement.js';
import { cafeFlowMenuManagementCreateMenuItemHandler } from '_102043_/l1/cafeFlow/layer_2_controllers/menuManagement.js';
import { cafeFlowGetKitchenQueueHandler } from '/_102043_/l1/cafeFlow/layer_2_controllers/kitchenQueue.js';
import { cafeFlowUpdateOrderStatusHandler } from '/_102043_/l1/cafeFlow/layer_2_controllers/kitchenQueue.js';
export function createCafeFlowRouter(): Map<string, BffHandler> {
  return new Map<string, BffHandler>([
    ['cafeFlow.posOrderCreate.listMenuItems', cafeFlowListMenuItemsHandler],
    ['cafeFlow.posOrderCreate.startOrderDraft', cafeFlowStartOrderDraftHandler],
    ['cafeFlow.inventoryManagement.listIngredients', cafeFlowListIngredientsHandler],
    ['cafeFlow.inventoryManagement.updateIngredientStock', cafeFlowUpdateIngredientStockHandler],
    ['cafeFlow.posOrderConfirm.getOrderDraft', cafeFlowGetOrderDraftHandler],
    ['cafeFlow.posOrderConfirm.submitOrderToKitchen', cafeFlowSubmitOrderToKitchenHandler],
    ['cafeFlow.menuManagement.listMenuItems', cafeFlowMenuManagementListMenuItemsHandler],
    ['cafeFlow.menuManagement.listIngredientsForRecipe', cafeFlowMenuManagementListIngredientsForRecipeHandler],
    ['cafeFlow.menuManagement.createMenuItem', cafeFlowMenuManagementCreateMenuItemHandler],
    ['cafeFlow.kitchenQueue.getKitchenQueue', cafeFlowGetKitchenQueueHandler],
    ['cafeFlow.kitchenQueue.updateOrderStatus', cafeFlowUpdateOrderStatusHandler],
  ]);
}
