<template>
  <div class="setup">
    <div class="setup-head">
      <h2 class="setup-title">{{ labels.trackerSetupTitle }}</h2>
      <div class="steps">
        <span class="step" :class="{ on: step === 1, done: step > 1 }">1 · {{ labels.trackerStepArmies }}</span>
        <span class="step-sep">→</span>
        <span class="step" :class="{ on: step === 2 }">2 · {{ labels.trackerStepBattlefield }}</span>
      </div>
    </div>

    <!-- ───────── Step 1 — Armies ───────── -->
    <div v-show="step === 1">
      <div class="field battle-size">
        <span>{{ labels.trackerBattleSize }}</span>
        <div class="seg">
          <button
            v-for="b in battleSizes"
            :key="b.id"
            :class="{ on: settings.battleSize === b.id }"
            @click="settings.battleSize = b.id"
          >{{ b.name }} · {{ b.points }} · {{ b.maxDp }}DP</button>
        </div>
      </div>

      <div class="players">
        <div v-for="(p, i) in players" :key="i" class="player-card">
          <h3 class="player-head">{{ labels.trackerPlayer }} {{ i + 1 }}</h3>

          <label class="field">
            <span>{{ labels.trackerName }}</span>
            <input v-model="p.name" type="text" :placeholder="`${labels.trackerPlayer} ${i + 1}`" />
          </label>

          <label class="field">
            <span>{{ labels.trackerFaction }}</span>
            <select v-model="p.factionSlug">
              <option :value="null" disabled>{{ labels.trackerSelectFaction }}</option>
              <option v-for="f in factions" :key="f.slug" :value="f.slug">{{ f.name }}</option>
            </select>
          </label>

          <div class="field">
            <span>{{ labels.trackerDpBudget }} <em class="dp-count" :class="{ over: dpSpent(p) > maxDp }">{{ dpSpent(p) }} / {{ maxDp }} DP</em></span>
            <div v-if="p.factionSlug && detachmentsFor(p.factionSlug).length" class="det-list">
              <button
                v-for="d in detachmentsFor(p.factionSlug)"
                :key="d.name"
                class="det"
                :class="{ on: p.detachments.includes(d.name) }"
                :disabled="!p.detachments.includes(d.name) && p.detachments.length > 0 && dpSpent(p) + d.dp > maxDp"
                @click="toggleDetachment(p, d)"
              >
                <span class="det-name">{{ d.name }}</span>
                <span class="det-meta">{{ d.dp }}DP · {{ d.forceDisposition }}</span>
              </button>
            </div>
            <p v-else class="det-empty">{{ p.factionSlug ? labels.trackerNoDetachments : labels.trackerSelectFaction }}</p>
          </div>

          <label class="field">
            <span>{{ labels.trackerSecondaryMode }}</span>
            <div class="seg">
              <button :class="{ on: p.secondaryMode === 'tactical' }" @click="p.secondaryMode = 'tactical'">{{ labels.trackerTactical }}</button>
              <button :class="{ on: p.secondaryMode === 'fixed' }" @click="p.secondaryMode = 'fixed'">{{ labels.trackerFixed }}</button>
            </div>
          </label>

          <div v-if="p.secondaryMode === 'fixed'" class="field">
            <span>{{ labels.trackerChooseFixed }} <em class="dp-count">{{ p.fixedSecondaries.length }} / {{ MAX_FIXED }}</em></span>
            <div class="chips">
              <button
                v-for="m in fixedPool(p.role)"
                :key="m.slug"
                class="chip"
                :class="{ on: p.fixedSecondaries.includes(m.slug) }"
                :disabled="!p.fixedSecondaries.includes(m.slug) && p.fixedSecondaries.length >= MAX_FIXED"
                @click="toggleFixed(p, m.slug)"
              >{{ m.name }}</button>
            </div>
          </div>

          <label class="check br-check" :class="{ on: p.battleReady }">
            <input type="checkbox" v-model="p.battleReady" />
            <span>{{ labels.trackerBattleReady }} (+10 VP)</span>
          </label>
        </div>
      </div>

      <div class="actions">
        <button class="btn-ghost" @click="$emit('cancel')">{{ labels.trackerCancel }}</button>
        <button class="btn-primary" :disabled="!canNext" @click="step = 2">{{ labels.trackerNextStep }} →</button>
      </div>
    </div>

    <!-- ───────── Step 2 — Battlefield ───────── -->
    <div v-show="step === 2">
      <div class="players">
        <div v-for="(p, i) in players" :key="i" class="player-card">
          <h3 class="player-head">{{ labels.trackerPlayer }} {{ i + 1 }}</h3>
          <p class="army-summary">{{ p.name || `${labels.trackerPlayer} ${i + 1}` }} — {{ factionName(p.factionSlug) }}</p>

          <label class="field">
            <span>{{ candidateDispositions(p).length > 1 ? labels.trackerActiveDisposition : labels.trackerDisposition }}</span>
            <!-- faction has no detachments at all → manual choice (only way to set it) -->
            <select v-if="p.factionSlug && !detachmentsFor(p.factionSlug).length" v-model="p.disposition">
              <option :value="null" disabled>{{ labels.trackerDispositionManual }}</option>
              <option v-for="d in dispositions" :key="d.id" :value="d.id">{{ d.name }}</option>
            </select>
            <!-- ≥2 distinct dispositions from chosen detachments → pick the active one -->
            <div v-else-if="candidateDispositions(p).length > 1" class="seg seg-wrap">
              <button
                v-for="id in candidateDispositions(p)"
                :key="id"
                :class="{ on: p.disposition === id }"
                @click="p.disposition = id"
              >{{ dispositionName(id) }}</button>
            </div>
            <!-- exactly 1 → auto, read-only -->
            <input v-else-if="candidateDispositions(p).length === 1" type="text" :value="dispositionName(p.disposition)" readonly class="ro" />
            <!-- nothing chosen yet → gated behind picking a detachment -->
            <p v-else class="det-empty">{{ labels.trackerPickDetachmentFirst }}</p>
          </label>

          <label class="field">
            <span>{{ labels.trackerRole }}</span>
            <div class="seg">
              <button :class="{ on: p.role === 'attacker' }" @click="setRole(i, 'attacker')">{{ labels.trackerAttacker }}</button>
              <button :class="{ on: p.role === 'defender' }" @click="setRole(i, 'defender')">{{ labels.trackerDefender }}</button>
            </div>
          </label>

          <p class="primary-preview" v-if="primaryName(i)">
            <span class="pp-label">{{ labels.trackerPrimaryPreview }}:</span> {{ primaryName(i) }}
          </p>
        </div>
      </div>

      <!-- Battlefield layout: players pick A/B/C and set up the table themselves -->
      <div class="settings layout-block">
        <h3 class="block-head">{{ labels.trackerLayoutHeading }}</h3>
        <p class="layout-note">{{ labels.trackerLayoutNote }}</p>
        <template v-if="layouts.length">
          <div class="tabs">
            <button
              v-for="l in layouts"
              :key="l.id"
              class="tab"
              :class="{ active: settings.layout === l.id }"
              @click="settings.layout = l.id"
            ><span class="tab-word">{{ labels.eventLayout }}</span> {{ l.id }}</button>
          </div>
          <LayoutCard v-if="currentLayout" :layout="currentLayout" />
        </template>
        <p v-else class="det-empty">{{ labels.trackerLayoutPending }}</p>
      </div>

      <div class="settings">
        <label class="field">
          <span>{{ labels.trackerFirstTurn }}</span>
          <div class="seg">
            <button :class="{ on: settings.firstTurn === 1 }" @click="settings.firstTurn = 1">{{ labels.trackerPlayer }} 1</button>
            <button :class="{ on: settings.firstTurn === 2 }" @click="settings.firstTurn = 2">{{ labels.trackerPlayer }} 2</button>
          </div>
        </label>

        <label class="check" :class="{ on: settings.trackCP }">
          <input type="checkbox" v-model="settings.trackCP" />
          <span>{{ labels.trackerTrackCp }}</span>
        </label>
      </div>

      <div class="actions">
        <button class="btn-ghost" @click="step = 1">← {{ labels.trackerBack }}</button>
        <button class="btn-primary" :disabled="!canStart" @click="start">{{ labels.trackerStart }}</button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { reactive, ref, computed, watch } from 'vue'
