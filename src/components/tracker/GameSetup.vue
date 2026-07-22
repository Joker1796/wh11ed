<template>
  <div class="setup">
    <div class="setup-head">
      <h2 class="setup-title">{{ labels.trackerSetupTitle }}</h2>
      <div class="steps">
        <span class="step" :class="{ on: step === 1, done: step > 1 }" :aria-current="step === 1 ? 'step' : undefined">1 · {{ labels.trackerStepArmies }}</span>
        <span class="step-sep">→</span>
        <span class="step" :class="{ on: step === 2, done: step > 2 }" :aria-current="step === 2 ? 'step' : undefined">2 · {{ labels.trackerStepMission }}</span>
        <span class="step-sep">→</span>
        <span class="step" :class="{ on: step === 3, done: step > 3 }" :aria-current="step === 3 ? 'step' : undefined">3 · {{ labels.trackerStepBattlefield }}</span>
        <span class="step-sep">→</span>
        <span class="step" :class="{ on: step === 4 }" :aria-current="step === 4 ? 'step' : undefined">4 · {{ labels.trackerStepDeploy }}</span>
      </div>
      <div class="steps-compact">{{ step }} / 4 · {{ stepLabel }}</div>
    </div>

    <!-- ───────── Step 1 — Armies ───────── -->
    <div v-show="step === 1" :ref="el => (panelEls[0] = el)" class="step-panel">
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
          <h3 class="player-head">{{ playerLabel(i) }}</h3>

          <label class="field">
            <input v-model="p.name" type="text" :placeholder="namePlaceholder(i)" />
          </label>

          <div class="field">
            <span>{{ labels.trackerFaction }}</span>
            <button class="btn-choose-twist faction-btn" @click="factionPickerIdx = i">
              <span class="ct-name" :class="{ placeholder: !p.factionSlug }">{{ p.factionSlug ? factionName(p.factionSlug) : labels.trackerSelectFaction }}</span>
              <i class="bi bi-chevron-right ct-chev"></i>
            </button>
            <FactionPickerModal
              v-if="factionPickerIdx === i"
              :selected="p.factionSlug"
              @pick="slug => selectFaction(p, slug)"
              @close="factionPickerIdx = -1"
            />
          </div>

          <div class="field">
            <span>{{ labels.trackerDpBudget }} <em class="dp-count" :class="{ over: dpSpent(p) > maxDp }">{{ dpSpent(p) }} / {{ maxDp }} DP</em></span>
            <button
              v-if="p.factionSlug && detachmentsFor(p.factionSlug).length"
              class="btn-choose-twist"
              @click="detPickerIdx = i"
            >
              <span class="ct-name" :class="{ placeholder: !p.detachments.length }">{{ detSummary(p) }}</span>
              <i class="bi bi-chevron-right ct-chev"></i>
            </button>
            <p v-else class="det-empty">{{ p.factionSlug ? labels.trackerNoDetachments : labels.trackerSelectFaction }}</p>
            <DetachmentPickerModal
              v-if="detPickerIdx === i"
              :detachments="detachmentsFor(p.factionSlug)"
              :selected="p.detachments"
              :max-dp="maxDp"
              :dp-spent="dpSpent(p)"
              @toggle="d => toggleDetachment(p, d)"
              @close="detPickerIdx = -1"
            />
          </div>

          <label class="field">
            <span>{{ labels.trackerRole }}</span>
            <div class="seg">
              <button :class="{ on: p.role === 'attacker' }" @click="setRole(i, 'attacker')">{{ labels.trackerAttacker }}</button>
              <button :class="{ on: p.role === 'defender' }" @click="setRole(i, 'defender')">{{ labels.trackerDefender }}</button>
            </div>
          </label>

          <label class="check br-check" :class="{ on: p.battleReady }">
            <input type="checkbox" v-model="p.battleReady" />
            <span>{{ labels.trackerBattleReady }} (+10 VP)</span>
          </label>
        </div>
      </div>

      <div class="actions">
        <button class="btn-ghost" @click="cancel">{{ labels.trackerCancel }}</button>
        <button class="btn-primary" :disabled="!canArmies" @click="step = 2">{{ labels.trackerNextStep }} →</button>
      </div>
    </div>

    <!-- ───────── Step 2 — Mission ───────── -->
    <div v-show="step === 2" :ref="el => (panelEls[1] = el)" class="step-panel">
      <div class="players">
        <div v-for="(p, i) in players" :key="i" class="player-card">
          <h3 class="player-head">{{ playerLabel(i) }}</h3>
          <p class="army-summary">{{ p.name || playerLabel(i) }} — {{ factionName(p.factionSlug) }}</p>

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
            <span>{{ labels.trackerSecondaryMode }}</span>
            <div class="seg">
              <button :class="{ on: p.secondaryMode === 'tactical' }" @click="p.secondaryMode = 'tactical'">{{ labels.trackerTactical }}</button>
              <button :class="{ on: p.secondaryMode === 'fixed' }" @click="p.secondaryMode = 'fixed'">{{ labels.trackerFixed }}</button>
            </div>
          </label>

          <div v-if="p.secondaryMode === 'fixed'" class="field">
            <span>{{ labels.trackerChooseFixed }} <em class="dp-count">{{ p.fixedSecondaries.length }} / {{ MAX_FIXED }}</em></span>
            <button class="btn-choose-twist" @click="fixedPickerFor = i">
              <span class="ct-name" :class="{ placeholder: !p.fixedSecondaries.length }">{{ fixedSummary(p) }}</span>
              <i class="bi bi-chevron-right ct-chev"></i>
            </button>
          </div>

          <div class="primary-card" v-if="primaryCards[i]">
            <MissionCard :mission="primaryCards[i]" :subtitle="labels.trackerPrimaryPreview" :show-lore="false" collapsible :default-open="false" />
          </div>
        </div>
      </div>

      <div class="actions">
        <button class="btn-ghost" @click="step = 1">← {{ labels.trackerBack }}</button>
        <button class="btn-primary" :disabled="!canMission" @click="step = 3">{{ labels.trackerNextStep }} →</button>
      </div>
    </div>

    <!-- ───────── Step 3 — Battlefield (layout) ───────── -->
    <div v-show="step === 3" :ref="el => (panelEls[2] = el)" class="step-panel">
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
              @click="selectLayout(l.id)"
            ><span class="tab-word">{{ labels.eventLayout }}</span> {{ l.id }}</button>
            <button class="tab" :class="{ active: settings.layout === 'custom' }" @click="layoutPickerOpen = true">{{ labels.trackerLayoutCustom }}</button>
          </div>
          <LayoutCard v-if="currentLayout" :layout="currentLayout" />
        </template>
        <p v-else class="det-empty">{{ labels.trackerLayoutPending }}</p>
      </div>

      <div class="actions">
        <button class="btn-ghost" @click="step = 2">← {{ labels.trackerBack }}</button>
        <button class="btn-primary" :disabled="!canBattlefield" @click="step = 4">{{ labels.trackerNextStep }} →</button>
      </div>
    </div>

    <!-- ───────── Step 4 — Deployment (first turn, CP, twist) ───────── -->
    <div v-show="step === 4" :ref="el => (panelEls[3] = el)" class="step-panel">
      <div class="settings deploy-opts">
        <label class="field">
          <span>{{ labels.trackerFirstTurn }}</span>
          <div class="seg">
            <button :class="{ on: settings.firstTurn === 1 }" @click="settings.firstTurn = 1">{{ labels.trackerYou }}</button>
            <button :class="{ on: settings.firstTurn === 2 }" @click="settings.firstTurn = 2">{{ labels.trackerOpponent }}</button>
          </div>
        </label>

        <label class="field">
          <span>
            {{ labels.trackerScoreMode }}
            <button type="button" class="help-btn" @click="scoreHelpOpen = true" :aria-label="labels.trackerScoreHelp"><i class="bi bi-question-circle"></i></button>
          </span>
          <div class="seg">
            <button :class="{ on: settings.scoreMode === 'vp' }" @click="settings.scoreMode = 'vp'">{{ labels.trackerScoreVp }}</button>
            <button :class="{ on: settings.scoreMode === 'bp' }" @click="settings.scoreMode = 'bp'">{{ labels.trackerScoreBp }}</button>
          </div>
        </label>

        <label class="check" :class="{ on: settings.trackCP }">
          <input type="checkbox" v-model="settings.trackCP" />
          <span>{{ labels.trackerTrackCp }}</span>
        </label>

        <label v-if="armyRuleTrackable" class="check" :class="{ on: settings.trackArmyRule }">
          <input type="checkbox" v-model="settings.trackArmyRule" />
          <span>{{ labels.trackerTrackArmy }}</span>
        </label>
      </div>

      <!-- Twist: optional pre-game modifier — chosen via a full-screen picker -->
      <div class="settings twist-block">
        <h3 class="block-head">{{ labels.trackerTwistHeading }}</h3>
        <button class="btn-choose-twist" @click="twistPickerOpen = true">
          <span class="ct-name" :class="{ placeholder: !chosenTwist }">{{ chosenTwist ? chosenTwist.title : labels.trackerChooseTwist }}</span>
          <i class="bi bi-chevron-right ct-chev"></i>
        </button>
        <details v-if="chosenTwist" class="twist-chosen">
          <summary>{{ labels.trackerTwistRules }}</summary>
          <div class="twist-chosen-body"><RuleBody :body="chosenTwist.body" /></div>
        </details>
        <div v-if="settings.twist === 'mirrored-world'" class="field twist-mission">
          <span>{{ labels.trackerTwistMission }}</span>
          <button class="btn-choose-twist" @click="mirrorPickerOpen = true">
            <span class="ct-name" :class="{ placeholder: !settings.twistMission }">{{ mirrorSummary }}</span>
            <i class="bi bi-chevron-right ct-chev"></i>
          </button>
        </div>
      </div>

      <div class="actions">
        <button class="btn-ghost" @click="step = 3">← {{ labels.trackerBack }}</button>
        <button class="btn-primary" :disabled="!canStart" @click="start">{{ labels.trackerStart }}</button>
      </div>
    </div>

    <TwistPickerModal
      v-if="twistPickerOpen"
      :twists="twistList"
      :selected="settings.twist"
      @pick="onPickTwist"
      @random="onRandomTwist"
      @none="onNoTwist"
      @close="twistPickerOpen = false"
    />

    <SecondaryPickerModal
      v-if="fixedPickerFor >= 0"
      :missions="fixedModalMissions"
      :selected="players[fixedPickerFor].fixedSecondaries"
      :max="MAX_FIXED"
      @toggle="slug => toggleFixed(players[fixedPickerFor], slug)"
      @close="fixedPickerFor = -1"
    />

    <MissionPickerModal
      v-if="mirrorPickerOpen"
      :title="labels.trackerTwistMission"
      :missions="mirrorModalMissions"
      :selected="settings.twistMission"
      :random-label="labels.trackerRandom"
      @pick="onPickMirror"
      @random="onRandomMirror"
      @close="mirrorPickerOpen = false"
    />

    <ScoreHelpModal v-if="scoreHelpOpen" @close="scoreHelpOpen = false" />

    <LayoutPickerModal
      v-if="layoutPickerOpen"
      :selected="settings.layout === 'custom' ? settings.customLayout : null"
      @pick="onPickLayout"
      @close="layoutPickerOpen = false"
    />
  </div>
