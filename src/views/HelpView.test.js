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
    expect(w.findAll('.help-toc a')).toHaveLength(help.en.sections.length)
    expect(w.findAll('.help-toc a')[0].attributes('href')).toBe('#help-search')
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
