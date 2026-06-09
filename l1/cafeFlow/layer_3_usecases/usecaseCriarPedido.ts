/// <mls fileReference="_102043_/l1/cafeFlow/layer_3_usecases/usecaseCriarPedido.ts" enhancement="_blank" />
import { AppError, type RequestContext } from '/_102034_/l1/server/layer_2_controllers/contracts.js';

export type OrderStatus = 'aberto' | 'enviado_cozinha' | 'finalizado' | 'cancelado';
export type DailyShiftStatus = 'aberta' | 'fechada';

export interface MenuItemRecord {
  menu_item_id: string;
  name: string;
  price: number;
  active: boolean;
}

export interface DailyShiftRecord {
  shift_id: string;
  status: DailyShiftStatus;
}

export interface OrderItemRecord {
  item_id: string;
  menu_item_id: string;
  name: string;
  unit_price: number;
  quantity: number;
  total_price: number;
  notes?: string | null;
}

export interface OrderAggregateRecord {
  order_id: string;
  shift_id: string;
  status: OrderStatus;
  items: OrderItemRecord[];
  total_amount: number;
  created_at: string;
  updated_at: string;
  kitchen_ticket_id?: string | null;
  kitchen_sent_at?: string | null;
}

export interface CreateOrderItemInput {
  menuItemId: string;
  quantity: number;
  notes?: string | null;
}

export interface CreateOrderInput {
  shiftId: string;
  items: CreateOrderItemInput[];
}

export interface AddOrderItemInput {
  orderId: string;
  menuItemId: string;
  quantity: number;
  notes?: string | null;
}

export interface SendToKitchenInput {
  orderId: string;
}

export interface OrderItem {
  itemId: string;
  menuItemId: string;
  name: string;
  unitPrice: number;
  quantity: number;
  totalPrice: number;
  notes?: string | null;
}

export interface OrderAggregate {
  orderId: string;
  shiftId: string;
  status: OrderStatus;
  items: OrderItem[];
  totalAmount: number;
  createdAt: string;
  updatedAt: string;
  kitchenTicketId?: string | null;
  kitchenSentAt?: string | null;
}

async function getMenuItemRepository(ctx: RequestContext) {
  return await ctx.data.moduleData.getTable<MenuItemRecord>('MenuItem');
}

async function getDailyShiftRepository(ctx: RequestContext) {
  return await ctx.data.moduleData.getTable<DailyShiftRecord>('DailyShift');
}

async function getOrderAggregateRepository(ctx: RequestContext) {
  return await ctx.data.moduleData.getTable<OrderAggregateRecord>('order_aggregate');
}

function mapOrderRecordToAggregate(record: OrderAggregateRecord): OrderAggregate {
  return {
    orderId: record.order_id,
    shiftId: record.shift_id,
    status: record.status,
    items: record.items.map((item) => ({
      itemId: item.item_id,
      menuItemId: item.menu_item_id,
      name: item.name,
      unitPrice: item.unit_price,
      quantity: item.quantity,
      totalPrice: item.total_price,
      notes: item.notes ?? null,
    })),
    totalAmount: record.total_amount,
    createdAt: record.created_at,
    updatedAt: record.updated_at,
    kitchenTicketId: record.kitchen_ticket_id ?? null,
    kitchenSentAt: record.kitchen_sent_at ?? null,
  };
}

export async function createOrder(
  ctx: RequestContext,
  input: CreateOrderInput,
): Promise<OrderAggregate> {
  if (!input.shiftId) {
    throw new AppError('VALIDATION_ERROR', 'Shift ID is required', 400, { field: 'shiftId' });
  }
  if (!input.items || input.items.length === 0) {
    throw new AppError('VALIDATION_ERROR', 'At least one item is required', 400, { field: 'items' });
  }

  const shiftRepo = await getDailyShiftRepository(ctx);
  const shift = await shiftRepo.findOne({ where: { shift_id: input.shiftId } });
  if (!shift) {
    throw new AppError('NOT_FOUND', 'Daily shift not found', 404, { shiftId: input.shiftId });
  }
  if (shift.status !== 'aberta') {
    throw new AppError('CONFLICT', 'Daily shift is not open', 409, { shiftId: input.shiftId, status: shift.status });
  }

  const menuItemRepo = await getMenuItemRepository(ctx);
  const orderItems: OrderItemRecord[] = [];
  let totalAmount = 0;

  for (const itemInput of input.items) {
    if (!itemInput.menuItemId) {
      throw new AppError('VALIDATION_ERROR', 'Menu item ID is required', 400, { field: 'menuItemId' });
    }
    if (!itemInput.quantity || itemInput.quantity <= 0) {
      throw new AppError('VALIDATION_ERROR', 'Quantity must be greater than zero', 400, { field: 'quantity' });
    }

    const menuItem = await menuItemRepo.findOne({ where: { menu_item_id: itemInput.menuItemId } });
    if (!menuItem) {
      throw new AppError('NOT_FOUND', 'Menu item not found', 404, { menuItemId: itemInput.menuItemId });
    }
    if (!menuItem.active) {
      throw new AppError('CONFLICT', 'Menu item is inactive', 409, { menuItemId: itemInput.menuItemId });
    }

    const itemTotal = menuItem.price * itemInput.quantity;
    totalAmount += itemTotal;
    orderItems.push({
      item_id: ctx.idGenerator.newId(),
      menu_item_id: menuItem.menu_item_id,
      name: menuItem.name,
      unit_price: menuItem.price,
      quantity: itemInput.quantity,
      total_price: itemTotal,
      notes: itemInput.notes ?? null,
    });
  }

  const now = ctx.clock.nowIso();
  const orderRecord: OrderAggregateRecord = {
    order_id: ctx.idGenerator.newId(),
    shift_id: input.shiftId,
    status: 'aberto',
    items: orderItems,
    total_amount: totalAmount,
    created_at: now,
    updated_at: now,
    kitchen_ticket_id: null,
    kitchen_sent_at: null,
  };

  const orderRepo = await getOrderAggregateRepository(ctx);
  await orderRepo.insert({ record: orderRecord });

  return mapOrderRecordToAggregate(orderRecord);
}

