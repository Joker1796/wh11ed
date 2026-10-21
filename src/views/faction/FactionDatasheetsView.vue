<template>
  <div
    ref="gridRoot"
    class="faction-units-page"
  >
    <!-- Datasheets (lazy-loaded per faction from src/data/datasheets/<slug>.js) -->
    <!-- A tap on a unit (a chip, a Legendary Proxy, a Leader's bodyguard on a card shown here)
         opens it where the list is instead of leaving for its page: a modal on a phone, beside the
         list on a wide screen. Caught here, before the links' own navigation (utils/unitLink.js);
         a click that asks for a new tab still gets one. A right click or a long press on a chip
         opens its context menu (useLongPress). -->
    <section
      id="datasheets"
      class="fsection"
      @click.capture="onUnitClick"
      v-on="unitPress.listeners"
    >
      <h2 class="fsection-title ds-title">
        {{ labels.factionDatasheets }}
      </h2>
      <template v-if="datasheets.length">
        <!-- One box for the list's tools, the list and the unit beside it: a plain stack on a phone,
             on a wide screen a grid — the tools over the list in the left column, the unit in the
             right one from the top, the chapter bar across both (owner, 2026-10-21: the tools
             spanning the page left a band of nothing over the unit). -->
        <div
          ref="splitEl"
          class="ds-split"
          :class="{ 'rw-host': wide }"
        >
          <!-- Types the faction's own example queries while empty (useUnitSearchGhost). -->
          <div
            ref="dsSearchEl"
            class="typing-field ds-search-field"
          >
            <input
              v-model="dsQuery"
              type="search"
              class="ds-search"
              :placeholder="typing ? '' : labels.dsSearch"
              :aria-label="labels.dsSearch"
            >
            <TypingGhost
              v-if="typing && !dsQuery"
              :ghost="ghost"
            />
          </div>
          <!-- Global army choice (chapter + detachment), shared with the rule page.
             Chapter-less factions keep their datasheet list bar-free — a detachment
             picker filters nothing here. -->
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
              <!-- A type group folds (owner, 2026-10-21), open by default; a search opens them all,
                   so nothing it found is hidden. -->
              <h3
                class="ds-group-head"
                :class="{ folded: !groupOpen(g.key), 'after-folded': gi > 0 && !groupOpen(groupedDatasheets[gi - 1].key) }"
                :data-flip="'h:' + g.key"
              >
                <button
                  type="button"
                  class="ds-group-btn"
                  :aria-expanded="groupOpen(g.key)"
                  @click="toggleGroup(g.key)"
                >
                  <ChevronIcon
                    :turned="groupOpen(g.key)"
                    from="right"
                    to="down"
                  />
                  <span>{{ g.label }}</span>
                  <span class="ds-group-count">{{ g.sheets.length }}</span>
                </button>
              </h3>
              <CollapseTransition :show="groupOpen(g.key)">
                <TransitionGroup
                  name="sift"
                  tag="div"
                  class="ds-grid"
                >
                  <RouterLink
                    v-for="s in g.sheets"
                    :key="s.id"
                    :data-flip="s.id"
                    :data-unit="s.id"
                    :to="`/factions/${slug}/datasheets/${s.id}`"
                    class="ds-chip"
                    :class="{ picked: shown.includes(s.id) }"
                    :aria-current="shown.includes(s.id) ? 'true' : undefined"
                  >
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
                    <!-- The collection shown, as the roster catalogue shows it; set from the "…". -->
                    <span
                      v-if="isOwned(slug, s.id)"
                      class="legends-badge owned-badge"
                      :title="labels.rosterFilterOwned"
                      :aria-label="labels.rosterFilterOwned"
                    ><i class="wi wi-own-on" /></span>
                    <span
                      v-if="s.points"
                      class="ds-chip-pts"
                    >{{ ptsSummary(s.points) }}</span>
                    <!-- The chip's own actions (pin, collection, a new tab…): its context menu, hung
                       from the button (owner, 2026-10-21 — the two marks it replaced). -->
                    <button
                      type="button"
                      class="ds-more"
                      :title="labels.rosterMoreActions"
                      :aria-label="labels.rosterMoreActions"
                      aria-haspopup="menu"
                      @click.stop.prevent="openMenuAt(s, $event.currentTarget)"
                    >
                      <i class="wi wi-more" />
                    </button>
                  </RouterLink>
                </TransitionGroup>
              </CollapseTransition>
            </template>
            <!-- The prose half of a "Legends: <Faction>" publication (src/data/factionLegends.json).
             Sits under the list, not above it: a player who opened this page came for the units,
             and the intro is four paragraphs of GW's stance on Legends — folded until asked for.
             The proxies are the useful part and stay open: a retired unit with no datasheet of
             its own ("Ufthak Blackhawk") and the Codex sheet it is fielded as — the first Legends
             question a player sent us was exactly that, and this table already answered it in
             appdata. A search query narrows the proxies by the retired names, so typing the old
             unit's name finds its row even though no chip carries it. -->
            <ExpandTransition>
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
          </div>
          <!-- Wide screen: the chosen unit beside the list — or two, compared — in a column that
               stays put and scrolls on its own while the list scrolls with the page. -->
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
              @compare="comparing = !comparing"
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
      </template>
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
    <!-- The chip's context menu: at the pointer on a wide screen, the actions sheet on a phone. -->
    <ActionMenu
      v-model:open="menuOpen"
      :anchor="menu?.anchor"
      :title="menu?.name || ''"
      width="18rem"
    >
      <template v-if="menu">
        <button
          class="act-btn act-ico"
          @click="menuDo(() => openUnit(menu.id))"
        >
          <i class="wi wi-datasheet" />{{ labels.dsOpenUnit }}
        </button>
        <a
          :href="menuHref"
          target="_blank"
          rel="noopener"
          class="act-btn act-ico"
          @click="menuOpen = false"
        >
          <i class="wi wi-arrow-right" />{{ labels.dsOpenNewTab }}
        </a>
        <button
          v-if="wide && shown.length && !shown.includes(menu.id)"
          class="act-btn act-ico"
          @click="menuDo(() => compareWith(menu.id))"
        >
          <i class="wi wi-panes" />{{ labels.dsCompareWith.replace('{name}', menuShownName) }}
        </button>
        <button
          class="act-btn act-ico"
          @click="menuDo(() => toggleUnitFavorite(slug, menu.id))"
        >
          <i :class="isUnitFavorite(slug, menu.id) ? 'wi wi-pin-on' : 'wi wi-pin-off'" />{{ isUnitFavorite(slug, menu.id) ? labels.dsUnpinUnit : labels.dsPinUnit }}
        </button>
        <button
          class="act-btn act-ico"
          @click="menuDo(() => toggleOwned(slug, menu.id, menu.name))"
        >
          <i :class="isOwned(slug, menu.id) ? 'wi wi-own-on' : 'wi wi-own'" />{{ isOwned(slug, menu.id) ? labels.dsOwnRemove : labels.dsOwnAdd }}
        </button>
        <button
          class="act-btn act-ico"
          @click="menuDo(() => copyUnitName(menu.name))"
        >
          <i class="wi wi-copy" />{{ labels.dsCopyName }}
        </button>
        <button
          class="act-btn act-ico"
          @click="menuDo(() => shareFromMenu(menu))"
        >
          <i :class="canShare ? 'wi wi-share' : 'wi wi-link'" />{{ canShare ? labels.dsShare : labels.dsCopyLink }}
        </button>
      </template>
    </ActionMenu>
    <AppToast
      :show="!!toast"
      :text="toast"
      icon="wi wi-check"
      @close="toast = ''"
    />
  </div>
</template>

<script>
// Per faction, the type groups folded away — for the session, like the unit below.
const foldedGroups = new Map()
// Per faction, the unit last shown beside the list — for the session, not the device: the tab
// coming back (from the rules, from another faction) finds the unit it left.
const lastShown = new Map()
</script>

<script setup>
import ChevronIcon from '../../components/ChevronIcon.vue'
import TypingGhost from '../../components/TypingGhost.vue'
import { computed, nextTick, ref, watch } from 'vue'
import { useRoute } from 'vue-router'
import ExpandTransition from '../../components/ExpandTransition.vue'
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
import { useFlipMove } from '../../composables/useFlipMove.js'
import { reconcileFactionMarks } from '../../composables/useUserPrefs.js'
import { getItem, setItem } from '../../composables/safeStorage.js'
import { scrollToAnchor } from '../../composables/useRefNavigation.js'
import { foldName, preloadDatasheetTags, queryWords, TAG_MIN, unitTagHit, wordsIn } from '../../composables/datasheetTags.js'
import { useUnitSearchGhost } from '../../composables/useUnitSearchExamples.js'
import BaseModal from '../../components/BaseModal.vue'
import FactionUnitSheet from '../../components/FactionUnitSheet.vue'
import { useMediaQuery } from '../../composables/useMediaQuery.js'
import { useViewportFill } from '../../composables/useViewportFill.js'
import { unitLinkOf } from '../../utils/unitLink.js'
import ActionMenu from '../../components/ActionMenu.vue'
import AppToast from '../../components/AppToast.vue'
import { useLongPress } from '../../composables/useLongPress.js'
import { canShare, copyText, shareUnit } from '../../composables/useUnitShare.js'
import { localePath } from '../../router/locale.js'

const route = useRoute()
const { slug, faction } = useFactionPage()
const { locale } = useLocale()
const labels = computed(() => ui[locale.value])

// A unit opened from the list stays on this page (owner, 2026-10-04: the way back from a unit's
// page lost the reader's place in a ninety-unit list). The width the app's pickers switch at
// (AdaptivePicker) decides how: a phone shows it in a modal, a wide screen beside the list — one
// unit, or two compared side by side ("compare" on the first, then a tap in the list; a further
// tap swaps the second). Neither changes the address (owner): the unit's ⋯ shares its own page.
const wide = useMediaQuery('(min-width: 901px)')
const modalUnit = ref(null)
const shown = ref([])
const comparing = ref(false)

function onUnitClick(e) {
  // A unit beside the list answers its own links (FactionUnitSheet's `open-unit`).
  if (e.target instanceof Element && e.target.closest('.ds-side')) return
  const id = unitLinkOf(e, slug.value)
  if (!id) return
  e.preventDefault()
  openUnit(id)
}
function openUnit(id) {
  if (!wide.value) { modalUnit.value = id; return }
  const [first] = shown.value
  if (first && (comparing.value || shown.value.length === 2)) {
    if (id !== first) shown.value = [first, id]
    comparing.value = false
    return
  }
  shown.value = [id]
}
// A unit shown beside the list takes the unit its card links to in its own place.
function replaceShown(i, id) {
  if (shown.value.includes(id)) return
  shown.value = shown.value.map((x, j) => (j === i ? id : x))
}
function compareWith(id) {
  const [first] = shown.value
  if (first && first !== id) shown.value = [first, id]
  comparing.value = false
}
function closeShown(i) {
  shown.value = shown.value.filter((_, j) => j !== i)
  comparing.value = false
}

// The chip's context menu (right click / long press): the unit's own actions without opening it,
// and the new tab a long press cannot otherwise ask for on a phone (owner, 2026-10-21).
const menu = ref(null)
const menuOpen = ref(false)
const unitPress = useLongPress('.ds-chip[data-unit]', (el, anchor) => {
  const sheet = datasheets.value.find((d) => d.id === el.dataset.unit)
  if (!sheet) return
  menu.value = { id: sheet.id, name: sheet.name, anchor }
  menuOpen.value = true
})
const menuHref = computed(() => (menu.value ? localePath(`/factions/${slug.value}/datasheets/${menu.value.id}`, locale.value) : ''))
const menuShownName = computed(() => datasheets.value.find((d) => d.id === shown.value[0])?.name || '')
function menuDo(fn) { menuOpen.value = false; fn() }
// The row's "…": the same menu, hung from the button.
function openMenuAt(sheet, btn) {
  const r = btn.getBoundingClientRect()
  menu.value = { id: sheet.id, name: sheet.name, anchor: { left: r.left, right: r.right, top: r.top, bottom: r.bottom } }
  menuOpen.value = true
}

// "Copied" has nowhere to show on a menu that has closed: a toast says it.
const toast = ref('')
let toastTimer = null
function say(text) {
  toast.value = text
  clearTimeout(toastTimer)
  toastTimer = setTimeout(() => { toast.value = '' }, 1500)
}
async function copyUnitName(name) { if (await copyText(name)) say(labels.value.dsCopied) }
async function shareFromMenu(m) { if (await shareUnit(slug.value, m.id, m.name, locale.value)) say(labels.value.dsLinkCopied) }

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
    // A Chapter carries the Codex publication (`of`), whose RU intro lives under the Codex slug.
    try { ru = (await legendsRuLoader())?.[en.of || s] || null } catch { ru = null }
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
    shown.value = []
    comparing.value = false
    modalUnit.value = null
    if (!s) return
    const [list, leg] = await Promise.all([loadDatasheets(s), loadLegends(s)])
    // guard against a stale resolve after a rapid route change
    if (route.params.slug !== s) return
    if (list) datasheets.value = list
    legends.value = leg
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

const { isUnitFavorite, toggleUnitFavorite, favoriteUnitIds, pinnedUnitsFrom, unpinnedUnitGroupsFrom } = useFavorites()
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

// The query also finds a unit by an ability or keyword ("deep strike", "fly") — the same tags the
// global search and the roster catalogue match (datasheetTags.js), loaded with the first query
// long enough to use them.
watch(dsQuery, (q) => { if (q.trim().length >= TAG_MIN) preloadDatasheetTags() })
const dsSearchEl = ref(null)
const { ghost, typing } = useUnitSearchGhost({ slug, locale, query: dsQuery, el: dsSearchEl })
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
  // "Pinned" on top, and a pinned unit LEAVES its type group (owner, 2026-09-28 — as the faction
  // lists do; useFavorites holds the split for both). Built from the filtered list, so search and
  // the chapter still apply, and only shown while a pinned unit survives the filter.
  const groups = unpinnedUnitGroupsFrom(slug.value, buckets)
  const favs = pinnedUnitsFrom(slug.value, filteredDatasheets.value)
  if (favs.length) groups.unshift({ key: 'favorites', label: l.favPinnedGroup, sheets: favs })
  return groups
})
// A pin slides the card from its group to the top as one card (useFlipMove, the faction lists'
// recipe); the chips and the headings carry `data-flip`.
const gridRoot = ref(null)
useFlipMove(() => favoriteUnitIds(slug.value), gridRoot)

