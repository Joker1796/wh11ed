import { describe, it, expect } from 'vitest'
import { changelog } from './changelog.js'
import { ACTIONS, BTN_ICONS, MARK_RE, renderMarks, SECTION_KINDS, sectionKind, noteSections, boldQuestion, INT_LINK_RE } from './changelogMarks.js'
import datasheetIds from './datasheetIds.json'
import factionLegends from './factionLegends.json'
import { proxyPages } from '../utils/legendaryProxies.js'
import { ui } from '../i18n/ui.js'
import { basicRules } from './basicRules.js'
import { battleRound } from './battleRound.js'
import { battlefields } from './battlefields.js'
import { advancedRules } from './advancedRules.js'

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

  // Every change opens with its gist in bold, so a reader skimming a release reads the bold and
  // stops where it concerns them (owner, 2026-10-13: half of 2.8.2 had it, half did not). Answers
  // are exempt — the page bolds the question itself (boldQuestion) — and so are thanks. From 2.8.2
  // on; older releases were written before the rule.
  it('opens every change with its gist in bold', () => {
    const newer = (v) => v.split('.').map(Number).reduce((a, n, i) => a || (n !== [2, 8, 2][i] ? (n > [2, 8, 2][i] ? 1 : -1) : 0), 0) >= 0
    const bad = []
    for (const e of changelog.filter((x) => newer(x.version))) {
      for (const loc of ['en', 'ru']) {
        let kind = null
        for (const n of e[loc]) {
          if (typeof n === 'object') { kind = sectionKind(n); continue }
          if (kind === 'answers' || kind === 'thanks') continue
          if (!/^\*\*[^*]+\*\*/.test(n)) bad.push(`${e.version} ${loc}: ${n.slice(0, 60)}…`)
        }
      }
    }
    expect(bad, 'start the note with **its gist.** (skill changelog-entry §3б)').toEqual([])
  })

  it('draws an icon button and a text button', () => {
    const html = renderMarks('Switch with {btn:gear}, undo with {key:Put back}.', 'ru')
    expect(html).toContain('<span class="cl-btn" role="img" aria-label="Настройки" title="Настройки"><i class="wi wi-settings"></i></span>')
    expect(html).toContain('<span class="cl-key">Put back</span>')
    expect(renderMarks('{btn:nope}')).toContain('{btn:nope}')
    // A pair of marks and the stop after them never break apart.
    expect(renderMarks('switch {btn:gear} {btn:panes}. Next')).toMatch(/<span class="cl-nw"><span class="cl-btn"[^]*wi-panes[^]*<\/span>\.<\/span> Next$/)
  })

  it('draws {do:…} as a working button, labelled as the screen labels it', () => {
    expect(renderMarks('Send it with {do:feedback}.', 'ru')).toBe('Send it with <span class="cl-nw"><a class="cl-key cl-do" href="#" role="button" data-do="feedback">Сообщить об ошибке</a>.</span>')
    expect(renderMarks('{do:nope}')).toContain('{do:nope}')
    // The button reads as the menu item it stands for.
    for (const loc of ['en', 'ru']) expect(ACTIONS.feedback[loc]).toBe(ui[loc].feedbackMenu)
  })

  it('knows the action of every {do:…} a note uses', () => {
    const acts = (s) => [...s.matchAll(MARK_RE)].filter((m) => m[3]).map((m) => m[3])
    for (const e of changelog) {
      e.en.forEach((n, i) => {
        for (const a of acts(text(n))) expect(ACTIONS, `${e.version} en[${i}] {do:${a}}`).toHaveProperty(a)
        expect(acts(text(e.ru[i])), `${e.version} ru[${i}]`).toEqual(acts(text(n)))
      })
    }
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

describe('changelog blocks', () => {
  // A heading the kinds table does not know would draw a grey block nobody chose a colour for.
  it('gives every heading a kind', () => {
    for (const e of changelog) for (const loc of ['en', 'ru']) for (const n of e[loc]) {
      if (typeof n === 'object') expect(sectionKind(n), `${e.version} ${loc} "${n.h}"`).toBeTruthy()
    }
    expect(Object.values(SECTION_KINDS).every((k) => /^wi wi-[a-z-]+$/.test(k.icon))).toBe(true)
  })

  it('groups notes under their heading, the notes before the first one headless', () => {
    expect(noteSections(['a', { h: 'Tracker' }, 'b', 'c', { h: 'Спасибо' }, 'd'])).toEqual([
      { h: null, kind: null, items: ['a'] },
      { h: 'Tracker', kind: 'tracker', items: ['b', 'c'] },
      { h: 'Спасибо', kind: 'thanks', items: ['d'] },
    ])
    expect(noteSections(['a', 'b'])).toEqual([{ h: null, kind: null, items: ['a', 'b'] }])
  })

  it('sets an answer\'s question in bold, markup and all', () => {
    expect(boldQuestion('Why <strong>X</strong>? Because.')).toBe('<strong class="cl-q">Why <strong>X</strong>?</strong> Because.')
    expect(boldQuestion('<a href="/x?y=1">Q</a> no question')).toBe('<a href="/x?y=1">Q</a> no question')
    expect(boldQuestion('No question here.')).toBe('No question here.')
  })

  // An in-app link must land somewhere: a datasheet the build ships (or a retired unit's page
  // beside them, utils/legendaryProxies.js), a Core Rules anchor that exists, or a page the router
  // knows — and both locales link the same pages.
  it('links only to pages that exist, the same ones in both locales', () => {
    const anchors = new Set(['section-faq'])
    const walk = (o) => { if (Array.isArray(o)) o.forEach(walk); else if (o && typeof o === 'object') { if (o.id) anchors.add(o.id); Object.values(o).forEach(walk) } }
    // Every chapter /core-rules renders (src/components/core/CLAUDE.md).
    for (const ch of [basicRules, battleRound, battlefields, advancedRules]) walk(ch)
    const pages = new Set(['/core-rules', '/patches', '/changelog', '/roster', '/tracker', '/stratagems', '/help', '/event-companion', '/combat-patrol', '/combat-patrol/how-to-play'])
    const links = (n) => [...text(n).matchAll(INT_LINK_RE)].map((m) => m[2])
    for (const e of changelog) {
      e.en.forEach((n, i) => {
        expect(links(e.ru[i]), `${e.version} ru[${i}]`).toEqual(links(n))
        for (const href of links(n)) {
          const [path, hash] = href.split('#')
          const ds = /^\/factions\/([a-z-]+)\/datasheets\/([a-z0-9-]+)$/.exec(path)
          if (ds) expect([...(datasheetIds[ds[1]] || []), ...proxyPages(factionLegends[ds[1]]).map((p) => p.pid)], `${e.version}: ${href}`).toContain(ds[2])
          else expect(pages.has(path) || /^\/factions\/[a-z-]+$/.test(path), `${e.version}: ${href}`).toBe(true)
          if (path === '/core-rules' && hash) expect(anchors.has(hash), `${e.version}: ${href}`).toBe(true)
        }
      })
    }
  })
})
