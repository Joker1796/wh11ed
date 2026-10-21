<template>
  <div
    ref="gridRoot"
    class="faction-units-page"
  >
    <!-- A faction's units (lazy-loaded per faction from src/data/datasheets/<slug>.js). A tap on a
         unit — a chip, a Legendary Proxy, a Leader's bodyguard on a card shown here — opens it
         where the list is instead of leaving for its page: a modal on a phone, beside the list on
         a wide screen (useUnitPicks). Caught here, before the links' own navigation
         (utils/unitLink.js); a click that asks for a new tab still gets one. A right click or a
         long press on a chip opens its menu (useLongPress). -->
    <section
      id="datasheets"
      class="fsection"
      @click.capture="onUnitClick"
      v-on="unitPress.listeners"
    >
      <h2 class="fsection-title ds-title">
        {{ labels.factionDatasheets }}
      </h2>
      <!-- One box for the list's tools, the list and the unit beside it: a plain stack on a phone;
           on a wide screen a grid that fills the window — the tools over the list in the left
           column, the unit in the right one from the top, and only the two columns scroll. -->
      <div
        v-if="datasheets.length"
        ref="splitEl"
        class="ds-split"
        :class="{ 'rw-host': wide }"
      >
        <UnitSearchField
          v-model="dsQuery"
          class="ds-search-field"
          input-class="ds-search"
          :slug="slug"
          :placeholder="labels.dsSearch"
        />
        <!-- The army choice (Chapter + detachment), shared with the rule page. Chapter-less
             factions keep their list bar-free — a detachment picker filters nothing here. -->
        <FactionPickerBar
          v-if="chapters.length"
          class="ds-picker-bar"
          :inline="wide"
          :slug="slug"
          :detachments="detachments"
          :chapters="chapters"
        />
        <!-- The Legends switch. Legends sheets are listed with everything else and marked, not
             hidden — a rule GW still publishes is a rule somebody is reading. The switch is for the
             player building a matched-play list, and only appears for the factions that have any. -->
        <div class="ds-tools">
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
        <div class="ds-list">
          <template
            v-for="(g, gi) in groupedDatasheets"
            :key="g.key"
          >
            <!-- A type group folds (useGroupFolds), open by default. -->
            <h3
              class="ds-group-head"
              :class="{ folded: !isOpen(g.key), 'after-folded': gi > 0 && !isOpen(groupedDatasheets[gi - 1].key) }"
              :data-flip="'h:' + g.key"
            >
              <button
                type="button"
                class="ds-group-btn"
                :aria-expanded="isOpen(g.key)"
                @click="toggleGroup(g.key)"
              >
                <ChevronIcon
                  :turned="isOpen(g.key)"
                  from="right"
                  to="down"
                />
                <span>{{ g.label }}</span>
                <span class="ds-group-count">{{ g.sheets.length }}</span>
              </button>
            </h3>
            <CollapseTransition :show="isOpen(g.key)">
              <TransitionGroup
                name="sift"
                tag="div"
                class="ds-grid"
              >
                <FactionUnitChip
                  v-for="s in g.sheets"
                  :key="s.id"
                  :data-flip="s.id"
                  :slug="slug"
                  :sheet="s"
                  :chapter="chapters.length && !chapter ? chapterOf(s) || '' : ''"
                  :picked="shown.includes(s.id)"
                  :row="wide"
                  @more="openMenuAt(s, $event)"
                />
              </TransitionGroup>
            </CollapseTransition>
          </template>
          <FactionLegends
            :slug="slug"
            :query="dsQuery"
          >
            <template #head="{ title }">
              <h3 class="ds-group-head">
                {{ title }}
              </h3>
            </template>
          </FactionLegends>
        </div>
        <!-- Wide screen: the chosen unit beside the list — or two, compared. -->
        <aside
          v-if="wide"
          class="ds-side"
          :class="{ 'ds-side--pair': shown.length === 2 || comparing }"
        >
          <FactionUnitSheet
            v-for="(id, i) in shown"
            :key="id"
            :slug="slug"
            :unit-id="id"
            :datasheets="datasheets"
            in-place
            :compare="shown.length === 1 ? (comparing ? 'on' : 'off') : ''"
            :closable="shown.length === 2"
            @compare="toggleCompare"
            @close="closeShown(i)"
            @open-unit="replaceShown(i, $event)"
          />
          <p
            v-if="!shown.length || comparing"
            class="empty-note ds-side-note"
          >
            {{ comparing ? labels.dsComparePick : labels.dsUnitPick }}
          </p>
        </aside>
      </div>
      <p
        v-else-if="loaded"
        class="ds-empty"
      >
        {{ labels.factionsSoon }}
      </p>
    </section>
    <!-- Phone: the unit in a modal over the list, which stays exactly where it was. The unit's
         plate is the dialog's header (and its name), the card scrolls under it. -->
    <BaseModal
      v-if="modalUnit"
      max-width="640px"
      max-height="92dvh"
      @close="modalUnit = null"
    >
      <template #header="{ close, titleId }">
        <FactionUnitSheet
          :key="modalUnit"
          :slug="slug"
          :unit-id="modalUnit"
          :datasheets="datasheets"
          :title-id="titleId"
          contained
          in-place
          closable
          @close="close"
          @open-unit="modalUnit = $event"
        />
      </template>
    </BaseModal>
    <FactionUnitMenu
      v-model:open="menuOpen"
      :slug="slug"
      :unit="menu"
      :anchor="menu?.anchor"
      :can-compare="wide"
      @open-unit="openUnit"
      @compare="addToCompare"
    />
  </div>
