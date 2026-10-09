import { describe, it, expect } from 'vitest'
import chapterDetachments from './chapterDetachments.js'
import { loadFaction } from './factions/index.js'
import { loadRosterModifiers, loadRosterModifiersFor } from './rosterModifiers/index.js'
import { loadFactionWithCodex, loadRosterFactionRules, normName } from '../composables/rosterFactionRules.js'
import { loadArmyRules, loadArmyStrats } from '../composables/gameStratagems.js'

// A detachment an army fields from ANOTHER faction's file must bring its text along wherever the
// army's detachments are read: the roster's Rules tab, the unit cards, the roster modifiers and the
// game's stratagems and rules. Five readers each listed the files to look in by hand — "a Chapter
// also reads Space Marines" — and so a Space Marines list on Deathwatch Support had no rule,
// enhancement or stratagem for it anywhere (a player's report, 2026-10-09). Every reader now asks
// detachmentSources(); this walks every borrowed detachment of every army through all five.
const cases = Object.entries(chapterDetachments).flatMap(([slug, list]) => list.map((e) => [slug, e.name, e.from]))

describe('a borrowed detachment brings its text to every reader', () => {
  it.each(cases)('%s ← %s (%s)', async (slug, name, from) => {
    const src = (await loadFaction(from)).en.detachments.find((d) => d.name === name)
    const key = normName(name)
    const missing = []

    const { lookup } = await loadRosterFactionRules(slug, 'en')
    if (!lookup.get(key)) missing.push('roster rules')

    const { en } = await loadFactionWithCodex(slug, 'en')
    if (!en.detachments.some((d) => normName(d.name) === key)) missing.push('unit cards')

    const army = { factionSlug: slug, detachments: [name] }
    if (src.stratagems?.length && !(await loadArmyStrats(army, 'en')).length) missing.push('game stratagems')
    if (src.rule && !(await loadArmyRules(army, 'en')).detachments.length) missing.push('game rules')

    const own = (await loadRosterModifiers(from))?.entries.filter((e) => e.det === name).map((e) => e.sid) || []
    const read = new Set((await loadRosterModifiersFor(slug))?.entries.map((e) => e.sid))
    if (own.some((sid) => !read.has(sid))) missing.push('roster modifiers')

    expect(missing).toEqual([])
  })

  // Borrowing a detachment must not borrow the lender's army rule: a Space Marines list on
  // Deathwatch Support reads Mission Tactics, not the Deathwatch's own records.
  it('a list reads only the borrowed detachment from a file that is not Codex: Space Marines', async () => {
    const read = (await loadRosterModifiersFor('space-marines')).entries
    const foreign = new Set((await loadRosterModifiers('deathwatch')).entries.map((e) => e.sid))
    const own = new Set((await loadRosterModifiers('space-marines')).entries.map((e) => e.sid))
    const strays = read.filter((e) => foreign.has(e.sid) && !own.has(e.sid) && e.det !== 'Deathwatch Support')
    expect(strays.map((e) => e.name)).toEqual([])
  })
})
