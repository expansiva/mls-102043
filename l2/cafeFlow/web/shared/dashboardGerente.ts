/// <mls fileReference="_102043_/l2/cafeFlow/web/shared/dashboardGerente.ts" enhancement="_102027_/l2/enhancementLit.ts" />
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
  DashboardGerenteConsultarDashboardGerenteInput,
  DashboardGerenteConsultarDashboardGerenteOutput,
  DashboardGerenteListarAlertasEstoqueBaixoInput,
  DashboardGerenteListarAlertasEstoqueBaixoOutput,
} from '/_102043_/l2/cafeFlow/web/contracts/dashboardGerente.js';

/// **collab_i18n_start**
const message_pt = {
  brand: 'Cafe Flow',
  pageTitle: 'Dashboard Gerente',
  loaded: 'Dados carregados',
  couldNotLoad: 'Nao foi possivel carregar',
  loadingConsultarDashboardGerente: 'Carregando métricas do dashboard do gerente',
  loadingListarAlertasEstoqueBaixo: 'Carregando alertas de estoque baixo',
};
const message_en = {
  brand: 'Cafe Flow',
  pageTitle: 'Manager Dashboard',
  loaded: 'Data loaded',
  couldNotLoad: 'Could not load',
  loadingConsultarDashboardGerente: 'Loading manager dashboard metrics',
  loadingListarAlertasEstoqueBaixo: 'Loading low stock alerts',
};
type MessageType = typeof message_en;
const messages: { [key: string]: MessageType } = { en: message_en, pt: message_pt };
/// **collab_i18n_end**

export class DashboardGerenteBase extends CollabLitElement {
  private readonly _stateKeys = [
    'ui.dashboardGerente.totalRevenue',
    'ui.dashboardGerente.orderCount',
    'ui.dashboardGerente.averageTicket',
    'ui.dashboardGerente.itemsSold',
    'ui.dashboardGerente.serieVendasPorTurno',
    'ui.dashboardGerente.rankingItensMaisVendidos',
    'ui.dashboardGerente.alertasEstoqueBaixo',
  ] as const;

