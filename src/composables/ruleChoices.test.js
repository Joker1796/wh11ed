// A rule's choices reach the game as switches through the real pipeline — records, the faction's
// rule text, the unit's keywords — not only in a hand-built fixture (2026-10-15: options with no
// number of their own, or whose number hangs on the target, were never offered).
import { describe, it, expect } from 'vitest'
import { loadRosterModifiersFor, usableEntries } from '../data/rosterModifiers/index.js'
import { resolveModifierEntries } from './rosterStatMods.js'
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
  ])('%s · %s', async (slug, det, ids) => {
    expect(await switches(slug, det, 'army')).toEqual(expect.arrayContaining(ids))
  }, 30000)
})
