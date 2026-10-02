<template>
  <!-- A pinned faction leaves its group for the top one, and slides there (useFlipMove). -->
  <div
    ref="listEl"
    class="modal-list"
    :class="{ 'fp-compact': compact }"
  >
    <template v-if="pinned.length">
      <h4
        class="fp-group"
        data-flip="h:pinned"
      >
        {{ labels.favPinnedGroup }}
      </h4>
      <FactionOption
        v-for="f in pinned"
        :key="'pin-' + f.slug"
        :data-flip="f.slug"
        :slug="f.slug"
        :name="f.name"
        :on="selected === f.slug"
        :compact="compact"
        @pick="$emit('pick', f.slug)"
      />
    </template>
    <template
      v-for="g in unpinned"
      :key="g.id"
    >
      <h4
        class="fp-group"
        :data-flip="'h:' + g.id"
      >
        {{ groupLabel(g.id) }}
      </h4>
      <FactionOption
        v-for="f in g.factions"
        :key="f.slug"
        :data-flip="f.slug"
        :slug="f.slug"
        :name="f.name"
        :on="selected === f.slug"
        :compact="compact"
        @pick="$emit('pick', f.slug)"
      />
    </template>
  </div>
</template>

<script setup>
// The faction list itself — grouped (Astartes / Imperium / Chaos / Xenos / Other), pinned ones on
// top — without the frame around it, so the modal (phones, the tracker) and the desk's dropdown
// (RosterSettingsBar) draw the same rows. A star moves a faction to the "Pinned" group
// (useFavorites), so your usual faction isn't buried at the bottom of the list every game.
import { computed, ref } from 'vue'
import FactionOption from '../FactionOption.vue'
import { ui } from '../../i18n/ui.js'
import { useLocale } from '../../composables/useLocale.js'
import { useFavorites } from '../../composables/useFavorites.js'
import { useFlipMove } from '../../composables/useFlipMove.js'
import { FACTION_GROUPS, COMBAT_PATROL_FACTION_GROUPS } from '../../composables/trackerFactions.js'
import { factionGroupLabelKey } from '../../data/factionsIndex.js'

const props = defineProps({
  selected: { type: String, default: null },
  // When true, only factions with a Combat Patrol box are shown (Game Setup's "Тип игры" ===
  // Combat Patrol) — see COMBAT_PATROL_FACTION_GROUPS.
  combatPatrolOnly: { type: Boolean, default: false },
  // The desk's dropdown: low rows in two columns, the group headings across both.
  compact: { type: Boolean, default: false },
})
defineEmits(['pick'])

const { locale } = useLocale()
const labels = computed(() => ui[locale.value])
const groups = computed(() => props.combatPatrolOnly ? COMBAT_PATROL_FACTION_GROUPS : FACTION_GROUPS)

const { pinnedFactionsFrom, unpinnedGroupsFrom } = useFavorites()
const pinned = computed(() => pinnedFactionsFrom(groups.value))
const unpinned = computed(() => unpinnedGroupsFrom(groups.value))
const listEl = ref(null)
useFlipMove(() => pinned.value.map((f) => f.slug), listEl)

function groupLabel(id) { return labels.value[factionGroupLabelKey(id)] || '' }
</script>

<style scoped>
.fp-compact {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 0.3rem;
}
.fp-compact .fp-group { grid-column: 1 / -1; margin: 0.4rem 0 0; }
.fp-compact .fp-group:first-child { margin-top: 0; }
</style>
