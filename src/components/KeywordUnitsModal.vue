<template>
  <!-- Wide screen, opened from a word: the list drops from that word like the glossary popover
       (owner, 2026-10-01 — a modal across the desktop for a list of names read as a detour). It is
       still a list to scroll and pick from, so it takes the card surface, not the glossary's dark
       insert. Phone, or no word to hang from (a datasheet's Keywords line): the modal. -->
  <Teleport
    v-if="popover"
    to="body"
  >
    <Transition
      name="fade-pop"
      appear
    >
      <div
        ref="popEl"
        class="kum-pop"
        :style="popStyle"
        role="dialog"
        :aria-label="title"
        tabindex="-1"
      >
        <div class="kum-pop-head">
          <span class="kum-pop-title">{{ title }}</span>
          <button
            class="kum-pop-close"
            :aria-label="labels.modalClose"
            @click="$emit('close')"
          >
            <i class="bi bi-x-lg" />
          </button>
        </div>
        <div class="modal-list kum-pop-list">
          <RouterLink
            v-for="u in units"
            :key="(u.slug || factionSlug) + '/' + u.id"
            :to="`/factions/${u.slug || factionSlug}/datasheets/${u.id}`"
            class="kum-item"
            @click="$emit('close')"
          >
            <span class="kum-name">{{ u.name }}<span
              v-if="u.baseSize"
              class="kum-base"
            > ({{ fmtBase(u.baseSize) }})</span></span>
            <span
              v-if="u.faction"
              class="kum-faction"
            >{{ factionName(u.faction) }}</span>
            <span
              v-if="u.own"
              class="tone-chip kum-own"
            >{{ labels.kwUnitInList }}</span>
          </RouterLink>
        </div>
      </div>
    </Transition>
  </Teleport>
  <BaseModal
    v-else
    :title="title"
    max-width="480px"
    @close="$emit('close')"
  >
    <!-- `modal-body` is not cosmetic: it carries the global `overscroll-behavior: contain`
         (style.css) that keeps a scroll at the list's end from chaining to the page behind.
         There is deliberately no body scroll-lock, so this class is what contains it. -->
    <div class="modal-body modal-list">
      <RouterLink
        v-for="u in units"
        :key="(u.slug || factionSlug) + '/' + u.id"
        :to="`/factions/${u.slug || factionSlug}/datasheets/${u.id}`"
        class="kum-item"
        @click="$emit('close')"
      >
        <span class="kum-name">{{ u.name }}<span
          v-if="u.baseSize"
          class="kum-base"
        > ({{ fmtBase(u.baseSize) }})</span></span>
        <span
          v-if="u.faction"
          class="kum-faction"
        >{{ factionName(u.faction) }}</span>
        <span
          v-if="u.own"
          class="tone-chip kum-own"
        >{{ labels.kwUnitInList }}</span>
      </RouterLink>
    </div>
  </BaseModal>
</template>

<script setup>
import { computed, nextTick, onMounted, onUnmounted, ref } from 'vue'
import BaseModal from './BaseModal.vue'
import { ui } from '../i18n/ui.js'
import { useLocale } from '../composables/useLocale.js'
import { formatBaseSize } from '../utils/baseSize.js'
import { factionIndexBySlug } from '../data/factionsIndex.js'
import { useMediaQuery } from '../composables/useMediaQuery.js'
import { placeByAnchor } from '../utils/anchorPlacement.js'
import { opensPopover } from '../composables/useKeywordPopover.js'

// Opened from DatasheetCard's Keywords line (see its `keyword-click` emit) — lists every
// other unit in the SAME faction's roster that also carries the clicked keyword, so a reader
// can jump straight to e.g. every other INFANTRY unit without leaving the datasheet page.
// Also from a faction keyword named in rule prose (useFactionKeywordUnits.js): there a row may
// belong to another faction (`slug`, and `faction` to say so aloud) and may be one of the units
// of the list on screen (`own`, marked and sorted first by the caller).
const props = defineProps({
  keyword: { type: String, default: '' },
  // A list not read off a keyword (useFactionKeywordUnits' openUnitList) names itself.
  heading: { type: String, default: '' },
  units: { type: Array, required: true }, // [{ id, name, baseSize?, slug?, faction?, own? }]
  factionSlug: { type: String, required: true },
  // The tapped word's rect (useFactionKeywordUnits) — what a wide screen hangs the list from.
  anchor: { type: Object, default: null },
})
const emit = defineEmits(['close'])

const { locale } = useLocale()
const labels = computed(() => ui[locale.value])
const fmtBase = (raw) => formatBaseSize(raw, labels.value)
const factionName = (slug) => factionIndexBySlug(slug)?.name || slug
const title = computed(() => props.heading || labels.value.dsUnitsWithKeyword.replace('{kw}', props.keyword))

// The width every other "dropdown on a wide screen" switches at (AdaptivePicker).
const wide = useMediaQuery('(min-width: 901px)')
const popover = computed(() => wide.value && !!props.anchor)
const popStyle = computed(() => placeByAnchor(props.anchor, { width: 380, cap: true }))

// The glossary popover's manners: a click outside, Escape, or the page moving under it closes it
// (it is placed from a rect taken when it opened and cannot follow). A tap on another faction
// keyword lands outside too — App.vue opens that one as this one closes.
const popEl = ref(null)
// A component's own opener (useKeywordPopover's `data-kw-open`) has already put the next list in
// this one's place; closing on its click would close that.
function onOutside(e) { if (!popEl.value?.contains(e.target) && !opensPopover(e.target)) emit('close') }
function onKey(e) { if (e.key === 'Escape') emit('close') }
function onMove(e) { if (!popEl.value?.contains(e.target)) emit('close') }
onMounted(async () => {
  if (!popover.value) return
  await nextTick()
  popEl.value?.focus({ preventScroll: true })
  document.addEventListener('click', onOutside)
  window.addEventListener('keydown', onKey)
  window.addEventListener('scroll', onMove, { capture: true, passive: true })
  window.addEventListener('resize', onMove, { passive: true })
})
onUnmounted(() => {
  document.removeEventListener('click', onOutside)
  window.removeEventListener('keydown', onKey)
  window.removeEventListener('scroll', onMove, { capture: true })
  window.removeEventListener('resize', onMove)
})
</script>

<style scoped>
.kum-pop {
  position: fixed;
  z-index: 500;
  display: flex;
  flex-direction: column;
  background: var(--bg-card);
  border: 1px solid var(--border);
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.35);
  outline: none;
}
.kum-pop-head {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.45rem 0.45rem 0.45rem 0.75rem;
  border-bottom: 1px solid var(--border);
}
.kum-pop-title { flex: 1; min-width: 0; font-size: 0.8rem; font-weight: 600; color: var(--text-muted); }
.kum-pop-close {
  width: 28px; height: 28px; display: grid; place-items: center; flex: none;
  border: none; background: none; color: var(--text-muted); cursor: pointer;
}
@media (hover: hover) { .kum-pop-close:hover { color: var(--text-primary); } }
.kum-pop-list { overflow-y: auto; overscroll-behavior: contain; padding: 0.45rem; }
.kum-pop .kum-item { min-height: 36px; padding: 0.35rem 0.6rem; }
.kum-pop .kum-name { font-size: 0.85rem; }

