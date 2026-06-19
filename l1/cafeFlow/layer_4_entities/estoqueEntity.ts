/// <mls fileReference="_102043_/l1/cafeFlow/layer_4_entities/estoqueEntity.ts" enhancement="_blank" />
import { AppError, type RequestContext } from '/_102034_/l1/server/layer_2_controllers/contracts.js';
import type { IDataRuntime } from '/_102034_/l1/server/layer_1_external/data/runtime.js';

export type EstoqueMovementType = 'entrada' | 'saida' | 'ajuste';

export interface EstoqueRecord {
  stock_movement_id: string;
  stock_item_id: string;
  order_id?: string | null;
  movement_type: EstoqueMovementType;
  quantity: number;
  reason?: string | null;
  occurred_at: string;
  created_at: string;
  updated_at: string;
}

export interface CreateEstoqueInput {
  stockItemId: string;
  orderId?: string | null;
  movementType: EstoqueMovementType;
  quantity: number;
  reason?: string | null;
  occurredAt: string;
}

export interface UpdateEstoqueInput {
  stockMovementId: string;
  stockItemId?: string;
  orderId?: string | null;
  movementType?: EstoqueMovementType;
  quantity?: number;
  reason?: string | null;
  occurredAt?: string;
}

export interface ListEstoqueFilter {
  stockItemId?: string;
  orderId?: string;
  movementType?: EstoqueMovementType;
  limit?: number;
}

export interface IEstoqueEntity {
  create(ctx: RequestContext, input: CreateEstoqueInput, runtime?: IDataRuntime): Promise<EstoqueRecord>;
  update(ctx: RequestContext, input: UpdateEstoqueInput, runtime?: IDataRuntime): Promise<EstoqueRecord>;
  getById(ctx: RequestContext, stockMovementId: string, runtime?: IDataRuntime): Promise<EstoqueRecord>;
  list(ctx: RequestContext, filter?: ListEstoqueFilter, runtime?: IDataRuntime): Promise<EstoqueRecord[]>;
}

export const EstoqueEntity: IEstoqueEntity = {
  async create(ctx, input, runtime) {
    const data = runtime ?? ctx.data;
    const repo = await data.moduleData.getTable<EstoqueRecord>('stock_movements');
    const now = ctx.clock.nowIso();
    const record: EstoqueRecord = {
      stock_movement_id: ctx.idGenerator.newId(),
      stock_item_id: input.stockItemId,
      order_id: input.orderId ?? null,
      movement_type: input.movementType,
      quantity: input.quantity,
      reason: input.reason ?? null,
      occurred_at: input.occurredAt,
      created_at: now,
      updated_at: now,
    };

    await repo.insert({ record });
    return record;
  },

  async update(ctx, input, runtime) {
    const data = runtime ?? ctx.data;
    const repo = await data.moduleData.getTable<EstoqueRecord>('stock_movements');
    const current = await repo.findOne({ where: { stock_movement_id: input.stockMovementId } });

    if (!current) {
      throw new AppError('NOT_FOUND', 'Stock movement not found.', 404, { id: input.stockMovementId });
    }

    const patch: Partial<EstoqueRecord> = {
      stock_item_id: input.stockItemId ?? current.stock_item_id,
      order_id: input.orderId ?? current.order_id ?? null,
      movement_type: input.movementType ?? current.movement_type,
      quantity: input.quantity ?? current.quantity,
      reason: input.reason ?? current.reason ?? null,
      occurred_at: input.occurredAt ?? current.occurred_at,
      updated_at: ctx.clock.nowIso(),
    };

    await repo.update({
      where: { stock_movement_id: input.stockMovementId },
      patch,
    });

    const updated = await repo.findOne({ where: { stock_movement_id: input.stockMovementId } });
    if (!updated) {
      throw new AppError('NOT_FOUND', 'Stock movement not found.', 404, { id: input.stockMovementId });
    }

    return updated;
  },

  async getById(ctx, stockMovementId, runtime) {
    const data = runtime ?? ctx.data;
    const repo = await data.moduleData.getTable<EstoqueRecord>('stock_movements');
    const record = await repo.findOne({ where: { stock_movement_id: stockMovementId } });

    if (!record) {
      throw new AppError('NOT_FOUND', 'Stock movement not found.', 404, { id: stockMovementId });
    }

    return record;
  },

  async list(ctx, filter, runtime) {
    const data = runtime ?? ctx.data;
    const repo = await data.moduleData.getTable<EstoqueRecord>('stock_movements');
    const where: Partial<EstoqueRecord> = {};

    if (filter?.stockItemId) {
      where.stock_item_id = filter.stockItemId;
    }

    if (filter?.orderId) {
      where.order_id = filter.orderId;
    }

    if (filter?.movementType) {
      where.movement_type = filter.movementType;
    }

    const hasWhere = Object.keys(where).length > 0;

    return repo.findMany({
      where: hasWhere ? where : undefined,
      orderBy: { field: 'created_at', direction: 'desc' },
      limit: filter?.limit,
    });
  },
};
