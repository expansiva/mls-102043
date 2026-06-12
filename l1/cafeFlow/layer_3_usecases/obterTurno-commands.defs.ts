/// <mls fileReference="_102043_/l1/cafeFlow/layer_3_usecases/obterTurno-commands.defs.ts" enhancement="_blank"/>

export const obterTurnoCommands = {
  "schemaVersion": "2026-06-06",
  "artifactType": "usecaseCommands",
  "artifactId": "obterTurno",
  "moduleName": "cafeFlow",
  "status": "draft",
  "source": {
    "agentName": "agentPlanUsecaseDefinition",
    "stepId": 58,
    "planId": ""
  },
  "data": {
    "usecaseDefinition": {
      "usecaseId": "obterTurno",
      "commands": [
        {
          "commandId": "obterTurno",
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

export default obterTurnoCommands;