</template>

<script setup>
import { reactive, ref, computed, watch, nextTick } from 'vue'
import LayoutCard from '../event/LayoutCard.vue'
import MissionCard from '../event/MissionCard.vue'
import RuleBody from '../RuleBody.vue'
import TwistPickerModal from './TwistPickerModal.vue'
import DetachmentPickerModal from './DetachmentPickerModal.vue'
import FactionPickerModal from './FactionPickerModal.vue'
import SecondaryPickerModal from './SecondaryPickerModal.vue'
import MissionPickerModal from './MissionPickerModal.vue'
import ScoreHelpModal from './ScoreHelpModal.vue'
import LayoutPickerModal from './LayoutPickerModal.vue'
import { resolveLayout } from '../../composables/trackerLayout.js'
import { ui } from '../../i18n/ui.js'
import { useLocale } from '../../composables/useLocale.js'
import { eventCompanion, getEventContent } from '../../data/eventCompanion.js'
import { useTracker, DISPOSITIONS, BATTLE_SIZES, MIRROR_MISSIONS, derivePrimary, missionBySlug, fixedPool, dispositionName } from '../../composables/useTracker.js'
import { FACTIONS, detachmentsFor, detachmentInfo } from '../../composables/trackerFactions.js'

const emit = defineEmits(['start', 'cancel'])
const { locale } = useLocale()
const labels = computed(() => ui[locale.value])
const { history, setupDraft } = useTracker()

