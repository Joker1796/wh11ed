<template>
  <span
    class="rsp"
    :class="{ large }"
  >
    <span
      v-for="s in stats"
      :key="s.label"
      class="rvst"
      :class="{ 'rvst-inv': s.inv, 'rvst-mod': s.mod }"
    >
      <span class="rvst-label">{{ s.label }}</span>
      <span class="stat-plate rvst-box">{{ s.value }}</span>
    </span>
  </span>
</template>

<script setup>
// A unit's statline as the roster's list rows draw it: the global `.stat-plate` (DatasheetCard's
// plate) scaled down, the invulnerable save called out, a value the modifier layer rewrote in the
// accent. The roster screen's rows draw it, and so does the tracker's help for "Live modifiers",
// which shows the very plates it is talking about (owner, 2026-10-15).
defineProps({
  // [{ label, value, inv?, mod? }] — RosterViewView's rowMeta stats
  stats: { type: Array, required: true },
  // The game screen's larger plates, sharing the row (rv-in-game).
  large: { type: Boolean, default: false },
})
</script>

<style scoped>
/* Wraps only when the row is narrower than seven plates and the points beside them — a list in a
   narrow column (a finished game's desk, two cards compared beside it); it ran under the points. */
.rsp { display: inline-flex; flex-wrap: wrap; gap: 0.3rem; margin: 0.15rem 0; }
.rvst { display: inline-flex; flex-direction: column; align-items: center; gap: 2px; }
/* A plate the modifier layer rewrote — the same accent treatment DatasheetCard gives a modified
   value, so the list and the card agree at a glance as well as in the number. */
.rvst-mod .rvst-box { color: var(--accent-ink); }
.rvst-label { font-size: 0.58rem; font-weight: 700; letter-spacing: 0.5px; color: var(--text-muted); }
.rvst-box {
  --cut: 4px;
  min-width: 1.85rem;
  padding: 0.16rem 0.22rem;
  font-size: 0.84rem;
}
/* Invulnerable save — its own plate right after SV, colour-called-out the way DatasheetCard's
   accent-coloured "Invulnerable Save" label calls it out (a distinct accent fill, not just
   another neutral box, so it reads as "special" among the plain stats). */
.rvst-inv .rvst-label { color: var(--accent-ink); }
.rvst-inv .rvst-box { background: var(--accent); color: var(--text-on-accent, #fff); }
.rvst-inv .rvst-box::before { background: var(--accent); }
/* The plates larger in the game (owner, 2026-09-30): they share the row left of the points, each
   up to 2.7rem wide, so a wide phone gets big ones and a 320px one still fits all seven. */
.large { display: flex; }
.large .rvst { flex: 0 1 2.7rem; min-width: 0; }
.large .rvst-box { width: 100%; min-width: 0; padding: 0.22rem 0.1rem; font-size: 1.02rem; --cut: 5px; }
.large .rvst-label { font-size: 0.64rem; }
</style>
