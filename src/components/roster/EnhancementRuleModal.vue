<template>
  <BaseModal max-width="640px" max-height="85dvh" @close="$emit('close')">
    <template #header="{ close }">
      <header class="modal-head">
        <h3 class="mh-title">{{ enh?.name || name }}</h3>
        <div class="mh-right">
          <span v-if="enh?.points != null" class="erm-head-pts">+{{ enh.points }}</span>
          <button class="mh-close" @click="close" :aria-label="labels.modalClose">✕</button>
        </div>
      </header>
    </template>
    <div class="modal-body">
      <template v-if="enh">
        <div v-if="enh.aura || enh.upgrade" class="erm-head">
          <span v-if="enh.aura" class="erm-tag">{{ labels.factionAura }}</span>
          <span v-if="enh.upgrade" class="erm-tag">Upgrade</span>
        </div>
        <p v-if="enh.flavor" class="erm-flavor">{{ enh.flavor }}</p>
        <div class="erm-body" v-html="renderInline(enh.body)"></div>
        <div v-if="enh.note" class="erm-note" v-html="renderInline(enh.note)"></div>
      </template>
      <p v-else-if="loaded" class="erm-missing">{{ labels.rosterNoProfile }}</p>
    </div>
  </BaseModal>
</template>

<script setup>
// A single enhancement's rule text, looked up by name across the faction's own rules data
// (src/data/factions/<slug>.js — the roster's own derived data only carries name/points/
// requirements, not the body text; see gen-roster-data.mjs). An enhancement's name is unique
// within a faction, so this searches every detachment rather than needing the roster's exact
// selected-detachment name to match the faction file's (avoids repeating the apostrophe/case
// matching headache from the mandatory-enhancement bug — see rosterEngine.js's history).
import { computed, ref, watch } from 'vue'
import BaseModal from '../BaseModal.vue'
import { ui } from '../../i18n/ui.js'
import { useLocale } from '../../composables/useLocale.js'
import { useRenderInline } from '../../composables/useRenderInline.js'
import { enhKey } from '../../composables/rosterModifiers.js'

const props = defineProps({
  name: { type: String, required: true },
  factionSlug: { type: String, required: true },
})
defineEmits(['close'])

const { locale } = useLocale()
const { renderInline } = useRenderInline()
const labels = computed(() => ui[locale.value])

// Enhancement names disagree between the roster layer and this hand-authored faction file
// (typographic glyphs, "(Aura)"/"(Upgrade)" baked into appdata's own name) — normalised by
// rosterModifiers.js's enhKey(), which is where this function now lives so the unit-rules modal's
// own enhancement lookup and this one can never drift apart.
const enh = ref(null)
const loaded = ref(false)
watch(
  [() => props.factionSlug, () => props.name, locale],
  async ([slug, name, loc]) => {
    enh.value = null
    loaded.value = false
    if (!slug || !name) return
    const [{ loadFaction }, { loadFactionRu, deepOverlay }] = await Promise.all([
      import('../../data/factions/index.js'),
      import('../../data/factions/ru/index.js'),
    ])
    const data = await loadFaction(slug)
    if (props.factionSlug !== slug) return
    let fac = data?.en
    if (fac && loc === 'ru') {
      const mod = await loadFactionRu(slug)
      if (props.factionSlug !== slug || locale.value !== 'ru') return
      if (mod) fac = deepOverlay(fac, mod.default)
    }
    const target = enhKey(name)
    let found = null
    for (const d of fac?.detachments || []) {
      found = d.enhancements?.find((e) => enhKey(e.name) === target)
      if (found) break
    }
    enh.value = found || null
    loaded.value = true
  },
  { immediate: true },
)
</script>

<style scoped>
/* Custom header (BaseModal's default #header slot only takes a plain title string — this needs
   the points badge alongside it), duplicating BaseModal's own header look, same as every other
   custom-header modal in the app (e.g. DetachmentPickerModal.vue). */
.erm-head-pts { font-family: var(--font-mono); font-weight: 700; font-size: 0.95rem; color: var(--accent); }

.modal-body { padding: 0.9rem; overflow-y: auto; font-size: 0.85rem; line-height: 1.5; color: var(--text-primary); }
.erm-head { display: flex; align-items: center; gap: 0.5rem; margin-bottom: 0.4rem; }
.erm-tag {
  font-size: 0.65rem;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.5px;
  color: var(--text-muted);
  border: 1px solid var(--border);
  padding: 0.1rem 0.4rem;
}
.erm-flavor { font-style: italic; color: var(--text-muted); margin: 0 0 0.5rem; }
.erm-note { margin-top: 0.5rem; font-size: 0.8rem; color: var(--text-muted); }
.erm-missing { color: var(--text-muted); font-size: 0.95rem; text-align: center; padding: 1rem 0; }
</style>
