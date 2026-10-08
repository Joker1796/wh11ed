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
    :leader-sources="leaderSources"
    :leader-candidates="leaderCandidates"
    :leader-hosts="leaderHosts"
    @toggle-warlord="$emit('toggle-warlord', entry.uid)"
    @add-leader="(id) => $emit('add-leader', id, entry.uid)"
    @add-host="(id) => $emit('add-host', id, entry.uid)"
  />
</template>

<script setup>
import { computed } from 'vue'
import UnitEditorFields from './UnitEditorFields.vue'
import {
  canBeWarlord, allegKeyword, enhOptionsFor, leaderTargetsFor, leaderSourcesFor, leaderCandidatesFor, leaderHostsFor, allySourceOf,
} from '../../composables/rosterEngine.js'
import { useRosterPrefs } from '../../composables/useRosterPrefs.js'

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
  // What the catalogue offers right now, and its duplicate cap — for "Can be led by" and "Can lead".
  catalogue: { type: Array, default: () => [] },
  dupBlocked: { type: Function, default: () => false },
})
defineEmits(['toggle-warlord', 'add-leader', 'add-host'])

const def = computed(() => props.defOf(props.entry.id))
const canWarlord = computed(() => !!def.value && canBeWarlord(
  def.value, props.detachments, [allegKeyword(def.value, props.entry, props.detachments)],
))
const enhOptions = computed(() => (def.value
  ? enhOptionsFor(def.value, props.detachments, props.units, props.entry.uid, props.armySlug)
  : []))
const leaderTargets = computed(() => (def.value
  ? leaderTargetsFor(def.value, props.units, props.entry.uid, props.defOf, props.detachments, props.items)
  : []))
// …and the other way round: who in the list could be attached to this one.
const leaderSources = computed(() => leaderSourcesFor(props.entry.uid, props.units, props.defOf, props.detachments))
// …and who from the catalogue could, that the list does not hold yet — only those that could be
// attached to THIS unit right now (owner's call, 2026-10-06: the list answers "who can I put on
// this squad", so a row that cannot is noise, not information). Out: a candidate whose slot on
// this unit is already held (`used` — a Captain on the squad takes the Leader slot from every other
// Leader), and one at the duplicate cap the catalogue's own "+" stops at (none of these is in the
// list, but two datasheets of one character share a cap — `charId`, capKeyOf).
// Legends follow the catalogue's own "Hide Legends units" switch — the same preference, so the
// two never disagree about whether a Legends character is on offer.
const { hideLegends } = useRosterPrefs()
const offered = (c) => !c.used && !props.dupBlocked({ id: c.id }) && !(hideLegends.value && c.legends)
// Where its datasheet lives: an allied row's id is namespaced with ITS faction
// (`imperial-agents:inquisitor-coteaz`), a bare one belongs to the army.
const withSheet = (c) => {
  const src = allySourceOf(c.id)
  return { ...c, slug: src?.[0] || props.armySlug, sheetId: src?.[1] || c.id, linked: !!props.defOf(c.id)?.linked }
}
const leaderCandidates = computed(() => leaderCandidatesFor(
  props.entry.uid, props.units, props.catalogue, props.defOf, props.detachments,
).filter(offered).map(withSheet))
// …and the mirror on a Character (owner, 2026-10-08): the units it could lead that the list cannot
// give it yet, on the same terms — the cap, the Legends switch.
const leaderHosts = computed(() => leaderHostsFor(
  props.entry.uid, props.units, props.catalogue, props.defOf, props.detachments,
).filter(offered).map(withSheet))
</script>