</template>

<script setup>
import { computed, nextTick, ref, watch } from 'vue'
import { useRoute } from 'vue-router'
import BaseModal from '../../components/BaseModal.vue'
import ChevronIcon from '../../components/ChevronIcon.vue'
import CollapseTransition from '../../components/CollapseTransition.vue'
import FactionLegends from '../../components/FactionLegends.vue'
import FactionPickerBar from '../../components/FactionPickerBar.vue'
import FactionUnitChip from '../../components/FactionUnitChip.vue'
import FactionUnitMenu from '../../components/FactionUnitMenu.vue'
import FactionUnitSheet from '../../components/FactionUnitSheet.vue'
import UnitSearchField from '../../components/UnitSearchField.vue'
import { loadDatasheets } from '../../data/datasheets/index.js'
import { ui } from '../../i18n/ui.js'
import { useFactionPage } from '../../composables/useFactionPage.js'
import { useLocale } from '../../composables/useLocale.js'
import { useFactionChoice } from '../../composables/useFactionChoice.js'
import { useFavorites } from '../../composables/useFavorites.js'
import { useFlipMove } from '../../composables/useFlipMove.js'
import { useGroupFolds } from '../../composables/useGroupFolds.js'
import { useLongPress } from '../../composables/useLongPress.js'
import { useUnitPicks } from '../../composables/useUnitPicks.js'
import { useViewportFill } from '../../composables/useViewportFill.js'
import { reconcileFactionMarks } from '../../composables/useUserPrefs.js'
import { getItem, setItem } from '../../composables/safeStorage.js'
import { scrollToAnchor } from '../../composables/useRefNavigation.js'
import { foldName, preloadDatasheetTags, queryWords, TAG_MIN, unitTagHit, wordsIn } from '../../composables/datasheetTags.js'
import { chapterOf, groupByType } from '../../utils/datasheetGroups.js'
import { unitLinkOf } from '../../utils/unitLink.js'

const route = useRoute()
const { slug, faction } = useFactionPage()
const { locale } = useLocale()
const labels = computed(() => ui[locale.value])

// Datasheets are lazy-loaded per faction (each src/data/datasheets/<slug>.js is its own
// chunk) so the heavy unit data never rides in the shared view bundle.
const datasheets = ref([])
const loaded = ref(false)
const dsQuery = ref('')

// Where a unit opened from the list shows (useUnitPicks): a modal on a phone, beside the list on a
// wide screen — one, or two compared.
const {
  wide, modalUnit, shown, comparing,
  open: openUnit, addToCompare, replace: replaceShown, close: closeShown, toggleCompare, reset: resetPicks,
} = useUnitPicks({
  slug,
  loaded,
  exists: (id) => datasheets.value.some((d) => d.id === id),
  firstId: () => groupedDatasheets.value[0]?.sheets[0]?.id,
})

