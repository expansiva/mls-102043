/// <mls fileReference="_102043_/l1/cafeFlow/layer_3_usecases/listarTurnos-commands.defs.ts" enhancement="_blank"/>

export const listarTurnosCommands = {
  "schemaVersion": "2026-06-06",
  "artifactType": "usecaseCommands",
  "artifactId": "listarTurnos",
  "moduleName": "cafeFlow",
  "status": "draft",
  "source": {
    "agentName": "agentPlanUsecaseDefinition",
    "stepId": 60,
    "planId": ""
  },
  "data": {
    "usecaseDefinition": {
      "usecaseId": "listarTurnos",
      "commands": [
        {
          "commandId": "listarTurnos",
          "input": [],
          "output": [
            {
              "name": "turnos",
              "type": "TurnoEntity[]"
            }
          ]
        }
      ]
    }
  }
} as const;

export default listarTurnosCommands;
