<template>
  <div class="ss">
    <div v-for="row in rows" :key="row.key" class="ss-row">
      <span class="ss-who">{{ row.label }}</span>
      <span class="ss-bar">
        <span
          v-for="p in parts"
          :key="p.key"
          class="ss-seg"
          :class="'ss-' + p.key"
          :style="{ width: width(row.value[p.key]) }"
          :title="`${p.label}: ${fmt(row.value[p.key])}`"
        ></span>
      </span>
      <span class="ss-total">{{ fmt(total(row.value)) }}</span>
    </div>
    <ul class="ss-legend">
      <li v-for="p in parts" :key="p.key">
        <i class="ss-key" :class="'ss-' + p.key"></i>
        {{ p.label }}
        <b>{{ fmt(rows[0]?.value?.[p.key] || 0) }}</b>
      </li>
    </ul>
  </div>
</template>

<script setup>
// Average score broken into primary / secondary / battle-ready, you against your opponents. The
// legend carries YOUR numbers — the opponent bar is there for comparison, not for study.
import { computed } from 'vue'

const props = defineProps({
  rows: { type: Array, required: true },    // [{ key, label, value: { primary, secondary, bonus } }]
  parts: { type: Array, required: true },   // [{ key, label }]
})

const max = computed(() => Math.max(1, ...props.rows.map((r) => total(r.value))))
function total(v) {
  return (v?.primary || 0) + (v?.secondary || 0) + (v?.bonus || 0)
}
function width(v) {
  return `${((v || 0) / max.value) * 100}%`
}
function fmt(v) {
  return Math.round(v || 0)
}
</script>

<style scoped>
.ss { display: flex; flex-direction: column; gap: 0.45rem; }
.ss-row {
  display: grid;
  grid-template-columns: minmax(4.5rem, auto) 1fr auto;
  align-items: center;
  gap: 0.5rem;
  font-size: 0.82rem;
}
.ss-who { color: var(--text-secondary); }
.ss-bar { display: flex; height: 0.8rem; overflow: hidden; background: var(--bg-secondary); }
.ss-seg { display: block; height: 100%; }
.ss-primary { background: var(--accent); }
.ss-secondary { background: var(--text-muted); }
.ss-bonus { background: #e3b341; }
.ss-total { color: var(--text-primary); font-weight: 600; font-variant-numeric: tabular-nums; }

.ss-legend {
  list-style: none;
  display: flex;
  flex-wrap: wrap;
  gap: 0.15rem 0.9rem;
  margin: 0.15rem 0 0;
  padding: 0;
  font-size: 0.75rem;
  color: var(--text-muted);
}
.ss-legend b { color: var(--text-primary); font-weight: 600; margin-left: 0.15rem; }
.ss-key { display: inline-block; width: 0.6rem; height: 0.6rem; margin-right: 0.3rem; }
</style>
