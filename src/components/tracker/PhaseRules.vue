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
              <!-- A name the reader cannot get to is half a reminder, so every line is a way in:
                   a unit to its card, a rule to its place on the faction page. -->
              <button type="button" class="pr-go-btn" @click="go(r)">
                <span class="pr-src">{{ r.src }}</span>
                <span class="pr-name">
                  {{ r.name }}
                  <small v-if="r.sub" class="pr-sub">{{ r.sub }}</small>
                </span>
                <i class="bi bi-chevron-right pr-go"></i>
              </button>
            </li>
          </ul>
        </div>
        <!-- Stratagems have their own page in this same subnav, which already groups by phase and
             already knows both players' detachments. A second list here would be two copies of one
             thing, and they would drift — so this is a door, not a duplicate. The phase rides in
             the query so that page opens on it instead of on six collapsed accordions. No count:
             counting would mean loading the faction rules bundle onto the playing screen, which is
             the whole thing this block's index exists to avoid. -->
        <RouterLink class="pr-strats" :to="{ path: '/stratagems', query: { phase } }">
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
import { useRouter } from 'vue-router'
import CollapseTransition from '../CollapseTransition.vue'
import { ui } from '../../i18n/ui.js'
import { useLocale } from '../../composables/useLocale.js'
import { useTracker } from '../../composables/useTracker.js'
import { usableInSlot, BATTLE_PHASES } from '../../composables/stratagemPhases.js'
import { allySourceOf } from '../../composables/rosterEngine.js'
import { getItem, setItem } from '../../composables/safeStorage.js'
import { useFactionChoice } from '../../composables/useFactionChoice.js'
import { useRefNavigation } from '../../composables/useRefNavigation.js'

const { locale } = useLocale()
const labels = computed(() => ui[locale.value])
const { current } = useTracker()
const router = useRouter()
const { setDetachment } = useFactionChoice()
const { navigateTo } = useRefNavigation()

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
      out.push({ key: `${src}|${e.n}`, src, name: nameOf(e), sub, slug: pl.factionSlug, at: e.at, det: e.id })
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
      if (!byRule.has(key)) {
        byRule.set(key, {
          key: `u|${key}`,
          src: labels.value.trackerPhaseUnit,
          name: nameOf(e),
          units: new Set(),
          // Where this one unit's card is. Dropped for the list as soon as a SECOND entry turns
          // up carrying the rule: with three Intercessor Squads there is no single card to mean,
          // so the line lets the reader pick. Counted by entry, not by name — three squads of
          // the same datasheet are three cards, even though the line names "Boyz" once.
          to: cardOf(pl, pi, u, ally),
          entries: 0,
        })
      }
      const r = byRule.get(key)
      if (++r.entries > 1) r.to = listOf(pl, pi)
      r.units.add(rec.n)
    }
  }
  for (const r of byRule.values()) out.push({ ...r, sub: [...r.units].join(' · ') })
  return out
}

// The unit's card: inside the attached list when the game carries one — that is where this game's
// own modifiers are applied — and the faction's datasheet page otherwise.
function cardOf(pl, pi, entry, ally) {
  if (pl.roster) return { path: `/tracker/game/roster/${pi}`, query: { unit: entry.uid } }
  const slug = ally ? ally[0] : pl.factionSlug
  const id = ally ? ally[1] : entry.id
  return `/factions/${slug}/datasheets/${id}`
}
function listOf(pl, pi) {
  return pl.roster ? `/tracker/game/roster/${pi}` : `/factions/${pl.factionSlug}/datasheets`
}

// The RU name where the datasheet overlay had one; rule and unit names stay English by convention.
function nameOf(e) {
  return locale.value === 'ru' && e.ru ? e.ru : e.n
}

// Where a line leads. A unit goes to its card — inside the attached list when there is one (the
// game's own numbers apply there), on the faction's datasheet page when there is not. A rule goes
// to its anchor on the faction page, and a DETACHMENT rule has to be selected first, because that
// page renders only the active one — the same two steps a search result takes.
async function go(r) {
  if (r.to) {
    await router.push(r.to)
    return
  }
  if (r.det) setDetachment(r.slug, r.det)
  await navigateTo({ route: `/factions/${r.slug}`, anchor: r.at || undefined })
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
.pr-rule { border-top: 1px solid var(--border); }
.pr-rule:first-child { border-top: none; }
.pr-go-btn {
  display: flex;
  align-items: center;
  gap: 0.45rem;
  width: 100%;
  padding: 0.3rem 0;
  background: none;
  border: none;
  font-size: 0.82rem;
  text-align: left;
  cursor: pointer;
}
.pr-go-btn:hover .pr-name,
.pr-go-btn:hover .pr-go { color: var(--accent); }
.pr-src {
  flex: 0 0 auto;
  max-width: 40%;
  color: var(--text-dim);
  font-size: 0.72rem;
  line-height: 1.5;
}
.pr-name { flex: 1; min-width: 0; color: var(--text-primary); }
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
.pr-go { flex-shrink: 0; margin-left: auto; font-size: 0.75rem; color: var(--text-dim); }
</style>
