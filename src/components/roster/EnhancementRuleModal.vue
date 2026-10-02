<template>
  <BaseModal
    :title="enh?.name || name"
    max-width="640px"
    max-height="85dvh"
    @close="$emit('close')"
  >
    <template #aside>
      <span
        v-if="enh?.points != null"
        class="mh-count value"
      >+{{ enh.points }}</span>
    </template>
    <!-- Themed HERE, on the body: BaseModal teleports itself to <body>, so a FactionAccentScope a
         caller wraps round this component never contains the dialog and the accent fell back to
         the site's red (the weapon table's header band, 2026-09-28). -->
    <div
      class="modal-body fa-themed"
      :style="accentStyle"
    >
      <template v-if="enh">
        <div
          v-if="enh.aura || enh.upgrade"
          class="erm-head"
        >
          <span
            v-if="enh.aura"
            class="erm-tag"
          >{{ labels.factionAura }}</span>
          <span
            v-if="enh.upgrade"
            class="erm-tag"
          >Upgrade</span>
        </div>
        <p
          v-if="enh.flavor"
          class="erm-flavor"
        >
          {{ enh.flavor }}
        </p>
        <div
          class="erm-body"
          v-html="renderInline(enh.body)"
        />
        <div
          v-if="enh.note"
          class="erm-note"
          v-html="renderInline(enh.note)"
        />
      </template>
      <p
        v-else-if="loaded"
        class="erm-missing"
      >
        {{ labels.rosterNoProfile }}
      </p>
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
import { computed, ref, watch, toRef } from 'vue'
import BaseModal from '../BaseModal.vue'
import { useFactionAccent } from '../../composables/useFactionAccent.js'
import { ui } from '../../i18n/ui.js'
import { useLocale } from '../../composables/useLocale.js'
import { useRenderInline } from '../../composables/useRenderInline.js'
import { findEnhancementProse } from '../../composables/rosterModifiers.js'

const props = defineProps({
  name: { type: String, required: true },
  factionSlug: { type: String, required: true },
  // The list's own detachments (names or objects): an enhancement name can repeat across a
  // faction's detachments, and these are searched first (findEnhancementProse).
  detachments: { type: Array, default: () => [] },
})
const { accentStyle } = useFactionAccent(toRef(props, 'factionSlug'))
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
    // Every detachment the list can field — a Chapter's include the Codex: Space Marines ones,
    // which live in that faction's file (a player's report, 2026-10-01: Blood Angels lists showed
    // no text for Gladius Task Force's enhancements). Same loader as the list's Rules tab.
    const { loadRosterFactionRules } = await import('../../composables/rosterFactionRules.js')
    const { lookup } = await loadRosterFactionRules(slug, loc)
    if (props.factionSlug !== slug || locale.value !== loc) return
    enh.value = findEnhancementProse(lookup.values(), name, props.detachments)
    loaded.value = true
  },
  { immediate: true },
)
</script>

<style scoped>

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
