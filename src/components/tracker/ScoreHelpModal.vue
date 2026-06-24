<template>
  <div class="modal-overlay" @click.self="$emit('close')">
    <div class="modal" role="dialog" aria-modal="true">
      <header class="modal-head">
        <h3 class="mh-title">{{ labels.trackerScoreHelpTitle }}</h3>
        <button class="mh-close" @click="$emit('close')" aria-label="Close">✕</button>
      </header>

      <div class="modal-body">
        <p class="sh-text">{{ labels.trackerScoreHelpText }}</p>
        <table class="sh-table">
          <thead>
            <tr>
              <th>{{ labels.trackerScoreHelpDiff }}</th>
              <th>{{ labels.trackerScoreHelpWin }}</th>
              <th>{{ labels.trackerScoreHelpLose }}</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="b in BP_TABLE" :key="b.label">
              <td>{{ b.label }}</td>
              <td>{{ b.win }}</td>
              <td>{{ b.lose }}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed, onMounted, onUnmounted } from 'vue'
import { ui } from '../../i18n/ui.js'
import { useLocale } from '../../composables/useLocale.js'
import { BP_TABLE } from '../../composables/gameScoring.js'

const emit = defineEmits(['close'])
const { locale } = useLocale()
const labels = computed(() => ui[locale.value])

function onKey(e) { if (e.key === 'Escape') emit('close') }
onMounted(() => window.addEventListener('keydown', onKey))
onUnmounted(() => window.removeEventListener('keydown', onKey))
</script>

<style scoped>
.modal-overlay {
  position: fixed;
  inset: 0;
  z-index: 410;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 1rem;
}
.modal {
  width: 100%;
  max-width: 420px;
  max-height: 85vh;
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
  align-items: center;
  justify-content: space-between;
  gap: 0.5rem;
  padding: 0.8rem 0.9rem;
  border-bottom: 1px solid var(--border);
}
.mh-title { font-family: var(--font-serif); font-size: 1.1rem; font-weight: 700; color: var(--text-primary); margin: 0; }
.mh-close {
  background: none; border: none; color: var(--text-muted);
  font-size: 1.1rem; cursor: pointer; min-width: 36px; min-height: 36px; border-radius: 4px;
}
.mh-close:hover { background: color-mix(in srgb, var(--text-primary) 8%, transparent); color: var(--text-primary); }
.modal-body { padding: 0.8rem 0.9rem 0.9rem; overflow-y: auto; }

.sh-text { margin: 0 0 0.8rem; font-size: 0.85rem; line-height: 1.5; color: var(--text-muted); }
.sh-table { width: 100%; border-collapse: collapse; font-size: 0.84rem; }
.sh-table th {
  text-align: left;
  font-size: 0.68rem;
  text-transform: uppercase;
  letter-spacing: 0.03em;
  color: var(--text-dim);
  padding: 0.35rem 0.5rem;
  border-bottom: 1px solid var(--border);
}
.sh-table td {
  padding: 0.3rem 0.5rem;
  border-bottom: 1px solid var(--border);
  font-family: var(--font-mono);
  color: var(--text-muted);
}
.sh-table td:first-child { color: var(--text-primary); }

@media (max-width: 560px) {
  .modal-overlay { padding: 0; align-items: flex-end; }
  .modal { max-width: 100%; max-height: 92vh; border-radius: 12px 12px 0 0; }
}
</style>
