<template>
  <div class="modal-overlay" @click.self="$emit('close')">
    <div class="modal" role="dialog" aria-modal="true">
      <header class="modal-head">
        <div class="mh-text">
          <h3 class="mh-title">{{ labels.trackerViewGame }}</h3>
          <p class="mh-sub">{{ formatDate(game.finishedAt || game.createdAt) }}</p>
        </div>
        <button class="mh-close" @click="$emit('close')" aria-label="Close">✕</button>
      </header>

      <div class="modal-body">
        <p v-if="endReasonLabel" class="gs-reason">{{ endReasonLabel }}</p>
        <ScoreBoard :game="game" :finished="true" />
        <ScoreBreakdown :game="game" />
      </div>

      <footer class="modal-foot">
        <button class="gs-resume" @click="$emit('resume', game.id)">{{ labels.trackerResume }}</button>
      </footer>
    </div>
  </div>
</template>

<script setup>
import { computed, onMounted, onUnmounted } from 'vue'
import ScoreBoard from './ScoreBoard.vue'
import ScoreBreakdown from './ScoreBreakdown.vue'
import { ui } from '../../i18n/ui.js'
import { useLocale } from '../../composables/useLocale.js'

const props = defineProps({
  game: { type: Object, required: true },
})
const emit = defineEmits(['resume', 'close'])
const { locale } = useLocale()
const labels = computed(() => ui[locale.value])

const END_REASON_LABELS = {
  'friendly-concede': 'trackerEndFriendlyConcede',
  'opponent-concede': 'trackerEndOpponentConcede',
}
const endReasonLabel = computed(() => {
  const key = END_REASON_LABELS[props.game?.endReason]
  return key ? labels.value[key] : ''
})

function formatDate(iso) {
  try { return new Date(iso).toLocaleDateString(locale.value === 'ru' ? 'ru-RU' : 'en-GB') } catch { return '' }
}

function onKey(e) { if (e.key === 'Escape') emit('close') }
onMounted(() => window.addEventListener('keydown', onKey))
onUnmounted(() => window.removeEventListener('keydown', onKey))
</script>

<style scoped>
.modal-overlay {
  position: fixed;
  inset: 0;
  z-index: 400;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 1rem;
}
.modal {
  width: 100%;
  max-width: 520px;
  max-height: 88vh;
  display: flex;
  flex-direction: column;
  background: var(--bg-card);
  border: 1px solid var(--border);
  border-radius: 8px;
  box-shadow: 0 12px 40px rgba(0, 0, 0, 0.35);
  overflow: hidden;
}
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

@media (max-width: 560px) {
  .modal-overlay { padding: 0; align-items: flex-end; }
  .modal { max-width: 100%; max-height: 92vh; border-radius: 12px 12px 0 0; }
}
</style>
