/// <mls fileReference="_102043_/l2/cafeFlow/web/desktop/page11/cardapioEstoque.ts" enhancement="_102027_/l2/enhancementLit.ts" />
import { html } from 'lit';
import { customElement } from 'lit/decorators.js';
import { CardapioEstoqueBase } from '/_102043_/l2/cafeFlow/web/shared/cardapioEstoque.js';

@customElement('cafe-flow--web--desktop--page11--cardapio-estoque-102043')
export class CafeFlowDesktopPage11CardapioEstoquePage extends CardapioEstoqueBase {
  render() {
    const criarOuAtualizarItemCardapioBusy = this.criarOuAtualizarItemCardapioState === 'loading';
    const criarOuAtualizarItemEstoqueBusy = this.criarOuAtualizarItemEstoqueState === 'loading';
    const registrarMovimentacaoEstoqueBusy = this.registrarMovimentacaoEstoqueState === 'loading';

    return html`
      <div class="min-h-screen bg-[#F6F1EB] text-[#3B2F2F]">
        <div class="mx-auto flex max-w-7xl flex-col gap-6 px-6 py-8">
          <header class="flex flex-wrap items-center justify-between gap-4">
            <div>
              <div class="text-xs uppercase tracking-[0.3em] text-[#C85A2A]">${this.msg.brand}</div>
              <h1 class="text-3xl font-semibold">${this.msg.pageTitle}</h1>
              <p class="text-sm text-[#3B2F2F]/70">${this.status ?? ''}</p>
            </div>
            <button
              class="rounded-full bg-[#C85A2A] px-5 py-2 text-sm font-semibold text-white shadow transition hover:bg-[#B14D22]"
              @click=${this.handleNavigateToDashboardGerenteClick}
            >
              ${this.msg.navigateToDashboardGerente}
            </button>
          </header>

          <section class="grid gap-6 rounded-3xl border border-[#F2C57C]/40 bg-white/80 p-6 shadow">
            <div class="flex flex-wrap items-center justify-between gap-4">
              <div class="text-lg font-semibold text-[#3B2F2F]">${this.msg.loadingListarItensCardapio}</div>
              <button
                class="rounded-lg bg-[#2E7D32] px-4 py-2 text-sm font-semibold text-white shadow-sm transition hover:bg-[#276A2B] disabled:cursor-not-allowed disabled:opacity-60"
                ?disabled=${criarOuAtualizarItemCardapioBusy}
                @click=${this.handleCriarOuAtualizarItemCardapioClick}
              >
                ${criarOuAtualizarItemCardapioBusy
                  ? this.msg.criarOuAtualizarItemCardapioLoading
                  : this.msg.criarOuAtualizarItemCardapioLabel}
              </button>
            </div>

            <div class="grid gap-6 lg:grid-cols-[2fr,1fr]">
              <div class="rounded-2xl border border-[#F2C57C]/40 bg-white p-4">
                <div class="mb-3 text-sm font-semibold text-[#3B2F2F]/70">${this.msg.loadingListarItensCardapio}</div>
                <div class="grid gap-3">
                  ${(this.itensCardapio ?? []).map(
                    item => html`
                      <div class="flex items-center justify-between rounded-xl border border-[#F6F1EB] bg-[#F6F1EB]/60 p-3">
                        <div>
                          <div class="font-medium">${item.nome ?? ''}</div>
                          <div class="text-xs text-[#3B2F2F]/60">${item.menuItemId ?? ''}</div>
                        </div>
                        <div class="text-right text-sm font-semibold">${item.preco ?? 0}</div>
                      </div>
                    `,
                  )}
                </div>
              </div>
              <div class="rounded-2xl border border-[#F2C57C]/40 bg-white p-4">
                <div class="mb-3 text-sm font-semibold text-[#3B2F2F]/70">${this.msg.loadingListarCategoriasCardapio}</div>
                <div class="grid gap-3">
                  ${(this.categoriasCardapio ?? []).map(
                    item => html`
                      <div class="rounded-xl border border-[#F6F1EB] bg-[#F6F1EB]/60 p-3">
                        <div class="font-medium">${item.nome ?? ''}</div>
                        <div class="text-xs text-[#3B2F2F]/60">${item.categoriaId ?? ''}</div>
                      </div>
                    `,
                  )}
                </div>
              </div>
            </div>
          </section>

          <section class="grid gap-6 rounded-3xl border border-[#F2C57C]/40 bg-white/80 p-6 shadow">
            <div class="flex flex-wrap items-center justify-between gap-4">
              <div class="text-lg font-semibold text-[#3B2F2F]">${this.msg.loadingListarItensEstoque}</div>
              <button
                class="rounded-lg bg-[#2E7D32] px-4 py-2 text-sm font-semibold text-white shadow-sm transition hover:bg-[#276A2B] disabled:cursor-not-allowed disabled:opacity-60"
                ?disabled=${criarOuAtualizarItemEstoqueBusy}
                @click=${this.handleCriarOuAtualizarItemEstoqueClick}
              >
                ${criarOuAtualizarItemEstoqueBusy
                  ? this.msg.criarOuAtualizarItemEstoqueLoading
                  : this.msg.criarOuAtualizarItemEstoqueLabel}
              </button>
            </div>

            <div class="grid gap-6 lg:grid-cols-[2fr,1fr]">
              <div class="rounded-2xl border border-[#F2C57C]/40 bg-white p-4">
                <div class="mb-3 text-sm font-semibold text-[#3B2F2F]/70">${this.msg.loadingListarItensEstoque}</div>
                <div class="grid gap-3">
                  ${(this.itensEstoque ?? []).map(
                    item => html`
                      <div class="flex items-center justify-between rounded-xl border border-[#F6F1EB] bg-[#F6F1EB]/60 p-3">
                        <div>
                          <div class="font-medium">${item.nome ?? ''}</div>
                          <div class="text-xs text-[#3B2F2F]/60">${item.stockItemId ?? ''}</div>
                        </div>
                        <div class="text-right text-sm">
                          <div class="font-semibold">${item.quantidadeAtual ?? 0}</div>
                          <div class="text-xs text-[#3B2F2F]/60">${item.status ?? ''}</div>
                        </div>
                      </div>
                    `,
                  )}
                </div>
              </div>
              <div class="rounded-2xl border border-[#F2C57C]/40 bg-white p-4">
                <div class="mb-3 text-sm font-semibold text-[#3B2F2F]/70">${this.msg.loadingListarMovimentacoesEstoque}</div>
                <button
                  class="mb-4 w-full rounded-lg bg-[#C85A2A] px-4 py-2 text-sm font-semibold text-white shadow-sm transition hover:bg-[#B14D22] disabled:cursor-not-allowed disabled:opacity-60"
                  ?disabled=${registrarMovimentacaoEstoqueBusy}
                  @click=${this.handleRegistrarMovimentacaoEstoqueClick}
                >
                  ${registrarMovimentacaoEstoqueBusy
                    ? this.msg.registrarMovimentacaoEstoqueLoading
                    : this.msg.registrarMovimentacaoEstoqueLabel}
                </button>
                <div class="grid gap-3">
                  ${(this.movimentacoesEstoque ?? []).map(
                    item => html`
                      <div class="rounded-xl border border-[#F6F1EB] bg-[#F6F1EB]/60 p-3">
                        <div class="flex items-center justify-between">
                          <div class="text-sm font-medium">${item.stockItemId ?? ''}</div>
                          <div class="text-xs text-[#3B2F2F]/60">${item.movementType ?? ''}</div>
                        </div>
                        <div class="mt-2 flex items-center justify-between text-xs text-[#3B2F2F]/70">
                          <span>${item.quantity ?? 0}</span>
                          <span>${item.occurredAt ?? ''}</span>
                        </div>
                      </div>
                    `,
                  )}
                </div>
              </div>
            </div>

            <div class="rounded-2xl border border-[#F2C57C]/40 bg-white p-4">
              <div class="mb-3 text-sm font-semibold text-[#3B2F2F]/70">${this.msg.loadingListarAlertasEstoqueBaixo}</div>
              <div class="grid gap-3 md:grid-cols-2">
                ${(this.alertasEstoqueBaixo ?? []).map(
                  item => html`
                    <div class="rounded-xl border border-[#F6F1EB] bg-[#F6F1EB]/60 p-3">
                      <div class="flex items-center justify-between">
                        <div class="font-medium">${item.stockItemId ?? ''}</div>
                        <div class="text-xs text-[#3B2F2F]/60">${item.status ?? ''}</div>
                      </div>
                      <div class="mt-2 flex items-center justify-between text-xs text-[#3B2F2F]/70">
                        <span>${item.currentQuantity ?? 0}</span>
                        <span>${item.minimumQuantity ?? 0}</span>
                      </div>
                      <div class="mt-2 text-xs text-[#3B2F2F]/60">${item.triggeredAt ?? ''}</div>
                    </div>
                  `,
                )}
              </div>
            </div>
          </section>
        </div>
      </div>
    `;
  }
}