@media (max-width: 560px) {
  .modal-body {
    padding: 0.5rem 0.4rem;
  }
}

.kum-item {
  display: flex;
  gap: 0.5rem;
  width: 100%;
  min-height: 44px;
  align-items: center;
  padding: 0.5rem 0.65rem;
  background: var(--bg-secondary);
  border: 1px solid var(--border);
  text-decoration: none;
  transition: border-color var(--motion-fast), background var(--motion-fast);
}

.kum-item:hover {
  border-color: var(--accent);
  text-decoration: none;
}

.kum-name {
  font-family: var(--font-display);
  font-size: 0.95rem;
  text-transform: uppercase;
  letter-spacing: 0.3px;
  color: var(--text-primary);
}

.kum-faction {
  margin-left: auto;
  font-size: 0.75rem;
  color: var(--text-muted);
}

/* The accent's pair, so the mark reads as "this list" in the faction-themed roster screens. */
.kum-own {
  --tone: var(--accent);
  margin-left: auto;
  flex-shrink: 0;
}
.kum-faction + .kum-own { margin-left: 0.5rem; }

.kum-base {
  font-family: var(--font-sans);
  font-size: 0.78rem;
  font-weight: 600;
  text-transform: none;
  letter-spacing: 0;
  color: var(--text-muted);
}
</style>
