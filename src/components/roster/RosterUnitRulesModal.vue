<template>
  <BaseModal :title="view.sheet?.name" max-width="720px" max-height="90vh" @close="$emit('close')">
    <div class="modal-body">
      <!-- FactionAccentScope re-applies the faction-accent recipe: BaseModal teleports to
           <body>, outside FactionLayout's .faction-view.themed ancestor, so without this every
           unit modal showed the app's global red instead of the faction's colour (DatasheetCard's
           header band/weapon-table headers/ability tags all key off --accent). It's placed HERE,
           inside modal-body rather than wrapped around the whole component by callers like
           UnitEditorFields.vue's own <Teleport>, because a second Teleport (this component's own
           BaseModal) nested inside an outer FactionAccentScope+Teleport wrapper re-parents the
           actual modal DOM to <body> a second time, past the outer wrapper's div — CSS custom
           properties only cascade through real DOM ancestry. Scoping it here keeps it a genuine
           ancestor of DatasheetCard with no teleport in between. -->
      <FactionAccentScope :faction-slug="factionSlug">
        <!-- Roster facts that aren't on the datasheet anywhere (rosterModifiers.js's
             entryContext): whether this entry is the Warlord, what enhancement it carries, who
             it's attached to. Only rendered when there's something to say, so a plain unit's
             card opens exactly as before. -->
        <div v-if="view.context" class="rum-ctx">
          <span v-if="view.context.warlord" class="rum-chip rum-chip-wl">
            <i class="bi bi-star-fill"></i> {{ labels.rosterWarlord }}
          </span>
          <span v-if="view.context.enhancement" class="rum-chip">
            {{ labels.rosterEnhancement }}: <strong>{{ view.context.enhancement.name }}</strong>
            <span v-if="view.context.enhancement.pts" class="rum-chip-pts">+{{ view.context.enhancement.pts }}</span>
            <span v-if="view.context.enhancement.mandatory" class="rum-chip-tag">{{ labels.rosterEnhMandatory }}</span>
          </span>
          <span v-if="view.context.attachedTo" class="rum-chip">
            {{ labels.rosterAttachedTo }} <strong>{{ view.context.attachedTo }}</strong>
          </span>
        </div>
        <!-- The card renders the OVERLAID sheet (rosterModifiers.js), not the printed one: with a
             `ctx` it reflects this roster entry's own loadout/context, without one it's the plain
             datasheet. See ROSTER-MODIFIERS-PROGRESS.md for what each phase adds. -->
        <DatasheetCard
          v-if="view.sheet"
          :sheet="view.sheet"
          :faction-slug="factionSlug"
          :granted-keywords="view.grantedKeywords"
          collapsible
        />
        <p v-else-if="loaded" class="rum-missing">{{ labels.factionsSoon }}</p>
      </FactionAccentScope>
    </div>
  </BaseModal>
</template>

<script setup>
import { computed, ref, watch } from 'vue'
import BaseModal from '../BaseModal.vue'
import DatasheetCard from '../DatasheetCard.vue'
import FactionAccentScope from './FactionAccentScope.vue'
import { ui } from '../../i18n/ui.js'
import { useLocale } from '../../composables/useLocale.js'
import { overlaySheet } from '../../composables/rosterModifiers.js'
import { loadDatasheets } from '../../data/datasheets/index.js'
import { loadDatasheetsRu, localizeSheet } from '../../data/datasheets/ru/index.js'

const props = defineProps({
  unitId: { type: String, required: true },
  factionSlug: { type: String, required: true },
  // This unit's place in the roster, for the modifier overlay (rosterModifiers.js). Optional and
  // partial on purpose: RosterUnitBrowser previews a unit that hasn't been added yet, so it has
  // no entry to pass and gets the plain printed sheet — the pre-overlay behaviour. Shape:
  // { def, entry, items } today; later phases read detachments/units off it too.
  ctx: { type: Object, default: null },
})
defineEmits(['close'])

const { locale } = useLocale()
const labels = computed(() => ui[locale.value])

