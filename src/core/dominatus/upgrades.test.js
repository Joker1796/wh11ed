import { describe, it, expect } from 'vitest'
import { upgradeNeedsUnit, upgradeUnitBlock, upgradeBonusKeywords, upgradeBonusApplies, upgradeLimit, upgradeOncePerBattle, upgradeStartCp, pinnedUpgrades } from './upgrades.js'
import { getDominatus } from '../../data/dominatus.js'

const deck = getDominatus('en').upgrades
const card = (slug) => deck.find((c) => c.slug === slug)
const captain = { kws: ['Character', 'Infantry', 'Imperium'] }
const boyz = { kws: ['Infantry', 'Mob'] }
const ghazghkull = { kws: ['Character', 'Epic Hero', 'Monster'] }

// The readings are only as good as the phrasings they know: every card of the deck must be one.
describe('Upgrade cards — every card is read', () => {
  it('names who takes it in a phrasing upgradeUnitBlock reads', () => {
    const known = new Set(['', 'One CHARACTER model.', 'One CHARACTER model (excluding EPIC HEROES).'])
    expect(deck.filter((c) => !known.has(c.who)).map((c) => `${c.slug}: ${c.who}`)).toEqual([])
  })
  it('asks its bonus of keywords upgradeBonusApplies knows', () => {
    const known = new Set(['MONSTER', 'VEHICLE', 'INFANTRY', 'MOUNTED', 'WARLORD'])
    const bad = deck.flatMap((c) => upgradeBonusKeywords(c).filter((k) => !known.has(k)).map((k) => `${c.slug}: ${k}`))
    expect(bad).toEqual([])
    expect(deck.filter((c) => c.bonus).length).toBeGreaterThan(10)
  })
})

describe('upgradeUnitBlock', () => {
  it('gives a card to a CHARACTER only', () => {
    expect(upgradeUnitBlock(card('kingslayer'), captain)).toBe(null)
    expect(upgradeUnitBlock(card('kingslayer'), boyz)).toBe('notCharacter')
  })
  it('keeps the no-hero Relics off an EPIC HERO, and lets other cards go to one', () => {
    expect(upgradeUnitBlock(card('temporal-talisman'), ghazghkull)).toBe('epicHero')
    expect(upgradeUnitBlock(card('temporal-talisman'), captain)).toBe(null)
    expect(upgradeUnitBlock(card('kingslayer'), ghazghkull)).toBe(null)
  })
  it('asks no unit of a card no unit carries', () => {
    expect(upgradeNeedsUnit(card('path-to-conquest'))).toBe(false)
    expect(upgradeNeedsUnit(card('kingslayer'))).toBe(true)
    expect(upgradeUnitBlock(card('path-to-conquest'), boyz)).toBe(null)
  })
})

describe('upgradeBonusApplies', () => {
  it('reads "/" as either keyword, in any case', () => {
    expect(upgradeBonusKeywords(card('fire-and-fury'))).toEqual(['MONSTER', 'VEHICLE'])
    expect(upgradeBonusApplies(card('fire-and-fury'), { kws: ['Character', 'Vehicle'] })).toBe(true)
    expect(upgradeBonusApplies(card('fire-and-fury'), captain)).toBe(false)
    expect(upgradeBonusApplies(card('born-survivor'), captain)).toBe(true)
  })
  it('reads WARLORD as the army\'s Warlord, not a printed keyword', () => {
    expect(upgradeBonusApplies(card('high-strategy'), captain)).toBe(false)
    expect(upgradeBonusApplies(card('high-strategy'), { ...captain, warlord: true })).toBe(true)
  })
  it('a card without a bonus never applies one', () => {
    expect(upgradeBonusApplies(card('kingslayer'), ghazghkull)).toBe(false)
  })
})

describe('upgradeLimit', () => {
  it('is 3, and 4 at Titangrave', () => {
    expect(upgradeLimit({ location: 'titangrave' })).toBe(4)
    expect(upgradeLimit({ location: 'cerbera-base' })).toBe(3)
    expect(upgradeLimit(null)).toBe(3)
    // A campaign's own limit (owner, 2026-11-04), Titangrave's one on top.
    expect(upgradeLimit({ location: 'cerbera-base', limit: 2 })).toBe(2)
    expect(upgradeLimit({ location: 'titangrave', limit: 5 })).toBe(6)
    expect(upgradeLimit({ location: 'cerbera-base', limit: 0 })).toBe(3)
  })
})

describe('upgradeOncePerBattle', () => {
  it('names the five cards the deck prints "(Once per battle)" on', () => {
    expect(deck.filter(upgradeOncePerBattle).map((c) => c.slug).sort()).toEqual(['displacer-field', 'fortunes-favoured', 'personal-teleporter', 'ruinator', 'vortex-grenade'])
  })
})

describe('upgradeStartCp', () => {
  it('reads High Strategy: 1CP, 2CP on the Warlord, and no other card of the deck starts with CP', () => {
    expect(upgradeStartCp(card('high-strategy'), captain)).toBe(1)
    expect(upgradeStartCp(card('high-strategy'), { ...captain, warlord: true })).toBe(2)
    expect(deck.filter((c) => upgradeStartCp(c, { kws: [], warlord: true }) > 0).map((c) => c.slug)).toEqual(['high-strategy'])
  })
})

describe('pinnedUpgrades — the cards a list carries pinned, as a battle starts', () => {
  const cards = [{ slug: 'a' }, { slug: 'b' }, { slug: 'c' }, { slug: 'd' }]
  const uids = new Set(['u1', 'u2', 'u3', 'u4'])
  const pins = [{ slug: 'a', uid: 'u1' }, { slug: 'b', uid: 'u2' }, { slug: 'c', uid: 'u3' }, { slug: 'd', uid: 'u4' }]
  it('keeps the pins up to the limit, units left for the table to name', () => {
    expect(pinnedUpgrades(pins, cards, uids, null, 3)).toEqual([
      { slug: 'a', uid: 'u1', unit: '' }, { slug: 'b', uid: 'u2', unit: '' }, { slug: 'c', uid: 'u3', unit: '' },
    ])
  })
  it('drops a card the player no longer holds, a unit gone from the list, an unknown card', () => {
    const out = pinnedUpgrades([...pins, { slug: 'x', uid: 'u1' }], cards, new Set(['u1', 'u3', 'u4']), new Set(['a', 'c', 'd']), 4)
    expect(out.map((u) => u.slug)).toEqual(['a', 'c', 'd'])
  })
  it('gives a card once and a unit one card', () => {
    const out = pinnedUpgrades([{ slug: 'a', uid: 'u1' }, { slug: 'a', uid: 'u2' }, { slug: 'b', uid: 'u1' }], cards, uids, null, 3)
    expect(out).toEqual([{ slug: 'a', uid: 'u1', unit: '' }])
  })
  it('nothing pinned, nothing given', () => {
    expect(pinnedUpgrades(null, cards, uids, null, 3)).toEqual([])
  })
})
