<template>
  <FactionLayout>
    <!-- Datasheets (lazy-loaded per faction from src/data/datasheets/<slug>.js) -->
    <section
      id="datasheets"
      class="fsection"
    >
      <h2 class="fsection-title">
        {{ labels.factionDatasheets }}
      </h2>
      <template v-if="datasheets.length">
        <input
          v-model="dsQuery"
          type="search"
          class="ds-search"
          :placeholder="labels.dsSearch"
          :aria-label="labels.dsSearch"
        >
        <!-- Global army choice (chapter + detachment), shared with the rule page.
             Chapter-less factions keep their datasheet list bar-free — a detachment
             picker filters nothing here. -->
        <FactionPickerBar
          v-if="chapters.length"
          class="ds-picker-bar"
          :slug="slug"
          :detachments="detachments"
          :chapters="chapters"
        />
        <!-- What the two corner marks on every chip mean. Both are toggles with nothing but an
             icon on them, and a tooltip is no answer on a phone — so the key is said once, here,
             instead of on 90 chips. -->
        <div class="ds-tools">
          <p class="ds-legend">
            <span><i class="bi bi-pin-angle" /> {{ labels.favPinnedGroup }}</span>
            <span><i class="bi bi-star" /> {{ labels.rosterFilterOwned }}</span>
          </p>
          <!-- Legends sheets are listed with everything else and marked, not hidden — a rule GW
               still publishes is a rule somebody is reading. The switch is for the player building
               a matched-play list, and only appears for the factions that have any. It shares the
               key's row — width before height — and wraps under it on a phone. -->
          <label
            v-if="hasLegends"
            class="check ds-legends-filter"
            :class="{ on: hideLegends }"
          >
            <input
              v-model="hideLegends"
              type="checkbox"
            >
            <span>{{ labels.dsLegendsHide }}</span>
          </label>
        </div>
        <template
          v-for="g in groupedDatasheets"
          :key="g.key"
        >
          <h3 class="ds-group-head">
            {{ g.label }}
          </h3>
          <div class="ds-grid">
            <RouterLink
              v-for="s in g.sheets"
              :key="s.id"
              :to="`/factions/${slug}/datasheets/${s.id}`"
              class="ds-chip"
            >
              <span class="ds-marks">
                <button
                  type="button"
                  class="ds-fav"
                  :class="{ on: isUnitFavorite(slug, s.id) }"
                  :title="isUnitFavorite(slug, s.id) ? labels.dsUnpinUnit : labels.dsPinUnit"
                  :aria-label="isUnitFavorite(slug, s.id) ? labels.dsUnpinUnit : labels.dsPinUnit"
                  :aria-pressed="isUnitFavorite(slug, s.id)"
                  @click.stop.prevent="toggleUnitFavorite(slug, s.id)"
                >
                  <i :class="isUnitFavorite(slug, s.id) ? 'bi bi-pin-angle-fill' : 'bi bi-pin-angle'" />
                </button>
                <!-- "I own this one" — the same mark the roster catalogue shows and filters by.
                     This grid is where a collection actually gets entered: the datasheet page
                     carries the same button, but one unit per visit is no way to fill a shelf. -->
                <button
                  type="button"
                  class="ds-fav ds-own"
                  :class="{ on: isOwned(slug, s.id) }"
                  :title="isOwned(slug, s.id) ? labels.dsOwnRemove : labels.dsOwnAdd"
                  :aria-label="isOwned(slug, s.id) ? labels.dsOwnRemove : labels.dsOwnAdd"
                  :aria-pressed="isOwned(slug, s.id)"
                  @click.stop.prevent="toggleOwned(slug, s.id, s.name)"
                >
                  <i :class="isOwned(slug, s.id) ? 'bi bi-star-fill' : 'bi bi-star'" />
                </button>
              </span>
              <span class="ds-chip-name">{{ s.name }}</span>
              <span
                v-if="chapters.length && !chapter && chapterOf(s)"
                class="ds-chip-chapter"
              >{{ chapterOf(s) }}</span>
              <span
                v-if="s.legends"
                class="legends-badge"
                :title="labels.dsLegendsNote"
              >{{ labels.dsLegends }}</span>
              <span
                v-if="s.points"
                class="ds-chip-pts"
              >{{ ptsSummary(s.points) }}</span>
            </RouterLink>
          </div>
        </template>
        <!-- The prose half of a "Legends: <Faction>" publication (src/data/factionLegends.json).
             Sits under the list, not above it: a player who opened this page came for the units,
             and the intro is four paragraphs of GW's stance on Legends — folded until asked for.
             The proxies are the useful part and stay open: a retired unit with no datasheet of
             its own ("Ufthak Blackhawk") and the Codex sheet it is fielded as — the first Legends
             question a player sent us was exactly that, and this table already answered it in
             appdata. A search query narrows the proxies by the retired names, so typing the old
             unit's name finds its row even though no chip carries it. -->
        <section
          v-if="legends && (!dsQuery.trim() || visibleProxies.length)"
          class="ds-legends"
        >
          <h3 class="ds-group-head">
            {{ labels.dsLegendsTitle }}
          </h3>
          <template v-if="!dsQuery.trim() && legends.intro">
            <button
              type="button"
              class="ds-legends-about"
              :aria-expanded="introOpen"
              @click="introOpen = !introOpen"
            >
              <i
                class="bi"
                :class="introOpen ? 'bi-chevron-down' : 'bi-chevron-right'"
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
                <i class="bi bi-arrow-right ds-proxy-arrow" />
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
      </template>
      <p
        v-else-if="loaded"
        class="ds-empty"
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
import FactionPickerBar from '../../components/FactionPickerBar.vue'
import CollapseTransition from '../../components/CollapseTransition.vue'
import RuleBody from '../../components/RuleBody.vue'
import { loadDatasheets, ptsSummary } from '../../data/datasheets/index.js'
import { ui } from '../../i18n/ui.js'
import { useFactionPage } from '../../composables/useFactionPage.js'
import { useLocale } from '../../composables/useLocale.js'
import { useFactionChoice } from '../../composables/useFactionChoice.js'
import { useFavorites } from '../../composables/useFavorites.js'
import { useCollection } from '../../composables/useCollection.js'
import { getItem, setItem } from '../../composables/safeStorage.js'
import { scrollToAnchor } from '../../composables/useRefNavigation.js'

