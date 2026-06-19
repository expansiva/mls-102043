/// <mls fileReference="_102043_/l2/cafeFlow/web/desktop/page11/dashboardGerente.ts" enhancement="_102027_/l2/enhancementLit.ts" />
import { html } from 'lit';
import { customElement } from 'lit/decorators.js';
import { DashboardGerenteBase } from '/_102043_/l2/cafeFlow/web/shared/dashboardGerente.js';

@customElement('cafe-flow--web--desktop--page11--dashboard-gerente-102043')
export class DashboardGerenteDesktopPage11DashboardGerentePage extends DashboardGerenteBase {
  render() {
    return html`
      <div class="min-h-screen bg-[#F6F1EB] text-[#3B2F2F] p-6">
        <header class="mb-6 flex flex-col gap-1">
          <div class="text-sm uppercase tracking-wide text-[#C85A2A]">${this.msg.brand}</div>
          <h1 class="text-2xl font-semibold">${this.msg.pageTitle}</h1>
          <div class="text-sm text-[#3B2F2F]/70">${this.status ?? ''}</div>
        </header>

        <section class="mb-6 rounded-xl border border-[#F2C57C] bg-white/70 p-5 shadow-sm">
          <div class="mb-4 text-sm font-semibold text-[#C85A2A]">${this.msg.loadingConsultarDashboardGerente}</div>
          <div class="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
            <div class="rounded-lg border border-[#F2C57C] bg-white p-4">
              <div class="text-xs text-[#3B2F2F]/60">${this.msg.loaded}</div>
              <div class="text-2xl font-semibold">${this.totalRevenue ?? 0}</div>
            </div>
            <div class="rounded-lg border border-[#F2C57C] bg-white p-4">
              <div class="text-xs text-[#3B2F2F]/60">${this.msg.couldNotLoad}</div>
              <div class="text-2xl font-semibold">${this.orderCount ?? 0}</div>
            </div>
            <div class="rounded-lg border border-[#F2C57C] bg-white p-4">
              <div class="text-xs text-[#3B2F2F]/60">${this.msg.brand}</div>
              <div class="text-2xl font-semibold">${this.averageTicket ?? 0}</div>
            </div>
            <div class="rounded-lg border border-[#F2C57C] bg-white p-4">
              <div class="text-xs text-[#3B2F2F]/60">${this.msg.pageTitle}</div>
              <div class="text-2xl font-semibold">${this.itemsSold ?? 0}</div>
            </div>
          </div>
          <div class="mt-5 grid gap-4 md:grid-cols-2">
            <div class="rounded-lg border border-[#F2C57C] bg-white p-4">
              <div class="text-xs text-[#3B2F2F]/60">${this.msg.loaded}</div>
              <div class="text-lg font-medium">${this.serieVendasPorTurno ?? ''}</div>
            </div>
            <div class="rounded-lg border border-[#F2C57C] bg-white p-4">
              <div class="text-xs text-[#3B2F2F]/60">${this.msg.couldNotLoad}</div>
              <div class="text-lg font-medium">${this.rankingItensMaisVendidos ?? ''}</div>
            </div>
          </div>
        </section>

        <section class="mb-6 rounded-xl border border-[#F2C57C] bg-white/70 p-5 shadow-sm">
          <div class="mb-4 text-sm font-semibold text-[#C85A2A]">${this.msg.pageTitle}</div>
          <div class="rounded-lg border border-[#F2C57C] bg-white p-4">
            <div class="text-xs text-[#3B2F2F]/60">${this.msg.brand}</div>
            <div class="text-lg font-medium">${this.rankingItensMaisVendidos ?? ''}</div>
          </div>
        </section>

        <section class="rounded-xl border border-[#2E7D32]/30 bg-white/80 p-5 shadow-sm">
          <div class="mb-4 text-sm font-semibold text-[#2E7D32]">${this.msg.loadingListarAlertasEstoqueBaixo}</div>
          <div class="space-y-3">
            ${(this.alertasEstoqueBaixo ?? []).length
              ? (this.alertasEstoqueBaixo ?? []).map(
                  item => html`
                    <div class="flex items-center justify-between rounded-lg border border-[#2E7D32]/30 bg-white p-4">
                      <div class="text-sm font-medium">${item?.alertas ?? ''}</div>
                      <div class="text-xs text-[#3B2F2F]/60">${this.msg.loaded}</div>
                    </div>
                  `,
                )
              : html`
                  <div class="rounded-lg border border-[#2E7D32]/30 bg-white p-4 text-sm text-[#3B2F2F]/70">
                    ${this.msg.couldNotLoad}
                  </div>
                `}
          </div>
        </section>
      </div>
    `;
  }
}
