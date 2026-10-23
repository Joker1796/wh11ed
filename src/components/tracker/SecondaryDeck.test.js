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

function startGame(size = { battleSize: 'strikeForce' }) {
  tracker.newGame({
    settings: { trackCP: true, firstTurn: 1, layout: 'A', ...size, scoreMode: 'vp', twist: null, twistMission: null },
    players: [
      { name: 'Me', factionSlug: null, detachments: [], disposition: DISPOSITIONS[0].id, role: 'attacker', secondaryMode: 'tactical', fixedSecondaries: [], battleReady: false },
      { name: 'Opp', factionSlug: null, detachments: [], disposition: DISPOSITIONS[1].id, role: 'defender', secondaryMode: 'tactical', fixedSecondaries: [], battleReady: false },
    ],
  })
  tracker.beginGame()
}
const deck = (pi, props = {}) => mount(SecondaryDeck, {
  props: { pi, round: tracker.current.value.currentRound, name: pi ? 'Opp' : 'Me', ...props },
})
const dialogOpen = () => !!document.body.querySelector('.tk-main')

describe('SecondaryDeck — the turn\'s two cards', () => {
  // A custom size of one a turn (owner, 2026-10-23): the button and the dialog count one card.
  it('says one card where a custom size draws one', async () => {
    startGame({ battleSize: 'custom', custom: { points: 750, secondaries: 1 } })
    const w = deck(0)
    await w.vm.$nextTick()
    expect(w.find('.take-btn').text()).toBe('Take 1 secondary')
    expect(document.body.querySelector('.tk-main').textContent).toContain('Draw 1 at random')
    expect(document.body.textContent).toContain('one Secondary Mission')
  })

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
    expect(w.findAll('.cm-src').map(e => e.attributes('title'))).toEqual(['random', 'random'])
    expect(w.findAll('.cm-src .die-icon')).toHaveLength(2) // an icon, not an emoji
    // Put back from the dialog, which the header's "This turn's secondaries" reopens.
    await w.findAll('.untake-btn').find((b) => b.text().includes("This turn")).trigger('click')
    await w.vm.$nextTick()
    expect(document.body.querySelector('.tk-undo')).not.toBe(null)
  })
})

describe('SecondaryDeck — scoring a card', () => {
  // Display of Might: one condition at the end of your turn, one at the end of the opponent's.
  function holdDisplayOfMight() {
    startGame()
    const slug = tracker.current.value.players[0].secondary.deck.find(s => s.startsWith('display-of-might'))
    tracker.takeChosenSecondaries(0, [slug, tracker.current.value.players[0].secondary.deck.find(s => s !== slug)])
    return slug
  }
  // The card is one line (owner, 2026-09-29); its conditions are ticked in the dialog it opens.
  const openCard = async (w, name) => {
    await w.findAll('.card').find(c => c.text().includes(name)).find('.card-open').trigger('click')
    await w.vm.$nextTick()
  }
  const rows = (sel) => document.body.querySelectorAll(`[role="dialog"] ${sel}`)

  it('keeps the card to one line: no conditions on it', () => {
    holdDisplayOfMight()
    const w = deck(0)
    expect(w.findAll('.card .m-cond')).toHaveLength(0)
  })

  // Owner, 2026-10-21: a condition is ticked only in the turn it is scored in; one whose turn has
  // passed is put right by opening that turn, which the dialog offers.
  it('opens each condition in its own turn only, and offers the passed turn for correction', async () => {
    const slug = holdDisplayOfMight()
    const w = deck(0, { turnNames: ['Me', 'Opp'] })
    await openCard(w, 'Display of Might')
    expect(rows('.m-cond.locked')).toHaveLength(1)
    expect(rows('.m-cond input')).toHaveLength(1)
    expect(rows('.m-cond.locked')[0].getAttribute('title')).toBe('Scored in Opp’s turn')
    expect(rows('.sm-fix')).toHaveLength(0) // Opp's turn has not begun
    tracker.endTurn()
    await w.vm.$nextTick()
    // Now the opponent's-turn condition is open and the own-turn one has passed.
    expect(rows('.m-cond.locked')).toHaveLength(1)
    expect(rows('.m-cond.locked')[0].getAttribute('title')).toBe('Scored in Me’s turn')
    const fix = rows('.sm-fix')[0]
    expect(fix.textContent).toContain('Correct Me’s turn')
    fix.click()
    expect(w.emitted('open-turn')).toEqual([[0]])
    // Opened (the game screen passes the turn back): the own-turn row ticks into this round,
    // logged as a correction.
    await w.setProps({ turn: 0 })
    const input = rows('.m-cond input')[0]
    input.checked = true
    input.dispatchEvent(new Event('change'))
    expect(tracker.secondaryCardVp(0, slug, 1)).toBeGreaterThan(0)
    const fixAct = tracker.current.value.players[0].acts.find((a) => a.type === 'fix')
    expect(fixAct).toMatchObject({ what: 'scored', slug, at: 1, atTurn: 0, from: 0, round: 1, turn: 1 })
  })

  it('scores a past round into that round, not the live one', async () => {
    const slug = holdDisplayOfMight()
    tracker.endTurn()
    tracker.endTurn() // round 2
    const w = deck(0, { round: 1 })
    await openCard(w, 'Display of Might')
    const input = rows('.m-cond input')[0]
    input.checked = true
    input.dispatchEvent(new Event('change'))
    expect(tracker.secondaryCardVp(0, slug, 1)).toBeGreaterThan(0)
    expect(tracker.secondaryCardVp(0, slug, 2)).toBe(0)
  })
})

