/// <mls fileReference="_102043_/l1/cafeFlow/layer_4_entities/CardapioEntity.defs.ts" enhancement="_blank"/>

export const entity = {
  "entityId": "CardapioEntity",
  "title": "Entidade de Cardápio",
  "purpose": "Agrega categorias do cardápio, ingredientes dos itens e referências aos itens MDM.",
  "layer": "layer_4_entities",
  "fields": [
    {
      "fieldId": "menuCategoryId",
      "type": "uuid",
      "required": true,
      "description": "Identificador único da categoria"
    },
    {
      "fieldId": "name",
      "type": "string",
      "required": true,
      "description": "Nome da categoria exibido no POS"
    },
    {
      "fieldId": "description",
      "type": "text",
      "required": false,
      "description": "Descrição opcional da categoria"
    },
    {
      "fieldId": "sortOrder",
      "type": "number",
      "required": false,
      "description": "Ordem de exibição no POS (menor valor aparece primeiro)"
    },
    {
      "fieldId": "color",
      "type": "string",
      "required": false,
      "description": "Cor hexadecimal para identificação visual no POS"
    },
    {
      "fieldId": "isActive",
      "type": "boolean",
      "required": true,
      "description": "Indica se a categoria está ativa e visível no cardápio"
    },
    {
      "fieldId": "createdAt",
      "type": "datetime",
      "required": true,
      "description": "Data e hora de criação do registro"
    },
    {
      "fieldId": "updatedAt",
      "type": "datetime",
      "required": true,
      "description": "Data e hora da última atualização do registro"
    }
  ],
  "sourceTables": [
    {
      "tableName": "menu_category",
      "ownership": "moduleOwned"
    },
    {
      "tableName": "menu_item_ingredient",
      "ownership": "moduleOwned"
    },
    {
      "tableName": "menu_item",
      "ownership": "mdmOwned"
    }
  ],
  "storage": [
    {
      "kind": "moduleTable",
      "tableId": "menuCategory",
      "tableName": "menu_category",
      "fileRef": "_102043_/l1/cafeFlow/layer_1_external/menuCategory.defs.ts"
    },
    {
      "kind": "moduleTable",
      "tableId": "menuItemIngredient",
      "tableName": "menu_item_ingredient",
      "fileRef": "_102043_/l1/cafeFlow/layer_1_external/menuItemIngredient.defs.ts"
    },
    {
      "kind": "mdm",
      "moduleRef": "102034",
      "entity": "MenuItem",
      "domainId": "menuItem",
      "sourceOfTruth": "102034",
      "governanceRules": [
        "Criação, edição e desativação de itens do cardápio são restritas ao ator gerente.",
        "Todo item do cardápio deve estar vinculado a uma categoria ativa do cardápio.",
        "Mudanças de preço e composição de ingredientes são auditadas pela infraestrutura MDM compartilhada."
      ]
    }
  ],
  "allowedOperations": [
    "create",
    "read",
    "update",
    "delete",
    "list",
    "search"
  ],
  "rulesApplied": [],
  "usecaseRefs": [
    "adicionarItemPedido",
    "criarCategoriaCardapio",
    "atualizarCategoriaCardapio",
    "excluirCategoriaCardapio",
    "listarCategoriasCardapio",
    "criarIngredienteItemCardapio",
    "atualizarIngredienteItemCardapio",
    "excluirIngredienteItemCardapio",
    "listarIngredientesItemCardapio",
    "listarItensCardapioMdm"
  ],
  "materialization": {
    "fileName": "layer_4_entities/CardapioEntity.ts",
    "className": "CardapioEntity",
    "contractName": "ICardapioEntity"
  }
} as const;

export default entity;
