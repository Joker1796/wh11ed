// A JSDoc cast — `/** @type {X} */ (expr)` — is a promise the type checker takes on trust: it stops
// looking at that spot, and the promise goes stale the day the code around it changes. In the
// files tsconfig.json checks, a value that may be missing is guarded in code instead, so the
// checker can see it. 2026-10-12: the first strictNullChecks pass closed 38 findings with casts and
// had to be redone; this keeps them from coming back. A cast that is truly the only honest way to
// say something goes in ALLOWED with its reason.
import { describe, it, expect } from 'vitest'
import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '../..')
const CAST = /\/\*\*\s*@type\s*\{[^}]*\}\s*\*\/\s*\(/g

// `file:line text` → why. Empty: none is needed today.
const ALLOWED = {}

// tsconfig.json's own `include` list (it allows comments, so they are stripped first).
function checkedFiles() {
  const raw = fs.readFileSync(path.join(ROOT, 'tsconfig.json'), 'utf8').replace(/^\s*\/\/.*$/gm, '')
  return JSON.parse(raw).include
}

describe('type-checked files', () => {
  it('lists files to check', () => {
    expect(checkedFiles().length).toBeGreaterThan(0)
  })

  it('carry no casts', () => {
    const found = []
    for (const rel of checkedFiles()) {
      const lines = fs.readFileSync(path.join(ROOT, rel), 'utf8').split('\n')
      lines.forEach((line, i) => {
        if (CAST.test(line) && !ALLOWED[`${rel}:${i + 1}`]) found.push(`${rel}:${i + 1} ${line.trim()}`)
        CAST.lastIndex = 0
      })
    }
    expect(found).toEqual([])
  })

  it('tells a cast from a declaration', () => {
    expect(CAST.test('const x = /** @type {number} */ (y)')).toBe(true)
    CAST.lastIndex = 0
    expect(CAST.test('/** @type {Map<string, any[]>} */')).toBe(false)
    CAST.lastIndex = 0
  })
})
