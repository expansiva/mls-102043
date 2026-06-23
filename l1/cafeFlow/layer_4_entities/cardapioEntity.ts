/// <mls fileReference="_102043_/l1/cafeFlow/layer_4_entities/cardapioEntity.ts" enhancement="_blank"/>
import { AppError, type RequestContext } from '/_102034_/l1/server/layer_2_controllers/contracts.js';
import type { IDataRuntime } from '/_102034_/l1/server/layer_1_external/data/runtime.js';

export type CardapioRecord = {
  menuItemId: string;
  name: string;
  description?: string | null;
  price: number;
  menuCategoryId: string;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
};

export interface CreateCardapioInput {
  name: string;
  description?: string | null;
  price: number;
  menuCategoryId: string;
  isActive: boolean;
}

export interface UpdateCardapioInput {
  menuItemId: string;
  patch: Partial<Pick<CardapioRecord, 'name' | 'description' | 'price' | 'menuCategoryId' | 'isActive'>>;
}

export interface ListCardapioFilter {
  menuCategoryId?: string;
  isActive?: boolean;
}

export interface ICardapioEntity {
  create(ctx: RequestContext, input: CreateCardapioInput, runtime?: IDataRuntime): Promise<CardapioRecord>;
  update(ctx: RequestContext, input: UpdateCardapioInput, runtime?: IDataRuntime): Promise<CardapioRecord>;
  getById(ctx: RequestContext, menuItemId: string, runtime?: IDataRuntime): Promise<CardapioRecord>;
  list(ctx: RequestContext, filter?: ListCardapioFilter, runtime?: IDataRuntime): Promise<CardapioRecord[]>;
}

const mapMenuItemDetails = (details: Record<string, unknown>, index?: { createdAt?: string; updatedAt?: string }, mdmId?: string): CardapioRecord => {
  return {
    menuItemId: (details.menuItemId as string) ?? (mdmId ?? ''),
    name: details.name as string,
    description: (details.description as string | null | undefined) ?? null,
    price: details.price as number,
    menuCategoryId: details.menuCategoryId as string,
    isActive: details.isActive as boolean,
    createdAt: (details.createdAt as string) ?? index?.createdAt ?? '',
    updatedAt: (details.updatedAt as string) ?? index?.updatedAt ?? '',
  };
};

const assertNoMdmWrite = (): never => {
  throw new AppError(
    'UNSUPPORTED_OPERATION',
    'Operações de escrita no cardápio devem ser executadas via casos de uso do MDM (102034).',
    400,
  );
};

export const CardapioEntity: ICardapioEntity = {
  async create(_ctx, _input, _runtime) {
    return assertNoMdmWrite();
  },

  async update(_ctx, _input, _runtime) {
    return assertNoMdmWrite();
  },

  async getById(ctx, menuItemId, runtime) {
    const data = runtime ?? ctx.data;
    const index = await data.mdmEntityIndex.findOne({ where: { mdmId: menuItemId } });

    if (!index) {
      throw new AppError('NOT_FOUND', 'Item do cardápio não encontrado.', 404, { id: menuItemId });
    }

    const document = await data.mdmDocument.get({ mdmId: menuItemId });

    if (!document) {
      throw new AppError('NOT_FOUND', 'Item do cardápio não encontrado.', 404, { id: menuItemId });
    }

    return mapMenuItemDetails(document.details as Record<string, unknown>, index, menuItemId);
  },

  async list(ctx, _filter, runtime) {
    const data = runtime ?? ctx.data;
    const indexes = await data.mdmEntityIndex.findMany({
      where: { subtype: 'MenuItem' as unknown as never },
      orderBy: { field: 'createdAt', direction: 'desc' },
    });

    if (indexes.length === 0) {
      return [];
    }

    const documents = await data.mdmDocument.getMany({ mdmIds: indexes.map((item) => item.mdmId) });
    const documentById = new Map(documents.map((doc) => [doc.mdmId, doc]));

    return indexes
      .map((index) => {
        const document = documentById.get(index.mdmId);
        if (!document) {
          return null;
        }
        return mapMenuItemDetails(document.details as Record<string, unknown>, index, index.mdmId);
      })
      .filter((record): record is CardapioRecord => Boolean(record));
  },
};