  @property() totalRevenue: DashboardGerenteConsultarDashboardGerenteOutput['totalRevenue'] | undefined = undefined;
  @property() orderCount: DashboardGerenteConsultarDashboardGerenteOutput['orderCount'] | undefined = undefined;
  @property() averageTicket: DashboardGerenteConsultarDashboardGerenteOutput['averageTicket'] | undefined = undefined;
  @property() itemsSold: DashboardGerenteConsultarDashboardGerenteOutput['itemsSold'] | undefined = undefined;
  @property() serieVendasPorTurno: DashboardGerenteConsultarDashboardGerenteOutput['serieVendasPorTurno'] | undefined = undefined;
  @property() rankingItensMaisVendidos: DashboardGerenteConsultarDashboardGerenteOutput['rankingItensMaisVendidos'] | undefined = undefined;
  @property() alertasEstoqueBaixo: DashboardGerenteListarAlertasEstoqueBaixoOutput[] = [];
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
      case 'ui.dashboardGerente.totalRevenue':
        this.totalRevenue = value ?? 0;
        break;
      case 'ui.dashboardGerente.orderCount':
        this.orderCount = value ?? 0;
        break;
      case 'ui.dashboardGerente.averageTicket':
        this.averageTicket = value ?? 0;
        break;
      case 'ui.dashboardGerente.itemsSold':
        this.itemsSold = value ?? 0;
        break;
      case 'ui.dashboardGerente.serieVendasPorTurno':
        this.serieVendasPorTurno = value ?? '';
        break;
      case 'ui.dashboardGerente.rankingItensMaisVendidos':
        this.rankingItensMaisVendidos = value ?? '';
        break;
      case 'ui.dashboardGerente.alertasEstoqueBaixo':
        this.alertasEstoqueBaixo = value ?? [];
        break;
      default:
        break;
    }
  }

  async loadInitialData(params?: unknown, options?: BffClientOptions): Promise<void> {
    await this.loadConsultarDashboardGerente(params as DashboardGerenteConsultarDashboardGerenteInput, options);
    await this.loadListarAlertasEstoqueBaixo(undefined, options);
  }

  async loadConsultarDashboardGerente(
    params?: DashboardGerenteConsultarDashboardGerenteInput,
    options?: BffClientOptions,
  ): Promise<void> {
    if ((window as any).mls) {
      this.totalRevenue = 1250;
      setState('ui.dashboardGerente.totalRevenue', this.totalRevenue);
      this.orderCount = 48;
      setState('ui.dashboardGerente.orderCount', this.orderCount);
      this.averageTicket = 26;
      setState('ui.dashboardGerente.averageTicket', this.averageTicket);
      this.itemsSold = 132;
      setState('ui.dashboardGerente.itemsSold', this.itemsSold);
      this.serieVendasPorTurno = 'Manhã';
      setState('ui.dashboardGerente.serieVendasPorTurno', this.serieVendasPorTurno);
      this.rankingItensMaisVendidos = 'Capuccino';
      setState('ui.dashboardGerente.rankingItensMaisVendidos', this.rankingItensMaisVendidos);
      this.status = this.msg.loaded;
      return;
    }
    const response = await execBff<DashboardGerenteConsultarDashboardGerenteOutput>(
      'cafeFlow.dashboardGerente.consultarDashboardGerente',
      params ?? ({} as DashboardGerenteConsultarDashboardGerenteInput),
      options,
    );
    if (!response.ok || !response.data) {
      if (options?.mode === 'blocking') {
        throw (response.error ?? { code: 'UNEXPECTED_ERROR', message: this.msg.couldNotLoad }) satisfies AuraNormalizedError;
      }
      this.status = this.msg.couldNotLoad;
      return;
    }
    this.totalRevenue = response.data.totalRevenue;
    setState('ui.dashboardGerente.totalRevenue', this.totalRevenue);
    this.orderCount = response.data.orderCount;
    setState('ui.dashboardGerente.orderCount', this.orderCount);
    this.averageTicket = response.data.averageTicket;
    setState('ui.dashboardGerente.averageTicket', this.averageTicket);
    this.itemsSold = response.data.itemsSold;
    setState('ui.dashboardGerente.itemsSold', this.itemsSold);
    this.serieVendasPorTurno = response.data.serieVendasPorTurno;
    setState('ui.dashboardGerente.serieVendasPorTurno', this.serieVendasPorTurno);
    this.rankingItensMaisVendidos = response.data.rankingItensMaisVendidos;
    setState('ui.dashboardGerente.rankingItensMaisVendidos', this.rankingItensMaisVendidos);
    this.status = this.msg.loaded;
  }

  async loadListarAlertasEstoqueBaixo(
    params?: DashboardGerenteListarAlertasEstoqueBaixoInput,
    options?: BffClientOptions,
  ): Promise<void> {
    if ((window as any).mls) {
      this.alertasEstoqueBaixo = [
        { alertas: 'Estoque baixo de leite' },
        { alertas: 'Estoque baixo de café' },
        { alertas: 'Estoque baixo de açúcar' },
      ] as DashboardGerenteListarAlertasEstoqueBaixoOutput[];
      setState('ui.dashboardGerente.alertasEstoqueBaixo', this.alertasEstoqueBaixo);
      this.status = this.msg.loaded;
      return;
    }
    const response = await execBff<DashboardGerenteListarAlertasEstoqueBaixoOutput[]>(
      'cafeFlow.dashboardGerente.listarAlertasEstoqueBaixo',
      params ?? ({} as DashboardGerenteListarAlertasEstoqueBaixoInput),
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
    setState('ui.dashboardGerente.alertasEstoqueBaixo', this.alertasEstoqueBaixo);
    this.status = this.msg.loaded;
  }
}
