<template>
  <!-- The Legendary Proxies a search in the faction's unit list finds — by a retired unit's name
       ("Ufthak") or by the unit it is fielded as — after the units it found, so typing the old name
       finds its row even though no unit in the list carries it. Without a search the table is behind
       the button over the list (FactionLegendsModal). The heading is the list's own (`#head`), so it
       reads as one more group of the same page. -->
  <ExpandTransition>
    <section
      v-if="matched.length"
      class="ds-legends"
    >
      <slot
        name="head"
        :title="labels.dsLegendsProxies"
      />
      <LegendaryProxyList
        :slug="slug"
        :proxies="matched"
      />
    </section>
  </ExpandTransition>
</template>

<script setup>
import { computed } from 'vue'
import ExpandTransition from './ExpandTransition.vue'
import LegendaryProxyList from './LegendaryProxyList.vue'
import { ui } from '../i18n/ui.js'
import { useLocale } from '../composables/useLocale.js'
import { proxiesMatching } from '../composables/useFactionLegends.js'

const props = defineProps({
  slug: { type: String, required: true },
  legends: { type: Object, default: null }, // useFactionLegends'
  // The list's search box.
  query: { type: String, default: '' },
})

const { locale } = useLocale()
const labels = computed(() => ui[locale.value])
const matched = computed(() => (props.query.trim() ? proxiesMatching(props.legends?.proxies || [], props.query, props.slug) : []))
</script>

<style scoped>
.ds-legends { margin-top: 1.5rem; }
</style>
