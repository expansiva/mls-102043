/// <mls fileReference="_102043_/l2/cafeFlow/web/shared/cardapioEstoque.ts" enhancement="_102027_/l2/enhancementLit.ts" />
import { CollabLitElement } from '/_102029_/l2/collabLitElement.js';
import { property } from 'lit/decorators.js';
import type { AuraNormalizedError } from '/_102029_/l2/contracts/bootstrap.js';
import type { BffClientOptions } from '/_102029_/l2/bffClient.js';
import { execBff } from '/_102029_/l2/bffClient.js';
import {
  bindExpectedNavigationLoad,
  consumeExpectedNavigationLoad,
  runBlockingUiAction,
} from '/_102029_/l2/interactionRuntime.js';
import { subscribe, unsubscribe, getState, setState } from '/_102029_/l2/collabState.js';
import type {
  CardapioEstoqueListarItensCardapioInput,
  CardapioEstoqueListarItensCardapioOutputItem,
  CardapioEstoqueListarCategoriasCardapioInput,
  CardapioEstoqueListarCategoriasCardapioOutputItem,
  CardapioEstoqueCriarOuAtualizarItemCardapioInput,
  CardapioEstoqueCriarOuAtualizarItemCardapioOutput,
  CardapioEstoqueListarItensEstoqueInput,
  CardapioEstoqueListarItensEstoqueOutputItem,
  CardapioEstoqueCriarOuAtualizarItemEstoqueInput,
  CardapioEstoqueCriarOuAtualizarItemEstoqueOutput,
  CardapioEstoqueRegistrarMovimentacaoEstoqueInput,
  CardapioEstoqueRegistrarMovimentacaoEstoqueOutput,
  CardapioEstoqueListarMovimentacoesEstoqueInput,
  CardapioEstoqueListarMovimentacoesEstoqueOutputItem,
  CardapioEstoqueListarAlertasEstoqueBaixoInput,
  CardapioEstoqueListarAlertasEstoqueBaixoOutputItem,
} from '/_102043_/l2/cafeFlow/web/contracts/cardapioEstoque.js';

/// **collab_i18n_start**
const message_pt = {
  brand: 'Cafe Flow',
  pageTitle: 'Cardápio e estoque',
  loaded: 'Dados carregados',
  couldNotLoad: 'Nao foi possivel carregar',
  loadingListarItensCardapio: 'Carregando itens do cardápio',
  loadingListarCategoriasCardapio: 'Carregando categorias do cardápio',
  loadingListarItensEstoque: 'Carregando itens de estoque',
  loadingListarMovimentacoesEstoque: 'Carregando movimentações de estoque',
  loadingListarAlertasEstoqueBaixo: 'Carregando alertas de estoque baixo',
  criarOuAtualizarItemCardapioLabel: 'Salvar item do cardápio',
  criarOuAtualizarItemCardapioLoading: 'Salvando item do cardápio',
  couldNotCriarOuAtualizarItemCardapio: 'Não foi possível salvar item do cardápio',
  criarOuAtualizarItemEstoqueLabel: 'Salvar item de estoque',
  criarOuAtualizarItemEstoqueLoading: 'Salvando item de estoque',
  couldNotCriarOuAtualizarItemEstoque: 'Não foi possível salvar item de estoque',
  registrarMovimentacaoEstoqueLabel: 'Registrar movimentação de estoque',
  registrarMovimentacaoEstoqueLoading: 'Registrando movimentação de estoque',
  couldNotRegistrarMovimentacaoEstoque: 'Não foi possível registrar movimentação de estoque',
  navigateToDashboardGerente: 'Ver métricas de vendas/estoque',
};
const message_en = {
  brand: 'Cafe Flow',
  pageTitle: 'Menu and stock',
  loaded: 'Data loaded',
  couldNotLoad: 'Could not load',
  loadingListarItensCardapio: 'Loading menu items',
  loadingListarCategoriasCardapio: 'Loading menu categories',
  loadingListarItensEstoque: 'Loading stock items',
  loadingListarMovimentacoesEstoque: 'Loading stock movements',
  loadingListarAlertasEstoqueBaixo: 'Loading low stock alerts',
  criarOuAtualizarItemCardapioLabel: 'Save menu item',
  criarOuAtualizarItemCardapioLoading: 'Saving menu item',
  couldNotCriarOuAtualizarItemCardapio: 'Could not save menu item',
  criarOuAtualizarItemEstoqueLabel: 'Save stock item',
  criarOuAtualizarItemEstoqueLoading: 'Saving stock item',
  couldNotCriarOuAtualizarItemEstoque: 'Could not save stock item',
  registrarMovimentacaoEstoqueLabel: 'Record stock movement',
  registrarMovimentacaoEstoqueLoading: 'Recording stock movement',
  couldNotRegistrarMovimentacaoEstoque: 'Could not record stock movement',
  navigateToDashboardGerente: 'View sales/stock metrics',
};
type MessageType = typeof message_en;
const messages: { [key: string]: MessageType } = { en: message_en, pt: message_pt };
/// **collab_i18n_end**

