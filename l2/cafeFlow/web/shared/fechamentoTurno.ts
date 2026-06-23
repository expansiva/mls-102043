/// <mls fileReference="_102043_/l2/cafeFlow/web/shared/fechamentoTurno.ts" enhancement="_102027_/l2/enhancementLit.ts" />
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
  FechamentoTurnoListarTurnosInput,
  FechamentoTurnoListarTurnosOutputItem,
  FechamentoTurnoListarPedidosInput,
  FechamentoTurnoListarPedidosOutputItem,
  FechamentoTurnoFecharTurnoInput,
  FechamentoTurnoFecharTurnoOutput,
  FechamentoTurnoObterRelatorioTurnoInput,
  FechamentoTurnoObterRelatorioTurnoOutput,
} from '/_102043_/l2/cafeFlow/web/contracts/fechamentoTurno.js';

/// **collab_i18n_start**
const message_pt = {
  brand: 'Cafe Flow',
  pageTitle: 'Fechamento de Turno',
  loaded: 'Dados carregados',
  couldNotLoad: 'Nao foi possivel carregar',
  loadingListarTurnos: 'Carregando turnos',
  loadingListarPedidos: 'Carregando pedidos',
  loadingObterRelatorioTurno: 'Carregando relatório do turno',
  fecharTurnoLabel: 'Fechar turno',
  fecharTurnoLoading: 'Fechando turno',
  couldNotFecharTurno: 'Não foi possível fechar turno',
  navigateToDashboardGerente: 'Ver resumo do turno',
};
const message_en = {
  brand: 'Cafe Flow',
  pageTitle: 'Shift Closing',
  loaded: 'Data loaded',
  couldNotLoad: 'Could not load',
  loadingListarTurnos: 'Loading shifts',
  loadingListarPedidos: 'Loading orders',
  loadingObterRelatorioTurno: 'Loading shift report',
  fecharTurnoLabel: 'Close shift',
  fecharTurnoLoading: 'Closing shift',
  couldNotFecharTurno: 'Could not close shift',
  navigateToDashboardGerente: 'View shift summary',
};
type MessageType = typeof message_en;
const messages: { [key: string]: MessageType } = { en: message_en, pt: message_pt };
/// **collab_i18n_end**

export class FechamentoTurnoFechamentoTurnoBase extends CollabLitElement {
  private readonly _stateKeys = [
    'ui.fechamentoTurno.turnos',
    'ui.fechamentoTurno.pedidos',
    'ui.fechamentoTurno.shiftReportId',
    'ui.fechamentoTurno.shiftId',
    'ui.fechamentoTurno.totalSalesAmount',
    'ui.fechamentoTurno.totalOrders',
    'ui.fechamentoTurno.totalItems',
    'ui.fechamentoTurno.notes',
    'ui.fechamentoTurno.createdAt',
    'ui.fechamentoTurno.updatedAt',
    'ui.fechamentoTurno.fecharTurno',
  ] as const;

  @property() turnos: FechamentoTurnoListarTurnosOutputItem[] = [];

  @property() pedidos: FechamentoTurnoListarPedidosOutputItem[] = [];

  @property() shiftReportId: FechamentoTurnoObterRelatorioTurnoOutput['shiftReportId'] | undefined = undefined;

  @property() shiftId: FechamentoTurnoObterRelatorioTurnoOutput['shiftId'] | undefined = undefined;

  @property() totalSalesAmount: FechamentoTurnoObterRelatorioTurnoOutput['totalSalesAmount'] | undefined = undefined;

  @property() totalOrders: FechamentoTurnoObterRelatorioTurnoOutput['totalOrders'] | undefined = undefined;

  @property() totalItems: FechamentoTurnoObterRelatorioTurnoOutput['totalItems'] | undefined = undefined;

  @property() notes: FechamentoTurnoObterRelatorioTurnoOutput['notes'] | undefined = undefined;

  @property() createdAt: FechamentoTurnoObterRelatorioTurnoOutput['createdAt'] | undefined = undefined;

  @property() updatedAt: FechamentoTurnoObterRelatorioTurnoOutput['updatedAt'] | undefined = undefined;

