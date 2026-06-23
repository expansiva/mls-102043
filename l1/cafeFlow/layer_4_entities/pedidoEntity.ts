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

export interface PedidoStatusHistoryRecord {
  id: string;
  order_id: string;
  from_status?: PedidoStatus | null;
  to_status: PedidoStatus;
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
  getById(ctx: RequestContext, orderId: string, runtime?: IDataRuntime): Promise<PedidoRecord>;
  update(ctx: RequestContext, input: UpdatePedidoInput, runtime?: IDataRuntime): Promise<PedidoRecord>;
  list(ctx: RequestContext, filter?: ListPedidoFilter, runtime?: IDataRuntime): Promise<PedidoRecord[]>;
}

export const PedidoEntity: IPedidoEntity = {
  async create(ctx, input, runtime) {
    const data = runtime ?? ctx.data;
    const repo = await data.moduleData.getTable<PedidoRecord>('orders');
    const now = ctx.clock.nowIso();
    const record: PedidoRecord = {
      order_id: ctx.idGenerator.newId(),
      status: input.status,
      shift_id: input.shiftId,
      created_at: now,
      updated_at: now,
    };
    await repo.insert({ record });
    return record;
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
  async update(ctx, input, runtime) {
    const data = runtime ?? ctx.data;
    const repo = await data.moduleData.getTable<PedidoRecord>('orders');
    const historyRepo = await data.moduleData.getTable<PedidoStatusHistoryRecord>('order_status_history');
    const current = await repo.findOne({ where: { order_id: input.orderId } });
    if (!current) {
      throw new AppError('NOT_FOUND', 'Pedido não encontrado.', 404, { id: input.orderId });
    }
    const patch: Partial<PedidoRecord> = {
      updated_at: ctx.clock.nowIso(),
    };
    if (input.status) {
      patch.status = input.status;
    }
    if (input.shiftId) {
      patch.shift_id = input.shiftId;
    }
    await repo.update({ where: { order_id: input.orderId }, patch });
    const updated: PedidoRecord = { ...current, ...patch };
    if (input.status && input.status !== current.status) {
      const historyRecord: PedidoStatusHistoryRecord = {
        id: ctx.idGenerator.newId(),
        order_id: input.orderId,
        from_status: current.status,
        to_status: input.status,
        created_at: ctx.clock.nowIso(),
      };
      await historyRepo.insert({ record: historyRecord });
    }
    return updated;
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
    return repo.findMany({
      where,
      orderBy: { field: 'created_at', direction: 'desc' },
    });
  },
};
