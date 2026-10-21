<template>
  <FactionLayout :hero="false">
    <section class="fsection">
      <FactionUnitSheet
        v-if="sheetName"
        :slug="route.params.slug"
        :unit-id="route.params.unit"
        :datasheets="datasheets"
      />
      <p
        v-else-if="loaded && legendsReady"
        class="ds-missing"
      >
        {{ labels.factionsSoon }}
      </p>
    </section>
  </FactionLayout>
</template>

<script setup>
import { computed, ref, watch } from 'vue'
import { useRoute } from 'vue-router'
import FactionLayout from '../../components/FactionLayout.vue'
import FactionUnitSheet from '../../components/FactionUnitSheet.vue'
import { loadDatasheets } from '../../data/datasheets/index.js'
import { ui } from '../../i18n/ui.js'
import { useLocale } from '../../composables/useLocale.js'
import { setDatasheetName } from '../../composables/useSeoMeta.js'
import { useFactionLegends } from '../../composables/useFactionLegends.js'
import { proxyPage } from '../../utils/legendaryProxies.js'

// The unit's own page: the whole unit is FactionUnitSheet, which the faction's unit list also
// opens in a modal and beside itself. What stays here is what belongs to the PAGE — loading the
// faction's datasheets for the route, and the unit's name in the SEO title. The address may also
// be a retired unit of the faction's Legendary Proxies (utils/legendaryProxies.js).
const route = useRoute()
const { locale } = useLocale()
const labels = computed(() => ui[locale.value])

const datasheets = ref([])
const loaded = ref(false)
watch(
  () => route.params.slug,
  async (s) => {
    datasheets.value = []
    loaded.value = false
    if (!s) return
    const list = await loadDatasheets(s)
    if (route.params.slug !== s) return
    if (list) datasheets.value = list
    loaded.value = true
  },
  { immediate: true },
)

const { legends, ready: legendsReady } = useFactionLegends(computed(() => route.params.slug || ''))
const sheetName = computed(() => datasheets.value.find((d) => d.id === route.params.unit)?.name
  || (datasheets.value.length && proxyPage(legends.value, route.params.unit)?.name) || '')

// Push the precise unit name into the SEO title/description (the route-level meta only has the
// slug until the datasheet loads). Unit names aren't translated, so the EN name is fine.
watch(sheetName, (name) => { if (name) setDatasheetName(route.path, name) }, { immediate: true })
</script>

<style scoped>
.ds-missing {
  color: var(--text-muted);
  font-size: 1rem;
}

/* Cancel FactionLayout's .faction-view top padding (0.5rem) so the full-bleed card sits flush
   under the subnav, with no gap above the name plate. .fsection is the container's parent and
   cannot be queried from inside it; a viewport query is close enough for half a rem. */
@media (max-width: 480px) {
  .fsection {
    margin-top: -0.5rem;
  }
}
</style>