const route = useRoute()
const { slug, faction } = useFactionPage()
const { locale } = useLocale()
const labels = computed(() => ui[locale.value])

// Datasheets are lazy-loaded per faction (each src/data/datasheets/<slug>.js is its own
// chunk) so the heavy unit data never rides in the shared view bundle.
const datasheets = ref([])
const loaded = ref(false)
const dsQuery = ref('')
// The faction's Legends prose (intro + Legendary Proxies), null for the factions without a
// Legends publication — which today is all but one. Its own lazy chunk, tiny, and fetched only
// for the faction that has an entry; the RU intro is a drop-in overlay with EN fallback, the
// same import.meta.glob arrangement FactionFaqView uses so a missing file costs nothing.
const legends = ref(null)
const introOpen = ref(false)
const legendsRuGlob = import.meta.glob('../../data/factionLegendsRu.json', { import: 'default' })
const legendsRuLoader = legendsRuGlob['../../data/factionLegendsRu.json'] || null
async function loadLegends(s) {
  const all = (await import('../../data/factionLegends.json')).default
  const en = all[s]
  if (!en) return null
  let ru = null
  if (locale.value === 'ru' && legendsRuLoader) {
    try { ru = (await legendsRuLoader())?.[s] || null } catch { ru = null }
  }
  return { ...en, intro: ru?.intro || en.intro }
}
watch(
  () => route.params.slug,
  async (s) => {
    datasheets.value = []
    legends.value = null
    loaded.value = false
    dsQuery.value = ''
    introOpen.value = false
    if (!s) return
    const [list, leg] = await Promise.all([loadDatasheets(s), loadLegends(s)])
    // guard against a stale resolve after a rapid route change
    if (route.params.slug !== s) return
    if (list) datasheets.value = list
    legends.value = leg
    loaded.value = true
    // A deep link into the list (the changelog's Legendary Proxies link lands on
    // #legendary-proxies): the target only exists once the lazy chunk has rendered, so the scroll
    // runs here, after the load, not on mount — scrollToAnchor itself waits out the paint.
    if (route.hash) scrollToAnchor(route.hash.slice(1))
  },
  { immediate: true },
)
// A hash-only change keeps the view alive (the RouterView key is the path) — re-run the scroll.
watch(() => route.hash, (hash) => {
  if (hash && loaded.value) scrollToAnchor(hash.slice(1))
})
// A locale switch swaps the intro's language in place; the list itself is locale-free.
watch(locale, async () => {
  const s = route.params.slug
  if (!s || !legends.value) return
  const leg = await loadLegends(s)
  if (route.params.slug === s) legends.value = leg
})

const visibleProxies = computed(() => {
  const q = dsQuery.value.trim().toLowerCase()
  const rows = legends.value?.proxies || []
  if (!q) return rows
  return rows.filter((p) => p.legacy.some((n) => n.toLowerCase().includes(q)) || p.use.toLowerCase().includes(q))
})

