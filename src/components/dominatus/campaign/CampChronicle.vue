<template>
  <CampFold
    :label="foldLabel"
    :start-open="isOwner && state.rejected.length > 0"
  >
    <!-- A cogitator's log (owner, 2026-11-03): the lore face and its lines, in the site's own
         colours and both themes (owner, 2026-11-04 — the green panel went). -->
    <div class="camp-chron">
      <ol>
        <li
          v-for="row in shown"
          :key="row.seq"
          :class="{ 'is-off': row.mark === 'off' || row.mark === 'refused' }"
        >
          <div class="camp-chron-meta">
            [{{ row.when }}] {{ row.who }}
          </div>
          <div class="camp-chron-text">
            <span
              v-if="row.mark"
              class="camp-chron-tag"
              :class="`is-${row.mark}`"
            >{{ row.tag }}</span>
            <span class="camp-chron-what">{{ row.text }}</span>
          </div>
          <div
            v-if="row.mark === 'refused'"
            class="camp-chron-why"
          >
            {{ row.markText }}
          </div>
        </li>
      </ol>
      <p
        v-if="rows.length === shown.length"
        class="camp-chron-end"
      >
        ++ {{ labels.campChrEnd }} ++
      </p>
    </div>
    <button
      v-if="rows.length > shown.length"
      class="btn-ghost"
      @click="all = true"
    >
      {{ labels.campChrAll.replace('{n}', rows.length) }}
    </button>
  </CampFold>
</template>

<script setup>
// The campaign's chronicle: every entry of the log in words, newest first — who did what, and
// what the Warmaster corrected or the campaign refused (with the reason, in the reader's language).
// Names are today's: a player renamed is named as they are now.
import { ref, computed } from 'vue'
import CampFold from './CampFold.vue'
import { amendments } from '../../../core/dominatus/campaign.js'
import { useCampaignView } from './useCampaignView.js'
import { useLocale } from '../../../composables/useLocale.js'
import { refusalText } from '../../../composables/useCampaigns.js'

const { entry, state, isOwner, labels, playerName, upgradeName, locationName, phaseLabel, handOpen } = useCampaignView()
const { locale } = useLocale()
const all = ref(false)
const SHOWN = 20

