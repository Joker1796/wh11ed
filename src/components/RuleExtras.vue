<template>
  <!-- What the GW app applies as data rather than prints in this rule — keyword grants,
       restrictions and allied units, who the bearer can lead, the enhancement's weapon — in a plate
       of its own under the rule's text (owner, 2026-10-06, variant A: a frame with a caption), so
       the text above reads exactly as the app prints it and this reads as the app's conditions.
       Data: `extras` from src/data/factions/extras/<slug>.js (data/factions/index.js). -->
  <aside
    v-if="items.length"
    class="rule-extras"
  >
    <p class="rule-extras-title">
      <i
        class="bi bi-gear"
        aria-hidden="true"
      /> {{ labels.ruleExtrasTitle }}
    </p>
    <div
      v-for="(t, i) in items"
      :key="i"
      class="rule-extras-item"
      v-html="renderRichText(t)"
    />
  </aside>
</template>

<script setup>
import { computed } from 'vue'
import { ui } from '../i18n/ui.js'
import { useLocale } from '../composables/useLocale.js'
import { useRenderInline } from '../composables/useRenderInline.js'

const props = defineProps({
  // [{ en, ru }] — none or empty draws nothing.
  extras: { type: Array, default: null },
})
const { locale } = useLocale()
const labels = computed(() => ui[locale.value])
const { renderRichText } = useRenderInline()
const items = computed(() => (props.extras || []).map((x) => x[locale.value] || x.en).filter(Boolean))
</script>

<style scoped>
.rule-extras {
  margin: 0.6rem 0 0;
  padding: 0.5rem 0.75rem 0.6rem;
  border: 1px solid var(--border);
  border-left: 3px solid var(--accent);
  background: color-mix(in srgb, var(--accent) 5%, var(--bg-card));
  font-size: 0.85rem;
  line-height: 1.45;
}
.rule-extras-title {
  margin: 0 0 0.3rem;
  font-size: 0.7rem; font-weight: 700; text-transform: uppercase; letter-spacing: 0.05em;
  color: var(--text-dim);
}
.rule-extras-item + .rule-extras-item { margin-top: 0.4rem; }
.rule-extras-item :deep(p) { margin: 0 0 0.3rem; }
.rule-extras-item :deep(p:last-child) { margin-bottom: 0; }
.rule-extras-item :deep(ul) { margin: 0.2rem 0 0.3rem; padding-left: 1.1em; }
</style>
