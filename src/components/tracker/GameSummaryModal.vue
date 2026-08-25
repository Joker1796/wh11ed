<template>
  <BaseModal max-height="88vh" @close="$emit('close')">
      <template #header>
        <header class="modal-head">
          <div class="mh-text">
            <h3 class="mh-title">{{ labels.trackerViewGame }}</h3>
            <p class="mh-sub">{{ formatDate(game.finishedAt || game.createdAt) }}</p>
          </div>
          <button class="mh-close" @click="$emit('close')" :aria-label="labels.modalClose">✕</button>
        </header>
      </template>

      <div class="modal-body">
        <p v-if="endReasonLabel" class="gs-reason">{{ endReasonLabel }}</p>
        <ScoreBoard :game="game" :finished="true" />
        <ScoreBreakdown :game="game" />
        <ArmyRuleSummary :game="game" />
      </div>

      <footer class="modal-foot">
        <button class="gs-resume" @click="$emit('resume', game.id)">{{ labels.trackerResume }}</button>
      </footer>
  </BaseModal>
</template>

<script setup>
import { computed } from 'vue'
import BaseModal from '../BaseModal.vue'
import ScoreBoard from './ScoreBoard.vue'
import ScoreBreakdown from './ScoreBreakdown.vue'
import ArmyRuleSummary from './ArmyRuleSummary.vue'
import { ui } from '../../i18n/ui.js'
import { useLocale } from '../../composables/useLocale.js'
import { useFormatDate } from '../../composables/useFormatDate.js'

const props = defineProps({
  game: { type: Object, required: true },
})
defineEmits(['resume', 'close'])
const { locale } = useLocale()
const labels = computed(() => ui[locale.value])
const { formatDate } = useFormatDate()

const END_REASON_LABELS = {
  'friendly-concede': 'trackerEndFriendlyConcede',
  'opponent-concede': 'trackerEndOpponentConcede',
}
const endReasonLabel = computed(() => {
  const key = END_REASON_LABELS[props.game?.endReason]
  return key ? labels.value[key] : ''
})
</script>

<style scoped>
/* The heading here is two lines deep, so the close button rides at the top of it rather than
   centred against the whole block. */
.modal-head { align-items: flex-start; }
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
.gs-resume:hover { background: var(--accent-hover); }
</style>
