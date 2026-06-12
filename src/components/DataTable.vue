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
          <td v-for="(cell, j) in row" :key="j" v-html="cell"></td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script setup>
defineProps({
  title: String,
  headers: Array,
  rows: Array,
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
</style>