// The folded type groups: this faction's, kept for the session (foldedGroups above).
const folded = ref(new Set())
watch(slug, (s) => { folded.value = new Set(foldedGroups.get(s) || []) }, { immediate: true })
const groupOpen = (key) => !!dsQuery.value.trim() || !folded.value.has(key)
function toggleGroup(key) {
  const next = new Set(folded.value)
  if (groupOpen(key)) next.add(key)
  else next.delete(key)
  folded.value = next
  foldedGroups.set(slug.value, next)
}

// A wide screen never shows an empty column beside the list (owner, 2026-10-21): the unit this
// faction last showed in this session, else the list's first. Only the "pick one to compare" note
// is ever an empty box.
function showSomething() {
  if (!wide.value || !loaded.value || shown.value.length) return
  const last = lastShown.get(slug.value)
  const id = last && datasheets.value.some((d) => d.id === last) ? last : groupedDatasheets.value[0]?.sheets[0]?.id
  if (id) shown.value = [id]
}
watch([wide, loaded], showSomething, { immediate: true })

// A wide screen does not scroll the page: the list and the unit scroll, each in its own column, in
// a box as tall as the window has left under the hero and the tabs (owner, 2026-10-21 — three
// scrollbars, the page's among them). The roster builder's recipe (useViewportFill, `.rw-host`).
const splitEl = ref(null)
const { measure: measureFill } = useViewportFill(splitEl)
watch([wide, loaded], () => nextTick(measureFill))
watch(shown, (ids) => { if (ids[0]) lastShown.set(slug.value, ids[0]) })

