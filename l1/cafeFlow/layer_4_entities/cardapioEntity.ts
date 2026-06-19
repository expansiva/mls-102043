/// <mls fileReference="_102043_/l1/cafeFlow/layer_4_entities/cardapioEntity.ts" enhancement="_blank"/>
import { AppError, type RequestContext } from '/_102034_/l1/server/layer_2_controllers/contracts.js';
import type { IDataRuntime } from '/_102034_/l1/server/layer_1_external/data/runtime.js';
import type { MdmDocumentRecord } from '/_102034_/l1/mdm/module.js';

export interface CardapioRecord {
  menuItemId: string;
  name: string;
  description?: string | null;
  price: number;
  menuCategoryId: string;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}

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
  mdmIds?: string[];
  limit?: number;
}

export interface ICardapioEntity {
  create(ctx: RequestContext, input: CreateCardapioInput, runtime?: IDataRuntime): Promise<CardapioRecord>;
  getById(ctx: RequestContext, menuItemId: string, runtime?: IDataRuntime): Promise<CardapioRecord>;
  list(ctx: RequestContext, filter?: ListCardapioFilter, runtime?: IDataRuntime): Promise<CardapioRecord[]>;
  update(ctx: RequestContext, input: UpdateCardapioInput, runtime?: IDataRuntime): Promise<CardapioRecord>;
}

const buildCardapioRecord = (document: MdmDocumentRecord): CardapioRecord => {
  const details = (document.details ?? {}) as Partial<CardapioRecord>;

  return {
    menuItemId: details.menuItemId ?? document.mdmId,
    name: details.name ?? '',
    description: details.description ?? null,
    price: details.price ?? 0,
    menuCategoryId: details.menuCategoryId ?? '',
    isActive: details.isActive ?? false,
    createdAt: details.createdAt ?? '',
    updatedAt: details.updatedAt ?? '',
  };
};

const getMenuItemDocument = async (data: IDataRuntime, menuItemId: string): Promise<MdmDocumentRecord> => {
  const document = await data.mdmDocument.get({ mdmId: menuItemId });

  if (!document) {
    throw new AppError('NOT_FOUND', 'Menu item not found.', 404, { id: menuItemId });
  }

  return document;
};

export const CardapioEntity: ICardapioEntity = {
  async create(ctx, input, runtime) {
    void input;
    void runtime;
    throw new AppError(
      'NOT_SUPPORTED',
      'Menu items are managed by the shared MDM module. Use the MDM usecases to create MenuItem records.',
      400,
    );
  },

  async getById(ctx, menuItemId, runtime) {
    const data = runtime ?? ctx.data;
    const document = await getMenuItemDocument(data, menuItemId);
    return buildCardapioRecord(document);
  },

  async list(ctx, filter, runtime) {
    const data = runtime ?? ctx.data;
    const mdmIds = filter?.mdmIds ?? [];

    if (mdmIds.length > 0) {
      const documents = await data.mdmDocument.getMany({ mdmIds });
      return documents.map((document) => buildCardapioRecord(document));
    }

    const indexRecords = await data.mdmEntityIndex.findMany({
      orderBy: { field: 'createdAt', direction: 'desc' },
      limit: filter?.limit,
    });
    const documentIds = indexRecords.map((record) => record.mdmId);

    if (documentIds.length === 0) {
      return [];
    }

    const documents = await data.mdmDocument.getMany({ mdmIds: documentIds });
    const documentMap = new Map(documents.map((document) => [document.mdmId, document]));

    return documentIds
      .map((mdmId) => documentMap.get(mdmId))
      .filter((document): document is MdmDocumentRecord => Boolean(document))
      .map((document) => buildCardapioRecord(document));
  },

  async update(ctx, input, runtime) {
    void input;
    void runtime;
    throw new AppError(
      'NOT_SUPPORTED',
      'Menu items are managed by the shared MDM module. Use the MDM usecases to update MenuItem records.',
      400,
    );
  },
};
