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
    expect(html).toContain('<span class="cl-btn" role="img" aria-label="Настройки" title="Настройки"><i class="wi wi-settings"></i></span>')
    expect(html).toContain('<span class="cl-key">Put back</span>')
    expect(renderMarks('{btn:nope}')).toContain('{btn:nope}')
    // A pair of marks and the stop after them never break apart.
    expect(renderMarks('switch {btn:gear} {btn:panes}. Next')).toMatch(/<span class="cl-nw"><span class="cl-btn"[^]*bi-layout-split[^]*<\/span>\.<\/span> Next$/)
  })

  // A contributor's credit: the name in amber, escaped like any text.
  it('draws {who:…} as the amber name', () => {
    expect(renderMarks('Made by {who:Creego}. Thanks!')).toBe('Made by <strong class="cl-who">Creego</strong>. Thanks!')
    expect(renderMarks('{who:<b>}')).toBe('<strong class="cl-who">&lt;b&gt;</strong>')
  })

  // A site the note sends the reader to: https, the address as the text. Anything that is not a
  // plain host stays printed as written rather than becoming a link.
  it('draws {link:…} as a link to that site', () => {
    expect(renderMarks('Try it at {link:beta.wh-rules.ru}.')).toBe('Try it at <a class="cl-link" href="https://beta.wh-rules.ru" target="_blank" rel="noopener">beta.wh-rules.ru</a>.')
    expect(renderMarks('{link:javascript:alert(1)}')).toBe('{link:javascript:alert(1)}')
    expect(renderMarks('{link:a.ru" onclick="x}')).toBe('{link:a.ru" onclick="x}')
  })

  it('links the same sites in both locales', () => {
    const links = (s) => [...s.matchAll(/\{link:([^}]+)\}/g)].map((m) => m[1])
    for (const e of changelog) e.en.forEach((n, i) => expect(links(text(e.ru[i])), `${e.version} ru[${i}]`).toEqual(links(text(n))))
  })
})
