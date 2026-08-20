<template>
  <div v-if="roster" class="roster-view themed" :style="accentStyle">
    <RouterLink :to="backTo" class="back">
      <i class="bi bi-chevron-left"></i> {{ inGame ? labels.trackerRosterBack : labels.rosterBackToList }}
    </RouterLink>

    <header class="rv-head">
      <h1 class="rv-name">{{ roster.name || labels.rosterUntitled }}</h1>
      <div v-if="roster.faction" class="rv-points" :class="{ over: points > limit }">
        <span class="rp-used">{{ points }}</span>
        <span class="rp-sep">/</span>
        <span class="rp-cap">{{ limit }}</span>
      </div>
      <RouterLink v-if="!inGame" :to="`/roster/${roster.id}`" class="hdr-icon" :aria-label="labels.rosterEdit">
        <i class="bi bi-pencil"></i>
      </RouterLink>
    </header>

    <p v-if="!roster.faction" class="rv-hint">{{ labels.rosterViewNoFaction }}</p>
    <template v-else>
      <div class="rv-tabs" role="tablist">
        <button
          class="rv-tab"
          :class="{ on: tab === 'units' }"
          role="tab"
          :aria-selected="tab === 'units'"
          @click="tab = 'units'"
        >{{ labels.rosterViewTabUnits }}</button>
        <button
          class="rv-tab"
          :class="{ on: tab === 'rules' }"
          role="tab"
          :aria-selected="tab === 'rules'"
          @click="tab = 'rules'"
        >{{ labels.rosterViewTabRules }}</button>
        <button
          class="rv-tab"
          :class="{ on: tab === 'stratagems' }"
          role="tab"
          :aria-selected="tab === 'stratagems'"
          @click="tab = 'stratagems'"
        >{{ labels.rosterViewTabStratagems }}</button>
      </div>

      <!-- Compact read-only unit list, grouped like the editor. Clicking a row opens the full
           rules card in RosterUnitRulesModal — not an inline accordion, that read badly nested
           and had overflow issues (see git history if this is ever revisited). -->
      <div v-if="tab === 'units'" class="rv-units">
        <p v-if="!roster.units.length" class="rv-hint">{{ labels.rosterUnitsEmpty }}</p>

        <template v-for="g in groupedUnits" :key="g.id">
          <template v-if="g.entries.length">
            <h3 class="rvg-head">{{ labels[GROUP_LABEL_KEYS[g.id]] }}</h3>
            <button
              v-for="e in g.entries"
              :key="e.uid"
              type="button"
              class="rvunit"
              @click="viewingUid = e.uid"
            >
              <span class="rvunit-text">
                <span class="rvunit-name">{{ defOf(e.id)?.name || e.id }}</span>
                <span v-if="statCellsOf(e).length" class="rvunit-stats">
                  <span v-for="s in statCellsOf(e)" :key="s.label" class="rvst" :class="{ 'rvst-inv': s.inv, 'rvst-mod': s.mod }">
                    <span class="rvst-label">{{ s.label }}</span>
                    <span class="rvst-box">{{ s.value }}</span>
                  </span>
                </span>
                <span class="rvunit-sub">{{ summaryLine(e) }}</span>
              </span>
              <span class="rvunit-pts">{{ entryMeta.get(e.uid)?.points }}</span>
              <i class="bi bi-chevron-right rvunit-chev"></i>
            </button>
          </template>
        </template>
      </div>

      <!-- Army rule + selected detachment(s) rule, lazily loaded (heavy faction rules bundle) -->
      <div v-else-if="tab === 'rules'" class="rv-rules">
        <template v-if="rulesFaction">
          <section class="rv-rule-block">
            <h3 class="rvg-head">{{ labels.factionArmyRule }}</h3>
            <RuleBlock
              :id="rulesFaction.armyRule.id"
              :title="rulesFaction.armyRule.name"
              :subtitle="rulesFaction.armyRule.nameRu"
              :body="rulesFaction.armyRule.body"
              :example="rulesFaction.armyRule.example"
            />
          </section>
          <section v-for="det in selectedDetachmentRules" :key="det.name" class="rv-rule-block">
            <h3 class="rvg-head">{{ det.name }}</h3>
            <RuleBlock :title="det.rule.name" :subtitle="det.rule.nameRu" :body="det.rule.body" />
          </section>
        </template>
      </div>

      <!-- Stratagems — same setup as the standalone StratagemsView.vue page (toolbar toggle +
           phase accordions / flat grid), just pre-filtered to this roster's own detachments
           instead of a core/you/opp filter (each card's sublabel already says which
           detachment it's from, same as that page's detachment cards). -->
      <div v-else class="rv-strats">
        <template v-if="rulesFaction">
          <p v-if="!selectedDetachmentRules.length" class="rv-hint">{{ labels.rosterViewNoDetachment }}</p>
          <template v-else>
            <div class="strat-toolbar">
              <button
                type="button"
                class="strat-toggle"
                :class="{ active: byPhase }"
                :aria-pressed="byPhase"
                :aria-label="byPhase ? labels.stratGroupAsList : labels.stratGroupByPhase"
                @click="byPhase = !byPhase"
              >
                <i class="bi" :class="byPhase ? 'bi-list-ul' : 'bi-collection'"></i>
                <span class="strat-toggle-label">{{ byPhase ? labels.stratGroupAsList : labels.stratGroupByPhase }}</span>
              </button>
            </div>

            <template v-if="byPhase">
              <div v-for="g in phaseGroups" :key="g.key" class="phase-group">
                <button
                  type="button"
                  class="phase-head"
                  :aria-expanded="openPhases.has(g.key)"
                  @click="togglePhase(g.key)"
                >
                  <i class="bi phase-chev" :class="openPhases.has(g.key) ? 'bi-chevron-down' : 'bi-chevron-right'"></i>
                  <span class="phase-name">{{ phaseLabel(g.key, labels) }}</span>
                  <span class="phase-count">{{ g.strats.length }}</span>
                </button>
                <CollapseTransition :show="openPhases.has(g.key)">
                  <div class="strat-grid phase-grid">
                    <StratCard v-for="s in g.strats" :key="stratKey(s)" :strat="s" :sublabel="s.sublabel" />
                  </div>
                </CollapseTransition>
              </div>
            </template>

            <div v-else class="strat-grid">
              <StratCard v-for="s in visibleStratagems" :key="stratKey(s)" :strat="s" :sublabel="s.sublabel" />
            </div>
          </template>
        </template>
      </div>
    </template>

    <RosterUnitRulesModal
      v-if="viewingUid && viewingDef"
      :unit-id="viewingDef.id"
      :faction-slug="roster.faction"
      :ctx="{
        def: viewingDef,
        entry: viewingEntry,
        items: rosterItems.items,
        detachments: curDetachments,
        leaderTargets: viewingLeaderTargets,
        units: roster.units,
      }"
      @close="viewingUid = null"
    />
  </div>
