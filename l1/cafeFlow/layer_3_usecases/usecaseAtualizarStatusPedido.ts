/// <mls fileReference="_102043_/l1/cafeFlow/layer_3_usecases/usecaseAtualizarStatusPedido.ts" enhancement="_blank" />
import { AppError, type RequestContext } from '/_102034_/l1/server/layer_2_controllers/contracts.js';

export type OrderStatus = 'novo' | 'em_preparo' | 'pronto' | 'entregue';
export type KitchenTicketStatus = 'novo' | 'em_preparo' | 'pronto' | 'entregue';

export interface OrderAggregateRecord {
  order_id: string;
  status: OrderStatus;
  kitchen_ticket_status?: KitchenTicketStatus;
  updated_at?: string;
}

export interface UpdateOrderStatusPreparingInput {
  orderId: string;
}

export interface UpdateOrderStatusReadyInput {
  orderId: string;
}

export interface UpdateOrderStatusDeliveredInput {
  orderId: string;
}

export interface OrderAggregate {
  orderId: string;
  status: OrderStatus;
  kitchenTicketStatus?: KitchenTicketStatus;
  updatedAt?: string;
}

async function getOrderAggregateRepository(ctx: RequestContext) {
  return await ctx.data.moduleData.getTable<OrderAggregateRecord>('order_aggregate');
}

function mapToAggregate(record: OrderAggregateRecord): OrderAggregate {
  return {
    orderId: record.order_id,
    status: record.status,
    kitchenTicketStatus: record.kitchen_ticket_status,
    updatedAt: record.updated_at,
  };
}

function assertTransition(params: {
  currentStatus: OrderStatus;
  nextStatus: OrderStatus;
  orderId: string;
}) {
  const { currentStatus, nextStatus, orderId } = params;
  const allowedTransitions: Record<OrderStatus, OrderStatus> = {
    novo: 'em_preparo',
    em_preparo: 'pronto',
    pronto: 'entregue',
    entregue: 'entregue',
  };

  const expectedNext = allowedTransitions[currentStatus];
  if (expectedNext !== nextStatus) {
    throw new AppError(
      'CONFLICT',
      'Transição de status do pedido não permitida',
      409,
      {
        orderId,
        currentStatus,
        nextStatus,
        expectedNext,
        rule: 'rule-order-status-transition',
      }
    );
  }
}

export async function updateOrderStatusPreparing(
  ctx: RequestContext,
  input: UpdateOrderStatusPreparingInput
): Promise<OrderAggregate> {
  if (!input.orderId) {
    throw new AppError('VALIDATION_ERROR', 'Field is required', 400, { field: 'orderId' });
  }

  const orderRepo = await getOrderAggregateRepository(ctx);
  const order = await orderRepo.findOne({ where: { order_id: input.orderId } });

  if (!order) {
    throw new AppError('NOT_FOUND', 'Order not found', 404, { orderId: input.orderId });
  }

  assertTransition({ currentStatus: order.status, nextStatus: 'em_preparo', orderId: input.orderId });

  const nowIso = ctx.clock.nowIso();
  const patch: Partial<OrderAggregateRecord> = {
    status: 'em_preparo',
    kitchen_ticket_status: 'em_preparo',
    updated_at: nowIso,
  };

  await orderRepo.update({ where: { order_id: input.orderId }, patch });

  return mapToAggregate({ ...order, ...patch });
}

export async function updateOrderStatusReady(
  ctx: RequestContext,
  input: UpdateOrderStatusReadyInput
): Promise<OrderAggregate> {
  if (!input.orderId) {
    throw new AppError('VALIDATION_ERROR', 'Field is required', 400, { field: 'orderId' });
  }

  const orderRepo = await getOrderAggregateRepository(ctx);
  const order = await orderRepo.findOne({ where: { order_id: input.orderId } });

  if (!order) {
    throw new AppError('NOT_FOUND', 'Order not found', 404, { orderId: input.orderId });
  }

  assertTransition({ currentStatus: order.status, nextStatus: 'pronto', orderId: input.orderId });

  const nowIso = ctx.clock.nowIso();
  const patch: Partial<OrderAggregateRecord> = {
    status: 'pronto',
    kitchen_ticket_status: 'pronto',
    updated_at: nowIso,
  };

  await orderRepo.update({ where: { order_id: input.orderId }, patch });

  return mapToAggregate({ ...order, ...patch });
}

export async function updateOrderStatusDelivered(
  ctx: RequestContext,
  input: UpdateOrderStatusDeliveredInput
): Promise<OrderAggregate> {
  if (!input.orderId) {
    throw new AppError('VALIDATION_ERROR', 'Field is required', 400, { field: 'orderId' });
  }

  const orderRepo = await getOrderAggregateRepository(ctx);
  const order = await orderRepo.findOne({ where: { order_id: input.orderId } });

  if (!order) {
    throw new AppError('NOT_FOUND', 'Order not found', 404, { orderId: input.orderId });
  }

  assertTransition({ currentStatus: order.status, nextStatus: 'entregue', orderId: input.orderId });

  const nowIso = ctx.clock.nowIso();
  const patch: Partial<OrderAggregateRecord> = {
    status: 'entregue',
    kitchen_ticket_status: 'entregue',
    updated_at: nowIso,
  };

  await orderRepo.update({ where: { order_id: input.orderId }, patch });

  return mapToAggregate({ ...order, ...patch });
}
