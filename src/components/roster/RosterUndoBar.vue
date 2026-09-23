<template>
  <Transition name="rub-undo">
    <div
      v-if="undoable"
      class="ru-bar"
      role="status"
    >
      <div class="ru-inner">
        <i
          class="bi bi-trash3 ru-icon"
          aria-hidden="true"
        />
        <span class="ru-text">{{ labels.rosterRemoved.replace('{name}', undoable.name) }}</span>
        <button
          type="button"
          class="ru-undo"
          @click="$emit('undo')"
        >
          {{ labels.rosterUndo }}
        </button>
        <button
          type="button"
          class="ru-close"
          :aria-label="labels.modalClose"
          @click="$emit('dismiss')"
        >
          ✕
        </button>
      </div>
    </div>
  </Transition>
</template>

<script setup>
import { computed } from 'vue'
import { ui } from '../../i18n/ui.js'
import { useLocale } from '../../composables/useLocale.js'

// The offer to put back what was just removed. It is a REPORT with one action, not a dialog: it
// takes no focus, nothing waits on it, and ignoring it is the ordinary outcome — the removal has
// already happened. `role="status"` rather than `alert` for the same reason.
defineProps({
  // { name } while the offer stands, null otherwise — useRosterUndo's own `undoable`.
  undoable: { type: Object, default: null },
})
defineEmits(['undo', 'dismiss'])

const { locale } = useLocale()
const labels = computed(() => ui[locale.value])
</script>

<style scoped>
/* Same floating tier as MobileUtilityBar, one step above it: on the roster screens both can be up
   at once (the "To game" chip, the wizard's fixed Back/Next bar), and they must not overlap. The
   stack from the bottom edge: bottom-nav, .rc-sticky (--roster-sticky-h), MobileUtilityBar
   (--mobile-bar-h), this. */
.ru-bar {
  position: fixed;
  left: 0;
  right: 0;
  bottom: calc(52px + var(--safe-bottom, 0px) + 0.5rem + var(--roster-sticky-h, 0px) + var(--mobile-bar-h, 0px));
  z-index: 196;
  padding: 0 calc(0.75rem + var(--safe-right)) 0 calc(0.75rem + var(--safe-left));
  pointer-events: none;
}
@media (min-width: 901px) {
  .ru-bar { bottom: calc(var(--roster-sticky-h, 0px) + 1rem); }
}
/* The bar is an always-dark surface, so its accent is the faction's DARK one — `--fa-dark`, the
   half of the pair the screens fold into `--accent` only in the dark theme (useFactionAccent).
   Reading `--accent` here would hand it the light theme's faction colour on a near-black bar, and
   `--accent-on-dark` would hand every army the same red: the border followed the faction and the
   button did not, which is what the owner saw on a Necron list. The fallback is for a roster with
   no faction picked yet. */
.ru-inner {
  pointer-events: auto;
  display: flex;
  align-items: center;
  gap: 0.6rem;
  max-width: 34rem;
  margin: 0 auto;
  padding: 0.5rem 0.5rem 0.5rem 0.75rem;
  background: var(--bg-insert);
  border: 1px solid color-mix(in srgb, var(--ru-accent) 45%, var(--bg-insert));
  box-shadow: 0 6px 24px rgba(0, 0, 0, 0.45);
  color: var(--text-on-dark);
  --ru-accent: var(--fa-dark, var(--accent-on-dark));
}
.ru-icon { flex-shrink: 0; color: var(--ru-accent); }
.ru-text {
  flex: 1;
  min-width: 0;
  font-size: 0.85rem;
  line-height: 1.3;
  overflow-wrap: anywhere;
}
/* The one action, loud enough to be the reason the bar is there. The accent carries it as an
   OUTLINE, not as the letters: a faction accent on this surface runs around 3:1, which is fine for
   a border (1.4.11) and short of the 4.5 text owes — so the word itself takes the bar's own
   high-contrast ink and the box does the shouting. */
.ru-undo {
  flex-shrink: 0;
  min-height: 32px;
  padding: 0 0.7rem;
  border: 1px solid var(--ru-accent);
  background: none;
  color: var(--text-on-dark);
  font: inherit;
  font-size: 0.85rem;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.03em;
  cursor: pointer;
}
@media (hover: hover) { .ru-undo:hover { background: color-mix(in srgb, var(--ru-accent) 22%, transparent); } }
.ru-close {
  flex-shrink: 0;
  min-width: 32px;
  min-height: 32px;
  border: none;
  background: none;
  color: var(--text-on-dark);
  opacity: 0.7;
  font-size: 0.9rem;
  cursor: pointer;
}
@media (hover: hover) { .ru-close:hover { opacity: 1; } }

.rub-undo-enter-active,
.rub-undo-leave-active { transition: opacity 0.18s ease, transform 0.18s ease; }
.rub-undo-enter-from,
.rub-undo-leave-to { opacity: 0; transform: translateY(0.5rem); }
@media (prefers-reduced-motion: reduce) {
  .rub-undo-enter-active,
  .rub-undo-leave-active { transition: none; }
  .rub-undo-enter-from,
  .rub-undo-leave-to { transform: none; }
}
</style>
