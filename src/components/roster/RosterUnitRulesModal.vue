<template>
  <BaseModal :title="sheet?.name" max-width="720px" max-height="90vh" @close="$emit('close')">
    <div class="modal-body">
      <!-- Static rules card for now — the roster entry (wargear picks, enhancement, warlord)
           is available to this component's caller for a future pass that overlays live
           stat/ability modifiers (e.g. an enhancement like Cursed Legion changing a profile)
           on top of the base sheet. Not implemented yet: this just renders the base rules. -->
      <DatasheetCard v-if="sheet" :sheet="sheet" :faction-slug="factionSlug" collapsible />
      <p v-else-if="loaded" class="rum-missing">{{ labels.factionsSoon }}</p>
    </div>
  </BaseModal>
</template>

<script setup>
import { computed, ref, watch } from 'vue'
import BaseModal from '../BaseModal.vue'
import DatasheetCard from '../DatasheetCard.vue'
import { ui } from '../../i18n/ui.js'
import { useLocale } from '../../composables/useLocale.js'
import { loadDatasheets } from '../../data/datasheets/index.js'
import { loadDatasheetsRu, localizeSheet } from '../../data/datasheets/ru/index.js'

const props = defineProps({
  unitId: { type: String, required: true },
  factionSlug: { type: String, required: true },
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

const sheet = computed(() => {
  const en = datasheets.value.find((d) => d.id === props.unitId) || null
  if (!en || locale.value !== 'ru') return en
  const mod = ruModule.value
  if (!mod) return en
  return localizeSheet(en, mod.default?.[en.id], mod.abilityNamesRu)
})
</script>

<style scoped>
.modal-body { padding: 0.9rem; overflow-y: auto; }
.rum-missing { color: var(--text-muted); font-size: 0.95rem; text-align: center; padding: 1rem 0; }

/* Small phones: the modal is already full-width (BaseModal's ≤560px bottom-sheet), so its own
   padding is the last thing standing between DatasheetCard's tables and the screen edge —
   DatasheetCard already bleeds its weapon table/ability groups to ITS OWN edges at ≤480px, so a
   generous outer padding here would just re-add the margin that treatment removes. */
@media (max-width: 480px) {
  .modal-body { padding: 0.6rem 0.35rem; }
}
</style>
