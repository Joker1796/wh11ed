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
.modal-head {
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  gap: 0.5rem;
  padding: 0.8rem 0.9rem;
  border-bottom: 1px solid var(--border);
}
.mh-title { font-family: var(--font-serif); font-size: 1.15rem; font-weight: 700; color: var(--text-primary); margin: 0; }
.mh-sub { font-size: 0.76rem; color: var(--text-muted); margin: 0.1rem 0 0; }
.mh-close {
  background: none; border: none; color: var(--text-muted);
  font-size: 1.1rem; cursor: pointer; min-width: 36px; min-height: 36px; border-radius: 4px;
}
.mh-close:hover { background: color-mix(in srgb, var(--text-primary) 8%, transparent); color: var(--text-primary); }
.modal-body { padding: 0.8rem 0.9rem; overflow-y: auto; }
.gs-reason { text-align: center; font-size: 0.85rem; color: var(--text-muted); margin: 0 0 0.75rem; }

.modal-foot { padding: 0.7rem 0.9rem; border-top: 1px solid var(--border); }
.gs-resume {
  width: 100%;
  min-height: 46px;
  padding: 0.7rem 1rem;
  background: var(--accent);
  color: #fff;
  border: none;
  border-radius: 6px;
  font-weight: 700;
  font-size: 0.95rem;
  cursor: pointer;
}
.gs-resume:hover { background: var(--accent-hover); }
</style>
