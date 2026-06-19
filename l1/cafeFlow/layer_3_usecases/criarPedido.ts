/// <mls fileReference="_102043_/l1/cafeFlow/layer_3_usecases/criarPedido.ts" enhancement="_blank"/>
import { AppError, type RequestContext } from '/_102034_/l1/server/layer_2_controllers/contracts.js';
import { CardapioEntity, type CardapioRecord } from '/_102043_/l1/cafeFlow/layer_4_entities/cardapioEntity.js';
import { MetricasEntity } from '/_102043_/l1/cafeFlow/layer_4_entities/metricasEntity.js';
import {
  PedidoEntity,
  type CreatePedidoInput,
  type PedidoRecord,
} from '/_102043_/l1/cafeFlow/layer_4_entities/pedidoEntity.js';

export interface CriarPedidoInput {
  pedido: CreatePedidoInput;
  itens: CardapioRecord[];
}

export interface CriarPedidoOutput {
  pedido: PedidoRecord;
}

export async function criarPedido(
  ctx: RequestContext,
  input: CriarPedidoInput,
): Promise<CriarPedidoOutput> {
  if (!input.itens || input.itens.length === 0) {
    throw new AppError(
      'VALIDATION_ERROR',
      'orderRequiresItem: Pedido deve ter itens.',
      400,
      { ruleId: 'orderRequiresItem' },
    );
  }

  const itemIds = input.itens.map((item) => item.menuItemId);
  const menuItems = await CardapioEntity.list(ctx, { mdmIds: itemIds });
  const returnedIds = new Set(menuItems.map((item) => item.menuItemId));
  const missingItemIds = itemIds.filter((id) => !returnedIds.has(id));
  if (missingItemIds.length > 0) {
    throw new AppError(
      'VALIDATION_ERROR',
      'Itens do cardápio inválidos para o pedido.',
      400,
      { missingItemIds },
    );
  }

  const inactiveItems = menuItems.filter((item) => !item.isActive);
  if (inactiveItems.length > 0) {
    throw new AppError(
      'VALIDATION_ERROR',
      'Itens do cardápio inativos não podem ser pedidos.',
      400,
      { inactiveItemIds: inactiveItems.map((item) => item.menuItemId) },
    );
  }

  const pedido = await ctx.data.runInTransaction(async (tx) => {
    const created = await PedidoEntity.create(ctx, input.pedido, tx);
    const now = new Date().toISOString();

    await MetricasEntity.update(
      ctx,
      {
        tableName: 'daily_sales_metrics',
        record: {
          orderId: created.order_id,
          totalItems: itemIds.length,
          createdAt: now,
        },
      },
      tx,
    );

    await MetricasEntity.update(
      ctx,
      {
        tableName: 'top_selling_items_metrics',
        record: {
          orderId: created.order_id,
          itemIds,
          createdAt: now,
        },
      },
      tx,
    );

    return created;
  });

  return { pedido };
}