// Digits only, the way a terminal stamps a line: 01.11 20:44 (01/11 20:44 in English).
const fmt = computed(() => new Intl.DateTimeFormat(locale.value === 'ru' ? 'ru-RU' : 'en-GB', { day: '2-digit', month: '2-digit', hour: '2-digit', minute: '2-digit' }))
const when = (at) => {
  try {
    return at ? fmt.value.format(new Date(at)).replace(',', '') : ''
  } catch {
    return ''
  }
}
// The author: the Warmaster, or the player a member registered as.
function who(author) {
  const l = labels.value
  if (author === 'owner') return l.campRole_owner
  return state.value.players.find((p) => p.member === author)?.name || l.campRole_member
}
// The player a reward belongs to: a battle's side, or the last part of an end-of-phase reward.
function rewardPlayer(id) {
  const [head, kind, pid] = String(id || '').split(':')
  if (pid) return pid
  const b = state.value.battles.find((x) => x.id === head)
  return b ? b[kind] : ''
}
const why = (reason) => refusalText(labels.value, reason)
function describe(e, seenPlayers) {
  const l = labels.value
  const p = e.payload || {}
  switch (e.type) {
    case 'created': return l.campChrCreated.replace('{name}', p.name || '')
    case 'settings': return p.name && Object.keys(p).length === 1 ? l.campChrRenamed.replace('{name}', p.name) : l.campChrSettings
    case 'player': {
      const fresh = !seenPlayers.has(p.id)
      seenPlayers.add(p.id)
      return (fresh ? l.campChrPlayerNew : l.campChrPlayerEdit).replace('{p}', playerName(p.id))
    }
    case 'location': return l.campChrLocation.replace('{phase}', phaseLabel(p.phase)).replace('{loc}', locationName(p.slug))
    case 'pairing': return l.campChrPairing.replace('{phase}', phaseLabel(p.phase)).replace('{a}', playerName(p.a)).replace('{b}', playerName(p.b))
    case 'battle': {
      const res = p.victor ? l.campWon.replace('{p}', playerName(p[p.victor])) : l.campDraw
      const line = l.campChrBattle.replace('{a}', playerName(p.a)).replace('{b}', playerName(p.b)).replace('{res}', res)
      // The Upgrades it was played with: which card went to which unit, and whose.
      const ups = (Array.isArray(p.upgrades) ? p.upgrades : []).filter((u) => u?.side === 'a' || u?.side === 'b').map((u) => (u.unit ? l.campChrUpgrade : l.campChrUpgradeBare)
        .replace('{card}', upgradeName(u.slug)).replace('{unit}', u.unit).replace('{p}', playerName(p[u.side])))
      return ups.length ? l.campChrUpgrades.replace('{line}', line).replace('{list}', ups.join(', ')) : line
    }
    case 'review': {
      const b = state.value.battles.find((x) => x.id === p.battle)
      const pair = b ? `${playerName(b.a)} — ${playerName(b.b)}` : ''
      return (p.ok ? l.campChrCounted : l.campChrRefused).replace('{pair}', pair)
    }
    case 'draw': return l.campChrDraw.replace('{p}', playerName(rewardPlayer(p.reward))).replace('{n}', (p.cards || []).length)
    // A card kept names itself only where the player's hand is shown (`hands`).
    case 'claim': return p.kept && handOpen(rewardPlayer(p.reward))
      ? l.campChrKept.replace('{p}', playerName(rewardPlayer(p.reward))).replace('{card}', upgradeName(p.kept))
      : l.campChrClaimed.replace('{p}', playerName(rewardPlayer(p.reward)))
    case 'endPhase': return l.campChrEndPhase.replace('{phase}', phaseLabel(p.phase))
    case 'roster': return p.code ? l.campChrRoster.replace('{p}', playerName(p.player)).replace('{name}', p.name || '') : l.campChrRosterOff.replace('{p}', playerName(p.player))
    case 'adjust': return l.campChrAdjust.replace('{p}', playerName(p.player))
    case 'amend': return l.campChrAmend.replace('{n}', (p.edits || []).length)
    default: return e.type
  }
}
const rows = computed(() => {
  const l = labels.value
  const events = entry.value?.events || []
  const am = amendments(events)
  const refused = new Map(state.value.rejected.map((r) => [r.seq, r.reason]))
  const seenPlayers = new Set()
  const out = events.map((e) => {
    const payload = am.has(e.seq) ? am.get(e.seq) : e.payload
    let mark = ''
    let markText = ''
    let tag = ''
    if (am.has(e.seq) && !am.get(e.seq)) { mark = 'off'; tag = l.campChrOff }
    else if (refused.has(e.seq)) { mark = 'refused'; tag = l.campChrTagRefused; markText = why(refused.get(e.seq)) }
    else if (am.has(e.seq)) { mark = 'edited'; tag = l.campChrTagEdited }
    return { seq: e.seq, when: when(e.at), who: who(e.author), text: describe({ ...e, payload: payload || e.payload }, seenPlayers), mark, tag, markText }
  })
  return out.reverse()
})
const shown = computed(() => (all.value ? rows.value : rows.value.slice(0, SHOWN)))
const foldLabel = computed(() => {
  const l = labels.value
  const n = state.value.rejected.length
  return isOwner.value && n ? `${l.campChronicle} · ${l.campChrRefusedN.replace('{n}', n)}` : l.campChronicle
})
</script>

<style scoped>
/* The site's own colours (owner, 2026-11-04: the phosphor green of 03.11 back to the project's): a
   card's surface and border, the text and its muted tone, a refusal in the warning colour. The lore
   face and the terminal's lines stay. */
.camp-chron {
  --chr-bg: var(--bg-card);
  --chr-line: var(--border);
  --chr-fg: var(--text-primary);
  --chr-dim: var(--text-muted);
  --chr-alert: var(--warning);
  margin: 0 0 0.5rem;
  padding: 0.5rem 0.65rem;
  background: var(--chr-bg);
  border: 1px solid var(--chr-line);
  color: var(--chr-fg);
  font-family: var(--font-mono);
  font-size: 0.78rem;
  line-height: 1.45;
}
.camp-chron ol { list-style: none; margin: 0; padding: 0; display: grid; gap: 0.45rem; }
.camp-chron-meta { color: var(--chr-dim); text-transform: uppercase; }
.camp-chron-text, .camp-chron-why { padding-left: 2ch; }
.camp-chron-text::before { content: '> '; margin-left: -2ch; color: var(--accent-ink); }
.camp-chron-tag { font-weight: 700; text-transform: uppercase; color: var(--chr-dim); margin-right: 1ch; }
.camp-chron-tag.is-refused, .camp-chron-why { color: var(--chr-alert); }
.camp-chron-why { font-size: 0.72rem; }
.camp-chron li.is-off .camp-chron-what { text-decoration: line-through; color: var(--chr-dim); }
.camp-chron-end { margin: 0.5rem 0 0; color: var(--chr-dim); text-transform: uppercase; letter-spacing: 0.08em; font-size: 0.72rem; }
.camp-chron-end::after { content: '_'; margin-left: 0.5ch; color: var(--chr-fg); animation: camp-chron-blink 1s steps(1) infinite; }
@keyframes camp-chron-blink { 50% { opacity: 0; } }
@media (prefers-reduced-motion: reduce) { .camp-chron-end::after { animation: none; } }
</style>
