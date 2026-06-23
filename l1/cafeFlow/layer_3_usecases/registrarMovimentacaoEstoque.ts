/// <mls fileReference="_102043_/l1/cafeFlow/layer_3_usecases/registrarMovimentacaoEstoque.ts" enhancement="_blank"/>
import { AppError, type RequestContext } from '/_102034_/l1/server/layer_2_controllers/contracts.js';
import { EstoqueEntity, type StockMovementType } from '/_102043_/l1/cafeFlow/layer_4_entities/estoqueEntity.js';
import { MetricasEntity } from '/_102043_/l1/cafeFlow/layer_4_entities/metricasEntity.js';

export interface RegistrarMovimentacaoEstoqueInput {
  stockItemId: string;
  movementType: string;
  quantity: number;
  unitOfMeasureId: string;
  movementDate?: Date;
  reason?: string;
}

export interface RegistrarMovimentacaoEstoqueOutput {
  stockItemId: string;
  quantity: number;
}

export async function registrarMovimentacaoEstoque(
  ctx: RequestContext,
  input: RegistrarMovimentacaoEstoqueInput
): Promise<RegistrarMovimentacaoEstoqueOutput> {
  const missingTables = ['StockItem', 'UnitOfMeasure', 'low_stock_alerts'];

  throw new AppError(
    'CONFLICT',
    'Missing entity bindings for tables required by registrarMovimentacaoEstoque.',
    409,
    {
      missingTables,
      ruleId: 'lowStockThresholdRule'
    }
  );

  void ctx;
  void input;
  void EstoqueEntity;
  void MetricasEntity;
  void (null as unknown as StockMovementType);
}
