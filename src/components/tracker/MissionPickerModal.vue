<template>
  <div class="modal-overlay" @click.self="$emit('close')">
    <div class="modal" role="dialog" aria-modal="true">
      <header class="modal-head">
        <h3 class="mh-title">{{ title }}</h3>
        <button class="mh-close" @click="$emit('close')" aria-label="Close">✕</button>
      </header>

      <div class="modal-body">
        <div v-if="randomLabel" class="tp-actions">
          <button class="tp-act" @click="$emit('random')">{{ randomLabel }}</button>
        </div>

        <div v-for="m in missions" :key="m.slug" class="tp-item" :class="{ on: selected === m.slug }">
          <div class="tp-row">
            <button class="tp-toggle" :aria-expanded="openId === m.slug" @click="toggleOpen(m.slug)">
              <span class="tp-name">{{ m.name }}</span>
              <i class="bi tp-chev" :class="openId === m.slug ? 'bi-chevron-up' : 'bi-chevron-down'"></i>
            </button>
            <button class="tp-pick" :class="{ on: selected === m.slug }" @click="$emit('pick', m.slug)">
              {{ selected === m.slug ? '✓ ' : '' }}{{ labels.trackerSelect }}
            </button>
          </div>
          <div v-show="openId === m.slug" class="tp-body">
            <MissionCard :mission="m" />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, onUnmounted } from 'vue'
import MissionCard from '../event/MissionCard.vue'
import { ui } from '../../i18n/ui.js'
import { useLocale } from '../../composables/useLocale.js'

const props = defineProps({
  title: { type: String, required: true },
  missions: { type: Array, required: true },   // localized full mission objects
  selected: { type: String, default: null },   // slug
  randomLabel: { type: String, default: '' },
})
const emit = defineEmits(['pick', 'random', 'close'])
const { locale } = useLocale()
const labels = computed(() => ui[locale.value])

// Accordion: at most one mission expanded at a time; start on the selected one.
const openId = ref(props.selected || null)
function toggleOpen(slug) { openId.value = openId.value === slug ? null : slug }

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
.modal-body { padding: 0.7rem 0.9rem 0.9rem; overflow-y: auto; }

.tp-actions { display: flex; gap: 0.5rem; margin-bottom: 0.8rem; }
.tp-act {
  flex: 1;
  min-height: 44px;
  padding: 0.5rem 0.7rem;
  border: 1px solid var(--border);
  border-radius: 6px;
  background: var(--bg-secondary);
  color: var(--text-primary);
  cursor: pointer;
  font-size: 0.86rem;
  font-weight: 600;
}
.tp-act:hover { border-color: var(--accent); }

.tp-item {
  border: 1px solid var(--border);
  border-radius: 6px;
  margin-bottom: 0.5rem;
  overflow: hidden;
  background: var(--bg-secondary);
}
.tp-item.on { border-color: var(--accent); }
.tp-row { display: flex; align-items: stretch; gap: 0.4rem; }
.tp-toggle {
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 0.5rem;
  min-height: 48px;
  padding: 0.5rem 0.75rem;
  background: none;
  border: none;
  cursor: pointer;
  text-align: left;
  font-family: var(--font-serif);
  font-size: 1rem;
  font-weight: 700;
  color: var(--text-primary);
}
.tp-chev { color: var(--text-dim); font-size: 0.9rem; }
.tp-pick {
  flex-shrink: 0;
  min-height: 48px;
  padding: 0 0.85rem;
  border: none;
  border-left: 1px solid var(--border);
  background: none;
  color: var(--accent);
  font-size: 0.82rem;
  font-weight: 700;
  cursor: pointer;
  white-space: nowrap;
}
.tp-pick:hover { background: color-mix(in srgb, var(--accent) 10%, transparent); }
.tp-pick.on { background: var(--accent); color: var(--text-on-accent); }

.tp-body { padding: 0.2rem 0.6rem 0.7rem; border-top: 1px solid var(--border); }

@media (max-width: 560px) {
  .modal-overlay { padding: 0; align-items: flex-end; }
  .modal { max-width: 100%; max-height: 92vh; border-radius: 12px 12px 0 0; }
}
</style>
