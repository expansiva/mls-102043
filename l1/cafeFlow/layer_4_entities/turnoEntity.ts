/// <mls fileReference="_102043_/l1/cafeFlow/layer_4_entities/turnoEntity.ts" enhancement="_blank" />
import { AppError, type RequestContext } from '/_102034_/l1/server/layer_2_controllers/contracts.js';
import type { IDataRuntime } from '/_102034_/l1/server/layer_1_external/data/runtime.js';

export type TurnoStatus = 'aberto' | 'emFechamento' | 'fechado';

export interface TurnoRecord {
  shift_id: string;
  shift_config_id: string;
  status: TurnoStatus;
  opened_at: string;
  closed_at?: string | null;
  created_at: string;
  updated_at: string;
}

export interface CreateTurnoInput {
  shiftConfigId: string;
  status: TurnoStatus;
  openedAt: string;
  closedAt?: string | null;
}

export interface UpdateTurnoInput {
  shiftId: string;
  patch: {
    shiftConfigId?: string;
    status?: TurnoStatus;
    openedAt?: string;
    closedAt?: string | null;
  };
}

export interface ListTurnoFilter {
  status?: TurnoStatus;
  shiftConfigId?: string;
}

export interface ITurnoEntity {
  create(ctx: RequestContext, input: CreateTurnoInput, runtime?: IDataRuntime): Promise<TurnoRecord>;
  getById(ctx: RequestContext, shiftId: string, runtime?: IDataRuntime): Promise<TurnoRecord>;
  update(ctx: RequestContext, input: UpdateTurnoInput, runtime?: IDataRuntime): Promise<TurnoRecord>;
  list(ctx: RequestContext, filter?: ListTurnoFilter, runtime?: IDataRuntime): Promise<TurnoRecord[]>;
}

export const TurnoEntity: ITurnoEntity = {
  async create(ctx, input, runtime) {
    const data = runtime ?? ctx.data;
    const repo = await data.moduleData.getTable<TurnoRecord>('shifts');
    const now = ctx.clock.nowIso();
    const record: TurnoRecord = {
      shift_id: ctx.idGenerator.newId(),
      shift_config_id: input.shiftConfigId,
      status: input.status,
      opened_at: input.openedAt,
      closed_at: input.closedAt ?? null,
      created_at: now,
      updated_at: now,
    };
    await repo.insert({ record });
    return record;
  },

  async getById(ctx, shiftId, runtime) {
    const data = runtime ?? ctx.data;
    const repo = await data.moduleData.getTable<TurnoRecord>('shifts');
    const record = await repo.findOne({ where: { shift_id: shiftId } });
    if (!record) {
      throw new AppError('NOT_FOUND', 'Turno não encontrado.', 404, { id: shiftId });
    }
    return record;
  },

  async update(ctx, input, runtime) {
    const data = runtime ?? ctx.data;
    const repo = await data.moduleData.getTable<TurnoRecord>('shifts');
    const current = await repo.findOne({ where: { shift_id: input.shiftId } });
    if (!current) {
      throw new AppError('NOT_FOUND', 'Turno não encontrado.', 404, { id: input.shiftId });
    }
    const now = ctx.clock.nowIso();
    const patch: Partial<TurnoRecord> = {
      updated_at: now,
    };
    if (input.patch.shiftConfigId !== undefined) {
      patch.shift_config_id = input.patch.shiftConfigId;
    }
    if (input.patch.status !== undefined) {
      patch.status = input.patch.status;
    }
    if (input.patch.openedAt !== undefined) {
      patch.opened_at = input.patch.openedAt;
    }
    if (input.patch.closedAt !== undefined) {
      patch.closed_at = input.patch.closedAt;
    }
    await repo.update({ where: { shift_id: input.shiftId }, patch });
    const updated = await repo.findOne({ where: { shift_id: input.shiftId } });
    if (!updated) {
      throw new AppError('NOT_FOUND', 'Turno não encontrado.', 404, { id: input.shiftId });
    }
    return updated;
  },

  async list(ctx, filter, runtime) {
    const data = runtime ?? ctx.data;
    const repo = await data.moduleData.getTable<TurnoRecord>('shifts');
    const where: Partial<TurnoRecord> = {};
    if (filter?.status) {
      where.status = filter.status;
    }
    if (filter?.shiftConfigId) {
      where.shift_config_id = filter.shiftConfigId;
    }
    const hasFilter = Object.keys(where).length > 0;
    return repo.findMany({
      where: hasFilter ? where : undefined,
      orderBy: { field: 'created_at', direction: 'desc' },
    });
  },
};
