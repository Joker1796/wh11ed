// The core's one structural rule, as a test (src/core/CLAUDE.md): nothing reaches outside src/core.
// eslint's no-restricted-imports and no-restricted-syntax hold the same line with a message saying
// why, and tsconfig.core.json holds it for types (no DOM, no Vite); this test holds it for what a
// linter rule can miss — a dynamic `import()`, a file that is not JavaScript at all (a JSON table
// dropped into the core is data in the wrong place), a bundler's reach (`import.meta`), the host
// through the back door (`globalThis`), a CommonJS `require`.
import { describe, it, expect } from 'vitest'
import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const CORE = path.dirname(fileURLToPath(import.meta.url))
const SPEC = /(?:\bfrom\s*|\bimport\s*\(\s*|\bimport\s+)['"]([^'"]+)['"]/g
const REACH = /\bimport\.meta\b|\bglobalThis\b|\brequire\s*\(/g

/** Every file under the core, tests included. */
function allFiles(dir = CORE) {
  return fs.readdirSync(dir, { withFileTypes: true }).flatMap((e) => {
    const p = path.join(dir, e.name)
    return e.isDirectory() ? allFiles(p) : [p]
  })
}
const isTest = (p) => /\.test\.js$/.test(p)
const rel = (p) => path.relative(CORE, p)

// Comments name files freely ("read from src/data/…"); only code counts.
const code = (src) => src.replace(/\/\*[\s\S]*?\*\//g, '').replace(/(^|[^:'"`])\/\/.*$/gm, '$1')

describe('src/core', () => {
  it('holds only code and its notes', () => {
    const odd = allFiles().filter((p) => !/\.js$|\.d\.ts$|CLAUDE\.md$/.test(p)).map(rel)
    expect(odd).toEqual([])
  })

  it('imports nothing from outside itself', () => {
    const outside = []
    for (const file of allFiles().filter((p) => p.endsWith('.js') && !isTest(p))) {
      for (const [, spec] of code(fs.readFileSync(file, 'utf8')).matchAll(SPEC)) {
        const target = spec.startsWith('.') ? path.resolve(path.dirname(file), spec) : null
        if (!target || !target.startsWith(CORE + path.sep)) outside.push(`${rel(file)} → ${spec}`)
      }
    }
    expect(outside).toEqual([])
  })

  it('reaches neither the bundler nor the host', () => {
    const reach = []
    for (const file of allFiles().filter((p) => p.endsWith('.js') && !isTest(p))) {
      for (const m of code(fs.readFileSync(file, 'utf8')).matchAll(REACH)) reach.push(`${rel(file)}: ${m[0]}`)
    }
    expect(reach).toEqual([])
  })
})
