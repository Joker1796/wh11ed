<template>
  <BaseModal :title="labels.trackerEditSetupTitle" max-width="560px" @close="$emit('close')">
    <div class="modal-body">
      <p class="es-note">{{ labels.trackerEditSetupNote }}</p>

      <div class="players">
        <div v-for="(p, i) in players" :key="i" class="player-card">
          <h3 class="player-head">{{ playerLabel(i) }}</h3>
          <label class="field">
            <input v-model="p.name" type="text" :placeholder="namePlaceholder(i)" />
          </label>
          <label class="check" :class="{ on: p.battleReady }">
            <input type="checkbox" v-model="p.battleReady" />
            <span>{{ labels.trackerBattleReady }} (+10 VP)</span>
          </label>

          <!-- Attaching a list AFTER the game started. The wizard is the other (and usual) place
               to do this; without it here, a player who built a list but forgot to pick it — or
               whose game predates the feature — had no way back. Unlike the wizard, the list does
               not decide the army here: the faction is already being played. -->
          <div class="es-roster">
            <div v-if="p.roster" class="roster-line">
              <span class="rl-text">{{ p.roster.name || labels.rosterUntitled }}</span>
              <button
                type="button"
                class="rl-clear"
                :aria-label="labels.trackerRosterDetach"
                :title="labels.trackerRosterDetach"
                @click="clearRoster(p)"
              >✕</button>
            </div>
            <button v-else type="button" class="rp-open" @click="rosterPickerIdx = i">
              <i class="bi bi-card-list"></i>
              <span>{{ labels.trackerRosterAttach }}</span>
            </button>
            <!-- The one thing attaching can't fix, so it has to be said rather than silently
                 tolerated: the list is played under a different detachment than the game is. -->
            <p v-if="detMismatch(p)" class="rl-warn">{{ labels.trackerRosterDetMismatch }}</p>
          </div>

          <RosterPickerModal
            v-if="rosterPickerIdx === i"
            :selected="p.roster ? (p.rosterId || '') : null"
            :faction="p.factionSlug"
            @pick="r => pickRoster(p, r)"
            @clear="clearRoster(p)"
            @close="rosterPickerIdx = -1"
          />
        </div>
      </div>

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

        <label v-if="armyYouTrackable" class="check" :class="{ on: settings.trackArmyYou }">
          <input type="checkbox" v-model="settings.trackArmyYou" />
          <span>{{ labels.trackerTrackArmyYou }}</span>
        </label>

        <label v-if="armyOppTrackable" class="check" :class="{ on: settings.trackArmyOpp }">
          <input type="checkbox" v-model="settings.trackArmyOpp" />
          <span>{{ labels.trackerTrackArmyOpp }}</span>
        </label>

        <!-- Reads the DRAFT's rosters, not the game's: a list attached in this very dialog should
             make the setting available before Save, and it is the only way a game that started
             without a list can ever get phases. -->
        <label v-if="anyRoster" class="check" :class="{ on: settings.trackPhases }">
          <input type="checkbox" v-model="settings.trackPhases" />
          <span>{{ labels.trackerTrackPhases }}</span>
        </label>
      </div>

      <div class="settings layout-block" v-if="layouts.length">
        <h3 class="block-head">{{ labels.trackerLayoutHeading }}</h3>
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
      </div>
    </div>

    <footer class="modal-foot">
      <button class="btn-ghost" @click="$emit('close')">{{ labels.trackerCancel }}</button>
      <button class="btn-primary" @click="save">{{ labels.trackerSave }}</button>
    </footer>

    <ScoreHelpModal v-if="scoreHelpOpen" @close="scoreHelpOpen = false" />
    <LayoutPickerModal
      v-if="layoutPickerOpen"
      :selected="settings.layout === 'custom' ? settings.customLayout : null"
      @pick="onPickLayout"
      @close="layoutPickerOpen = false"
    />
  </BaseModal>
</template>

<script setup>
import { reactive, computed, ref } from 'vue'
import BaseModal from '../BaseModal.vue'
import LayoutCard from '../event/LayoutCard.vue'
import ScoreHelpModal from './ScoreHelpModal.vue'
import LayoutPickerModal from './LayoutPickerModal.vue'
import RosterPickerModal from './RosterPickerModal.vue'
import { ui } from '../../i18n/ui.js'
import { useLocale } from '../../composables/useLocale.js'
import { eventCompanion } from '../../data/eventCompanion.js'
import { useTracker } from '../../composables/useTracker.js'
import { resolveLayout } from '../../composables/trackerLayout.js'
import { rosterSnapshot } from '../../composables/rosterGameLink.js'

