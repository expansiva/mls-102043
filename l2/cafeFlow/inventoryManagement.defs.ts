/// <mls fileReference="_102043_/l2/cafeFlow/inventoryManagement.defs.ts" enhancement="_blank"/>

export const inventoryManagementPagePlan = {
  "schemaVersion": "2026-06-06",
  "artifactType": "page",
  "artifactId": "inventoryManagement",
  "moduleName": "cafeFlow",
  "status": "draft",
  "source": {
    "agentName": "agentPlanPageDefinition",
    "stepId": 83,
    "planId": ""
  },
  "data": {
    "pageDefinition": {
      "pageId": "inventoryManagement",
      "pageName": "Gerenciar Estoque de Ingredientes",
      "actor": "gerente",
      "purpose": "Ajustar quantidades e níveis mínimos de estoque por ingrediente.",
      "capabilities": [
        "gerenciarEstoqueIngredientes"
      ],
      "flowRefs": {
        "experienceFlows": [],
        "entityLifecycles": [],
        "taskWorkflows": [],
        "automations": [
          "lowStockAlert"
        ]
      },
      "pluginRefs": [],
      "mdmRefs": [
        "ingredient"
      ],
      "pageInputs": [],
      "navigationRefs": [
        {
          "direction": "inbound",
          "pageId": "menuManagement",
          "trigger": "ajuste de ingredientes requerido"
        },
        {
          "direction": "outbound",
          "pageId": "dashboardMetricasGerente",
          "trigger": "ver alertas e métricas"
        }
      ],
      "sections": [
        {
          "sectionName": "Lista de ingredientes em estoque",
          "mode": "view",
          "organisms": [
            {
              "organismName": "tabelaEstoqueIngredientes",
              "purpose": "Exibir ingredientes com quantidade atual e nível mínimo para ajuste.",
              "userActions": [
                "selecionarIngrediente",
                "editarQuantidade",
                "editarNivelMinimo"
              ],
              "requiredEntities": [
                "ingredientEntity",
                "stockItemEntity"
              ],
              "readsFields": [
                "ingredientEntity.ingredientId",
                "ingredientEntity.name",
                "stockItemEntity.currentQuantity",
                "stockItemEntity.minLevel"
              ],
              "writesFields": [
                "stockItemEntity.currentQuantity",
                "stockItemEntity.minLevel"
              ],
              "rulesApplied": [
                "rule-low-stock-alert"
              ]
            }
          ]
        },
        {
          "sectionName": "Ajuste de estoque",
          "mode": "edit",
          "organisms": [
            {
              "organismName": "formAjusteEstoque",
              "purpose": "Registrar ajuste manual de quantidade e nível mínimo do ingrediente selecionado.",
              "userActions": [
                "confirmarAjuste",
                "cancelarAjuste"
              ],
              "requiredEntities": [
                "stockItemEntity",
                "ingredientEntity"
              ],
              "readsFields": [
                "ingredientEntity.ingredientId",
                "ingredientEntity.name",
                "stockItemEntity.currentQuantity",
                "stockItemEntity.minLevel"
              ],
              "writesFields": [
                "stockItemEntity.currentQuantity",
                "stockItemEntity.minLevel"
              ],
              "rulesApplied": [
                "rule-low-stock-alert"
              ]
            }
          ]
        }
      ]
    },
    "bffCommands": [
      {
        "commandName": "listIngredients",
        "purpose": "Listar ingredientes com estoque atual.",
        "kind": "query",
        "input": {
          "filters": {
            "searchText": "string?",
            "onlyLowStock": "boolean?",
            "limit": "number?",
            "offset": "number?"
          }
        },
        "output": {
          "items": [
            {
              "ingredientId": "string",
              "ingredientName": "string",
              "currentQuantity": "number",
              "minLevel": "number",
              "isLowStock": "boolean"
            }
          ],
          "total": "number"
        },
        "readsEntities": [
          "ingredientEntity",
          "stockItemEntity"
        ],
        "writesEntities": [],
        "readsTables": [],
        "writesTables": [],
        "usecaseRefs": [
          "usecaseAjustarEstoque"
        ],
        "layerContract": {
          "controllerLayer": "layer_2_controllers",
          "mustCallLayer": "layer_3_usecases",
          "directTableAccessForbidden": true
        },
        "rulesApplied": [
          "rule-low-stock-alert"
        ]
      },
      {
        "commandName": "updateIngredientStock",
        "purpose": "Atualizar estoque manualmente.",
        "kind": "command",
        "input": {
          "ingredientId": "string",
          "currentQuantity": "number?",
          "minLevel": "number?"
        },
        "output": {
          "stockItem": {
            "ingredientId": "string",
            "currentQuantity": "number",
            "minLevel": "number",
            "isLowStock": "boolean",
            "updatedAt": "string"
          }
        },
        "readsEntities": [
          "ingredientEntity",
          "stockItemEntity"
        ],
        "writesEntities": [
          "stockItemEntity"
        ],
        "readsTables": [],
        "writesTables": [],
        "usecaseRefs": [
          "usecaseAjustarEstoque"
        ],
        "layerContract": {
          "controllerLayer": "layer_2_controllers",
          "mustCallLayer": "layer_3_usecases",
          "directTableAccessForbidden": true
        },
        "rulesApplied": [
          "rule-low-stock-alert"
        ]
      }
    ]
  }
} as const;

export default inventoryManagementPagePlan;
