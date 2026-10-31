// The deck in the reader's language, plus the lookups every chapter needs.
import { computed, reactive, watch } from 'vue'
import { useRoute } from 'vue-router'
import { getDominatus } from '../../data/dominatus.js'
import { DISPOSITIONS } from '../../data/dispositions.js'
import { ui } from '../../i18n/ui.js'
import { useLocale } from '../../composables/useLocale.js'

const DISPO_BY_ID = Object.fromEntries(DISPOSITIONS.map((d) => [d.id, d]))

export function useDominatus() {
  const { locale } = useLocale()
  const labels = computed(() => ui[locale.value])
  const deck = computed(() => getDominatus(locale.value))
  const allianceName = (id) => deck.value.alliances.find((a) => a.id === id)?.name || id
  const agendaBySlug = computed(() => Object.fromEntries(deck.value.agendas.map((a) => [a.slug, a])))
  const phaseLabel = (n) => labels.value.domPhase.replace('{n}', ['I', 'II', 'III'][n - 1])
  const KIND_LABEL = { agenda: 'domKindAgenda', briefing: 'domKindBriefing', honour: 'domKindHonour', skill: 'domKindSkill', relic: 'domKindRelic', location: 'domKindLocation' }
  const kindName = (kind) => labels.value[KIND_LABEL[kind]]
  // The card's tag line, as the deck prints it up its spine: "Liberators · Agenda",
  // "Battle Honour", "Location 1–2".
  const cardTag = ({ kind, alliance, roll }) => {
    if (kind === 'location') return `${kindName(kind)} ${roll}`
    return alliance ? `${allianceName(alliance)} · ${kindName(kind)}` : kindName(kind)
  }
  return { labels, deck, allianceName, agendaBySlug, phaseLabel, kindName, cardTag, dispo: (id) => DISPO_BY_ID[id] }
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
