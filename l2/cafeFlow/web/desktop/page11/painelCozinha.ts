/// <mls fileReference="_102043_/l2/cafeFlow/web/desktop/page11/painelCozinha.ts" enhancement="_102027_/l2/enhancementLit.ts" />
import { html } from 'lit';
import { customElement } from 'lit/decorators.js';
import { PainelCozinhaPainelCozinhaBase } from '/_102043_/l2/cafeFlow/web/shared/painelCozinha.js';

@customElement('cafe-flow--web--desktop--page11--painel-cozinha-102043')
export class PainelCozinhaDesktopPage11PainelCozinhaPage extends PainelCozinhaPainelCozinhaBase {
  render() {
    const atualizarStatusPedidoBusy = this.atualizarStatusPedidoState === 'loading';

    return html`
      <div class="min-h-screen bg-[#F6F1EB] text-[#3B2F2F]">
        <header class="max-w-6xl mx-auto px-6 py-6 flex items-center justify-between">
          <div class="space-y-1">
            <div class="text-xs uppercase tracking-[0.2em] text-[#C85A2A]">${this.msg.brand}</div>
            <div class="text-2xl font-semibold">${this.msg.pageTitle}</div>
          </div>
          <div class="text-sm font-medium text-[#2E7D32]">${this.status ?? ''}</div>
        </header>

        <main class="max-w-6xl mx-auto px-6 pb-8 grid gap-6 lg:grid-cols-[2fr,1fr]">
          <section class="bg-white/80 rounded-xl border border-[#F2C57C] shadow-sm">
            <div class="px-5 py-4 border-b border-[#F2C57C]">
              <div class="text-sm font-semibold text-[#3B2F2F]">${this.msg.loadingListarPedidosCozinha}</div>
            </div>
            <div class="divide-y divide-[#F2C57C]/60">
              ${(this.pedidosCozinha ?? []).map(
                (item: any) => html`
                  <div class="px-5 py-4 flex items-start justify-between gap-4">
                    <div class="space-y-2">
                      <div class="text-base font-semibold">${item?.orderId ?? ''}</div>
                      <div class="text-sm text-[#3B2F2F]/80">${item?.createdAt ?? ''}</div>
                    </div>
                    <div class="text-right space-y-2">
                      <div class="text-sm font-semibold text-[#C85A2A]">${item?.status ?? ''}</div>
                      <div class="text-xs text-[#3B2F2F]/70">${item?.shiftId ?? ''}</div>
                    </div>
                  </div>
                `,
              )}
            </div>
          </section>

          <section class="bg-white/90 rounded-xl border border-[#F2C57C] shadow-sm p-5 flex flex-col gap-5">
            <div class="space-y-2">
              <div class="text-sm font-semibold text-[#3B2F2F]">${this.msg.atualizarStatusPedidoLabel}</div>
              <div class="text-xs text-[#3B2F2F]/70">${this.status ?? ''}</div>
            </div>
            <button
              class="w-full py-3 rounded-lg bg-[#C85A2A] text-white text-sm font-semibold disabled:opacity-60"
              ?disabled=${atualizarStatusPedidoBusy}
              @click=${this.handleAtualizarStatusPedidoClick}
            >
              ${atualizarStatusPedidoBusy
                ? this.msg.atualizarStatusPedidoLoading
                : this.msg.atualizarStatusPedidoLabel}
            </button>
          </section>
        </main>
      </div>
    `;
  }
}
