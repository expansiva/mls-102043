/// <mls fileReference="_102043_/l1/cafeFlow/layer_3_usecases/listarCategoriasCardapio.ts" enhancement="_blank"/>
import { AppError, type RequestContext } from '/_102034_/l1/server/layer_2_controllers/contracts.js';

export interface ListarCategoriasCardapioInput {}

export interface ListarCategoriasCardapioOutput {
  categorias: MenuCategory[];
}

export async function listarCategoriasCardapio(
  _ctx: RequestContext,
  _input: ListarCategoriasCardapioInput
): Promise<ListarCategoriasCardapioOutput> {
  throw new AppError(
    'CONFLICT',
    'Planning error: MenuCategory table is read but no owning entity is provided in entityRefs for listarCategoriasCardapio.',
    409,
    { table: 'MenuCategory', usecaseId: 'listarCategoriasCardapio' }
  );
}
