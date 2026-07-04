<template>
  <BaseModal :title="title" @close="$emit('close')">
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
          <CollapseTransition :show="openId === m.slug">
            <div class="tp-body">
              <MissionCard :mission="m" :show-lore="false" />
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
</script>

<style scoped>
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
.tp-pick:hover { background: color-mix(in srgb, var(--accent) 10%, transparent); }
.tp-pick.on { background: var(--accent); color: var(--text-on-accent); }

.tp-body { padding: 0.2rem 0.6rem 0.7rem; border-top: 1px solid var(--border); }
</style>
