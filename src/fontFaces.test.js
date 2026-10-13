import { describe, it, expect } from 'vitest'
import fs from 'node:fs'
import path from 'node:path'

// The cheap half of the font-face guard, on every `npm test`: src/fonts.js loads only the faces
// the app draws (the installed app's warm-up fetches every subset of each), and a style asking
// for one it does not load is substituted by the browser without a word. This reads the stylesheets
// — `npm run a11y` and `npm run smoke` read the rendered pages (scripts/lib/font-faces.mjs), which
// also catch an inherited weight this cannot see.
//
// The loaded set comes from src/fonts.js itself: adding a face there is all it takes to allow it.

const SRC = path.resolve(__dirname)
const FAMILIES = { inter: 'sans', 'sofia-sans-extra-condensed': 'display', 'eb-garamond': 'serif' }

function loadedFaces() {
  const text = fs.readFileSync(path.join(SRC, 'fonts.js'), 'utf8')
  const out = { sans: new Set(), display: new Set(), serif: new Set() }
  for (const m of text.matchAll(/^import '@fontsource\/([a-z-]+)\/(\d{3})(-italic)?\.css'/gm)) {
    out[FAMILIES[m[1]]].add(`${m[2]}${m[3] ? ' italic' : ''}`)
  }
  return out
}

function styleFiles(dir, out = []) {
  for (const f of fs.readdirSync(dir)) {
    const p = path.join(dir, f)
    if (fs.statSync(p).isDirectory()) styleFiles(p, out)
    else if (/\.(vue|css)$/.test(f)) out.push(p)
  }
  return out
}

// Every declaration block that sets a weight, a style or a family, with where it is.
function blocks() {
  const out = []
  for (const file of styleFiles(SRC)) {
    const text = fs.readFileSync(file, 'utf8')
    const css = file.endsWith('.vue') ? (text.match(/<style[^>]*>[\s\S]*?<\/style>/g) || []).join('\n') : text
    for (const m of css.matchAll(/([^{}]*)\{([^{}]*)\}/g)) {
      const body = m[2]
      if (!/font-(weight|style|family)/.test(body)) continue
      const get = (prop) => (body.match(new RegExp(`(?:^|;|\\s)${prop}\\s*:\\s*([^;]+)`)) || [])[1]?.trim()
      out.push({
        where: `${path.relative(SRC, file)} ${m[1].trim().split('\n').pop().slice(0, 60)}`,
        weight: get('font-weight'),
        style: get('font-style'),
        family: get('font-family'),
      })
    }
  }
  return out
}

const faces = loadedFaces()
const all = blocks()
const NAMED = { normal: '400', bold: '700' }
const numeric = (w) => NAMED[w] || (/^\d{3}$/.test(w || '') ? w : null)
const familyOf = (f) => (/--font-display/.test(f || '') ? 'display' : /--font-serif/.test(f || '') ? 'serif' : /--font-sans/.test(f || '') ? 'sans' : null)
const weightsOf = (fam) => new Set([...faces[fam]].map((f) => f.split(' ')[0]))

describe('font faces in the stylesheets', () => {
  it('reads the loaded faces from src/fonts.js', () => {
    expect(faces.sans.size).toBeGreaterThan(0)
    expect(faces.display.size).toBeGreaterThan(0)
    expect(faces.serif.size).toBeGreaterThan(0)
    expect(all.length).toBeGreaterThan(100)
  })

  it('asks for no weight that no face is loaded in', () => {
    const any = new Set([...weightsOf('sans'), ...weightsOf('display'), ...weightsOf('serif')])
    const bad = all.filter((b) => numeric(b.weight) && !any.has(numeric(b.weight))).map((b) => `${b.where} — font-weight: ${b.weight}`)
    expect(bad, 'load the face in src/fonts.js, or use a weight that is loaded').toEqual([])
  })

  it('gives a block that names its family a weight that family is loaded in', () => {
    const bad = all
      .filter((b) => familyOf(b.family) && familyOf(b.family) !== 'serif' && numeric(b.weight))
      .filter((b) => !weightsOf(familyOf(b.family)).has(numeric(b.weight)))
      .map((b) => `${b.where} — ${b.family} at ${b.weight}`)
    expect(bad).toEqual([])
  })

  it('sets EB Garamond only in a face it is loaded in', () => {
    const bad = all
      .filter((b) => familyOf(b.family) === 'serif')
      .filter((b) => !faces.serif.has(`${numeric(b.weight) || '400'}${b.style === 'italic' ? ' italic' : ''}`))
      .map((b) => `${b.where} — weight ${b.weight || '(inherited)'}, style ${b.style || '(inherited)'}`)
    expect(bad, 'EB Garamond is loaded as ' + [...faces.serif].join(', ')).toEqual([])
  })
})
