// The core's one structural rule, as a test (src/core/CLAUDE.md): every import of a core module —
// static, re-exported or a dynamic `import()` — stays inside src/core. eslint's no-restricted-imports
// holds the static ones with a message saying why; it does not see `import()`, and a lazily imported
// data file is exactly how a core module would quietly start depending on the data again.
import { describe, it, expect } from 'vitest'
import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const CORE = path.dirname(fileURLToPath(import.meta.url))
const SPEC = /(?:\bfrom\s*|\bimport\s*\(\s*|\bimport\s+)['"]([^'"]+)['"]/g

function coreFiles(dir = CORE) {
  return fs.readdirSync(dir, { withFileTypes: true }).flatMap((e) => {
    const p = path.join(dir, e.name)
    if (e.isDirectory()) return coreFiles(p)
    return e.name.endsWith('.js') && !e.name.includes('.test.') ? [p] : []
  })
}

// Comments name files freely ("read from src/data/…"); only code counts.
const code = (src) => src.replace(/\/\*[\s\S]*?\*\//g, '').replace(/(^|[^:'"`])\/\/.*$/gm, '$1')

describe('src/core', () => {
  it('imports nothing from outside itself', () => {
    const outside = []
    for (const file of coreFiles()) {
      for (const [, spec] of code(fs.readFileSync(file, 'utf8')).matchAll(SPEC)) {
        const target = spec.startsWith('.') ? path.resolve(path.dirname(file), spec) : null
        if (!target || !target.startsWith(CORE + path.sep)) outside.push(`${path.relative(CORE, file)} → ${spec}`)
      }
    }
    expect(outside).toEqual([])
  })
})
