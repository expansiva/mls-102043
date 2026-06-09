/// <mls fileReference="_102043_/l1/cafeFlow/layer_3_usecases/usecaseGerarSugestoesPromocaoIA.defs.ts" enhancement="_blank"/>

export const usecaseGerarSugestoesPromocaoIAUsecasePlan = {
  "schemaVersion": "2026-06-06",
  "artifactType": "usecase",
  "artifactId": "usecaseGerarSugestoesPromocaoIA",
  "moduleName": "cafeFlow",
  "status": "draft",
  "source": {
    "agentName": "agentPlanUsecaseEntities",
    "stepId": 60,
    "planId": "plan-index-critic:usecasePlan:1"
  },
  "data": {
    "backendArchitecture": {
      "pattern": "layeredUsecaseDriven",
      "layer1Responsibility": "Definições de tabelas transacionais e de métricas (layer_1_external). Acesso direto apenas por layer_3_usecases.",
      "layer2Responsibility": "Controllers BFF que recebem comandos de páginas, workflows e agentes. Devem sempre delegar para usecases de layer_3.",
      "layer3Responsibility": "Usecases que encapsulam regras de negócio, leitura e escrita em tabelas de layer_1, e atualização de métricas."
    },
    "controllerRules": {
      "bffMustCallUsecases": true,
      "bffDirectTableAccessForbidden": true
    },
    "usecase": {
      "usecaseId": "usecaseGerarSugestoesPromocaoIA",
      "title": "Gerar Sugestões de Promoção (IA)",
      "purpose": "Sugerir itens do cardápio para promover com base no histórico de vendas dos últimos 7 dias.",
      "actor": "assistenteIA",
      "layer": "layer_3_usecases",
      "inputEntities": [
        "menuItemEntity",
        "salesSummaryEntity"
      ],
      "outputEntities": [
        "promotionSuggestionEntity"
      ],
      "readsTables": [
        {
          "tableName": "MenuItem",
          "ownership": "mdmOwned"
        },
        {
          "tableName": "top_selling_items_metrics",
          "ownership": "moduleOwned"
        },
        {
          "tableName": "sales_summary",
          "ownership": "moduleOwned"
        }
      ],
      "writesTables": [
        {
          "tableName": "promotion_suggestion",
          "ownership": "moduleOwned"
        }
      ],
      "commands": [
        "analyzeSellingTrends",
        "createPromotionSuggestion"
      ],
      "rulesApplied": []
    }
  },
  "implementation": {
    "functionName": "analyzeSellingTrends",
    "inputTypeName": "AnalyzeSellingTrendsInput",
    "outputTypeName": "AnalyzeSellingTrendsOutput",
    "inputTypeDefinition": "export interface AnalyzeSellingTrendsInput {\n  limit?: number;\n}",
    "outputTypeDefinition": "export interface AnalyzeSellingTrendsOutput {\n  trends: SellingTrend[];\n}"
  }
} as const;

export default usecaseGerarSugestoesPromocaoIAUsecasePlan;