export async function addOrderItem(
  ctx: RequestContext,
  input: AddOrderItemInput,
): Promise<OrderAggregate> {
  if (!input.orderId) {
    throw new AppError('VALIDATION_ERROR', 'Order ID is required', 400, { field: 'orderId' });
  }
  if (!input.menuItemId) {
    throw new AppError('VALIDATION_ERROR', 'Menu item ID is required', 400, { field: 'menuItemId' });
  }
  if (!input.quantity || input.quantity <= 0) {
    throw new AppError('VALIDATION_ERROR', 'Quantity must be greater than zero', 400, { field: 'quantity' });
  }

  const orderRepo = await getOrderAggregateRepository(ctx);
  const order = await orderRepo.findOne({ where: { order_id: input.orderId } });
  if (!order) {
    throw new AppError('NOT_FOUND', 'Order not found', 404, { orderId: input.orderId });
  }
  if (order.status !== 'aberto') {
    throw new AppError('CONFLICT', 'Cannot add items to order in current status', 409, {
      orderId: input.orderId,
      status: order.status,
    });
  }

  const menuItemRepo = await getMenuItemRepository(ctx);
  const menuItem = await menuItemRepo.findOne({ where: { menu_item_id: input.menuItemId } });
  if (!menuItem) {
    throw new AppError('NOT_FOUND', 'Menu item not found', 404, { menuItemId: input.menuItemId });
  }
  if (!menuItem.active) {
    throw new AppError('CONFLICT', 'Menu item is inactive', 409, { menuItemId: input.menuItemId });
  }

  const itemTotal = menuItem.price * input.quantity;
  const updatedItems = [...order.items];
  updatedItems.push({
    item_id: ctx.idGenerator.newId(),
    menu_item_id: menuItem.menu_item_id,
    name: menuItem.name,
    unit_price: menuItem.price,
    quantity: input.quantity,
    total_price: itemTotal,
    notes: input.notes ?? null,
  });

  const updatedTotal = order.total_amount + itemTotal;
  const now = ctx.clock.nowIso();

  await orderRepo.update({
    where: { order_id: input.orderId },
    patch: {
      items: updatedItems,
      total_amount: updatedTotal,
      updated_at: now,
    },
  });

  return mapOrderRecordToAggregate({
    ...order,
    items: updatedItems,
    total_amount: updatedTotal,
    updated_at: now,
  });
}

export async function sendToKitchen(
  ctx: RequestContext,
  input: SendToKitchenInput,
): Promise<OrderAggregate> {
  if (!input.orderId) {
    throw new AppError('VALIDATION_ERROR', 'Order ID is required', 400, { field: 'orderId' });
  }

  const orderRepo = await getOrderAggregateRepository(ctx);
  const order = await orderRepo.findOne({ where: { order_id: input.orderId } });
  if (!order) {
    throw new AppError('NOT_FOUND', 'Order not found', 404, { orderId: input.orderId });
  }
  if (order.status !== 'aberto') {
    throw new AppError('CONFLICT', 'Order status transition is not allowed', 409, {
      orderId: input.orderId,
      status: order.status,
      expectedStatus: 'aberto',
    });
  }

  const now = ctx.clock.nowIso();
  const kitchenTicketId = ctx.idGenerator.newId();

  await orderRepo.update({
    where: { order_id: input.orderId },
    patch: {
      status: 'enviado_cozinha',
      kitchen_ticket_id: kitchenTicketId,
      kitchen_sent_at: now,
      updated_at: now,
    },
  });

  return mapOrderRecordToAggregate({
    ...order,
    status: 'enviado_cozinha',
    kitchen_ticket_id: kitchenTicketId,
    kitchen_sent_at: now,
    updated_at: now,
  });
}
