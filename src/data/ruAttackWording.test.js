import { describe, it, expect } from 'vitest'
import { readFileSync, readdirSync, statSync } from 'node:fs'
import { join } from 'node:path'

// "Until that unit has attacked" is «пока … не завершит свои атаки» in the Russian. A player reported
// «пока тот вражеский юнит не отатакует» as a mistake (2026-10-31), and the same English had gone
// into Russian seven ways: «отатакует» and «заатакует» are slang, and «не атакует» reads as "does
// not attack" — the opposite of waiting for the attacks to end. This holds every Russian string in
// src/data to the one wording. «отстреляется» ("has shot") is ordinary Russian and stays.
const BAD = [
  [/(?<![а-яё])(от|за)атак/i, 'slang «отатаковать» / «заатаковать»'],
  [/пока [^.]{0,60}не атаку(ет|ют)/i, '«пока … не атакует» reads as "does not attack"'],
]
const ROOT = __dirname + '/'
// The release notes quote the old wording when they say it was fixed.
const SKIP = new Set(['changelog.js'])
const files = (dir) => readdirSync(dir).flatMap((f) => {
  const p = join(dir, f)
  return statSync(p).isDirectory() ? files(p) : /\.(js|json)$/.test(f) && !f.endsWith('.test.js') && !SKIP.has(f) ? [p] : []
})

describe('Russian wording of "has attacked"', () => {
  it('every Russian string says «завершит свои атаки»', () => {
    const found = []
    for (const p of files(ROOT)) {
      readFileSync(p, 'utf8').split('\n').forEach((line, i) => {
        for (const [re, why] of BAD) if (re.test(line)) found.push(`${p.slice(ROOT.length)}:${i + 1} ${why}`)
      })
    }
    expect(found).toEqual([])
  })
})
