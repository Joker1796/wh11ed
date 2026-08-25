<template>
  <section v-if="sides.length" class="pr">
    <!-- Closed by default, with the count in the header — an open block would push the round's
         actual scoring down the screen, which is exactly why CP and the army-rule card were moved
         BELOW the secondaries. The count is itself the reminder: "3 rules in this phase" does the
         job from the closed state, and opening it is one tap. The choice is remembered. -->
    <button type="button" class="pr-head" :aria-expanded="open" @click="toggle">
      <i class="bi pr-chev" :class="open ? 'bi-chevron-down' : 'bi-chevron-right'"></i>
      <span class="pr-title">{{ labels.trackerPhaseRules }}</span>
      <span class="pr-count">{{ total }}</span>
    </button>

    <CollapseTransition :show="open">
      <div class="pr-body">
        <div v-for="side in sides" :key="side.pi" class="pr-side">
          <h4 class="pr-who">{{ side.name }}</h4>
          <ul class="pr-list">
            <li v-for="r in side.rules" :key="r.key" class="pr-rule">
              <span class="pr-src">{{ r.src }}</span>
              <span class="pr-name">
                {{ r.name }}
                <small v-if="r.sub" class="pr-sub">{{ r.sub }}</small>
              </span>
            </li>
          </ul>
        </div>
        <!-- Stratagems have their own page in this same subnav, which already groups by phase and
             already knows both players' detachments. A second list here would be two copies of one
             thing, and they would drift — so this is a door, not a duplicate. No count beside it:
             counting would mean loading the faction rules bundle onto the playing screen, which is
             the whole thing this block's index exists to avoid. -->
        <RouterLink class="pr-strats" to="/stratagems">
          <i class="bi bi-lightning-charge"></i>
          {{ labels.trackerPhaseStrats }}
          <i class="bi bi-chevron-right pr-go"></i>
        </RouterLink>
      </div>
    </CollapseTransition>
  </section>
</template>

<script setup>
// "What has something to say in THIS phase" — under the clock, for both players.
//
// Two sides, not one: 55 of the datasheet abilities that name a phase name their OPPONENT'S
// ("In your opponent's Movement phase, if an enemy unit ends a move within 8\"…"), and those are
// the ones a player forgets, because in the opponent's turn they are not thinking about their own
// cards. `usableInSlot` answers per player — the same predicate the stratagem filter uses, so the
// two can never disagree about what "your Shooting phase" means.
//
// The data is `src/data/phaseIndex.js`, a generated sidecar of names and phases with no rule text
// at all (see scripts/gen-phase-index.mjs for why): this screen deliberately imports neither the
// faction bundle nor the datasheets, and it is not going to start.
import { computed, ref, watch } from 'vue'
import CollapseTransition from '../CollapseTransition.vue'
import { ui } from '../../i18n/ui.js'
import { useLocale } from '../../composables/useLocale.js'
import { useTracker } from '../../composables/useTracker.js'
import { usableInSlot, BATTLE_PHASES } from '../../composables/stratagemPhases.js'
import { allySourceOf } from '../../composables/rosterEngine.js'
import { getItem, setItem } from '../../composables/safeStorage.js'

const { locale } = useLocale()
const labels = computed(() => ui[locale.value])
const { current } = useTracker()

const OPEN_KEY = 'wh11ed-phase-rules-open'
const open = ref(getItem(OPEN_KEY) === '1')
function toggle() {
  open.value = !open.value
  setItem(OPEN_KEY, open.value ? '1' : '0')
}

// Fetched once, the first time the block is asked for — a game that never turns the clock on
// never pays for it.
const index = ref(null)
watch(() => !!current.value, async (has) => {
  if (!has || index.value) return
  index.value = (await import('../../data/phaseIndex.js')).phaseIndex
}, { immediate: true })

const phase = computed(() => current.value?.currentPhase || BATTLE_PHASES[0])
const turn = computed(() => (current.value?.currentTurn === 1 ? 1 : 0))

