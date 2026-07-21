<template>
  <BaseModal :title="labels.trackerSelectFaction" @close="$emit('close')">
    <div class="modal-body">
      <template v-if="pinned.length">
        <h4 class="fp-group">{{ labels.favPinnedGroup }}</h4>
        <div v-for="f in pinned" :key="'pin-' + f.slug" class="fac" :class="{ on: selected === f.slug }">
          <button class="fac-link" @click="$emit('pick', f.slug)">
            <span class="fac-name">{{ f.name }}</span>
            <span v-if="selected === f.slug" class="fac-check">✓</span>
          </button>
          <FavoriteStar :pinned="true" @toggle="toggleFaction(f.slug)" />
        </div>
      </template>
      <template v-for="g in groups" :key="g.id">
        <h4 class="fp-group">{{ groupLabel(g.id) }}</h4>
        <div v-for="f in g.factions" :key="f.slug" class="fac" :class="{ on: selected === f.slug }">
          <button class="fac-link" @click="$emit('pick', f.slug)">
            <span class="fac-name">{{ f.name }}</span>
            <span v-if="selected === f.slug" class="fac-check">✓</span>
          </button>
          <FavoriteStar :pinned="isFactionPinned(f.slug)" @toggle="toggleFaction(f.slug)" />
        </div>
      </template>
    </div>
  </BaseModal>
</template>

<script setup>
// Single-select faction picker — same modal shell + button-list styling as DetachmentPickerModal,
// so faction and detachment selection read as one consistent flow. Factions are grouped
// (Astartes / Imperium / Chaos / Xenos / Other) under subheadings. Picking one emits `pick` and the
// parent closes the modal. A star pins a faction to the "Pinned" group at the top (useFavorites),
// so your usual faction isn't buried at the bottom of the list every game.
import { computed } from 'vue'
import BaseModal from '../BaseModal.vue'
import FavoriteStar from '../FavoriteStar.vue'
import { ui } from '../../i18n/ui.js'
import { useLocale } from '../../composables/useLocale.js'
import { useFavorites } from '../../composables/useFavorites.js'
import { FACTION_GROUPS } from '../../composables/trackerFactions.js'

defineProps({
  selected: { type: String, default: null },
})
defineEmits(['pick', 'close'])

const { locale } = useLocale()
const labels = computed(() => ui[locale.value])
const groups = FACTION_GROUPS

const { isFactionPinned, toggleFaction, pinnedFactionsFrom } = useFavorites()
const pinned = computed(() => pinnedFactionsFrom(groups))

const GROUP_LABEL_KEYS = {
  astartes: 'factionGroupAstartes', imperium: 'factionGroupImperium',
  chaos: 'factionGroupChaos', xenos: 'factionGroupXenos', other: 'factionGroupOther',
}
function groupLabel(id) { return labels.value[GROUP_LABEL_KEYS[id]] || '' }
</script>

<style scoped>
.modal-body {
  display: flex;
  flex-direction: column;
  gap: 0.3rem;
  padding: 0.75rem;
  overflow-y: auto;
}
.fp-group {
  font-size: 0.72rem;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.04em;
  color: var(--text-dim);
  margin: 0.6rem 0 0.1rem;
}
.fp-group:first-child { margin-top: 0; }

.fac {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.5rem 0.55rem;
  border: 1px solid var(--border);
  background: var(--bg-secondary);
  border-radius: 4px;
  transition: background 0.15s, border-color 0.15s;
}
.fac:has(.fac-link:hover) { border-color: var(--accent); }
.fac.on { background: color-mix(in srgb, var(--accent) 16%, transparent); border-color: var(--accent); }
.fac-link {
  flex: 1;
  min-width: 0;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 0.5rem;
  text-align: left;
  background: none;
  border: none;
  padding: 0;
  cursor: pointer;
}
.fac-name { font-size: 0.85rem; font-weight: 600; color: var(--text-primary); }
.fac-check { color: var(--accent); font-weight: 700; flex-shrink: 0; }
</style>
