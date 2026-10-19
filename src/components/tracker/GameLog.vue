<template>
  <div class="glog">
    <!-- What to read: the app's own dropdown (owner, 2026-10-06 — a second row of tabs under the
         game's own read as more navigation, and the system select did not look like the app), the
         plain text beside it. -->
    <div class="gl-top">
      <AdaptivePicker
        v-model:open="filterOpen"
        class="gl-pick"
        panel-width="16rem"
        :title="labels.trackerLogShow"
      >
        <template #trigger="{ toggle, open }">
          <button
            type="button"
            class="picker-trigger"
            :aria-expanded="open"
            aria-haspopup="dialog"
            @click="toggle"
          >
            <span class="picker-trigger-main">
              <span class="picker-trigger-label">{{ labels.trackerLogShow }}</span>
              <span class="picker-trigger-name">{{ shownFilter.name }} ({{ shownFilter.tag }})</span>
            </span>
            <i class="wi wi-chevron-down picker-trigger-chev" />
          </button>
        </template>
        <template #default="{ compact, bodyClass, close }">
          <FactionDetachmentList
            :class="bodyClass"
            :compact="compact"
            :detachments="filterOptions"
            :active-id="filter"
            @pick="(id) => { filter = id; close() }"
          />
        </template>
      </AdaptivePicker>
      <button
        class="btn-ghost gl-text"
        @click="textOpen = true"
      >
        <i
          class="wi wi-copy"
          aria-hidden="true"
        />
        {{ labels.trackerLogText }}
      </button>
    </div>
    <div ref="listEl">
      <p
        v-if="!rounds.length"
        class="gl-empty"
      >
        {{ labels.trackerLogEmpty }}
      </p>
      <section
        v-for="r in rounds"
        :key="r.round"
        class="gl-round"
      >
        <h4 class="gl-rh">
          {{ labels.trackerRoundShort }} {{ r.round }}
        </h4>
        <ul class="gl-list">
          <li
            v-for="(e, k) in r.events"
            :key="k"
            class="gl-item"
            :class="{ opp: !isYouSide(current.players[e.pi], e.pi) }"
          >
            <span class="gl-who">{{ names[e.pi] }}</span>
            <span class="gl-what">{{ line(e) }}<DieIcon
              v-if="e.type === 'drawn' && e.source === 'random'"
              class="gl-src"
            /><i
              v-else-if="e.type === 'drawn' && e.source === 'chosen'"
              class="wi wi-hand gl-src"
              aria-hidden="true"
            /></span>
          </li>
        </ul>
      </section>
    </div>

    <BaseModal
      v-if="textOpen"
      :title="labels.trackerLogText"
      max-width="560px"
      @close="textOpen = false"
    >
      <div class="modal-body">
        <textarea
          class="gl-area"
          readonly
          spellcheck="false"
          :value="plainText"
          @focus="e => e.target.select()"
        />
        <button
          class="btn-primary gl-copy"
          @click="copy"
        >
          {{ copied ? labels.trackerLogCopied : labels.trackerLogCopy }}
        </button>
      </div>
    </BaseModal>
  </div>
</template>

<script setup>
import { computed, ref } from 'vue'
import DieIcon from '../DieIcon.vue'
import AdaptivePicker from '../AdaptivePicker.vue'
import FactionDetachmentList from '../FactionDetachmentList.vue'
import BaseModal from '../BaseModal.vue'
import { ui } from '../../i18n/ui.js'
import { useLocale } from '../../composables/useLocale.js'
import { useTracker, isYouSide, missionBySlug } from '../../composables/useTracker.js'
import { buildGameLog } from '../../composables/gameLog.js'
import { grandTotal, primaryTotal, secondaryTotal } from '../../composables/gameScoring.js'
import { useSwapFade } from '../../composables/useSwapFade.js'

// The Log tab: the game told back, newest first, grouped by round — read from the game itself
// (gameLog.js), so it costs nothing to carry and cannot disagree with the score. Filters, and a
// plain-text version to copy out (Mikhail's prototype).
const props = defineProps({ names: { type: Array, required: true } })
const { locale } = useLocale()
const labels = computed(() => ui[locale.value])
const { current } = useTracker()