// Detachment names are matched the way the rest of the app matches them — apostrophes and case
// are the two things that differ between GW's own spellings of one name.
const norm = (s) => String(s || '').toLowerCase().replace(/[’']/g, "'").trim()

function rulesFor(pi) {
  const pl = current.value?.players?.[pi]
  const idx = index.value
  if (!pl || !idx) return []
  const fac = idx[pl.factionSlug]
  const mine = turn.value === pi
  const out = []
  const take = (e, src, sub = null) => {
    if (e && usableInSlot(e.p, e.s, phase.value, mine)) {
      out.push({ key: `${src}|${e.n}`, src, name: nameOf(e), sub })
    }
  }

  if (fac) {
    take(fac.army, labels.value.trackerArmyRule)
    // The detachment's own rule, under the detachment's name — which is what the game stores.
    for (const name of pl.detachments || []) {
      const byName = fac.dets || {}
      const key = Object.keys(byName).find((k) => norm(k) === norm(name))
      if (key) take(byName[key], name)
    }
  }

  // Unit abilities need a list: without one there is no way to know which units are on the table,
  // and every datasheet of the faction would be noise rather than a reminder.
  const units = pl.roster?.units || []
  const byRule = new Map()
  for (const u of units) {
    // An allied unit's id carries its own faction ("agents-of-the-imperium:callidus-assassin"),
    // so it is looked up in that faction's entry rather than missed.
    const ally = allySourceOf(u.id)
    const src = ally ? idx[ally[0]] : fac
    const rec = src?.units?.[ally ? ally[1] : u.id]
    if (!rec) continue
    for (const e of rec.a) {
      if (!usableInSlot(e.p, e.s, phase.value, mine)) continue
      // One line per RULE: three Intercessor Squads with the same ability are one reminder with
      // three names under it, not three identical lines.
      const key = `${e.n}`
      if (!byRule.has(key)) byRule.set(key, { key: `u|${key}`, src: labels.value.trackerPhaseUnit, name: nameOf(e), units: new Set() })
      byRule.get(key).units.add(rec.n)
    }
  }
  for (const r of byRule.values()) out.push({ ...r, sub: [...r.units].join(' · ') })
  return out
}

// The RU name where the datasheet overlay had one; rule and unit names stay English by convention.
function nameOf(e) {
  return locale.value === 'ru' && e.ru ? e.ru : e.n
}

function playerName(pi) {
  const pl = current.value?.players?.[pi]
  return pl?.name || ((pl?.isYou ?? pi === 0) ? labels.value.trackerYou : labels.value.trackerOpponent)
}

// The side whose turn it is first, so the block reads in the order the phase is played.
const sides = computed(() => {
  const order = turn.value === 0 ? [0, 1] : [1, 0]
  return order
    .map((pi) => ({ pi, name: playerName(pi), rules: rulesFor(pi) }))
    .filter((s) => s.rules.length)
})
const total = computed(() => sides.value.reduce((n, s) => n + s.rules.length, 0))
</script>

<style scoped>
.pr { margin: 0 0 0.75rem; border: 1px solid var(--border); background: var(--bg-card); }
.pr-head {
  display: flex;
  align-items: center;
  gap: 0.45rem;
  width: 100%;
  padding: 0.5rem 0.6rem;
  background: none;
  border: none;
  color: var(--text-muted);
  font-size: 0.82rem;
  cursor: pointer;
  text-align: left;
}
.pr-head:hover { color: var(--accent); }
.pr-chev { font-size: 0.75rem; }
.pr-title { flex: 1; }
.pr-count {
  min-width: 1.4rem;
  padding: 0 0.3rem;
  text-align: center;
  background: var(--accent);
  color: var(--bg-primary);
  font-family: var(--font-mono);
  font-size: 0.72rem;
  font-weight: 700;
}
.pr-body { padding: 0 0.6rem 0.6rem; }
.pr-side + .pr-side { margin-top: 0.6rem; }
.pr-who {
  margin: 0 0 0.25rem;
  font-size: 0.68rem;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.05em;
  color: var(--text-dim);
}
.pr-list { list-style: none; margin: 0; padding: 0; }
.pr-rule {
  display: flex;
  gap: 0.45rem;
  padding: 0.25rem 0;
  font-size: 0.82rem;
  border-top: 1px solid var(--border);
}
.pr-rule:first-child { border-top: none; }
.pr-src {
  flex: 0 0 auto;
  max-width: 40%;
  color: var(--text-dim);
  font-size: 0.72rem;
  line-height: 1.5;
}
.pr-name { color: var(--text-primary); }
.pr-sub { display: block; color: var(--text-muted); font-size: 0.72rem; }
.pr-strats {
  display: flex;
  align-items: center;
  gap: 0.4rem;
  margin-top: 0.7rem;
  padding-top: 0.5rem;
  border-top: 1px solid var(--border);
  font-size: 0.8rem;
  color: var(--text-muted);
}
.pr-strats:hover { color: var(--accent); }
.pr-go { margin-left: auto; font-size: 0.75rem; }
</style>
