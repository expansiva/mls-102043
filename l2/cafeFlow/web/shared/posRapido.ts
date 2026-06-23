/// <mls fileReference="_102043_/l2/cafeFlow/web/shared/posRapido.ts" enhancement="_102027_/l2/enhancementLit.ts" />
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
  PosRapidoListarPedidosInput,
  PosRapidoListarPedidosOutputItem,
  PosRapidoCriarPedidoInput,
  PosRapidoCriarPedidoOutput,
} from '/_102043_/l2/cafeFlow/web/contracts/posRapido.js';

/// **collab_i18n_start**
const message_pt = {
  brand: 'Cafe Flow',
  pageTitle: 'POS Rápido',
  loaded: 'Dados carregados',
  couldNotLoad: 'Nao foi possivel carregar',
  loadingListarPedidos: 'Carregando pedidos',
  criarPedidoLabel: 'Criar pedido',
  criarPedidoLoading: 'Criando pedido',
  couldNotCriarPedido: 'Nao foi possivel criar pedido',
  navigateToPainelCozinha: 'Pedido enviado para a cozinha',
};
const message_en = {
  brand: 'Cafe Flow',
  pageTitle: 'Quick POS',
  loaded: 'Data loaded',
  couldNotLoad: 'Could not load',
  loadingListarPedidos: 'Loading orders',
  criarPedidoLabel: 'Create order',
  criarPedidoLoading: 'Creating order',
  couldNotCriarPedido: 'Could not create order',
  navigateToPainelCozinha: 'Order sent to the kitchen',
};
type MessageType = typeof message_en;
const messages: { [key: string]: MessageType } = { en: message_en, pt: message_pt };
/// **collab_i18n_end**

export class PosRapidoBase extends CollabLitElement {
  private readonly _stateKeys = [
    'ui.posRapido.pedidos',
    'ui.posRapido.criarPedido',
  ] as const;

  @property() status: string = '';

  @property() pedidos: PosRapidoListarPedidosOutputItem[] = [];

  @property() criarPedidoState: 'idle' | 'loading' | 'success' | 'error' = 'idle';

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
      case 'ui.posRapido.pedidos':
        this.pedidos = Array.isArray(value) ? (value as PosRapidoListarPedidosOutputItem[]) : [];
        break;
      case 'ui.posRapido.criarPedido':
        this.criarPedidoState =
          value === 'loading' || value === 'success' || value === 'error' ? value : 'idle';
        break;
      default:
        break;
    }
  }

  async loadInitialData(params?: unknown, options?: BffClientOptions): Promise<void> {
    await this.loadListarPedidos(params as PosRapidoListarPedidosInput, options);
  }

  async loadListarPedidos(
    params?: PosRapidoListarPedidosInput,
    options?: BffClientOptions
  ): Promise<void> {
    if ((window as any).mls) {
      this.pedidos = [
        {
          orderId: 'id-001',
          status: 'recebido',
          createdAt: '2026-06-23T09:10:00Z',
          updatedAt: '2026-06-23T09:12:00Z',
        },
        {
          orderId: 'id-002',
          status: 'em_preparo',
          createdAt: '2026-06-23T09:20:00Z',
          updatedAt: '2026-06-23T09:25:00Z',
        },
        {
          orderId: 'id-003',
          status: 'finalizado',
          createdAt: '2026-06-23T08:40:00Z',
          updatedAt: '2026-06-23T08:58:00Z',
        },
      ] as PosRapidoListarPedidosOutputItem[];
      setState('ui.posRapido.pedidos', this.pedidos);
      this.status = this.msg.loaded;
      return;
    }
    const response = await execBff<PosRapidoListarPedidosOutputItem[]>(
      'cafeFlow.posRapido.listarPedidos',
      params ?? ({} as PosRapidoListarPedidosInput),
      options
    );
    if (!response.ok || !response.data) {
      if (options?.mode === 'blocking') {
        throw (response.error ?? {
          code: 'UNEXPECTED_ERROR',
          message: this.msg.couldNotLoad,
        }) satisfies AuraNormalizedError;
      }
      this.status = this.msg.couldNotLoad;
      return;
    }
    this.pedidos = response.data;
    setState('ui.posRapido.pedidos', this.pedidos);
    this.status = this.msg.loaded;
  }

  async criarPedido(params: PosRapidoCriarPedidoInput, signal?: AbortSignal): Promise<void> {
    if ((window as any).mls) {
      console.log('[mls mock] cafeFlow.posRapido.criarPedido', params);
      this.criarPedidoState = 'success';
      setState('ui.posRapido.criarPedido', 'success');
      return;
    }
    this.criarPedidoState = 'loading';
    setState('ui.posRapido.criarPedido', 'loading');
    try {
      const response = await execBff<PosRapidoCriarPedidoOutput>(
        'cafeFlow.posRapido.criarPedido',
        params,
        signal ? { signal } : undefined
      );
      if (!response.ok) throw response.error;
      this.criarPedidoState = 'success';
      setState('ui.posRapido.criarPedido', 'success');
      await this.loadListarPedidos(undefined, { mode: 'silent' });
    } catch (e) {
      this.criarPedidoState = 'error';
      setState('ui.posRapido.criarPedido', 'error');
      throw e;
    }
  }

  handleCriarPedidoClick(): void {
    const params: PosRapidoCriarPedidoInput = {
      orderItems: '',
    };
    void runBlockingUiAction(
      async (signal: AbortSignal) => {
        await this.criarPedido(params, signal);
      },
      {
        busyLabel: this.msg.criarPedidoLoading,
        errorTitle: this.msg.couldNotCriarPedido,
        retry: () => this.criarPedido(params),
      }
    );
  }

  handleNavigateToPainelCozinhaClick(params?: Record<string, unknown>): void {
    if ((window as any).mls) {
      console.log('[mls mock] navigate to painelCozinha', params);
      return;
    }
    setState('navigation.request', { pageId: 'painelCozinha', params: params ?? {} });
  }
}
