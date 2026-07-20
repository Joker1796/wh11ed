<template>
  <div v-if="roster" class="roster-view themed" :style="accentStyle">
    <RouterLink to="/roster" class="back"><i class="bi bi-chevron-left"></i> {{ labels.rosterBackToList }}</RouterLink>

    <header class="rv-head">
      <h1 class="rv-name">{{ roster.name || labels.rosterUntitled }}</h1>
      <div v-if="roster.faction" class="rv-points" :class="{ over: points > limit }">
        <span class="rp-used">{{ points }}</span>
        <span class="rp-sep">/</span>
        <span class="rp-cap">{{ limit }}</span>
      </div>
      <RouterLink :to="`/roster/${roster.id}`" class="hdr-icon" :aria-label="labels.rosterEdit">
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
      </div>

      <!-- Compact read-only unit list, grouped like the editor -->
      <div v-if="tab === 'units'" class="rv-units">
        <p v-if="!roster.units.length" class="rv-hint">{{ labels.rosterUnitsEmpty }}</p>
        <template v-for="g in groupedUnits" :key="g.id">
          <template v-if="g.entries.length">
            <h3 class="rvg-head">{{ labels[GROUP_LABEL_KEYS[g.id]] }}</h3>
            <button v-for="e in g.entries" :key="e.uid" class="rvunit" @click="viewingUid = e.uid">
              <span class="rvunit-text">
                <span class="rvunit-name">{{ defOf(e.id)?.name || e.id }}</span>
                <span v-if="statlineOf(e.id)" class="rvunit-stats">{{ statlineOf(e.id) }}</span>
                <span class="rvunit-sub">{{ summaryLine(e) }}</span>
              </span>
              <span class="rvunit-pts">{{ entryMeta.get(e.uid)?.points }}</span>
              <i class="bi bi-chevron-right rvunit-chev"></i>
            </button>
          </template>
        </template>
      </div>

      <!-- Army rule + selected detachment(s) rule, lazily loaded (heavy faction rules bundle) -->
      <div v-else class="rv-rules">
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
    </template>

    <RosterUnitRulesModal
      v-if="viewingUid && viewingDef"
      :unit-id="viewingDef.id"
      :faction-slug="roster.faction"
      @close="viewingUid = null"
    />
  </div>
</template>

<script setup>
import { computed, ref, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import RuleBlock from '../../components/RuleBlock.vue'
import RosterUnitRulesModal from '../../components/roster/RosterUnitRulesModal.vue'
import { ui } from '../../i18n/ui.js'
import { useLocale } from '../../composables/useLocale.js'
import { useRosters } from '../../composables/useRosters.js'
import rosterCore from '../../data/roster/core.js'
import { loadRosterFaction } from '../../data/roster/index.js'
import { loadDatasheets } from '../../data/datasheets/index.js'
import { factionGroups } from '../../data/factionsIndex.js'
import { UNIT_GROUPS, bucketOf, unitPoints, rosterPoints, effectiveBattle } from '../../composables/rosterEngine.js'

const route = useRoute()
const router = useRouter()
const { locale } = useLocale()
const labels = computed(() => ui[locale.value])
const { rosterById } = useRosters()

const roster = computed(() => rosterById(route.params.id))
watch(roster, (r) => { if (!r) router.replace('/roster') }, { immediate: true })

const GROUP_LABEL_KEYS = {
  epic: 'rosterGroupEpic', characters: 'rosterGroupCharacters', battleline: 'rosterGroupBattleline',
  transports: 'rosterGroupTransports', other: 'rosterGroupOther',
}

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
// roster data layer, so pull it from the full datasheet file (already needed by the unit
// rules modal on click; loaded here too so every row can show it without opening that modal).
const fullSheets = ref(new Map())
watch(() => roster.value?.faction, async (slug) => {
  if (!slug) { fullSheets.value = new Map(); return }
  const list = await loadDatasheets(slug)
  if (roster.value?.faction !== slug) return
  const m = new Map()
  for (const d of list || []) m.set(d.id, d)
  fullSheets.value = m
}, { immediate: true })

function statlineOf(id) {
  const p = fullSheets.value.get(id)?.profiles?.[0]
  if (!p) return ''
  const sv = p.inv ? `${p.sv}/${p.inv}` : p.sv
  return `M${p.m} T${p.t} SV${sv} W${p.w} LD${p.ld} OC${p.oc}`
}

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
  const def = defOf(e.id)
  if (!def) return ''
  const size = def.sizes[e.size ?? 0] || def.sizes[0]
  const n = e.count ?? size.per[0]
  const parts = []
  if (e.warlord) parts.push('★')
  if (size.per[1] > 1) parts.push(`${n} ${labels.value.rosterModelsLabel}`)
  if (e.wg?.length) parts.push(`${e.wg.length} ${labels.value.rosterUpgradesLabel}`)
  if (e.enh) parts.push(e.enh)
  return parts.join(' · ')
}

// ── Unit rules modal ──
const viewingUid = ref(null)
const viewingDef = computed(() => {
  const e = roster.value?.units.find((u) => u.uid === viewingUid.value)
  return e ? defOf(e.id) : null
})

// ── Rules tab: army rule + each selected detachment's rule, from the (heavy) faction rules
// data — dynamically imported only when this tab is opened, same invariant as StratagemsView's
// detachment stratagems (never statically import src/data/factions/*). Chapters sharing Codex
// Space Marines detachments (Gladius Task Force, etc.) fall back to the space-marines file for
// detachments not defined in their own — same fallback as the stratagems page.
const SM_CHAPTERS = new Set(['black-templars', 'blood-angels', 'dark-angels', 'deathwatch', 'space-wolves'])
const normName = (s) => s.replace(/[’'`]/g, "'").trim().toLowerCase()

const rulesFaction = ref(null)
const detachmentLookup = ref(new Map())

async function loadFactionSource(slug, loc) {
  const { getFaction } = await import('../../data/factions/index.js')
  const data = getFaction(slug)
  if (!data) return null
  if (loc !== 'ru') return data.en
  const { loadFactionRu, deepOverlay } = await import('../../data/factions/ru/index.js')
  const mod = await loadFactionRu(slug)
  return mod ? deepOverlay(data.en, mod.default) : data.ru
}

watch([() => roster.value?.faction, tab, locale], async ([slug, t, loc]) => {
  if (t !== 'rules' || !slug) return
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
.rvunit-stats { font-family: var(--font-mono); font-size: 0.72rem; color: var(--text-muted); }
.rvunit-sub { font-size: 0.74rem; color: var(--text-dim); }
.rvunit-pts { font-family: var(--font-mono); font-weight: 700; color: var(--text-primary); }
.rvunit-chev { color: var(--text-dim); font-size: 0.7rem; }

.rv-rule-block { margin-bottom: 1.5rem; }

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
