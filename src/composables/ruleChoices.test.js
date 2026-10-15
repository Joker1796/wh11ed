// A rule's choices reach the game as switches through the real pipeline — records, the faction's
// rule text, the unit's keywords — not only in a hand-built fixture (2026-10-15: options with no
// number of their own, or whose number hangs on the target, were never offered).
import { describe, it, expect } from 'vitest'
import { loadRosterModifiersFor, usableEntries } from '../data/rosterModifiers/index.js'
import { resolveModifierEntries, datasheetEntriesFor } from './rosterStatMods.js'
import { switchesFor } from './rosterGameContext.js'
import { loadFactionWithCodex } from './rosterFactionRules.js'

async function switches(slug, detachment, scope) {
  const recs = usableEntries(await loadRosterModifiersFor(slug))
  const fac = (await loadFactionWithCodex(slug, 'en')).en
  const resolved = resolveModifierEntries(recs, fac, [detachment], null, null)
  const player = { factionSlug: slug, armyRule: {}, conditions: {}, unitConditions: {} }
  return switchesFor(resolved, scope, player, { round: 1 }, { uid: 'u1', id: 'x' }).map((s) => s.id)
}

describe('a rule offers its choices as switches', () => {
  it.each([
    ['tyranids', 'Invasion Fleet', ['hyper-swarming-instincts', 'hyper-aggression', 'hyper-hive-predators']],
    ['tyranids', 'Synaptic Nexus', ['synaptic-augmentation', 'synaptic-surging-vitality', 'synaptic-goaded-to-slaughter']],
    ['black-templars', 'Vow-sworn Crusaders', ['vow-abhor-the-witch', 'vow-accept-any-challenge', 'vow-uphold-the-honour']],
    ['drukhari', 'Kabalite Cartel', ['contract-trophy-hunters', 'contract-sow-fear-and-terror', 'contract-show-of-strength']],
    ['world-eaters', 'Khorne Daemonkin', ['tithe-enraged-abjuration', 'tithe-daemonic-rage', 'tithe-boon-of-blood', 'tithe-might-of-khorne']],
    ['adeptus-mechanicus', 'Haloscreed Battle Clade', ['override-electromotive-energisation', 'override-microactuator-bracing', 'override-predation-protocols', 'override-muted-servomotors']],
    ['world-eaters', 'Cult of Blood', ['idol-infinite-rage', 'idol-burning-wrath', 'idol-blessed-blood']],
    ['adeptus-mechanicus', 'Data-Psalm Conclave', ['benediction-panegyric-procession', 'benediction-citation-in-savagery']],
    ['astra-militarum', 'Siege Regiment', ['artillery-creeping-barrage', 'artillery-incendiary-bombardment', 'artillery-smoke-shells']],
    ['imperial-agents', 'Imperialis Fleet', ['costs-eliminate', 'costs-acquire']],
    ['imperial-agents', 'Ordo Xenos, Alien Hunters', ['tactic-furor', 'tactic-malleus', 'tactic-purgatus']],
  ])('%s · %s', async (slug, det, ids) => {
    expect(await switches(slug, det, 'army')).toEqual(expect.arrayContaining(ids))
  }, 30000)
})

// An army rule's choices: on every card of the faction, whatever the detachment.
describe('an army rule offers its choices as switches', () => {
  it.each([
    ['imperial-knights', 'Gladius', ['oath-quality-valour', 'oath-quality-eager', 'oath-quality-legacy', 'oath-deed-tyrant', 'army-honoured']],
    ['chaos-knights', 'Gladius', ['dread-despair', 'dread-doom', 'dread-darkness', 'dread-dismay', 'dread-delirium']],
  ])('%s', async (slug, det, ids) => {
    expect(await switches(slug, det, 'army')).toEqual(expect.arrayContaining(ids))
  }, 30000)
})

describe('a unit-level choice is a unit switch', () => {
  it('Cryptek Conclave — Technosorcerous Augmentations', async () => {
    expect(await switches('necrons', 'Cryptek Conclave', 'unit')).toEqual(expect.arrayContaining(['techno-anti-infantry', 'techno-anti-mounted', 'techno-assault', 'techno-heavy', 'techno-ignores-cover']))
  }, 30000)
  it('Renegade Warband — Default to Doctrine', async () => {
    expect(await switches('chaos-space-marines', 'Renegade Warband', 'unit')).toEqual(expect.arrayContaining(['twisted-doctrine-fell-back', 'twisted-doctrine-advanced']))
  }, 30000)
})

// A datasheet ability's choice: on that unit's own card (and, for a Leader's, the unit it leads).
async function unitSwitches(slug, unitId, opts = {}) {
  const recs = usableEntries(await loadRosterModifiersFor(slug))
  const entries = datasheetEntriesFor(recs, { unitId, ...opts })
  const player = { factionSlug: slug, armyRule: {}, conditions: {}, unitConditions: {} }
  return switchesFor(entries, 'unit', player, { round: 1 }, { uid: 'u1', id: unitId }).map((s) => s.id)
}

describe('a datasheet ability offers its choices on the unit', () => {
  it.each([
    ['tyranids', 'malanthrope', {}, ['prey-sustained', 'prey-lance', 'prey-lethal']],
    ['tyranids', 'tyranid-warriors-with-melee-bio-weapons', {}, ['adaptive-strength', 'adaptive-toughness']],
    ['blood-angels', 'death-company-marines', { leaderUnitIds: ['captain-tycho'] }, ['tycho-assault', 'tycho-heavy', 'tycho-rapid-fire']],
    ['tau-empire', 'aunshi', {}, ['aunshi-direct-grace', 'aunshi-forceful-strike', 'aunshi-whirling-stance']],
    ['space-marines', 'eliminator-squad', {}, ['optics-ignores-cover', 'optics-detection']],
    ['aeldari', 'troupe', {}, ['troupe-heros-prowess', 'troupe-villains-doom', 'troupe-tricksters-grace']],
  ])('%s · %s', async (slug, unitId, opts, ids) => {
    expect(await unitSwitches(slug, unitId, opts)).toEqual(expect.arrayContaining(ids))
  }, 30000)
})
