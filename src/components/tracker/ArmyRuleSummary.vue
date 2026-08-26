<template>
  <div v-if="summaries.length" class="army-sum">
    <button class="as-toggle" @click="open = !open" :aria-expanded="open">
      <i class="bi" :class="open ? 'bi-chevron-up' : 'bi-chevron-down'"></i>
      {{ labels.trackerArmyRulesSummary }}
    </button>

    <CollapseTransition :show="open">
      <div class="as-body">
        <div v-for="s in summaries" :key="s.pi" class="as-player">
          <div class="as-name">{{ s.player }}</div>
          <div class="as-mech"><span class="as-faction">{{ s.faction }}</span> · {{ s.mechanic }}</div>

          <ul v-if="s.rounds.length" class="as-rounds">
            <li v-for="row in s.rounds" :key="row.r">
              <span class="as-round">{{ labels.trackerRoundAbbr }}{{ row.r }}</span>
              <span class="as-pick">{{ row.text }}</span>
            </li>
          </ul>
          <div v-else class="as-line">{{ s.line }}</div>

          <!-- Resurrect spend log (GSC): read-only here, no undo. -->
          <ul v-if="s.items.length" class="as-items">
            <li v-for="(it, i) in s.items" :key="i">
              <span class="as-item-label">{{ it.label }}</span>
              <span class="as-item-cost">−{{ it.cost }}</span>
            </li>
          </ul>
        </div>
      </div>
    </CollapseTransition>
  </div>
</template>

<script setup>
// Read-only recap of each player's army-rule tracking (Pain tokens, Doctrina picks, Waaagh! rounds,
// Miracle dice left, …), shown as its own accordion on every results surface — the finished-game
// screen, the history detail view, and the summary modal (all pass a `game`, defaulting to the live
// one). Unlike ArmyTrackerCard it never mutates: it resolves the same spec and reads `player.army`.
// The registry is dynamic-imported so its specs stay out of the results bundle until a game that
// actually tracked a supported faction is opened; renders nothing when nothing was tracked.
import { ref, computed, watch } from 'vue'
import CollapseTransition from '../CollapseTransition.vue'
import { ui } from '../../i18n/ui.js'
import { useLocale } from '../../composables/useLocale.js'
import { useTracker } from '../../composables/useTracker.js'
import { tracks } from '../../data/trackerOptions.js'
import { factionIndexBySlug } from '../../data/factionsIndex.js'

const props = defineProps({ game: { type: Object, default: null } })
const { locale } = useLocale()
const { current } = useTracker()
const labels = computed(() => ui[locale.value])
const game = computed(() => props.game || current.value)

const open = ref(false)

// Tracking opt-in gate, the same one RoundTracker applies: per-player trackArmyYou/Opp, through
// the option table's reader so the legacy flag and the missing-flag default are answered once.
function trackedFor(g, pl) {
  return tracks(g.settings, (pl.isYou ?? false) ? 'trackArmyYou' : 'trackArmyOpp')
}
// Did the player actually record anything? (Tracking defaults on, so an untouched mechanic would
// otherwise show an empty block on games where nobody used it.)
function hasArmyData(pl) {
  const a = pl.army || {}
  return a.counter != null
    || !!a.dice?.length
    || !!a.toggleRounds?.length
    || a.choice != null
    || !!(a.selectionByRound && Object.keys(a.selectionByRound).length)
    || !!(a.multiByRound && Object.values(a.multiByRound).some((x) => x?.length))
    || !!(a.poolByRound && Object.keys(a.poolByRound).length)
    || !!a.resurrected?.length
}

function playerName(g, pl, pi) {
  return pl.name || ((pl.isYou ?? pi === 0) ? labels.value.trackerYou : labels.value.trackerOpponent)
}

// Map an option id to its localized name (Doctrina Imperatives, Templar Vows, Blessings, Rituals…).
function optName(view, id) {
  return view.options?.find((o) => o.id === id)?.name || id
}
// Round-keyed map → sorted [{ r, text }] rows, dropping empty rounds.
function byRoundRows(map, toText) {
  return Object.keys(map || {})
    .map(Number)
    .sort((a, b) => a - b)
    .map((r) => ({ r, text: toText(map[r]) }))
    .filter((row) => row.text !== '' && row.text != null)
}

