<template>
  <div class="dupe">
    <div
      v-for="(u, k) in list"
      :key="k"
      class="dupe-item"
    >
      <div class="dupe-row">
        <select
          class="form-input"
          :value="u.slug"
          :disabled="!editable"
          :aria-label="labels.trackerDomUpgrade"
          @change="set(k, { slug: $event.target.value })"
        >
          <optgroup
            v-for="g in groups"
            :key="g.label"
            :label="g.label"
          >
            <option
              v-for="o in g.items"
              :key="o.slug"
              :value="o.slug"
              :disabled="o.slug !== u.slug && taken.has(o.slug)"
            >
              {{ o.name }}
            </option>
          </optgroup>
        </select>
        <!-- The unit: one of the side's list (owner, 2026-11-03), a unit the card cannot go to greyed
           with why; without a list, typed in. A card no unit carries (Path to Conquest) asks none. -->
        <span v-if="!needsUnit(u)" />
        <select
          v-else-if="units.length"
          class="form-input"
          :value="u.uid || ''"
          :disabled="!editable"
          :aria-label="labels.trackerDomUnit"
          @change="pickUnit(k, $event.target.value)"
        >
          <option
            value=""
            disabled
          >
            {{ labels.trackerDomChooseUnit }}
          </option>
          <option
            v-for="x in units"
            :key="x.uid"
            :value="x.uid"
            :disabled="x.uid !== u.uid && !!unitWhy(u, x, k)"
          >
            {{ unitOption(u, x, k) }}
          </option>
        </select>
        <input
          v-else
          class="form-input"
          :value="u.unit"
          type="text"
          :disabled="!editable"
          :placeholder="labels.trackerDomUnit"
          :aria-label="labels.trackerDomUnit"
          maxlength="60"
          @change="set(k, { unit: $event.target.value })"
        >
        <button
          v-if="editable"
          type="button"
          class="dupe-x"
          :aria-label="labels.trackerDomRemoveUpgrade"
          :title="labels.trackerDomRemoveUpgrade"
          @click="remove(k)"
        >
          <i class="wi wi-close" />
        </button>
      </div>
      <ExpandTransition>
        <p
          v-if="rowNote(u)"
          :key="rowNote(u).text"
          class="dupe-note"
          :class="rowNote(u).kind"
        >
          <i :class="['wi', rowNote(u).kind === 'warn' ? 'wi-warning' : 'wi-check']" /> {{ rowNote(u).text }}
        </p>
      </ExpandTransition>
    </div>
    <button
      v-if="editable && list.length < limit && hasFree"
      type="button"
      class="btn-ghost dupe-add"
      @click="add"
    >
      + {{ labels.trackerDomAddUpgrade }} ({{ list.length }}/{{ limit }})
    </button>
    <p
      v-else-if="editable && held && !held.size"
      class="dupe-none"
    >
      {{ labels.trackerDomNoCampaignCards }}
    </p>
  </div>
</template>

<script setup>
// Declare Battle Formations in a Dominatus battle: the Upgrade cards a side gives to its units
// (up to 3, 4 at Titangrave; a unit carries one). Kept on the game for the campaign to read —
// the cards' effects are the table's, the tracker applies none of them yet. With a list attached
// the unit is one of its units, held to the card's "who" and told when its bonus applies
// (src/core/dominatus/upgrades.js); without one, the unit is typed in.
import { computed, ref, watch } from 'vue'
import ExpandTransition from '../ExpandTransition.vue'
import { domUpgrades } from '../../composables/dominatusMissions.js'
import { upgradeLimit, upgradeNeedsUnit, upgradeUnitBlock, upgradeBonusApplies, upgradeBonusKeywords } from '../../core/dominatus/upgrades.js'
import { useTracker } from '../../composables/useTracker.js'
import { useCampaigns } from '../../composables/useCampaigns.js'
import { ui } from '../../i18n/ui.js'
import { useLocale } from '../../composables/useLocale.js'

const props = defineProps({
  pi: { type: Number, required: true },
  editable: { type: Boolean, default: true },
})
const { locale } = useLocale()
const labels = computed(() => ui[locale.value])
const { current, setUpgrades } = useTracker()
const { byId, stateOf } = useCampaigns()

// In a battle of a campaign this device knows, a side gives only the cards its player holds; any
// other battle offers the whole deck (the players say what they hold).
const held = computed(() => {
  const cid = current.value.settings?.dominatus?.campaign
  const pid = current.value.players[props.pi].campaignPlayer
  if (!cid || !pid || !byId(cid)) return null
  const p = stateOf(cid)?.players.find((x) => x.id === pid)
  return p ? new Set(p.upgrades) : null
})
const offered = (ups) => (held.value ? ups.filter((u) => held.value.has(u.slug)) : ups)

