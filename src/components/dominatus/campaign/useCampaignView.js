// What every block of the campaign page reads: the entry, the folded state, the deck in the
// reader's language, and the names of things. Provided by CampaignView, injected by its blocks.
import { computed, inject, nextTick, provide, watch } from 'vue'
import { instantly } from '../../../composables/useRefNavigation.js'
import { dominatusDeck } from '../../../composables/dominatusMissions.js'
import { setCampaignPref } from '../../../composables/useCampaigns.js'
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

/**
 * The names of a campaign's things in the reader's language, and the sentence a "What next" step
 * says — for the campaign's own page (useCampaignView) and for the list of campaigns, which has
 * only each one's folded state (owner, 2026-11-05: the list says what each campaign asks of you).
 * @param {() => any} getState the campaign's folded state
 * @param {import('vue').Ref<'en'|'ru'>} locale
 */
export function campaignWords(getState, locale) {
  const labels = computed(() => ui[locale.value])
  const deck = computed(() => dominatusDeck(locale.value))
  const allianceName = (id) => deck.value?.alliances.find((a) => a.id === id)?.name || id || '—'
  const playerName = (id) => getState()?.players.find((p) => p.id === id)?.name || id
  // A reward by its kind: the card pile it draws from, or the Location bonus with what it asks;
  // `rewardName` the short form, the name alone.
  const rewardKind = (r) => {
    const l = labels.value
    return { honour: l.domHonours, skill: l.domSkills, relic: l.domRelics, fresh: l.campFresh, mettle: l.campMettle, augury: l.campAugury }[r.kind] || r.kind
  }
  const rewardName = (r) => rewardKind(r).split(':')[0]
  /** A step of `nextSteps` as its sentence; `{n}` is left for CountText. */
  const stepText = (x) => {
    const l = labels.value
    const key = x.kind === 'reward' && !x.player ? 'campNext_rewardPhase' : `campNext_${x.kind}`
    return (l[key] || x.kind)
      .replace('{p}', x.player ? playerName(x.player) : '')
      .replace('{what}', x.reward ? rewardName(x.reward) : '')
      .replace('{f}', x.faction ? factionIndexBySlug(x.faction)?.name || x.faction : '')
      .replace('{a}', x.alliance ? allianceName(x.alliance) : '')
  }
  // An Upgrade card named on a page opens its text in the rules popover, as the card prints it:
  // who may take it, what it does, its bonus effect (the campaign's pages, the roster builder).
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
  return { labels, deck, allianceName, playerName, rewardKind, rewardName, stepText, showUpgrade }
}

export function provideCampaignView(ctx) {
  provide(KEY, ctx)
}

export function useCampaignView() {
  const ctx = inject(KEY)
  const { locale } = useLocale()
  const { labels, deck, allianceName, playerName, rewardKind, rewardName, stepText, showUpgrade } = campaignWords(() => ctx.state.value, locale)
  const upgradeName = (slug) => deck.value?.upgrades.find((u) => u.slug === slug)?.name || slug
  // The deck a card is from (honour / skill / relic), for its mark.
  const upgradeKind = (slug) => deck.value?.upgrades.find((u) => u.slug === slug)?.kind || null
  const locationName = (slug) => deck.value?.locations.find((l) => l.slug === slug)?.name || slug
  const playerOption = (p) => playerOptionOf(p, allianceName)
  // A player's cards are shown to this reader (the `hands` setting, owner 2026-11-04): open to all,
  // or each to their own player and the Warmaster — a watcher sees none. The log itself is every
  // member's to read: this keeps the table's secret on screen, it does not lock the data.
  const handOpen = (playerId) => {
    const s = ctx.state.value
    if (!s || s.hands !== 'hidden') return true
    return !!ctx.isOwner?.value || ctx.mine?.value?.id === playerId
  }
  // The date the running phase is to be played by (the `deadlines` setting), said in words, and
  // whether it has passed — the line "What next" and the phase tab carry. Null without one.
  const phaseDeadline = computed(() => {
    const s = ctx.state.value
    const d = s && !s.finished ? s.deadlines?.[s.phase - 1] : null
    if (!d) return null
    const at = new Date(`${d}T23:59:59`)
    const l = labels.value
    const date = new Intl.DateTimeFormat(locale.value === 'ru' ? 'ru-RU' : 'en-GB', { day: 'numeric', month: 'long' }).format(at)
    const late = Date.now() > at.getTime()
    return { late, text: (late ? l.campDeadlinePast : l.campDeadlineLine).replace('{date}', date) }
  })
  const phaseLabel = (n) => labels.value.domPhase.replace('{n}', ['I', 'II', 'III'][n - 1] || n)
  // A choice this reader makes again and again here, kept with the campaign on this device
  // (`setCampaignPref`): read and written like a ref, null until first made.
  const remembered = (key) => computed({
    get: () => ctx.entry.value?.prefs?.[key] ?? null,
    set: (v) => ctx.entry.value && setCampaignPref(ctx.entry.value.id, key, v),
  })
  // A step of "What next" asked for (CampaignView's `ask`, owner 2026-11-03: the button does the
  // step, not only opens its tab): the block that knows the step's kind takes it once, after it is
  // on screen, and opens its dialog or brings the row it names into view.
  function onAsk(handlers) {
    watch(() => ctx.ask?.value, (x) => {
      const h = x && handlers[x.kind]
      if (!h) return
      ctx.ask.value = null
      nextTick(() => h(x))
    }, { immediate: true })
  }
  function bringIntoView(selector) {
    const el = document.querySelector(selector)
    if (!el) return
    instantly(() => el.scrollIntoView({ block: 'center' }))
    el.querySelector('button')?.focus({ preventScroll: true })
  }
  return { ...ctx, onAsk, bringIntoView, labels, deck, upgradeName, upgradeKind, locationName, allianceName, playerName, playerOption, handOpen, phaseDeadline, phaseLabel, rewardKind, rewardName, stepText, showUpgrade, remembered }
}
