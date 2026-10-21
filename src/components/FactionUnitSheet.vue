<template>
  <!-- One unit of a faction, whole: the name plate with its actions, the card, and the lists its
       keywords open. The unit page draws it, and so does the faction's unit list — in a modal on a
       phone, beside the list on a wide screen (one or two of them, side by side). -->
  <!-- One container for the plate and the card: the card bleeds to the screen edge by its
       OWN width (DatasheetCard's dscard container, ≤480px), and the plate has to bleed on
       exactly the same condition — a viewport query put the two out of step by the page
       gutter, and a window ~500px wide showed an inset plate over a full-bleed card. -->
  <div
    v-if="sheet"
    class="ds-page"
    :class="{ 'ds-contained fa-themed': contained }"
    :style="contained ? accentStyle : undefined"
    @click.capture="onLinkCapture"
  >
    <div class="ds-head">
      <!-- No Legends mark up here: the name plate is the first thing on a phone's screen and
           anything beside the name either wrapped the name or took a row. The badge sits in
           the statline's spare space instead (DatasheetCard). -->
      <h2
        :id="titleId || undefined"
        class="ds-title"
      >
        <span class="ds-title-name">{{ shownName }}</span> <span
          v-if="sheet.baseSize"
          class="ds-title-base"
        >({{ fmtBase(sheet.baseSize) }})</span>
      </h2>
      <div class="ds-actions">
        <!-- A retired unit's page (`proxy`) has no pin or collection mark: both belong to real
             units and travel with the account. -->
        <button
          v-if="!proxy"
          data-press="pop"
          type="button"
          class="ds-btn"
          :class="{ 'ds-btn-pin-on': fav }"
          data-press-sound="toggle"
          :title="fav ? labels.dsUnpinUnit : labels.dsPinUnit"
          :aria-label="fav ? labels.dsUnpinUnit : labels.dsPinUnit"
          :aria-pressed="fav"
          @click="toggleUnitFavorite(slug, sheet.id)"
        >
          <i :class="fav ? 'wi wi-pin-on' : 'wi wi-pin-off'" />
        </button>
        <!-- "I own this one" — the mark the roster catalogue shows on its rows and can filter
             by. Same treatment as the pin: state is the outline→filled swap, no highlight. -->
        <button
          v-if="!proxy"
          data-press="pop"
          type="button"
          class="ds-btn"
          :class="{ 'ds-btn-pin-on': owned }"
          data-press-sound="toggle"
          :title="owned ? labels.dsOwnRemove : labels.dsOwnAdd"
          :aria-label="owned ? labels.dsOwnRemove : labels.dsOwnAdd"
          :aria-pressed="owned"
          @click="toggleOwned(slug, sheet.id, sheet.name)"
        >
          <i :class="owned ? 'wi wi-own-on' : 'wi wi-own'" />
        </button>
        <button
          type="button"
          class="ds-btn"
          :class="{ copied }"
          :title="copied ? labels.dsCopied : labels.dsCopyName"
          :aria-label="copied ? labels.dsCopied : labels.dsCopyName"
          data-press="pop"
          @click="copyName"
        >
          <i :class="copied ? 'wi wi-check' : 'wi wi-copy'" />
        </button>
        <!-- A link to this unit's own page: the phone's share sheet where there is one,
             otherwise copied. The list shows units without changing the address, so this is
             how a unit seen there is handed on. -->
        <button
          type="button"
          class="ds-btn"
          :class="{ copied: linkCopied }"
          :title="shareLabel"
          :aria-label="shareLabel"
          data-press="pop"
          @click="shareUnit"
        >
          <i :class="linkCopied ? 'wi wi-check' : canShare ? 'wi wi-share' : 'wi wi-link'" />
        </button>
        <button
          v-if="sheet.flavor && !proxy"
          ref="loreBtn"
          type="button"
          class="ds-btn"
          :class="{ copied: loreOpen }"
          :title="loreOpen ? labels.loreHide : labels.loreShow"
          :aria-label="loreOpen ? labels.loreHide : labels.loreShow"
          :aria-pressed="loreOpen"
          data-press="pop"
          @click="toggleLorePopover"
        >
          <i :class="loreOpen ? 'wi wi-lore-on' : 'wi wi-lore'" />
        </button>
        <a
          :href="imageUrl"
          target="_blank"
          rel="noopener noreferrer"
          class="ds-btn"
          :title="labels.dsSearchImage"
          :aria-label="labels.dsSearchImage"
        >
          <i class="wi wi-image" />
        </a>
        <!-- On a phone the buttons above fold into this one (the container query below
             swaps them): five 30px squares beside a name like "Kill Team Cassius" left the name
             two words to a line (a screenshot, 2026-09-19). The sheet it opens is the same
             .act-list every "…" in the app opens, the actions unchanged. -->
        <ActionMenu
          v-model:open="moreOpen"
          class="ds-more"
          :title="shownName"
          width="17rem"
        >
          <template #trigger="{ toggle }">
            <button
              ref="moreBtn"
              type="button"
              class="ds-btn"
              :title="labels.rosterMoreActions"
              :aria-label="labels.rosterMoreActions"
              aria-haspopup="menu"
              @click="toggle"
            >
              <i class="wi wi-more" />
            </button>
          </template>
          <UnitMarkActions
            :slug="slug"
            :unit-id="unitId"
            :name="shownName"
            :marks="!proxy"
            @done="moreOpen = false"
          />
          <button
            v-if="sheet.flavor && !proxy"
            class="act-btn act-ico"
            @click="moreDo(openLoreFromSheet)"
          >
            <i class="wi wi-lore" />{{ labels.loreShow }}
          </button>
          <a
            :href="imageUrl"
            target="_blank"
            rel="noopener noreferrer"
            class="act-btn act-ico"
            @click="moreOpen = false"
          >
            <i class="wi wi-image" />{{ labels.dsSearchImage }}
          </a>
        </ActionMenu>
        <!-- The list's own controls, never folded: "compare" puts a second unit beside this one
             (desktop), ✕ takes this one away (the modal, a compared pair). -->
        <button
          v-if="compare"
          type="button"
          class="ds-btn ds-own-ctl"
          :class="{ copied: compare === 'on' }"
          :title="labels.dsCompare"
          :aria-label="labels.dsCompare"
          :aria-pressed="compare === 'on'"
          data-press="pop"
          @click="$emit('compare')"
        >
          <i class="wi wi-panes" />
        </button>
        <button
          v-if="closable"
          type="button"
          class="ds-btn ds-own-ctl"
          :title="labels.modalClose"
          :aria-label="labels.modalClose"
          @click="$emit('close')"
        >
          <i class="wi wi-close" />
        </button>
      </div>
    </div>
    <div
      class="ds-body"
      :class="{ 'modal-body': contained }"
    >
      <!-- A retired unit's page says what it is fielded as, and links there. -->
      <p
        v-if="proxy"
        class="ds-proxy-note"
      >
        <span>{{ proxyNote[0] }}<RouterLink :to="`/factions/${slug}/datasheets/${proxy.target}`">{{ sheet.name }}</RouterLink>{{ proxyNote[1] }}</span>
      </p>
      <DatasheetCard
        :sheet="sheet"
        :unit-index="unitIndex"
        :faction-slug="slug"
        :granted-keywords="grantedKeywords"
        :other-faction-units="otherFactionUnits"
        :proxy-for="proxyFor"
        keyword-links-enabled
        @keyword-click="activeKeyword = $event"
        @proxy-click="proxiesOpen = true"
      />
    </div>

    <KeywordUnitsModal
      v-if="activeKeyword"
      :keyword="activeKeyword"
      :units="keywordUnits"
      :faction-slug="slug"
      :in-place="inPlace"
      @pick="$emit('open-unit', $event)"
      @close="activeKeyword = null"
    />

    <!-- The Legendary Proxies this unit stands for, from its "Proxy" badge. -->
    <FactionLegendsModal
      v-if="proxiesOpen && legends"
      :slug="slug"
      :legends="legends"
      :only="sheetId"
      :in-place="inPlace"
      @pick="proxiesOpen = false"
      @close="proxiesOpen = false"
    />

    <Teleport to="body">
      <Transition name="fade">
        <div
          v-if="loreOpen"
          ref="lorePopEl"
          class="ds-lore-pop"
          :style="lorePos"
          role="dialog"
          aria-modal="false"
          :aria-label="labels.loreShow"
          @click.stop
        >
          <button
            class="ds-lore-close"
            :aria-label="labels.modalClose"
            @click="closeLore"
          >
            ✕
          </button>
          <p class="ds-lore-text lines">
            {{ sheet.flavor }}
          </p>
        </div>
      </Transition>
    </Teleport>
  </div>
</template>

<script setup>
import { computed, ref, toRef, watch, onUnmounted } from 'vue'
import { useRoute } from 'vue-router'
import DatasheetCard from './DatasheetCard.vue'
import ActionMenu from './ActionMenu.vue'
import KeywordUnitsModal from './KeywordUnitsModal.vue'
import FactionLegendsModal from './FactionLegendsModal.vue'
import UnitMarkActions from './UnitMarkActions.vue'
import { unitsWithKeyword } from '../utils/keywordUnits.js'
import { unitLinkOf } from '../utils/unitLink.js'
import { localizeSheet } from '../data/datasheets/ru/index.js'
import { useDatasheetsRu } from '../composables/useDatasheetsRu.js'
import { ui } from '../i18n/ui.js'
import { useFactionPage } from '../composables/useFactionPage.js'
import { useFactionChoice } from '../composables/useFactionChoice.js'
import { getDatasheetIndex } from '../composables/useSearch.js'
import conditionalKeywords from '../data/conditionalKeywords.json'
import { useLocale } from '../composables/useLocale.js'
import { useFavorites } from '../composables/useFavorites.js'
import { useCollection } from '../composables/useCollection.js'
import { formatBaseSize, profileBases } from '../utils/baseSize.js'
import { canShare, copyText, shareUnit as shareUnitLink } from '../composables/useUnitShare.js'
import { useFactionAccent } from '../composables/useFactionAccent.js'
import { useFactionLegends } from '../composables/useFactionLegends.js'
import { proxyPage } from '../utils/legendaryProxies.js'

const props = defineProps({
  slug: { type: String, required: true },
  unitId: { type: String, required: true },
  // The faction's datasheets (EN), as the caller loaded them — the page and the list both have
  // them already, and the unit's Leader links and keyword lists are read across all of them.
  datasheets: { type: Array, required: true },
  // In a modal: the plate stays put and the card scrolls under it (`.modal-body`).
  contained: { type: Boolean, default: false },
  // A unit of this faction named on the card (a Leader's bodyguard, a keyword's list) replaces
  // this one where it stands (`open-unit`) instead of leaving for its page.
  inPlace: { type: Boolean, default: false },
  closable: { type: Boolean, default: false },
  // '' — no compare control; 'off' / 'on' — the control, and whether a pick is awaited.
  compare: { type: String, default: '' },
  // The modal's heading id (BaseModal's #header slot), so the dialog is named by the unit.
  titleId: { type: String, default: '' },
})
const emit = defineEmits(['close', 'compare', 'open-unit'])

const route = useRoute()
const { faction } = useFactionPage()
const { locale } = useLocale()
const labels = computed(() => ui[locale.value])
const fmtBase = (raw) => formatBaseSize(raw, labels.value)
// A modal is teleported to <body>, out of FactionLayout's faction colour: it carries its own.
const { accentStyle } = useFactionAccent(toRef(props, 'slug'))

// RU prose overlay (src/data/datasheets/ru/<slug>.js), lazy-loaded only in the RU locale
// and merged per-sheet by localizeSheet — until it resolves (or where no overlay exists)
// RU falls back to the EN datasheet text.
const ruModule = useDatasheetsRu(() => props.slug)

// A retired unit of the faction's Legendary Proxies (utils/legendaryProxies.js): its page shows the
// sheet it is fielded as under its own name. `unitId` is then the retired unit's address and
// `sheetId` the sheet's.
const { legends } = useFactionLegends(toRef(props, 'slug'))
const proxy = computed(() => (props.datasheets.some((d) => d.id === props.unitId) ? null : proxyPage(legends.value, props.unitId)))
const sheetId = computed(() => proxy.value?.target || props.unitId)
const proxyNote = computed(() => labels.value.dsProxyNote.split('{unit}'))

const localized = computed(() => {
  const en = props.datasheets.find((d) => d.id === sheetId.value) || null
  if (!en || locale.value !== 'ru') return en
  const mod = ruModule.value
  if (!mod) return en
  return localizeSheet(en, mod.default?.[en.id], mod.abilityNamesRu)
})
// The name on the plate: the retired unit's on its page, the sheet's everywhere else.
const shownName = computed(() => proxy.value?.name || sheet.value?.name || '')
// Each profile's own base after its name, where the unit's base lines name its profiles; the
// plate then carries none (utils/baseSize.js → profileBases).
const sheet = computed(() => {
  const s = localized.value
  const bases = profileBases(s)
  if (!bases) return s
  return { ...s, baseSize: '', profiles: s.profiles.map((p, i) => (p.baseSize || !bases.has(i) ? p : { ...p, baseSize: bases.get(i) })) }
})

// "Units with this keyword" modal (opened from DatasheetCard's Keywords line). Closed whenever
// the unit on screen changes — by a route change or in place — so it can't be left open showing
// a keyword/roster that no longer matches the unit now on screen.
const activeKeyword = ref(null)

// The retired units fielded as this one (the faction's Legendary Proxies) — the card's "Proxy" badge.
const proxyFor = computed(() => (legends.value?.proxies || []).filter((p) => p.id === sheetId.value).flatMap((p) => p.legacy))
const proxiesOpen = ref(false)
watch(() => props.unitId, () => { proxiesOpen.value = false })
watch([() => route.fullPath, () => props.unitId], () => { activeKeyword.value = null })
const keywordUnits = computed(() => unitsWithKeyword(props.datasheets, activeKeyword.value))

// A link to another unit of this faction, shown in place (see `inPlace`; utils/unitLink.js).
function onLinkCapture(e) {
  if (!props.inPlace) return
  const id = unitLinkOf(e, props.slug)
  if (!id) return
  e.preventDefault()
  emit('open-unit', id)
}

// Favourite toggle (shared store with the datasheets list's "Favorites" group).
const { isUnitFavorite, toggleUnitFavorite } = useFavorites()
const fav = computed(() => !!sheet.value && isUnitFavorite(props.slug, sheet.value.id))

// Owned mark (shared store with the datasheets grid and the roster catalogue's star).
const { isOwned, toggleOwned } = useCollection()
const owned = computed(() => !!sheet.value && isOwned(props.slug, sheet.value.id))

// Name → id lookup so DatasheetCard can link Leader/Attached-unit references (e.g. the
// bodyguard units listed under a Character's "Leader" ability) to their own datasheet
// page. Always built from the EN names (unit names are never translated, see the RU
// bilingual conventions), so it's unaffected by locale/localizeSheet.
const unitIndex = computed(() => {
  const map = new Map()
  for (const d of props.datasheets) map.set(d.name, d.id)
  return map
})

// Names in sheet.leader.units that resolve to a REAL datasheet on a DIFFERENT faction's page
// (not just unresolved anywhere) — passed to DatasheetCard so it can hide them instead of
// rendering a dead name. Navigation is always within one faction's context (there's no "browse
// units across all factions" mode), and the underlying rule text is faction-agnostic — appdata
// lists every unit a Character could ever attach to, across whichever army actually fields it
// (e.g. a Chapter-agnostic "Ancient in Terminator Armour" can lead a Deathwatch Terminator Squad
// via THAT squad's own ATTACHED UNIT rule, in a Deathwatch army — never a valid target while
// building the Dark Angels army this page is showing). See datasheetIndex.js's own header for
// why this is a dynamic import (a global compact name index, same chunk the search palette uses).
const globalDsIndex = ref(null)
getDatasheetIndex().then((idx) => { globalDsIndex.value = idx })
const otherFactionUnits = computed(() => {
  const units = sheet.value?.leader?.units
  if (!units?.length || !globalDsIndex.value) return []
  const mySlug = props.slug
  return units.filter((u) => {
    if (unitIndex.value.has(u)) return false // already resolves on this faction's own page
    return globalDsIndex.value.some(([slug, , list]) => slug !== mySlug && list.some(([, name]) => name === u))
  })
})

// Keywords this unit gains from an army/detachment rule (conditionalKeywords.json) — merged into
// the card's keyword line. Roster-wide grants (no `det`) always apply on this faction's page;
// detachment-gated grants only while that detachment is the active pick (shared with the rules
// page via useFactionChoice, defaulting to the faction's first detachment). `detName` carries the
// active detachment's display name through to DatasheetCard so it can footnote where a gated
// grant comes from; roster-wide grants pass `detName: null` (DatasheetCard attributes those to
// "this faction's own rules" instead). `extra` passes through gen-conditional-keywords.mjs's flag
// for a grant that also depends on an un-modelled condition (currently always a Warlord
// requirement — see that script's header comment) — DatasheetCard adds a caveat to the footnote
// rather than implying the detachment/faction alone is the whole story.
const { activeDetachment } = useFactionChoice()
const grantedKeywords = computed(() => {
  const grants = conditionalKeywords[props.slug]?.[sheet.value?.id]
  if (!grants) return []
  const activeDet = activeDetachment(props.slug, faction.value?.detachments || [])
  return grants
    .filter((g) => !g.det || g.det === activeDet?.id)
    .map((g) => ({ kw: g.kw, detName: g.det ? activeDet?.name || null : null, extra: !!g.extra }))
})

// Same query Wahapedia uses for its "Search for model's image on the Internet" icon.
const imageUrl = computed(() => {
  const q = encodeURIComponent(`Warhammer 40000 ${faction.value?.name ?? ''} ${shownName.value}`.trim())
  return `https://www.google.com/search?tbm=isch&q=${q}%20miniature`
})

// Lore lives in an anchored popover opened by the book button (not in the card).
// Anchored/fixed popover recipe mirrors KeywordPopover.vue: capture the trigger rect at
// open time, position `fixed`, and dismiss on scroll/resize since it can't follow the page.
const loreOpen = ref(false)
const loreAnchor = ref(null)
const loreBtn = ref(null)
const lorePopEl = ref(null)

function toggleLorePopover(e) {
  if (loreOpen.value) { closeLore(); return }
  loreAnchor.value = e.currentTarget.getBoundingClientRect()
  loreOpen.value = true
}
function closeLore() { loreOpen.value = false }
watch(() => props.unitId, closeLore)

// The phone-width "…" sheet. Every action closes the sheet first; the lore popover is then
// anchored to the "…" button itself — the book button it usually hangs off is display:none at
// that width — and opened on the next tick, after the sheet's own click has finished bubbling
// (the document click that dismisses the popover is attached while that click is still in flight).
const moreOpen = ref(false)
const moreBtn = ref(null)
function moreDo(fn) { moreOpen.value = false; fn() }
function openLoreFromSheet() {
  const rect = moreBtn.value?.getBoundingClientRect()
  setTimeout(() => { loreAnchor.value = rect || null; loreOpen.value = true }, 0)
}

function dismissOnMove() { if (loreOpen.value) closeLore() }
function onKeydown(e) { if (e.key === 'Escape') closeLore() }
function onDocClick(e) {
  if (lorePopEl.value?.contains(e.target) || loreBtn.value?.contains(e.target) || moreBtn.value?.contains(e.target)) return
  closeLore()
}

function unlisten() {
  window.removeEventListener('scroll', dismissOnMove, { capture: true })
  window.removeEventListener('resize', dismissOnMove)
  document.removeEventListener('keydown', onKeydown)
  document.removeEventListener('click', onDocClick)
}
watch(loreOpen, (open) => {
  if (!open) return unlisten()
  window.addEventListener('scroll', dismissOnMove, { capture: true, passive: true })
  window.addEventListener('resize', dismissOnMove, { passive: true })
  document.addEventListener('keydown', onKeydown)
  document.addEventListener('click', onDocClick)
})
onUnmounted(unlisten)

const lorePos = computed(() => {
  const r = loreAnchor.value
  if (!r) return {}
  const vw = window.innerWidth
  const vh = window.innerHeight
  const popW = Math.min(340, vw - 16)
  const spaceBelow = vh - r.bottom
  const left = Math.max(8, Math.min(r.right - popW, vw - popW - 8))
  const style = { width: popW + 'px', left: left + 'px' }
  if (spaceBelow < 200 && r.top > spaceBelow) {
    style.bottom = (vh - r.top + 8) + 'px'
  } else {
    style.top = (r.bottom + 8) + 'px'
  }
  return style
})

// One "✓ done" flash for each of the two copy buttons.
function flasher() {
  const on = ref(false)
  let timer = null
  return [on, () => { on.value = true; clearTimeout(timer); timer = setTimeout(() => (on.value = false), 1500) }]
}
const [copied, flashCopied] = flasher()
const [linkCopied, flashLinkCopied] = flasher()

async function copyName() {
  if (sheet.value && await copyText(shownName.value)) flashCopied()
}

// The system share sheet or the link copied (useUnitShare.js).
const shareLabel = computed(() => (linkCopied.value ? labels.value.dsLinkCopied : canShare ? labels.value.dsShare : labels.value.dsCopyLink))
async function shareUnit() {
  if (sheet.value && await shareUnitLink(props.slug, props.unitId, shownName.value, locale.value)) flashLinkCopied()
}
</script>

<style scoped>
/* What a retired unit's page shows: one line over the card, in the card's own gutter. */
.ds-proxy-note {
  margin: 0.5rem 0;
  padding: 0 0.5rem;
  font-size: 0.85rem;
  color: var(--text-muted);
}
.ds-proxy-note a { font-weight: 600; }

/* Datasheet header band: the name row is a solid faction-color plate (same visual
   language as the weapon-table headers in DatasheetCard — --ds-th-bg is the accent in
   light theme and the faction's dark variant in dark theme, where the plain accent is
   too light to carry white text). It sits flush on top of the card (radius 0 0 6 6). */
.ds-head {
  display: flex;
  align-items: flex-start;
  flex-wrap: nowrap;
  gap: 0.3rem 0.8rem;
  margin-bottom: 0;
  padding: 0.5rem 1rem 0.45rem;
  background: var(--ds-th-bg, var(--accent));
  --ds-th-bg: var(--accent);
}
@media (prefers-color-scheme: dark) {
  .ds-head { --ds-th-bg: var(--fa-light, color-mix(in srgb, var(--accent) 55%, black)); }
}
:root[data-theme='light'] .ds-head { --ds-th-bg: var(--accent); }
:root[data-theme='dark'] .ds-head { --ds-th-bg: var(--fa-light, color-mix(in srgb, var(--accent) 55%, black)); }

.ds-title {
  flex: 1 1 auto;
  min-width: 0;
  overflow-wrap: break-word;
  /* The title size is the NAME's (.ds-title-name and its steps below), not the heading's: the heading's own size is the base size's, so a
     line holding only a wrapped "(⌀90mm)" is as tall as that text and sits right under the name.
     With the heading at the title's size, that line kept a whole title-row of air (owner,
     2026-09-25); the name's own lines are unchanged. */
  font-size: 0.85rem;
  font-family: var(--font-display);
  font-weight: 400;
  text-transform: uppercase;
  letter-spacing: 0.3px;
  color: #fff;
  margin: 0;
}
/* Single-model base size (⌀50mm) to the right of the unit name on the header plate. */

.ds-title-name { font-size: 2rem; }
/* Tight lines on both: the name's own rows sit close (display caps have no descenders to make
   room for), and a wrapped base size hugs the row above it. */
.ds-title, .ds-title-name { line-height: 1.05; }
.ds-title-base {
  margin-left: 0.45rem;
  font-family: var(--font-sans);
  font-size: 0.85rem;
  font-weight: 600;
  text-transform: none;
  letter-spacing: 0;
  /* May wrap: a unit of several models names each one's base ("The Silent King: Szarekh ⌀100mm ·
     Triarchal Menhir ⌀50mm"), longer than a phone is wide — kept on one line it ran off the plate
     and gave a sideways scroll (owner's screenshot, 2026-10-21). */
  overflow-wrap: anywhere;
  /* Full white: at 82% it read 4.07:1 on Orks' green plate (a11y gate, 2026-10-05). */
  color: #fff;
}

.ds-actions {
  display: flex;
  align-items: center;
  gap: 0.15rem;
  margin-left: auto;
  align-self: center;
  flex-shrink: 0;
}

.ds-btn {
  display: flex;
  align-items: center;
  justify-content: center;
  min-width: 36px;
  min-height: 36px;
  background: none;
  border: 1px solid rgba(255, 255, 255, 0.4);
  color: rgba(255, 255, 255, 0.85);
  font-size: 1rem;
  cursor: pointer;
  text-decoration: none;
  transition: background var(--motion-fast), color var(--motion-fast), border-color var(--motion-fast);
}

.ds-btn:hover {
  background: rgba(255, 255, 255, 0.15);
  color: #fff;
  border-color: #fff;
  text-decoration: none;
}

.ds-btn.copied {
  color: #fff;
  border-color: #fff;
  background: rgba(255, 255, 255, 0.18);
}

/* Pin toggle deliberately skips the .copied border/background treatment shared by the
   other action buttons — pinned state is signalled only by the outline→filled icon swap
   (see the template) plus going fully opaque, no colored highlight. */
.ds-btn-pin-on {
  color: #fff;
}

/* A desktop's pointer needs less than a finger (owner, 2026-10-21): seven 36px squares made a
   toolbar heavier than the name beside it. Still clear of the 24px tap-target floor. */
@media (min-width: 901px) {
  .ds-btn { min-width: 30px; min-height: 30px; font-size: 0.85rem; }
  .ds-head { padding-block: 0.4rem 0.35rem; }
}

/* The list's own controls stand apart from the unit's actions by a gap. */
.ds-more + .ds-own-ctl { margin-left: 0.4rem; }

/* Anchored lore popover (teleported to body — scoped styles still apply to it). */
.ds-lore-pop {
  position: fixed;
  z-index: 500;
  background: var(--bg-insert);
  border: 1px solid rgba(255, 255, 255, 0.1);
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.55);
  padding: 0.75rem 2.1rem 0.8rem 0.9rem;
}

