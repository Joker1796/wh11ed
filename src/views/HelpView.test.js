import { afterEach, describe, it, expect, vi } from 'vitest'

// HelpTopicView reads the topic off the route; the rest of this file mounts plain content views.
let TOPIC = 'search'
vi.mock('vue-router', () => ({
  useRoute: () => ({ params: { get topic() { return TOPIC } } }),
  useRouter: () => ({ replace: vi.fn() }),
  RouterLink: { name: 'RouterLink', props: ['to'], template: '<a :href="to"><slot /></a>' },
}))
import { mount } from '@vue/test-utils'
import HelpView from './HelpView.vue'
import HelpTopicView from './HelpTopicView.vue'
import { help, slugOf } from '../data/help.js'
import { useLocale } from '../composables/useLocale.js'

const stubs = { RouterLink: { props: ['to'], template: '<a :href="to"><slot /></a>' } }
const { locale } = useLocale()
afterEach(() => { locale.value = 'en' })

describe('help content', () => {
  // The same bilingual parity rule the rule data lives under: the two halves are edited in lockstep,
  // and a marker count that has drifted is the characteristic bug in this repo.
  it('keeps the EN and RU halves structurally identical', () => {
    const bullets = (b) => (b.match(/^▪/gm) || []).length
    expect(help.ru.sections.map((s) => s.id)).toEqual(help.en.sections.map((s) => s.id))
    // A `to` is a path (language-agnostic) and must match; a `toLabel` is copy and must exist on
    // both halves whenever it does. A link on one side only would be a dead end in one language.
    expect(help.ru.sections.map((s) => s.to)).toEqual(help.en.sections.map((s) => s.to))
    for (const loc of ['en', 'ru']) {
      for (const s of help[loc].sections) expect(Boolean(s.to), `${loc} ${s.id}`).toBe(Boolean(s.toLabel))
    }
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

describe('HelpView — the contents', () => {
  it('lists every topic, in order, as a link to its own page', () => {
    const w = mount(HelpView, { global: { stubs } })
    const nav = w.findAll('.help-nav-item')
    expect(nav).toHaveLength(help.en.sections.length)
    expect(nav.map((a) => a.attributes('href'))).toEqual(help.en.sections.map((s) => `/help/${slugOf(s)}`))
    // Reads as a contents list, not as a row of tags: numbered, one per line, titled.
    expect(w.find('.help-nav-h').text()).toBe('Contents')
    expect(nav.map((a) => a.find('.help-nav-n').text())).toEqual(['1.', '2.', '3.', '4.', '5.', '6.'])
    expect(nav[0].find('.help-nav-t').text()).toBe(help.en.sections[0].title)
  })

  // The index is a way in, not the guide: the bodies live on the topic pages now, and printing
  // them here as well would put the whole thing back on one page.
  it('carries no section bodies of its own', () => {
    const w = mount(HelpView, { global: { stubs } })
    expect(w.find('.help-body').exists()).toBe(false)
    expect(w.text()).not.toContain('Ctrl + K')
  })

  it('follows the locale', () => {
    locale.value = 'ru'
    const w = mount(HelpView, { global: { stubs } })
    expect(w.find('.hero-title').text()).toBe('Как пользоваться')
    expect(w.text()).toContain(help.ru.sections[2].title)
  })
})

describe('HelpTopicView — one topic', () => {
  const mountTopic = (topic) => { TOPIC = topic; return mount(HelpTopicView, { global: { stubs } }) }

  it('renders the body through the shared block renderer, not as flat text', () => {
    const w = mountTopic('search')
    const html = w.find('.help-body').html()
    expect(html).toContain('<ul>')                  // the ▪ lines became a real list
    expect(html).toContain('<strong>')              // **bold** was rendered
    expect(html).toContain('class="keyword"')       // …and [LETHAL HITS] is tappable
    expect(w.text()).not.toContain('▪')
  })

  // Three of the six describe a section of the app and end with a door into it; the other three
  // (search, offline, data) describe no single section and must not invent one.
  it('ends with a link into the section it describes, where there is one', () => {
    const w = mountTopic('tracker')
    expect(w.find('.help-go').attributes('href')).toBe('/tracker')
    expect(w.find('.help-go').text()).toContain('Open the tracker')
    expect(mountTopic('offline').find('.help-go').exists()).toBe(false)
  })

  // Six topics read in order as often as they are arrived at singly, so each page offers its
  // neighbours — the first has no previous, the last no next.
  it('offers the neighbouring topics, and only the ones that exist', () => {
    const first = mountTopic(slugOf(help.en.sections[0]))
    expect(first.find('.ha-prev').exists()).toBe(false)
    expect(first.find('.ha-next').attributes('href')).toBe(`/help/${slugOf(help.en.sections[1])}`)

    const last = mountTopic(slugOf(help.en.sections.at(-1)))
    expect(last.find('.ha-next').exists()).toBe(false)
    expect(last.find('.ha-prev').attributes('href')).toBe(`/help/${slugOf(help.en.sections.at(-2))}`)
  })
})