export class CardapioEstoqueBase extends CollabLitElement {
  private readonly _stateKeys = [
    'ui.cardapioEstoque.itensCardapio',
    'ui.cardapioEstoque.categoriasCardapio',
    'ui.cardapioEstoque.itensEstoque',
    'ui.cardapioEstoque.movimentacoesEstoque',
    'ui.cardapioEstoque.alertasEstoqueBaixo',
    'ui.cardapioEstoque.criarOuAtualizarItemCardapio',
    'ui.cardapioEstoque.criarOuAtualizarItemEstoque',
    'ui.cardapioEstoque.registrarMovimentacaoEstoque',
  ] as const;

  @property() itensCardapio: CardapioEstoqueListarItensCardapioOutputItem[] = [];

  @property() categoriasCardapio: CardapioEstoqueListarCategoriasCardapioOutputItem[] = [];

  @property() itensEstoque: CardapioEstoqueListarItensEstoqueOutputItem[] = [];

  @property() movimentacoesEstoque: CardapioEstoqueListarMovimentacoesEstoqueOutputItem[] = [];

  @property() alertasEstoqueBaixo: CardapioEstoqueListarAlertasEstoqueBaixoOutputItem[] = [];

  @property() criarOuAtualizarItemCardapioState: 'idle' | 'loading' | 'success' | 'error' = 'idle';

  @property() criarOuAtualizarItemEstoqueState: 'idle' | 'loading' | 'success' | 'error' = 'idle';

  @property() registrarMovimentacaoEstoqueState: 'idle' | 'loading' | 'success' | 'error' = 'idle';

  @property() status: string = '';

  @property() menuItemId: string | undefined = undefined;

  @property() nome: string = '';

  @property() preco: number = 0;

  @property() categoriaId: string = '';

  @property() ativo: boolean = true;

  @property() stockItemId: string | undefined = undefined;

  @property() unidadeMedidaId: string = '';

  @property() quantidadeMinima: number = 0;

  @property() movementType: string = '';

  @property() quantity: number = 0;

  @property() reason: string | undefined = undefined;

  @property() occurredAt: string = '';

  protected msg: MessageType = messages['en'];

  createRenderRoot() {
    return this;
  }

  connectedCallback() {
    super.connectedCallback();
    const pendingLoad = consumeExpectedNavigationLoad();
    const task = this.loadInitialData(undefined, { mode: 'silent', signal: pendingLoad?.signal });
    bindExpectedNavigationLoad(pendingLoad, task);
    void task.catch(() => undefined);
    const lang: string = this.getMessageKey(messages);
    this.msg = messages[lang] || messages['en'];
    subscribe(this._stateKeys as unknown as string[], this);
    (this._stateKeys as unknown as string[]).forEach(key => {
      const v = getState(key);
      if (v !== undefined) this.handleIcaStateChange(key, v);
    });
  }

  disconnectedCallback() {
    super.disconnectedCallback();
    unsubscribe(this._stateKeys as unknown as string[], this);
  }