import LayoutCard from '../event/LayoutCard.vue'
import { ui } from '../../i18n/ui.js'
import { useLocale } from '../../composables/useLocale.js'
import { eventCompanion } from '../../data/eventCompanion.js'
import { FACTIONS, DISPOSITIONS, BATTLE_SIZES, detachmentsFor, detachmentInfo, fixedPool, primaryFor, dispositionName } from '../../composables/useTracker.js'

const emit = defineEmits(['start', 'cancel'])
const { locale } = useLocale()
const labels = computed(() => ui[locale.value])

const factions = FACTIONS
const dispositions = DISPOSITIONS
const matchups = eventCompanion.en.matchups   // layout image paths are language-agnostic
const MAX_FIXED = 2   // Fixed secondaries: choose 2, kept for the whole game.

const step = ref(1)

const players = reactive([
  { name: '', factionSlug: null, detachments: [], disposition: null, role: 'attacker', secondaryMode: 'tactical', fixedSecondaries: [], battleReady: false },
  { name: '', factionSlug: null, detachments: [], disposition: null, role: 'defender', secondaryMode: 'tactical', fixedSecondaries: [], battleReady: false },
])
const settings = reactive({ trackCP: true, firstTurn: 1, layout: 'A', battleSize: 'strikeForce' })