// Pre-fill "Your" name from the most recent finished game. New games mark the "You" player with
// isYou:true (possibly at index 1 if Opponent went first); fall back to index 0 for old games.
const lastGame = history.value[0]
const lastYouName = lastGame
  ? ((lastGame.players.find(p => p.isYou) ?? lastGame.players[0])?.name ?? '')
  : ''
// Default the score mode to the last game's choice (older games lack it → fall back to VP).
const lastScoreMode = history.value[0]?.settings?.scoreMode === 'bp' ? 'bp' : 'vp'
// Remember the Track CP toggle from the last game (older games lack it → default on).
const lastTrackCP = history.value[0]?.settings?.trackCP ?? true
// Same for the army-rule tracker toggle.
const lastTrackArmy = history.value[0]?.settings?.trackArmyRule ?? true
function playerLabel(i) {
  return i === 0 ? labels.value.trackerYou : labels.value.trackerOpponent
}
function namePlaceholder(i) {
  return i === 0 ? labels.value.trackerYourName : labels.value.trackerOpponentName
}

const dispositions = DISPOSITIONS
const matchups = eventCompanion.en.matchups   // layout image paths are language-agnostic
const MAX_FIXED = 2   // Fixed secondaries: choose 2, kept for the whole game.

// Defaults (also the shape merged over a restored draft so older drafts gain new fields).
function defaultPlayer(role, name = '') {
  return { name, factionSlug: null, detachments: [], disposition: null, role, secondaryMode: 'tactical', fixedSecondaries: [], battleReady: false }
}
const defaultSettings = { trackCP: lastTrackCP, trackArmyRule: lastTrackArmy, firstTurn: 1, layout: 'A', customLayout: null, battleSize: 'strikeForce', twist: null, twistMission: null, scoreMode: lastScoreMode }