  handleIcaStateChange(key: string, value: any): void {
    switch (key) {
      case 'ui.cardapioEstoque.itensCardapio':
        this.itensCardapio = (value ?? []) as CardapioEstoqueListarItensCardapioOutputItem[];
        break;
      case 'ui.cardapioEstoque.categoriasCardapio':
        this.categoriasCardapio = (value ?? []) as CardapioEstoqueListarCategoriasCardapioOutputItem[];
        break;
      case 'ui.cardapioEstoque.itensEstoque':
        this.itensEstoque = (value ?? []) as CardapioEstoqueListarItensEstoqueOutputItem[];
        break;
      case 'ui.cardapioEstoque.movimentacoesEstoque':
        this.movimentacoesEstoque = (value ?? []) as CardapioEstoqueListarMovimentacoesEstoqueOutputItem[];
        break;
      case 'ui.cardapioEstoque.alertasEstoqueBaixo':
        this.alertasEstoqueBaixo = (value ?? []) as CardapioEstoqueListarAlertasEstoqueBaixoOutputItem[];
        break;
      case 'ui.cardapioEstoque.criarOuAtualizarItemCardapio':
        this.criarOuAtualizarItemCardapioState = (value ?? 'idle') as typeof this.criarOuAtualizarItemCardapioState;
        break;
      case 'ui.cardapioEstoque.criarOuAtualizarItemEstoque':
        this.criarOuAtualizarItemEstoqueState = (value ?? 'idle') as typeof this.criarOuAtualizarItemEstoqueState;
        break;
      case 'ui.cardapioEstoque.registrarMovimentacaoEstoque':
        this.registrarMovimentacaoEstoqueState = (value ?? 'idle') as typeof this.registrarMovimentacaoEstoqueState;
        break;
      default:
        break;
    }
  }

  async loadInitialData(params?: unknown, options?: BffClientOptions): Promise<void> {
    await this.loadListarItensCardapio(params as CardapioEstoqueListarItensCardapioInput, options);
    await this.loadListarCategoriasCardapio(params as CardapioEstoqueListarCategoriasCardapioInput, options);
    await this.loadListarItensEstoque(params as CardapioEstoqueListarItensEstoqueInput, options);
    await this.loadListarMovimentacoesEstoque(params as CardapioEstoqueListarMovimentacoesEstoqueInput, options);
    await this.loadListarAlertasEstoqueBaixo(params as CardapioEstoqueListarAlertasEstoqueBaixoInput, options);
  }

  async loadListarItensCardapio(params?: CardapioEstoqueListarItensCardapioInput, options?: BffClientOptions): Promise<void> {
    if ((window as any).mls) {
      this.itensCardapio = [
        {
          menuItemId: 'id-001',
          nome: 'Café coado',
          preco: 7,
          categoriaId: 'id-010',
          ativo: true,
        },
        {
          menuItemId: 'id-002',
          nome: 'Capuccino',
          preco: 12,
          categoriaId: 'id-010',
          ativo: true,
        },
        {
          menuItemId: 'id-003',
          nome: 'Pão de queijo',
          preco: 6,
          categoriaId: 'id-011',
          ativo: true,
        },
      ] as CardapioEstoqueListarItensCardapioOutputItem[];
      setState('ui.cardapioEstoque.itensCardapio', this.itensCardapio);
      this.status = this.msg.loaded;
      return;
    }
    const response = await execBff<CardapioEstoqueListarItensCardapioOutputItem[]>(
      'cafeFlow.cardapioEstoque.listarItensCardapio',
      params ?? ({} as CardapioEstoqueListarItensCardapioInput),
      options,
    );
    if (!response.ok || !response.data) {
      if (options?.mode === 'blocking') {
        throw (response.error ?? { code: 'UNEXPECTED_ERROR', message: this.msg.couldNotLoad }) satisfies AuraNormalizedError;
      }
      this.status = this.msg.couldNotLoad;
      return;
    }
    this.itensCardapio = response.data;
    setState('ui.cardapioEstoque.itensCardapio', this.itensCardapio);
    this.status = this.msg.loaded;
  }

