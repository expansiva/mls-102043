/// <mls fileReference="_102043_/l5/dailyShift/module.defs.ts" enhancement="_blank"/>

export const dailyShiftMdmModulePlan = {
  "schemaVersion": "2026-06-06",
  "artifactType": "mdmDomain",
  "artifactId": "dailyShift",
  "moduleName": "dailyShift",
  "status": "draft",
  "source": {
    "agentName": "agentPlanMDM",
    "stepId": 12,
    "planId": "plan-mdm"
  },
  "data": {
    "kind": "mdm",
    "moduleId": "dailyShift",
    "domainId": "dailyShift",
    "plannedByModule": "cafeFlow",
    "referencesExisting": false,
    "domain": {
      "domainId": "dailyShift",
      "title": "Turno Diário",
      "masterEntities": [
        "DailyShift"
      ],
      "sourceOfTruth": "usecaseFecharTurno",
      "consumers": [
        "Order",
        "SalesSummary",
        "metricTableVendasDiarias",
        "relatorioFechamentoTurno",
        "workflowFechamentoTurno",
        "usecaseCalcularMetricasDashboard",
        "agenteResumoVendas"
      ],
      "governanceRules": [
        "rule-shift-close-required"
      ]
    }
  }
} as const;

export default dailyShiftMdmModulePlan;
