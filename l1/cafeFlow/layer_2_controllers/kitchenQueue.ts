/// <mls fileReference="_102043_/l1/cafeFlow/layer_2_controllers/kitchenQueue.ts" enhancement="_blank" />
import { ok, AppError, type BffHandler, type RequestContext } from '/_102034_/l1/server/layer_2_controllers/contracts.js';
import { updateOrderStatusPreparing, type UpdateOrderStatusPreparingInput, type OrderAggregate } from '/_102043_/l1/cafeFlow/layer_3_usecases/usecaseAtualizarStatusPedido.js';
import { deductStockByRecipe, type DeductStockByRecipeInput, type DeductStockByRecipeOutput } from '/_102043_/l1/cafeFlow/layer_3_usecases/usecaseBaixarEstoqueIngredientes.js';

type KitchenQueueOrder = {
  orderId: string;
  orderNumber: string;
  orderType: string;
  tableNumber?: string;
  status: string;
  kitchenPriority?: string;
  itemCount: number;
  totalAmount: number;
  createdAt: string;
  updatedAt: string;
};

type GetKitchenQueueInput = {
  statusFilter: string[];
  createdAfter?: string;
  limit?: number;
  offset?: number;
};

type GetKitchenQueueOutput = {
  orders: KitchenQueueOrder[];
};

type UpdateOrderStatusInput = {
  orderId: string;
  newStatus: string;
  action: 'updateOrderStatusPreparing' | 'updateOrderStatusReady' | 'updateOrderStatusDelivered';
};

type UpdateOrderStatusOutput = {
  order: OrderAggregate;
};

export const cafeFlowGetKitchenQueueHandler: BffHandler = async ({ request, ctx }) => {
  const input = request.params as GetKitchenQueueInput;

  if (!input.statusFilter || input.statusFilter.length === 0) {
    throw new AppError('VALIDATION_ERROR', 'statusFilter is required', 400);
  }

  throw new AppError('NOT_IMPLEMENTED', 'getKitchenQueue usecase not implemented', 501);
};

export const cafeFlowUpdateOrderStatusHandler: BffHandler = async ({ request, ctx }) => {
  const input = request.params as UpdateOrderStatusInput;

  if (!input.orderId) throw new AppError('VALIDATION_ERROR', 'orderId is required', 400);
  if (!input.newStatus) throw new AppError('VALIDATION_ERROR', 'newStatus is required', 400);
  if (!input.action) throw new AppError('VALIDATION_ERROR', 'action is required', 400);

  const usecaseInput: UpdateOrderStatusPreparingInput = { orderId: input.orderId };
  const updatedOrder = await updateOrderStatusPreparing(ctx, usecaseInput);

  if (input.action === 'updateOrderStatusDelivered') {
    const stockInput: DeductStockByRecipeInput = { orderId: input.orderId };
    await deductStockByRecipe(ctx, stockInput);
  }

  const result: UpdateOrderStatusOutput = { order: updatedOrder };
  return ok(result);
};
