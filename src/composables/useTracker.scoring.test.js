import { beforeEach, describe, it, expect, vi } from 'vitest'
import { getMissions } from '../data/missions.js'

// Scoring-mutation coverage for the tracker store: primary row picks ("or" brackets,
// round cap), secondary scoring (tactical 5-cap, per-round entries), deck integrity
// (draw / return / set-aside / redraw), round navigation, and blob validation.
// Same singleton-reset pattern as useTracker.store.test.js.
let mod, tracker, D0, D1

beforeEach(async () => {
  localStorage.clear()
  vi.resetModules()
  mod = await import('./useTracker.js')
  tracker = mod.useTracker()
  D0 = mod.DISPOSITIONS[0].id
  D1 = mod.DISPOSITIONS[1].id
})

function setupGame(over = {}) {
  const base = {
    settings: { trackCP: true, firstTurn: 1, layout: 'A', battleSize: 'strikeForce', scoreMode: 'vp', twist: null, twistMission: null },
    players: [
      { name: 'Me', factionSlug: null, detachments: [], disposition: D0, role: 'attacker', secondaryMode: 'tactical', fixedSecondaries: [], battleReady: false },
      { name: 'Opp', factionSlug: null, detachments: [], disposition: D1, role: 'defender', secondaryMode: 'tactical', fixedSecondaries: [], battleReady: false },
    ],
  }
  return { ...base, ...over, settings: { ...base.settings, ...(over.settings || {}) } }
}

const perEach = (text) => /^(For each|Each time)/i.test(text || '')

// Find a mission (from `list`) with a non-per-each "or" bracket group: returns the two
// mutually-exclusive row indices. Scanning the data instead of hardcoding slugs keeps the
// tests valid if mission wording or ordering shifts.
function findOrBracket(list) {
  for (const m of list) {
    for (let bi = 0; bi < m.blocks.length; bi++) {
      const rows = m.blocks[bi].rows
      for (let ri = 1; ri < rows.length; ri++) {
        if (rows[ri].modifier === 'or' && !perEach(rows[ri].text) && !perEach(rows[ri - 1].text)) {
          return { m, bi, riA: ri - 1, riB: ri }
        }
      }
    }
  }
  return null
}

// Find a per-each row worth >= 2 VP (so a handful of tallies exceeds the caps).
function findPerEachRow(list) {
  for (const m of list) {
    for (let bi = 0; bi < m.blocks.length; bi++) {
      const rows = m.blocks[bi].rows
      for (let ri = 0; ri < rows.length; ri++) {
        if (perEach(rows[ri].text) && mod.numericVp(rows[ri].vp) >= 2) return { m, bi, ri, vp: mod.numericVp(rows[ri].vp) }
      }
    }
  }
  return null
}

const attackerSecondaries = () => getMissions('en').secondary.filter((m) => m.role === 'attacker')

describe('setRoundPrimary', () => {
  it('clamps to 0 and to the 15 round cap', () => {
    tracker.newGame(setupGame())
    tracker.setRoundPrimary(0, 0, -4)
    expect(tracker.current.value.players[0].rounds[0].primary).toBe(0)
    tracker.setRoundPrimary(0, 0, 22)
    expect(tracker.current.value.players[0].rounds[0].primary).toBe(mod.PRIMARY_ROUND_CAP)
  })
})