  async loadListarCategoriasCardapio(params?: CardapioEstoqueListarCategoriasCardapioInput, options?: BffClientOptions): Promise<void> {
    if ((window as any).mls) {
      this.categoriasCardapio = [
        {
          categoriaId: 'id-010',
          nome: 'Bebidas',
          ativo: true,
        },
        {
          categoriaId: 'id-011',
          nome: 'Salgados',
          ativo: true,
        },
      ] as CardapioEstoqueListarCategoriasCardapioOutputItem[];
      setState('ui.cardapioEstoque.categoriasCardapio', this.categoriasCardapio);
      this.status = this.msg.loaded;
      return;
    }
    const response = await execBff<CardapioEstoqueListarCategoriasCardapioOutputItem[]>(
      'cafeFlow.cardapioEstoque.listarCategoriasCardapio',
      params ?? ({} as CardapioEstoqueListarCategoriasCardapioInput),
      options,
    );
    if (!response.ok || !response.data) {
      if (options?.mode === 'blocking') {
        throw (response.error ?? { code: 'UNEXPECTED_ERROR', message: this.msg.couldNotLoad }) satisfies AuraNormalizedError;
      }
      this.status = this.msg.couldNotLoad;
      return;
    }
    this.categoriasCardapio = response.data;
    setState('ui.cardapioEstoque.categoriasCardapio', this.categoriasCardapio);
    this.status = this.msg.loaded;
  }

  async loadListarItensEstoque(params?: CardapioEstoqueListarItensEstoqueInput, options?: BffClientOptions): Promise<void> {
    if ((window as any).mls) {
      this.itensEstoque = [
        {
          stockItemId: 'id-201',
          nome: 'Café em grãos',
          quantidadeAtual: 18,
          unidadeMedidaId: 'id-kg',
          quantidadeMinima: 10,
          status: 'ok',
        },
        {
          stockItemId: 'id-202',
          nome: 'Leite integral',
          quantidadeAtual: 4,
          unidadeMedidaId: 'id-lt',
          quantidadeMinima: 6,
          status: 'baixo',
        },
      ] as CardapioEstoqueListarItensEstoqueOutputItem[];
      setState('ui.cardapioEstoque.itensEstoque', this.itensEstoque);
      this.status = this.msg.loaded;
      return;
    }
    const response = await execBff<CardapioEstoqueListarItensEstoqueOutputItem[]>(
      'cafeFlow.cardapioEstoque.listarItensEstoque',
      params ?? ({} as CardapioEstoqueListarItensEstoqueInput),
      options,
    );
    if (!response.ok || !response.data) {
      if (options?.mode === 'blocking') {
        throw (response.error ?? { code: 'UNEXPECTED_ERROR', message: this.msg.couldNotLoad }) satisfies AuraNormalizedError;
      }
      this.status = this.msg.couldNotLoad;
      return;
    }
    this.itensEstoque = response.data;
    setState('ui.cardapioEstoque.itensEstoque', this.itensEstoque);
    this.status = this.msg.loaded;
  }

  async loadListarMovimentacoesEstoque(
    params?: CardapioEstoqueListarMovimentacoesEstoqueInput,
    options?: BffClientOptions,
  ): Promise<void> {
    if ((window as any).mls) {
      this.movimentacoesEstoque = [
        {
          stockMovementId: 'id-301',
          stockItemId: 'id-201',
          movementType: 'entrada',
          quantity: 5,
          reason: 'Reposição',
          occurredAt: '2026-06-20T10:00:00Z',
        },
        {
          stockMovementId: 'id-302',
          stockItemId: 'id-202',
          movementType: 'saída',
          quantity: 2,
          reason: 'Consumo diário',
          occurredAt: '2026-06-21T08:30:00Z',
        },
      ] as CardapioEstoqueListarMovimentacoesEstoqueOutputItem[];
      setState('ui.cardapioEstoque.movimentacoesEstoque', this.movimentacoesEstoque);
      this.status = this.msg.loaded;
      return;
    }
    const response = await execBff<CardapioEstoqueListarMovimentacoesEstoqueOutputItem[]>(
      'cafeFlow.cardapioEstoque.listarMovimentacoesEstoque',
      params ?? ({} as CardapioEstoqueListarMovimentacoesEstoqueInput),
      options,
    );
    if (!response.ok || !response.data) {
      if (options?.mode === 'blocking') {
        throw (response.error ?? { code: 'UNEXPECTED_ERROR', message: this.msg.couldNotLoad }) satisfies AuraNormalizedError;
      }
      this.status = this.msg.couldNotLoad;
      return;
    }
    this.movimentacoesEstoque = response.data;
    setState('ui.cardapioEstoque.movimentacoesEstoque', this.movimentacoesEstoque);
    this.status = this.msg.loaded;
  }

