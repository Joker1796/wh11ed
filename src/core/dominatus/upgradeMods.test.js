import { describe, it, expect } from 'vitest'
import { getDominatus } from '../../data/dominatus.js'
import { dominatusUpgradeMods as mods } from '../../data/dominatusUpgradeMods.js'
import { upgradeModEntries, upgradeCoverage } from './upgrades.js'

const deck = getDominatus('en').upgrades
const card = (slug) => deck.find((c) => c.slug === slug)
// The card's words as the effects are checked against them: markup out, one case.
const plain = (s) => String(s || '').replace(/\[core:([^\]]+)\]/g, '$1').replace(/\*\*/g, '').toUpperCase()

// The gate the way `coregrants` is one for the faction rules: the table is hand-read, so what holds it
// to the cards is that every card is read, and every number in a reading is printed on the card.
describe('Dominatus Upgrade cards in the modifier layer', () => {
  it('reads every card of the deck, and nothing else', () => {
    expect(Object.keys(mods).sort()).toEqual(deck.map((c) => c.slug).sort())
  })

  it('tells the player how much of each card the app applies', () => {
    const plainUnit = { kws: ['INFANTRY'], warlord: false }
    const tank = { kws: ['VEHICLE'], warlord: false }
    expect(upgradeCoverage(card('undying-duty'), mods, plainUnit)).toBe('none')
    expect(upgradeCoverage(card('kingslayer'), mods, plainUnit)).toBe('part')
    expect(upgradeCoverage(card('shadow-stalker'), mods, plainUnit)).toBe('all')
    // CP the battle starts with is the CP ledger's, not the unit card's.
    expect(upgradeCoverage(card('high-strategy'), mods, plainUnit)).toBe('all')
    // A note about the bonus alone matters only where the bonus applies.
    expect(upgradeCoverage(card('fire-and-fury'), mods, plainUnit)).toBe('all')
    expect(upgradeCoverage(card('fire-and-fury'), mods, tank)).toBe('part')
    // A note about the bonus is that, and nothing else: its card carries a bonus.
    for (const [slug, m] of Object.entries(mods)) if (m.noteOf === 'bonus') expect(card(slug).bonus, slug).toBeTruthy()
  })

  it('says why a card changes no number', () => {
    expect(Object.entries(mods).filter(([, m]) => !m.effects.length && !m.note).map(([s]) => s)).toEqual([])
  })

  it('prints every granted name and every number its effects carry', () => {
    const bad = []
    for (const [slug, m] of Object.entries(mods)) {
      const c = card(slug)
      const check = (effects, text) => {
        for (const e of effects) {
          if (e.op === 'grant') {
            if (!text.includes(String(e.value).toUpperCase())) bad.push(`${slug}: ${e.value}`)
          } else {
            const n = String(Math.abs(Number.parseInt(e.value, 10)))
            if (!new RegExp(`(^|\\D)${n}(\\D|$)`).test(text)) bad.push(`${slug}: ${e.stat} ${e.value}`)
          }
        }
      }
      check(m.effects, plain(c.body))
      if (m.bonus) check(m.bonus.effects, plain(c.bonus?.body))
      // A bonus reading needs a bonus on the card, and "instead" decides whether it replaces.
      if (m.bonus && !c.bonus) bad.push(`${slug}: a bonus the card does not print`)
      if (m.bonus && m.bonus.replace !== /\binstead\b/i.test(c.bonus.body)) bad.push(`${slug}: replace ≠ the card's "instead"`)
    }
    expect(bad).toEqual([])
  })
})

describe('upgradeModEntries', () => {
  const captain = { kws: ['Character', 'Infantry'] }
  const bike = { kws: ['Character', 'Mounted'] }
  it('gives the card\'s own effects, the bonus in their place where it says "instead"', () => {
    const [own] = upgradeModEntries([card('lead-from-the-front')], mods, captain)
    expect(own.effects.map((e) => e.value)).toEqual(['Scouts 6"'])
    const [bonus] = upgradeModEntries([card('lead-from-the-front')], mods, bike)
    expect(bonus.effects.map((e) => e.value)).toEqual(['Scouts 9"'])
    expect(bonus).toMatchObject({ sid: 'dom:lead-from-the-front', kind: 'enhancement', upgrade: true, name: 'Lead from the Front' })
  })
  it('adds a bonus that is not "instead" to the card\'s own', () => {
    const [e] = upgradeModEntries([card('ferocious-combatant')], mods, { kws: ['Character', 'Monster'] })
    expect(e.effects.map((x) => x.value)).toEqual(['SUSTAINED HITS 1', 'CLEAVE 1'])
  })
  it('keeps only "this unit" for another part of the Attached unit, and adds nothing for a card with no numbers', () => {
    const [e] = upgradeModEntries([card('ferocious-combatant'), card('master-crafted-armour')], mods, { kws: ['Character', 'Monster'] }, { unitOnly: true })
    expect(e.effects.map((x) => x.value)).toEqual(['SUSTAINED HITS 1'])
    expect(e.from).toBe('unit')
    expect(upgradeModEntries([card('kingslayer'), card('undying-duty')], mods, captain).map((x) => x.name)).toEqual(['Kingslayer'])
  })
})
