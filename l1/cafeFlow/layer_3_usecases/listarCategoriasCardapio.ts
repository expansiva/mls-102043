/// <mls fileReference="_102043_/l1/cafeFlow/layer_3_usecases/listarCategoriasCardapio.ts" enhancement="_blank"/>
import { AppError, type RequestContext } from '/_102034_/l1/server/layer_2_controllers/contracts.js';

// GAP: MenuCategory type is missing from layer_4 entity references for MenuCategory table.
type MenuCategory = never;

export interface ListarCategoriasCardapioInput {}

export interface ListarCategoriasCardapioOutput {
  categorias: MenuCategory[];
}

export async function listarCategoriasCardapio(
  ctx: RequestContext,
  input: ListarCategoriasCardapioInput,
): Promise<ListarCategoriasCardapioOutput> {
  void ctx;
  void input;
  throw new AppError(
    'CONFLICT',
    'Missing entity reference for MenuCategory table in listarCategoriasCardapio usecase.',
    409,
    {
      table: 'MenuCategory',
      usecaseId: 'listarCategoriasCardapio',
    },
  );
}
