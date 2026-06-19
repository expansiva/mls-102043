/// <mls fileReference="_102043_/l1/cafeFlow/layer_3_usecases/registrarMovimentacaoEstoque.ts" enhancement="_blank"/>
import { AppError, type RequestContext } from '/_102034_/l1/server/layer_2_controllers/contracts.js';
import { EstoqueEntity, type EstoqueRecord } from '/_102043_/l1/cafeFlow/layer_4_entities/estoqueEntity.js';
import { MetricasEntity, type MetricasRecord } from '/_102043_/l1/cafeFlow/layer_4_entities/metricasEntity.js';

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
  void ctx;
  void input;
  void EstoqueEntity;
  void MetricasEntity;
  void (null as MetricasRecord | null);
  void (null as EstoqueRecord | null);

  throw new AppError(
    'CONFLICT',
    'Usecase registrarMovimentacaoEstoque requires entity refs for StockItem, UnitOfMeasure, and low_stock_alerts to satisfy reads/writes.',
    409,
    {
      ruleId: 'lowStockThresholdRule',
      missingEntities: ['StockItem', 'UnitOfMeasure', 'low_stock_alerts']
    }
  );
}