// Build one player's read-only recap from the localized spec + stored army state.
function buildSummary(g, pl, pi, view) {
  const a = pl.army || {}
  const base = {
    pi,
    player: playerName(g, pl, pi),
    faction: factionIndexBySlug(pl.factionSlug)?.name || '',
    mechanic: view.label,
    rounds: [],
    line: '',
    items: [],
  }

  if (view.kind === 'counter') {
    let line = String(a.counter ?? '')
    if (view.threshold) {
      const st = (a.counter ?? 0) >= view.threshold.at ? view.threshold.atOrAbove : view.threshold.below
      if (st?.name) line += ` · ${st.name}`
    }
    // Resurrect spend log (GSC): what the counter's final value was spent on, read-only here.
    return { ...base, line, items: a.resurrected || [] }
  }
  if (view.kind === 'dice') {
    return { ...base, line: (a.dice || []).join(', ') || '—' }
  }
  if (view.kind === 'toggle') {
    return { ...base, rounds: (a.toggleRounds || []).slice().sort((x, y) => x - y).map((r) => ({ r, text: view.effect?.name || '✓' })) }
  }
  if (view.kind === 'selection' && view.once) {
    return { ...base, line: optName(view, a.choice) }
  }
  if (view.kind === 'selection') {
    return { ...base, rounds: byRoundRows(a.selectionByRound, (id) => optName(view, id)) }
  }
  if (view.kind === 'multi') {
    return { ...base, rounds: byRoundRows(a.multiByRound, (ids) => (ids || []).map((id) => optName(view, id)).join(', ')) }
  }
  if (view.kind === 'pool') {
    return { ...base, rounds: byRoundRows(a.poolByRound, (v) => String(v)) }
  }
  return base
}

const summaries = ref([])
async function build() {
  const g = game.value
  if (!g?.players) { summaries.value = []; return }
  const need = g.players.some((pl) => trackedFor(g, pl) && hasArmyData(pl) && pl.factionSlug)
  if (!need) { summaries.value = []; return }

  const { resolveArmyTracker, localizeArmyTracker } = await import('../../data/armyTrackers/index.js')
  const out = []
  g.players.forEach((pl, pi) => {
    if (!trackedFor(g, pl) || !hasArmyData(pl)) return
    const spec = resolveArmyTracker(pl.factionSlug, pl.detachments || [])
    if (!spec) return
    out.push(buildSummary(g, pl, pi, localizeArmyTracker(spec, locale.value)))
  })
  summaries.value = out
}
watch([game, locale], build, { immediate: true })
</script>

<style scoped>
.army-sum { margin-top: 0.75rem; }
.as-toggle {
  display: flex; align-items: center; justify-content: center; gap: 0.4rem;
  width: 100%; padding: 0.6rem 1rem;
  background: var(--bg-card); border: 1px solid var(--border);
  color: var(--text-primary); font-size: 0.85rem; font-weight: 600; cursor: pointer;
}
.as-toggle:hover { border-color: var(--accent); }
.as-body { margin-top: 0.75rem; display: flex; flex-direction: column; gap: 0.75rem; }
.as-player {
  background: var(--bg-card); border: 1px solid var(--border); padding: 0.8rem;
}
.as-name { font-family: var(--font-display); font-size: 1.45rem; font-weight: 500; color: var(--text-primary); margin-bottom: 0.15rem; }
.as-mech { font-size: 0.82rem; color: var(--text-muted); margin-bottom: 0.55rem; }
.as-faction { font-weight: 600; color: var(--text-dim); }

.as-line { font-size: 0.95rem; font-weight: 600; color: var(--text-primary); }

.as-rounds { list-style: none; margin: 0; padding: 0; display: flex; flex-direction: column; gap: 0.35rem; }
.as-rounds li { display: flex; align-items: baseline; gap: 0.55rem; }
.as-round {
  flex-shrink: 0;
  min-width: 1.9rem;
  padding: 0.1rem 0.35rem;
  background: var(--bg-secondary);
  color: var(--text-dim);
  font-size: 0.72rem;
  font-weight: 700;
  text-align: center;
}
.as-pick { font-size: 0.9rem; color: var(--text-primary); overflow-wrap: anywhere; }

.as-items {
  list-style: none;
  margin: 0.5rem 0 0;
  padding: 0.5rem 0 0;
  border-top: 1px solid var(--border);
  display: flex;
  flex-direction: column;
  gap: 0.3rem;
}
.as-items li { display: flex; align-items: center; justify-content: space-between; gap: 0.5rem; }
.as-item-label { font-size: 0.85rem; color: var(--text-primary); overflow-wrap: anywhere; }
.as-item-cost { flex-shrink: 0; font-family: var(--font-mono); font-size: 0.82rem; font-weight: 700; color: var(--accent); }
</style>
