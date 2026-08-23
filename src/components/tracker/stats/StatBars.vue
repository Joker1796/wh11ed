<template>
  <ul class="sb">
    <li v-for="r in rows" :key="r.key" class="sb-row" :class="{ dim: r.dim }">
      <span class="sb-label" :title="r.label">
        {{ r.label }}
        <span v-if="r.sub" class="sb-sub">{{ r.sub }}</span>
      </span>
      <span class="sb-track">
        <span class="sb-fill" :style="{ width: width(r.ratio) }"></span>
      </span>
      <span class="sb-val">{{ r.value }}</span>
    </li>
  </ul>
</template>

<script setup>
// One breakdown list — faction, opponent, mission, secondary card. The bar is the glance and the
// value on the right is the answer; `dim` is how a row says "too few games to read as a rate"
// (gameStats.MIN_SAMPLE), which is a shade, not a hidden row: the games still happened.
defineProps({
  rows: { type: Array, required: true },   // [{ key, label, sub, ratio: 0..1, value, dim }]
})

function width(ratio) {
  const r = Math.max(0, Math.min(1, Number(ratio) || 0))
  // Never zero-width: a row that scored nothing still needs a visible baseline.
  return `${Math.max(r * 100, 1.5)}%`
}
</script>

<style scoped>
.sb { list-style: none; margin: 0; padding: 0; display: flex; flex-direction: column; gap: 0.3rem; }
.sb-row {
  display: grid;
  grid-template-columns: minmax(5rem, 1fr) minmax(3rem, 1.2fr) auto;
  align-items: center;
  gap: 0.5rem;
  font-size: 0.82rem;
}
.sb-label {
  color: var(--text-primary);
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
.sb-sub { color: var(--text-dim); font-size: 0.72rem; margin-left: 0.35rem; }
.sb-track {
  height: 0.5rem;
  border-radius: 999px;
  background: var(--bg-secondary);
  overflow: hidden;
}
.sb-fill {
  display: block;
  height: 100%;
  background: var(--accent);
  border-radius: 999px;
}
.sb-val { color: var(--text-secondary); font-variant-numeric: tabular-nums; white-space: nowrap; }
.sb-row.dim .sb-fill { background: var(--text-dim); opacity: 0.55; }
.sb-row.dim .sb-val { color: var(--text-dim); }
</style>
