/// <mls fileReference="_102043_/l1/cafeFlow/layer_3_usecases/abrirTurno-commands.defs.ts" enhancement="_blank"/>

export const abrirTurnoCommands = {
  "schemaVersion": "2026-06-06",
  "artifactType": "usecaseCommands",
  "artifactId": "abrirTurno",
  "moduleName": "cafeFlow",
  "status": "draft",
  "source": {
    "agentName": "agentPlanUsecaseDefinition",
    "stepId": 59,
    "planId": ""
  },
  "data": {
    "usecaseDefinition": {
      "usecaseId": "abrirTurno",
      "commands": [
        {
          "commandId": "abrirTurno",
          "input": [
            {
              "name": "turno",
              "type": "TurnoEntity",
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

export default abrirTurnoCommands;
