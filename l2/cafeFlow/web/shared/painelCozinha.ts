/// <mls fileReference="_102043_/l2/cafeFlow/web/shared/painelCozinha.ts" enhancement="_102027_/l2/enhancementLit.ts" />
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
  PainelCozinhaListarPedidosCozinhaInput,
  PainelCozinhaListarPedidosCozinhaOutput,
  PainelCozinhaAtualizarStatusPedidoInput,
  PainelCozinhaAtualizarStatusPedidoOutput,
} from '/_102043_/l2/cafeFlow/web/contracts/painelCozinha.js';

/// **collab_i18n_start**
const message_pt = {
  brand: 'CafeFlow',
  pageTitle: 'Painel de Cozinha',
  loaded: 'Dados carregados',
  couldNotLoad: 'Não foi possível carregar',
  loadingListarPedidosCozinha: 'Carregando pedidos da cozinha',
  atualizarStatusPedidoLabel: 'Atualizar status do pedido',
  atualizarStatusPedidoLoading: 'Atualizando status do pedido',
  couldNotAtualizarStatusPedido: 'Não foi possível atualizar status do pedido',
};
const message_en = {
  brand: 'CafeFlow',
  pageTitle: 'Kitchen Panel',
  loaded: 'Data loaded',
  couldNotLoad: 'Could not load',
  loadingListarPedidosCozinha: 'Loading kitchen orders',
  atualizarStatusPedidoLabel: 'Update order status',
  atualizarStatusPedidoLoading: 'Updating order status',
  couldNotAtualizarStatusPedido: 'Could not update order status',
};
type MessageType = typeof message_en;
const messages: { [key: string]: MessageType } = { en: message_en, pt: message_pt };
/// **collab_i18n_end**

export class PainelCozinhaPainelCozinhaBase extends CollabLitElement {
  private readonly _stateKeys = [
    'ui.painelCozinha.pedidosCozinha',
    'ui.painelCozinha.atualizarStatusPedido',
  ] as const;

  @property() pedidosCozinha: PainelCozinhaListarPedidosCozinhaOutput = [];

  @property() atualizarStatusPedidoState: 'idle' | 'loading' | 'success' | 'error' = 'idle';

  @property() status: string = '';

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
      case 'ui.painelCozinha.pedidosCozinha':
        this.pedidosCozinha = (value as PainelCozinhaListarPedidosCozinhaOutput) ?? [];
        break;
      case 'ui.painelCozinha.atualizarStatusPedido':
        this.atualizarStatusPedidoState =
          (value as 'idle' | 'loading' | 'success' | 'error') ?? 'idle';
        break;
      default:
        break;
    }
  }

  async loadInitialData(params?: unknown, options?: BffClientOptions): Promise<void> {
    await this.loadListarPedidosCozinha(params as PainelCozinhaListarPedidosCozinhaInput, options);
  }

  async loadListarPedidosCozinha(
    params?: PainelCozinhaListarPedidosCozinhaInput,
    options?: BffClientOptions,
  ): Promise<void> {
    if ((window as any).mls) {
      this.pedidosCozinha = [
        {
          orderId: 'id-001',
          status: 'Recebido',
          createdAt: '2026-06-23T10:00:00Z',
          shiftId: 'shift-001',
        },
        {
          orderId: 'id-002',
          status: 'Em preparo',
          createdAt: '2026-06-23T10:05:00Z',
          shiftId: 'shift-001',
        },
        {
          orderId: 'id-003',
          status: 'Pronto',
          createdAt: '2026-06-23T10:12:00Z',
          shiftId: 'shift-002',
        },
      ] as PainelCozinhaListarPedidosCozinhaOutput;
      setState('ui.painelCozinha.pedidosCozinha', this.pedidosCozinha);
      this.status = this.msg.loaded;
      return;
    }
    const response = await execBff<PainelCozinhaListarPedidosCozinhaOutput>(
      'cafeFlow.painelCozinha.listarPedidosCozinha',
      params ?? ({} as PainelCozinhaListarPedidosCozinhaInput),
      options,
    );
    if (!response.ok || !response.data) {
      if (options?.mode === 'blocking') {
        throw (response.error ?? { code: 'UNEXPECTED_ERROR', message: this.msg.couldNotLoad }) satisfies AuraNormalizedError;
      }
      this.status = this.msg.couldNotLoad;
      return;
    }
    this.pedidosCozinha = response.data;
    setState('ui.painelCozinha.pedidosCozinha', this.pedidosCozinha);
    this.status = this.msg.loaded;
  }

  async atualizarStatusPedido(
    params: PainelCozinhaAtualizarStatusPedidoInput,
    signal?: AbortSignal,
  ): Promise<void> {
    if ((window as any).mls) {
      console.log('[mls mock] cafeFlow.painelCozinha.atualizarStatusPedido', params);
      this.atualizarStatusPedidoState = 'success';
      setState('ui.painelCozinha.atualizarStatusPedido', 'success');
      return;
    }
    this.atualizarStatusPedidoState = 'loading';
    setState('ui.painelCozinha.atualizarStatusPedido', 'loading');
    try {
      const response = await execBff<PainelCozinhaAtualizarStatusPedidoOutput>(
        'cafeFlow.painelCozinha.atualizarStatusPedido',
        params,
        signal ? { signal } : undefined,
      );
      if (!response.ok) throw response.error;
      this.atualizarStatusPedidoState = 'success';
      setState('ui.painelCozinha.atualizarStatusPedido', 'success');
      await this.loadListarPedidosCozinha(undefined, { mode: 'silent' });
    } catch (e) {
      this.atualizarStatusPedidoState = 'error';
      setState('ui.painelCozinha.atualizarStatusPedido', 'error');
      throw e;
    }
  }

  handleAtualizarStatusPedidoClick(): void {
    const params: PainelCozinhaAtualizarStatusPedidoInput = {
      orderId: this.pedidosCozinha[0]?.orderId ?? '',
      novoStatus: 'Em preparo',
    };
    void runBlockingUiAction(
      async (signal: AbortSignal) => {
        await this.atualizarStatusPedido(params, signal);
      },
      {
        busyLabel: this.msg.atualizarStatusPedidoLoading,
        errorTitle: this.msg.couldNotAtualizarStatusPedido,
        retry: () => this.atualizarStatusPedido(params),
      },
    );
  }
}
