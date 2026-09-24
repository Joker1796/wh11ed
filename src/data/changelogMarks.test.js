import { describe, it, expect } from 'vitest'
import { changelog } from './changelog.js'
import { BTN_ICONS, MARK_RE, renderMarks } from './changelogMarks.js'

const text = (n) => (typeof n === 'string' ? n : n.h)
const btns = (s) => [...s.matchAll(MARK_RE)].filter((m) => m[1]).map((m) => m[1])

describe('changelog marks', () => {
  // A typo would print "{btn:…}" to a reader; a mark on one side only would tell the two locales
  // different things about the same screen.
  it('names only known icons, and the same ones in both locales', () => {
    for (const e of changelog) {
      e.en.forEach((n, i) => {
        const en = btns(text(n))
        for (const b of en) expect(BTN_ICONS, `${e.version} en[${i}] {btn:${b}}`).toHaveProperty(b)
        expect(btns(text(e.ru[i])), `${e.version} ru[${i}]`).toEqual(en)
      })
    }
  })

  it('draws an icon button and a text button', () => {
    const html = renderMarks('Switch with {btn:gear}, undo with {key:Put back}.', 'ru')
    expect(html).toContain('<span class="cl-btn" role="img" aria-label="Настройки" title="Настройки"><i class="bi bi-gear"></i></span>')
    expect(html).toContain('<span class="cl-key">Put back</span>')
    expect(renderMarks('{btn:nope}')).toContain('{btn:nope}')
    // A pair of marks and the stop after them never break apart.
    expect(renderMarks('switch {btn:gear} {btn:panes}. Next')).toMatch(/<span class="cl-nw"><span class="cl-btn"[^]*bi-layout-split[^]*<\/span>\.<\/span> Next$/)
  })
})
