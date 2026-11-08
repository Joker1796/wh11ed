<template>
  <span
    class="rsp"
    :class="{ large }"
  >
    <span class="rsp-row">
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
/* One row of plates, always, the invulnerable save last (owner, 2026-11-07): where seven do not
   fit at full size — a phone, a list in a narrow column (a finished game's desk, two cards compared
   beside it) — every plate narrows, and its number and label with it. They wrapped like words until
   then, and the save landed alone on a second line under M. The row is a container, so the plates
   are sized by the room they are given wherever they are drawn: each size is min(full, a share of
   the row's width) that reaches full exactly where seven full plates fit (17.9rem; 20.7 large). */
.rsp { display: block; container-type: inline-size; margin: 0.15rem 0; }
.rsp-row {
  --plate: 2.3rem;
  display: grid;
  grid-auto-flow: column;
  grid-auto-columns: minmax(0, var(--plate));
  gap: min(0.3rem, 1.5cqi);
  justify-content: start;
}
.rvst { display: flex; flex-direction: column; align-items: center; gap: 2px; min-width: 0; }
/* A plate the modifier layer rewrote — the same accent treatment DatasheetCard gives a modified
   value, so the list and the card agree at a glance as well as in the number. */
.rvst-mod .rvst-box { color: var(--accent-ink); }
.rvst-label { font-size: min(0.58rem, 3.2cqi); font-weight: 700; letter-spacing: 0.5px; color: var(--text-muted); }
.rvst-box {
  --cut: 4px;
  width: 100%;
  padding: 0.16rem 0.1rem;
  font-size: min(0.84rem, 4.7cqi);
}
/* Invulnerable save — its own plate after OC, colour-called-out the way DatasheetCard's
   accent-coloured "Invulnerable Save" label calls it out (a distinct accent fill, not just
   another neutral box, so it reads as "special" among the plain stats). */
.rvst-inv .rvst-label { color: var(--accent-ink); }
.rvst-inv .rvst-box { background: var(--accent); color: var(--text-on-accent, #fff); }
.rvst-inv .rvst-box::before { background: var(--accent); }
/* The plates larger in the game (owner, 2026-09-30): each up to 2.7rem wide, so a wide phone gets
   big ones; narrower, they shrink with the row. */
.large .rsp-row { --plate: 2.7rem; }
.large .rvst-box { padding: 0.22rem 0.1rem; font-size: min(1.02rem, 4.9cqi); --cut: 5px; }
.large .rvst-label { font-size: min(0.64rem, 3.1cqi); }
</style>