// Restore an in-progress draft if present, else start fresh (with the pre-filled name).
// Read once, BEFORE the reset watchers are registered, so restoring a faction/detachments
// doesn't trip the faction-change reset.
const draft = setupDraft.value
const step = ref(draft?.step ?? 1)
const players = reactive([
  { ...defaultPlayer('attacker', lastYouName), ...(draft?.players?.[0]) },
  { ...defaultPlayer('defender'), ...(draft?.players?.[1]) },
])
const settings = reactive({ ...defaultSettings, ...(draft?.settings) })

// The "Track army rule" toggle only makes sense if at least one chosen faction actually has an
// army-rule tracker spec — otherwise it'd be a dead option. Resolve that lazily (the registry is
// dynamic-imported, same as the in-game card) whenever the picked factions change.
const armyRuleTrackable = ref(false)
watch(
  () => players.map(p => p.factionSlug).join('|'),
  async () => {
    const slugs = players.map(p => p.factionSlug).filter(Boolean)
    if (!slugs.length) { armyRuleTrackable.value = false; return }
    const { resolveArmyTracker } = await import('../../data/armyTrackers/index.js')
    armyRuleTrackable.value = slugs.some(s => resolveArmyTracker(s))
  },
  { immediate: true },
)

const battleSizes = BATTLE_SIZES
const maxDp = computed(() => BATTLE_SIZES.find(b => b.id === settings.battleSize)?.maxDp ?? 3)

