/// <mls fileReference="_102043_/l2/cafeFlow/web/desktop/page11/posRapido.ts" enhancement="_102027_/l2/enhancementLit.ts" />
import { html } from 'lit';
import { customElement } from 'lit/decorators.js';
import { PosRapidoBase } from '/_102043_/l2/cafeFlow/web/shared/posRapido.js';

@customElement('cafe-flow--web--desktop--page11--pos-rapido-102043')
export class PosRapidoDesktopPage11PosRapidoPage extends PosRapidoBase {
  render() {
    const criarPedidoBusy = this.criarPedidoState === 'loading';
    return html`
      <div class="min-h-screen bg-[#F6F1EB] text-[#3B2F2F]">
        <header class="flex items-center justify-between border-b border-[#F2C57C] bg-white/70 px-6 py-4 backdrop-blur">
          <div class="flex items-center gap-3">
            <div class="h-10 w-10 rounded-full bg-[#C85A2A]"></div>
            <div>
              <div class="text-xs uppercase tracking-wide text-[#C85A2A]">${this.msg.brand}</div>
              <div class="text-xl font-semibold">${this.msg.pageTitle}</div>
            </div>
          </div>
          <div class="text-sm text-[#2E7D32]">${this.status ?? ''}</div>
        </header>

        <main class="mx-auto grid max-w-6xl grid-cols-12 gap-6 px-6 py-6">
          <section class="col-span-5 flex flex-col gap-4 rounded-xl border border-[#F2C57C] bg-white p-5 shadow-sm">
            <div class="flex items-center justify-between">
              <div class="text-sm font-semibold uppercase tracking-wide text-[#C85A2A]">${this.msg.loadingListarPedidos}</div>
              <div class="text-xs text-[#3B2F2F]/70">${this.msg.loaded}</div>
            </div>
            <div class="space-y-3">
              ${(this.pedidos ?? []).map(
                pedido => html`
                  <div class="rounded-lg border border-[#F2C57C]/50 bg-[#F6F1EB] p-3">
                    <div class="flex items-center justify-between">
                      <div class="text-sm font-medium">${pedido.orderId ?? ''}</div>
                      <div class="rounded-full bg-white px-2 py-1 text-xs text-[#C85A2A]">${pedido.status ?? ''}</div>
                    </div>
                    <div class="mt-2 grid grid-cols-2 gap-2 text-xs text-[#3B2F2F]/70">
                      <div>${pedido.createdAt ?? ''}</div>
                      <div class="text-right">${pedido.updatedAt ?? ''}</div>
                    </div>
                  </div>
                `,
              )}
            </div>
          </section>

          <section class="col-span-7 flex flex-col gap-6">
            <div class="rounded-xl border border-[#F2C57C] bg-white p-6 shadow-sm">
              <div class="text-sm font-semibold uppercase tracking-wide text-[#C85A2A]">${this.msg.criarPedidoLabel}</div>
              <div class="mt-4 grid gap-4">
                <div class="rounded-lg border border-[#F2C57C]/60 bg-[#F6F1EB] p-4">
                  <div class="text-xs uppercase tracking-wide text-[#3B2F2F]/70">${this.msg.pageTitle}</div>
                  <textarea
                    class="mt-2 w-full resize-none rounded-md border border-[#F2C57C]/70 bg-white p-3 text-sm focus:outline-none focus:ring-2 focus:ring-[#C85A2A]"
                    rows="4"
                    .value=${this.orderItems ?? ''}
                    @input=${(e: Event) => {
                      this.orderItems = (e.target as HTMLTextAreaElement).value;
                    }}
                  ></textarea>
                </div>
                <div class="rounded-lg border border-[#F2C57C]/60 bg-[#F6F1EB] p-4">
                  <div class="text-xs uppercase tracking-wide text-[#3B2F2F]/70">${this.msg.loaded}</div>
                  <textarea
                    class="mt-2 w-full resize-none rounded-md border border-[#F2C57C]/70 bg-white p-3 text-sm focus:outline-none focus:ring-2 focus:ring-[#C85A2A]"
                    rows="3"
                    .value=${this.observacao ?? ''}
                    @input=${(e: Event) => {
                      this.observacao = (e.target as HTMLTextAreaElement).value;
                    }}
                  ></textarea>
                </div>
              </div>
            </div>

            <div class="rounded-xl border border-[#F2C57C] bg-white p-6 shadow-sm">
              <div class="text-sm font-semibold uppercase tracking-wide text-[#C85A2A]">${this.msg.navigateToPainelCozinha}</div>
              <div class="mt-4 flex flex-wrap items-center gap-3">
                <button
                  class="rounded-lg bg-[#C85A2A] px-5 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-[#b14d23] disabled:cursor-not-allowed disabled:opacity-60"
                  ?disabled=${criarPedidoBusy}
                  @click=${this.handleCriarPedidoClick}
                >
                  ${criarPedidoBusy ? this.msg.criarPedidoLoading : this.msg.criarPedidoLabel}
                </button>
                <button
                  class="rounded-lg border border-[#2E7D32] px-5 py-3 text-sm font-semibold text-[#2E7D32] transition hover:bg-[#2E7D32] hover:text-white"
                  @click=${this.handleNavigateToPainelCozinhaClick}
                >
                  ${this.msg.navigateToPainelCozinha}
                </button>
              </div>
              <div class="mt-3 text-xs text-[#3B2F2F]/70">${this.status ?? ''}</div>
            </div>
          </section>
        </main>
      </div>
    `;
  }
}