describe('setPrimaryRow / primaryRowCount', () => {
  it('sums row contributions into the round primary and reads counts back', () => {
    tracker.newGame(setupGame())
    const pl = tracker.current.value.players[0]
    const m = mod.missionBySlug(pl.primarySlug)
    const bi = 0, ri = 0
    const rowVp = mod.numericVp(m.blocks[bi].rows[ri].vp)
    tracker.setPrimaryRow(0, 0, bi, ri, 2)
    expect(tracker.primaryRowCount(0, 0, bi, ri)).toBe(2)
    expect(pl.rounds[0].primary).toBe(Math.min(2 * rowVp, mod.PRIMARY_ROUND_CAP))
  })

  it('caps the round primary at 15 even when raw row VP is higher', () => {
    tracker.newGame(setupGame())
    const pl = tracker.current.value.players[0]
    const m = mod.missionBySlug(pl.primarySlug)
    const rowVp = mod.numericVp(m.blocks[0].rows[0].vp)
    const count = Math.ceil((mod.PRIMARY_ROUND_CAP + 5) / rowVp)
    tracker.setPrimaryRow(0, 0, 0, 0, count)
    expect(pl.rounds[0].primary).toBe(mod.PRIMARY_ROUND_CAP)
  })

  it('floors a negative count at 0', () => {
    tracker.newGame(setupGame())
    tracker.setPrimaryRow(0, 0, 0, 0, -3)
    expect(tracker.primaryRowCount(0, 0, 0, 0)).toBe(0)
    expect(tracker.current.value.players[0].rounds[0].primary).toBe(0)
  })

  it('selecting one "or" bracket clears the competing bracket in the same group', () => {
    tracker.newGame(setupGame())
    const found = findOrBracket(getMissions('en').primary)
    expect(found).toBeTruthy()
    const { m, bi, riA, riB } = found
    // Point the player at the found mission so the or-group applies.
    tracker.current.value.players[0].primarySlug = m.slug
    tracker.setPrimaryRow(0, 0, bi, riA, 1)
    expect(tracker.primaryRowCount(0, 0, bi, riA)).toBe(1)
    tracker.setPrimaryRow(0, 0, bi, riB, 1)
    expect(tracker.primaryRowCount(0, 0, bi, riB)).toBe(1)
    expect(tracker.primaryRowCount(0, 0, bi, riA)).toBe(0) // cleared
    expect(tracker.current.value.players[0].rounds[0].primary).toBe(
      Math.min(mod.numericVp(m.blocks[bi].rows[riB].vp), mod.PRIMARY_ROUND_CAP)
    )
  })
})

describe('setCp', () => {
  it('floors at 0 and accepts increments', () => {
    tracker.newGame(setupGame())
    tracker.setCp(0, 5)
    expect(tracker.current.value.players[0].cp).toBe(5)
    tracker.setCp(0, -2)
    expect(tracker.current.value.players[0].cp).toBe(0)
  })
})

describe('drawSecondary', () => {
  it('moves the top deck card into the hand and records the drawn round', () => {
    tracker.newGame(setupGame())
    const s = tracker.current.value.players[0].secondary
    const top = s.deck[0]
    const deckSize = s.deck.length
    tracker.drawSecondary(0)
    expect(s.hand).toEqual([top])
    expect(s.deck).toHaveLength(deckSize - 1)
    expect(s.deck).not.toContain(top)
    expect(s.drawn[top]).toBe(1)
  })

  it('is a no-op on an empty deck', () => {
    tracker.newGame(setupGame())
    const s = tracker.current.value.players[0].secondary
    s.deck = []
    tracker.drawSecondary(0)
    expect(s.hand).toEqual([])
  })
})

describe('scoreSecondaryRow / secondaryCardVp / secondaryRowCount', () => {
  it('records picks against the current round only', () => {
    tracker.newGame(setupGame())
    const found = findPerEachRow(attackerSecondaries())
    expect(found).toBeTruthy()
    const { m, bi, ri, vp } = found
    tracker.drawSpecificSecondary(0, m.slug)
    tracker.scoreSecondaryRow(0, m.slug, bi, ri, 1)
    expect(tracker.secondaryRowCount(0, m.slug, bi, ri)).toBe(1)
    expect(tracker.secondaryCardVp(0, m.slug)).toBe(Math.min(vp, 5))
    expect(tracker.secondaryCardVp(0, m.slug, 2)).toBe(0) // other rounds untouched
  })

  it('caps a tactical scoring at 5 VP ("up to 5VP" on the cards)', () => {
    tracker.newGame(setupGame())
    const found = findPerEachRow(attackerSecondaries())
    const { m, bi, ri, vp } = found
    tracker.drawSpecificSecondary(0, m.slug)
    const count = Math.ceil(6 / vp) // raw > 5
    tracker.scoreSecondaryRow(0, m.slug, bi, ri, count)
    expect(count * vp).toBeGreaterThan(5)
    expect(tracker.secondaryCardVp(0, m.slug)).toBe(5)
  })

  it('selecting one "or" bracket clears the competing bracket', () => {
    tracker.newGame(setupGame())
    const found = findOrBracket(attackerSecondaries())
    expect(found).toBeTruthy()
    const { m, bi, riA, riB } = found
    tracker.drawSpecificSecondary(0, m.slug)
    tracker.scoreSecondaryRow(0, m.slug, bi, riA, 1)
    tracker.scoreSecondaryRow(0, m.slug, bi, riB, 1)
    expect(tracker.secondaryRowCount(0, m.slug, bi, riA)).toBe(0)
    expect(tracker.secondaryRowCount(0, m.slug, bi, riB)).toBe(1)
    expect(tracker.secondaryCardVp(0, m.slug)).toBe(
      Math.min(mod.numericVp(m.blocks[bi].rows[riB].vp), 5)
    )
  })

  it('floors a negative count at 0', () => {
    tracker.newGame(setupGame())
    const { m, bi, ri } = findPerEachRow(attackerSecondaries())
    tracker.drawSpecificSecondary(0, m.slug)
    tracker.scoreSecondaryRow(0, m.slug, bi, ri, -2)
    expect(tracker.secondaryRowCount(0, m.slug, bi, ri)).toBe(0)
    expect(tracker.secondaryCardVp(0, m.slug)).toBe(0)
  })
})

