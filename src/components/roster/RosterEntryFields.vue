<!-- One entry's configuration, wired up. `UnitEditorFields` asks for the enhancement options, the
     leader targets and whether this unit may be the Warlord; all three are pure functions of the
     roster, and both building screens computed them in an identical fifteen-line block at the
     `#fields` slot — twice each, once the desk layout gave the fields a column of their own.

     So the wiring lives here and the callers pass the roster. -->
<template>
  <UnitEditorFields
    v-if="def"
    :entry="entry"
    :def="def"
    :items="items"
    :texts="texts"
    :faction-slug="slugOf(entry.id)"
    :detachments="detachments"
    :units="units"
    :def-of="defOf"
    :can-warlord="canWarlord"
    :is-warlord="entry.warlord === true"
    :enh-options="enhOptions"
    :leader-targets="leaderTargets"
    @toggle-warlord="$emit('toggle-warlord', entry.uid)"
  />
</template>

<script setup>
import { computed } from 'vue'
import UnitEditorFields from './UnitEditorFields.vue'
import {
  canBeWarlord, allegKeyword, enhOptionsFor, leaderTargetsFor,
} from '../../composables/rosterEngine.js'

const props = defineProps({
  entry: { type: Object, required: true },
  items: { type: Object, required: true },
  texts: { type: Object, required: true },
  detachments: { type: Array, default: () => [] },
  units: { type: Array, default: () => [] },
  defOf: { type: Function, required: true },
  // The ARMY's faction, for the enhancements it may take. An ally entry's own datasheet lives in
  // another faction's bundle, which is what `slugOf` answers — the two are not the same question.
  armySlug: { type: String, default: '' },
  slugOf: { type: Function, default: () => '' },
})
defineEmits(['toggle-warlord'])

const def = computed(() => props.defOf(props.entry.id))
const canWarlord = computed(() => !!def.value && canBeWarlord(
  def.value, props.detachments, [allegKeyword(def.value, props.entry, props.detachments)],
))
const enhOptions = computed(() => (def.value
  ? enhOptionsFor(def.value, props.detachments, props.units, props.entry.uid, props.armySlug)
  : []))
const leaderTargets = computed(() => (def.value
  ? leaderTargetsFor(def.value, props.units, props.entry.uid, props.defOf, props.detachments)
  : []))
</script>
