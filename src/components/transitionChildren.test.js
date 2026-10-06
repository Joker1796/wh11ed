import { describe, it, expect } from 'vitest'
import { readFileSync, readdirSync, statSync } from 'node:fs'
import path from 'node:path'

// A <Transition> renders exactly ONE child. Wrapped around a v-for it draws the first item and
// silently drops the rest — doubles showed one of a team's two armies and its Next never lit
// (GameSetup, shipped in 2.7.15, a player found it 2026-10-05). The component tests could not see
// it: @vue/test-utils stubs Transition with a pass-through that renders every child. So this reads
// the templates themselves. A list that animates belongs in <TransitionGroup>, or each item gets
// its own wrapper.
const ROOT = path.resolve(__dirname, '..')
function vueFiles(dir) {
  return readdirSync(dir).flatMap((n) => {
    const p = path.join(dir, n)
    return statSync(p).isDirectory() ? vueFiles(p) : n.endsWith('.vue') ? [p] : []
  })
}
const WRAPPERS = /<(ExpandTransition|CollapseTransition|Transition)\b[^>]*>\s*(?:<!--[\s\S]*?-->\s*)*<[a-zA-Z][^>]*?\sv-for=/g

describe('a <Transition> never wraps a v-for', () => {
  it('no component puts a list inside a single-child transition', () => {
    const hits = []
    for (const f of vueFiles(ROOT)) {
      const src = readFileSync(f, 'utf8')
      for (const m of src.matchAll(WRAPPERS)) {
        hits.push(`${path.relative(ROOT, f)}:${src.slice(0, m.index).split('\n').length} (${m[1]})`)
      }
    }
    expect(hits).toEqual([])
  })
})
