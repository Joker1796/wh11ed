<template>
  <BaseModal @close="$emit('close')">
      <template #header>
        <header class="modal-head">
          <h3 class="mh-title">{{ labels.trackerChooseFixed }}</h3>
          <div class="mh-right">
            <span class="mh-count" :class="{ full: selected.length >= max }">{{ selected.length }} / {{ max }}</span>
            <button class="mh-close" @click="$emit('close')" :aria-label="labels.modalClose">✕</button>
          </div>
        </header>
      </template>

      <div class="modal-body">
        <div v-for="m in missions" :key="m.slug" class="tp-item" :class="{ on: selected.includes(m.slug) }">
          <div class="tp-row">
            <button class="tp-toggle" :aria-expanded="openId === m.slug" @click="toggleOpen(m.slug)">
              <span class="tp-name">{{ m.name }}</span>
              <i class="bi tp-chev" :class="openId === m.slug ? 'bi-chevron-up' : 'bi-chevron-down'"></i>
            </button>
            <button
              class="tp-pick"
              :class="{ on: selected.includes(m.slug) }"
              :disabled="!selected.includes(m.slug) && selected.length >= max"
              @click="$emit('toggle', m.slug)"
            >{{ selected.includes(m.slug) ? '✓ ' : '' }}{{ labels.trackerSelect }}</button>
          </div>
          <CollapseTransition>
            <div v-show="openId === m.slug" class="tp-body">
              <MissionCard :mission="m" :subtitle="m.category" :show-lore="false" />
            </div>
          </CollapseTransition>
        </div>
      </div>
  </BaseModal>
</template>

<script setup>
import { ref, computed } from 'vue'
import BaseModal from '../BaseModal.vue'
import MissionCard from '../event/MissionCard.vue'
import CollapseTransition from '../CollapseTransition.vue'
import { ui } from '../../i18n/ui.js'
import { useLocale } from '../../composables/useLocale.js'

const props = defineProps({
  missions: { type: Array, required: true },   // localized full mission objects
  selected: { type: Array, required: true },   // slugs
  max: { type: Number, default: 2 },
})
const emit = defineEmits(['toggle', 'close'])
const { locale } = useLocale()
const labels = computed(() => ui[locale.value])

// Accordion: at most one mission expanded at a time.
const openId = ref(props.selected[0] || null)
function toggleOpen(slug) { openId.value = openId.value === slug ? null : slug }
</script>

<style scoped>
.modal-head {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 0.5rem;
  padding: 0.8rem 0.9rem;
  border-bottom: 1px solid var(--border);
}
.mh-title { font-family: var(--font-display); font-size: 1.49rem; font-weight: 500; color: var(--text-primary); margin: 0; }
.mh-right { display: flex; align-items: center; gap: 0.6rem; flex-shrink: 0; }
.mh-count { font-family: var(--font-mono); font-weight: 700; color: var(--text-muted); font-size: 0.9rem; }
.mh-count.full { color: var(--accent); }
.mh-close {
  background: none; border: none; color: var(--text-muted);
  font-size: 1.1rem; cursor: pointer; min-width: 36px; min-height: 36px; border-radius: 4px;
}
.mh-close:hover { background: color-mix(in srgb, var(--text-primary) 8%, transparent); color: var(--text-primary); }
.modal-body { padding: 0.7rem 0.9rem 0.9rem; overflow-y: auto; }

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
  font-family: var(--font-display);
  font-size: 1.10rem;
  font-weight: 500;
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
.tp-pick:hover:not(:disabled) { background: color-mix(in srgb, var(--accent) 10%, transparent); }
.tp-pick.on { background: var(--accent); color: var(--text-on-accent); }
.tp-pick:disabled { color: var(--text-dim); cursor: not-allowed; }

.tp-body { padding: 0.2rem 0.6rem 0.7rem; border-top: 1px solid var(--border); }
</style>
