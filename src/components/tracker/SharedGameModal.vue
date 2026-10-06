<template>
  <BaseModal
    :title="labels.lobbyChoiceTitle"
    max-width="26rem"
    @close="$emit('close')"
  >
    <div class="modal-body sg-body">
      <template v-if="!creating">
        <p class="sg-hint">
          {{ labels.lobbyChoiceHint }}
        </p>

        <div class="act-list">
          <!-- Creating needs an account; joining does not, which is the whole reason these two
               sit behind one button instead of being two of equal weight on the tracker home. -->
          <button
            type="button"
            class="act-btn sg-act"
            :disabled="!canShare"
            @click="creating = true"
          >
            <span class="sg-act-name">{{ labels.lobbyChoiceCreate }}</span>
            <span class="sg-act-sub">{{ canShare ? labels.lobbyChoiceCreateHint : labels.partySignIn }}</span>
          </button>
          <RouterLink
            to="/tracker/join"
            class="act-btn sg-act"
            @click="$emit('close')"
          >
            <span class="sg-act-name">{{ labels.lobbyChoiceJoin }}</span>
            <span class="sg-act-sub">{{ labels.lobbyChoiceJoinHint }}</span>
          </RouterLink>
        </div>
      </template>

      <!-- The game type is chosen HERE, before the lobby exists: a seat means "a side" in singles
           and "one member of a team" in doubles, so the type is locked the moment the code is out
           (GameSetup's modeLocked). Until 2026-10-05 the lobby always opened as singles and a
           shared doubles game could not be made at all — a player asked on VK how to add people. -->
      <template v-else>
        <!-- The host's own name first, always (owner, 2026-10-05): it is what every joining phone
             reads on the host's seat, and an unnamed seat is the one nobody can tell apart. -->
        <label class="sg-field">
          <span class="sg-label">{{ labels.trackerYourName }}</span>
          <input
            v-model="hostName"
            type="text"
            :placeholder="labels.trackerYourName"
          >
        </label>
        <span class="sg-label">{{ labels.trackerGameType }}</span>
        <div
          class="seg sg-seg"
          role="radiogroup"
        >
          <button
            v-for="m in MODES"
            :key="m.id"
            type="button"
            role="radio"
            :aria-checked="mode === m.id"
            :class="{ on: mode === m.id }"
            @click="mode = m.id"
          >
            {{ labels[m.label] }}
          </button>
        </div>
        <!-- Doubles: the teams are named here, before anyone joins, so the seat list a joining
             phone sees says which team each seat belongs to. Both names are required (owner,
             2026-10-05): two anonymous halves are exactly what a joining player cannot tell apart. -->
        <ExpandTransition>
          <div
            v-if="mode === 'doubles'"
            class="sg-teams"
          >
            <span class="sg-label">{{ labels.lobbyTeamNames }}</span>
            <input
              v-model="teams[0]"
              type="text"
              :placeholder="labels.lobbyTeamYours"
              :aria-label="labels.lobbyTeamYours"
            >
            <input
              v-model="teams[1]"
              type="text"
              :placeholder="labels.lobbyTeamTheirs"
              :aria-label="labels.lobbyTeamTheirs"
            >
          </div>
        </ExpandTransition>
        <div class="sg-actions">
          <button
            type="button"
            class="btn-ghost"
            @click="creating = false"
          >
            {{ labels.trackerBack }}
          </button>
          <button
            type="button"
            class="btn-primary"
            :disabled="!canStart"
            @click="onStart"
          >
            {{ labels.lobbyStart }}
          </button>
        </div>
      </template>
    </div>
  </BaseModal>
</template>

<script setup>
import { computed, ref, reactive } from 'vue'
import ExpandTransition from '../ExpandTransition.vue'
import BaseModal from '../BaseModal.vue'
import { ui } from '../../i18n/ui.js'
import { useLocale } from '../../composables/useLocale.js'
import { useParty } from '../../composables/useParty.js'

// The two ways into a shared game, behind one button. They were two entries side by side on the
// tracker home and that was wrong in two ways: it made "join someone else's table" look as
// routine as starting your own, and it left three equal-looking links under the primary button.
// Here they are what they actually are — one subject, two directions.

const { locale } = useLocale()
const labels = computed(() => ui[locale.value])
const { canShare } = useParty()

// The same three modes as the setup's own "Game type" row (GameSetup's setGameMode).
const MODES = [
  { id: 'singles', label: 'trackerGameTypeSingles' },
  { id: 'doubles', label: 'trackerGameTypeDoubles' },
  { id: 'combatPatrol', label: 'trackerGameTypeCombatPatrol' },
]
const creating = ref(false)
const mode = ref('singles')
const teams = reactive(['', ''])

const emit = defineEmits(['create', 'close'])
const hostName = ref('')
const canStart = computed(() => !!hostName.value.trim() && (mode.value !== 'doubles' || teams.every((t) => t.trim())))
function onStart() {
  if (!canStart.value) return
  emit('create', {
    mode: mode.value,
    name: hostName.value.trim(),
    teams: mode.value === 'doubles' ? teams.map((t) => t.trim()) : ['', ''],
  })
}
</script>

<style scoped>
.sg-body { padding: 1rem; }
.sg-hint {
  margin: 0 0 0.9rem;
  font-size: 0.85rem;
  line-height: 1.45;
  color: var(--text-muted);
}
/* Two lines per choice: what it does, and the one fact that decides between them (an account,
   a code from the host). A subtitle that stays on the button is what keeps the dialog to two
   taps instead of a paragraph above them. */
.sg-act {
  display: flex;
  flex-direction: column;
  gap: 0.2rem;
  text-decoration: none;
}
.sg-act-name { font-size: 0.95rem; }
.sg-act-sub {
  font-size: 0.78rem;
  font-weight: 400;
  color: var(--text-muted);
}
.sg-label {
  display: block;
  margin-bottom: 0.35rem;
  font-size: 0.78rem;
  color: var(--text-muted);
}
/* Three equal parts that may wrap their label to a second line on a 320px phone rather than
   push the row past the dialog. */
.sg-seg { display: flex; width: 100%; }
.sg-seg button { flex: 1 1 0; min-width: 0; text-align: center; }
.sg-field { display: block; margin-bottom: 0.9rem; }
.sg-field input,
.sg-teams input {
  width: 100%;
  padding: 0.5rem 0.6rem;
  border: 1px solid var(--border);
  background: var(--bg-secondary);
  color: var(--text-primary);
  /* 16px: iOS zooms the page into a focused field set any smaller. */
  font-family: inherit;
  font-size: 1rem;
}
.sg-teams {
  display: grid;
  gap: 0.4rem;
  margin-top: 0.9rem;
}
.sg-teams .sg-label { margin-bottom: 0; }
.sg-actions {
  display: flex;
  justify-content: flex-end;
  gap: 0.5rem;
  margin-top: 1rem;
}
.sg-act:disabled { opacity: 0.55; cursor: not-allowed; }
@media (hover: hover) {
  a.sg-act:hover { border-color: var(--accent); }
}
</style>
