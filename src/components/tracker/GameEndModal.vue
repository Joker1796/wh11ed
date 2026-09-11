<template>
  <BaseModal :title="labels.trackerEndTitle" max-width="460px" @close="$emit('close')">
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
  </BaseModal>
</template>

<script setup>
import { ref, computed } from 'vue'
import BaseModal from '../BaseModal.vue'
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
</script>

<style scoped>

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
  font-weight: 700;
  font-size: 0.95rem;
  cursor: pointer;
}
.ge-end:hover { background: var(--accent-hover); }
</style>
