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
  nextCopyMinPoints, capKeyOf,
} from '../../composables/rosterEngine.js'
import { useRosterPrefs } from '../../composables/useRosterPrefs.js'
import { useCollection } from '../../composables/useCollection.js'

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
  // Points still unspent (null: no limit to read) — for the catalogue's "Fits the points left".
  remaining: { type: Number, default: null },
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
// Then every filter the catalogue has (owner, 2026-10-09; Legends alone since 2026-10-06): fits the
// points left, only units I own, hide Legends — the same switches and the same predicate
// (useRosterPrefs' passesRosterFilters), so the two never disagree about what is on offer.
const { passesRosterFilters } = useRosterPrefs()
const { isOwned } = useCollection()
const catalogueById = computed(() => new Map(props.catalogue.map((d) => [d.id, d])))
// Copies in the list by cap key, as the catalogue counts them (two datasheets of one character).
const copiesOf = (def) => props.units.filter((u) => capKeyOf(props.defOf(u.id) || { id: u.id }) === capKeyOf(def)).length
const offered = (c) => {
  if (c.used || props.dupBlocked({ id: c.id })) return false
  const def = catalogueById.value.get(c.id)
  const inList = def ? copiesOf(def) : 0
  return passesRosterFilters({
    minPts: def ? nextCopyMinPoints(def, props.units.filter((u) => u.id === c.id).length, props.detachments) : c.pts,
    owned: isOwned(c.slug, c.sheetId),
    legends: c.legends,
    inList: inList > 0,
  }, props.remaining)
}
// Where its datasheet lives: an allied row's id is namespaced with ITS faction
// (`imperial-agents:inquisitor-coteaz`), a bare one belongs to the army.
const withSheet = (c) => {
  const src = allySourceOf(c.id)
  return { ...c, slug: src?.[0] || props.armySlug, sheetId: src?.[1] || c.id, linked: !!props.defOf(c.id)?.linked }
}
const leaderCandidates = computed(() => leaderCandidatesFor(
  props.entry.uid, props.units, props.catalogue, props.defOf, props.detachments,
).map(withSheet).filter(offered))
// …and the mirror on a Character (owner, 2026-10-08): the units it could lead that the list cannot
// give it yet, on the same terms — the cap, the catalogue's filters.
const leaderHosts = computed(() => leaderHostsFor(
  props.entry.uid, props.units, props.catalogue, props.defOf, props.detachments,
).map(withSheet).filter(offered))
</script>