.ds-lore-close {
  position: absolute;
  top: 0.5rem;
  right: 0.6rem;
  background: none;
  border: none;
  color: rgba(255, 255, 255, 0.4);
  cursor: pointer;
  font-size: 0.85rem;
  line-height: 1;
  padding: 0;
  transition: color var(--motion-fast);
}

.ds-lore-close:hover {
  color: #fff;
}

.ds-lore-text {
  margin: 0;
  font-style: italic;
  font-size: 0.85rem;
  line-height: 1.55;
  color: var(--text-on-dark);
}

@media (max-width: 640px) {
  .ds-title-name { font-size: 1.5rem; }
}

.ds-page { container: dspage / inline-size; }

/* In a modal: a flex column the dialog caps, the plate on top and the card scrolling under it
   (`.modal-body`, the scroll container, is the flex item that shrinks — components/CLAUDE.md,
   Modals). */
.ds-contained {
  display: flex;
  flex-direction: column;
  flex: 1 1 auto;
  min-height: 0;
}
.ds-contained > .ds-head { flex: none; }
.ds-contained > .ds-body { flex: 1 1 auto; min-height: 0; overflow-y: auto; overflow-x: hidden; padding: 0; }
/* The card's own phone bleed (100vw) is for a page with a gutter. The sheet is flush, the card
   under the plate as on the page, and on a phone already the screen's width — and narrower than 100vw where the window has a scrollbar, which slid the card
   left by its width and cut its left edge off (owner's screenshot, 2026-10-21). */