const battleSizes = BATTLE_SIZES
const maxDp = computed(() => BATTLE_SIZES.find(b => b.id === settings.battleSize)?.maxDp ?? 3)

function factionName(slug) {
  return FACTIONS.find(f => f.slug === slug)?.name || ''
}

function toggleFixed(p, slug) {
  const i = p.fixedSecondaries.indexOf(slug)
  if (i >= 0) p.fixedSecondaries.splice(i, 1)
  else if (p.fixedSecondaries.length < MAX_FIXED) p.fixedSecondaries.push(slug)
}

function dpSpent(p) {
  return p.detachments.reduce((s, name) => s + (detachmentInfo(p.factionSlug, name)?.dp || 0), 0)
}
function candidateDispositions(p) {
  const ids = p.detachments
    .map(name => detachmentInfo(p.factionSlug, name)?.forceDisposition)
    .filter(Boolean)
    .map(name => DISPOSITIONS.find(d => d.name === name)?.id)
    .filter(Boolean)
  return [...new Set(ids)]
}
function setRole(idx, role) {
  // Roles are linked: the two players are always opposite (one attacker, one defender).
  players[idx].role = role
  players[idx === 0 ? 1 : 0].role = role === 'attacker' ? 'defender' : 'attacker'
}
function toggleDetachment(p, d) {
  const i = p.detachments.indexOf(d.name)
  if (i >= 0) p.detachments.splice(i, 1)
  // You can always include at least one detachment (even over budget); further
  // detachments must fit within the battle size's DP budget.
  else if (p.detachments.length === 0 || dpSpent(p) + d.dp <= maxDp.value) p.detachments.push(d.name)
}

// Changing faction resets its detachment/disposition choices.
players.forEach(p => watch(() => p.factionSlug, () => { p.detachments = []; p.disposition = null }))

function factionHasDetachments(p) {
  return !!p.factionSlug && detachmentsFor(p.factionSlug).length > 0
}

// Disposition is derived from the chosen detachment(s); it's gated until one is picked.
players.forEach(p => watch(() => candidateDispositions(p), (ids) => {
  if (ids.length === 0) {
    if (factionHasDetachments(p)) p.disposition = null   // no detachment chosen → no disposition yet
    return                                               // detachment-less faction keeps its manual value
  }
  if (!ids.includes(p.disposition)) p.disposition = ids[0]
}, { deep: true }))

function primaryName(i) {
  const me = players[i], opp = players[i === 0 ? 1 : 0]
  if (!me.disposition || !opp.disposition) return ''
  const m = primaryFor(me.disposition, opp.disposition)
  return m ? m.name : ''
}

// Switching back to tactical drops any chosen fixed missions.
players.forEach(p => watch(() => p.secondaryMode, (m) => { if (m !== 'fixed') p.fixedSecondaries = [] }))

// The recommended layouts for the current Force Disposition matchup (15 matchups
// cover all pairs, including mirrors). Reset the choice to A whenever it changes.
const matchup = computed(() => {
  const you = players[0].disposition, opp = players[1].disposition
  if (!you || !opp) return null
  return matchups.find(m => (m.a === you && m.b === opp) || (m.a === opp && m.b === you)) || null
})
const layouts = computed(() => matchup.value?.layouts ?? [])
const currentLayout = computed(() => layouts.value.find(l => l.id === settings.layout) || layouts.value[0] || null)
watch(matchup, () => { settings.layout = 'A' })

