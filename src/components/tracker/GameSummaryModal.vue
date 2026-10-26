<template>
  <BaseModal
    :title="labels.trackerViewGame"
    :subtitle="formatDate(game.finishedAt || game.createdAt)"
    max-height="88dvh"
    @close="$emit('close')"
  >
    <div class="modal-body">
      <p
        v-if="endReasonLabel"
        class="gs-reason"
      >
        {{ endReasonLabel }}
      </p>
      <GameRosterLinks :game="game" />
      <ScoreBoard
        :game="game"
        :finished="true"
      />
      <ScoreBreakdown :game="game" />
      <ArmyRuleSummary :game="game" />
    </div>

    <footer class="modal-foot">
      <!-- A game from the new tracker's beta is read here, not played on (trackerGen.js): the
           button stays, dimmed, with the reason under it. -->
      <p
        v-if="!resumable"
        class="gs-why"
      >
        {{ labels.trackerResumeOtherGen }}
      </p>
      <button
        class="gs-resume"
        data-press
        :disabled="!resumable"
        @click="$emit('resume', game.id)"
      >
        {{ labels.trackerResume }}
      </button>
    </footer>
  </BaseModal>
</template>

<script setup>
import { endReasonFor } from '../../core/game/gameScoring.js'
import { computed } from 'vue'
import BaseModal from '../BaseModal.vue'
import GameRosterLinks from './GameRosterLinks.vue'
import ScoreBoard from './ScoreBoard.vue'
import ScoreBreakdown from './ScoreBreakdown.vue'
import ArmyRuleSummary from './ArmyRuleSummary.vue'
import { ui } from '../../i18n/ui.js'
import { useLocale } from '../../composables/useLocale.js'
import { useFormatDate } from '../../composables/useFormatDate.js'
import { playableHere } from '../../core/game/trackerGen.js'

const props = defineProps({
  game: { type: Object, required: true },
})
defineEmits(['resume', 'close'])
const { locale } = useLocale()
const labels = computed(() => ui[locale.value])
const { formatDate } = useFormatDate()
const resumable = computed(() => playableHere(props.game))

const END_REASON_LABELS = {
  'friendly-concede': 'trackerEndFriendlyConcede',
  'opponent-concede': 'trackerEndOpponentConcede',
}
const endReasonLabel = computed(() => {
  const key = END_REASON_LABELS[endReasonFor(props.game)]
  return key ? labels.value[key] : ''
})
</script>

<style scoped>
/* The heading here is two lines deep, so the close button rides at the top of it rather than
   centred against the whole block. */
.gs-reason { text-align: center; font-size: 0.85rem; color: var(--text-muted); margin: 0 0 0.75rem; }

.modal-foot { padding: 0.7rem 0.9rem; border-top: 1px solid var(--border); }
.gs-resume {
  width: 100%;
  min-height: 46px;
  padding: 0.7rem 1rem;
  background: var(--accent);
  color: #fff;
  border: none;
  font-weight: 700;
  font-size: 0.95rem;
  cursor: pointer;
}
.gs-resume:not(:disabled):hover { background: var(--accent-hover); }
.gs-resume:disabled { opacity: 0.5; cursor: default; }
.gs-why { margin: 0 0 0.5rem; font-size: 0.8rem; color: var(--text-muted); text-align: center; }
</style>
