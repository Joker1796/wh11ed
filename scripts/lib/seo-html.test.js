import { describe, it, expect } from 'vitest'
import { renderPage, datasheetBody, genericBody, esc } from './seo-html.mjs'

// These pages are the only version of the site a non-executing crawler ever sees, and nobody on
// the team looks at them by eye — so the things that would break silently are asserted here.

const TEMPLATE = `<!DOCTYPE html>
<html lang="en">
  <head>
    <title>Site default title</title>
    <meta name="description" content="Site default description" />
    <meta property="og:title" content="Site og title" />
    <meta property="og:description" content="Site og description" />
  </head>
  <body>
    <div id="app"></div>
  </body>
</html>`

const page = (o = {}) =>
  renderPage(TEMPLATE, {
    locale: 'ru', title: 'Autarch — датащит Aeldari', description: 'Лист данных',
    canonical: 'https://wh-rules.ru/ru/x', enUrl: 'https://wh-rules.ru/x',
    ruUrl: 'https://wh-rules.ru/ru/x', body: '<h1>Autarch</h1>', ...o,
  })

describe('renderPage', () => {
  it('replaces the shared defaults instead of appending next to them', () => {
    const html = page()
    expect(html).not.toContain('Site default title')
    expect(html).not.toContain('Site default description')
    expect(html.match(/<title>/g)).toHaveLength(1)
    expect(html).toContain('<title>Autarch — датащит Aeldari</title>')
  })

  it('marks the document as Russian so the crawler does not guess', () => {
    expect(page()).toContain('<html lang="ru"')
    expect(page({ locale: 'en' })).toContain('<html lang="en"')
  })

  it('emits a self-canonical plus both hreflang alternates', () => {
    const html = page()
    expect(html).toContain('<link rel="canonical" href="https://wh-rules.ru/ru/x" />')
    expect(html).toContain('hreflang="en" href="https://wh-rules.ru/x"')
    expect(html).toContain('hreflang="ru" href="https://wh-rules.ru/ru/x"')
    expect(html).toContain('hreflang="x-default" href="https://wh-rules.ru/x"')
  })

  it('describes the page, not the site, in og tags', () => {
    const html = page()
    expect(html).toContain('<meta property="og:title" content="Autarch — датащит Aeldari" />')
    expect(html).not.toContain('Site og title')
  })

  it('puts the body inside #app, where the app will replace it on mount', () => {
    expect(page()).toContain('<div id="app"><h1>Autarch</h1></div>')
  })

  it('throws rather than silently shipping the default title if the template changes', () => {
    expect(() => renderPage('<html lang="en"><head></head><body></body></html>', {}))
      .toThrow(/no <title>/)
  })

  it('escapes text that would otherwise break out of an attribute', () => {
    expect(page({ description: 'a "quoted" <b>bit</b>' }))
      .toContain('content="a &quot;quoted&quot; &lt;b&gt;bit&lt;/b&gt;"')
  })
})

describe('datasheetBody', () => {
  const unit = {
    name: 'Autarch',
    points: [{ models: 1, points: 75 }],
    profiles: [{ name: 'Autarch', m: '7"', t: '3', sv: '3+', inv: '4+', w: '4', ld: '6+', oc: '1' }],
    ranged: [{ name: 'Death spinner', tags: ['TORRENT'], range: '12"', a: 'D6', bs: 'N/A', s: '4', ap: '-1', d: '1' }],
    melee: [],
    abilities: [{ name: 'Path of Command', text: 'English ability text.' }],
    composition: ['1 Autarch'],
    keywords: ['Infantry', 'Character'],
    factionKeywords: ['Asuryani'],
  }

  it('carries the facts a crawler would otherwise never see', () => {
    const html = datasheetBody(unit, 'Aeldari', 'en', null)
    expect(html).toContain('<h1>Autarch</h1>')
    expect(html).toContain('1 model — 75 points')
    expect(html).toContain('3+ (4+ inv)')
    expect(html).toContain('Death spinner [TORRENT]')
    expect(html).toContain('Infantry, Character, Asuryani')
  })

  it('uses the RU overlay for ability text but keeps names English', () => {
    const ru = { abilities: { 'Path of Command': 'Русский текст способности.' }, flavor: 'Флейвор.' }
    const html = datasheetBody(unit, 'Aeldari', 'ru', ru)
    expect(html).toContain('Русский текст способности.')
    expect(html).toContain('Флейвор.')
    expect(html).toContain('<dt>Path of Command</dt>') // name stays English by project convention
    expect(html).toContain('<h1>Autarch</h1>')
  })

  it('agrees Russian numerals with the count — this shows on ~1500 pages', () => {
    const body = (models, points) =>
      datasheetBody({ ...unit, points: [{ models, points }] }, 'Aeldari', 'ru', null)
    expect(body(1, 75)).toContain('1 модель — 75 очков')
    expect(body(3, 22)).toContain('3 модели — 22 очка')
    expect(body(5, 101)).toContain('5 моделей — 101 очко')
    expect(body(11, 115)).toContain('11 моделей — 115 очков')
  })

  it('survives a unit with no weapons, points or abilities', () => {
    expect(() => datasheetBody({ name: 'Nameless' }, 'Aeldari', 'ru', null)).not.toThrow()
  })
})

describe('genericBody', () => {
  it('drops the brand suffix from the heading but keeps the description', () => {
    const html = genericBody('Stratagems — Warhammer 40,000 11th Ed', 'The core stratagems.')
    expect(html).toContain('<h1>Stratagems</h1>')
    expect(html).not.toContain('Warhammer 40,000 11th Ed</h1>')
    expect(html).toContain('<p>The core stratagems.</p>')
  })
})

describe('esc', () => {
  it('handles null and numbers without printing "null"', () => {
    expect(esc(null)).toBe('')
    expect(esc(0)).toBe('0')
  })
})