// Step 1 is complete once both players have a valid army (faction + a detachment
// where the faction has them + fixed picks when in fixed mode).
const canNext = computed(() =>
  players.every(p =>
    p.factionSlug &&
    (detachmentsFor(p.factionSlug).length === 0 || p.detachments.length > 0) &&
    (p.secondaryMode !== 'fixed' || p.fixedSecondaries.length > 0)
  )
)

const canStart = computed(() =>
  players.every(p => p.disposition && p.role && (p.secondaryMode !== 'fixed' || p.fixedSecondaries.length > 0)) &&
  !!primaryName(0) && !!primaryName(1)
)

function start() {
  emit('start', {
    settings: { ...settings },
    players: players.map(p => ({ ...p })),
  })
}
</script>

<style scoped>
.setup-head {
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex-wrap: wrap;
  gap: 0.5rem 1rem;
  margin-bottom: 1rem;
  padding-bottom: 0.3rem;
  border-bottom: 2px solid var(--accent);
}
.setup-title {
  font-family: var(--font-serif);
  font-size: 1.5rem;
  font-weight: 700;
  color: var(--text-primary);
  margin: 0;
}
.steps {
  display: flex;
  align-items: center;
  gap: 0.5rem;
}
.step {
  font-size: 0.78rem;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.04em;
  color: var(--text-dim);
  padding: 0.25rem 0.6rem;
  border: 1px solid var(--border);
  border-radius: 999px;
}
.step.on {
  color: #fff;
  background: var(--accent);
  border-color: var(--accent);
}
.step.done {
  color: var(--accent);
  border-color: var(--accent);
}
.step-sep { color: var(--text-dim); }
.players {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1rem;
}
.player-card,
.settings {
  background: var(--bg-card);
  border: 1px solid var(--border);
  border-radius: 6px;
  padding: 1rem;
}
.settings {
  margin-top: 1rem;
  display: flex;
  flex-wrap: wrap;
  gap: 1.25rem;
  align-items: flex-end;
}
/* Drop the field's bottom margin here so the First Turn control and the Track CP
   checkbox card sit on the same baseline (no vertical offset). */