  async loadListarAlertasEstoqueBaixo(
    params?: CardapioEstoqueListarAlertasEstoqueBaixoInput,
    options?: BffClientOptions,
  ): Promise<void> {
    if ((window as any).mls) {
      this.alertasEstoqueBaixo = [
        {
          lowStockAlertId: 'id-401',
          stockItemId: 'id-202',
          triggeredAt: '2026-06-21T09:00:00Z',
          currentQuantity: 4,
          minimumQuantity: 6,
          status: 'aberto',
        },
        {
          lowStockAlertId: 'id-402',
          stockItemId: 'id-203',
          triggeredAt: '2026-06-22T07:15:00Z',
          currentQuantity: 2,
          minimumQuantity: 5,
          status: 'aberto',
        },
      ] as CardapioEstoqueListarAlertasEstoqueBaixoOutputItem[];
      setState('ui.cardapioEstoque.alertasEstoqueBaixo', this.alertasEstoqueBaixo);
      this.status = this.msg.loaded;
      return;
    }
    const response = await execBff<CardapioEstoqueListarAlertasEstoqueBaixoOutputItem[]>(
      'cafeFlow.cardapioEstoque.listarAlertasEstoqueBaixo',
      params ?? ({} as CardapioEstoqueListarAlertasEstoqueBaixoInput),
      options,
    );
    if (!response.ok || !response.data) {
      if (options?.mode === 'blocking') {
        throw (response.error ?? { code: 'UNEXPECTED_ERROR', message: this.msg.couldNotLoad }) satisfies AuraNormalizedError;
      }
      this.status = this.msg.couldNotLoad;
      return;
    }
    this.alertasEstoqueBaixo = response.data;
    setState('ui.cardapioEstoque.alertasEstoqueBaixo', this.alertasEstoqueBaixo);
    this.status = this.msg.loaded;
  }

  async criarOuAtualizarItemCardapio(
    params: CardapioEstoqueCriarOuAtualizarItemCardapioInput,
    signal?: AbortSignal,
  ): Promise<void> {
    if ((window as any).mls) {
      console.log('[mls mock] cafeFlow.cardapioEstoque.criarOuAtualizarItemCardapio', params);
      this.criarOuAtualizarItemCardapioState = 'success';
      setState('ui.cardapioEstoque.criarOuAtualizarItemCardapio', 'success');
      return;
    }
    this.criarOuAtualizarItemCardapioState = 'loading';
    setState('ui.cardapioEstoque.criarOuAtualizarItemCardapio', 'loading');
    try {
      const response = await execBff<CardapioEstoqueCriarOuAtualizarItemCardapioOutput>(
        'cafeFlow.cardapioEstoque.criarOuAtualizarItemCardapio',
        params,
        signal ? { signal } : undefined,
      );
      if (!response.ok) throw response.error;
      this.criarOuAtualizarItemCardapioState = 'success';
      setState('ui.cardapioEstoque.criarOuAtualizarItemCardapio', 'success');
      await this.loadListarItensCardapio(undefined, { mode: 'silent' });
    } catch (e) {
      this.criarOuAtualizarItemCardapioState = 'error';
      setState('ui.cardapioEstoque.criarOuAtualizarItemCardapio', 'error');
      throw e;
    }
  }

  handleCriarOuAtualizarItemCardapioClick(): void {
    const params: CardapioEstoqueCriarOuAtualizarItemCardapioInput = {
      menuItemId: this.menuItemId,
      nome: this.nome,
      preco: this.preco,
      categoriaId: this.categoriaId,
      ativo: this.ativo,
    };
    void runBlockingUiAction(
      async (signal: AbortSignal) => {
        await this.criarOuAtualizarItemCardapio(params, signal);
      },
      {
        busyLabel: this.msg.criarOuAtualizarItemCardapioLoading,
        errorTitle: this.msg.couldNotCriarOuAtualizarItemCardapio,
        retry: () => this.criarOuAtualizarItemCardapio(params),
      },
    );
  }

