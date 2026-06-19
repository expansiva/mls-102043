/// <mls fileReference="_102043_/l2/cafeFlow/web/desktop/page11/fechamentoTurno.ts" enhancement="_102027_/l2/enhancementLit.ts" />
import { html } from 'lit';
import { customElement } from 'lit/decorators.js';
import { FechamentoTurnoBase } from '/_102043_/l2/cafeFlow/web/shared/fechamentoTurno.js';

@customElement('cafe-flow--web--desktop--page11--fechamento-turno-102043')
export class FechamentoTurnoDesktopPage11FechamentoTurnoPage extends FechamentoTurnoBase {
  render() {
    const fecharTurnoBusy = this.fecharTurnoState === 'loading';

    return html`
      <div class="min-h-screen bg-[#F6F1EB] text-[#3B2F2F]">
        <header class="bg-white border-b border-[#F2C57C] px-8 py-6 flex items-center justify-between">
          <div class="flex items-center gap-4">
            <div class="h-10 w-10 rounded-xl bg-[#C85A2A]"></div>
            <div class="flex flex-col gap-1">
              <span class="text-sm uppercase tracking-[0.3em] text-[#3B2F2F]">${this.msg.brand}</span>
              <h1 class="text-2xl font-semibold text-[#3B2F2F]">${this.msg.pageTitle}</h1>
            </div>
          </div>
          <div class="text-sm text-[#2E7D32] font-medium">${this.status}</div>
        </header>

        <main class="px-8 py-8 grid grid-cols-12 gap-6">
          <section class="col-span-4 bg-white rounded-2xl shadow-sm border border-[#F2C57C] p-6 flex flex-col gap-4">
            <div class="text-sm font-semibold text-[#C85A2A]">${this.msg.loadingListarTurnos}</div>
            <div class="flex flex-col gap-3">
              ${(this.turnos ?? []).map(
                turno => html`
                  <button
                    class=${`w-full text-left rounded-xl border p-4 transition ${
                      this.shiftId === turno.shiftId
                        ? 'border-[#C85A2A] bg-[#F2C57C]/40'
                        : 'border-[#F2C57C]/60 bg-[#F6F1EB]'
                    }`}
                    @click=${() => {
                      this.shiftId = turno.shiftId;
                    }}
                  >
                    <div class="flex flex-col gap-2">
                      <span class="text-base font-semibold">${turno.shiftId}</span>
                      <span class="text-sm text-[#3B2F2F]/70">${turno.status}</span>
                      <div class="text-xs text-[#3B2F2F]/60 flex flex-col gap-1">
                        <span>${turno.openedAt}</span>
                        <span>${turno.closedAt}</span>
                      </div>
                    </div>
                  </button>
                `,
              )}
            </div>
          </section>

          <section class="col-span-8 bg-white rounded-2xl shadow-sm border border-[#F2C57C] p-6 flex flex-col gap-4">
            <div class="text-sm font-semibold text-[#C85A2A]">${this.msg.loadingListarPedidos}</div>
            <div class="flex flex-col gap-3">
              ${(this.pedidos ?? []).map(
                pedido => html`
                  <div class="rounded-xl border border-[#F2C57C]/60 bg-[#F6F1EB] px-4 py-3 grid grid-cols-5 gap-3 text-sm">
                    <span class="font-semibold text-[#3B2F2F]">${pedido.orderId}</span>
                    <span class="text-[#3B2F2F]/70">${pedido.status}</span>
                    <span class="text-[#3B2F2F]/70">${pedido.shiftId}</span>
                    <span class="text-[#3B2F2F]/60">${pedido.createdAt}</span>
                    <span class="text-[#3B2F2F]/60">${pedido.updatedAt}</span>
                  </div>
                `,
              )}
            </div>
          </section>

          <section class="col-span-7 bg-white rounded-2xl shadow-sm border border-[#F2C57C] p-6 flex flex-col gap-4">
            <div class="text-sm font-semibold text-[#C85A2A]">${this.msg.loadingObterRelatorioTurno}</div>
            <div class="grid grid-cols-2 gap-4">
              <div class="rounded-xl border border-[#F2C57C]/60 bg-[#F6F1EB] p-4 text-lg font-semibold text-[#3B2F2F]">
                ${this.totalSalesAmount ?? ''}
              </div>
              <div class="rounded-xl border border-[#F2C57C]/60 bg-[#F6F1EB] p-4 text-lg font-semibold text-[#3B2F2F]">
                ${this.totalOrders ?? 0}
              </div>
              <div class="rounded-xl border border-[#F2C57C]/60 bg-[#F6F1EB] p-4 text-lg font-semibold text-[#3B2F2F]">
                ${this.totalItems ?? 0}
              </div>
              <div class="rounded-xl border border-[#F2C57C]/60 bg-[#F6F1EB] p-4 text-sm text-[#3B2F2F]/70">
                ${this.notes ?? ''}
              </div>
              <div class="rounded-xl border border-[#F2C57C]/60 bg-[#F6F1EB] p-4 text-xs text-[#3B2F2F]/60">
                ${this.createdAt ?? ''}
              </div>
              <div class="rounded-xl border border-[#F2C57C]/60 bg-[#F6F1EB] p-4 text-xs text-[#3B2F2F]/60">
                ${this.updatedAt ?? ''}
              </div>
            </div>
          </section>

          <section class="col-span-5 bg-white rounded-2xl shadow-sm border border-[#F2C57C] p-6 flex flex-col gap-6">
            <div class="text-sm font-semibold text-[#C85A2A]">${this.msg.fecharTurnoLabel}</div>
            <div class="rounded-xl border border-[#F2C57C]/60 bg-[#F6F1EB] p-4 text-sm text-[#3B2F2F]">
              ${this.shiftId ?? ''}
            </div>
            <div class="flex flex-col gap-3">
              <button
                class="w-full rounded-xl bg-[#C85A2A] text-white py-3 text-sm font-semibold disabled:opacity-60"
                ?disabled=${fecharTurnoBusy}
                @click=${this.handleFecharTurnoClick}
              >
                ${fecharTurnoBusy ? this.msg.fecharTurnoLoading : this.msg.fecharTurnoLabel}
              </button>
              <button
                class="w-full rounded-xl border border-[#C85A2A] text-[#C85A2A] py-3 text-sm font-semibold"
                @click=${this.handleNavigateToDashboardGerenteClick}
              >
                ${this.msg.navigateToDashboardGerente}
              </button>
            </div>
          </section>
        </main>
      </div>
    `;
  }
}