</script>

<style scoped>

.ds-search-field {
  max-width: 24rem;
  margin-bottom: 0.55rem;
  --typing-pad: calc(0.5rem + 1px) calc(0.7rem + 1px);
  --typing-size: 0.9rem;
}

.ds-search {
  width: 100%;
  padding: 0.5rem 0.7rem;
  font-size: 0.9rem;
  color: var(--text-primary);
  background: var(--bg-card);
  border: 1px solid var(--border);
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

.ds-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(180px, 1fr));
  gap: 0.35rem;
}

.ds-chip {
  position: relative;
  /* A long press is the chip's context menu (useLongPress): not iOS's link preview, not a text
     selection. */
  -webkit-touch-callout: none;
  -webkit-user-select: none;
  user-select: none;
  /* The name on its own line; under it the price at the left (the Legends and collection badges
     beside it) and a Space Marines unit's Chapter at the right — on the price's line where it fits,
     on a line of its own, still at the right, where it does not (owner, 2026-10-21). */
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  /* A chip stretched to a taller neighbour's row keeps its lines at the top. */
  align-content: flex-start;
  gap: 0.05rem 0.45rem;
  text-align: left;
  /* The top right corner is the "…"'s, so a name never runs under it. */
  padding: 0.35rem 2.1rem 0.35rem 0.55rem;
  background: var(--bg-card);
  border: 1px solid var(--border);
  cursor: pointer;
  text-decoration: none;
  transition: background var(--motion-fast), border-color var(--motion-fast);
}

