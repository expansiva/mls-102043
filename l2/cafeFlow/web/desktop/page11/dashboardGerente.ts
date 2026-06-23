/// <mls fileReference="_102043_/l2/cafeFlow/web/desktop/page11/dashboardGerente.ts" enhancement="_102027_/l2/enhancementLit.ts" />
import { html } from 'lit';
import { customElement } from 'lit/decorators.js';
import { DashboardGerenteDashboardGerenteBase } from '/_102043_/l2/cafeFlow/web/shared/dashboardGerente.js';

@customElement('cafe-flow--web--desktop--page11--dashboard-gerente-102043')
export class DashboardGerenteDesktopPage11DashboardGerentePage extends DashboardGerenteDashboardGerenteBase {
  render() {
    return html`
      <div class="min-h-full bg-slate-50 dark:bg-slate-950">
        <div class="max-w-6xl mx-auto px-4 py-6">
          <div class="flex flex-col gap-1">
            <h1 class="text-2xl font-semibold text-slate-900 dark:text-slate-100">${this.msg.pageTitle}</h1>
            <p class="text-sm text-slate-500 dark:text-slate-400">${this.msg.loadingConsultarDashboardGerente}</p>
          </div>

          ${this.status
            ? html`
                <div class="mt-4 rounded-lg border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 px-4 py-3">
                  <div class="flex items-center gap-2">
                    <span class="text-xs uppercase tracking-wide text-slate-400 dark:text-slate-500">${this.msg.brand}</span>
                    <span class="text-sm text-slate-900 dark:text-slate-100">${this.status}</span>
                  </div>
                </div>
              `
            : html``}

          <div class="mt-6 grid grid-cols-1 gap-6">
            <section class="rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-5">
              <div class="flex items-center justify-between">
                <h2 class="text-lg font-medium text-slate-900 dark:text-slate-100">${this.msg.loadingConsultarDashboardGerente}</h2>
                <span class="text-xs text-slate-400 dark:text-slate-500">${this.msg.loaded}</span>
              </div>
              <div class="mt-4 grid grid-cols-1 md:grid-cols-2 gap-4">
                <div class="rounded-lg border border-slate-200 dark:border-slate-800 p-4 bg-white dark:bg-slate-900">
                  <div class="text-xs uppercase tracking-wide text-slate-400 dark:text-slate-500">${this.msg.pageTitle}</div>
                  <div class="text-sm text-slate-900 dark:text-slate-100">${this.totalRevenue ?? 0}</div>
                </div>
                <div class="rounded-lg border border-slate-200 dark:border-slate-800 p-4 bg-white dark:bg-slate-900">
                  <div class="text-xs uppercase tracking-wide text-slate-400 dark:text-slate-500">${this.msg.brand}</div>
                  <div class="text-sm text-slate-900 dark:text-slate-100">${this.orderCount ?? 0}</div>
                </div>
                <div class="rounded-lg border border-slate-200 dark:border-slate-800 p-4 bg-white dark:bg-slate-900">
                  <div class="text-xs uppercase tracking-wide text-slate-400 dark:text-slate-500">${this.msg.loaded}</div>
                  <div class="text-sm text-slate-900 dark:text-slate-100">${this.averageTicket ?? 0}</div>
                </div>
                <div class="rounded-lg border border-slate-200 dark:border-slate-800 p-4 bg-white dark:bg-slate-900">
                  <div class="text-xs uppercase tracking-wide text-slate-400 dark:text-slate-500">${this.msg.loadingConsultarDashboardGerente}</div>
                  <div class="text-sm text-slate-900 dark:text-slate-100">${this.itemsSold ?? 0}</div>
                </div>
              </div>
              <div class="mt-5 grid grid-cols-1 lg:grid-cols-2 gap-4">
                <div class="rounded-lg border border-slate-200 dark:border-slate-800 p-4 bg-white dark:bg-slate-900">
                  <div class="text-xs uppercase tracking-wide text-slate-400 dark:text-slate-500">${this.msg.loadingConsultarDashboardGerente}</div>
                  <div class="text-sm text-slate-900 dark:text-slate-100">${this.serieVendasPorTurno ?? ''}</div>
                </div>
                <div class="rounded-lg border border-slate-200 dark:border-slate-800 p-4 bg-white dark:bg-slate-900">
                  <div class="text-xs uppercase tracking-wide text-slate-400 dark:text-slate-500">${this.msg.loaded}</div>
                  <div class="text-sm text-slate-900 dark:text-slate-100">${this.rankingItensMaisVendidos ?? ''}</div>
                </div>
              </div>
            </section>

            <section class="rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-5">
              <div class="flex items-center justify-between">
                <h2 class="text-lg font-medium text-slate-900 dark:text-slate-100">${this.msg.loaded}</h2>
                <span class="text-xs text-slate-400 dark:text-slate-500">${this.msg.brand}</span>
              </div>
              <div class="mt-4 rounded-lg border border-slate-200 dark:border-slate-800 overflow-hidden">
                <div class="grid grid-cols-2 bg-slate-50 dark:bg-slate-800/50 text-xs uppercase tracking-wide text-slate-400 dark:text-slate-500 px-3 py-2">
                  <div>${this.msg.pageTitle}</div>
                  <div>${this.msg.loaded}</div>
                </div>
                <div class="divide-y divide-slate-100 dark:divide-slate-800">
                  <div class="grid grid-cols-2 px-3 py-2 text-sm text-slate-900 dark:text-slate-100">
                    <div>${this.rankingItensMaisVendidos ?? ''}</div>
                    <div>${this.itemsSold ?? 0}</div>
                  </div>
                  <div class="grid grid-cols-2 px-3 py-2 text-sm text-slate-900 dark:text-slate-100">
                    <div>${this.serieVendasPorTurno ?? ''}</div>
                    <div>${this.orderCount ?? 0}</div>
                  </div>
                </div>
              </div>
            </section>

            <section class="rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-5">
              <div class="flex items-center justify-between">
                <h2 class="text-lg font-medium text-slate-900 dark:text-slate-100">${this.msg.loadingListarAlertasEstoqueBaixo}</h2>
                <span class="text-xs text-slate-400 dark:text-slate-500">${this.msg.brand}</span>
              </div>
              <div class="mt-4 rounded-lg border border-slate-200 dark:border-slate-800 overflow-hidden">
                <div class="bg-slate-50 dark:bg-slate-800/50 text-xs uppercase tracking-wide text-slate-400 dark:text-slate-500 px-3 py-2">
                  ${this.msg.loadingListarAlertasEstoqueBaixo}
                </div>
                <div class="divide-y divide-slate-100 dark:divide-slate-800">
                  ${(this.alertasEstoqueBaixo ?? []).length > 0
                    ? (this.alertasEstoqueBaixo ?? []).map(
                        (item: any) => html`
                          <div class="px-3 py-2 text-sm text-slate-900 dark:text-slate-100 hover:bg-slate-50 dark:hover:bg-slate-800/40">
                            ${item?.alertas ?? ''}
                          </div>
                        `
                      )
                    : html`
                        <div class="px-3 py-4 text-sm text-slate-500 dark:text-slate-400 text-center">
                          ${this.msg.couldNotLoad}
                        </div>
                      `}
                </div>
              </div>
            </section>
          </div>
        </div>
      </div>
    `;
  }
}