const FILTERS = ['all', 'points', 'cp', 'strat', 'cards']
// Each with its count (the list's corner tag) — an empty one says so up front.
const filterOptions = computed(() => FILTERS.map((f) => ({ id: f, name: labels.value[`trackerLogFilter_${f}`], tag: String(countOf(f)) })))
const shownFilter = computed(() => filterOptions.value.find((o) => o.id === filter.value) || filterOptions.value[0])
const filterOpen = ref(false)
const filter = ref('all')
// Another filter's entries fade in (useSwapFade).
const listEl = ref(null)
useSwapFade(filter, () => listEl.value)
const events = computed(() => buildGameLog(current.value))
// Core CP come four a round, by themselves: under "All" they only bury the rest. The CP filter
// still shows them, so every point is accounted for there.
const passes = (e, f) => (f === 'all' ? e.type !== 'core' : e.kind === f)
const countOf = (f) => events.value.filter((e) => passes(e, f)).length
const rounds = computed(() => {
  const by = new Map()
  for (const e of events.value) {
    if (!passes(e, filter.value)) continue
    if (!by.has(e.round)) by.set(e.round, [])
    by.get(e.round).push(e)
  }
  return [...by].map(([round, evs]) => ({ round, events: evs }))
})

function cardName(pi, slug) {
  const pl = current.value.players[pi]
  return missionBySlug(slug, pl.role, locale.value)?.name || slug
}
const signed = (n) => (n > 0 ? `+${n}` : `${n}`)

// Why a card's own WHEN DRAWN rule let it be replaced (owner, 2026-10-10): the condition the rule
// names, read off the card — the first battle round, or its paired card in hand — so the log says
// what made the replacement legal, not only that it happened. A rule with no condition says nothing.
function whenDrawnWhy(e) {
  const l = labels.value
  const gate = missionBySlug(e.slug, current.value?.players?.[e.pi]?.role)?.whenDrawn?.gate
  if (gate === 'first-round') return ` — ${l.trackerLogWhyFirstRound}`
  if (gate?.pairedActive) return ` — ${l.trackerLogWhyPaired.replace('{card}', cardName(e.pi, gate.pairedActive))}`
  return ''
}

// One entry in words. Kept here, not in gameLog.js: the words are the locale's.
function line(e) {
  const l = labels.value
  switch (e.type) {
    case 'primary': return l.trackerLogPrimary.replace('{name}', missionBySlug(e.slug, null, locale.value)?.name || '').replace('{vp}', e.vp)
    case 'scored': return l.trackerLogScored.replace('{card}', cardName(e.pi, e.slug)).replace('{vp}', e.vp)
    case 'drawn': return l.trackerLogDrawn.replace('{card}', cardName(e.pi, e.slug))
    case 'achieved': return l.trackerLogAchieved.replace('{card}', cardName(e.pi, e.slug))
    case 'discard': return l.trackerLogDiscard.replace('{card}', cardName(e.pi, e.slug))
    case 'setAside': return l.trackerLogSetAside.replace('{card}', cardName(e.pi, e.slug))
    case 'redraw': return l.trackerLogRedraw.replace('{card}', cardName(e.pi, e.slug))
    case 'returned': return l.trackerLogReturned.replace('{card}', cardName(e.pi, e.slug))
    case 'whenDrawn': return (e.mode === 'shuffle' ? l.trackerLogWhenDrawnShuffle : l.trackerLogWhenDrawnDiscard).replace('{card}', cardName(e.pi, e.slug)) + whenDrawnWhy(e)
    case 'core': return l.trackerLogCore
    case 'bonus': return l.trackerLogBonus
    case 'adjust': return l.trackerLogAdjust.replace('{n}', signed(e.amount))
    case 'strat': return (e.target ? l.trackerLogStratOn.replace('{unit}', e.target.name || '') : l.trackerLogStrat).replace('{name}', e.name || '').replace('{cp}', -e.amount)
    default: return ''
  }
}

