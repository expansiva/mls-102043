/// <mls fileReference="_102043_/l2/cafeFlow/web/desktop/page11/painelCozinha.ts" enhancement="_102027_/l2/enhancementLit.ts" />
import { html } from 'lit';
import { customElement } from 'lit/decorators.js';
import { PainelCozinhaPainelCozinhaBase } from '/_102043_/l2/cafeFlow/web/shared/painelCozinha.js';

@customElement('cafe-flow--web--desktop--page11--painel-cozinha-102043')
export class PainelCozinhaDesktopPage11PainelCozinhaPage extends PainelCozinhaPainelCozinhaBase {
  render() {
    const atualizarStatusPedidoBusy = this.atualizarStatusPedidoState === 'loading';
    const selectedPedido = this.pedidosCozinha?.[0];
    return html`
      <div class="min-h-full bg-slate-50 dark:bg-slate-950">
        <div class="max-w-6xl mx-auto px-4 py-6 flex flex-col gap-6">
          <header class="flex flex-col gap-1">
            <h1 class="text-2xl font-semibold text-slate-900 dark:text-slate-100">${this.msg.pageTitle}</h1>
            <p class="text-sm text-slate-500 dark:text-slate-400">${this.msg.brand}</p>
          </header>
          ${this.status
            ? html`
                <div class="rounded-md border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 px-4 py-3 text-sm text-slate-900 dark:text-slate-100">
                  ${this.status}
                </div>
              `
            : html``}
          <section class="rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-5 flex flex-col gap-4">
            <div class="flex items-center justify-between">
              <h2 class="text-lg font-medium text-slate-900 dark:text-slate-100">${this.msg.loadingListarPedidosCozinha}</h2>
              <span class="text-xs uppercase tracking-wide text-slate-400 dark:text-slate-500">${this.msg.loaded}</span>
            </div>
            ${this.pedidosCozinha && this.pedidosCozinha.length > 0
              ? html`
                  <div class="overflow-x-auto border border-slate-200 dark:border-slate-800 rounded-lg">
                    <table class="min-w-full text-sm text-slate-900 dark:text-slate-100">
                      <thead class="bg-slate-50 dark:bg-slate-800/50 text-slate-500 dark:text-slate-400">
                        <tr>
                          <th class="px-3 py-2 text-left font-medium">${this.msg.pageTitle}</th>
                          <th class="px-3 py-2 text-left font-medium">${this.msg.loaded}</th>
                          <th class="px-3 py-2 text-left font-medium">${this.msg.brand}</th>
                          <th class="px-3 py-2 text-left font-medium">${this.msg.couldNotLoad}</th>
                        </tr>
                      </thead>
                      <tbody class="divide-y divide-slate-100 dark:divide-slate-800">
                        ${(this.pedidosCozinha ?? []).map(
                          (pedido: any) => html`
                            <tr class="hover:bg-slate-50 dark:hover:bg-slate-800/40">
                              <td class="px-3 py-2 font-medium text-slate-900 dark:text-slate-100">${pedido.orderId ?? ''}</td>
                              <td class="px-3 py-2 text-slate-500 dark:text-slate-400">${pedido.status ?? ''}</td>
                              <td class="px-3 py-2 text-slate-500 dark:text-slate-400">${pedido.createdAt ?? ''}</td>
                              <td class="px-3 py-2 text-slate-500 dark:text-slate-400">${pedido.shiftId ?? ''}</td>
                            </tr>
                          `,
                        )}
                      </tbody>
                    </table>
                  </div>
                `
              : html`
                  <div class="flex items-center justify-center rounded-lg border border-dashed border-slate-200 dark:border-slate-800 py-10 text-sm text-slate-500 dark:text-slate-400">
                    ${this.msg.loadingListarPedidosCozinha}
                  </div>
                `}
          </section>
          <section class="rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-5 flex flex-col gap-4">
            <div class="flex items-center justify-between">
              <h2 class="text-lg font-medium text-slate-900 dark:text-slate-100">${this.msg.atualizarStatusPedidoLabel}</h2>
              <span class="text-xs uppercase tracking-wide text-slate-400 dark:text-slate-500">${this.msg.pageTitle}</span>
            </div>
            <div class="grid gap-4 sm:grid-cols-2">
              <div class="flex flex-col gap-2">
                <span class="text-xs uppercase tracking-wide text-slate-400 dark:text-slate-500">${this.msg.pageTitle}</span>
                <span class="text-sm text-slate-900 dark:text-slate-100">${selectedPedido?.orderId ?? ''}</span>
              </div>
              <div class="flex flex-col gap-2">
                <span class="text-xs uppercase tracking-wide text-slate-400 dark:text-slate-500">${this.msg.loaded}</span>
                <span class="text-sm text-slate-900 dark:text-slate-100">${selectedPedido?.status ?? ''}</span>
              </div>
              <div class="flex flex-col gap-2">
                <span class="text-xs uppercase tracking-wide text-slate-400 dark:text-slate-500">${this.msg.couldNotLoad}</span>
                <span class="text-sm text-slate-900 dark:text-slate-100">${selectedPedido?.shiftId ?? ''}</span>
              </div>
            </div>
            <div class="flex items-center justify-end">
              <button
                class="rounded-md px-3 py-1.5 text-sm font-medium transition-colors disabled:opacity-50 disabled:cursor-not-allowed bg-sky-600 hover:bg-sky-500 text-white focus:ring-2 focus:ring-sky-500"
                ?disabled=${atualizarStatusPedidoBusy}
                @click=${this.handleAtualizarStatusPedidoClick}
              >
                ${atualizarStatusPedidoBusy ? this.msg.atualizarStatusPedidoLoading : this.msg.atualizarStatusPedidoLabel}
              </button>
            </div>
          </section>
        </div>
      </div>
    `;
  }
}
