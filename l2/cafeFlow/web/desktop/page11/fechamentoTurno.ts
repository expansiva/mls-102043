/// <mls fileReference="_102043_/l2/cafeFlow/web/desktop/page11/fechamentoTurno.ts" enhancement="_102027_/l2/enhancementLit.ts" />
import { html } from 'lit';
import { customElement } from 'lit/decorators.js';
import { FechamentoTurnoFechamentoTurnoBase } from '/_102043_/l2/cafeFlow/web/shared/fechamentoTurno.js';

@customElement('cafe-flow--web--desktop--page11--fechamento-turno-102043')
export class FechamentoTurnoDesktopPage11FechamentoTurnoPage extends FechamentoTurnoFechamentoTurnoBase {
  render() {
    const fecharTurnoBusy = this.fecharTurnoState === 'loading';
    const currentShift = (this.turnos ?? []).find(turno => turno.shiftId === this.shiftId);

    return html`
      <div class="min-h-full bg-slate-50 dark:bg-slate-950">
        <div class="max-w-6xl mx-auto px-4 py-6 flex flex-col gap-6">
          <header class="flex flex-col gap-1">
            <h1 class="text-2xl font-semibold text-slate-900 dark:text-slate-100">${this.msg.pageTitle}</h1>
            <p class="text-sm text-slate-500 dark:text-slate-400">${this.msg.brand}</p>
          </header>

          ${this.status
            ? html`
                <div class="rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-4 text-sm text-slate-900 dark:text-slate-100">
                  ${this.status}
                </div>
              `
            : html``}

          <section class="rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-5 flex flex-col gap-4">
            <div class="flex items-center justify-between">
              <h2 class="text-lg font-medium text-slate-900 dark:text-slate-100">${this.msg.loadingListarTurnos}</h2>
              <span class="text-xs uppercase tracking-wide text-slate-400 dark:text-slate-500">${this.msg.loaded}</span>
            </div>
            ${(this.turnos ?? []).length === 0
              ? html`
                  <div class="text-sm text-slate-500 dark:text-slate-400">${this.msg.loadingListarTurnos}</div>
                `
              : html`
                  <div class="overflow-hidden rounded-lg border border-slate-200 dark:border-slate-800">
                    <table class="min-w-full text-sm">
                      <thead class="bg-slate-50 dark:bg-slate-800/50 text-slate-500 dark:text-slate-400">
                        <tr>
                          <th class="px-3 py-2 text-left font-medium">${this.msg.pageTitle}</th>
                          <th class="px-3 py-2 text-left font-medium">${this.msg.loaded}</th>
                          <th class="px-3 py-2 text-left font-medium">${this.msg.brand}</th>
                          <th class="px-3 py-2 text-left font-medium">${this.msg.brand}</th>
                          <th class="px-3 py-2 text-left font-medium">${this.msg.loaded}</th>
                        </tr>
                      </thead>
                      <tbody class="divide-y divide-slate-100 dark:divide-slate-800">
                        ${(this.turnos ?? []).map(
                          turno => html`
                            <tr class="hover:bg-slate-50 dark:hover:bg-slate-800/40">
                              <td class="px-3 py-2 text-slate-900 dark:text-slate-100">${turno.shiftId ?? ''}</td>
                              <td class="px-3 py-2 text-slate-500 dark:text-slate-400">${turno.status ?? ''}</td>
                              <td class="px-3 py-2 text-slate-500 dark:text-slate-400">${turno.openedAt ?? ''}</td>
                              <td class="px-3 py-2 text-slate-500 dark:text-slate-400">${turno.closedAt ?? ''}</td>
                              <td class="px-3 py-2">
                                <button
                                  class="rounded-md px-3 py-1.5 text-sm font-medium transition-colors border border-slate-300 dark:border-slate-700 text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800"
                                  @click=${() => {
                                    this.shiftId = turno.shiftId;
                                  }}
                                >
                                  ${this.msg.loaded}
                                </button>
                              </td>
                            </tr>
                          `,
                        )}
                      </tbody>
                    </table>
                  </div>
                `}
          </section>

          <section class="rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-5 flex flex-col gap-4">
            <div class="flex items-center justify-between">
              <h2 class="text-lg font-medium text-slate-900 dark:text-slate-100">${this.msg.loadingListarPedidos}</h2>
              <span class="text-xs uppercase tracking-wide text-slate-400 dark:text-slate-500">${this.msg.loaded}</span>
            </div>
            ${(this.pedidos ?? []).length === 0
              ? html`
                  <div class="text-sm text-slate-500 dark:text-slate-400">${this.msg.loadingListarPedidos}</div>
                `
              : html`
                  <div class="overflow-hidden rounded-lg border border-slate-200 dark:border-slate-800">
                    <table class="min-w-full text-sm">
                      <thead class="bg-slate-50 dark:bg-slate-800/50 text-slate-500 dark:text-slate-400">
                        <tr>
                          <th class="px-3 py-2 text-left font-medium">${this.msg.pageTitle}</th>
                          <th class="px-3 py-2 text-left font-medium">${this.msg.loaded}</th>
                          <th class="px-3 py-2 text-left font-medium">${this.msg.brand}</th>
                          <th class="px-3 py-2 text-left font-medium">${this.msg.brand}</th>
                          <th class="px-3 py-2 text-left font-medium">${this.msg.brand}</th>
                        </tr>
                      </thead>
                      <tbody class="divide-y divide-slate-100 dark:divide-slate-800">
                        ${(this.pedidos ?? []).map(
                          pedido => html`
                            <tr class="hover:bg-slate-50 dark:hover:bg-slate-800/40">
                              <td class="px-3 py-2 text-slate-900 dark:text-slate-100">${pedido.orderId ?? ''}</td>
                              <td class="px-3 py-2 text-slate-500 dark:text-slate-400">${pedido.status ?? ''}</td>
                              <td class="px-3 py-2 text-slate-500 dark:text-slate-400">${pedido.shiftId ?? ''}</td>
                              <td class="px-3 py-2 text-slate-500 dark:text-slate-400">${pedido.createdAt ?? ''}</td>
                              <td class="px-3 py-2 text-slate-500 dark:text-slate-400">${pedido.updatedAt ?? ''}</td>
                            </tr>
                          `,
                        )}
                      </tbody>
                    </table>
                  </div>
                `}
          </section>

          <section class="rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-5 flex flex-col gap-4">
            <div class="flex items-center justify-between">
              <h2 class="text-lg font-medium text-slate-900 dark:text-slate-100">${this.msg.loadingObterRelatorioTurno}</h2>
              <span class="text-xs uppercase tracking-wide text-slate-400 dark:text-slate-500">${this.msg.loaded}</span>
            </div>
            ${this.shiftReportId
              ? html`
                  <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div class="rounded-lg border border-slate-200 dark:border-slate-800 p-4">
                      <div class="text-xs uppercase tracking-wide text-slate-400 dark:text-slate-500">${this.msg.pageTitle}</div>
                      <div class="text-sm text-slate-900 dark:text-slate-100">${this.shiftReportId ?? ''}</div>
                    </div>
                    <div class="rounded-lg border border-slate-200 dark:border-slate-800 p-4">
                      <div class="text-xs uppercase tracking-wide text-slate-400 dark:text-slate-500">${this.msg.brand}</div>
                      <div class="text-sm text-slate-900 dark:text-slate-100">${this.shiftId ?? ''}</div>
                    </div>
                    <div class="rounded-lg border border-slate-200 dark:border-slate-800 p-4">
                      <div class="text-xs uppercase tracking-wide text-slate-400 dark:text-slate-500">${this.msg.loaded}</div>
                      <div class="text-sm text-slate-900 dark:text-slate-100">${this.totalSalesAmount ?? ''}</div>
                    </div>
                    <div class="rounded-lg border border-slate-200 dark:border-slate-800 p-4">
                      <div class="text-xs uppercase tracking-wide text-slate-400 dark:text-slate-500">${this.msg.loaded}</div>
                      <div class="text-sm text-slate-900 dark:text-slate-100">${this.totalOrders ?? 0}</div>
                    </div>
                    <div class="rounded-lg border border-slate-200 dark:border-slate-800 p-4">
                      <div class="text-xs uppercase tracking-wide text-slate-400 dark:text-slate-500">${this.msg.loaded}</div>
                      <div class="text-sm text-slate-900 dark:text-slate-100">${this.totalItems ?? 0}</div>
                    </div>
                    <div class="rounded-lg border border-slate-200 dark:border-slate-800 p-4">
                      <div class="text-xs uppercase tracking-wide text-slate-400 dark:text-slate-500">${this.msg.brand}</div>
                      <div class="text-sm text-slate-900 dark:text-slate-100">${this.notes ?? ''}</div>
                    </div>
                    <div class="rounded-lg border border-slate-200 dark:border-slate-800 p-4">
                      <div class="text-xs uppercase tracking-wide text-slate-400 dark:text-slate-500">${this.msg.brand}</div>
                      <div class="text-sm text-slate-900 dark:text-slate-100">${this.createdAt ?? ''}</div>
                    </div>
                    <div class="rounded-lg border border-slate-200 dark:border-slate-800 p-4">
                      <div class="text-xs uppercase tracking-wide text-slate-400 dark:text-slate-500">${this.msg.brand}</div>
                      <div class="text-sm text-slate-900 dark:text-slate-100">${this.updatedAt ?? ''}</div>
                    </div>
                  </div>
                `
              : html`
                  <div class="text-sm text-slate-500 dark:text-slate-400">${this.msg.loadingObterRelatorioTurno}</div>
                `}
          </section>

          <section class="rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-5 flex flex-col gap-4">
            <div class="flex items-center justify-between">
              <h2 class="text-lg font-medium text-slate-900 dark:text-slate-100">${this.msg.fecharTurnoLabel}</h2>
              <span class="text-xs uppercase tracking-wide text-slate-400 dark:text-slate-500">${this.msg.loaded}</span>
            </div>
            <div class="flex flex-col gap-3">
              <div class="rounded-lg border border-slate-200 dark:border-slate-800 p-4 flex items-center justify-between">
                <div class="flex flex-col gap-1">
                  <span class="text-xs uppercase tracking-wide text-slate-400 dark:text-slate-500">${this.msg.pageTitle}</span>
                  <span class="text-sm text-slate-900 dark:text-slate-100">${currentShift?.shiftId ?? ''}</span>
                </div>
                <span class="text-sm text-emerald-600 dark:text-emerald-400">${currentShift?.status ?? ''}</span>
              </div>
              <div class="flex flex-wrap gap-3">
                <button
                  class="rounded-md px-3 py-1.5 text-sm font-medium transition-colors bg-sky-600 hover:bg-sky-500 text-white focus:ring-2 focus:ring-sky-500 disabled:opacity-50 disabled:cursor-not-allowed"
                  ?disabled=${fecharTurnoBusy}
                  @click=${this.handleFecharTurnoClick}
                >
                  ${fecharTurnoBusy ? this.msg.fecharTurnoLoading : this.msg.fecharTurnoLabel}
                </button>
                <button
                  class="rounded-md px-3 py-1.5 text-sm font-medium transition-colors border border-slate-300 dark:border-slate-700 text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800"
                  @click=${this.handleNavigateToDashboardGerenteClick}
                >
                  ${this.msg.navigateToDashboardGerente}
                </button>
              </div>
            </div>
          </section>
        </div>
      </div>
    `;
  }
}