const emit = defineEmits(['close'])
const { locale } = useLocale()
const labels = computed(() => ui[locale.value])
const { current, updateSetup } = useTracker()
const game = current.value

// Local draft — only committed to the store on Save, so Cancel discards edits cleanly.
const players = reactive(game.players.map(p => ({
  name: p.name,
  battleReady: p.battleReady,
  // The army half of the draft. `factionSlug`/`detachments` ride along read-only in the normal
  // case — they're here so attaching can fill one that was never set, and so the mismatch
  // warning has something to compare against.
  rosterId: p.rosterId || null,
  roster: p.roster || null,
  factionSlug: p.factionSlug || null,
  detachments: [...(p.detachments || [])],
})))
const settings = reactive({
  trackCP: game.settings.trackCP,
  // Older games predate the clock → off.
  trackPhases: game.settings.trackPhases ?? false,
  // Split you/opponent army-rule toggles; older games lack them → fall back to the old single flag,
  // then default on (matches the in-game "missing = on" fallback).
  trackArmyYou: game.settings.trackArmyYou ?? game.settings.trackArmyRule ?? true,
  trackArmyOpp: game.settings.trackArmyOpp ?? game.settings.trackArmyRule ?? true,
  // game.settings.firstTurn is always normalized to 1 post-creation (see newGame) — the
  // actual "who's first" lives in player order, so derive the toggle from that instead.
  firstTurn: (game.players[0].isYou ?? true) ? 1 : 2,
  scoreMode: game.settings.scoreMode,
  layout: game.settings.layout,
  customLayout: game.settings.customLayout,
})

const anyRoster = computed(() => players.some((p) => !!p.roster))

function isYou(i) { return game.players[i].isYou ?? i === 0 }
function playerLabel(i) { return isYou(i) ? labels.value.trackerYou : labels.value.trackerOpponent }
function namePlaceholder(i) { return isYou(i) ? labels.value.trackerYourName : labels.value.trackerOpponentName }

// Dispositions are fixed for the rest of the game, so the recommended-layout matchup
// (same lookup as GameSetup step 3) can't change here — only the A/B/C/custom pick can.
const matchups = eventCompanion.en.matchups
const matchup = computed(() => {
  const you = game.players[0].disposition, opp = game.players[1].disposition
  if (!you || !opp) return null
  return matchups.find(m => (m.a === you && m.b === opp) || (m.a === opp && m.b === you)) || null
})
const layouts = computed(() => matchup.value?.layouts ?? [])
const currentLayout = computed(() => resolveLayout(settings, game.players[0].disposition, game.players[1].disposition))
const layoutPickerOpen = ref(false)
function selectLayout(id) { settings.layout = id; settings.customLayout = null }
function onPickLayout(l) { settings.layout = 'custom'; settings.customLayout = l; layoutPickerOpen.value = false }

const scoreHelpOpen = ref(false)

// ── Attaching an army list to a game already under way ──
const rosterPickerIdx = ref(-1)

// The wizard's pickRoster lets the list DICTATE the faction and the detachments (see GameSetup).
// Here it may only fill in what is still blank: the faction of a game saved before one was
// mandatory, and detachments not yet chosen. Anything already standing stays — the game has been
// played under it, and rewriting it would silently change which stratagems and how much DP the
// player has had all along. A disagreement is reported instead (detMismatch).
function pickRoster(p, roster) {
  p.rosterId = roster.id || null
  p.roster = rosterSnapshot(roster)
  rosterPickerIdx.value = -1
  if (!p.factionSlug && roster.faction) p.factionSlug = roster.faction
  if (!p.detachments.length && roster.detachments?.length) p.detachments = [...roster.detachments]
}

// Detaching leaves the faction and detachments alone — same reasoning as the wizard's, and here
// they may have been what the game was played under for four rounds.
function clearRoster(p) {
  p.rosterId = null
  p.roster = null
  rosterPickerIdx.value = -1
}

// Order doesn't matter (a detachment list is a set of picks), and an empty side isn't a
// disagreement — it's the case pickRoster just filled in.
function detMismatch(p) {
  const a = p.detachments || []
  const b = p.roster?.detachments || []
  if (!a.length || !b.length) return false
  return a.length !== b.length || a.some(d => !b.includes(d))
}

