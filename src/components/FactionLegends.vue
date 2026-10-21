<template>
  <!-- The prose half of a "Legends: <Faction>" publication (src/data/factionLegends.json), under a
       faction's unit list. Under it, not above: a player who opened the list came for the units,
       and the intro is four paragraphs of GW's stance on Legends — folded until asked for. The
       proxies are the useful part and stay open: a retired unit with no datasheet of its own
       ("Ufthak Blackhawk") and the Codex sheet it is fielded as — the first Legends question a
       player sent us was exactly that, and this table already answered it in appdata. The list's
       search narrows the proxies by the retired names, so typing the old unit's name finds its row
       even though no unit in the list carries it. The heading is the list's own (`#head`), so it
       reads as one more group of the same page. -->
  <ExpandTransition>
    <section
      v-if="legends && (!searching || visibleProxies.length)"
      class="ds-legends"
    >
      <slot
        name="head"
        :title="labels.dsLegendsTitle"
      />
      <template v-if="!searching && legends.intro">
        <button
          type="button"
          class="ds-legends-about"
          :aria-expanded="introOpen"
          @click="introOpen = !introOpen"
        >
          <ChevronIcon
            :turned="introOpen"
            from="right"
            to="down"
          />
          <span>{{ labels.dsLegendsAbout }}</span>
        </button>
        <CollapseTransition :show="introOpen">
          <div class="ds-legends-intro rule-body">
            <RuleBody :body="legends.intro" />
          </div>
        </CollapseTransition>
      </template>
      <template v-if="visibleProxies.length">
        <h4
          id="legendary-proxies"
          class="ds-legends-sub"
        >
          {{ labels.dsLegendsProxies }}
        </h4>
        <p class="ds-legends-hint">
          {{ labels.dsLegendsProxiesHint }}
        </p>
        <ul class="ds-proxies">
          <li
            v-for="(p, i) in visibleProxies"
            :key="i"
          >
            <span class="ds-proxy-legacy">{{ p.legacy.join(', ') }}</span>
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
    </section>
  </ExpandTransition>
</template>

<script setup>
import { computed, ref, watch } from 'vue'
import ChevronIcon from './ChevronIcon.vue'
import CollapseTransition from './CollapseTransition.vue'
import ExpandTransition from './ExpandTransition.vue'
import RuleBody from './RuleBody.vue'
import { ui } from '../i18n/ui.js'
import { useLocale } from '../composables/useLocale.js'

const props = defineProps({
  slug: { type: String, required: true },
  // The list's search box.
  query: { type: String, default: '' },
})

const { locale } = useLocale()
const labels = computed(() => ui[locale.value])
const searching = computed(() => !!props.query.trim())

// Null for the factions without a Legends publication — which today is all but one. Its own lazy
// chunk, tiny, and fetched only for the faction that has an entry; the RU intro is a drop-in overlay
// with EN fallback, the same import.meta.glob arrangement FactionFaqView uses so a missing file
// costs nothing.
const legends = ref(null)
const introOpen = ref(false)
const legendsRuGlob = import.meta.glob('../data/factionLegendsRu.json', { import: 'default' })
const legendsRuLoader = legendsRuGlob['../data/factionLegendsRu.json'] || null
async function loadLegends(s) {
  const all = (await import('../data/factionLegends.json')).default
  const en = all[s]
  if (!en) return null
  let ru = null
  if (locale.value === 'ru' && legendsRuLoader) {
    // A Chapter carries the Codex publication (`of`), whose RU intro lives under the Codex slug.
    try { ru = (await legendsRuLoader())?.[en.of || s] || null } catch { ru = null }
  }
  return { ...en, intro: ru?.intro || en.intro }
}
// Another faction, or the other language (the intro's; the proxies are unit names).
watch([() => props.slug, locale], async ([s], old) => {
  if (s !== old?.[0]) { legends.value = null; introOpen.value = false }
  const leg = await loadLegends(s)
  if (props.slug === s) legends.value = leg
}, { immediate: true })

const visibleProxies = computed(() => {
  const q = props.query.trim().toLowerCase()
  const rows = legends.value?.proxies || []
  if (!q) return rows
  return rows.filter((p) => p.legacy.some((n) => n.toLowerCase().includes(q)) || p.use.toLowerCase().includes(q))
})
</script>

<style scoped>
.ds-legends { margin-top: 1.5rem; }

.ds-legends-about {
  display: inline-flex;
  align-items: center;
  gap: 0.4rem;
  padding: 0.2rem 0;
  border: 0;
  background: none;
  color: var(--text-muted);
  font: inherit;
  font-size: 0.85rem;
  cursor: pointer;
}
.ds-legends-about:hover { color: var(--accent-ink); }
.ds-legends-about i { font-size: 0.7rem; }

/* Muted — a folded aside, not the rules the page is for. The global `strong` is near-white at
   800 in the dark theme, and on a muted paragraph every **Legendary Proxies** flared against
   it; here bold keeps the paragraph's own colour and is bold by weight alone. */
.ds-legends-intro {
  max-width: 70ch;
  padding: 0.3rem 0 0.6rem;
  font-size: 0.9rem;
  color: var(--text-muted);
}
.ds-legends-intro :deep(strong) {
  color: inherit;
  font-weight: 700;
}

.ds-legends-sub {
  margin: 0.9rem 0 0.15rem;
  /* The display face runs narrow: at 0.95rem it read smaller than the body line above it. Sits
     under the 1.3rem group head, above the body. */
  font-size: 1.2rem;
  font-weight: 700;
}

.ds-legends-hint {
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
.ds-proxy-arrow {
  font-size: 0.8rem;
  color: var(--text-dim);
}
.ds-proxy-use { font-weight: 600; }
</style>
