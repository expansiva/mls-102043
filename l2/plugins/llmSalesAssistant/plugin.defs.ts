/// <mls fileReference="_102043_/l2/plugins/llmSalesAssistant/plugin.defs.ts" enhancement="_blank"/>

export const llmSalesAssistantPluginPlan = {
  "schemaVersion": "2026-06-06",
  "artifactType": "pluginDraft",
  "artifactId": "llmSalesAssistant",
  "moduleName": "cafeFlow",
  "status": "draft",
  "source": {
    "agentName": "agentPlanPlugins",
    "stepId": 16,
    "planId": "plan-plugins"
  },
  "data": {
    "plugin": {
      "pluginId": "llmSalesAssistant",
      "provider": "Llm Sales Assistant",
      "priority": "soon",
      "reason": "Necessário para executar o assistente IA de vendas previsto para a fase soon.",
      "events": [],
      "requiredCredentials": [],
      "inputData": [
        "Resumo diário de vendas",
        "Itens mais vendidos (últimos 7 dias)",
        "Dados de estoque e promoções ativas (se aplicável)"
      ],
      "outputData": [
        "Resumo de vendas",
        "Sugestões de promoção",
        "Insights de desempenho"
      ],
      "webhooks": [],
      "risks": [
        "Dependência de decisão do cliente sobre uso de IA e proxy de LLM."
      ],
      "questions": [
        "Qual provedor/endpoint do proxy de LLM deve ser usado e quais limites de uso estão previstos?"
      ],
      "resolution": "create_draft",
      "pluginDefsFileRef": "_102043_/l2/plugins/llmSalesAssistant/plugin.defs.ts",
      "moduleConnectionDefsFileRef": "_102043_/l2/cafeFlow/plugins/llmSalesAssistant.defs.ts"
    }
  }
} as const;

export default llmSalesAssistantPluginPlan;