/* The chip's "…" in its top right corner, where the two marks stood until 2026-10-21. A row on a
   wide screen puts it on the name's line instead (below). */
.ds-more {
  position: absolute;
  top: 0.2rem;
  right: 0.15rem;
  display: grid;
  place-items: center;
  width: 1.75rem;
  height: 1.75rem;
  padding: 0;
  border: 0;
  background: none;
  color: var(--text-muted);
  cursor: pointer;
}
@media (hover: hover) {
  .ds-more:hover { color: var(--text-primary); background: color-mix(in srgb, var(--accent) 12%, transparent); }
}
.ds-chip-name { flex: 1 1 100%; min-width: 0; }
.ds-chip-pts { order: 2; }
.ds-chip > .legends-badge { order: 3; }
.ds-chip-chapter { order: 4; margin-left: auto; margin-right: -1.75rem; } /* into the "…"'s gutter: the "…" holds only the top corner */

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
  color: var(--accent-ink);
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

/* The Legends switch's row. */
.ds-tools {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: space-between;
  gap: 0.5rem 1rem;
  margin: 0.5rem 0 0;
}

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
  .ds-side { grid-area: side; }
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
  .ds-list .ds-grid { grid-template-columns: minmax(0, 1fr); gap: 0; }
  /* A row: the name and what is said about it on one line, the two marks side by side at the
     right. The rows touch, sharing one edge (components/CLAUDE.md, Borders that touch). */
  /* A row: the chip's own two lines, the "…" moved onto the name's line — the name's basis leaves
     it exactly its room, so what follows wraps. The rows touch, sharing one edge
     (components/CLAUDE.md, Borders that touch). */
  .ds-list .ds-chip {
    min-height: 0;
    padding: 0.3rem 0.3rem 0.3rem 0.55rem;
  }
  .ds-list .ds-chip + .ds-chip { margin-top: -1px; }
  .ds-list .ds-chip:hover,
  .ds-list .ds-chip.picked { position: relative; z-index: 1; }
  .ds-list .ds-chip-name { flex-basis: calc(100% - 2.2rem); font-size: 1rem; }
  .ds-list .ds-more { order: 1; }
  .ds-list .ds-chip-chapter { margin-right: 0; padding-right: 0.25rem; }
  .ds-list .ds-more { position: static; height: 1.6rem; }
  .ds-chip.picked {
    background: color-mix(in srgb, var(--accent) 12%, var(--bg-card));
    border-color: var(--accent);
  }

  /* The unit's column: the full height of the box, scrolling inside itself. */
  .ds-side {
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
