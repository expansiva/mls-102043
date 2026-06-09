/// <mls fileReference="_102043_/l1/cafeFlow/layer_2_controllers/posOrderCreate.ts" enhancement="_blank" />
import { ok, AppError, type BffHandler, type RequestContext } from '/_102034_/l1/server/layer_2_controllers/contracts.js';
import { createOrder, type CreateOrderInput, type OrderAggregate } from '/_102043_/l1/cafeFlow/layer_3_usecases/usecaseCriarPedido.js';

export const cafeFlowListMenuItemsHandler: BffHandler = async ({ request, ctx }) => {
  const input = request.params as CreateOrderInput;
  if (!input.shiftId) throw new AppError('VALIDATION_ERROR', 'shiftId is required', 400);
  if (!input.items) throw new AppError('VALIDATION_ERROR', 'items is required', 400);
  const result = await createOrder(ctx, input);
  return ok(result);
};

export const cafeFlowStartOrderDraftHandler: BffHandler = async ({ request, ctx }) => {
  const input = request.params as CreateOrderInput;
  if (!input.shiftId) throw new AppError('VALIDATION_ERROR', 'shiftId is required', 400);
  if (!input.items) throw new AppError('VALIDATION_ERROR', 'items is required', 400);
  const result = await createOrder(ctx, input);
  return ok(result);
};
