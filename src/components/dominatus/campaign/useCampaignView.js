// What every block of the campaign page reads: the entry, the folded state, the deck in the
// reader's language, and the names of things. Provided by CampaignView, injected by its blocks.
import { computed, inject, provide } from 'vue'
import { dominatusDeck } from '../../../composables/dominatusMissions.js'
import { useKeywordPopover } from '../../../composables/useKeywordPopover.js'
import { ui } from '../../../i18n/ui.js'
import { factionIndexBySlug } from '../../../data/factionsIndex.js'
import { useLocale } from '../../../composables/useLocale.js'

const KEY = Symbol('campaignView')

/** A player in a picker: the name, and under it the Alliance and the faction they keep. */
export function playerOptionOf(p, allianceName) {
  return {
    value: p.id,
    label: p.name,
    sub: [p.alliance && allianceName(p.alliance), p.faction && factionIndexBySlug(p.faction)?.name].filter(Boolean).join(' · '),
  }
}

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
  const playerOption = (p) => playerOptionOf(p, allianceName)
  const phaseLabel = (n) => labels.value.domPhase.replace('{n}', ['I', 'II', 'III'][n - 1] || n)
  // An Upgrade card named on the page opens its text in the rules popover, as the card prints it:
  // who may take it, what it does, its bonus effect.
  const { openRule } = useKeywordPopover()
  function showUpgrade(slug, e) {
    const u = deck.value?.upgrades.find((x) => x.slug === slug)
    if (!u) return
    const l = labels.value
    const text = [
      u.who && `**${l.domWho}** ${u.who}`,
      u.body,
      u.bonus && `**${l.domBonusEffect}: ${u.bonus.label}**\n${u.bonus.body}`,
    ].filter(Boolean).join('\n')
    openRule(u.name, text, e.currentTarget.getBoundingClientRect(), u.nameRu || null)
  }
  return { ...ctx, labels, deck, upgradeName, locationName, allianceName, playerName, playerOption, phaseLabel, showUpgrade }
}