function onUnitClick(e) {
  // A unit beside the list answers its own links (FactionUnitSheet's `open-unit`).
  if (e.target instanceof Element && e.target.closest('.ds-side')) return
  const id = unitLinkOf(e, slug.value)
  if (!id) return
  e.preventDefault()
  openUnit(id)
}

// A unit's menu (FactionUnitMenu): from its "…", a right click or a long press on its chip.
const menu = ref(null)
const menuOpen = ref(false)
function openMenu(sheet, anchor) {
  menu.value = { id: sheet.id, name: sheet.name, anchor }
  menuOpen.value = true
}
const unitPress = useLongPress('.ds-chip[data-unit]', (el, anchor) => {
  const sheet = datasheets.value.find((d) => d.id === el.dataset.unit)
  if (sheet) openMenu(sheet, anchor)
})
function openMenuAt(sheet, btn) {
  const r = btn.getBoundingClientRect()
  openMenu(sheet, { left: r.left, right: r.right, top: r.top, bottom: r.bottom })
}

watch(
  () => route.params.slug,
  async (s) => {
    datasheets.value = []
    loaded.value = false
    dsQuery.value = ''
    resetPicks()
    if (!s) return
    const list = await loadDatasheets(s)
    // guard against a stale resolve after a rapid route change
    if (route.params.slug !== s) return
    if (list) datasheets.value = list
    loaded.value = true
    // This is the one place that knows which datasheets this faction actually ships right now, so
    // it is where a player's marks catch up with a renamed or retired unit (useUserPrefs).
    if (list?.length) reconcileFactionMarks(s, new Set(list.map((d) => d.id)))
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

const { favoriteUnitIds, pinnedUnitsFrom, unpinnedUnitGroupsFrom } = useFavorites()

// Per device, like the roster catalogue's own filters (RosterUnitBrowser.vue).
const hideLegends = ref(getItem('wh11ed-ds-filter-legends') === '1')
watch(hideLegends, (v) => setItem('wh11ed-ds-filter-legends', v ? '1' : ''))
const hasLegends = computed(() => datasheets.value.some((s) => s.legends))

// The query also finds a unit by an ability or keyword ("deep strike", "fly") — the same tags the
// global search and the roster catalogue match (datasheetTags.js), loaded with the first query
// long enough to use them.
watch(dsQuery, (q) => { if (q.trim().length >= TAG_MIN) preloadDatasheetTags() })
const filteredDatasheets = computed(() => {
  const q = dsQuery.value.trim().toLowerCase()
  const qf = foldName(q)
  const words = queryWords(q)
  const c = chapter.value
  return datasheets.value.filter((s) => {
    if (hideLegends.value && s.legends) return false
    if (q && !wordsIn(s.name, words) && !unitTagHit(slug.value, s.id, qf)) return false
    if (c) {
      // Chapter-less sheets are generic Adeptus Astartes units, legal in any Chapter's army.
      const sc = chapterOf(s)
      if (sc && sc !== c) return false
    }
    return true
  })
})

// Codex-style type groups (utils/datasheetGroups.js), with "Pinned" on top: a pinned unit LEAVES
// its type group (owner, 2026-09-28 — as the faction lists do; useFavorites holds the split for
// both). Built from the filtered list, so search and the chapter still apply, and only shown while
// a pinned unit survives the filter.
const groupedDatasheets = computed(() => {
  const groups = unpinnedUnitGroupsFrom(slug.value, groupByType(filteredDatasheets.value, labels.value))
  const favs = pinnedUnitsFrom(slug.value, filteredDatasheets.value)
  if (favs.length) groups.unshift({ key: 'favorites', label: labels.value.favPinnedGroup, sheets: favs })
  return groups
})
// A pin slides the card from its group to the top as one card (useFlipMove, the faction lists'
// recipe); the chips and the headings carry `data-flip`.
const gridRoot = ref(null)
useFlipMove(() => favoriteUnitIds(slug.value), gridRoot)

// A search opens every group: nothing it found may hide in a folded one.
const { isOpen, toggle: toggleGroup } = useGroupFolds(slug, () => !!dsQuery.value.trim())

// A wide screen does not scroll the page: the list and the unit scroll, each in its own column, in
// a box as tall as the window has left under the hero and the tabs (owner, 2026-10-21 — three
// scrollbars, the page's among them). The roster builder's recipe (useViewportFill, `.rw-host`).
const splitEl = ref(null)
const { measure: measureFill } = useViewportFill(splitEl)
watch([wide, loaded], () => nextTick(measureFill))
</script>

<style scoped>
.ds-search-field {
  max-width: 24rem;
  margin-bottom: 0.55rem;
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
  color: var(--text-muted);
  margin: 1rem 0 0.4rem;
  padding-bottom: 0.25rem;
  border-bottom: 1px solid var(--border);
}
/* Folded groups stand as a tight list of headings: the space a heading keeps under itself for its
   units, and over itself to part from the units above, has nothing to part when those are folded
   (owner, 2026-10-21). */
.ds-group-head.folded { margin-bottom: 0; }
.ds-group-head.after-folded { margin-top: 0.35rem; }

.ds-group-btn {
  display: flex;
  align-items: center;
  gap: 0.4rem;
  width: 100%;
  padding: 0;
  border: 0;
  background: none;
  font: inherit;
  letter-spacing: inherit;
  text-transform: inherit;
  color: inherit;
  text-align: left;
  cursor: pointer;
}
.ds-group-btn .wi { font-size: 0.75rem; }
@media (hover: hover) { .ds-group-btn:hover { color: var(--text-primary); } }
/* How many units the group holds — what a folded group still tells you. */
.ds-group-count {
  margin-left: auto;
  font-family: var(--font-mono);
  font-size: 0.75rem;
  letter-spacing: 0;
}

.ds-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(180px, 1fr));
  gap: 0.35rem;
}

