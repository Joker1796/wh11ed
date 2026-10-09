import { describe, it, expect } from 'vitest'
import { readFileSync, readdirSync, statSync } from 'node:fs'
import { join } from 'node:path'
import { ui } from './ui.js'

// ui.js is two flat maps of interface strings, one per locale, ~820 keys each — and nothing
// enforced that they hold the same keys. A key present only in `en` does not throw: the RU
// reader simply gets the English string, which is the quietest possible failure. (The data files
// have `npm run parity` for exactly this; interface text had nothing until 2026-09-15.)
describe('ui.js: the two locales are the same shape', () => {
  it('has every key in both locales', () => {
    const en = Object.keys(ui.en)
    const ru = Object.keys(ui.ru)
    expect(en.filter((k) => !(k in ui.ru))).toEqual([])
    expect(ru.filter((k) => !(k in ui.en))).toEqual([])
  })

  it('gives every key the same type on both sides', () => {
    const mismatched = Object.keys(ui.en).filter((k) => typeof ui.en[k] !== typeof ui.ru[k])
    expect(mismatched).toEqual([])
  })

  it('leaves no RU value empty where EN has text', () => {
    const blank = Object.keys(ui.en).filter(
      (k) => typeof ui.en[k] === 'string' && ui.en[k].trim() && !String(ui.ru[k] ?? '').trim(),
    )
    expect(blank).toEqual([])
  })
})

// The other direction: a key the code reads must exist. A missing one throws nothing either — the
// button just renders empty. 2.7.19 shipped the game screen's Draw / Choose / Next buttons blank:
// ui.js came over whole from the tracker branch, where the old tracker's keys had been deleted
// (owner, 2026-10-09). Reads written `labels.X` / `labels.value.X` are found here; a key taken
// from a table (trackerOptions.js) has its own test beside that table.
describe('ui.js: every key the code reads exists', () => {
  const SRC = join(__dirname, '..')
  const files = (dir) => readdirSync(dir).flatMap((f) => {
    const p = join(dir, f)
    if (statSync(p).isDirectory()) return files(p)
    return /\.(vue|js)$/.test(f) && !/\.test\.js$/.test(f) ? [p] : []
  })
  const READ = /(?<![.\w])labels\.(?:value\.)?([A-Za-z_]\w*)/g

  it('finds every labels.X in both locales', () => {
    const missing = new Set()
    for (const f of files(SRC)) {
      for (const [, key] of readFileSync(f, 'utf8').matchAll(READ)) {
        if (key === 'value') continue
        if (!(key in ui.en) || !(key in ui.ru)) missing.add(`${f.slice(SRC.length + 1)}: ${key}`)
      }
    }
    expect([...missing]).toEqual([])
  })
})
