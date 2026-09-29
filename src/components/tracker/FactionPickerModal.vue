<template>
  <BaseModal
    :title="labels.trackerSelectFaction"
    @close="$emit('close')"
  >
    <!-- A pinned faction leaves its group for the top one, and slides there (useFlipMove). -->
    <div
      ref="listEl"
      class="modal-body modal-list"
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
          @pick="$emit('pick', f.slug)"
        />
      </template>
    </div>
  </BaseModal>
</template>

<script setup>
// Single-select faction picker — same modal shell + button-list styling as DetachmentPickerModal,
// so faction and detachment selection read as one consistent flow. Factions are grouped
// (Astartes / Imperium / Chaos / Xenos / Other) under subheadings. Picking one emits `pick` and the
// parent closes the modal. A star moves a faction to the "Pinned" group at the top (useFavorites),
// so your usual faction isn't buried at the bottom of the list every game.
import { computed, ref } from 'vue'
import BaseModal from '../BaseModal.vue'
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
})
defineEmits(['pick', 'close'])

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
