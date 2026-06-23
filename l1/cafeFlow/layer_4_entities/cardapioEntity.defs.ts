/// <mls fileReference="_102043_/l1/cafeFlow/layer_4_entities/cardapioEntity.defs.ts" enhancement="_blank"/>

export const entity = {
  "entityId": "cardapioEntity",
  "title": "Entidade de caso de uso: Cardápio",
  "purpose": "Gerenciar itens e categorias do cardápio.",
  "layer": "layer_4_entities",
  "fields": [
    {
      "fieldId": "menuItemId",
      "type": "uuid",
      "required": true,
      "description": "Identificador único do item do cardápio."
    },
    {
      "fieldId": "name",
      "type": "string",
      "required": true,
      "description": "Nome do item do cardápio."
    },
    {
      "fieldId": "description",
      "type": "text",
      "required": false,
      "description": "Descrição do item do cardápio."
    },
    {
      "fieldId": "price",
      "type": "money",
      "required": true,
      "description": "Preço de venda do item do cardápio."
    },
    {
      "fieldId": "menuCategoryId",
      "type": "MenuCategory",
      "required": true,
      "description": "Categoria à qual o item do cardápio pertence."
    },
    {
      "fieldId": "isActive",
      "type": "boolean",
      "required": true,
      "description": "Indica se o item do cardápio está ativo para venda."
    },
    {
      "fieldId": "createdAt",
      "type": "datetime",
      "required": true,
      "description": "Data e hora de criação do item do cardápio."
    },
    {
      "fieldId": "updatedAt",
      "type": "datetime",
      "required": true,
      "description": "Data e hora da última atualização do item do cardápio."
    }
  ],
  "sourceTables": [
    {
      "tableName": "MenuItem",
      "ownership": "mdmOwned"
    },
    {
      "tableName": "MenuCategory",
      "ownership": "mdmOwned"
    }
  ],
  "storage": [
    {
      "kind": "mdm",
      "moduleRef": "102034",
      "entity": "MenuItem",
      "domainId": "menu",
      "sourceOfTruth": "102034",
      "governanceRules": [
        "Todo item do cardápio deve estar associado a uma categoria ativa (regra menuItemRequiresCategory).",
        "Apenas o ator gerente pode criar, editar ou inativar itens e categorias do cardápio.",
        "Itens inativados não devem aparecer no POS para novos pedidos."
      ]
    },
    {
      "kind": "mdm",
      "moduleRef": "102034",
      "entity": "MenuCategory",
      "domainId": "menu",
      "sourceOfTruth": "102034",
      "governanceRules": [
        "Todo item do cardápio deve estar associado a uma categoria ativa (regra menuItemRequiresCategory).",
        "Apenas o ator gerente pode criar, editar ou inativar itens e categorias do cardápio.",
        "Itens inativados não devem aparecer no POS para novos pedidos."
      ]
    }
  ],
  "allowedOperations": [
    "create",
    "update",
    "read",
    "list"
  ],
  "rulesApplied": [
    "menuItemRequiresCategory"
  ],
  "usecaseRefs": [
    "criarPedido",
    "criarOuAtualizarItemCardapio",
    "listarItensCardapio",
    "listarCategoriasCardapio"
  ],
  "materialization": {
    "fileName": "layer_4_entities/CardapioEntity.ts",
    "className": "CardapioEntity",
    "contractName": "ICardapioEntity"
  }
} as const;

export default entity;

export const pipeline = [
  {
    "id": "cardapioEntity__layer_4_entities",
    "type": "layer_4_entities",
    "outputPath": "_102043_/l1/cafeFlow/layer_4_entities/cardapioEntity.ts",
    "defPath": "_102043_/l1/cafeFlow/layer_4_entities/cardapioEntity.defs.ts",
    "dependsFiles": [],
    "dependsOn": [],
    "skills": [
      "_102021_/l2/skills/layer_4.md",
      "_102034_.d.ts"
    ],
    "rulesPath": "_102043_/l5/cafeFlow/rules.defs.ts",
    "rulesApplied": [
      "menuItemRequiresCategory"
    ],
    "agent": "agentMaterializeGen"
  }
] as const;
