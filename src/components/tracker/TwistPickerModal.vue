<template>
  <BaseModal :title="labels.trackerTwistPickerTitle" @close="$emit('close')">
      <div class="modal-body">
        <div class="tp-actions">
          <button class="tp-act" @click="$emit('random')">{{ labels.trackerRandomTwist }}</button>
          <button class="tp-act" :class="{ on: !selected }" @click="$emit('none')">{{ labels.trackerNoTwist }}</button>
        </div>

        <div v-for="t in twists" :key="t.id" class="tp-item" :class="{ on: selected === t.id }">
          <div class="tp-row">
            <button class="tp-toggle" :aria-expanded="openId === t.id" @click="toggle(t.id)">
              <span class="tp-name">{{ t.title }}</span>
              <i class="bi tp-chev" :class="openId === t.id ? 'bi-chevron-up' : 'bi-chevron-down'"></i>
            </button>
            <button class="tp-pick" :class="{ on: selected === t.id }" @click="$emit('pick', t.id)">
              {{ selected === t.id ? '✓ ' : '' }}{{ labels.trackerSelect }}
            </button>
          </div>
          <CollapseTransition :show="openId === t.id">
            <div class="tp-body">
              <p v-if="t.example" class="tcard-flavor" v-html="renderInline(t.example)"></p>
              <RuleBody :body="t.body" />
              <p v-if="t.note" class="tp-note" v-html="renderInline(t.note)"></p>
            </div>
          </CollapseTransition>
        </div>
      </div>
  </BaseModal>
</template>

<script setup>
import { ref, computed } from 'vue'
import BaseModal from '../BaseModal.vue'
import RuleBody from '../RuleBody.vue'
import CollapseTransition from '../CollapseTransition.vue'
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
.tp-act.on { background: var(--accent); color: var(--text-on-accent); border-color: var(--accent); }

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

.tp-body {
  padding: 0.2rem 0.75rem 0.7rem;
  font-size: 0.86rem;
  line-height: 1.5;
  color: var(--text-muted);
  border-top: 1px solid var(--border);
}
.tcard-flavor { font-style: italic; color: var(--text-muted); font-size: 0.82rem; line-height: 1.5; margin: 0.5rem 0; }
.tp-note {
  margin-top: 0.6rem;
  padding: 0.5rem 0.65rem;
  border-left: 3px solid var(--accent);
  background: var(--bg-card);
  border-radius: 4px;
  font-size: 0.8rem;
  font-style: italic;
  line-height: 1.45;
}
</style>
