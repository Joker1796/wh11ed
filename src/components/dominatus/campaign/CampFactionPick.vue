<template>
  <CampPick
    v-model="model"
    :options="[]"
    :title="labels.trackerFaction"
    :placeholder="labels.trackerChooseFaction"
    :label="faction ? faction.name : ''"
    :disabled="disabled"
    panel-width="32rem"
  >
    <template #lead>
      <FactionBadge
        v-if="faction"
        :faction="faction"
      />
    </template>
    <template #list="{ bodyClass, compact, pick }">
      <FactionPickerList
        :class="bodyClass"
        :compact="compact"
        :selected="model"
        @pick="pick"
      />
    </template>
  </CampPick>
</template>

<script setup>
// A campaign player's faction: the tracker's own faction list (FactionPickerList, as GameSetup
// opens it — one pick, one way) in the campaign's picker field (CampPick).
import { computed } from 'vue'
import CampPick from './CampPick.vue'
import FactionBadge from '../../FactionBadge.vue'
import FactionPickerList from '../../tracker/FactionPickerList.vue'
import { factionIndexBySlug } from '../../../data/factionsIndex.js'
import { ui } from '../../../i18n/ui.js'
import { useLocale } from '../../../composables/useLocale.js'

defineProps({ disabled: { type: Boolean, default: false } })
const model = defineModel({ type: [String, null], default: null })
const { locale } = useLocale()
const labels = computed(() => ui[locale.value])
const faction = computed(() => (model.value ? factionIndexBySlug(model.value) : null))
</script>
