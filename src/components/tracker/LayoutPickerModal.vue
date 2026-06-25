<template>
  <div class="modal-overlay" @click.self="$emit('close')">
    <div class="modal" role="dialog" aria-modal="true">
      <header class="modal-head">
        <h3 class="mh-title">{{ labels.trackerLayoutPickerTitle }}</h3>
        <button class="mh-close" @click="$emit('close')" aria-label="Close">✕</button>
      </header>

      <div class="modal-body">
        <MissionMatrix :dispositions="dispositions" :selected="sel" @select="sel = $event" />

        <div v-if="activeMatchup" class="lp-layouts">
          <h4 class="lp-matchup">{{ matchupLabel(activeMatchup) }}</h4>
          <div v-for="l in activeMatchup.layouts" :key="l.id" class="lp-layout" :class="{ on: isSelected(l) }">
            <LayoutCard :layout="l" />
            <button class="lp-pick" :class="{ on: isSelected(l) }" @click="pick(activeMatchup, l)">
              {{ isSelected(l) ? '✓ ' : '' }}{{ labels.trackerSelect }}
            </button>
          </div>
        </div>
        <p v-else class="lp-hint">{{ labels.trackerLayoutPickerHint }}</p>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, onUnmounted } from 'vue'
import MissionMatrix from '../event/MissionMatrix.vue'
import LayoutCard from '../event/LayoutCard.vue'
import { ui } from '../../i18n/ui.js'
import { useLocale } from '../../composables/useLocale.js'
import { eventCompanion } from '../../data/eventCompanion.js'
import { dispositionName } from '../../composables/useTracker.js'
import { matchupFor } from '../../composables/trackerLayout.js'

const props = defineProps({
  selected: { type: Object, default: null },   // the chosen custom layout { image, ... }
})
const emit = defineEmits(['pick', 'close'])
const { locale } = useLocale()
const labels = computed(() => ui[locale.value])

const dispositions = eventCompanion.en.dispositions
const sel = ref(null)                            // { you, opp } cell in the matrix
const activeMatchup = computed(() => (sel.value ? matchupFor(sel.value.you, sel.value.opp) : null))

function matchupLabel(m) {
  return `${dispositionName(m.a)} ${labels.value.trackerVs} ${dispositionName(m.b)}`
}
function isSelected(l) {
  return !!props.selected && props.selected.image === l.image
}
function pick(m, l) {
  emit('pick', { id: l.id, image: l.image, edge: l.edge, label: `${matchupLabel(m)} · ${l.id}` })
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
  max-width: 560px;
  max-height: 90vh;
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

.lp-hint { text-align: center; font-size: 0.84rem; color: var(--text-muted); margin: 0.5rem 0 0.5rem; }
.lp-matchup {
  font-family: var(--font-serif);
  font-size: 1rem;
  font-weight: 700;
  color: var(--accent);
  margin: 0.4rem 0 0.6rem;
  text-align: center;
}
.lp-layouts { display: flex; flex-direction: column; gap: 0.9rem; }
.lp-layout { display: flex; flex-direction: column; gap: 0.4rem; }
.lp-layout.on { outline: 2px solid var(--accent); outline-offset: 2px; border-radius: 6px; }
.lp-pick {
  align-self: center;
  min-height: 40px;
  padding: 0.4rem 1.4rem;
  border: 1px solid var(--border);
  border-radius: 6px;
  background: var(--bg-secondary);
  color: var(--accent);
  font-size: 0.84rem;
  font-weight: 700;
  cursor: pointer;
}
.lp-pick:hover { border-color: var(--accent); }
.lp-pick.on { background: var(--accent); color: var(--text-on-accent); border-color: var(--accent); }

@media (max-width: 560px) {
  .modal-overlay { padding: 0; align-items: flex-end; }
  .modal { max-width: 100%; max-height: 92vh; border-radius: 12px 12px 0 0; }
}
</style>
