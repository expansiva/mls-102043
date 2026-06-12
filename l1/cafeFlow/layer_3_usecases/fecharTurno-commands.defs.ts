/// <mls fileReference="_102043_/l1/cafeFlow/layer_3_usecases/fecharTurno-commands.defs.ts" enhancement="_blank"/>

export const fecharTurnoCommands = {
  "schemaVersion": "2026-06-06",
  "artifactType": "usecaseCommands",
  "artifactId": "fecharTurno",
  "moduleName": "cafeFlow",
  "status": "draft",
  "source": {
    "agentName": "agentPlanUsecaseDefinition",
    "stepId": 61,
    "planId": ""
  },
  "data": {
    "usecaseDefinition": {
      "usecaseId": "fecharTurno",
      "commands": [
        {
          "commandId": "fecharTurno",
          "input": [
            {
              "name": "turnoId",
              "type": "string",
              "required": true
            }
          ],
          "output": [
            {
              "name": "turno",
              "type": "TurnoEntity"
            }
          ]
        }
      ]
    }
  }
} as const;

export default fecharTurnoCommands;
