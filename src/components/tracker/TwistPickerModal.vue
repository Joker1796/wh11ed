<template>
  <BaseModal :title="labels.trackerTwistPickerTitle" @close="$emit('close')">
      <div class="modal-body">
        <div class="tp-actions">
          <button class="btn-ghost tp-act" @click="$emit('random')">{{ labels.trackerRandomTwist }}</button>
          <button class="tp-act" :class="selected ? 'btn-ghost' : 'btn-primary'" @click="$emit('none')">{{ labels.trackerNoTwist }}</button>
        </div>

        <PickerRow
          v-for="t in twists"
          :key="t.id"
          :name="t.title"
          :open="openId === t.id"
          :selected="selected === t.id"
          @toggle-open="toggle(t.id)"
          @pick="$emit('pick', t.id)"
        >
          <div class="tw-body">
            <p v-if="t.example" class="tcard-flavor" v-html="renderInline(t.example)"></p>
            <RuleBody :body="t.body" />
            <p v-if="t.note" class="tp-note" v-html="renderInline(t.note)"></p>
          </div>
        </PickerRow>
      </div>
  </BaseModal>
</template>

<script setup>
import { ref, computed } from 'vue'
import BaseModal from '../BaseModal.vue'
import RuleBody from '../RuleBody.vue'
import PickerRow from './PickerRow.vue'
import { ui } from '../../i18n/ui.js'
import { useLocale } from '../../composables/useLocale.js'
import { useRenderInline } from '../../composables/useRenderInline.js'

const props = defineProps({
  twists: { type: Array, required: true },   // [{ id, title, body, note?, example? }]
  selected: { type: String, default: null },
})
const emit = defineEmits(['pick', 'random', 'none', 'close'])
const { locale } = useLocale()
const labels = computed(() => ui[locale.value])
const { renderInline } = useRenderInline()

// Accordion: keep at most one twist expanded; start on the currently-selected one.
const openId = ref(props.selected || null)
function toggle(id) { openId.value = openId.value === id ? null : id }
</script>

<style scoped>

.tp-actions { display: flex; gap: 0.5rem; margin-bottom: 0.8rem; }
/* The two shortcuts share the row evenly and are sized for a thumb; the rest is the global
   button (style.css, "Buttons"). "No twist" is the lit one while nothing is chosen. */
.tp-act { flex: 1; min-height: 44px; justify-content: center; }

/* Raw rule text, unlike the MissionCard the other two pickers slot in, so it brings its own type. */
.tw-body { font-size: 0.86rem; line-height: 1.5; color: var(--text-muted); }
.tcard-flavor { font-style: italic; color: var(--text-muted); font-size: 0.82rem; line-height: 1.5; margin: 0.5rem 0; }
.tp-note {
  margin-top: 0.6rem;
  padding: 0.5rem 0.65rem;
  border-left: 3px solid var(--accent);
  background: var(--bg-card);
  font-size: 0.8rem;
  font-style: italic;
  line-height: 1.45;
}
</style>
