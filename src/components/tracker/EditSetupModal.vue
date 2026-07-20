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
import { ui } from '../../i18n/ui.js'
import { useLocale } from '../../composables/useLocale.js'
import { eventCompanion } from '../../data/eventCompanion.js'
import { useTracker } from '../../composables/useTracker.js'
import { resolveLayout } from '../../composables/trackerLayout.js'

const emit = defineEmits(['close'])
const { locale } = useLocale()
const labels = computed(() => ui[locale.value])
const { current, updateSetup } = useTracker()
const game = current.value

// Local draft — only committed to the store on Save, so Cancel discards edits cleanly.
const players = reactive(game.players.map(p => ({ name: p.name, battleReady: p.battleReady })))
const settings = reactive({
  trackCP: game.settings.trackCP,
  firstTurn: game.settings.firstTurn,
  scoreMode: game.settings.scoreMode,
  layout: game.settings.layout,
  customLayout: game.settings.customLayout,
})

function playerLabel(i) { return i === 0 ? labels.value.trackerYou : labels.value.trackerOpponent }
function namePlaceholder(i) { return i === 0 ? labels.value.trackerYourName : labels.value.trackerOpponentName }

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

function save() {
  updateSetup({
    settings: { ...settings },
    players: players.map(p => ({ name: p.name, battleReady: p.battleReady })),
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
  grid-template-columns: 1fr 1fr;
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
  .players { grid-template-columns: 1fr; }
  .tab-word { display: none; }
  .tab { min-width: 44px; min-height: 44px; }
}
</style>
