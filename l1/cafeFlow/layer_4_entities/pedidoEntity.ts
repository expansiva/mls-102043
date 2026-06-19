/// <mls fileReference="_102043_/l1/cafeFlow/layer_4_entities/pedidoEntity.ts" enhancement="_blank"/>
import { AppError, type RequestContext } from '/_102034_/l1/server/layer_2_controllers/contracts.js';
import type { IDataRuntime } from '/_102034_/l1/server/layer_1_external/data/runtime.js';

export type PedidoStatus = 'recebido' | 'emPreparo' | 'pronto' | 'entregue' | 'cancelado';

export interface PedidoRecord {
  order_id: string;
  status: PedidoStatus;
  shift_id: string;
  created_at: string;
  updated_at: string;
}

export interface OrderStatusHistoryRecord {
  id: string;
  order_id: string;
  status: PedidoStatus;
  created_at: string;
}

export interface CreatePedidoInput {
  status: PedidoStatus;
  shiftId: string;
}

export interface UpdatePedidoInput {
  orderId: string;
  status?: PedidoStatus;
  shiftId?: string;
}

export interface ListPedidoFilter {
  status?: PedidoStatus;
  shiftId?: string;
}

export interface IPedidoEntity {
  create(ctx: RequestContext, input: CreatePedidoInput, runtime?: IDataRuntime): Promise<PedidoRecord>;
  update(ctx: RequestContext, input: UpdatePedidoInput, runtime?: IDataRuntime): Promise<PedidoRecord>;
  getById(ctx: RequestContext, orderId: string, runtime?: IDataRuntime): Promise<PedidoRecord>;
  list(ctx: RequestContext, filter?: ListPedidoFilter, runtime?: IDataRuntime): Promise<PedidoRecord[]>;
}

export const PedidoEntity: IPedidoEntity = {
  async create(ctx, input, runtime) {
    const data = runtime ?? ctx.data;
    const repo = await data.moduleData.getTable<PedidoRecord>('orders');
    const historyRepo = await data.moduleData.getTable<OrderStatusHistoryRecord>('orderStatusHistory');
    const now = ctx.clock.nowIso();
    const orderId = ctx.idGenerator.newId();
    const record: PedidoRecord = {
      order_id: orderId,
      status: input.status,
      shift_id: input.shiftId,
      created_at: now,
      updated_at: now,
    };

    await repo.insert({ record });
    await historyRepo.insert({
      record: {
        id: ctx.idGenerator.newId(),
        order_id: orderId,
        status: input.status,
        created_at: now,
      },
    });

    return record;
  },

  async update(ctx, input, runtime) {
    const data = runtime ?? ctx.data;
    const repo = await data.moduleData.getTable<PedidoRecord>('orders');
    const historyRepo = await data.moduleData.getTable<OrderStatusHistoryRecord>('orderStatusHistory');
    const current = await repo.findOne({ where: { order_id: input.orderId } });

    if (!current) {
      throw new AppError('NOT_FOUND', 'Pedido não encontrado.', 404, { id: input.orderId });
    }

    const now = ctx.clock.nowIso();
    const patch: Partial<PedidoRecord> = {
      updated_at: now,
    };

    if (input.status) {
      patch.status = input.status;
    }

    if (input.shiftId) {
      patch.shift_id = input.shiftId;
    }

    await repo.update({ where: { order_id: input.orderId }, patch });

    const updated: PedidoRecord = {
      ...current,
      ...patch,
    };

    if (input.status && input.status !== current.status) {
      await historyRepo.insert({
        record: {
          id: ctx.idGenerator.newId(),
          order_id: input.orderId,
          status: input.status,
          created_at: now,
        },
      });
    }

    return updated;
  },

  async getById(ctx, orderId, runtime) {
    const data = runtime ?? ctx.data;
    const repo = await data.moduleData.getTable<PedidoRecord>('orders');
    const record = await repo.findOne({ where: { order_id: orderId } });

    if (!record) {
      throw new AppError('NOT_FOUND', 'Pedido não encontrado.', 404, { id: orderId });
    }

    return record;
  },

  async list(ctx, filter, runtime) {
    const data = runtime ?? ctx.data;
    const repo = await data.moduleData.getTable<PedidoRecord>('orders');
    const where: Partial<PedidoRecord> = {};

    if (filter?.status) {
      where.status = filter.status;
    }

    if (filter?.shiftId) {
      where.shift_id = filter.shiftId;
    }

    const hasWhere = Object.keys(where).length > 0 ? where : undefined;

    return repo.findMany({
      where: hasWhere,
      orderBy: {
        field: 'created_at',
        direction: 'desc',
      },
    });
  },
};
