<template>
  <BaseModal @close="$emit('close')">
    <template #header>
      <header class="modal-head">
        <h3 class="mh-title">{{ title }}</h3>
        <div class="mh-right">
          <em class="pick-count" :class="{ full: selected.length >= max }">{{ selected.length }} / {{ max }}</em>
          <button class="mh-close" @click="$emit('close')" :aria-label="labels.modalClose">✕</button>
        </div>
      </header>
    </template>

    <div class="modal-body modal-list">
      <!-- Each option is a toggle. The cap is enforced by the store (a tap past `max` is a no-op), so
           the options are never disabled/faded — all rules stay readable while two are active. -->
      <button
        v-for="o in options"
        :key="o.id"
        class="opt"
        :class="{ on: selected.includes(o.id) }"
        :aria-pressed="selected.includes(o.id)"
        @click="$emit('toggle', o.id)"
      >
        <i class="bi opt-check" :class="selected.includes(o.id) ? 'bi-check-square-fill' : 'bi-square'"></i>
        <span class="opt-main">
          <span class="opt-head">
            <span class="opt-name">{{ o.name }}</span>
            <span v-if="o.req" class="opt-req">{{ o.req }}</span>
          </span>
          <RuleBody v-if="o.body" :body="o.body" />
        </span>
      </button>
    </div>
  </BaseModal>
</template>

<script setup>
import { computed } from 'vue'
import BaseModal from '../BaseModal.vue'
import RuleBody from '../RuleBody.vue'
import { ui } from '../../i18n/ui.js'
import { useLocale } from '../../composables/useLocale.js'

defineProps({
  title:    { type: String, required: true },
  options:  { type: Array, required: true },
  selected: { type: Array, required: true },
  max:      { type: Number, required: true },
})
defineEmits(['toggle', 'close'])

const { locale } = useLocale()
const labels = computed(() => ui[locale.value])
</script>

<style scoped>
/* Header mirrors the other tracker picker modals (DetachmentPickerModal). */
.pick-count { font-size: 0.85rem; font-family: var(--font-mono); color: var(--text-muted); font-style: normal; }
.pick-count.full { color: var(--accent); }

/* Roomier than the default list — these rows are cards, not one-liners. */
.modal-list { gap: 0.4rem; }

/* Option rows use the same tokens as the other tracker pickers (TwistPickerModal `.tp-item`,
   DetachmentPickerModal `.det`): bg-secondary tile + border, accent tint/border when selected.
   `color` is set explicitly because <button> does NOT inherit it (the UA default is black, which
   left the RuleBody text unreadable on a dark tile). */
.opt {
  display: flex;
  align-items: flex-start;
  gap: 0.55rem;
  width: 100%;
  padding: 0.55rem 0.65rem;
  background: var(--bg-secondary);
  border: 1px solid var(--border);
  cursor: pointer;
  text-align: left;
  font-family: inherit;
  color: var(--text-primary);
  transition: background 0.15s, border-color 0.15s;
}
.opt:hover { border-color: var(--accent); }
.opt.on { background: color-mix(in srgb, var(--accent) 16%, transparent); border-color: var(--accent); }

.opt-check {
  flex-shrink: 0;
  margin-top: 0.1rem;
  font-size: 1.05rem;
  line-height: 1.2;
  color: var(--text-dim);
}
.opt.on .opt-check { color: var(--accent); }

.opt-main { min-width: 0; flex: 1 1 auto; }

.opt-head {
  display: flex;
  align-items: baseline;
  justify-content: space-between;
  gap: 0.5rem;
}
.opt-name { font-size: 0.9rem; font-weight: 700; color: var(--text-primary); }
.opt-req {
  flex-shrink: 0;
  font-size: 0.72rem;
  font-weight: 700;
  font-family: var(--font-mono);
  color: var(--accent);
}
/* Rule text — RuleBody renders a bare <p> (its root class isn't bound), so reach it with :deep and
   let the colour inherit from `.opt` (fixes the black-on-dark UA button default). */
.opt-main :deep(p) {
  margin: 0.2rem 0 0;
  font-size: 0.82rem;
  line-height: 1.45;
}
</style>
