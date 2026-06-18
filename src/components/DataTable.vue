<template>
  <div class="table-wrap">
    <h4 v-if="title" class="table-title">{{ title }}</h4>
    <table>
      <thead>
        <tr>
          <th v-for="h in headers" :key="h">{{ h }}</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(row, i) in rows" :key="i">
          <td v-for="(cell, j) in row" :key="j" v-html="renderCell(cell)"></td>
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
})
</script>

<style scoped>
.table-wrap {
  overflow-x: auto;
  margin: 1.25rem 0;
  border: 1px solid var(--border);
  border-radius: 6px;
  overflow: hidden;
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
</style>
