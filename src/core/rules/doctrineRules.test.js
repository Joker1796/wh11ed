// Combat Doctrines a unit has from its own rules (doctrineRules.js), and what the game makes of
// them (rosterGameContext's activeConditions / switchesFor). The gate at the bottom reads every rule
// text of the six factions sharing the army rule: a sentence making a doctrine active that the
// reader does not understand fails it, so the next codex's wording cannot slip past as "nothing".
import { describe, it, expect } from 'vitest'
import { readDoctrineRule, unitDoctrines } from './doctrineRules.js'
import { activeConditions, switchesFor, stampOf } from '../../composables/rosterGameContext.js'
import { loadDatasheets } from '../../data/datasheets/index.js'
import { loadFaction } from '../../data/factions/index.js'

// The wordings as our data carries them (gloss tokens and emphasis included).
const CODEX_ADEPT = 'The **[gloss:sm-combat-doctrine:assault doctrine]**, **devastator doctrine** and **tactical doctrine** are active for this unit.'
const ADEPT = 'CAPTAIN model only. The **[gloss:sm-combat-doctrine:tactical doctrine]** is active for this unit __in addition__ to any other **combat doctrine**.'
const DANTE = 'The **[gloss:sm-combat-doctrine:assault doctrine]** and **tactical doctrine** are active for this unit __in addition__ to any other **combat doctrine**.'
const FURY = 'Friendly DEATH COMPANY units have the following:\n▪ At the start of each phase, the **[gloss:sm-combat-doctrine:assault doctrine]** is active for this unit.\n▪ The **devastator/tactical doctrine** __cannot__ be active for this unit.'
const WRATH = 'The **[gloss:sm-combat-doctrine:tactical doctrine]** is active for SANGUINARY GUARD units __in addition__ to any other **combat doctrine**.'
const QUICKENING = '▪ The **[gloss:sm-combat-doctrine:assault doctrine]** is active for this unit __in addition__ to any other **combat doctrine** until the start of your next Command phase.'
const AUTHOR = 'In your Movement phase, you can select one friendly ADEPTUS ASTARTES unit within 12" of this model, and select one **[gloss:sm-combat-doctrine:combat doctrine]**. That **combat doctrine** is active for that unit __in addition__ to any other **combat doctrines** that are active for that unit until the start of your next Command phase.'
const ACUMEN = 'In your Command phase, you can use this ability. If you do, select one **[gloss:sm-combat-doctrine:combat doctrine]** to be active for this unit until the start of your next Command phase.'
const ASKS = 'This unit’s melee attacks have: ▪ +1 S. ▪ __Or:__ If the **[gloss:sm-combat-doctrine:assault doctrine]** is active for this unit, +2 S.'

describe('readDoctrineRule', () => {
  it('reads each shape', () => {
    expect(readDoctrineRule(CODEX_ADEPT)).toMatchObject({ proves: ['assault', 'devastator', 'tactical'], limit: 3 })
    expect(readDoctrineRule(ADEPT)).toMatchObject({ proves: ['tactical'], limit: 2 })
    expect(readDoctrineRule(DANTE)).toMatchObject({ proves: ['assault', 'tactical'], limit: 3 })
    expect(readDoctrineRule(FURY)).toMatchObject({ proves: ['assault'], forbids: ['devastator', 'tactical'], keyword: 'DEATH COMPANY' })
    expect(readDoctrineRule(WRATH)).toMatchObject({ proves: ['tactical'], keyword: 'SANGUINARY GUARD', limit: 2 })
    expect(readDoctrineRule(QUICKENING)).toMatchObject({ proves: [], limit: 2 })
    expect(readDoctrineRule(AUTHOR)).toMatchObject({ proves: [], limit: 2, on: 'other' })
    expect(readDoctrineRule(ACUMEN)).toMatchObject({ proves: [], limit: 1, select: true })
    expect(readDoctrineRule(ASKS)).toBeNull()
  })

  it('puts an attached unit together', () => {
    const dc = unitDoctrines({ detTexts: [FURY], texts: [ADEPT], hasKeyword: (k) => k === 'DEATH COMPANY' })
    // "regardless of any other rules": the Adept's tactical doctrine does not reach Death Company
    expect([...dc.proves]).toEqual(['doctrine-assault'])
    expect([...dc.forbids].sort()).toEqual(['doctrine-devastator', 'doctrine-tactical'])
    expect(dc.limit).toBe(1)
    expect(unitDoctrines({ detTexts: [WRATH], hasKeyword: () => false }).proves.size).toBe(0)
    expect(unitDoctrines({ armyTexts: [AUTHOR] }).limit).toBe(2)
  })
})

