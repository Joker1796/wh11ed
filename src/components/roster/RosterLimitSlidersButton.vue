<template>
  <!-- The sliders that open a custom limit's dialog — beside the desk's field, inside the phone's
       custom panel (RosterBattleSizeField). Lit in the accent once the player's own limits are in
       force; sinks under the finger like the app's other buttons (pressFeedback.js). -->
  <button
    type="button"
    class="lsb"
    data-press
    :class="{ own }"
    :aria-label="label"
    :title="label"
  >
    <i class="bi bi-sliders" />
  </button>
</template>

<script setup>
defineProps({
  own: { type: Boolean, default: false },
  label: { type: String, default: '' },
})
</script>

<style scoped>
/* A square the height of the box beside it: the desk's field (0.9rem type, 1.5 line, 0.35rem
   padding, its border) unless the caller sets `--lsb-size` (the phone's 40px stepper). */
.lsb {
  --lsb-auto: calc(0.9rem * 1.5 + 0.7rem + 2px);
  display: inline-flex;
  flex-shrink: 0;
  align-items: center;
  justify-content: center;
  width: var(--lsb-size, var(--lsb-auto));
  height: var(--lsb-size, var(--lsb-auto));
  padding: 0;
  font-size: 0.9rem;
  line-height: 1;
  background: var(--bg-secondary);
  border: 1px solid var(--border);
  color: var(--text-muted);
  cursor: pointer;
}
.lsb.own { color: var(--accent-ink); border-color: var(--accent); }
@media (hover: hover) { .lsb:hover { color: var(--accent-ink); border-color: var(--accent); } }
</style>
