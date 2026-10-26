import { describe, it, expect } from 'vitest'
import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import { foldChars, foldName } from './foldName.js'

describe('foldName', () => {
  it('reads every hyphen, dash and apostrophe GW types as one', () => {
    // Real pairs from the data, 2026-10-15: appdata against the MFM, one sheet against another.
    expect(foldName('Shield‑Captain')).toBe(foldName('Shield-Captain')) // U+2011
    expect(foldName('Hot‐shot long‐las')).toBe(foldName('Hot-shot long-las')) // U+2010
    expect(foldName('Plasma pistol – standard')).toBe(foldName('Plasma pistol - standard')) // en dash
    expect(foldName('Hell’s Last')).toBe(foldName("Hell's Last"))
    expect(foldName('‘Iron Hand’ Straken')).toBe(foldName("'iron hand' straken"))
    expect(foldName('Stormstrike missile launcher ')).toBe(foldName('Stormstrike Missile Launcher'))
    expect(foldName('Vox caster')).toBe('vox caster')
  })

  it('keeps one character for one, so search can slice the original by its positions', () => {
    const s = 'Caladius Grav‑Tank’s hull'
    expect(foldChars(s)).toHaveLength(s.length)
    expect(foldChars(s)).toBe("Caladius Grav-Tank's hull")
  })
})

// Every matcher that folded its own subset of these characters is how the 2026-10-15 misses
// happened (seven Custodes sheets off their MFM price tiers, a unit search that could not find
// "grav-tank", a translated line left half English). A `.replace` whose character class names an
// apostrophe or a hyphen variant, anywhere but foldName.js, fails here unless it is listed below
// with the reason it is not comparing names.
const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '../../..')
const ALLOWED = {
  // URL slugs: apostrophes dropped, every other non-letter becomes "-" anyway.
  'src/core/shared/slugify.js': 'slug',
  'scripts/gen-faction-legends.mjs': 'slug',
  'scripts/gen-conditional-keywords.mjs': 'slug',
  'scripts/gen-combat-patrol-missions.mjs': 'slug',
  'scripts/gen-faction-faq.mjs': 'slug',
  // The hash that ties a modifier record to the wording it was read from: folding more would
  // re-hash all 2033 records and mark every reviewed one stale.
  'scripts/gen-roster-modifiers.mjs': 'proseHash',
  // English grammar in the RU wargear translator ("this model’s …"), not a name compared.
  'scripts/gen-roster-texts-ru.mjs': 'possessive patterns',
  // Patterns that READ an apostrophe as part of a word: keyword runs, a list marker before a name.
  'scripts/parity-check.mjs': 'keyword pattern',
  'scripts/sync-faction-text.mjs': 'lookahead in a pattern',
  'scripts/patch-notes/diff-bundles.mjs': 'heading pattern',
  // Text written back into our data in the typographic form, not compared.
  'scripts/lib/pack-roster.mjs': 'normalises to ’ for display',
  'scripts/appdata-text-diff.mjs': 'converts appdata text for --apply-en',
  // Bags of words: punctuation dropped, then every non-letter becomes a space.
  'scripts/check-core-faq.mjs': 'word bag',
  'scripts/sync-event-companion.mjs': 'title punctuation dropped',
}
const HAND_FOLD = /\.replace\(\/[^/\n]*(?:’|‘|\\u2019|\\u2018|‐|‑|\\u2010|\\u2011|\\p\{Pd\})[^/\n]*\/[a-z]*,/

function* sources(dir) {
  for (const e of fs.readdirSync(path.join(ROOT, dir), { withFileTypes: true })) {
    const rel = `${dir}/${e.name}`
    if (e.isDirectory()) { if (e.name !== 'node_modules') yield* sources(rel) } else if (/\.(js|mjs|vue)$/.test(e.name) && !/\.test\./.test(e.name)) yield rel
  }
}

describe('no name matcher folds characters by itself', () => {
  it('uses foldName / foldChars everywhere but the files listed with a reason', () => {
    const found = []
    for (const dir of ['src', 'scripts']) {
      for (const rel of sources(dir)) {
        if (rel === 'src/core/shared/foldName.js' || ALLOWED[rel]) continue
        // Generated data files carry names, not code.
        if (/^src\/data\/(datasheets|factions|roster|mfm|rosterModifiers)\//.test(rel)) continue
        const text = fs.readFileSync(path.join(ROOT, rel), 'utf8')
        text.split('\n').forEach((line, i) => { if (HAND_FOLD.test(line)) found.push(`${rel}:${i + 1}`) })
      }
    }
    expect(found).toEqual([])
  })

  it('lists no file that no longer needs it', () => {
    const stale = Object.keys(ALLOWED).filter((rel) => !fs.readFileSync(path.join(ROOT, rel), 'utf8').split('\n').some((l) => HAND_FOLD.test(l)))
    expect(stale).toEqual([])
  })
})
