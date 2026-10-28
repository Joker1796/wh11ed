// What every block of the campaign page reads: the entry, the folded state, the deck in the
// reader's language, and the names of things. Provided by CampaignView, injected by its blocks.
import { computed, inject, provide } from 'vue'
import { dominatusDeck } from '../../../composables/dominatusMissions.js'
import { ui } from '../../../i18n/ui.js'
import { useLocale } from '../../../composables/useLocale.js'

const KEY = Symbol('campaignView')

export function provideCampaignView(ctx) {
  provide(KEY, ctx)
}

export function useCampaignView() {
  const ctx = inject(KEY)
  const { locale } = useLocale()
  const labels = computed(() => ui[locale.value])
  const deck = computed(() => dominatusDeck(locale.value))
  const upgradeName = (slug) => deck.value?.upgrades.find((u) => u.slug === slug)?.name || slug
  const locationName = (slug) => deck.value?.locations.find((l) => l.slug === slug)?.name || slug
  const allianceName = (id) => deck.value?.alliances.find((a) => a.id === id)?.name || id || '—'
  const playerName = (id) => ctx.state.value?.players.find((p) => p.id === id)?.name || id
  const phaseLabel = (n) => labels.value.domPhase.replace('{n}', ['I', 'II', 'III'][n - 1] || n)
  return { ...ctx, labels, deck, upgradeName, locationName, allianceName, playerName, phaseLabel }
}