// Twists — optional pre-game modifiers (names English; localized prose from the data).
const twistList = computed(() => getEventContent(locale.value).twists.blocks)
const mirrorMissions = MIRROR_MISSIONS
function setTwist(id) {
  settings.twist = id
  if (id !== 'mirrored-world') settings.twistMission = null
}
function randomMirror() {
  const m = mirrorMissions[Math.floor(Math.random() * mirrorMissions.length)]
  settings.twistMission = m ? m.slug : null
}

// Mirrored World shared-mission picker modal (choose one of the 5, or randomize).
const mirrorPickerOpen = ref(false)
const mirrorModalMissions = computed(() => mirrorMissions.map(m => missionBySlug(m.slug, null, locale.value)))
const mirrorSummary = computed(() =>
  settings.twistMission
    ? (missionBySlug(settings.twistMission, null, locale.value)?.name || settings.twistMission)
    : labels.value.trackerSelect
)
function onPickMirror(slug) { settings.twistMission = slug; mirrorPickerOpen.value = false }
function onRandomMirror() { randomMirror(); mirrorPickerOpen.value = false }
function randomTwist() {
  const ids = twistList.value.map(t => t.id)
  const id = ids[Math.floor(Math.random() * ids.length)]
  setTwist(id)
  if (id === 'mirrored-world') randomMirror()
}

const scoreHelpOpen = ref(false)

// Twist picker modal (full-screen on mobile).
const twistPickerOpen = ref(false)
const chosenTwist = computed(() => twistList.value.find(t => t.id === settings.twist) || null)
function onPickTwist(id) { setTwist(id); twistPickerOpen.value = false }
function onRandomTwist() { randomTwist(); twistPickerOpen.value = false }
function onNoTwist() { setTwist(null); twistPickerOpen.value = false }

const stepLabel = computed(() => [
  labels.value.trackerStepArmies, labels.value.trackerStepMission,
  labels.value.trackerStepBattlefield, labels.value.trackerStepDeploy,
][step.value - 1])

// On step change: return to the top (Next/Back sit at the bottom of long panels) and
// replay the panel's entrance animation. Panels use v-show (all stay mounted), so the
// animation is re-triggered by re-adding the class after a forced reflow.
const panelEls = []
watch(step, async (n) => {
  const reduced = window.matchMedia?.('(prefers-reduced-motion: reduce)')?.matches
  // 'instant', not 'auto': the global `html { scroll-behavior: smooth }` makes 'auto'
  // scroll smoothly anyway, which would defeat the reduced-motion branch.
  window.scrollTo({ top: 0, behavior: reduced ? 'instant' : 'smooth' })
  await nextTick()
  const el = panelEls[n - 1]
  if (!el) return
  el.classList.remove('wizard-in')
  void el.offsetWidth
  el.classList.add('wizard-in')
})

function factionName(slug) {
  return FACTIONS.find(f => f.slug === slug)?.name || ''
}

function toggleFixed(p, slug) {
  const i = p.fixedSecondaries.indexOf(slug)
  if (i >= 0) p.fixedSecondaries.splice(i, 1)
  else if (p.fixedSecondaries.length < MAX_FIXED) p.fixedSecondaries.push(slug)
}

// Fixed-secondary picker modal — open for player index (-1 = closed). Lists the
// localized full mission cards so their text can be read before choosing.
const fixedPickerFor = ref(-1)
const detPickerIdx = ref(-1)
const factionPickerIdx = ref(-1)

// Faction is single-select: picking one applies it and closes the modal immediately.
function selectFaction(p, slug) {
  p.factionSlug = slug
  factionPickerIdx.value = -1
}
const fixedModalMissions = computed(() => {
  if (fixedPickerFor.value < 0) return []
  const role = players[fixedPickerFor.value].role
  return fixedPool(role).map(m => missionBySlug(m.slug, role, locale.value))
})
function fixedSummary(p) {
  if (!p.fixedSecondaries.length) return labels.value.trackerSelect
  return p.fixedSecondaries.map(slug => missionBySlug(slug, p.role, locale.value)?.name || slug).join(', ')
}