/* The Legends switch's row. */
.ds-tools {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: space-between;
  gap: 0.5rem 1rem;
  margin: 0.5rem 0 0;
}
.ds-legends-filter {
  margin: 0;
  padding-block: 0.35rem;
}

.ds-empty {
  color: var(--text-muted);
  font-size: 1rem;
}

/* ── Wide screen: the list as rows on the left, the unit(s) on the right ──
   Below 901px nothing here applies: the grid of chips, and a unit opens in a modal. */
@media (min-width: 901px) {
  /* The tools stack over the list in the left column; the unit takes the right one from the top.
     The list's row is the flexible one, so a unit taller than a short (searched) list stretches
     that row and never pulls the tools apart. */
  .ds-split {
    display: grid;
    grid-template-columns: minmax(14rem, 18rem) minmax(0, 1fr);
    grid-template-rows: auto auto auto minmax(0, 1fr);
    grid-template-areas:
      "bar    side"
      "search side"
      "tools  side"
      "list   side";
    column-gap: 1rem;
    align-items: start;
  }
  .fsection { margin-bottom: 0; }
  .ds-picker-bar { grid-area: bar; }
  .ds-search-field { grid-area: search; max-width: none; }
  .ds-tools { grid-area: tools; margin-top: 0; }
  /* The two scrollers. The list's own room for the scrollbar keeps the rows clear of it. */
  .ds-list { grid-area: list; min-width: 0; min-height: 0; height: 100%; overflow-y: auto; overscroll-behavior: contain; padding-right: 0.35rem; }
  /* The list's heading only repeats the tab it hangs from (components/CLAUDE.md, vertical
     density): out of sight here, still the section's name for a screen reader. */
  .ds-title {
    position: absolute;
    width: 1px;
    height: 1px;
    overflow: hidden;
    clip-path: inset(50%);
    white-space: nowrap;
  }
  /* Rows (FactionUnitChip's `row`), touching. */
  .ds-list .ds-grid { grid-template-columns: minmax(0, 1fr); gap: 0; }

  /* The unit's column: the full height of the box, scrolling inside itself. */
  .ds-side {
    grid-area: side;
    align-self: stretch;
    min-height: 0;
    overflow-y: auto;
    overscroll-behavior: contain;
    min-width: 0;
    display: grid;
    gap: 0.6rem;
    align-content: start;
  }
  .ds-side--pair { grid-template-columns: repeat(2, minmax(0, 1fr)); align-items: start; }
  .ds-side-note {
    margin: 0;
    padding: 2rem 1rem;
    border: 1px dashed var(--border);
    text-align: center;
  }
}
</style>
