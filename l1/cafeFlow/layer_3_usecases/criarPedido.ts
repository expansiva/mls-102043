/// <mls fileReference="_102043_/l1/cafeFlow/layer_3_usecases/criarPedido.ts" enhancement="_blank"/>
import { AppError, type RequestContext } from '/_102034_/l1/server/layer_2_controllers/contracts.js';
import { CardapioEntity, type CardapioRecord } from '/_102043_/l1/cafeFlow/layer_4_entities/cardapioEntity.js';
import { MetricasEntity } from '/_102043_/l1/cafeFlow/layer_4_entities/metricasEntity.js';
import { PedidoEntity, type CreatePedidoInput, type PedidoRecord } from '/_102043_/l1/cafeFlow/layer_4_entities/pedidoEntity.js';

export interface CriarPedidoInput {
  pedido: CreatePedidoInput;
  itens: CardapioRecord[];
}

export interface CriarPedidoOutput {
  pedido: PedidoRecord;
}

export async function criarPedido(ctx: RequestContext, input: CriarPedidoInput): Promise<CriarPedidoOutput> {
  if (!input.itens || input.itens.length === 0) {
    throw new AppError('VALIDATION_ERROR', 'orderRequiresItem: Pedido deve ter itens.', 400, {
      ruleId: 'orderRequiresItem',
    });
  }

  for (const item of input.itens) {
    const menuItem = await CardapioEntity.getById(ctx, item.menuItemId);
    if (!menuItem.isActive) {
      throw new AppError('VALIDATION_ERROR', 'Item do cardápio inativo.', 400, {
        menuItemId: menuItem.menuItemId,
      });
    }
  }

  const pedido = await ctx.data.runInTransaction(async (tx) => {
    const criado = await PedidoEntity.create(ctx, input.pedido, tx);

    await MetricasEntity.update(
      ctx,
      {
        tableName: 'daily_sales_metrics',
        record: {
          orderId: criado.order_id,
          totalItems: input.itens.length,
        },
      },
      tx,
    );

    await MetricasEntity.update(
      ctx,
      {
        tableName: 'top_selling_items_metrics',
        record: {
          orderId: criado.order_id,
          items: input.itens.map((item) => item.menuItemId),
        },
      },
      tx,
    );

    return criado;
  });

  return { pedido };
}
