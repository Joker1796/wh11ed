<template>
  <h2 class="chapter-heading">
    {{ labels.domUpgradesHeading }}
  </h2>
  <p class="chapter-desc">
    {{ labels.domUpgradesDesc }}
  </p>

  <div class="dfilters">
    <div class="seg">
      <button
        v-for="k in KINDS"
        :key="k.id"
        :class="{ on: kind === k.id }"
        @click="kind = k.id"
      >
        {{ labels[k.label] }}
      </button>
    </div>
  </div>

  <section
    v-for="g in groups"
    :id="`dom-up-${g.key}`"
    :key="g.key"
    class="dgroup"
  >
    <h3 class="dgroup-label">
      {{ g.label }}
    </h3>
    <div class="dgrid">
      <DomUpgradeCard
        v-for="u in g.items"
        :key="u.slug"
        :upgrade="u"
      />
    </div>
  </section>
</template>

<script setup>
// The 35 Upgrades in the deck's three piles: Battle Honours by the phase they are drawn in,
// Battle Skills, and each Alliance's five Relics.
import { ref, computed } from 'vue'
import DomUpgradeCard from './DomUpgradeCard.vue'
import { PHASES } from '../../data/dominatus.js'
import { useDominatus, resetFilterOnJump } from './useDominatus.js'

const KINDS = [
  { id: 'all', label: 'filterAll' },
  { id: 'honour', label: 'domHonours' },
  { id: 'skill', label: 'domSkills' },
  { id: 'relic', label: 'domRelics' },
]
const { labels, deck, allianceName, phaseLabel } = useDominatus()
const kind = ref('all')
resetFilterOnJump('dom-up-', () => { kind.value = 'all' })

const groups = computed(() => {
  const l = labels.value
  const ups = deck.value.upgrades
  const out = []
  if (kind.value === 'all' || kind.value === 'honour') {
    for (const p of PHASES) {
      out.push({ key: `h${p}`, label: `${l.domHonours} · ${phaseLabel(p)}`, items: ups.filter((u) => u.kind === 'honour' && u.phase === p) })
    }
  }
  if (kind.value === 'all' || kind.value === 'skill') {
    out.push({ key: 's', label: l.domSkills, items: ups.filter((u) => u.kind === 'skill') })
  }
  if (kind.value === 'all' || kind.value === 'relic') {
    for (const a of deck.value.alliances) {
      out.push({ key: `r-${a.id}`, label: `${l.domRelics} · ${allianceName(a.id)}`, items: ups.filter((u) => u.kind === 'relic' && u.alliance === a.id) })
    }
  }
  return out
})
</script>