// The plain-text version: a header with the score, then every entry, oldest first.
const plainText = computed(() => {
  const g = current.value
  const l = labels.value
  const out = [`${l.trackerLogTitle} · ${l.trackerRoundShort} ${g.currentRound}`, '']
  g.players.forEach((pl, pi) => {
    // No secondaries in Combat Patrol, so no "Secondary 0" in its summary.
    const parts = g.settings?.combatPatrol
      ? `${l.trackerPrimary} ${primaryTotal(g, pi)}`
      : `${l.trackerPrimary} ${primaryTotal(g, pi)}, ${l.trackerSecondary} ${secondaryTotal(g, pi)}`
    out.push(`${props.names[pi]}: ${grandTotal(g, pi)} VP (${parts}) · CP ${pl.cp}`)
  })
  out.push('')
  // The card's source is an icon on screen; in text it is a word.
  const src = (e) => (e.type === 'drawn' && e.source ? ` (${e.source === 'random' ? l.trackerSourceRandom : l.trackerSourceChosen})` : '')
  for (const e of [...events.value].reverse()) out.push(`${l.trackerRoundShort} ${e.round} · ${props.names[e.pi]} — ${line(e)}${src(e)}`)
  return out.join('\n')
})

const textOpen = ref(false)
const copied = ref(false)
async function copy() {
  try {
    await navigator.clipboard.writeText(plainText.value)
    copied.value = true
    setTimeout(() => { copied.value = false }, 1600)
  } catch {
    // No clipboard (an insecure context, an old browser): the text is selected for a manual copy.
    document.querySelector('.gl-area')?.select()
  }
}
</script>

<style scoped>
/* The filter and the plain-text copy on one line. */
.gl-top { display: flex; align-items: center; justify-content: space-between; gap: 0.6rem; }
.gl-pick { flex: 1; min-width: 0; }
/* The dropdown and "As text" one height (owner, 2026-10-06): the row stretches both. */
.gl-top { align-items: stretch; }
/* …through the dropdown's own wrapper on a desk (PickerDropdown's .pd), straight on a phone. */
.gl-pick :deep(.pd), .gl-pick .picker-trigger { flex: 1; min-height: 0; }
.gl-text { flex-shrink: 0; padding: 0.4rem 0.7rem; font-size: 0.8rem; }
.gl-empty { margin: 0.6rem 0 0; font-size: 0.85rem; color: var(--text-dim); }
.gl-round { margin-top: 0.9rem; }
/* Under the filter the gap the other panels keep under their controls, not the one between rounds. */
.gl-round:first-child { margin-top: 0.6rem; }
.gl-rh {
  margin: 0 0 0.35rem;
  font-family: var(--font-display); font-size: 1.25rem; font-weight: 700;
  text-transform: uppercase; color: var(--text-primary);
}
.gl-list { list-style: none; margin: 0; padding: 0; border: 1px solid var(--border); background: var(--bg-card); }
.gl-item {
  --side: var(--side-you);
  display: flex; flex-wrap: wrap; gap: 0 0.4rem;
  padding: 0.45rem 0.65rem; border-top: 1px solid var(--border-light);
  font-size: 0.86rem; line-height: 1.4;
}
.gl-item:first-child { border-top: 0; }
.gl-item.opp { --side: var(--side-opponent); }
.gl-who { font-weight: 700; color: var(--side); }
.gl-what { color: var(--text-muted); }
.gl-src { margin-left: 0.35rem; }
.gl-area {
  width: 100%; min-height: 50vh; padding: 0.6rem;
  border: 1px solid var(--border); background: var(--bg-secondary); color: var(--text-primary);
  font-family: var(--font-mono); font-size: 0.78rem; line-height: 1.45; resize: vertical;
}
.gl-copy { width: 100%; justify-content: center; margin-top: 0.6rem; min-height: 44px; font-weight: 700; }
</style>
