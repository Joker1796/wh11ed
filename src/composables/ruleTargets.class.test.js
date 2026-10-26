// Every army rule, detachment rule, enhancement and stratagem target of every faction, read the
// way the roster screens read them: a rule whose targets reach no unit of its faction AND are not
// made of real keywords is distrusted and shown on every card (escape 3). That is how Runt Swarm's
// rule reached a Battlewagon (2026-10-15) — and on that day 34 rules took the same road: datasheet
// names not counted as keywords, other factions' units, a `### ` plate read into the keyword, "Two
// T’AU EMPIRE", "AGENTS OF IMPERIUM". What is left is listed below by name, each with why; a new
// one fails here.
import { describe, it, expect } from 'vitest'
import fs from 'node:fs'
import path from 'node:path'
import { ruleScopes, scopesMisread, unitKeywordsOf } from './ruleTargets.js'
import { unitKeywordVocabulary } from '../data/unitKeywordVocabulary.js'

// Empty since 2026-10-19: the six rules that sat here (Repolarised Augurs, Omnissian Unguents,
// Supporting Ordnance, Soul-Tally Offerings, Balefire Boon, Unholy Fortitude) aimed at keywords their
// detachment's own text hands out; gen-conditional-keywords.mjs's TEXT_GRANTS now grants them, so the
// rules reach exactly their units. A new rule of that kind fails here — grant its keyword there.
const KNOWN = []

const DATA = path.resolve(import.meta.dirname, '../data')

describe('rule targets across every faction', () => {
  it('distrusts only the rules listed, by name', async () => {
    const misread = []
    for (const file of fs.readdirSync(path.join(DATA, 'factions')).filter((f) => f.endsWith('.js'))) {
      const slug = file.slice(0, -3)
      if (!fs.existsSync(path.join(DATA, 'datasheets', file))) continue
      const ds = await import(`../data/datasheets/${slug}.js`)
      let sheets = ds.default
      if (ds.sharedUnitIds?.length) {
        const sm = (await import('../data/datasheets/space-marines.js')).default
        sheets = [...sheets, ...sm.filter((u) => ds.sharedUnitIds.includes(u.id))]
      }
      const mod = await import(`../data/factions/${slug}.js`)
      const fac = Object.values(mod).find((x) => x?.en)?.en || mod.default
      if (!fac?.detachments) continue
      const sets = sheets.map(unitKeywordsOf)
      const texts = []
      if (fac.armyRule?.body) texts.push([fac.armyRule.name, fac.armyRule.body])
      for (const d of fac.detachments) {
        if (d.rule?.body) texts.push([d.rule.name, d.rule.body])
        for (const e of d.enhancements || []) texts.push([e.name, e.body])
        for (const s of d.stratagems || []) texts.push([s.name, s.target || ''])
      }
      for (const [name, text] of texts) {
        const scopes = ruleScopes(text)
        if (scopes && scopesMisread(scopes, sets, unitKeywordVocabulary)) misread.push(`${slug} · ${name}`)
      }
    }
    expect(misread.sort()).toEqual([...KNOWN].sort())
  }, 60000)
})
