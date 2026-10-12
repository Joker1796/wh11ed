// A component that is the direct child of a <Transition mode="out-in"> must have exactly one root
// node, comments included. out-in waits for the leaving root's transition to report back; a
// Fragment root — which a comment before or after the root element makes it in dev, where comments
// survive — never does, so the next child never mounts and the space stays blank. The views are
// held to this by eslint (`vue/no-multiple-template-root` on src/views); a component swapped in by a
// view's own out-in was not, and a saved list's tabs went blank on the second switch (2026-10-12,
// RosterRulesTab and RosterStratagemsTab had their explaining comment above the root).
import { describe, it, expect } from 'vitest'
import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import { parse } from '@vue/compiler-sfc'

const SRC = path.join(path.dirname(fileURLToPath(import.meta.url)), '..')
const files = (dir) => fs.readdirSync(dir, { withFileTypes: true }).flatMap((e) => {
  const p = path.join(dir, e.name)
  return e.isDirectory() ? files(p) : p.endsWith('.vue') ? [p] : []
})

const ELEMENT = 1
const COMMENT = 3
const TEXT = 2

// The root nodes of a template as Vue sees them in dev: elements and comments, whitespace dropped.
function roots(file) {
  const { descriptor } = parse(fs.readFileSync(file, 'utf8'), { filename: file })
  return (descriptor.template?.ast?.children || []).filter((n) => !(n.type === TEXT && !n.content.trim()))
}

// Every component named as a direct child of an out-in transition, with the file it is imported from.
function outInChildren(file) {
  const src = fs.readFileSync(file, 'utf8')
  const { descriptor } = parse(src, { filename: file })
  const script = (descriptor.scriptSetup || descriptor.script)?.content || ''
  const found = []
  const walk = (node) => {
    if (node.type !== ELEMENT) return
    const outIn = /^transition$/i.test(node.tag)
      && node.props.some((p) => p.name === 'mode' && p.value?.content === 'out-in')
    for (const c of node.children || []) {
      if (outIn && c.type === ELEMENT && /^[A-Z]/.test(c.tag)) {
        const from = script.match(new RegExp(`import\\s+${c.tag}\\s+from\\s+'([^']+\\.vue)'`))?.[1]
        if (from) found.push({ tag: c.tag, file: path.resolve(path.dirname(file), from) })
      }
      walk(c)
    }
  }
  for (const n of descriptor.template?.ast?.children || []) walk(n)
  return found
}

describe('out-in transition children', () => {
  it('finds the components it guards', () => {
    const all = files(SRC).flatMap(outInChildren).map((c) => c.tag)
    expect(all).toContain('RosterRulesTab')
    expect(all).toContain('RosterStratagemsTab')
  })

  it('each has one root element and no comment beside it', () => {
    const bad = []
    for (const file of files(SRC)) {
      for (const c of outInChildren(file)) {
        const r = roots(c.file)
        if (r.length !== 1 || r[0].type !== ELEMENT) {
          bad.push(`${path.relative(SRC, c.file)} (in ${path.relative(SRC, file)}): ${r.map((n) => (n.type === COMMENT ? 'comment' : n.tag || 'text')).join(', ')}`)
        }
      }
    }
    expect(bad).toEqual([])
  })
})