</template>

<script setup>
import { computed, ref, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import RuleBlock from '../../components/RuleBlock.vue'
import StratCard from '../../components/StratCard.vue'
import CollapseTransition from '../../components/CollapseTransition.vue'
import RosterUnitRulesModal from '../../components/roster/RosterUnitRulesModal.vue'
import { ui } from '../../i18n/ui.js'
import { useLocale } from '../../composables/useLocale.js'
import { useRosters } from '../../composables/useRosters.js'
import rosterCore from '../../data/roster/core.js'
import { loadRosterFaction, rosterItems } from '../../data/roster/index.js'
import { loadDatasheets } from '../../data/datasheets/index.js'
import { factionGroups } from '../../data/factionsIndex.js'
import { UNIT_GROUPS, GROUP_LABEL_KEYS, bucketOf, unitPoints, rosterPoints, entrySummary, effectiveBattle, leaderTargetsFor, mandatoryEnhancementFor } from '../../composables/rosterEngine.js'
import { applyStatMods, grantedKeywordsFrom, resolveModifierEntries } from '../../composables/rosterStatMods.js'
import { phasesOf, phaseLabel, PHASE_ORDER } from '../../composables/stratagemPhases.js'
import { getItem, setItem } from '../../composables/safeStorage.js'

const route = useRoute()
const router = useRouter()
const { locale } = useLocale()
const labels = computed(() => ui[locale.value])
const { rosterById } = useRosters()

// Two ways in: /roster/:id/view reads the saved roster, /tracker/game/roster/:pi reads the
// SNAPSHOT the current game carries for that player (rosterGameLink.js). Same screen either way —
// the in-game one is where the live-rules layer will hang, so it must not become a second copy.
//
// useTracker is imported dynamically on purpose: it statically pulls the mission/event datasets,
// and the ordinary roster route must not carry them.
const gamePi = computed(() => (route.params.pi != null ? Number(route.params.pi) : null))
const inGame = computed(() => gamePi.value != null)
const backTo = computed(() => (inGame.value ? '/tracker/game' : '/roster'))
const gameRoster = ref(undefined) // undefined = not resolved yet, null = no such attachment
watch(gamePi, async (pi) => {
  if (pi == null) { gameRoster.value = undefined; return }
  const [{ useTracker }, { rosterFromPlayer }] = await Promise.all([
    import('../../composables/useTracker.js'),
    import('../../composables/rosterGameLink.js'),
  ])
  gameRoster.value = rosterFromPlayer(useTracker().current.value?.players?.[pi])
}, { immediate: true })

const roster = computed(() => (inGame.value ? gameRoster.value || null : rosterById(route.params.id)))
// Leave only once we KNOW there is nothing to show — while the game's snapshot is still resolving
// `roster` is legitimately null, and redirecting then would bounce straight back out of the view.
watch([roster, gameRoster], () => {
  if (inGame.value && gameRoster.value === undefined) return
  if (!roster.value) router.replace(backTo.value)
}, { immediate: true })

const tab = ref('units')

// ── Faction accent (mirrors the editor) ──
const allFactions = factionGroups.flatMap((g) => g.factions)
const factionColor = computed(() => allFactions.find((f) => f.slug === roster.value?.faction)?.color)
const accentStyle = computed(() => factionColor.value
  ? { '--fa-light': factionColor.value.light, '--fa-dark': factionColor.value.dark }
  : {})

// ── Compact roster data (unit names/sizes/points), same lazy source the editor uses ──
const factionData = ref(null)
watch(() => roster.value?.faction, async (slug) => {
  factionData.value = slug ? await loadRosterFaction(slug) : null
}, { immediate: true })

// ── Base statline (M/T/SV/W/LD/OC + invuln) for the compact unit rows — not in the compact
// roster data layer, so pull it from the full datasheet file (already needed by the unit rules
// modal on click; loaded here too so every row can show it without opening that modal). EN-only
// is enough — the plates are numbers/pips, not translated text — RosterUnitRulesModal does its
// own separate RU-localized fetch for the modal content.
const fullSheets = ref(new Map())
watch(() => roster.value?.faction, async (slug) => {
  if (!slug) { fullSheets.value = new Map(); return }
  const list = await loadDatasheets(slug)
  if (roster.value?.faction !== slug) return
  const m = new Map()
  for (const d of list || []) m.set(d.id, d)
  fullSheets.value = m
}, { immediate: true })

// ── Unit rules modal ──
const viewingUid = ref(null)
const viewingEntry = computed(() => roster.value?.units.find((u) => u.uid === viewingUid.value) || null)
// The entry, not just its datasheet: the modal's overlay (rosterModifiers.js) needs this unit's
// own wargear picks to show the loadout it actually fields rather than every option on the sheet.
const viewingDef = computed(() => (viewingEntry.value ? defOf(viewingEntry.value.id) : null))
// Resolves `entry.leaderOf` (a uid) to the attached unit's display name for the modal's context
// strip — the same list the editor's attachment picker is built from, computed here only for the
// one entry being viewed.
const viewingLeaderTargets = computed(() => (viewingEntry.value
  ? leaderTargetsFor(viewingDef.value, roster.value?.units, viewingEntry.value.uid, defOf, curDetachments.value)
  : []))

// Same chamfered stat-box plates as DatasheetCard.vue's statline (its statCells()), scaled
// down for a compact list row — invuln is its own trailing plate (see below) rather than
// DatasheetCard's shield-shaped box sitting under SV with a side label; that layout needs more
// room than a one-line row has.
// The statline this ENTRY fields, not the one its datasheet prints: the same modifier layer the
// unit-rules modal applies runs here too. A plate showing 5" while the card behind it shows 7"
// would be the worst of both, so this list and that card go through one implementation
// (rosterStatMods.js) with the same inputs.
function statCellsOf(entry) {
  const sheet = fullSheets.value.get(entry?.id)
  if (!sheet?.profiles?.[0]) return []
  const { sheet: modded, marks } = statModCache.value.get(entry.uid) || statModsFor(entry, sheet)
  const p = modded.profiles[0]
  const marked = new Set(marks)
  const cell = (key, label, value) => ({ key, label, value, mod: marked.has(`profile:${key}:0`) })
  const cells = [
    cell('m', 'M', p.m),
    cell('t', 'T', p.t),
    cell('sv', 'SV', p.sv),
    cell('w', 'W', p.w),
    cell('ld', 'LD', p.ld),
    cell('oc', 'OC', p.oc),
  ]
  // Last plate, marked `inv: true` so the template can colour it distinctly — same idea as
  // DatasheetCard's own accent-coloured "Invulnerable Save" label, just at the end of the row
  // instead of straight under SV (no room for that layout in a one-line list row).
  if (p.inv) cells.push({ ...cell('inv', 'INV', `${p.inv}${p.invNote ? '*' : ''}`), inv: true })
  return cells
}

// ── Numeric modifier layer (Tier C) for the compact plates ──────────────────────────────────
// Needs two things the Rules tab also loads: the modifier records, and the ENGLISH faction
// bundle whose rule bodies ruleTargets.js reads. Both are per-faction dynamic imports, and
// `loadFaction` memoizes, so opening the Rules tab afterwards costs nothing extra.
const modifierRecords = ref([])
const factionEn = ref(null)
watch(() => roster.value?.faction, async (slug) => {
  modifierRecords.value = []
  factionEn.value = null
  if (!slug) return
  const [{ loadRosterModifiers, usableEntries }, { loadFaction }] = await Promise.all([
    import('../../data/rosterModifiers/index.js'),
    import('../../data/factions/index.js'),
  ])
  const [mods, fac] = await Promise.all([loadRosterModifiers(slug), loadFaction(slug)])
  if (roster.value?.faction !== slug) return
  modifierRecords.value = usableEntries(mods)
  factionEn.value = fac?.en || null
}, { immediate: true })

const factionKeywordSets = computed(() =>
  [...fullSheets.value.values()].map((d) => [...(d.keywords || []), ...(d.factionKeywords || [])]))

function statModsFor(entry, sheet) {
  if (!entry || !modifierRecords.value.length || !factionEn.value) return { sheet, marks: [] }
  const def = defOf(entry.id)
  const enh = entry.enh || mandatoryEnhancementFor(def, curDetachments.value)?.name || null
  const alleg = entry.alleg && def?.alleg ? { g: def.alleg.g, opt: entry.alleg } : null
  const resolved = resolveModifierEntries(modifierRecords.value, factionEn.value, roster.value?.detachments, enh, alleg)
  if (!resolved.length) return { sheet, marks: [] }
  const printed = [...(sheet.keywords || []), ...(sheet.factionKeywords || [])]
  // A granted keyword decides which rules bear on the unit at all, so it has to be resolved BEFORE
  // the apply pass gates on the keyword set — the same order RosterUnitRulesModal uses. Skipping it
  // here would let a plate on this row and the card behind it disagree, which is the one thing this
  // shared implementation exists to prevent.
  const kws = [...printed, ...grantedKeywordsFrom(resolved, printed, factionKeywordSets.value).map((g) => g.kw)]
  return applyStatMods(sheet, resolved, kws, factionKeywordSets.value)
}

// One pass per entry, not one per plate: statCellsOf() is called from the template for every row,
// and resolving + applying the modifier records is real work to repeat six times a row.
const statModCache = computed(() => {
  const m = new Map()
  for (const e of roster.value?.units || []) {
    const sheet = fullSheets.value.get(e.id)
    if (sheet) m.set(e.uid, statModsFor(e, sheet))
  }
  return m
})

const unitMap = computed(() => {
  const m = new Map()
  for (const u of factionData.value?.units || []) m.set(u.id, u)
  return m
})
function defOf(id) { return unitMap.value.get(id) }

const curDetachments = computed(() =>
  (roster.value?.detachments || [])
    .map((name) => (factionData.value?.detachments || []).find((d) => d.name === name))
    .filter(Boolean))

const effBattle = computed(() => effectiveBattle(roster.value || {}, rosterCore))
const limit = computed(() => effBattle.value.points)

const entryMeta = computed(() => {
  const seen = new Map()
  const m = new Map()
  for (const e of roster.value?.units || []) {
    const copyIndex = (seen.get(e.id) || 0) + 1
    seen.set(e.id, copyIndex)
    m.set(e.uid, { points: unitPoints(defOf(e.id), e, copyIndex, curDetachments.value), copyIndex })
  }
  return m
})
const points = computed(() => rosterPoints(roster.value?.units, defOf, curDetachments.value))

const groupedUnits = computed(() =>
  UNIT_GROUPS.map((id) => ({
    id,
    entries: (roster.value?.units || []).filter((e) => { const d = defOf(e.id); return d && bucketOf(d) === id }),
  })))

function summaryLine(e) {
  return entrySummary(e, defOf(e.id), labels.value.rosterModelsLabel, labels.value.rosterUpgradesLabel)
}

// ── Rules + Stratagems tabs: army rule / each selected detachment's rule / its stratagems,
// from the (heavy) faction rules data — dynamically imported only when one of those tabs is
// open (see the watch below), same invariant as StratagemsView's detachment stratagems (never
// statically import src/data/factions/*). Both tabs share this one load — a detachment's
// object already carries `.stratagems` alongside `.rule`, same shape FactionRuleView.vue reads
// from. Chapters sharing Codex Space Marines detachments (Gladius Task Force, etc.) fall back
// to the space-marines file for detachments not defined in their own — same fallback as the
// stratagems page.
const SM_CHAPTERS = new Set(['black-templars', 'blood-angels', 'dark-angels', 'deathwatch', 'space-wolves'])
const normName = (s) => s.replace(/[’'`]/g, "'").trim().toLowerCase()

const rulesFaction = ref(null)
const detachmentLookup = ref(new Map())

async function loadFactionSource(slug, loc) {
  const { loadFaction } = await import('../../data/factions/index.js')
  const data = await loadFaction(slug)
  if (!data) return null
  // Tag each stratagem with `_phases` derived from its ENGLISH `when` (data.en, aligned by
  // detachment+stratagem index with the localized faction) — same recipe as StratagemsView.vue,
  // so the Stratagems tab's phase grouping is identical EN/RU.
  const withPhase = (faction) => ({
    ...faction,
    detachments: (faction.detachments || []).map((det, di) => ({
      ...det,
      stratagems: (det.stratagems || []).map((s, si) => ({
        ...s,
        _phases: phasesOf(data.en.detachments?.[di]?.stratagems?.[si]?.when),
      })),
    })),
  })
  if (loc !== 'ru') return withPhase(data.en)
  const { loadFactionRu, deepOverlay } = await import('../../data/factions/ru/index.js')
  const mod = await loadFactionRu(slug)
  return withPhase(mod ? deepOverlay(data.en, mod.default) : data.ru)
}

watch([() => roster.value?.faction, tab, locale], async ([slug, t, loc]) => {
  if ((t !== 'rules' && t !== 'stratagems') || !slug) return
  const sources = [slug]
  if (SM_CHAPTERS.has(slug)) sources.push('space-marines')
  const lookup = new Map()
  let main = null
  for (const s of sources) {
    const f = await loadFactionSource(s, loc)
    if (!f) continue
    if (s === slug) main = f
    for (const det of f.detachments || []) {
      const key = normName(det.name)
      if (!lookup.has(key)) lookup.set(key, det)
    }
  }
  rulesFaction.value = main
  detachmentLookup.value = lookup
}, { immediate: true })

const selectedDetachmentRules = computed(() =>
  (roster.value?.detachments || [])
    .map((name) => detachmentLookup.value.get(normName(name)))
    .filter(Boolean))

// ── Stratagems tab: same by-phase/as-list toggle as StratagemsView.vue, over the flattened
// stratagems of every selected detachment (each card's own sublabel already says which
// detachment it's from — no extra per-detachment grouping needed on top of that). The view
// preference is shared with the standalone page (same localStorage key) so it isn't a
// separate setting to learn twice.
const visibleStratagems = computed(() => selectedDetachmentRules.value.flatMap((det) => det.stratagems || []))

const VIEW_KEY = 'wh11ed-stratagems-by-phase'
const byPhase = ref(getItem(VIEW_KEY) === '1')
watch(byPhase, (on) => setItem(VIEW_KEY, on ? '1' : '0'))
const openPhases = ref(new Set())

const phaseGroups = computed(() => {
  const by = new Map()
  for (const s of visibleStratagems.value) {
    for (const k of s._phases?.length ? s._phases : ['any']) {
      if (!by.has(k)) by.set(k, [])
      by.get(k).push(s)
    }
  }
  return PHASE_ORDER.filter((k) => by.has(k)).map((k) => ({ key: k, strats: by.get(k) }))
})

function togglePhase(key) {
  const next = new Set(openPhases.value)
  next.has(key) ? next.delete(key) : next.add(key)
  openPhases.value = next
}

function stratKey(strat) {
  return strat.num || `${strat.sublabel || ''}|${strat.name}`
}
</script>

<style scoped>
.roster-view { padding-top: 0.75rem; padding-bottom: 2rem; }
.back { display: inline-flex; align-items: center; gap: 0.3rem; color: var(--text-muted); text-decoration: none; font-size: 0.85rem; }
.back:hover { color: var(--accent); }

.rv-head {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  margin: 0.75rem 0 1rem;
  padding-bottom: 0.6rem;
  border-bottom: 2px solid var(--accent);
}
.rv-name {
  flex: 1;
  min-width: 0;
  font-family: var(--font-display);
  font-size: 1.7rem;
  font-weight: 500;
  color: var(--text-primary);
  margin: 0;
}
.rv-points { font-family: var(--font-mono); font-weight: 700; font-size: 1.1rem; white-space: nowrap; }
.rp-used { color: var(--text-primary); }
.rv-points.over .rp-used { color: #c0392b; }
.rp-sep, .rp-cap { color: var(--text-dim); }
.hdr-icon {
  display: inline-flex;
  align-items: center;
  padding: 0.35rem 0.55rem;
  border: 1px solid var(--border);
  border-radius: 5px;
  background: var(--bg-card);
  color: var(--text-muted);
  text-decoration: none;
}
.hdr-icon:hover { border-color: var(--accent); color: var(--accent); }

.rv-hint { color: var(--text-muted); font-style: italic; text-align: center; padding: 1.5rem 0; }

.rv-tabs { display: flex; gap: 0.4rem; margin-bottom: 1rem; border-bottom: 1px solid var(--border); }
.rv-tab {
  padding: 0.5rem 1rem;
  background: none;
  border: none;
  border-bottom: 2px solid transparent;
  color: var(--text-muted);
  font-weight: 600;
  font-size: 0.9rem;
  cursor: pointer;
  margin-bottom: -1px;
}
.rv-tab.on { color: var(--accent); border-bottom-color: var(--accent); }

.rvg-head {
  font-family: var(--font-display);
  font-size: 1.05rem;
  font-weight: 500;
  color: var(--text-primary);
  margin: 1.1rem 0 0.5rem;
  padding-bottom: 0.2rem;
  border-bottom: 1px solid var(--border);
}
.rvunit {
  display: flex;
  width: 100%;
  align-items: center;
  gap: 0.6rem;
  padding: 0.6rem 0.5rem 0.6rem 0.75rem;
  background: var(--bg-card);
  border: 1px solid var(--border);
  border-radius: 6px;
  margin-bottom: 0.5rem;
  cursor: pointer;
  text-align: left;
}
.rvunit:hover { border-color: var(--accent); }
.rvunit-text { display: flex; flex-direction: column; flex: 1; min-width: 0; gap: 0.1rem; }
.rvunit-name { font-weight: 600; color: var(--text-primary); font-size: 0.92rem; }
/* Mini stat plates — same chamfered-box look as DatasheetCard.vue's .ds-stat-box (10th-ed
   style: no rounding, top-left/bottom-right corners cut), scaled down to fit a compact list
   row. Copied, not shared — scoped styles don't cross component boundaries. */
.rvunit-stats { display: inline-flex; gap: 0.3rem; margin: 0.15rem 0; }
.rvst { display: inline-flex; flex-direction: column; align-items: center; gap: 2px; }
/* A plate the modifier layer rewrote — the same accent treatment DatasheetCard gives a modified
   value, so the list and the card agree at a glance as well as in the number. */
.rvst-mod .rvst-box { color: var(--accent); }
.rvst-label { font-size: 0.58rem; font-weight: 700; letter-spacing: 0.5px; color: var(--text-muted); }
.rvst-box {
  position: relative;
  isolation: isolate;
  display: block;
  min-width: 1.85rem;
  text-align: center;
  background: var(--border);
  clip-path: polygon(4px 0, 100% 0, 100% calc(100% - 4px), calc(100% - 4px) 100%, 0 100%, 0 4px);
  padding: 0.16rem 0.22rem;
  font-family: var(--font-display);
  font-weight: 700;
  font-size: 0.84rem;
  line-height: 1.1;
  color: var(--text-primary);
}
.rvst-box::before {
  content: '';
  position: absolute;
  inset: 1px;
  z-index: -1;
  background: color-mix(in srgb, var(--accent) 8%, var(--bg-card));
  clip-path: polygon(4px 0, 100% 0, 100% calc(100% - 4px), calc(100% - 4px) 100%, 0 100%, 0 4px);
}
/* Invulnerable save — its own plate right after SV, colour-called-out the way DatasheetCard's
   accent-coloured "Invulnerable Save" label calls it out (a distinct accent fill, not just
   another neutral box, so it reads as "special" among the plain stats). */
.rvst-inv .rvst-label { color: var(--accent); }
.rvst-inv .rvst-box { background: var(--accent); color: var(--text-on-accent, #fff); }
.rvst-inv .rvst-box::before { background: var(--accent); }
.rvunit-sub { font-size: 0.74rem; color: var(--text-dim); }
.rvunit-pts { font-family: var(--font-mono); font-weight: 700; color: var(--text-primary); }
.rvunit-chev { color: var(--text-dim); font-size: 0.7rem; flex-shrink: 0; }

.rv-rule-block { margin-bottom: 1.5rem; }

/* Stratagems tab — same toolbar/toggle/phase-accordion/grid language as the standalone
   StratagemsView.vue page — copied, not shared (scoped styles don't cross component
   boundaries). No .strat-filters here (StratagemsView's core/you/opp row) — this tab has
   nothing to filter, it's always just this roster's own detachments. */
.strat-toolbar {
  display: flex;
  align-items: center;
  justify-content: flex-end;
  margin-bottom: 1rem;
}
.strat-toggle {
  display: inline-flex;
  align-items: center;
  gap: 0.4rem;
  font: inherit;
  font-size: 0.8rem;
  font-weight: 600;
  padding: 0.4rem 0.9rem;
  border: 1px solid var(--border);
  border-radius: 999px;
  background: var(--bg-card);
  color: var(--text-muted);
  cursor: pointer;
  transition: background var(--motion-fast), color var(--motion-fast), border-color var(--motion-fast);
}
.strat-toggle:hover { color: var(--text-primary); border-color: var(--accent); }
.strat-toggle.active { background: var(--accent); border-color: var(--accent); color: #fff; }

.phase-group { margin-bottom: 0.75rem; }
.phase-head {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  width: 100%;
  padding: 0.5rem 0.7rem;
  border: 1px solid var(--border);
  border-radius: 6px;
  background: var(--bg-secondary);
  color: var(--text-primary);
  cursor: pointer;
  font-family: var(--font-display);
  font-size: 1.1rem;
  font-weight: 500;
  text-transform: uppercase;
  letter-spacing: 0.3px;
  transition: border-color var(--motion-fast);
}
.phase-head:hover { border-color: var(--accent); }
.phase-chev { flex-shrink: 0; font-size: 0.8rem; color: var(--text-dim); }
.phase-name { flex: 1; text-align: left; }
.phase-count { flex-shrink: 0; font-family: var(--font-mono); font-size: 0.8rem; font-weight: 700; color: var(--text-muted); }
.phase-grid { padding-top: 0.75rem; }

.strat-grid { column-count: 2; column-gap: 1rem; }
.strat-grid > * { break-inside: avoid; margin-bottom: 1rem; }
@media (max-width: 640px) {
  .strat-grid { column-count: 1; }
}
@media (max-width: 480px) {
  .strat-toggle-label { display: none; }
}

/* Per-faction accent — mirrors RosterEditorView / FactionLayout's three-step theme resolution. */
.roster-view.themed {
  --accent: var(--fa-light, var(--accent));
  --accent-hover: color-mix(in srgb, var(--fa-light) 80%, black);
}
@media (prefers-color-scheme: dark) {
  .roster-view.themed { --accent: var(--fa-dark, var(--accent)); --accent-hover: color-mix(in srgb, var(--fa-dark) 80%, white); }
}
</style>

<!-- Explicit data-theme must win over prefers-color-scheme in both directions (see FactionLayout). -->
<style>
:root[data-theme='light'] .roster-view.themed { --accent: var(--fa-light, #8b2a33); --accent-hover: color-mix(in srgb, var(--fa-light) 80%, black); }
:root[data-theme='dark'] .roster-view.themed { --accent: var(--fa-dark, #c8585e); --accent-hover: color-mix(in srgb, var(--fa-dark) 80%, white); }
</style>
