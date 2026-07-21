<template>
  <BaseModal :title="def.name" max-width="560px" @close="$emit('close')">
    <div class="modal-body ues-modal">
      <UnitEditorFields
        :entry="entry"
        :def="def"
        :items="items"
        :texts="texts"
        :faction-slug="factionSlug"
        :can-warlord="canWarlord"
        :is-warlord="isWarlord"
        :enh-options="enhOptions"
        :leader-targets="leaderTargets"
        @toggle-warlord="$emit('toggle-warlord')"
      />

      <div class="ues-foot">
        <span class="ues-total">{{ unitTotal }}{{ labels.rosterPointsLabel }}</span>
        <button class="ues-done" @click="$emit('close')">{{ labels.rosterDone }}</button>
      </div>
    </div>
  </BaseModal>
</template>

<script setup>
import { computed } from 'vue'
import BaseModal from '../BaseModal.vue'
import UnitEditorFields from './UnitEditorFields.vue'
import { ui } from '../../i18n/ui.js'
import { useLocale } from '../../composables/useLocale.js'
import { unitPoints } from '../../composables/rosterEngine.js'

const props = defineProps({
  entry: { type: Object, required: true },
  def: { type: Object, required: true },
  items: { type: Object, required: true },
  texts: { type: Object, required: true },
  factionSlug: { type: String, default: '' },
  copyIndex: { type: Number, default: 1 },
  detachments: { type: Array, default: () => [] },
  canWarlord: { type: Boolean, default: false },
  isWarlord: { type: Boolean, default: false },
  enhOptions: { type: Array, default: () => [] },
  leaderTargets: { type: Array, default: () => [] },
})
defineEmits(['close', 'toggle-warlord'])

const { locale } = useLocale()
const labels = computed(() => ui[locale.value])

const unitTotal = computed(() => unitPoints(props.def, props.entry, props.copyIndex, props.detachments))
</script>

<style scoped>
.ues-modal { padding: 0.75rem; overflow-y: auto; }
.ues-foot {
  position: sticky;
  bottom: 0;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 0.75rem;
  margin-top: 0.5rem;
  padding-top: 0.6rem;
  border-top: 1px solid var(--border);
  background: var(--bg-primary);
}
.ues-total { font-family: var(--font-mono); font-weight: 700; font-size: 1.05rem; color: var(--text-primary); }
.ues-done {
  padding: 0.5rem 1.4rem;
  background: var(--accent);
  color: #fff;
  border: none;
  border-radius: 5px;
  font-weight: 600;
  font-size: 0.88rem;
  cursor: pointer;
}
</style>
