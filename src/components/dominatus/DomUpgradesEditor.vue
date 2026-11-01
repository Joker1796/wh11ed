<template>
  <div class="dupe">
    <div
      v-for="(u, k) in list"
      :key="k"
      class="dupe-row"
    >
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
      <input
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
// the cards' effects are the table's, the tracker applies none of them.
import { computed } from 'vue'
import { domUpgrades, domUpgradeLimit } from '../../composables/dominatusMissions.js'
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
const limit = computed(() => domUpgradeLimit(current.value.settings?.dominatus))
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
