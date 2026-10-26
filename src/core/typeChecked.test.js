// Every module of the core is type-checked (src/core/CLAUDE.md): `// @ts-check` on its first line and
// listed in tsconfig.json's `include` — `checkJs` is off, so a file needs both, and a new core module
// that lacked either would ship unchecked without a word.
import { describe, it, expect } from 'vitest'
import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const CORE = path.dirname(fileURLToPath(import.meta.url))
const ROOT = path.resolve(CORE, '../..')

function coreFiles(dir = CORE) {
  return fs.readdirSync(dir, { withFileTypes: true }).flatMap((e) => {
    const p = path.join(dir, e.name)
    if (e.isDirectory()) return coreFiles(p)
    return e.name.endsWith('.js') && !e.name.includes('.test.') ? [p] : []
  })
}

// tsconfig.json allows comments; they are stripped before parsing.
const included = new Set(JSON.parse(fs.readFileSync(path.join(ROOT, 'tsconfig.json'), 'utf8').replace(/^\s*\/\/.*$/gm, '')).include)

describe('src/core', () => {
  it('is type-checked, every module of it', () => {
    const rel = (p) => path.relative(ROOT, p).split(path.sep).join('/')
    const unchecked = coreFiles().filter((p) => !fs.readFileSync(p, 'utf8').startsWith('// @ts-check') || !included.has(rel(p))).map(rel)
    expect(unchecked).toEqual([])
  })
})