describe('SecondaryDeck — the take dialog', () => {
  const open = async () => { const w = deck(0); await w.vm.$nextTick(); return w }

  // Owner, 2026-09-29: a taken card folds open in place, and one with a WHEN DRAWN rule says so.
  it('marks a taken card that has a WHEN DRAWN rule, and opens a card in place', async () => {
    startGame()
    const w = await open()
    const { whenDrawnText } = await import('../../composables/whenDrawn.js')
    const pl = tracker.current.value.players[0]
    const wd = pl.secondary.deck.find((x) => whenDrawnText(x, pl.role, 'en'))
    const plain = pl.secondary.deck.find((x) => x !== wd && !whenDrawnText(x, pl.role, 'en'))
    tracker.takeChosenSecondaries(0, [wd, plain])
    await w.vm.$nextTick()
    expect(document.body.querySelectorAll('.ti-badge')).toHaveLength(1)
    const row = document.body.querySelector('.ti-row')
    expect(row.getAttribute('aria-expanded')).toBe('false')
    row.click()
    await w.vm.$nextTick()
    expect(row.getAttribute('aria-expanded')).toBe('true')
    expect(document.body.querySelector('.ti-body .m-cond')).not.toBe(null)
  })

  // 2026-09-29: both cards put back one by one left the turn "taken" with nothing to show.
  it('lets the turn take again once both its cards are back in the deck', () => {
    startGame()
    tracker.takeRandomSecondaries(0)
    const [a, b] = tracker.current.value.players[0].secondary.hand
    tracker.returnSecondaryToDeck(0, a)
    expect(tracker.canTakeSecondaries(0)).toBe(false) // one of the pair still in hand
    tracker.returnSecondaryToDeck(0, b)
    expect(tracker.canTakeSecondaries(0)).toBe(true)
  })

  it('shows a card of this turn that was set aside, marked so', async () => {
    startGame()
    const w = await open()
    tracker.takeRandomSecondaries(0)
    tracker.discardFromHand(0, tracker.current.value.players[0].secondary.hand[0])
    await w.vm.$nextTick()
    expect(document.body.querySelectorAll('.took-item')).toHaveLength(2)
    expect(document.body.querySelectorAll('.ti-gone')).toHaveLength(1)
  })

  it('shows a card in full from the pick list without choosing it', async () => {
    startGame()
    await open()
    document.body.querySelector('.pick-li .tk-info').click()
    await new Promise((r) => setTimeout(r))
    expect(document.body.querySelectorAll('[role="dialog"]').length).toBe(2)
    expect(document.body.textContent).not.toContain('view only')
    expect(tracker.current.value.players[0].secondary.hand).toEqual([]) // nothing chosen
  })

  // Behind Enemy Lines: "during the first battle round, you may shuffle this card back and draw".
  it('offers a card\'s WHEN DRAWN right after it came in, and replaces it', async () => {
    startGame()
    const s = tracker.current.value.players[0].secondary
    const bel = s.deck.find((x) => x.startsWith('behind-enemy-lines'))
    const other = s.deck.find((x) => x !== bel)
    tracker.takeChosenSecondaries(0, [bel, other])
    const w = deck(0)
    w.vm.$.setupState.takeOpen = true
    await w.vm.$nextTick()
    const btn = document.body.querySelector('.ti-wd-btn')
    expect(btn.textContent).toContain('Shuffle back')
    btn.click() // a chosen card: the replacement picker opens
    await new Promise((r) => setTimeout(r))
    document.body.querySelector('.rc-random').click()
    await new Promise((r) => setTimeout(r))
    expect(s.hand).not.toContain(bel)
    expect(s.hand).toHaveLength(2)
    expect(s.deck).toContain(bel) // shuffled back, not discarded
  })
})