// The global army choice (chapter + detachment) is shared with the rule page via
// FactionPickerBar / useFactionChoice. Chapters come from the faction rules data
// (`chapters` on space-marines.js) — other factions have none, so their datasheet
// pages stay bar-free (extra faction keywords like Plague Legions or Ynnari are
// not Chapters and no army restriction applies to them).
const chapters = computed(() => faction.value?.chapters || [])
const detachments = computed(() => {
  const f = faction.value
  if (!f) return []
  if (Array.isArray(f.detachments)) return f.detachments
  return f.detachment ? [f.detachment] : []
})

const { activeChapter } = useFactionChoice()
const chapter = computed(() => activeChapter(slug.value, chapters.value))

const { isUnitFavorite, toggleUnitFavorite } = useFavorites()
const { isOwned, toggleOwned } = useCollection()

// A unit's Chapter = the second Faction keyword on its datasheet. Order in
// factionKeywords[] is not stable (Pedro Kantor lists Adeptus Astartes first),
// so find the non-umbrella keyword instead of taking [0].
const UMBRELLA_KEYWORDS = new Set(['Adeptus Astartes', 'Imperium'])
function chapterOf(s) {
  return (s.factionKeywords || []).find((k) => !UMBRELLA_KEYWORDS.has(k))
}

// Per device, like the roster catalogue's own filters (RosterUnitBrowser.vue).
const hideLegends = ref(getItem('wh11ed-ds-filter-legends') === '1')
watch(hideLegends, (v) => setItem('wh11ed-ds-filter-legends', v ? '1' : ''))
const hasLegends = computed(() => datasheets.value.some((s) => s.legends))

const filteredDatasheets = computed(() => {
  const q = dsQuery.value.trim().toLowerCase()
  const c = chapter.value
  return datasheets.value.filter((s) => {
    if (hideLegends.value && s.legends) return false
    if (q && !s.name.toLowerCase().includes(q)) return false
    if (c) {
      // Chapter-less sheets are generic Adeptus Astartes units, legal in any Chapter's army.
      const sc = chapterOf(s)
      if (sc && sc !== c) return false
    }
    return true
  })
})

// Codex-style type groups, in roster-building order. A sheet lands in the first group
// whose keyword it carries (Epic Heroes are also CHARACTER, so precedence matters).
const TYPE_GROUPS = [
  { key: 'epic',       kw: 'Epic Hero',           label: 'dsGroupEpicHeroes' },
  { key: 'character',  kw: 'Character',           label: 'dsGroupCharacters' },
  { key: 'battleline', kw: 'Battleline',          label: 'dsGroupBattleline' },
  { key: 'transport',  kw: 'Dedicated Transport', label: 'dsGroupTransports' },
  { key: 'fortification', kw: 'Fortification',    label: 'dsGroupFortifications' },
  // Split out of "Other" — these two Unit Type keywords alone cover 82% of what used to
  // land there (Vehicle 229, Infantry 195 across all factions' datasheets); the remaining
  // Unit Types (Monster/Aircraft/Mounted/Beast) are each too small to earn their own
  // section and stay lumped into "Other" below.
  { key: 'vehicle',    kw: 'Vehicle',             label: 'dsGroupVehicles' },
  { key: 'infantry',   kw: 'Infantry',            label: 'dsGroupInfantry' },
  { key: 'other',      kw: null,                  label: 'dsGroupOther' },
]

const groupedDatasheets = computed(() => {
  const l = labels.value
  const buckets = TYPE_GROUPS.map((g) => ({ key: g.key, kw: g.kw, label: l[g.label], sheets: [] }))
  for (const s of filteredDatasheets.value) {
    buckets.find((b) => !b.kw || (s.keywords || []).includes(b.kw)).sheets.push(s)
  }
  const groups = buckets.filter((b) => b.sheets.length)
  // "Favorites" — a quick-access group pinned to the top; the units also stay in their
  // real type group below. Built from the filtered list so search / chapter still apply,
  // and only shown when at least one favourite survives the filter.
  const favs = filteredDatasheets.value.filter((s) => isUnitFavorite(slug.value, s.id))
  if (favs.length) groups.unshift({ key: 'favorites', label: l.favPinnedGroup, sheets: favs })
  return groups
})

</script>

<style scoped>

.ds-search {
  width: 100%;
  max-width: 24rem;
  padding: 0.5rem 0.7rem;
  font-size: 0.9rem;
  color: var(--text-primary);
  background: var(--bg-card);
  border: 1px solid var(--border);
  margin-bottom: 0.55rem;
}