const datasheets = ref([])
const loaded = ref(false)
watch(
  () => props.factionSlug,
  async (slug) => {
    datasheets.value = []
    loaded.value = false
    if (!slug) return
    const list = await loadDatasheets(slug)
    if (props.factionSlug !== slug) return
    if (list) datasheets.value = list
    loaded.value = true
  },
  { immediate: true },
)

const ruModule = ref(null)
watch(
  [() => props.factionSlug, locale],
  async ([slug, loc]) => {
    ruModule.value = null
    if (!slug || loc !== 'ru') return
    const mod = await loadDatasheetsRu(slug)
    if (props.factionSlug === slug && locale.value === 'ru') ruModule.value = mod
  },
  { immediate: true },
)

// The printed sheet, in the current locale.
const sheet = computed(() => {
  const en = datasheets.value.find((d) => d.id === props.unitId) || null
  if (!en || locale.value !== 'ru') return en
  const mod = ruModule.value
  if (!mod) return en
  return localizeSheet(en, mod.default?.[en.id], mod.abilityNamesRu)
})

// …and what it looks like for THIS roster entry. Overlaying after localisation (not before) keeps
// the two concerns apart: the overlay matches on structural ids and English wargear names, so it
// behaves identically in both locales.
// `unitId`/`factionSlug` are this component's own props, so a caller's ctx never has to repeat
// them — it supplies only what it alone knows (the entry, its def, the roster's detachments).
const view = computed(() => overlaySheet(sheet.value, {
  ...(props.ctx || {}),
  unitId: props.unitId,
  factionSlug: props.factionSlug,
}))
</script>

<style scoped>
.modal-body { padding: 0.9rem; overflow-y: auto; }

/* Context chips above the card. Muted, low-contrast on purpose — this is roster metadata, not
   part of the datasheet, and must not compete with the card's own accent-coloured header band. */
.rum-ctx { display: flex; flex-wrap: wrap; gap: 0.35rem; margin-bottom: 0.6rem; }
.rum-chip {
  display: inline-flex; align-items: center; gap: 0.3rem;
  padding: 0.2rem 0.5rem; border-radius: 4px;
  background: color-mix(in srgb, var(--text-primary) 7%, transparent);
  color: var(--text-muted); font-size: 0.8rem; line-height: 1.3;
}
.rum-chip strong { color: var(--text-primary); font-weight: 600; }
.rum-chip-wl { color: var(--accent); }
.rum-chip-pts { color: var(--text-primary); font-weight: 600; }
.rum-chip-tag { text-transform: lowercase; opacity: 0.8; }
.rum-missing { color: var(--text-muted); font-size: 0.95rem; text-align: center; padding: 1rem 0; }

/* Small phones: the modal is already full-width (BaseModal's ≤560px bottom-sheet), so its own
   padding is the last thing standing between DatasheetCard's tables and the screen edge —
   DatasheetCard already bleeds its weapon table/ability groups to ITS OWN edges at ≤480px, so a
   generous outer padding here would just re-add the margin that treatment removes. */
@media (max-width: 480px) {
  .modal-body { padding: 0.6rem 0.35rem; }
  /* DatasheetCard's own ≤480px CSS bleeds `.ds-card` to the full VIEWPORT width
     (`width: 100vw; margin-left: calc(50% - 50vw)`) so its header/weapon-table/ability-group
     bleeds land flush against the true screen edge — correct only when `.ds-card` sits directly
     in an unpadded container. Nested in this `.modal-body`'s own padding, the `50%` term in that
     calc resolves against the PADDED content box, not the true viewport, so the escape lands a
     few px short/long and the modal gains a small horizontal scroll (most visible once a unit
     has an Abilities/Special Abilities group — `.ds-group-btn`'s width:100% then measures
     against `.ds-ability-group`'s own bled, over-wide box). Cancel just the escape; `.ds-card`'s
     internal bleed-to-its-own-edge for every one of those zones is untouched and stays correct
     once `.ds-card` itself is back to a normal in-flow block. */
  .modal-body :deep(.ds-card) {
    width: auto;
    margin-left: 0;
    border-radius: 6px;
  }
}
</style>
