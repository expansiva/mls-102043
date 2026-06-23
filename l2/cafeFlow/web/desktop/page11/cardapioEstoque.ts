/// <mls fileReference="_102043_/l2/cafeFlow/web/desktop/page11/cardapioEstoque.ts" enhancement="_102027_/l2/enhancementLit.ts" />
import { html } from 'lit';
import { customElement } from 'lit/decorators.js';
import { CardapioEstoqueBase } from '/_102043_/l2/cafeFlow/web/shared/cardapioEstoque.js';

@customElement('cafe-flow--web--desktop--page11--cardapio-estoque-102043')
export class CardapioEstoqueDesktopPage11CardapioEstoquePage extends CardapioEstoqueBase {
  render() {
    const criarOuAtualizarItemCardapioBusy = this.criarOuAtualizarItemCardapioState === 'loading';
    const criarOuAtualizarItemEstoqueBusy = this.criarOuAtualizarItemEstoqueState === 'loading';
    const registrarMovimentacaoEstoqueBusy = this.registrarMovimentacaoEstoqueState === 'loading';
    return html`
      <div class="min-h-full bg-slate-50 dark:bg-slate-950">
        <div class="max-w-6xl mx-auto px-4 py-6 space-y-6">
          <header class="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
            <div>
              <h1 class="text-2xl font-semibold text-slate-900 dark:text-slate-100">${this.msg.pageTitle}</h1>
              <p class="text-sm text-slate-500 dark:text-slate-400">${this.msg.loaded}</p>
            </div>
            <button
              class="rounded-md px-3 py-1.5 text-sm font-medium transition-colors bg-sky-600 hover:bg-sky-500 text-white focus:ring-2 focus:ring-sky-500"
              @click=${this.handleNavigateToDashboardGerenteClick}
            >
              ${this.msg.navigateToDashboardGerente}
            </button>
          </header>

          ${this.status
            ? html`
                <div
                  class="rounded-lg border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 px-4 py-3 text-sm text-slate-900 dark:text-slate-100"
                >
                  ${this.status}
                </div>
              `
            : html``}

          <section class="rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-5 space-y-4">
            <div class="flex items-center justify-between">
              <h2 class="text-lg font-medium text-slate-900 dark:text-slate-100">${this.msg.loadingListarItensCardapio}</h2>
              <span class="text-xs text-slate-400 dark:text-slate-500">${this.msg.loadingListarCategoriasCardapio}</span>
            </div>
            <div class="grid gap-6 lg:grid-cols-[2fr_1fr]">
              <div class="space-y-4">
                <div class="overflow-hidden rounded-lg border border-slate-200 dark:border-slate-800">
                  ${this.itensCardapio?.length
                    ? html`
                        <table class="min-w-full divide-y divide-slate-100 dark:divide-slate-800">
                          <thead class="bg-slate-50 dark:bg-slate-800/50">
                            <tr>
                              <th class="px-3 py-2 text-left text-xs font-medium text-slate-400 dark:text-slate-500">
                                ${this.msg.pageTitle}
                              </th>
                              <th class="px-3 py-2 text-left text-xs font-medium text-slate-400 dark:text-slate-500">
                                ${this.msg.criarOuAtualizarItemCardapioLabel}
                              </th>
                              <th class="px-3 py-2 text-left text-xs font-medium text-slate-400 dark:text-slate-500">
                                ${this.msg.loadingListarCategoriasCardapio}
                              </th>
                              <th class="px-3 py-2 text-left text-xs font-medium text-slate-400 dark:text-slate-500">
                                ${this.msg.loaded}
                              </th>
                            </tr>
                          </thead>
                          <tbody class="divide-y divide-slate-100 dark:divide-slate-800">
                            ${(this.itensCardapio ?? []).map(item => html`
                              <tr
                                class="cursor-pointer hover:bg-slate-50 dark:hover:bg-slate-800/40"
                                @click=${() => {
                                  this.menuItemId = item.menuItemId;
                                  this.nome = item.nome;
                                  this.preco = item.preco;
                                  this.categoriaId = item.categoriaId;
                                  this.ativo = item.ativo;
                                }}
                              >
                                <td class="px-3 py-2 text-sm text-slate-900 dark:text-slate-100">${item.nome}</td>
                                <td class="px-3 py-2 text-sm text-slate-900 dark:text-slate-100">${item.preco}</td>
                                <td class="px-3 py-2 text-sm text-slate-500 dark:text-slate-400">
                                  ${this.categoriasCardapio.find(cat => cat.categoriaId === item.categoriaId)?.nome ?? ''}
                                </td>
                                <td class="px-3 py-2 text-sm">
                                  ${item.ativo
                                    ? html`<span class="text-emerald-600 dark:text-emerald-400">${this.msg.loaded}</span>`
                                    : html`<span class="text-amber-600 dark:text-amber-400">${this.msg.couldNotLoad}</span>`}
                                </td>
                              </tr>
                            `)}
                          </tbody>
                        </table>
                      `
                    : html`
                        <div class="px-3 py-6 text-center text-sm text-slate-500 dark:text-slate-400">
                          ${this.msg.loadingListarItensCardapio}
                        </div>
                      `}
                </div>

                <div class="rounded-lg border border-slate-200 dark:border-slate-800 p-4">
                  <h3 class="text-sm font-medium text-slate-900 dark:text-slate-100">
                    ${this.msg.loadingListarCategoriasCardapio}
                  </h3>
                  <div class="mt-3 space-y-2">
                    ${(this.categoriasCardapio ?? []).map(categoria => html`
                      <div
                        class="flex items-center justify-between rounded-md border border-slate-200 dark:border-slate-800 px-3 py-2 text-sm text-slate-900 dark:text-slate-100 cursor-pointer hover:bg-slate-50 dark:hover:bg-slate-800/40"
                        @click=${() => {
                          this.categoriaId = categoria.categoriaId;
                        }}
                      >
                        <span>${categoria.nome}</span>
                        ${categoria.ativo
                          ? html`<span class="text-emerald-600 dark:text-emerald-400">${this.msg.loaded}</span>`
                          : html`<span class="text-amber-600 dark:text-amber-400">${this.msg.couldNotLoad}</span>`}
                      </div>
                    `)}
                    ${this.categoriasCardapio?.length ? html`` : html`
                      <div class="text-sm text-slate-500 dark:text-slate-400">${this.msg.loadingListarCategoriasCardapio}</div>
                    `}
                  </div>
                </div>
              </div>

              <div class="rounded-lg border border-slate-200 dark:border-slate-800 p-4 space-y-3">
                <h3 class="text-sm font-medium text-slate-900 dark:text-slate-100">
                  ${this.msg.criarOuAtualizarItemCardapioLabel}
                </h3>
                <div class="space-y-3">
                  <input
                    class="w-full rounded-md border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 px-3 py-2 text-sm text-slate-900 dark:text-slate-100"
                    .value=${this.nome ?? ''}
                    @input=${(e: Event) => {
                      this.nome = (e.target as HTMLInputElement).value;
                    }}
                  />
                  <input
                    class="w-full rounded-md border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 px-3 py-2 text-sm text-slate-900 dark:text-slate-100"
                    type="number"
                    .value=${String(this.preco ?? 0)}
                    @input=${(e: Event) => {
                      this.preco = Number((e.target as HTMLInputElement).value);
                    }}
                  />
                  <select
                    class="w-full rounded-md border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 px-3 py-2 text-sm text-slate-900 dark:text-slate-100"
                    .value=${this.categoriaId ?? ''}
                    @change=${(e: Event) => {
                      this.categoriaId = (e.target as HTMLSelectElement).value;
                    }}
                  >
                    ${(this.categoriasCardapio ?? []).map(categoria => html`
                      <option value=${categoria.categoriaId}>${categoria.nome}</option>
                    `)}
                  </select>
                  <label class="flex items-center gap-2 text-sm text-slate-500 dark:text-slate-400">
                    <input
                      type="checkbox"
                      class="h-4 w-4 rounded border border-slate-300 dark:border-slate-700"
                      .checked=${this.ativo}
                      @change=${(e: Event) => {
                        this.ativo = (e.target as HTMLInputElement).checked;
                      }}
                    />
                    ${this.msg.loaded}
                  </label>
                </div>
                <button
                  class="w-full rounded-md px-3 py-1.5 text-sm font-medium transition-colors bg-sky-600 hover:bg-sky-500 text-white focus:ring-2 focus:ring-sky-500 disabled:opacity-50 disabled:cursor-not-allowed"
                  ?disabled=${criarOuAtualizarItemCardapioBusy}
                  @click=${this.handleCriarOuAtualizarItemCardapioClick}
                >
                  ${criarOuAtualizarItemCardapioBusy
                    ? this.msg.criarOuAtualizarItemCardapioLoading
                    : this.msg.criarOuAtualizarItemCardapioLabel}
                </button>
              </div>
            </div>
          </section>

          <section class="rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-5 space-y-4">
            <div class="flex items-center justify-between">
              <h2 class="text-lg font-medium text-slate-900 dark:text-slate-100">${this.msg.loadingListarItensEstoque}</h2>
              <span class="text-xs text-slate-400 dark:text-slate-500">${this.msg.loadingListarAlertasEstoqueBaixo}</span>
            </div>
            <div class="grid gap-6 lg:grid-cols-[2fr_1fr]">
              <div class="space-y-4">
                <div class="overflow-hidden rounded-lg border border-slate-200 dark:border-slate-800">
                  ${this.itensEstoque?.length
                    ? html`
                        <table class="min-w-full divide-y divide-slate-100 dark:divide-slate-800">
                          <thead class="bg-slate-50 dark:bg-slate-800/50">
                            <tr>
                              <th class="px-3 py-2 text-left text-xs font-medium text-slate-400 dark:text-slate-500">
                                ${this.msg.loadingListarItensEstoque}
                              </th>
                              <th class="px-3 py-2 text-left text-xs font-medium text-slate-400 dark:text-slate-500">
                                ${this.msg.criarOuAtualizarItemEstoqueLabel}
                              </th>
                              <th class="px-3 py-2 text-left text-xs font-medium text-slate-400 dark:text-slate-500">
                                ${this.msg.loaded}
                              </th>
                              <th class="px-3 py-2 text-left text-xs font-medium text-slate-400 dark:text-slate-500">
                                ${this.msg.loadingListarAlertasEstoqueBaixo}
                              </th>
                            </tr>
                          </thead>
                          <tbody class="divide-y divide-slate-100 dark:divide-slate-800">
                            ${(this.itensEstoque ?? []).map(item => html`
                              <tr
                                class="cursor-pointer hover:bg-slate-50 dark:hover:bg-slate-800/40"
                                @click=${() => {
                                  this.stockItemId = item.stockItemId;
                                  this.nome = item.nome;
                                  this.unidadeMedidaId = item.unidadeMedidaId;
                                  this.quantidadeMinima = item.quantidadeMinima;
                                }}
                              >
                                <td class="px-3 py-2 text-sm text-slate-900 dark:text-slate-100">${item.nome}</td>
                                <td class="px-3 py-2 text-sm text-slate-900 dark:text-slate-100">
                                  ${item.quantidadeAtual}
                                </td>
                                <td class="px-3 py-2 text-sm text-slate-500 dark:text-slate-400">
                                  ${item.unidadeMedidaId}
                                </td>
                                <td class="px-3 py-2 text-sm">
                                  ${item.status === 'baixo'
                                    ? html`<span class="text-amber-600 dark:text-amber-400">${item.status}</span>`
                                    : html`<span class="text-emerald-600 dark:text-emerald-400">${item.status}</span>`}
                                </td>
                              </tr>
                            `)}
                          </tbody>
                        </table>
                      `
                    : html`
                        <div class="px-3 py-6 text-center text-sm text-slate-500 dark:text-slate-400">
                          ${this.msg.loadingListarItensEstoque}
                        </div>
                      `}
                </div>

                <div class="overflow-hidden rounded-lg border border-slate-200 dark:border-slate-800">
                  ${this.movimentacoesEstoque?.length
                    ? html`
                        <table class="min-w-full divide-y divide-slate-100 dark:divide-slate-800">
                          <thead class="bg-slate-50 dark:bg-slate-800/50">
                            <tr>
                              <th class="px-3 py-2 text-left text-xs font-medium text-slate-400 dark:text-slate-500">
                                ${this.msg.loadingListarMovimentacoesEstoque}
                              </th>
                              <th class="px-3 py-2 text-left text-xs font-medium text-slate-400 dark:text-slate-500">
                                ${this.msg.loaded}
                              </th>
                              <th class="px-3 py-2 text-left text-xs font-medium text-slate-400 dark:text-slate-500">
                                ${this.msg.brand}
                              </th>
                              <th class="px-3 py-2 text-left text-xs font-medium text-slate-400 dark:text-slate-500">
                                ${this.msg.criarOuAtualizarItemEstoqueLabel}
                              </th>
                            </tr>
                          </thead>
                          <tbody class="divide-y divide-slate-100 dark:divide-slate-800">
                            ${(this.movimentacoesEstoque ?? []).map(item => html`
                              <tr class="hover:bg-slate-50 dark:hover:bg-slate-800/40">
                                <td class="px-3 py-2 text-sm text-slate-900 dark:text-slate-100">${item.stockItemId}</td>
                                <td class="px-3 py-2 text-sm text-slate-900 dark:text-slate-100">${item.movementType}</td>
                                <td class="px-3 py-2 text-sm text-slate-900 dark:text-slate-100">${item.quantity}</td>
                                <td class="px-3 py-2 text-sm text-slate-500 dark:text-slate-400">${item.occurredAt}</td>
                              </tr>
                            `)}
                          </tbody>
                        </table>
                      `
                    : html`
                        <div class="px-3 py-6 text-center text-sm text-slate-500 dark:text-slate-400">
                          ${this.msg.loadingListarMovimentacoesEstoque}
                        </div>
                      `}
                </div>

                <div class="overflow-hidden rounded-lg border border-slate-200 dark:border-slate-800">
                  ${this.alertasEstoqueBaixo?.length
                    ? html`
                        <table class="min-w-full divide-y divide-slate-100 dark:divide-slate-800">
                          <thead class="bg-slate-50 dark:bg-slate-800/50">
                            <tr>
                              <th class="px-3 py-2 text-left text-xs font-medium text-slate-400 dark:text-slate-500">
                                ${this.msg.loadingListarAlertasEstoqueBaixo}
                              </th>
                              <th class="px-3 py-2 text-left text-xs font-medium text-slate-400 dark:text-slate-500">
                                ${this.msg.loaded}
                              </th>
                              <th class="px-3 py-2 text-left text-xs font-medium text-slate-400 dark:text-slate-500">
                                ${this.msg.brand}
                              </th>
                              <th class="px-3 py-2 text-left text-xs font-medium text-slate-400 dark:text-slate-500">
                                ${this.msg.criarOuAtualizarItemEstoqueLabel}
                              </th>
                            </tr>
                          </thead>
                          <tbody class="divide-y divide-slate-100 dark:divide-slate-800">
                            ${(this.alertasEstoqueBaixo ?? []).map(alerta => html`
                              <tr class="hover:bg-slate-50 dark:hover:bg-slate-800/40">
                                <td class="px-3 py-2 text-sm text-slate-900 dark:text-slate-100">${alerta.stockItemId}</td>
                                <td class="px-3 py-2 text-sm text-slate-900 dark:text-slate-100">${alerta.currentQuantity}</td>
                                <td class="px-3 py-2 text-sm text-slate-500 dark:text-slate-400">${alerta.minimumQuantity}</td>
                                <td class="px-3 py-2 text-sm">
                                  ${alerta.status === 'aberto'
                                    ? html`<span class="text-amber-600 dark:text-amber-400">${alerta.status}</span>`
                                    : html`<span class="text-emerald-600 dark:text-emerald-400">${alerta.status}</span>`}
                                </td>
                              </tr>
                            `)}
                          </tbody>
                        </table>
                      `
                    : html`
                        <div class="px-3 py-6 text-center text-sm text-slate-500 dark:text-slate-400">
                          ${this.msg.loadingListarAlertasEstoqueBaixo}
                        </div>
                      `}
                </div>
              </div>

              <div class="space-y-4">
                <div class="rounded-lg border border-slate-200 dark:border-slate-800 p-4 space-y-3">
                  <h3 class="text-sm font-medium text-slate-900 dark:text-slate-100">
                    ${this.msg.criarOuAtualizarItemEstoqueLabel}
                  </h3>
                  <div class="space-y-3">
                    <input
                      class="w-full rounded-md border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 px-3 py-2 text-sm text-slate-900 dark:text-slate-100"
                      .value=${this.nome ?? ''}
                      @input=${(e: Event) => {
                        this.nome = (e.target as HTMLInputElement).value;
                      }}
                    />
                    <input
                      class="w-full rounded-md border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 px-3 py-2 text-sm text-slate-900 dark:text-slate-100"
                      .value=${this.unidadeMedidaId ?? ''}
                      @input=${(e: Event) => {
                        this.unidadeMedidaId = (e.target as HTMLInputElement).value;
                      }}
                    />
                    <input
                      class="w-full rounded-md border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 px-3 py-2 text-sm text-slate-900 dark:text-slate-100"
                      type="number"
                      .value=${String(this.quantidadeMinima ?? 0)}
                      @input=${(e: Event) => {
                        this.quantidadeMinima = Number((e.target as HTMLInputElement).value);
                      }}
                    />
                  </div>
                  <button
                    class="w-full rounded-md px-3 py-1.5 text-sm font-medium transition-colors bg-sky-600 hover:bg-sky-500 text-white focus:ring-2 focus:ring-sky-500 disabled:opacity-50 disabled:cursor-not-allowed"
                    ?disabled=${criarOuAtualizarItemEstoqueBusy}
                    @click=${this.handleCriarOuAtualizarItemEstoqueClick}
                  >
                    ${criarOuAtualizarItemEstoqueBusy
                      ? this.msg.criarOuAtualizarItemEstoqueLoading
                      : this.msg.criarOuAtualizarItemEstoqueLabel}
                  </button>
                </div>

                <div class="rounded-lg border border-slate-200 dark:border-slate-800 p-4 space-y-3">
                  <h3 class="text-sm font-medium text-slate-900 dark:text-slate-100">
                    ${this.msg.registrarMovimentacaoEstoqueLabel}
                  </h3>
                  <div class="space-y-3">
                    <input
                      class="w-full rounded-md border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 px-3 py-2 text-sm text-slate-900 dark:text-slate-100"
                      .value=${this.stockItemId ?? ''}
                      @input=${(e: Event) => {
                        this.stockItemId = (e.target as HTMLInputElement).value;
                      }}
                    />
                    <input
                      class="w-full rounded-md border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 px-3 py-2 text-sm text-slate-900 dark:text-slate-100"
                      .value=${this.movementType ?? ''}
                      @input=${(e: Event) => {
                        this.movementType = (e.target as HTMLInputElement).value;
                      }}
                    />
                    <input
                      class="w-full rounded-md border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 px-3 py-2 text-sm text-slate-900 dark:text-slate-100"
                      type="number"
                      .value=${String(this.quantity ?? 0)}
                      @input=${(e: Event) => {
                        this.quantity = Number((e.target as HTMLInputElement).value);
                      }}
                    />
                    <input
                      class="w-full rounded-md border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 px-3 py-2 text-sm text-slate-900 dark:text-slate-100"
                      .value=${this.reason ?? ''}
                      @input=${(e: Event) => {
                        this.reason = (e.target as HTMLInputElement).value;
                      }}
                    />
                    <input
                      class="w-full rounded-md border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 px-3 py-2 text-sm text-slate-900 dark:text-slate-100"
                      type="datetime-local"
                      .value=${this.occurredAt ?? ''}
                      @input=${(e: Event) => {
                        this.occurredAt = (e.target as HTMLInputElement).value;
                      }}
                    />
                  </div>
                  <button
                    class="w-full rounded-md px-3 py-1.5 text-sm font-medium transition-colors bg-sky-600 hover:bg-sky-500 text-white focus:ring-2 focus:ring-sky-500 disabled:opacity-50 disabled:cursor-not-allowed"
                    ?disabled=${registrarMovimentacaoEstoqueBusy}
                    @click=${this.handleRegistrarMovimentacaoEstoqueClick}
                  >
                    ${registrarMovimentacaoEstoqueBusy
                      ? this.msg.registrarMovimentacaoEstoqueLoading
                      : this.msg.registrarMovimentacaoEstoqueLabel}
                  </button>
                </div>
              </div>
            </div>
          </section>
        </div>
      </div>
    `;
  }
}
