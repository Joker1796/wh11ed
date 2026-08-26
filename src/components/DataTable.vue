<template>
  <div class="table-wrap" :class="{ stacked }">
    <h4 v-if="title" class="table-title">{{ title }}</h4>
    <table>
      <thead>
        <tr>
          <th v-for="h in headers" :key="h">{{ h }}</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(row, i) in rows" :key="i">
          <td v-for="(cell, j) in row" :key="j" :data-label="headers[j]" v-html="renderCell(cell)"></td>
        </tr>
      </tbody>
      <tfoot v-if="footnote">
        <tr>
          <td :colspan="headers.length" class="table-footnote" v-html="renderCell(footnote)"></td>
        </tr>
      </tfoot>
    </table>
  </div>
</template>

<script setup>
import { useRenderInline } from '../composables/useRenderInline.js'

const { renderInline } = useRenderInline()

function renderCell(cell) {
  const withDice = cell.replace(/\b([2-6])\+/g,
    (_, n) => `<i class="bi bi-dice-${n}-fill dice-icon"></i><span class="dice-plus">+</span>`)
  return renderInline(withDice)
}

defineProps({
  title: String,
  headers: Array,
  rows: Array,
  footnote: String,
  // Wide tables whose cells hold full sentences (not short stat values) don't fit a
  // side-by-side grid on a phone — even scrolled horizontally, columns end up too narrow
  // to read. `stacked` switches such tables to a label/value card layout below 700px
  // instead. Opt-in per table (most DataTable uses are short stat grids that read fine
  // scrolled horizontally and would look worse stacked).
  stacked: Boolean,
})
</script>

<style scoped>
.table-wrap {
  overflow-x: auto;
  margin: 1.25rem 0;
  border: 1px solid var(--border);
}

td:last-child,
th:last-child {
  text-align: center;
}

.table-title {
  font-family: var(--font-sans);
  font-size: 0.8rem;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.7px;
  color: var(--text-muted);
  padding: 0.65rem 1rem 0;
  background: var(--bg-card);
  margin: 0;
}

.table-footnote {
  text-align: left;
  font-size: 0.82rem;
  font-style: italic;
  color: var(--accent);
  background: var(--bg-row-hover);
  padding: 0.55rem 1rem;
}

@media (max-width: 700px) {
  .table-wrap.stacked table,
  .table-wrap.stacked thead,
  .table-wrap.stacked tbody,
  .table-wrap.stacked tr,
  .table-wrap.stacked td {
    display: block;
    width: 100%;
  }

  .table-wrap.stacked thead {
    display: none;
  }

  .table-wrap.stacked tbody tr {
    padding: 0.6rem 0.9rem;
    border-bottom: 1px solid var(--border-light);
  }

  .table-wrap.stacked tbody tr:last-child {
    border-bottom: none;
  }

  .table-wrap.stacked tbody td {
    padding: 0.25rem 0;
    text-align: left;
  }

  .table-wrap.stacked tbody td::before {
    content: attr(data-label);
    display: block;
    font-size: 0.7rem;
    font-weight: 700;
    text-transform: uppercase;
    letter-spacing: 0.4px;
    color: var(--text-muted);
    margin-bottom: 0.15rem;
  }
}
</style>
