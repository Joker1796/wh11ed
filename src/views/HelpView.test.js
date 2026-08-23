import { afterEach, describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import HelpView from './HelpView.vue'
import { help } from '../data/help.js'
import { useLocale } from '../composables/useLocale.js'

const stubs = { RouterLink: { props: ['to'], template: '<a><slot /></a>' } }
const { locale } = useLocale()
afterEach(() => { locale.value = 'en' })

describe('help content', () => {
  // The same bilingual parity rule the rule data lives under: the two halves are edited in lockstep,
  // and a marker count that has drifted is the characteristic bug in this repo.
  it('keeps the EN and RU halves structurally identical', () => {
    const bullets = (b) => (b.match(/^▪/gm) || []).length
    expect(help.ru.sections.map((s) => s.id)).toEqual(help.en.sections.map((s) => s.id))
    for (const [i, en] of help.en.sections.entries()) {
      const ru = help.ru.sections[i]
      expect(bullets(ru.body), en.id).toBe(bullets(en.body))
      for (const s of [en, ru]) {
        expect((s.body.match(/\*\*/g) || []).length % 2, s.id).toBe(0)   // no unbalanced bold
        expect(s.title.length, s.id).toBeGreaterThan(0)
      }
    }
  })

  // The faction rules are the bulk of the app; Combat Patrol is a side door. The page used to give
  // them equal billing in its own heading, which is not what the product is.
  it('leads the rules section with the factions, and keeps Combat Patrol as an aside', () => {
    for (const loc of ['en', 'ru']) {
      const s = help[loc].sections.find((x) => x.id === 'help-rules')
      expect(s.title, loc).not.toMatch(/Combat Patrol/)
      const body = s.body
      expect(body.indexOf('Combat Patrol'), loc).toBeGreaterThan(body.length / 2)  // last, not first
    }
  })

  // Everything here has to be something a reader cannot see for themselves — the four questions
  // this page exists to answer. If one of these ever stops being covered, the page has drifted.
  it('answers the questions the screen does not', () => {
    for (const loc of ['en', 'ru']) {
      const ids = help[loc].sections.map((s) => s.id)
      expect(ids).toContain('help-offline')   // a tab is light; the installed app is not
      expect(ids).toContain('help-data')      // where lists live, and why our points can differ
      expect(ids).toContain('help-rosters')   // import / export / share / hand to the tracker
      expect(ids).toContain('help-search')    // Ctrl+K, which has no visible entry point
    }
  })
})

describe('HelpView', () => {
  it('renders every section with an anchor, and a table of contents to reach it', () => {
    const w = mount(HelpView, { global: { stubs } })
    const ids = w.findAll('.help-section').map((s) => s.attributes('id'))
    expect(ids).toEqual(help.en.sections.map((s) => s.id))
    const nav = w.findAll('.help-nav-item')
    expect(nav).toHaveLength(help.en.sections.length)
    expect(nav[0].attributes('href')).toBe('#help-search')
    // Reads as a contents list, not as a row of tags: numbered, one per line, titled.
    expect(w.find('.help-nav-h').text()).toBe('Contents')
    expect(nav.map((a) => a.find('.help-nav-n').text())).toEqual(['1', '2', '3', '4', '5', '6'])
    expect(nav[0].find('.help-nav-t').text()).toBe(help.en.sections[0].title)
  })

  // The lit row is what makes it navigation rather than a list of links: it says where you are.
  it('lights the row for the section being read', async () => {
    const w = mount(HelpView, { global: { stubs }, attachTo: document.body })
    // jsdom lays nothing out, so place the sections by hand: the second one is just above the
    // header line, the ones after it are still below the fold.
    help.en.sections.forEach((s, i) => {
      const el = document.getElementById(s.id)
      el.getBoundingClientRect = () => ({ top: i <= 1 ? 50 : 800, height: 200 })
    })
    window.dispatchEvent(new Event('scroll'))
    await new Promise((r) => setTimeout(r, 40))
    const lit = w.findAll('.help-nav-item').filter((a) => a.classes().includes('on'))
    expect(lit).toHaveLength(1)
    expect(lit[0].attributes('href')).toBe(`#${help.en.sections[1].id}`)
    expect(lit[0].attributes('aria-current')).toBe('true')
    w.unmount()
  })

  it('renders the body through the shared block renderer, not as flat text', () => {
    const w = mount(HelpView, { global: { stubs } })
    const html = w.find('.help-body').html()
    expect(html).toContain('<ul>')                  // the ▪ lines became a real list
    expect(html).toContain('<strong>')              // **bold** was rendered
    expect(html).toContain('class="keyword"')       // …and [LETHAL HITS] is tappable
    expect(w.text()).not.toContain('▪')
  })

  it('follows the locale', () => {
    locale.value = 'ru'
    const w = mount(HelpView, { global: { stubs } })
    expect(w.find('.hero-title').text()).toBe('Как пользоваться')
    expect(w.text()).toContain('Собрать армейский лист')
  })
})
