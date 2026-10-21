<template>
  <!-- A retired unit with no datasheet of its own and the Codex sheet it is fielded as, one row
       each. Each retired name links to its own page (utils/legendaryProxies.js), the sheet to its
       unit. Ordinary unit links: the faction's list opens them where it is (utils/unitLink.js). -->
  <p class="ds-proxies-hint">
    {{ labels.dsLegendsProxiesHint }}
  </p>
  <ul class="ds-proxies">
    <li
      v-for="(p, i) in proxies"
      :key="i"
    >
      <span class="ds-proxy-legacy"><template
        v-for="(n, k) in p.legacy"
        :key="n"
      >{{ k ? ', ' : '' }}<RouterLink
        v-if="p.id"
        :to="`/factions/${slug}/datasheets/${proxySlug(n)}`"
      >{{ n }}</RouterLink><template v-else>{{ n }}</template></template></span>
      <i class="wi wi-arrow-right ds-proxy-arrow" />
      <!-- Both are flex items, so the line breaks around the text cost no space. -->
      <RouterLink
        v-if="p.id"
        :to="`/factions/${slug}/datasheets/${p.id}`"
        class="ds-proxy-use"
      >
        {{ p.use }}
      </RouterLink>
      <span
        v-else
        class="ds-proxy-use"
      >{{ p.use }}</span>
    </li>
  </ul>
</template>

<script setup>
import { computed } from 'vue'
import { ui } from '../i18n/ui.js'
import { useLocale } from '../composables/useLocale.js'
import { proxySlug } from '../utils/legendaryProxies.js'

defineProps({
  slug: { type: String, required: true },
  proxies: { type: Array, required: true }, // [{ legacy: [names], use, id? }]
})
const { locale } = useLocale()
const labels = computed(() => ui[locale.value])
</script>

<style scoped>
.ds-proxies-hint {
  margin: 0 0 0.4rem;
  font-size: 0.8rem;
  color: var(--text-muted);
}
.ds-proxies {
  margin: 0;
  padding: 0;
  list-style: none;
  font-size: 0.9rem;
}
.ds-proxies li {
  display: flex;
  flex-wrap: wrap;
  align-items: baseline;
  gap: 0.2rem 0.5rem;
  padding: 0.3rem 0;
  border-bottom: 1px solid var(--border);
}
.ds-proxy-legacy { color: var(--text-primary); }
/* Every retired name is a link now, and in the accent the table was a wall of red (owner,
   2026-10-21): the names keep the text's colour with a faint underline, the sheet they are
   fielded as stays the one accent of the row. */
.ds-proxy-legacy a {
  color: inherit;
  text-decoration: underline;
  text-decoration-color: color-mix(in srgb, currentColor 30%, transparent);
  text-underline-offset: 0.2em;
}
@media (hover: hover) { .ds-proxy-legacy a:hover { color: var(--accent-ink); text-decoration-color: currentColor; } }
.ds-proxy-arrow {
  font-size: 0.8rem;
  color: var(--text-dim);
}
.ds-proxy-use { font-weight: 600; }
</style>