function detSummary(p) {
  if (!p.detachments.length) return labels.value.trackerChooseDetachments
  return p.detachments.join(', ')
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

// Shrinking the battle size (e.g. Strike Force → Incursion) can invalidate the chosen
// detachments' DP, so clear each player's detachments and disposition for a fresh pick.
watch(() => settings.battleSize, (next, prev) => {
  const maxOf = id => BATTLE_SIZES.find(b => b.id === id)?.maxDp ?? 3
  if (maxOf(next) >= maxOf(prev)) return
  players.forEach(p => { p.detachments = []; p.disposition = null })
})

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
  // Mirror the twist-aware derivation used when the game is created, so the preview
  // reflects Scrambled Communications / Mirrored World.
  const m = derivePrimary(me.disposition, opp.disposition, settings)
  return m ? m.name : ''
}

// Full localized primary-mission cards for the step-2 preview (one per player).
const primaryCards = computed(() => players.map((p, i) => {
  const opp = players[i === 0 ? 1 : 0]
  if (!p.disposition || !opp.disposition) return null
  const m = derivePrimary(p.disposition, opp.disposition, settings)
  return m ? missionBySlug(m.slug, null, locale.value) : null
}))

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
// Resolves the recommended A/B/C OR a chosen custom layout (any of the 45).
const currentLayout = computed(() => resolveLayout(settings, players[0].disposition, players[1].disposition))
// Changing dispositions changes the recommended matchup → reset to A and drop any custom pick.
watch(matchup, () => { settings.layout = 'A'; settings.customLayout = null })

// Custom layout picker (any of the 45 across all matchups).
const layoutPickerOpen = ref(false)
function selectLayout(id) { settings.layout = id; settings.customLayout = null }
function onPickLayout(l) { settings.layout = 'custom'; settings.customLayout = l; layoutPickerOpen.value = false }

// Step 1 (Armies): both players have a valid army — faction + a detachment where the
// faction has them.
const canArmies = computed(() =>
  players.every(p =>
    p.factionSlug &&
    (detachmentsFor(p.factionSlug).length === 0 || p.detachments.length > 0)
  )
)

// Step 2 (Mission): dispositions resolved (→ a primary for each) + fixed picks chosen
// where in fixed mode.
const canMission = computed(() =>
  canArmies.value &&
  players.every(p => p.disposition && (p.secondaryMode !== 'fixed' || p.fixedSecondaries.length > 0)) &&
  !!primaryName(0) && !!primaryName(1)
)

// Step 3 (Battlefield): layout always has a default → gate only on the earlier steps.
const canBattlefield = computed(() => canMission.value)

// Step 4 (Deployment): roles set (always defaulted) — gate on the earlier steps too.
const canStart = computed(() =>
  canMission.value && players.every(p => p.role)
)

// Persist the in-progress setup so it survives reloads / navigating away. Serialized
// snapshot (deep, post-flush) — no loop since this watch doesn't read setupDraft.
watch([step, () => players, () => settings], () => {
  setupDraft.value = JSON.parse(JSON.stringify({ step: step.value, players, settings }))
}, { deep: true, flush: 'post' })

function clearDraft() { setupDraft.value = null }

function start() {
  clearDraft()
  emit('start', {
    settings: { ...settings },
    players: players.map(p => ({ ...p })),
  })
}
function cancel() {
  clearDraft()
  emit('cancel')
}
</script>

<style scoped>
/* Entrance replayed on each step change (class re-added from the step watcher). */
.wizard-in {
  animation: wizard-in var(--motion-med) ease-out;
}
@keyframes wizard-in {
  from { opacity: 0; transform: translateY(8px); }
}

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
  font-family: var(--font-display);
  font-size: 1.65rem;
  font-weight: 500;
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
.steps-compact {
  display: none;
  font-size: 0.82rem;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.04em;
  color: var(--accent);
}
@media (max-width: 560px) {
  .steps { display: none; }
  .steps-compact { display: block; }
}
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
/* Narrow screens: the container padding (especially with the nested MissionCard in the Mission
   step) wastes a lot of the limited width — tighten it and the inter-card gap. */