.ds-contained :deep(.ds-card) { width: auto; margin-left: 0; }

/* The "…" exists only where the buttons fold (below); a same-specificity rule inside the container
   block has to come AFTER this one to win. */
.ds-actions > .ds-more { display: none; }
@container dspage (max-width: 480px) {
  .ds-head { padding: 0.5rem 0.4rem 0.45rem; }
  .ds-btn {
    min-width: 30px;
    min-height: 30px;
    font-size: 0.85rem;
  }
  /* The unit's buttons become one: the row is the name's, not the toolbar's. The list's own
     controls (compare, ✕) stay out. */
  .ds-actions > .ds-btn:not(.ds-more):not(.ds-own-ctl) { display: none; }
  .ds-actions > .ds-more { display: flex; }
  .ds-more .ds-btn, .ds-own-ctl { min-width: 36px; min-height: 36px; font-size: 1rem; }
  /* …and the name takes the room back. Measured 2026-09-19 against the longest names in the data
     ("Ironkin Steeljacks with Heavy Volkanite Disintegrators", 54 chars): at 360–430px, 1.75rem
     wraps them to the same two lines 1.5rem did, ten pixels taller; a 25-char name ("Chaos Lord
     with Jump Pack", the 90th percentile) stays on one line. Only a 320px screen needs a step
     down to keep the longest at two lines. */
  .ds-title-name { font-size: 1.75rem; }
  /* Very narrow phones: bleed the name plate past .main-content's gutter to the true viewport
     edge, matching .ds-card below it (same 100vw trick as FactionPickerBar's .fpb) — the two read
     as one flush, edge-to-edge header instead of a floating card. Asked of the SCREEN, as the
     card's own bleed is: a narrow column on a wide one (two units compared side by side) is a
     gutter, not an edge. In a modal the sheet is already the screen's width. */
  @media (max-width: 480px) {
    .ds-page:not(.ds-contained) > .ds-head {
      width: 100vw;
      margin-left: calc(50% - 50vw);
    }
  }
}
/* …and in a narrow column on a desktop (two units compared) the folded "…" and ✕ stay pointer
   sized too: the 36px above is a finger's. */
@media (min-width: 901px) {
  .ds-more .ds-btn, .ds-own-ctl { min-width: 30px; min-height: 30px; font-size: 0.85rem; }
}
@container dspage (max-width: 340px) {
  .ds-title-name { font-size: 1.6rem; }
}
</style>
