<template>
  <FactionAccentScope
    :faction-slug="factionSlug"
    class="rum-own-scope"
  >
    <button
      data-press="pop"
      data-press-sound="toggle"
      type="button"
      class="rum-own"
      :class="{ on: owned }"
      :aria-pressed="owned"
      :title="owned ? labels.dsOwnRemove : labels.dsOwnAdd"
      :aria-label="owned ? labels.dsOwnRemove : labels.dsOwnAdd"
      @click="toggleOwned(factionSlug, unitId, name)"
    >
      <i :class="owned ? 'wi wi-own-on' : 'wi wi-own'" />
    </button>
  </FactionAccentScope>
</template>

<script setup>
// "I own this one" — the only place in the builder the collection is edited: the catalogue row
// just shows the mark (2026-09-26, owner's ask). Keyed by the unit's own faction and id (an allied
// unit's are the ally's), so the mark lands where the datasheet pages keep it. Stands in the unit
// dialog's header and in the desk's unit column (RosterUnitRulesModal / RosterUnitRulesCard).
import { computed } from 'vue'
import FactionAccentScope from './FactionAccentScope.vue'
import { ui } from '../../i18n/ui.js'
import { useLocale } from '../../composables/useLocale.js'
import { useCollection } from '../../composables/useCollection.js'

const props = defineProps({
  factionSlug: { type: String, required: true },
  unitId: { type: String, required: true },
  name: { type: String, default: '' },
})

const { locale } = useLocale()
const labels = computed(() => ui[locale.value])
const { isOwned, toggleOwned } = useCollection()
const owned = computed(() => isOwned(props.factionSlug, props.unitId))
</script>

<style scoped>
/* A dialog's header sits outside the body's FactionAccentScope, so the star gets a scope of its own —
   `display: contents` keeps the wrapper out of the header's flex row while the faction's
   `--accent` still cascades to the button (owner's ask, 2026-09-26). */
.rum-own-scope { display: contents; }
.rum-own {
  flex-shrink: 0;
  min-width: 36px;
  min-height: 36px;
  background: none;
  border: none;
  color: var(--text-muted);
  font-size: 1.05rem;
  cursor: pointer;
}
.rum-own.on { color: var(--accent-ink); }
/* The close button's hover plate beside it, so the star reads as a button too. */
@media (hover: hover) {
  .rum-own:hover { background: color-mix(in srgb, var(--text-primary) 8%, transparent); color: var(--text-primary); }
  .rum-own.on:hover { color: var(--accent-ink); }
}

</style>
