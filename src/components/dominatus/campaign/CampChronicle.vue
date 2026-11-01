<template>
  <CampFold
    :label="foldLabel"
    :start-open="isOwner && state.rejected.length > 0"
  >
    <ol class="camp-chron">
      <li
        v-for="row in shown"
        :key="row.seq"
        :class="{ 'is-off': row.mark === 'off' || row.mark === 'refused' }"
      >
        <span class="camp-chron-when">{{ row.when }}</span>
        <span class="camp-chron-text"><strong>{{ row.who }}</strong> · {{ row.text }}</span>
        <span
          v-if="row.mark"
          class="camp-chron-mark"
          :class="`is-${row.mark}`"
        >{{ row.markText }}</span>
      </li>
    </ol>
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

const { entry, state, isOwner, labels, playerName, upgradeName, locationName, phaseLabel } = useCampaignView()
const { locale } = useLocale()
const all = ref(false)
const SHOWN = 20

const fmt = computed(() => new Intl.DateTimeFormat(locale.value === 'ru' ? 'ru-RU' : 'en-GB', { day: 'numeric', month: 'short', hour: '2-digit', minute: '2-digit' }))
const when = (at) => {
  try {
    return at ? fmt.value.format(new Date(at)) : ''
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
      return l.campChrBattle.replace('{a}', playerName(p.a)).replace('{b}', playerName(p.b)).replace('{res}', res)
    }
    case 'review': {
      const b = state.value.battles.find((x) => x.id === p.battle)
      const pair = b ? `${playerName(b.a)} — ${playerName(b.b)}` : ''
      return (p.ok ? l.campChrCounted : l.campChrRefused).replace('{pair}', pair)
    }
    case 'draw': return l.campChrDraw.replace('{p}', playerName(rewardPlayer(p.reward))).replace('{n}', (p.cards || []).length)
    case 'claim': return p.kept
      ? l.campChrKept.replace('{p}', playerName(rewardPlayer(p.reward))).replace('{card}', upgradeName(p.kept))
      : l.campChrClaimed.replace('{p}', playerName(rewardPlayer(p.reward)))
    case 'endPhase': return l.campChrEndPhase.replace('{phase}', phaseLabel(p.phase))
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
    if (am.has(e.seq) && !am.get(e.seq)) { mark = 'off'; markText = l.campChrOff }
    else if (refused.has(e.seq)) { mark = 'refused'; markText = why(refused.get(e.seq)) }
    else if (am.has(e.seq)) { mark = 'edited'; markText = l.campEdited }
    return { seq: e.seq, when: when(e.at), who: who(e.author), text: describe({ ...e, payload: payload || e.payload }, seenPlayers), mark, markText }
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
.camp-chron { list-style: none; margin: 0 0 0.5rem; padding: 0; display: grid; gap: 0.3rem; font-size: 0.82rem; }
.camp-chron li { display: grid; grid-template-columns: auto minmax(0, 1fr); gap: 0 0.6rem; align-items: baseline; }
.camp-chron-when { font-family: var(--font-num); font-size: 0.74rem; color: var(--text-muted); white-space: nowrap; }
.camp-chron-mark { grid-column: 2; font-size: 0.74rem; color: var(--text-muted); }
.camp-chron-mark.is-refused { color: var(--warning); }
.camp-chron li.is-off .camp-chron-text { text-decoration: line-through; color: var(--text-muted); }
</style>
