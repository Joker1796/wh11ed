import { describe, it, expect } from 'vitest'
import fs from 'node:fs'
import path from 'node:path'
import { sanitizeHtml } from './sanitizeHtml.js'
import { useRenderInline } from '../composables/useRenderInline.js'

describe('sanitizeHtml', () => {
  it('shows a tag it does not know as text', () => {
    expect(sanitizeHtml('api.wh-rules.ru/broadcast/<token> answers')).toBe('api.wh-rules.ru/broadcast/&lt;token&gt; answers')
    expect(sanitizeHtml('<script>alert(1)</script>')).toBe('&lt;script&gt;alert(1)&lt;/script&gt;')
    expect(sanitizeHtml('<img src=x onerror=alert(1)>')).toBe('&lt;img src=x onerror=alert(1)&gt;')
    expect(sanitizeHtml('<iframe src="//evil"></iframe>')).toBe('&lt;iframe src="//evil"&gt;&lt;/iframe&gt;')
  })

  it('drops handlers and unsafe links, keeps the rest of the tag', () => {
    expect(sanitizeHtml('<span class="k" onclick="x()">a</span>')).toBe('<span class="k">a</span>')
    expect(sanitizeHtml('<a href="javascript:alert(1)" class="l">a</a>')).toBe('<a class="l">a</a>')
    expect(sanitizeHtml('<a href="jav&#x61;script:alert(1)">a</a>')).toBe('<a>a</a>')
    expect(sanitizeHtml('<a href="https://wh-rules.ru" target="_blank" rel="noopener">a</a>')).toBe('<a href="https://wh-rules.ru" target="_blank" rel="noopener">a</a>')
    expect(sanitizeHtml('<span style="background:url(x)">a</span>')).toBe('<span>a</span>')
    expect(sanitizeHtml('a<!-- c -->b')).toBe('ab')
  })

  it('keeps the QR code and the patch diff as they are', () => {
    const qr = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 29 29" shape-rendering="crispEdges"><path fill="#ffffff" d="M0 0h29v29H0z"/><path stroke="#000000" d="M1 1.5h7"/></svg>\n'
    expect(sanitizeHtml(qr)).toBe(qr)
    expect(sanitizeHtml('<del>old</del> <ins>new</ins>')).toBe('<del>old</del> <ins>new</ins>')
  })

  // The proof that nothing we render today changes: every string in src/data, through each
  // renderer the templates use, comes out of the sanitizer byte for byte — but for a string that
  // mentions a tag in its prose, which is exactly what the sanitizer is for.
  it('returns everything our renderers produce from the data unchanged', async () => {
    const { renderInline, renderRichText, renderParagraphs } = useRenderInline()
    const root = path.resolve(__dirname, '../data')
    const files = []
    const rec = (d) => { for (const f of fs.readdirSync(d)) { const p = path.join(d, f); if (fs.statSync(p).isDirectory()) rec(p); else if (/\.(js|json)$/.test(f) && !/\.test\./.test(f)) files.push(p) } }
    rec(root)
    const strings = new Set()
    const walk = (v, depth = 0) => {
      if (depth > 12 || v == null) return
      if (typeof v === 'string') { if (v.length > 2) strings.add(v); return }
      if (Array.isArray(v)) { v.forEach((x) => walk(x, depth + 1)); return }
      if (typeof v === 'object') for (const x of Object.values(v)) walk(x, depth + 1)
    }
    for (const f of files) { const m = await import(f); for (const v of Object.values(m)) walk(v) }
    expect(strings.size).toBeGreaterThan(50000)
    const changed = []
    for (const s of strings) {
      if (/<[a-zA-Z]/.test(s)) continue // prose that mentions a tag — escaped on purpose
      for (const html of [renderInline(s), renderRichText(s), renderParagraphs(s)]) {
        if (sanitizeHtml(html) !== html) { changed.push(s.slice(0, 120)); break }
      }
    }
    expect(changed).toEqual([])
  }, 300000)
})
