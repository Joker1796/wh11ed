import { describe, it, expect } from 'vitest'
import fs from 'node:fs'
import path from 'node:path'

// The app draws its own icons (`.wi`, src/assets/icons) — the Bootstrap icon font went on
// 2026-10-13, owner's decision: no one else's drawings shipped as ours. A `bi bi-…` written by habit
// would draw nothing at all, and a `wi-…` with no rule draws an empty box, both silently; this
// fails on either, and on a drawing nothing uses.

const SRC = path.resolve(__dirname)
const ICONS = path.join(SRC, 'assets/icons')

function files(dir, out = []) {
  for (const f of fs.readdirSync(dir)) {
    const p = path.join(dir, f)
    if (fs.statSync(p).isDirectory()) files(p, out)
    else if (/\.(vue|js|css)$/.test(f) && !/\.test\.js$/.test(f)) out.push(p)
  }
  return out
}

const sources = files(SRC).map((p) => ({ p: path.relative(SRC, p), text: fs.readFileSync(p, 'utf8') }))
const css = fs.readFileSync(path.join(SRC, 'style.css'), 'utf8')
const rules = new Map([...css.matchAll(/\.wi-([a-z0-9-]+) \{ mask-image: url\('\.\/assets\/icons\/([a-z0-9-]+\.svg)'\)/g)].map((m) => [m[1], m[2]]))
// Names built in a template: `wi-dice-${n}`, `wi-chevron-${from}` — every value they can take.
const BUILT = { 'dice-': ['1', '2', '3', '4', '5', '6'], 'chevron-': ['down', 'up', 'left', 'right'], 'unit-': ['table', 'reserve', 'destroyed'] }

describe('icons', () => {
  it('reads the rules', () => {
    expect(rules.size).toBeGreaterThan(80)
  })

  it('uses no Bootstrap icon', () => {
    const bad = sources.flatMap(({ p, text }) =>
      [...text.matchAll(/(?<![\w-])(?:bi-[a-z][a-z0-9-]*|bootstrap-icons)|class="bi[" ]/g)].map((m) => `${p}: ${m[0]}`))
    expect(bad, 'draw it in src/assets/icons and use .wi').toEqual([])
    expect(fs.readFileSync(path.join(SRC, '../package.json'), 'utf8')).not.toMatch(/bootstrap-icons/)
  })

  it('names only icons that have a drawing', () => {
    const used = new Set()
    for (const { text } of sources) {
      for (const m of text.matchAll(/(?<![\w-])wi-([a-z0-9]+(?:-[a-z0-9]+)*)(-?)(\$\{)?/g)) {
        if (m[3]) for (const v of BUILT[`${m[1]}-`] || [`?{${m[1]}}`]) used.add(`${m[1]}-${v}`)
        else if (!m[2]) used.add(m[1]) // a name ending in "-" is a family named in prose (`.wi-unit-*`)
      }
    }
    const missing = [...used].filter((n) => !rules.has(n))
    expect(missing, 'add a .wi-<name> rule in style.css (and the drawing)').toEqual([])
  })

  it('ships no drawing that no rule shows', () => {
    const shown = new Set(rules.values())
    const idle = fs.readdirSync(ICONS).filter((f) => !shown.has(f))
    expect(idle).toEqual([])
  })
})
