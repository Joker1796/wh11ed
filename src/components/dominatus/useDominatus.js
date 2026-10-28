// The deck in the reader's language, plus the lookups every chapter needs.
import { computed, reactive } from 'vue'
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
  return { labels, deck, allianceName, agendaBySlug, phaseLabel, dispo: (id) => DISPO_BY_ID[id] }
}

// The Agendas chapter's filters, shared so a Briefing cell can open the Agenda it names.
const agendaFilter = reactive({ alliance: 'all', phase: 0 })
export function useAgendaFilter() {
  return agendaFilter
}