const list = computed(() => current.value.players[props.pi].upgrades || [])
const limit = computed(() => upgradeLimit(current.value.settings?.dominatus))
const taken = computed(() => new Set(list.value.map((u) => u.slug)))
const groups = computed(() => {
  const l = labels.value
  const ups = offered(domUpgrades(locale.value))
  return [
    { label: l.domHonours, items: ups.filter((u) => u.kind === 'honour') },
    { label: l.domSkills, items: ups.filter((u) => u.kind === 'skill') },
    { label: l.domRelics, items: ups.filter((u) => u.kind === 'relic') },
  ]
})

// The side's list, read when it changes (attached or swapped in the setup's dialog).
const units = ref([])
watch(() => JSON.stringify((current.value.players[props.pi].members || [current.value.players[props.pi]]).map((m) => m?.roster?.units?.length ? m.rosterId || m.roster.name || 1 : null)), async () => {
  const { loadUpgradeUnits } = await import('../../composables/dominatusUpgradeUnits.js')
  units.value = await loadUpgradeUnits(current.value.players[props.pi])
}, { immediate: true })

const cardOf = (slug) => domUpgrades().find((c) => c.slug === slug) || null
const cardName = (slug) => domUpgrades(locale.value).find((c) => c.slug === slug)?.name || slug
const needsUnit = (u) => upgradeNeedsUnit(cardOf(u.slug))
// Why unit x cannot take row k's card: the card's own rule, or another row's card already on it.
function unitWhy(u, x, k) {
  const block = upgradeUnitBlock(cardOf(u.slug), x)
  if (block) return labels.value[`trackerDomUnitWhy_${block}`]
  const other = list.value.find((o, i) => i !== k && o.uid === x.uid)
  return other ? labels.value.trackerDomUnitWhy_taken.replace('{card}', cardName(other.slug)) : ''
}
function unitOption(u, x, k) {
  const why = x.uid !== u.uid ? unitWhy(u, x, k) : ''
  return why ? `${x.name} (${why})` : x.name
}
function pickUnit(k, uid) {
  const x = units.value.find((y) => y.uid === uid)
  if (x) set(k, { uid: x.uid, mi: x.mi, unit: x.name })
}
// Under a row: the unit chosen no longer fits the card (the card was changed after), or the card's
// bonus effect applies on it.
function rowNote(u) {
  const x = u.uid && units.value.find((y) => y.uid === u.uid)
  if (!x) return null
  const card = cardOf(u.slug)
  const block = upgradeUnitBlock(card, x)
  if (block) return { kind: 'warn', text: labels.value[`trackerDomBlocked_${block}`].replace('{unit}', x.name) }
  if (!upgradeBonusApplies(card, x)) return null
  const kw = upgradeBonusKeywords(card).filter((w) => upgradeBonusApplies({ bonus: { label: w } }, x)).join('/')
  return { kind: 'ok', text: labels.value.trackerDomBonusOn.replace('{kw}', kw) }
}

function set(k, patch) {
  setUpgrades(props.pi, list.value.map((u, i) => (i === k ? { ...u, ...patch } : u)))
}
function remove(k) {
  setUpgrades(props.pi, list.value.filter((_, i) => i !== k))
}
const hasFree = computed(() => offered(domUpgrades()).some((u) => !taken.value.has(u.slug)))
function add() {
  const free = offered(domUpgrades()).find((u) => !taken.value.has(u.slug))
  if (free) setUpgrades(props.pi, [...list.value, { slug: free.slug, unit: '' }])
}
</script>

<style scoped>
.dupe-none { margin: 0.3rem 0 0; font-size: 0.82rem; color: var(--text-muted); }
.dupe { display: grid; gap: 0.4rem; }
.dupe-note { margin: 0.25rem 0 0; font-size: 0.8rem; line-height: 1.35; }
.dupe-note.warn { color: var(--warning); }
.dupe-note.ok { color: var(--text-muted); }
.dupe-row {
  display: grid;
  grid-template-columns: minmax(0, 1.2fr) minmax(0, 1fr) auto;
  gap: 0.4rem;
  align-items: center;
}
.dupe-row select,
.dupe-row input { min-width: 0; width: 100%; }
.dupe-x {
  width: 2.2rem;
  height: 2.2rem;
  border: 1px solid var(--border);
  background: var(--bg-card);
  color: var(--text-muted);
  cursor: pointer;
}
.dupe-add { justify-self: start; }
</style>
