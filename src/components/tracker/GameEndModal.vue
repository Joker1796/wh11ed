<template>
  <div class="modal-overlay" @click.self="$emit('close')">
    <div class="modal" role="dialog" aria-modal="true">
      <header class="modal-head">
        <h3 class="mh-title">{{ labels.trackerEndTitle }}</h3>
        <button class="mh-close" @click="$emit('close')" aria-label="Close">✕</button>
      </header>

      <div class="modal-body">
        <label
          v-for="o in options"
          :key="o.id"
          class="ge-row"
          :class="{ on: reason === o.id }"
        >
          <span class="ge-text">{{ labels[o.label] }}</span>
          <input
            type="checkbox"
            class="ge-check"
            :checked="reason === o.id"
            @change="toggle(o.id)"
          />
        </label>

        <p class="ge-note">{{ labels.trackerEndNote }}</p>
      </div>

      <footer class="modal-foot">
        <button class="ge-end" @click="$emit('confirm', reason)">{{ labels.trackerEndBattle }}</button>
      </footer>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, onUnmounted } from 'vue'
import { ui } from '../../i18n/ui.js'
import { useLocale } from '../../composables/useLocale.js'

const emit = defineEmits(['confirm', 'close'])
const { locale } = useLocale()
const labels = computed(() => ui[locale.value])

const options = [
  { id: 'friendly-concede', label: 'trackerEndFriendlyConcede' },
  { id: 'opponent-concede', label: 'trackerEndOpponentConcede' },
]
// Single-select, but optional — clicking the chosen one again clears it.
const reason = ref(null)
function toggle(id) { reason.value = reason.value === id ? null : id }

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
  max-width: 460px;
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
.mh-title { font-family: var(--font-serif); font-size: 1.15rem; font-weight: 700; color: var(--text-primary); margin: 0; }
.mh-close {
  background: none; border: none; color: var(--text-muted);
  font-size: 1.1rem; cursor: pointer; min-width: 36px; min-height: 36px; border-radius: 4px;
}
.mh-close:hover { background: color-mix(in srgb, var(--text-primary) 8%, transparent); color: var(--text-primary); }
.modal-body { padding: 0.5rem 0.9rem 0.9rem; overflow-y: auto; }

.ge-row {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 0.75rem;
  min-height: 52px;
  padding: 0.5rem 0.2rem;
  border-bottom: 1px solid var(--border);
  cursor: pointer;
}
.ge-row:last-of-type { border-bottom: none; }
.ge-text { font-size: 0.95rem; color: var(--text-primary); }
.ge-row.on .ge-text { font-weight: 700; }
.ge-check { width: 22px; height: 22px; flex-shrink: 0; accent-color: var(--accent); cursor: pointer; }

.ge-note {
  margin: 0.6rem 0 0;
  padding: 0.6rem 0.7rem;
  background: var(--bg-secondary);
  border-radius: 6px;
  font-size: 0.8rem;
  color: var(--text-muted);
  line-height: 1.45;
}

.modal-foot { padding: 0.7rem 0.9rem; border-top: 1px solid var(--border); }
.ge-end {
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
.ge-end:hover { background: var(--accent-hover); }

@media (max-width: 560px) {
  .modal-overlay { padding: 0; align-items: flex-end; }
  .modal { max-width: 100%; max-height: 92vh; border-radius: 12px 12px 0 0; }
}
</style>
