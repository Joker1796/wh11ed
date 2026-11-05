// The deck in the reader's language, plus the lookups every chapter needs.
import { computed, reactive, watch } from 'vue'
import { useRoute } from 'vue-router'
import { getDominatus } from '../../data/dominatus.js'
import { DISPOSITIONS } from '../../data/dispositions.js'
import { ui } from '../../i18n/ui.js'
import { useLocale } from '../../composables/useLocale.js'

const DISPO_BY_ID = Object.fromEntries(DISPOSITIONS.map((d) => [d.id, d]))
// Where the booklet describes each kind of card: [block id, line of its body].
export const MARK_SOURCE = {
  briefing: ['dom-deck-cards', 0],
  location: ['dom-deck-cards', 1],
  agenda: ['dom-deck-cards', 2],
  skill: ['dom-upgrades', 1],
  honour: ['dom-upgrades', 2],
  relic: ['dom-upgrades', 3],
  achieved: ['dom-agenda-achieved', 0],
}

export function useDominatus() {
  const { locale } = useLocale()
  const labels = computed(() => ui[locale.value])
  const deck = computed(() => getDominatus(locale.value))
  const allianceName = (id) => deck.value.alliances.find((a) => a.id === id)?.name || id
  const agendaBySlug = computed(() => Object.fromEntries(deck.value.agendas.map((a) => [a.slug, a])))
  const phaseLabel = (n) => labels.value.domPhase.replace('{n}', ['I', 'II', 'III'][n - 1])
  const KIND_LABEL = { agenda: 'domKindAgenda', briefing: 'domKindBriefing', honour: 'domKindHonour', skill: 'domKindSkill', relic: 'domKindRelic', location: 'domKindLocation', achieved: 'domAgendaAchieved' }
  const kindName = (kind) => labels.value[KIND_LABEL[kind]]
  // The card's tag line, as the deck prints it up its spine: "Liberators · Agenda",
  // "Battle Honour", "Location 1–2".
  const cardTag = ({ kind, alliance, roll }) => {
    if (kind === 'location') return `${kindName(kind)} ${roll}`
    return alliance ? `${allianceName(alliance)} · ${kindName(kind)}` : kindName(kind)
  }
  // What a card's corner mark means, for its popover: the name, and the booklet's own words on it —
  // a kind's line from The Deck / Upgrade Cards, an Alliance's frame, a phase the campaign's opening
  // paragraph (the booklet says nothing of one phase alone). By block id and line, so RU reads its own.
  const markNote = ({ kind, phase, alliance }) => {
    const blocks = deck.value.rules.blocks
    const line = (id, n) => (blocks.find((x) => x.id === id)?.body || '').split('\n')[n]?.replace(/^▪ /, '') || ''
    if (kind) return { name: kindName(kind), text: line(...MARK_SOURCE[kind]) }
    if (phase) return { name: labels.value.domCampaignPhase.replace('{n}', ['I', 'II', 'III'][phase - 1]), text: line('dom-campaigns', 0) }
    const box = blocks.find((x) => x.id === 'dom-alliances')?.boxes?.find((x) => x.id === alliance)
    return { name: allianceName(alliance), text: box?.body || '' }
  }
  return { labels, deck, allianceName, agendaBySlug, phaseLabel, kindName, cardTag, markNote, dispo: (id) => DISPO_BY_ID[id] }
}

// A jump from the contents to a group a filter hides: the filter is dropped first, so the
// anchor exists by the time the page scrolls to it (scrollToAnchor waits for it).
export function resetFilterOnJump(prefix, reset) {
  const route = useRoute()
  watch(() => route.hash, (h) => { if (h && h.startsWith(`#${prefix}`)) reset() })
}

// The Agendas chapter's filters, shared so a Briefing cell can open the Agenda it names.
const agendaFilter = reactive({ alliance: 'all', phase: 0 })
export function useAgendaFilter() {
  return agendaFilter
}