describe('returnSecondaryToDeck', () => {
  it('fully undoes a draw: hand/scored/drawn cleared, card back in the deck', () => {
    tracker.newGame(setupGame())
    const { m, bi, ri } = findPerEachRow(attackerSecondaries())
    const s = tracker.current.value.players[0].secondary
    tracker.drawSpecificSecondary(0, m.slug)
    tracker.scoreSecondaryRow(0, m.slug, bi, ri, 1)
    tracker.discardFromHand(0, m.slug) // also exercise removal from discarded

    tracker.returnSecondaryToDeck(0, m.slug)
    expect(s.hand).not.toContain(m.slug)
    expect(s.deck).toContain(m.slug)
    expect(s.scored.some((e) => e.slug === m.slug)).toBe(false)
    expect((s.discarded || []).some((d) => (d.slug ?? d) === m.slug)).toBe(false)
    expect(s.drawn[m.slug]).toBeUndefined()
  })
})

describe('discardFromHand (set aside)', () => {
  it('removes the card from hand but keeps its scored VP', () => {
    tracker.newGame(setupGame())
    const { m, bi, ri, vp } = findPerEachRow(attackerSecondaries())
    const s = tracker.current.value.players[0].secondary
    tracker.drawSpecificSecondary(0, m.slug)
    tracker.scoreSecondaryRow(0, m.slug, bi, ri, 1)

    tracker.discardFromHand(0, m.slug)
    expect(s.hand).not.toContain(m.slug)
    expect(s.deck).not.toContain(m.slug) // off the deck — can't be drawn again
    expect(tracker.secondaryCardVp(0, m.slug)).toBe(Math.min(vp, 5)) // VP kept
    expect(s.discarded.filter((d) => (d.slug ?? d) === m.slug)).toHaveLength(1)
  })

  it('does not duplicate an already set-aside card', () => {
    tracker.newGame(setupGame())
    const slug = attackerSecondaries()[0].slug
    const s = tracker.current.value.players[0].secondary
    tracker.drawSpecificSecondary(0, slug)
    tracker.discardFromHand(0, slug)
    tracker.discardFromHand(0, slug)
    expect(s.discarded.filter((d) => (d.slug ?? d) === slug)).toHaveLength(1)
  })
})

describe('goToRound', () => {
  it('clamps the target round to 1..5', () => {
    tracker.newGame(setupGame())
    tracker.goToRound(0)
    expect(tracker.current.value.currentRound).toBe(1)
    tracker.goToRound(99)
    expect(tracker.current.value.currentRound).toBe(mod.ROUND_COUNT)
  })

  it('advancing sets aside a tactical card that scored in an earlier round, recorded against the round being left', () => {
    tracker.newGame(setupGame())
    const { m, bi, ri } = findPerEachRow(attackerSecondaries())
    const s = tracker.current.value.players[0].secondary
    tracker.drawSpecificSecondary(0, m.slug)
    tracker.scoreSecondaryRow(0, m.slug, bi, ri, 1)

    tracker.goToRound(2)
    expect(s.hand).not.toContain(m.slug)
    const entry = s.discarded.find((d) => (d.slug ?? d) === m.slug)
    expect(entry.round).toBe(1) // the round being LEFT
    expect(tracker.secondaryCardVp(0, m.slug, 1)).toBeGreaterThan(0) // VP kept
  })

  it('does not set aside an unscored card on advance, nor anything when going backward', () => {
    tracker.newGame(setupGame())
    const slug = attackerSecondaries()[0].slug
    const s = tracker.current.value.players[0].secondary
    tracker.drawSpecificSecondary(0, slug)

    tracker.goToRound(2) // unscored — stays in hand
    expect(s.hand).toContain(slug)

    const { m, bi, ri } = findPerEachRow(attackerSecondaries().filter((x) => x.slug !== slug))
    tracker.drawSpecificSecondary(0, m.slug)
    tracker.scoreSecondaryRow(0, m.slug, bi, ri, 1) // scored in round 2

    tracker.goToRound(1) // backward — no reconciliation
    expect(s.hand).toContain(m.slug)
    expect((s.discarded || []).some((d) => (d.slug ?? d) === m.slug)).toBe(false)
  })
})

