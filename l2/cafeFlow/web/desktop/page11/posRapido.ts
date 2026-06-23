/// <mls fileReference="_102043_/l2/cafeFlow/web/desktop/page11/posRapido.ts" enhancement="_102027_/l2/enhancementLit.ts" />
import { html } from 'lit';
import { customElement } from 'lit/decorators.js';
import { PosRapidoBase } from '/_102043_/l2/cafeFlow/web/shared/posRapido.js';

@customElement('cafe-flow--web--desktop--page11--pos-rapido-102043')
export class PosRapidoDesktopPage11PosRapidoPage extends PosRapidoBase {
  render() {
    const criarPedidoBusy = this.criarPedidoState === 'loading';
    const statusTone = this.status === this.msg.couldNotLoad ? 'text-red-600 dark:text-red-400' : 'text-emerald-600 dark:text-emerald-400';

    return html`
      <div class="min-h-full bg-slate-50 dark:bg-slate-950">
        <div class="max-w-6xl mx-auto px-4 py-6 flex flex-col gap-6">
          <header class="flex items-start justify-between gap-4">
            <div>
              <h1 class="text-2xl font-semibold text-slate-900 dark:text-slate-100">${this.msg.pageTitle}</h1>
              <p class="text-sm text-slate-500 dark:text-slate-400">${this.msg.loaded}</p>
            </div>
            <div class="text-sm text-slate-500 dark:text-slate-400">${this.msg.brand}</div>
          </header>

          ${this.status
            ? html`
                <div class="rounded-lg border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 px-4 py-2">
                  <span class="text-sm font-medium ${statusTone}">${this.status}</span>
                </div>
              `
            : html``}

          <section class="rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-5 flex flex-col gap-4">
            <div class="flex items-center justify-between">
              <h2 class="text-lg font-medium text-slate-900 dark:text-slate-100">${this.msg.loadingListarPedidos}</h2>
              <span class="text-xs uppercase tracking-wide text-slate-400 dark:text-slate-500">${this.msg.pageTitle}</span>
            </div>

            ${(this.pedidos?.length ?? 0) > 0
              ? html`
                  <div class="grid gap-3">
                    ${(this.pedidos ?? []).map(item => html`
                      <div class="rounded-lg border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-800/40 p-4">
                        <div class="grid grid-cols-2 md:grid-cols-4 gap-4">
                          <div>
                            <div class="text-xs uppercase tracking-wide text-slate-400 dark:text-slate-500">${this.msg.brand}</div>
                            <div class="text-sm text-slate-900 dark:text-slate-100">${item.orderId ?? ''}</div>
                          </div>
                          <div>
                            <div class="text-xs uppercase tracking-wide text-slate-400 dark:text-slate-500">${this.msg.loaded}</div>
                            <div class="text-sm text-slate-900 dark:text-slate-100">${item.status ?? ''}</div>
                          </div>
                          <div>
                            <div class="text-xs uppercase tracking-wide text-slate-400 dark:text-slate-500">${this.msg.pageTitle}</div>
                            <div class="text-sm text-slate-900 dark:text-slate-100">${item.createdAt ?? ''}</div>
                          </div>
                          <div>
                            <div class="text-xs uppercase tracking-wide text-slate-400 dark:text-slate-500">${this.msg.couldNotLoad}</div>
                            <div class="text-sm text-slate-900 dark:text-slate-100">${item.updatedAt ?? ''}</div>
                          </div>
                        </div>
                      </div>
                    `)}
                  </div>
                `
              : html`
                  <div class="rounded-lg border border-dashed border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-6 text-center text-sm text-slate-500 dark:text-slate-400">
                    ${this.msg.couldNotLoad}
                  </div>
                `}
          </section>

          <section class="rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-5 flex flex-col gap-4">
            <div class="flex items-center justify-between">
              <h2 class="text-lg font-medium text-slate-900 dark:text-slate-100">${this.msg.criarPedidoLabel}</h2>
              <span class="text-xs uppercase tracking-wide text-slate-400 dark:text-slate-500">${this.msg.loadingListarPedidos}</span>
            </div>
            <div class="flex flex-wrap gap-3">
              <button
                class="rounded-md px-3 py-1.5 text-sm font-medium transition-colors disabled:opacity-50 disabled:cursor-not-allowed bg-sky-600 hover:bg-sky-500 text-white focus:ring-2 focus:ring-sky-500"
                ?disabled=${criarPedidoBusy}
                @click=${this.handleCriarPedidoClick}
              >
                ${criarPedidoBusy ? this.msg.criarPedidoLoading : this.msg.criarPedidoLabel}
              </button>
            </div>
          </section>

          <section class="rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-5 flex flex-col gap-4">
            <div class="flex items-center justify-between">
              <h2 class="text-lg font-medium text-slate-900 dark:text-slate-100">${this.msg.navigateToPainelCozinha}</h2>
              <span class="text-xs uppercase tracking-wide text-slate-400 dark:text-slate-500">${this.msg.pageTitle}</span>
            </div>
            <div class="flex flex-wrap gap-3">
              <button
                class="rounded-md px-3 py-1.5 text-sm font-medium transition-colors border border-slate-300 dark:border-slate-700 text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800"
                @click=${this.handleNavigateToPainelCozinhaClick}
              >
                ${this.msg.navigateToPainelCozinha}
              </button>
            </div>
          </section>
        </div>
      </div>
    `;
  }
}