describe('in a game', () => {
  const clock = { round: 2, turn: 0, phase: 'shooting', mine: true, tracked: true }
  const entry = { uid: 'u', id: 'x' }
  const armyAssault = { factionSlug: 'space-marines', army: { selectionByRound: { 2: 'assault' } } }
  const rec = [{ sid: 'r', kind: 'ability', name: 'R', effects: [{ on: 'melee', stat: 's', op: 'add', value: 1, when: { en: 'a', ru: 'a' }, cond: ['doctrine-assault'] }] }]
  const doctrines = (set) => [...set].filter((c) => c.startsWith('doctrine')).sort()

  it('the army’s pick reaches the unit, and its chip says so', () => {
    expect(doctrines(activeConditions(armyAssault, clock, entry))).toEqual(['doctrine-assault'])
    const chip = switchesFor(rec, 'unit', armyAssault, clock, entry).find((s) => s.id === 'doctrine-assault')
    expect(chip).toMatchObject({ on: true, auto: true, blockedBy: 'armyPick' })
  })

  it('a doctrine the rules hold is on and is never the one dropped', () => {
    const proves = new Set(['doctrine-tactical'])
    const own = { ...armyAssault, ctx: { units: { u: { 'doctrine-devastator': stampOf(clock) } } } }
    // limit 2 (Adept of the Codex): tactical held by the rule, devastator switched — the army's
    // assault is the one that goes
    expect(doctrines(activeConditions(own, clock, entry, { proves, groupLimits: { 'combat-doctrine': 2 } }))).toEqual(['doctrine-devastator', 'doctrine-tactical'])
    const chip = switchesFor(rec, 'unit', own, clock, entry, { 'combat-doctrine': 2 }, { proves }).find((s) => s.id === 'doctrine-tactical')
    expect(chip).toMatchObject({ on: true, auto: true, blockedBy: 'rule' })
  })

  it('a forbidden doctrine stays off, the army’s pick included', () => {
    const forbids = new Set(['doctrine-tactical', 'doctrine-devastator'])
    const army = { factionSlug: 'blood-angels', army: { selectionByRound: { 2: 'tactical' } } }
    expect(doctrines(activeConditions(army, clock, entry, { proves: new Set(['doctrine-assault']), forbids }))).toEqual(['doctrine-assault'])
    const chip = switchesFor(rec, 'unit', army, clock, entry, {}, { forbids }).find((s) => s.id === 'doctrine-tactical')
    expect(chip).toMatchObject({ on: false, blocked: true, blockedBy: 'forbidden' })
  })
})

describe('every rule that makes a doctrine active is read', () => {
  it('the six factions sharing Combat Doctrines', async () => {
    const unread = []
    // A sentence that makes a doctrine active (not one that asks whether it is).
    const MAKES = /doctrines? (?:is|are) active for|doctrines? cannot be active|combat doctrine to be active/i
    const check = (where, text) => {
      const plain = String(text || '').replace(/\[gloss:[^:\]]+:([^\]]+)\]/g, '$1').replace(/\*\*|__/g, '')
      const sentences = plain.split(/(?<=\.)\s+|▪/).filter((x) => MAKES.test(x) && !/\bif the [^.]*doctrines? (?:is|are) active/i.test(x))
      // Sentence by sentence: a rule the reader half-understands (Death Company's "assault is
      // active" read, its "cannot be active" not) must still fail.
      for (const x of sentences) if (!readDoctrineRule(x)) unread.push(`${where}: ${x.trim()}`)
    }
    for (const slug of ['space-marines', 'black-templars', 'blood-angels', 'dark-angels', 'deathwatch', 'space-wolves']) {
      for (const d of await loadDatasheets(slug)) {
        for (const a of [...(d.abilities || []), ...(d.wargearAbilities || [])]) check(`${slug} ${d.id} ${a.name}`, a.text)
        for (const set of d.abilitySets || []) for (const o of set.options || []) check(`${slug} ${d.id} ${o.name}`, o.text)
      }
      for (const det of (await loadFaction(slug))?.en?.detachments || []) {
        check(`${slug} ${det.id} rule`, det.rule?.body)
        for (const e of det.enhancements || []) check(`${slug} ${det.id} ${e.name}`, e.body)
      }
    }
    expect(unread).toEqual([])
  })
})
