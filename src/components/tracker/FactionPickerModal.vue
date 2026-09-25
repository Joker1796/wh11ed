<template>
  <BaseModal
    :title="labels.trackerSelectFaction"
    @close="$emit('close')"
  >
    <div class="modal-body modal-list">
      <template v-if="pinned.length">
        <h4 class="fp-group">
          {{ labels.favPinnedGroup }}
        </h4>
        <FactionOption
          v-for="f in pinned"
          :key="'pin-' + f.slug"
          :slug="f.slug"
          :name="f.name"
          :on="selected === f.slug"
          @pick="$emit('pick', f.slug)"
        />
      </template>
      <template
        v-for="g in groups"
        :key="g.id"
      >
        <h4 class="fp-group">
          {{ groupLabel(g.id) }}
        </h4>
        <FactionOption
          v-for="f in g.factions"
          :key="f.slug"
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
// parent closes the modal. A star pins a faction to the "Pinned" group at the top (useFavorites),
// so your usual faction isn't buried at the bottom of the list every game.
import { computed } from 'vue'
import BaseModal from '../BaseModal.vue'
import FactionOption from '../FactionOption.vue'
import { ui } from '../../i18n/ui.js'
import { useLocale } from '../../composables/useLocale.js'
import { useFavorites } from '../../composables/useFavorites.js'
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

const { pinnedFactionsFrom } = useFavorites()
const pinned = computed(() => pinnedFactionsFrom(groups.value))

function groupLabel(id) { return labels.value[factionGroupLabelKey(id)] || '' }

</script>
