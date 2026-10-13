import { describe, it, expect } from 'vitest'
import fs from 'node:fs'
import path from 'node:path'

// A `var(--x)` with no fallback and no `--x` defined anywhere is not an error to the browser: the
// declaration is dropped at computed-value time and the property inherits. So it never looks
// broken — it looks like the parent. `var(--font-body)` (never defined; the body face is
// `--font-sans`) drew the roster's ally tag and the faction pages' RU subheadings in the HEADING
// face, Sofia 500 at 13px, for months (found 2026-10-13 when Sofia 600 was dropped and smoke saw
// the tag ask for it). This fails on any such reference that is not listed below with its reason.
//
// Defined means: a `--x:` declaration in a stylesheet, a `'--x'` key in a :style object, or a
// setProperty('--x', …) — anywhere under src/ or in index.html.

const ROOT = path.resolve(__dirname, '..')

// Known, each with its reason. `--text-secondary` and `--muted` (21 hints and captions) were
// removed 2026-10-13 rather than defined: the owner kept the colour they had always been drawn in.
const KNOWN = {
}

function files(dir, out = []) {
  for (const f of fs.readdirSync(dir)) {
    const p = path.join(dir, f)
    if (fs.statSync(p).isDirectory()) files(p, out)
    else if (/\.(vue|css|js)$/.test(f) && !/\.test\.js$/.test(f)) out.push(p)
  }
  return out
}

const sources = [...files(path.join(ROOT, 'src')), path.join(ROOT, 'index.html')]
const defined = new Set()
const bare = new Map() // var(--x) with no fallback → where
for (const file of sources) {
  const text = fs.readFileSync(file, 'utf8')
  for (const m of text.matchAll(/(--[\w-]+)\s*:/g)) defined.add(m[1])
  for (const m of text.matchAll(/['"`](--[\w-]+)['"`]/g)) defined.add(m[1])
  for (const m of text.matchAll(/var\(\s*(--[\w-]+)\s*\)/g)) {
    if (!bare.has(m[1])) bare.set(m[1], new Set())
    bare.get(m[1]).add(path.relative(ROOT, file))
  }
}

describe('CSS custom properties', () => {
  it('found the stylesheets', () => {
    expect(defined.size).toBeGreaterThan(100)
    expect(bare.size).toBeGreaterThan(50)
  })

  it('every var() without a fallback names a property something defines', () => {
    const missing = [...bare]
      .filter(([name]) => !defined.has(name) && !KNOWN[name])
      .map(([name, where]) => `${name} — ${[...where].join(', ')}`)
    expect(missing, 'define it, use the token that exists, or give var() a fallback').toEqual([])
  })

  it('lists no known case that has since been fixed', () => {
    const stale = Object.keys(KNOWN).filter((name) => defined.has(name) || !bare.has(name))
    expect(stale, 'remove it from KNOWN').toEqual([])
  })
})