// Show each "Track army rule" toggle only if that player's faction has a tracker spec (factions are
// fixed once a game starts, so resolve once). Mapped by isYou, since players are reordered by first
// turn. Same lazy registry import as the in-game card.
const armyYouTrackable = ref(false)
const armyOppTrackable = ref(false)
;(async () => {
  const { resolveArmyTracker } = await import('../../data/armyTrackers/index.js')
  const you = game.players.find(p => p.isYou) ?? game.players[0]
  const opp = game.players.find(p => !p.isYou) ?? game.players[1]
  armyYouTrackable.value = !!(you?.factionSlug && resolveArmyTracker(you.factionSlug))
  armyOppTrackable.value = !!(opp?.factionSlug && resolveArmyTracker(opp.factionSlug))
})()

function save() {
  updateSetup({
    settings: { ...settings },
    players: players.map(p => ({
      name: p.name, battleReady: p.battleReady,
      rosterId: p.rosterId, roster: p.roster,
      factionSlug: p.factionSlug, detachments: p.detachments,
    })),
  })
  emit('close')
}
</script>

<style scoped>
.modal-body { padding: 0.9rem; overflow-y: auto; }
.es-note {
  margin: 0 0 0.9rem;
  padding: 0.6rem 0.7rem;
  background: var(--bg-secondary);
  border-radius: 6px;
  font-size: 0.8rem;
  color: var(--text-muted);
  line-height: 1.45;
}
.players {
  display: grid;
  /* minmax(0, …) so a long roster name can't widen the card — see GameSetup.vue's .players. */
  grid-template-columns: minmax(0, 1fr) minmax(0, 1fr);
  gap: 1rem;
  margin-bottom: 1rem;
}
.player-card, .settings {
  background: var(--bg-card);
  border: 1px solid var(--border);
  border-radius: 6px;
  padding: 1rem;
}
.settings {
  margin-bottom: 1rem;
  display: flex;
  flex-direction: column;
  align-items: stretch;
  gap: 0.9rem;
}
/* The list row, built to the same recipe as the wizard's (GameSetup's .roster-line/.rp-open) —
   it is the same action in the other place you can take it. */
.es-roster { margin-top: 0.75rem; }
.roster-line {
  display: flex; align-items: center; gap: 0.35rem;
  padding: 0.45rem 0.55rem;
  border: 1px solid var(--accent); border-radius: 5px; background: var(--bg-card);
}
.rl-text {
  flex: 1; min-width: 0;
  overflow: hidden; text-overflow: ellipsis; white-space: nowrap;
  font-size: 0.82rem; color: var(--text-primary);
}
.rl-clear {
  background: none; border: none; color: var(--text-muted);
  font-size: 0.9rem; line-height: 1; cursor: pointer; padding: 0.15rem 0.25rem;
}
.rl-clear:hover { color: var(--accent); }
.rp-open {
  display: flex; align-items: center; gap: 0.4rem; width: 100%;
  padding: 0.45rem 0.55rem;
  border: 1px dashed var(--border); border-radius: 5px; background: none;
  color: var(--text-muted); font-size: 0.82rem; font-family: inherit; text-align: left; cursor: pointer;
}
.rp-open:hover { border-color: var(--accent); color: var(--text-primary); }
.rl-warn {
  margin: 0.4rem 0 0;
  font-size: 0.75rem; line-height: 1.4; color: var(--text-muted);
  border-left: 2px solid var(--accent); padding-left: 0.5rem;
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
.field input[type="text"] {
  padding: 0.5rem 0.6rem;
  border: 1px solid var(--border);
  border-radius: 4px;
  background: var(--bg-secondary);
  color: var(--text-primary);
  font-size: 0.9rem;
  font-family: var(--font-sans);
}
@media (pointer: coarse) {
  .field input[type="text"] { font-size: 16px; }
}
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
.seg button + button { border-left: 1px solid var(--border); }
.seg button.on { background: var(--accent); color: #fff; }
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
.block-head {
  font-family: var(--font-display);
  font-size: 1.21rem;
  font-weight: 500;
  color: var(--accent);
  margin: 0 0 0.6rem;
}
.tabs { display: flex; gap: 0.4rem; margin-bottom: 1rem; }
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
.tab.active { background: var(--accent); color: var(--text-on-accent); border-color: var(--accent); }

.modal-foot {
  display: flex;
  justify-content: flex-end;
  gap: 0.6rem;
  padding: 0.7rem 0.9rem;
  border-top: 1px solid var(--border);
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
  .players { grid-template-columns: minmax(0, 1fr); }
  .tab-word { display: none; }
  .tab { min-width: 44px; min-height: 44px; }
}
</style>
