/// <mls fileReference="_102043_/l5/notifications/module.defs.ts" enhancement="_blank"/>

export const notificationsModulePlan = {
  "schemaVersion": "2026-06-06",
  "artifactType": "horizontalModule",
  "artifactId": "notifications",
  "moduleName": "notifications",
  "status": "draft",
  "source": {
    "agentName": "agentPlanHorizontals",
    "stepId": 15,
    "planId": "plan-horizontals"
  },
  "data": {
    "kind": "horizontal",
    "moduleId": "notifications",
    "horizontalModuleId": "notifications",
    "plannedByModule": "cafeFlow",
    "referencesExisting": false,
    "module": {
      "horizontalModuleId": "notifications",
      "priority": "soon",
      "reason": "Alertas de estoque baixo e avisos operacionais precisam de comunicação ao gerente conforme workflow de alerta.",
      "reusedOntologyRefs": [],
      "consumedByArtifacts": [
        "lowStockAlertWorkflow"
      ],
      "decidedPriority": "soon"
    }
  }
} as const;

export default notificationsModulePlan;
