// A tactical card's WHEN DRAWN rule: "discard this card / shuffle it back and draw a new one" when
// its condition holds. Asked in two places — the deck's card sheet and the take-two dialog right
// after the cards come in, which is the moment the rule is written for — so it is decided here.
import { missionBySlug } from './useTracker.js'

// The action on offer for this card now: { mode: 'discard' | 'shuffle' } or null. Auto-gated where
// the condition is computable (the first battle round; holding the paired card). A board-state
// condition ("no enemy unit of Starting Strength 13+") is always offered — the text says when.
// No card left to draw means no replacement, so nothing is offered.
export function whenDrawnAction(game, pi, slug) {
  const pl = game?.players?.[pi]
  if (!pl || pl.secondaryMode !== 'tactical') return null
  const w = missionBySlug(slug, pl.role)?.whenDrawn
  if (!w || !pl.secondary.deck.length) return null
  if (w.gate === 'first-round' && game.currentRound !== 1) return null
  if (w.gate?.pairedActive && !pl.secondary.hand.includes(w.gate.pairedActive)) return null
  return { mode: w.mode }
}

// The rule's own words in the reader's language: the card's "When Drawn" briefing line, found by
// its ENGLISH label and read at the same place in the localized briefing.
export function whenDrawnText(slug, role, locale) {
  const en = missionBySlug(slug, role)?.briefing || []
  const i = en.findIndex((b) => b.label === 'When Drawn')
  if (i < 0) return ''
  return (missionBySlug(slug, role, locale)?.briefing || en)[i]?.text || en[i].text
}