  @property() fecharTurnoState: 'idle' | 'loading' | 'success' | 'error' = 'idle';

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
      case 'ui.fechamentoTurno.turnos':
        this.turnos = (value as FechamentoTurnoListarTurnosOutputItem[]) ?? [];
        break;
      case 'ui.fechamentoTurno.pedidos':
        this.pedidos = (value as FechamentoTurnoListarPedidosOutputItem[]) ?? [];
        break;
      case 'ui.fechamentoTurno.shiftReportId':
        this.shiftReportId = (value as FechamentoTurnoObterRelatorioTurnoOutput['shiftReportId']) ?? undefined;
        break;
      case 'ui.fechamentoTurno.shiftId':
        this.shiftId = (value as FechamentoTurnoObterRelatorioTurnoOutput['shiftId']) ?? undefined;
        break;
      case 'ui.fechamentoTurno.totalSalesAmount':
        this.totalSalesAmount = (value as FechamentoTurnoObterRelatorioTurnoOutput['totalSalesAmount']) ?? undefined;
        break;
      case 'ui.fechamentoTurno.totalOrders':
        this.totalOrders = (value as FechamentoTurnoObterRelatorioTurnoOutput['totalOrders']) ?? undefined;
        break;
      case 'ui.fechamentoTurno.totalItems':
        this.totalItems = (value as FechamentoTurnoObterRelatorioTurnoOutput['totalItems']) ?? undefined;
        break;
      case 'ui.fechamentoTurno.notes':
        this.notes = (value as FechamentoTurnoObterRelatorioTurnoOutput['notes']) ?? undefined;
        break;
      case 'ui.fechamentoTurno.createdAt':
        this.createdAt = (value as FechamentoTurnoObterRelatorioTurnoOutput['createdAt']) ?? undefined;
        break;
      case 'ui.fechamentoTurno.updatedAt':
        this.updatedAt = (value as FechamentoTurnoObterRelatorioTurnoOutput['updatedAt']) ?? undefined;
        break;
      case 'ui.fechamentoTurno.fecharTurno':
        this.fecharTurnoState = (value as 'idle' | 'loading' | 'success' | 'error') ?? 'idle';
        break;
      default:
        break;
    }
  }

  async loadInitialData(params?: unknown, options?: BffClientOptions): Promise<void> {
    await this.loadListarTurnos(params as FechamentoTurnoListarTurnosInput, options);
    await this.loadListarPedidos(undefined, options);
    await this.loadObterRelatorioTurno(undefined, options);
  }

  async loadListarTurnos(params?: FechamentoTurnoListarTurnosInput, options?: BffClientOptions): Promise<void> {
    if ((window as any).mls) {
      this.turnos = [
        {
          shiftId: 'id-001',
          status: 'Aberto',
          openedAt: '2026-06-23T06:00:00Z',
          closedAt: '2026-06-23T14:00:00Z',
          shiftConfigId: 'id-001',
        },
        {
          shiftId: 'id-002',
          status: 'Fechado',
          openedAt: '2026-06-22T14:00:00Z',
          closedAt: '2026-06-22T22:00:00Z',
          shiftConfigId: 'id-002',
        },
      ] as FechamentoTurnoListarTurnosOutputItem[];
      setState('ui.fechamentoTurno.turnos', this.turnos);
      this.status = this.msg.loaded;
      return;
    }
    const response = await execBff<FechamentoTurnoListarTurnosOutputItem[]>(
      'cafeFlow.fechamentoTurno.listarTurnos',
      params ?? ({} as FechamentoTurnoListarTurnosInput),
      options,
    );
    if (!response.ok || !response.data) {
      if (options?.mode === 'blocking') {
        throw (response.error ?? { code: 'UNEXPECTED_ERROR', message: this.msg.couldNotLoad }) satisfies AuraNormalizedError;
      }
      this.status = this.msg.couldNotLoad;
      return;
    }
    this.turnos = response.data;
    setState('ui.fechamentoTurno.turnos', this.turnos);
    this.status = this.msg.loaded;
  }

  async loadListarPedidos(params?: FechamentoTurnoListarPedidosInput, options?: BffClientOptions): Promise<void> {
    if ((window as any).mls) {
      this.pedidos = [
        {
          orderId: 'id-001',
          status: 'Finalizado',
          shiftId: 'id-001',
          createdAt: '2026-06-23T07:10:00Z',
          updatedAt: '2026-06-23T07:30:00Z',
        },
        {
          orderId: 'id-002',
          status: 'Finalizado',
          shiftId: 'id-001',
          createdAt: '2026-06-23T08:05:00Z',
          updatedAt: '2026-06-23T08:20:00Z',
        },
      ] as FechamentoTurnoListarPedidosOutputItem[];
      setState('ui.fechamentoTurno.pedidos', this.pedidos);
      this.status = this.msg.loaded;
      return;
    }
    const response = await execBff<FechamentoTurnoListarPedidosOutputItem[]>(
      'cafeFlow.fechamentoTurno.listarPedidos',
      params ?? ({} as FechamentoTurnoListarPedidosInput),
      options,
    );
    if (!response.ok || !response.data) {
      if (options?.mode === 'blocking') {
        throw (response.error ?? { code: 'UNEXPECTED_ERROR', message: this.msg.couldNotLoad }) satisfies AuraNormalizedError;
      }
      this.status = this.msg.couldNotLoad;
      return;
    }
    this.pedidos = response.data;
    setState('ui.fechamentoTurno.pedidos', this.pedidos);
    this.status = this.msg.loaded;
  }

  async loadObterRelatorioTurno(
    params?: FechamentoTurnoObterRelatorioTurnoInput,
    options?: BffClientOptions,
  ): Promise<void> {
    if ((window as any).mls) {
      this.shiftReportId = 'id-001';
      this.shiftId = 'id-001';
      this.totalSalesAmount = '120.50';
      this.totalOrders = 12;
      this.totalItems = 24;
      this.notes = 'Turno tranquilo';
      this.createdAt = '2026-06-23T06:00:00Z';
      this.updatedAt = '2026-06-23T14:10:00Z';
      setState('ui.fechamentoTurno.shiftReportId', this.shiftReportId);
      setState('ui.fechamentoTurno.shiftId', this.shiftId);
      setState('ui.fechamentoTurno.totalSalesAmount', this.totalSalesAmount);
      setState('ui.fechamentoTurno.totalOrders', this.totalOrders);
      setState('ui.fechamentoTurno.totalItems', this.totalItems);
      setState('ui.fechamentoTurno.notes', this.notes);
      setState('ui.fechamentoTurno.createdAt', this.createdAt);
      setState('ui.fechamentoTurno.updatedAt', this.updatedAt);
      this.status = this.msg.loaded;
      return;
    }
    const response = await execBff<FechamentoTurnoObterRelatorioTurnoOutput>(
      'cafeFlow.fechamentoTurno.obterRelatorioTurno',
      params ?? ({} as FechamentoTurnoObterRelatorioTurnoInput),
      options,
    );
    if (!response.ok || !response.data) {
      if (options?.mode === 'blocking') {
        throw (response.error ?? { code: 'UNEXPECTED_ERROR', message: this.msg.couldNotLoad }) satisfies AuraNormalizedError;
      }
      this.status = this.msg.couldNotLoad;
      return;
    }
    this.shiftReportId = response.data.shiftReportId;
    this.shiftId = response.data.shiftId;
    this.totalSalesAmount = response.data.totalSalesAmount;
    this.totalOrders = response.data.totalOrders;
    this.totalItems = response.data.totalItems;
    this.notes = response.data.notes;
    this.createdAt = response.data.createdAt;
    this.updatedAt = response.data.updatedAt;
    setState('ui.fechamentoTurno.shiftReportId', this.shiftReportId);
    setState('ui.fechamentoTurno.shiftId', this.shiftId);
    setState('ui.fechamentoTurno.totalSalesAmount', this.totalSalesAmount);
    setState('ui.fechamentoTurno.totalOrders', this.totalOrders);
    setState('ui.fechamentoTurno.totalItems', this.totalItems);
    setState('ui.fechamentoTurno.notes', this.notes);
    setState('ui.fechamentoTurno.createdAt', this.createdAt);
    setState('ui.fechamentoTurno.updatedAt', this.updatedAt);
    this.status = this.msg.loaded;
  }

  async fecharTurno(params: FechamentoTurnoFecharTurnoInput, signal?: AbortSignal): Promise<void> {
    if ((window as any).mls) {
      console.log('[mls mock] cafeFlow.fechamentoTurno.fecharTurno', params);
      this.fecharTurnoState = 'success';
      setState('ui.fechamentoTurno.fecharTurno', 'success');
      return;
    }
    this.fecharTurnoState = 'loading';
    setState('ui.fechamentoTurno.fecharTurno', 'loading');
    try {
      const response = await execBff<FechamentoTurnoFecharTurnoOutput>(
        'cafeFlow.fechamentoTurno.fecharTurno',
        params,
        signal ? { signal } : undefined,
      );
      if (!response.ok) throw response.error;
      this.fecharTurnoState = 'success';
      setState('ui.fechamentoTurno.fecharTurno', 'success');
      await this.loadObterRelatorioTurno({ shiftId: params.shiftId }, { mode: 'silent' });
    } catch (e) {
      this.fecharTurnoState = 'error';
      setState('ui.fechamentoTurno.fecharTurno', 'error');
      throw e;
    }
  }

  handleFecharTurnoClick(): void {
    const params = { shiftId: this.shiftId ?? '' };
    void runBlockingUiAction(
      async (signal: AbortSignal) => {
        await this.fecharTurno(params, signal);
      },
      {
        busyLabel: this.msg.fecharTurnoLoading,
        errorTitle: this.msg.couldNotFecharTurno,
        retry: () => this.fecharTurno(params),
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
