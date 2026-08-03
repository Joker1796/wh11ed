<template>
  <FactionLayout>
    <!-- Datasheets (lazy-loaded per faction from src/data/datasheets/<slug>.js) -->
    <section class="fsection" id="datasheets">
      <h2 class="fsection-title">{{ labels.factionDatasheets }}</h2>
      <template v-if="datasheets.length">
        <input
          v-model="dsQuery"
          type="search"
          class="ds-search"
          :placeholder="labels.dsSearch"
          :aria-label="labels.dsSearch"
        />
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
        <template v-for="g in groupedDatasheets" :key="g.key">
          <h3 class="ds-group-head">{{ g.label }}</h3>
          <div class="ds-grid">
            <RouterLink
              v-for="s in g.sheets"
              :key="s.id"
              :to="`/factions/${slug}/datasheets/${s.id}`"
              class="ds-chip"
            >
              <button
                type="button"
                class="ds-fav"
                :class="{ on: isUnitFavorite(slug, s.id) }"
                :title="isUnitFavorite(slug, s.id) ? labels.dsFavRemove : labels.dsFavAdd"
                :aria-label="isUnitFavorite(slug, s.id) ? labels.dsFavRemove : labels.dsFavAdd"
                :aria-pressed="isUnitFavorite(slug, s.id)"
                @click.stop.prevent="toggleUnitFavorite(slug, s.id)"
              >
                <i :class="isUnitFavorite(slug, s.id) ? 'bi bi-pin-angle-fill' : 'bi bi-pin-angle'"></i>
              </button>
              <span class="ds-chip-name">{{ s.name }}</span>
              <span v-if="chapters.length && !chapter && chapterOf(s)" class="ds-chip-chapter">{{ chapterOf(s) }}</span>
              <span v-if="s.points" class="ds-chip-pts">{{ ptsSummary(s.points) }}</span>
            </RouterLink>
          </div>
        </template>
      </template>
      <p v-else-if="loaded" class="ds-empty">{{ labels.factionsSoon }}</p>
    </section>
  </FactionLayout>
</template>

<script setup>
import { computed, ref, watch } from 'vue'
import { useRoute } from 'vue-router'
import FactionLayout from '../../components/FactionLayout.vue'
import FactionPickerBar from '../../components/FactionPickerBar.vue'
import { loadDatasheets, ptsSummary } from '../../data/datasheets/index.js'
import { ui } from '../../i18n/ui.js'
import { useFactionPage } from '../../composables/useFactionPage.js'
import { useLocale } from '../../composables/useLocale.js'
import { useFactionChoice } from '../../composables/useFactionChoice.js'
import { useFavorites } from '../../composables/useFavorites.js'

const route = useRoute()
const { slug, faction } = useFactionPage()
const { locale } = useLocale()
const labels = computed(() => ui[locale.value])

// Datasheets are lazy-loaded per faction (each src/data/datasheets/<slug>.js is its own
// chunk) so the heavy unit data never rides in the shared view bundle.
const datasheets = ref([])
const loaded = ref(false)
const dsQuery = ref('')
watch(
  () => route.params.slug,
  async (s) => {
    datasheets.value = []
    loaded.value = false
    dsQuery.value = ''
    if (!s) return
    const list = await loadDatasheets(s)
    // guard against a stale resolve after a rapid route change
    if (route.params.slug !== s) return
    if (list) datasheets.value = list
    loaded.value = true
  },
  { immediate: true },
)

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

// A unit's Chapter = the second Faction keyword on its datasheet. Order in
// factionKeywords[] is not stable (Pedro Kantor lists Adeptus Astartes first),
// so find the non-umbrella keyword instead of taking [0].
const UMBRELLA_KEYWORDS = new Set(['Adeptus Astartes', 'Imperium'])
function chapterOf(s) {
  return (s.factionKeywords || []).find((k) => !UMBRELLA_KEYWORDS.has(k))
}

const filteredDatasheets = computed(() => {
  const q = dsQuery.value.trim().toLowerCase()
  const c = chapter.value
  return datasheets.value.filter((s) => {
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
  if (favs.length) groups.unshift({ key: 'favorites', label: l.dsGroupFavorites, sheets: favs })
  return groups
})

</script>

<style scoped>
.fsection {
  margin-bottom: 2.5rem;
  scroll-margin-top: var(--header-total);
}

.fsection-title {
  font-family: var(--font-display);
  font-size: 2rem;
  font-weight: 400;
  color: var(--text-primary);
  margin-bottom: 0.8rem;
}

.ds-search {
  width: 100%;
  max-width: 24rem;
  padding: 0.5rem 0.7rem;
  font-size: 0.9rem;
  color: var(--text-primary);
  background: var(--bg-card);
  border: 1px solid var(--border);
  border-radius: 4px;
  margin-bottom: 0.9rem;
}

.ds-search:focus {
  outline: none;
  border-color: var(--accent);
}

/* The sticky chapter/detachment bar itself lives in FactionPickerBar; here we only
   restore the list's breathing room under it. */
.ds-picker-bar {
  margin-bottom: 0.9rem;
}

.ds-group-head {
  font-family: var(--font-display);
  font-size: 1.3rem;
  font-weight: 400;
  text-transform: uppercase;
  letter-spacing: 0.5px;
  color: var(--accent);
  margin: 1.4rem 0 0.6rem;
  padding-bottom: 0.3rem;
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
  background: var(--bg-card);
  border: 1px solid var(--border);
  border-radius: 4px;
  cursor: pointer;
  text-decoration: none;
  transition: background var(--motion-fast), border-color var(--motion-fast);
}

/* Favourite toggle pinned to the chip's top-right corner. It sits inside the RouterLink,
   so the click handler stops propagation / prevents navigation. */
.ds-fav {
  position: absolute;
  top: 0.2rem;
  right: 0.25rem;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 1.55rem;
  height: 1.55rem;
  padding: 0;
  background: none;
  border: none;
  border-radius: 4px;
  color: var(--text-muted);
  font-size: 0.85rem;
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

.ds-chip-pts {
  font-family: var(--font-mono);
  font-size: 0.68rem;
  font-weight: 700;
  color: var(--text-muted);
  white-space: nowrap;
}

.ds-empty {
  color: var(--text-muted);
  font-size: 1rem;
}

@media (max-width: 640px) {
  .fsection-title { font-size: 1.6rem; }
}
</style>