@media (max-width: 560px) {
  .players { gap: 0.55rem; }
  .player-card,
  .settings { padding: 0.6rem; }
}
@media (max-width: 380px) {
  .player-card,
  .settings { padding: 0.5rem; }
}
/* Step 4 (Deployment): stack the options vertically, each on its own line. */
.deploy-opts {
  flex-direction: column;
  align-items: stretch;
  gap: 0.9rem;
}
.layout-block {
  display: block;
}
.block-head {
  font-family: var(--font-display);
  font-size: 1.21rem;
  font-weight: 500;
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
  font-family: var(--font-display);
  font-size: 1.21rem;
  font-weight: 500;
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
/* iOS auto-zooms when a focused input's font is < 16px — bump to 16px on
   touch devices only, leaving the desktop sizing untouched. */
@media (pointer: coarse) {
  .field input[type="text"],
  .field select {
    font-size: 16px;
  }
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
  align-items: flex-start;
  margin-bottom: 1rem;
}
.battle-size .seg { flex-wrap: wrap; justify-content: flex-start; }
/* 3 battle sizes (Incursion/Strike Force/Onslaught) is one too many for the flex-wrap
   pill row on narrow phones: each button keeps its own (very different) content width,
   so they stack one-per-line, left-aligned, with a large empty gap on every row — reads
   as broken rather than just narrow. A 3-column grid of equal-width tiles uses the width
   evenly instead — compact, not square (an aspect-ratio: 1 tile reads as too tall for a
   single form field); the smaller phones get a second, tighter font-size step since
   "Strike Force · 2000 · 3DP" wrapped onto two lines is still tight at 0.82rem. */
@media (max-width: 560px) {
  .battle-size .seg {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    width: 100%;
  }
  .battle-size .seg button {
    padding: 0.4rem 0.3rem;
    text-align: center;
    white-space: normal;
    line-height: 1.25;
  }
  .battle-size .seg button + button { border-left: 1px solid var(--border); }
}
@media (max-width: 380px) {
  .battle-size .seg button { font-size: 0.72rem; }
}

.btn-choose-twist {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 0.6rem;
  width: 100%;
  min-height: 44px;
  padding: 0.6rem 0.85rem;
  border: 1px solid var(--border);
  border-radius: 6px;
  background: var(--bg-secondary);
  color: var(--text-primary);
  cursor: pointer;
  font-size: 0.9rem;
  font-weight: 600;
  transition: border-color 0.15s;
}
.btn-choose-twist:hover { border-color: var(--accent); }
.ct-name.placeholder { color: var(--text-muted); font-weight: 500; }
.ct-chev { color: var(--text-dim); }
.twist-chosen {
  margin-top: 0.6rem;
  border: 1px solid var(--border);
  border-radius: 6px;
  background: var(--bg-card);
}
.twist-chosen > summary {
  cursor: pointer;
  padding: 0.5rem 0.7rem;
  font-size: 0.78rem;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.04em;
  color: var(--text-muted);
}
.twist-chosen-body { padding: 0 0.7rem 0.6rem; font-size: 0.86rem; line-height: 1.5; }
.twist-mission { margin-top: 0.8rem; }
.help-btn {
  background: none;
  border: none;
  color: var(--text-dim);
  cursor: pointer;
  padding: 0 0.2rem;
  font-size: 0.9rem;
  line-height: 1;
  vertical-align: middle;
}
.help-btn:hover { color: var(--accent); }
.det-empty { font-size: 0.82rem; color: var(--text-dim); font-style: italic; margin: 0.25rem 0 0; }
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
.primary-card { margin-top: 0.7rem; }

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
  font-family: var(--font-display);
  font-size: 1.04rem;
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
