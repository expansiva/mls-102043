/// <mls fileReference="_102043_/l1/cafeFlow/layer_2_controllers/posOrderConfirm.ts" enhancement="_blank" />
import { ok, AppError, type BffHandler } from '/_102034_/l1/server/layer_2_controllers/contracts.js';
import { createOrder, type CreateOrderInput, type OrderAggregate } from '/_102043_/l1/cafeFlow/layer_3_usecases/usecaseCriarPedido.js';

interface GetOrderDraftInput {
  orderId: string;
}

interface SubmitOrderToKitchenInput {
  orderId: string;
  confirmedByCashier: boolean;
}

export const cafeFlowGetOrderDraftHandler: BffHandler = async ({ request, ctx }) => {
  const input = request.params as GetOrderDraftInput;
  if (!input.orderId) throw new AppError('VALIDATION_ERROR', 'orderId is required', 400);
  const result = await createOrder(ctx, input as unknown as CreateOrderInput);
  return ok(result as OrderAggregate);
};

export const cafeFlowSubmitOrderToKitchenHandler: BffHandler = async ({ request, ctx }) => {
  const input = request.params as SubmitOrderToKitchenInput;
  if (!input.orderId) throw new AppError('VALIDATION_ERROR', 'orderId is required', 400);
  if (input.confirmedByCashier === undefined) {
    throw new AppError('VALIDATION_ERROR', 'confirmedByCashier is required', 400);
  }
  const result = await createOrder(ctx, input as unknown as CreateOrderInput);
  return ok(result as OrderAggregate);
};