  async criarOuAtualizarItemEstoque(
    params: CardapioEstoqueCriarOuAtualizarItemEstoqueInput,
    signal?: AbortSignal,
  ): Promise<void> {
    if ((window as any).mls) {
      console.log('[mls mock] cafeFlow.cardapioEstoque.criarOuAtualizarItemEstoque', params);
      this.criarOuAtualizarItemEstoqueState = 'success';
      setState('ui.cardapioEstoque.criarOuAtualizarItemEstoque', 'success');
      return;
    }
    this.criarOuAtualizarItemEstoqueState = 'loading';
    setState('ui.cardapioEstoque.criarOuAtualizarItemEstoque', 'loading');
    try {
      const response = await execBff<CardapioEstoqueCriarOuAtualizarItemEstoqueOutput>(
        'cafeFlow.cardapioEstoque.criarOuAtualizarItemEstoque',
        params,
        signal ? { signal } : undefined,
      );
      if (!response.ok) throw response.error;
      this.criarOuAtualizarItemEstoqueState = 'success';
      setState('ui.cardapioEstoque.criarOuAtualizarItemEstoque', 'success');
      await this.loadListarItensEstoque(undefined, { mode: 'silent' });
    } catch (e) {
      this.criarOuAtualizarItemEstoqueState = 'error';
      setState('ui.cardapioEstoque.criarOuAtualizarItemEstoque', 'error');
      throw e;
    }
  }

  handleCriarOuAtualizarItemEstoqueClick(): void {
    const params: CardapioEstoqueCriarOuAtualizarItemEstoqueInput = {
      stockItemId: this.stockItemId,
      nome: this.nome,
      unidadeMedidaId: this.unidadeMedidaId,
      quantidadeMinima: this.quantidadeMinima,
      ativo: this.ativo,
    };
    void runBlockingUiAction(
      async (signal: AbortSignal) => {
        await this.criarOuAtualizarItemEstoque(params, signal);
      },
      {
        busyLabel: this.msg.criarOuAtualizarItemEstoqueLoading,
        errorTitle: this.msg.couldNotCriarOuAtualizarItemEstoque,
        retry: () => this.criarOuAtualizarItemEstoque(params),
      },
    );
  }

  async registrarMovimentacaoEstoque(
    params: CardapioEstoqueRegistrarMovimentacaoEstoqueInput,
    signal?: AbortSignal,
  ): Promise<void> {
    if ((window as any).mls) {
      console.log('[mls mock] cafeFlow.cardapioEstoque.registrarMovimentacaoEstoque', params);
      this.registrarMovimentacaoEstoqueState = 'success';
      setState('ui.cardapioEstoque.registrarMovimentacaoEstoque', 'success');
      return;
    }
    this.registrarMovimentacaoEstoqueState = 'loading';
    setState('ui.cardapioEstoque.registrarMovimentacaoEstoque', 'loading');
    try {
      const response = await execBff<CardapioEstoqueRegistrarMovimentacaoEstoqueOutput>(
        'cafeFlow.cardapioEstoque.registrarMovimentacaoEstoque',
        params,
        signal ? { signal } : undefined,
      );
      if (!response.ok) throw response.error;
      this.registrarMovimentacaoEstoqueState = 'success';
      setState('ui.cardapioEstoque.registrarMovimentacaoEstoque', 'success');
      await this.loadListarMovimentacoesEstoque(undefined, { mode: 'silent' });
      await this.loadListarAlertasEstoqueBaixo(undefined, { mode: 'silent' });
    } catch (e) {
      this.registrarMovimentacaoEstoqueState = 'error';
      setState('ui.cardapioEstoque.registrarMovimentacaoEstoque', 'error');
      throw e;
    }
  }

  handleRegistrarMovimentacaoEstoqueClick(): void {
    const params: CardapioEstoqueRegistrarMovimentacaoEstoqueInput = {
      stockItemId: this.stockItemId ?? '',
      movementType: this.movementType,
      quantity: this.quantity,
      reason: this.reason,
      occurredAt: this.occurredAt,
    };
    void runBlockingUiAction(
      async (signal: AbortSignal) => {
        await this.registrarMovimentacaoEstoque(params, signal);
      },
      {
        busyLabel: this.msg.registrarMovimentacaoEstoqueLoading,
        errorTitle: this.msg.couldNotRegistrarMovimentacaoEstoque,
        retry: () => this.registrarMovimentacaoEstoque(params),
      },
    );
  }

  handleNavigateToDashboardGerenteClick(params?: Record<string, unknown>): void {
    if ((window as any).mls) {
      console.log('[mls mock] navigate to dashboardGerente', params);
      return;
    }
    setState('navigation.request', { pageId: 'dashboardGerente', params: params ?? {} });
  }
}