.ds-search:focus {
  outline: none;
  border-color: var(--accent);
}

/* The sticky chapter/detachment bar itself lives in FactionPickerBar; here we only
   restore the list's breathing room under it. */
.ds-picker-bar {
  margin-bottom: 0.6rem;
}

.ds-group-head {
  font-family: var(--font-display);
  font-size: 1.3rem;
  font-weight: 400;
  text-transform: uppercase;
  letter-spacing: 0.5px;
  color: var(--accent);
  margin: 1rem 0 0.4rem;
  padding-bottom: 0.25rem;
  border-bottom: 1px solid var(--border);
}

.ds-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(180px, 1fr));
  gap: 0.35rem;
}

.ds-chip {
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 0.05rem;
  text-align: left;
  padding: 0.35rem 1.9rem 0.35rem 0.55rem;
  /* The two marks stack in the corner, so they cost the name ONE icon of width instead of two —
     at this grid's 180px a second column of buttons was breaking names onto a third line. The
     min-height is what the stack needs: the buttons are absolute and would otherwise hang out of
     a short chip (a one-line name and its points). Two marks at 1.35rem + the corner offset —
     2.9rem; a one-line chip grew 5px for it on 2026-09-21 when the marks were made bigger. */
  min-height: 2.9rem;
  background: var(--bg-card);
  border: 1px solid var(--border);
  cursor: pointer;
  text-decoration: none;
  transition: background var(--motion-fast), border-color var(--motion-fast);
}

/* Both marks — pin (favourite) and star (owned) — sit in the chip's top-right corner. They are
   inside the RouterLink, so their handlers stop propagation / prevent navigation. */
.ds-marks { position: absolute; top: 0.15rem; right: 0.2rem; display: flex; flex-direction: column; }

.ds-fav {
  display: flex;
  align-items: center;
  justify-content: center;
  /* 1.5×1.35rem, glyph 1rem: as big as the stack can be without outgrowing a one-line chip.
     Short of the 24px tap target still — listed in `npm run a11y`'s ALLOWED. */
  width: 1.5rem;
  height: 1.35rem;
  padding: 0;
  background: none;
  border: none;
  color: var(--text-muted);
  font-size: 1rem;
  line-height: 1;
  cursor: pointer;
  opacity: 0.5;
  transition: color var(--motion-fast), opacity var(--motion-fast), background var(--motion-fast);
}

.ds-fav:hover {
  opacity: 1;
  background: color-mix(in srgb, var(--accent) 12%, transparent);
}

.ds-fav.on {
  opacity: 1;
}

/* Owned takes the faction's own accent — the colour this page is already themed in (FactionLayout
   folds `--fa-light`/`--fa-dark` into `--accent`), so a marked shelf reads as part of the army
   rather than as a foreign gold. The pin keeps its quiet outline→filled swap: two marks in one
   corner, only one of them coloured. */
.ds-own.on { color: var(--accent); }

.ds-chip:hover { text-decoration: none; }

.ds-chip:hover {
  background: color-mix(in srgb, var(--accent) 8%, var(--bg-card));
  border-color: var(--accent);
}

.ds-chip-name {
  font-family: var(--font-display);
  font-size: 1.1rem;
  line-height: 1.1;
  text-transform: uppercase;
  letter-spacing: 0.3px;
  color: var(--text-primary);
}

.ds-chip-chapter {
  font-size: 0.65rem;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.4px;
  color: var(--accent);
  white-space: nowrap;
}

.ds-legends-filter {
  margin: 0;
  padding-block: 0.35rem;
}

.ds-chip-pts {
  font-family: var(--font-mono);
  font-size: 0.68rem;
  font-weight: 700;
  color: var(--text-muted);
  white-space: nowrap;
}

/* The chips' key and the Legends switch on one row (the switch wraps under on a phone). */
.ds-tools {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: space-between;
  gap: 0.5rem 1rem;
  margin: 0.5rem 0 0;
}

/* The chips' key. Dim and small — it is read once and then ignored. */
.ds-legend {
  display: flex;
  flex-wrap: wrap;
  gap: 0.2rem 1rem;
  margin: 0;
  font-size: 0.75rem;
  color: var(--text-muted);
}
.ds-legend i { margin-right: 0.3rem; }

.ds-empty {
  color: var(--text-muted);
  font-size: 1rem;
}

/* The Legends block under the list. The title is a group head like the ones above it, so the
   section reads as one more part of the same page rather than a footnote. */
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
.ds-legends-about:hover { color: var(--accent); }
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
  margin: 0.8rem 0 0.1rem;
  font-size: 0.95rem;
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