.settings .field { margin-bottom: 0; }
.layout-block {
  display: block;
}
.block-head {
  font-family: var(--font-serif);
  font-size: 1.1rem;
  font-weight: 700;
  color: var(--accent);
  margin: 0 0 0.3rem;
}
.layout-note {
  margin: 0 0 0.75rem;
  font-size: 0.82rem;
  color: var(--text-muted);
  font-style: italic;
}
.army-summary {
  margin: -0.3rem 0 0.75rem;
  font-size: 0.82rem;
  color: var(--text-muted);
}
.player-head {
  font-family: var(--font-serif);
  font-size: 1.1rem;
  font-weight: 700;
  color: var(--accent);
  margin-bottom: 0.75rem;
}
.field {
  display: flex;
  flex-direction: column;
  gap: 0.3rem;
  margin-bottom: 0.7rem;
}
.field > span {
  font-size: 0.78rem;
  font-weight: 600;
  color: var(--text-muted);
  text-transform: uppercase;
  letter-spacing: 0.04em;
}
.field input[type="text"],
.field select {
  padding: 0.5rem 0.6rem;
  border: 1px solid var(--border);
  border-radius: 4px;
  background: var(--bg-secondary);
  color: var(--text-primary);
  font-size: 0.9rem;
  font-family: var(--font-sans);
}
.dp-count {
  font-style: normal;
  font-family: var(--font-mono);
  color: var(--accent);
  font-weight: 700;
  margin-left: 0.3rem;
}
.dp-count.over { color: #c0392b; }
:global([data-theme='dark']) .dp-count.over { color: #ef6e60; }
.battle-size {
  align-items: center;
  margin-bottom: 1rem;
}
.battle-size .seg { flex-wrap: wrap; justify-content: center; }
.det-list {
  display: flex;
  flex-direction: column;
  gap: 0.3rem;
  max-height: 220px;
  overflow-y: auto;
  padding-right: 2px;
}
.det {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 1px;
  text-align: left;
  padding: 0.4rem 0.55rem;
  border: 1px solid var(--border);
  background: var(--bg-secondary);
  border-radius: 4px;
  cursor: pointer;
  transition: background 0.15s, border-color 0.15s;
}
.det:hover:not(:disabled) { border-color: var(--accent); }
.det.on { background: color-mix(in srgb, var(--accent) 16%, transparent); border-color: var(--accent); }
.det:disabled { opacity: 0.4; cursor: not-allowed; }
.det-name { font-size: 0.85rem; font-weight: 600; color: var(--text-primary); }
.det-meta { font-size: 0.7rem; color: var(--text-dim); font-family: var(--font-mono); }
.det-empty { font-size: 0.82rem; color: var(--text-dim); font-style: italic; margin: 0; }
.chips { display: flex; flex-wrap: wrap; gap: 0.3rem; }
.chip {
  padding: 0.3rem 0.55rem;
  border: 1px solid var(--border);
  background: var(--bg-secondary);
  color: var(--text-muted);
  border-radius: 999px;
  font-size: 0.74rem;
  cursor: pointer;
}
.chip.on { background: var(--accent); color: #fff; border-color: var(--accent); }
.chip:disabled { opacity: 0.4; cursor: not-allowed; }
.ro {
  padding: 0.5rem 0.6rem;
  border: 1px solid var(--border);
  border-radius: 4px;
  background: var(--bg-secondary);
  color: var(--text-muted);
  font-size: 0.9rem;
}
.seg-wrap { flex-wrap: wrap; }
.seg {
  display: flex;
  gap: 0;
  border: 1px solid var(--border);
  border-radius: 4px;
  overflow: hidden;
  width: fit-content;
}
.seg button {
  padding: 0.45rem 0.8rem;
  background: var(--bg-secondary);
  color: var(--text-muted);
  border: none;
  cursor: pointer;
  font-size: 0.82rem;
  transition: background 0.15s, color 0.15s;
}
.seg button + button {
  border-left: 1px solid var(--border);
}
.seg button.on {
  background: var(--accent);
  color: #fff;
}
/* Checkbox rows styled like the mission scoring conditions (ScoringModal .m-cond). */
.check {
  display: flex;
  align-items: center;
  gap: 0.55rem;
  padding: 0.5rem 0.6rem;
  border: 1px solid var(--border);
  border-radius: 5px;
  background: var(--bg-secondary);
  font-size: 0.85rem;
  color: var(--text-muted);
  cursor: pointer;
  transition: border-color 0.15s, background 0.15s;
}
.check:hover { border-color: var(--accent); }
.check.on {
  border-color: var(--accent);
  background: color-mix(in srgb, var(--accent) 10%, transparent);
}
.check.on span { color: var(--text-primary); }
.check input[type="checkbox"] {
  width: 20px;
  height: 20px;
  flex-shrink: 0;
  accent-color: var(--accent);
  cursor: pointer;
}
.br-check { margin-top: 0.2rem; }
.primary-preview {
  margin: 0.4rem 0 0;
  font-size: 0.82rem;
  color: var(--text-muted);
  line-height: 1.4;
}
.pp-label {
  font-weight: 700;
  color: var(--text-dim);
  text-transform: uppercase;
  font-size: 0.7rem;
  letter-spacing: 0.04em;
}

/* Layout A/B/C tabs (mirror the Event Companion layout viewer). */
.tabs {
  display: flex;
  gap: 0.4rem;
  margin-bottom: 1rem;
}
.tab {
  padding: 0.4rem 1.1rem;
  border: 1px solid var(--border);
  border-radius: 999px;
  background: transparent;
  color: var(--text-primary);
  cursor: pointer;
  font-family: var(--font-serif);
  font-size: 0.95rem;
  transition: background 0.12s, border-color 0.12s;
}
.tab:hover { border-color: var(--accent); }
.tab.active {
  background: var(--accent);
  color: var(--text-on-accent);
  border-color: var(--accent);
}

.actions {
  display: flex;
  justify-content: flex-end;
  gap: 0.6rem;
  margin-top: 1.25rem;
}
.btn-primary {
  padding: 0.6rem 1.4rem;
  background: var(--accent);
  color: #fff;
  border: none;
  border-radius: 4px;
  font-weight: 600;
  font-size: 0.9rem;
  cursor: pointer;
}
.btn-primary:disabled {
  opacity: 0.45;
  cursor: not-allowed;
}
.btn-ghost {
  padding: 0.6rem 1.1rem;
  background: none;
  color: var(--text-muted);
  border: 1px solid var(--border);
  border-radius: 4px;
  font-size: 0.9rem;
  cursor: pointer;
}
@media (max-width: 700px) {
  .players { grid-template-columns: 1fr; }
  .tab-word { display: none; }
  .tab { min-width: 44px; min-height: 44px; }
}
</style>
