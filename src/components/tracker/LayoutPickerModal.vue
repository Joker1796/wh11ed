<template>
  <BaseModal :title="labels.trackerLayoutPickerTitle" max-width="560px" max-height="90vh" @close="$emit('close')">
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
  </BaseModal>
</template>

<script setup>
import { ref, computed } from 'vue'
import BaseModal from '../BaseModal.vue'
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
</script>

<style scoped>

.lp-hint { text-align: center; font-size: 0.84rem; color: var(--text-muted); margin: 0.5rem 0 0.5rem; }
.lp-matchup {
  font-family: var(--font-display);
  font-size: 1.10rem;
  font-weight: 500;
  color: var(--accent);
  margin: 0.4rem 0 0.6rem;
  text-align: center;
}
.lp-layouts { display: flex; flex-direction: column; gap: 0.9rem; }
.lp-layout { display: flex; flex-direction: column; gap: 0.4rem; }
.lp-layout.on { outline: 2px solid var(--accent); outline-offset: 2px; }
.lp-pick {
  align-self: center;
  min-height: 40px;
  padding: 0.4rem 1.4rem;
  border: 1px solid var(--border);
  background: var(--bg-secondary);
  color: var(--accent);
  font-size: 0.84rem;
  font-weight: 700;
  cursor: pointer;
}
.lp-pick:hover { border-color: var(--accent); }
.lp-pick.on { background: var(--accent); color: var(--text-on-accent); border-color: var(--accent); }
</style>
