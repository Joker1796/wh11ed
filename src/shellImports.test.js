import { describe, it, expect } from 'vitest'
import fs from 'node:fs'
import path from 'node:path'

// What every visitor downloads is the entry plus everything main.js reaches by STATIC import —
// the `app` chunk (vite.config.js, app-shell-chunk). One static import of the tracker store from
// App.vue put every mission, the Event Companion and the roster store into it (~300 KB of source,
// found 2026-10-13, two months after it happened); nothing failed. This walks the same graph from
// the source and fails when it reaches a module that belongs to a section, not to the shell.
// A module listed here is meant to arrive with its page, through a dynamic import().

const SRC = path.resolve(__dirname)

const NOT_IN_SHELL = [
  'composables/useTracker.js',
  'composables/useRosters.js',
  'data/missions.js',
  'data/missionsRu.js',
  'data/eventCompanion.js',
  'core/rules/conditions.js',
  'data/changelog.js',
  'data/datasheets/ru/localize.js',
  'data/datasheetRenames.json',
]

function resolve(from, spec) {
  if (!spec.startsWith('.')) return null
  const p = path.resolve(path.dirname(from), spec)
  for (const c of [p, `${p}.js`, `${p}.vue`, `${p}/index.js`]) {
    if (fs.existsSync(c) && fs.statSync(c).isFile()) return c
  }
  return null
}

// Static `import … from '…'` / `export … from '…'` / side-effect `import '…'` — never `import(…)`.
const STATIC = /(?:^|\n)\s*(?:import|export)\s+(?:[^'"()]*?\s+from\s+)?['"]([^'"]+)['"]/g

function shellGraph() {
  const via = new Map()
  const walk = (file, from) => {
    if (via.has(file)) return
    via.set(file, from)
    if (file.endsWith('.json')) return
    const text = fs.readFileSync(file, 'utf8')
    const code = file.endsWith('.vue') ? (text.match(/<script[^>]*>[\s\S]*?<\/script>/g) || []).join('\n') : text
    for (const m of code.matchAll(STATIC)) {
      const next = resolve(file, m[1])
      if (next && /\.(js|vue|json)$/.test(next)) walk(next, file)
    }
  }
  walk(path.join(SRC, 'main.js'), null)
  return via
}

describe('the app shell', () => {
  const via = shellGraph()
  const chain = (file) => {
    const out = []
    for (let f = file; f; f = via.get(f)) out.unshift(path.relative(SRC, f))
    return out.join(' → ')
  }

  it('is walked from main.js', () => {
    expect(via.size).toBeGreaterThan(50)
    expect(via.has(path.join(SRC, 'App.vue'))).toBe(true)
  })

  it.each(NOT_IN_SHELL)('does not statically reach %s', (mod) => {
    const file = path.join(SRC, mod)
    expect(fs.existsSync(file), `${mod} moved — update this list`).toBe(true)
    expect(via.has(file) ? chain(file) : null, 'import it lazily (import()) or through a light module like gameInPlay.js').toBe(null)
  })
})