describe('isValidGame', () => {
  it('rejects corrupt or old-schema blobs and accepts the stable shape', () => {
    expect(mod.isValidGame(null)).toBe(false)
    expect(mod.isValidGame('garbage')).toBe(false)
    expect(mod.isValidGame({})).toBe(false)
    expect(mod.isValidGame({ players: [{}], settings: {} })).toBe(false)      // one player
    expect(mod.isValidGame({ players: [{}, null], settings: {} })).toBe(false) // null player
    expect(mod.isValidGame({ players: [{}, {}] })).toBe(false)                 // no settings
    expect(mod.isValidGame({ players: [{}, {}], settings: {} })).toBe(true)
  })

  it('filters invalid entries out of history on load', async () => {
    const good = { id: 'ok', players: [{}, {}], settings: {} }
    localStorage.setItem('wh11ed-tracker-history', JSON.stringify([good, { junk: true }, null, 'str']))
    localStorage.setItem('wh11ed-tracker-current', JSON.stringify({ junk: true }))
    vi.resetModules()
    const fresh = (await import('./useTracker.js')).useTracker()
    expect(fresh.history.value).toHaveLength(1)
    expect(fresh.history.value[0].id).toBe('ok')
    expect(fresh.current.value).toBe(null)
  })
})

describe('redrawSecondary with an empty or near-empty deck (regressions)', () => {
  it("empty deck + 'shuffle' is a complete no-op (card stays in hand, VP intact)", () => {
    tracker.newGame(setupGame())
    const { m, bi, ri } = findPerEachRow(attackerSecondaries())
    const s = tracker.current.value.players[0].secondary
    tracker.drawSpecificSecondary(0, m.slug)
    tracker.scoreSecondaryRow(0, m.slug, bi, ri, 1)
    s.deck = []

    tracker.redrawSecondary(0, m.slug, 'shuffle')
    expect(s.hand).toEqual([m.slug])
    expect(s.deck).toEqual([])
    expect(tracker.secondaryCardVp(0, m.slug)).toBeGreaterThan(0)
  })

  it("empty deck + 'discard' is a no-op (hand does not shrink)", () => {
    tracker.newGame(setupGame())
    const slug = attackerSecondaries()[0].slug
    const s = tracker.current.value.players[0].secondary
    tracker.drawSpecificSecondary(0, slug)
    s.deck = []

    tracker.redrawSecondary(0, slug, 'discard')
    expect(s.hand).toEqual([slug])
  })

  it("one-card deck + 'shuffle' draws the other card; the redrawn one returns to the deck", () => {
    tracker.newGame(setupGame())
    const [a, b] = attackerSecondaries().map((m) => m.slug)
    const s = tracker.current.value.players[0].secondary
    tracker.drawSpecificSecondary(0, a)
    s.deck = [b]

    tracker.redrawSecondary(0, a, 'shuffle')
    expect(s.hand).toEqual([b])
    expect(s.deck).toEqual([a])
  })

  it("one-card deck + 'discard' draws the other card; the redrawn one leaves play", () => {
    tracker.newGame(setupGame())
    const [a, b] = attackerSecondaries().map((m) => m.slug)
    const s = tracker.current.value.players[0].secondary
    tracker.drawSpecificSecondary(0, a)
    s.deck = [b]

    tracker.redrawSecondary(0, a, 'discard')
    expect(s.hand).toEqual([b])
    expect(s.deck).toEqual([])
    expect((s.discarded || []).some((d) => (d.slug ?? d) === a)).toBe(false)
  })
})
