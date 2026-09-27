import { afterEach, beforeEach, describe, it, expect, vi } from 'vitest'
import { mount } from '@vue/test-utils'

// The secondary deck on the game screen: the turn's two cards, the cards' own scoring rows and
// what the timing locks. The store is a module singleton — reset per case.
let SecondaryDeck, tracker, DISPOSITIONS

beforeEach(async () => {
  localStorage.clear()
  vi.resetModules()
  const mod = await import('../../composables/useTracker.js')
  tracker = mod.useTracker()
  DISPOSITIONS = mod.DISPOSITIONS
  SecondaryDeck = (await import('./SecondaryDeck.vue')).default
})
// Dialogs teleport to <body> (BaseModal).
afterEach(() => { document.body.innerHTML = '' })

function startGame() {
  tracker.newGame({
    settings: { trackCP: true, firstTurn: 1, layout: 'A', battleSize: 'strikeForce', scoreMode: 'vp', twist: null, twistMission: null },
    players: [
      { name: 'Me', factionSlug: null, detachments: [], disposition: DISPOSITIONS[0].id, role: 'attacker', secondaryMode: 'tactical', fixedSecondaries: [], battleReady: false },
      { name: 'Opp', factionSlug: null, detachments: [], disposition: DISPOSITIONS[1].id, role: 'defender', secondaryMode: 'tactical', fixedSecondaries: [], battleReady: false },
    ],
  })
}
const deck = (pi, props = {}) => mount(SecondaryDeck, {
  props: { pi, round: tracker.current.value.currentRound, name: pi ? 'Opp' : 'Me', ...props },
})
const dialogOpen = () => !!document.body.querySelector('.tk-main')

describe('SecondaryDeck — the turn\'s two cards', () => {
  it('opens the take dialog by itself once, for the side on turn, on its own phone', async () => {
    startGame()
    const mine = deck(0)
    await mine.vm.$nextTick()
    expect(dialogOpen()).toBe(true)
    document.body.innerHTML = ''
    deck(0) // remounted (a tab switch): not again
    expect(dialogOpen()).toBe(false)
    deck(1) // not their turn
    expect(dialogOpen()).toBe(false)
  })

  it('does not open by itself on a phone that may not score the side', async () => {
    startGame()
    const w = deck(0, { editable: false })
    await w.vm.$nextTick()
    expect(dialogOpen()).toBe(false)
    expect(w.find('.take-btn').exists()).toBe(true) // the button is there; the side's lock is the parent's inert
  })

  it('shows how each card came in once taken, and offers them back', async () => {
    startGame()
    tracker.takeRandomSecondaries(0)
    const w = deck(0)
    await w.vm.$nextTick()
    expect(w.find('.take-btn').exists()).toBe(false)
    expect(w.findAll('.cm-src').map(e => e.text())).toEqual(['🎲 random', '🎲 random'])
    expect(w.find('.untake-btn').exists()).toBe(true)
  })
})

describe('SecondaryDeck — scoring on the card', () => {
  // Display of Might: one condition at the end of your turn, one at the end of the opponent's.
  function holdDisplayOfMight() {
    startGame()
    const slug = tracker.current.value.players[0].secondary.deck.find(s => s.startsWith('display-of-might'))
    tracker.takeChosenSecondaries(0, [slug, tracker.current.value.players[0].secondary.deck.find(s => s !== slug)])
    return slug
  }

  it('locks the "end of your opponent\'s turn" condition during the owner\'s own turn only', async () => {
    const slug = holdDisplayOfMight()
    const w = deck(0)
    const card = () => w.findAll('.card').find(c => c.text().includes('Display of Might'))
    expect(card().findAll('.m-cond.locked')).toHaveLength(1)
    expect(card().findAll('.m-cond input')).toHaveLength(1)
    tracker.endTurn()
    await w.vm.$nextTick()
    expect(card().findAll('.m-cond.locked')).toHaveLength(0)
    expect(slug).toBeTruthy()
  })

  it('scores a past round into that round, not the live one', async () => {
    const slug = holdDisplayOfMight()
    tracker.endTurn()
    tracker.endTurn() // round 2
    const w = deck(0, { round: 1 })
    const card = w.findAll('.card').find(c => c.text().includes('Display of Might'))
    await card.find('.m-cond input').setValue(true)
    expect(tracker.secondaryCardVp(0, slug, 1)).toBeGreaterThan(0)
    expect(tracker.secondaryCardVp(0, slug, 2)).toBe(0)
  })
})
