import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import DatasheetCard from './DatasheetCard.vue'

// Minimal sheet — every heavy section (profiles/ranged/melee/points) is v-if-guarded, so a
// keyword-only sheet renders the keyword line and nothing else.
const sheet = (over = {}) => ({ id: 'terminator-squad', name: 'Terminator Squad', keywords: ['Infantry', 'Terminator'], factionKeywords: ['Adeptus Astartes'], ...over })

const kwLine = (w) => w.find('.ds-keywords').findAll('.ds-kw').map((n) => n.text())

describe('DatasheetCard granted keywords', () => {
  it('appends rule-granted keywords to the printed keyword line', () => {
    const w = mount(DatasheetCard, { props: { sheet: sheet(), grantedKeywords: [{ kw: 'Deathwing', detName: null }] } })
    expect(kwLine(w)).toEqual(['Infantry', 'Terminator', 'Deathwing', 'Adeptus Astartes'])
  })

  it('does not double a keyword the sheet already prints', () => {
    const w = mount(DatasheetCard, {
      props: { sheet: sheet({ keywords: ['Infantry', 'Deathwing'] }), grantedKeywords: [{ kw: 'Deathwing', detName: null }] },
    })
    expect(kwLine(w).filter((k) => k === 'Deathwing')).toHaveLength(1)
  })

  it('renders only the printed keywords when no grants are passed', () => {
    const w = mount(DatasheetCard, { props: { sheet: sheet() } })
    expect(kwLine(w)).toEqual(['Infantry', 'Terminator', 'Adeptus Astartes'])
  })

  it('marks a granted keyword with an asterisk and footnotes its source', () => {
    const w = mount(DatasheetCard, { props: { sheet: sheet(), grantedKeywords: [{ kw: 'Deathwing', detName: null }] } })
    expect(w.find('.ds-kw-star').exists()).toBe(true)
    const footnote = w.find('.ds-kw-footnote').text()
    expect(footnote).toContain('Deathwing')
    expect(footnote).toContain("this faction's own rules")
  })

  it('footnotes a detachment-gated grant with the detachment name', () => {
    const w = mount(DatasheetCard, { props: { sheet: sheet(), grantedKeywords: [{ kw: 'Shadow Legion', detName: 'Shadow Legion' }] } })
    const footnote = w.find('.ds-kw-footnote').text()
    expect(footnote).toContain('the Shadow Legion detachment')
  })

  it('groups keywords sharing the same source into one footnote line', () => {
    const w = mount(DatasheetCard, {
      props: {
        sheet: sheet(),
        grantedKeywords: [
          { kw: 'Deathwing', detName: null },
          { kw: 'Ravenwing', detName: null },
        ],
      },
    })
    expect(w.findAll('.ds-kw-footnote')).toHaveLength(1)
  })

  it('adds a caveat when the grant depends on an extra un-modelled condition (e.g. Warlord)', () => {
    const w = mount(DatasheetCard, {
      props: { sheet: sheet(), grantedKeywords: [{ kw: 'Battleline', detName: 'Bridgehead Strike', extra: true }] },
    })
    expect(w.find('.ds-kw-footnote').text()).toContain('additional conditions apply')
  })

  it('keeps an extra-condition grant in its own footnote line even if the base source matches another grant', () => {
    const w = mount(DatasheetCard, {
      props: {
        sheet: sheet(),
        grantedKeywords: [
          { kw: 'Battleline', detName: 'Bridgehead Strike', extra: true },
          { kw: 'Battleline Bonus', detName: 'Bridgehead Strike' },
        ],
      },
    })
    expect(w.findAll('.ds-kw-footnote')).toHaveLength(2)
  })
})

describe('DatasheetCard keyword clicks', () => {
  it('does not add the clickable class or emit when keywordLinksEnabled is off (the default)', async () => {
    const w = mount(DatasheetCard, { props: { sheet: sheet() } })
    const kw = w.find('.ds-kw')
    expect(kw.classes()).not.toContain('ds-kw-link')
    await kw.trigger('click')
    expect(w.emitted('keyword-click')).toBeUndefined()
  })

  it('emits keyword-click with the printed keyword when enabled', async () => {
    const w = mount(DatasheetCard, { props: { sheet: sheet(), keywordLinksEnabled: true } })
    await w.find('.ds-kw-link').trigger('click')
    expect(w.emitted('keyword-click')).toEqual([['Infantry']])
  })

  it('emits keyword-click for a granted (asterisked) keyword too', async () => {
    const w = mount(DatasheetCard, {
      props: { sheet: sheet(), keywordLinksEnabled: true, grantedKeywords: [{ kw: 'Deathwing', detName: null }] },
    })
    const links = w.findAll('.ds-kw-link').map((n) => n.text())
    expect(links).toContain('Deathwing')
  })

  it('never makes faction keywords clickable, even when enabled', () => {
    const w = mount(DatasheetCard, { props: { sheet: sheet(), keywordLinksEnabled: true } })
    const factionKw = w.findAll('.ds-kw').find((n) => n.text() === 'Adeptus Astartes')
    expect(factionKw.classes()).not.toContain('ds-kw-link')
  })
})

describe('DatasheetCard leader/attached-unit list', () => {
  const withLeader = (units) => sheet({ core: 'Leader', leader: { text: 'This model can be attached to the following units:', units } })
  const leaderNames = (w) => w.find('.ds-list').findAll('li').map((li) => li.text())

  it('links a bodyguard name found in the local unitIndex', () => {
    const w = mount(DatasheetCard, {
      props: { sheet: withLeader(['Terminator Squad']), unitIndex: new Map([['Terminator Squad', 'terminator-squad']]), factionSlug: 'dark-angels' },
      global: { stubs: { RouterLink: { template: '<a><slot/></a>' } } },
    })
    expect(w.find('a').text()).toBe('Terminator Squad')
  })

  it('renders a name found nowhere as plain (unlinked) text', () => {
    const w = mount(DatasheetCard, { props: { sheet: withLeader(['Deathwing Command Squad']), unitIndex: new Map() } })
    expect(leaderNames(w)).toEqual(['Deathwing Command Squad'])
    expect(w.find('a').exists()).toBe(false)
  })

  it('hides a name flagged as belonging to another faction instead of rendering it unlinked', () => {
    const w = mount(DatasheetCard, {
      props: {
        sheet: withLeader(['Terminator Squad', 'Deathwatch Terminator Squad']),
        unitIndex: new Map([['Terminator Squad', 'terminator-squad']]),
        otherFactionUnits: ['Deathwatch Terminator Squad'],
      },
    })
    expect(leaderNames(w)).toEqual(['Terminator Squad'])
  })
})

// The phone layout (≤560px) turns each weapon row into its own small card via CSS alone —
// `tr { display: grid }`, `display: contents` on the name cell, and the column labels restored
// from `data-label` since the shared `thead` is hidden. None of that is testable in jsdom, but
// the markup contract it depends on is, and losing any part of it would silently flatten the
// layout back to an unlabelled column of numbers.
// The card is drawn in four places whose width has nothing to do with the window — a faction
// page, a modal, a Combat Patrol page, a sheet of A4 that may hold two of them — so its own
// responsive tiers are container queries. A container cannot query itself, which is why the
// wrapper exists; losing it would silently freeze every tier at its widest.
describe('the shell that gets measured', () => {
  it('wraps the card', () => {
    const w = mount(DatasheetCard, { props: { sheet: { name: 'Chosen', keywords: [], factionKeywords: [] } } })
    expect(w.find('.ds-shell > .ds-card').exists()).toBe(true)
  })
})

describe('DatasheetCard — weapon row markup the phone layout depends on', () => {
  const sheet = {
    name: 'Annihilation Barge',
    ranged: [{ name: 'Gauss cannon', tags: ['LETHAL HITS'], range: '24"', a: '3', bs: '3+', s: '5', ap: '-2', d: '2' }],
    melee: [{ name: 'Armoured bulk', tags: [], a: '3', ws: '4+', s: '6', ap: '0', d: '1' }],
    keywords: ['Vehicle'],
    factionKeywords: ['Necrons'],
  }

  it('labels every stat cell, with WS in melee where ranged has BS', () => {
    const w = mount(DatasheetCard, { props: { sheet } })
    const labels = (i) => w.findAll('.ds-weapons')[i].findAll('tbody td[data-label]').map((c) => c.attributes('data-label'))
    expect(labels(0)).toEqual(['Range', 'A', 'BS', 'S', 'AP', 'D'])
    expect(labels(1)).toEqual(['Range', 'A', 'WS', 'S', 'AP', 'D'])
  })

  it('keeps the name and the ability tags in separate children of the name cell', () => {
    // They become grid items in their own right on a phone (the name on the first line, the tags
    // after the statline) — one merged text node could not be laid out that way.
    const w = mount(DatasheetCard, { props: { sheet } })
    const cell = w.find('.ds-weapons tbody td.wname')
    expect(cell.find('.wname-text').text()).toBe('Gauss cannon')
    expect(cell.find('.wtags').text()).toContain('LETHAL HITS')
  })

  it('keeps the section caption in the header row, which the phone layout reuses', () => {
    // On a phone the six stat headers are hidden and this first cell survives as the "Ranged
    // Weapons" / "Melee Weapons" label above the stacked cards — the only thing telling the two
    // blocks apart there. Removing it would leave the phone layout unlabelled.
    const w = mount(DatasheetCard, { props: { sheet } })
    const captions = w.findAll('.ds-weapons').map((t) => t.find('thead th.wname').text())
    expect(captions).toEqual(['Ranged Weapons', 'Melee Weapons'])
  })

  it('renders no tag wrapper at all for a weapon without tags', () => {
    const w = mount(DatasheetCard, { props: { sheet } })
    expect(w.findAll('.ds-weapons')[1].find('.wtags').exists()).toBe(false)
  })

  it('prints the roster overlay\'s weapon count beside the name, inside the name element', () => {
    // `qty` reaches the card only on a sheet the roster overlay has been through
    // (src/composables/rosterModifiers.js) — the printed datasheet says how many in its loadout
    // sentence, which the roster card hides. It belongs INSIDE .wname-text: on a phone that
    // element is the whole first line of the weapon's card, and a sibling would wrap to its own.
    const w = mount(DatasheetCard, { props: { sheet: { ...sheet, ranged: [{ ...sheet.ranged[0], qty: 2 }] } } })
    const name = w.find('.ds-weapons tbody td.wname .wname-text')
    expect(name.find('.wqty').text()).toBe('×2')
    expect(name.text()).toBe('Gauss cannon×2')
  })

  // A count is glued to the name it counts — no whitespace in the markup, on purpose — which made
  // "supercharge×2" one unbreakable token: a line that could not fit it moved the whole thing down
  // and ended visibly short of the column edge, which is what a reader sees as a gap after the ×2.
  // The break opportunity lets the count drop on its own instead.
  describe('the count and the name it belongs to', () => {
    it('may break between them, and only there', () => {
      const w = mount(DatasheetCard, { props: { sheet: { ...sheet, ranged: [{ ...sheet.ranged[0], qty: 2 }] } } })
      const name = w.find('.ds-weapons tbody td.wname .wname-text')
      expect(name.find('wbr').exists()).toBe(true)
      // Still one word to the reader: no space is introduced, and the count itself stays whole.
      expect(name.text()).toBe('Gauss cannon×2')
    })

    it('offers nothing to break when there is no count', () => {
      const w = mount(DatasheetCard, { props: { sheet } })
      expect(w.find('.ds-weapons tbody td.wname wbr').exists()).toBe(false)
    })
  })

  it('says nothing when the entry fields exactly one of the weapon', () => {
    // A ×1 badge on every single-weapon row would be noise on every card in the app; the count
    // only ever appears where it tells the reader something the row does not already say.
    for (const qty of [undefined, 1, null]) {
      const w = mount(DatasheetCard, { props: { sheet: { ...sheet, ranged: [{ ...sheet.ranged[0], qty }] } } })
      expect(w.find('.wqty').exists(), `qty=${qty}`).toBe(false)
    }
  })
})

describe('DatasheetCard modifier notes', () => {
  const note = (over) => ({ on: 'profile', stat: 't', op: 'add', value: 1, when: null, applied: true, ...over })

  // Read in application order the footnotes are four rules' worth of lines with nothing between
  // them. The heading is what tells a reader which source each number came from.
  it('groups the notes by source and names each source', () => {
    const w = mount(DatasheetCard, {
      props: {
        sheet: sheet(),
        statNotes: [
          note({ kind: 'detachmentRule', det: 'Creations of Bile', source: 'Experimental Augmentations' }),
          note({ kind: 'ability', from: 'led', owner: 'Fabius Bile', source: 'Enhanced Warriors', stat: 's', on: 'melee' }),
          note({ kind: 'detachmentRule', det: 'Creations of Bile', source: 'Experimental Augmentations', stat: 'm' }),
          note({ kind: 'ability', from: 'self', owner: 'Chosen', source: 'Veterans of the Long War' }),
          note({ kind: 'armyRule', det: null, source: 'Dark Pacts' }),
        ],
      },
    })
    expect(w.findAll('.ds-mod-src-h').map((n) => n.text()))
      .toEqual(['Detachment · Creations of Bile', 'Leader · Fabius Bile', 'Ability', 'Army rule'])
    // …and the two detachment lines sit together under their one heading.
    expect(w.findAll('.ds-mod-src-h')[0].element.nextElementSibling.textContent).toContain('Experimental Augmentations')
  })

  // Two lists, never one: what is in force now, and — off the table — what would be. A block
  // headed "modifiers in play" must not list what is not in play.
  it('puts what is not in force under a heading of its own', () => {
    const w = mount(DatasheetCard, {
      props: {
        sheet: sheet(),
        statNotes: [
          note({ kind: 'detachmentRule', det: 'Cursed Legion', source: 'Cold Fervour' }),
          note({ kind: 'armyRule', source: 'Dark Pacts', applied: false, live: false, when: { en: 'while a pact is invoked', ru: 'x' } }),
        ],
      },
    })
    const heads = w.findAll('.ds-mods-h').map((n) => n.text())
    expect(heads).toEqual(['Modifiers in play', 'Possible modifiers'])
    const lists = w.findAll('.ds-mods')
    expect(lists[0].text()).toContain('Cold Fervour')
    expect(lists[0].text()).not.toContain('Dark Pacts')
    expect(lists[1].text()).toContain('Dark Pacts')
    // …and the second one is the collapsing block, closed.
    expect(w.find('.ds-mods-btn').attributes('aria-expanded')).toBe('false')
    // …and it says what it is: "Possible modifiers" over a list of deltas reads as more of the
    // block above unless something states that none of it is running.
    const hints = w.findAll('.ds-mods-hint')
    expect(hints).toHaveLength(1)
    expect(hints[0].text()).toContain('Nothing here is in force yet')
  })

  // A card in a modal folds its blocks into accordions; it does not START folded. Reading a unit's
  // abilities was a tap on every group, every time the card was opened — and the standalone page
  // has never hidden them at all.
  it('opens the datasheet\'s own blocks in a modal, and leaves the possible modifiers closed', async () => {
    const w = mount(DatasheetCard, {
      props: {
        sheet: { ...sheet(), abilities: [{ name: 'Fleet Command', text: 'Redeploy up to three units.' }] },
        collapsible: true,
        statNotes: [note({ kind: 'armyRule', source: 'Dark Pacts', applied: false, live: false, when: { en: 'while a pact is invoked', ru: 'x' } })],
      },
    })
    // CollapseTransition always renders its slot, so the state is the header's own aria-expanded.
    const abilities = w.findAll('.ds-group-btn').filter((b) => b.text().includes('Abilities'))
    expect(abilities).toHaveLength(1)
    expect(abilities[0].attributes('aria-expanded')).toBe('true')
    expect(w.find('.ds-mods-btn').attributes('aria-expanded')).toBe('false')
    // …and it still folds away once it has been read.
    await abilities[0].trigger('click')
    expect(w.find('.ds-group-btn').attributes('aria-expanded')).toBe('false')
  })

  // A core rule is the same for every army in every game, so against one roster it says nothing:
  // Battle-shock's OC would otherwise be a line on every unit of every list being planned.
  it('never offers a core rule as a possible modifier', () => {
    const w = mount(DatasheetCard, {
      props: {
        sheet: sheet(),
        statNotes: [
          note({ kind: 'detachmentRule', det: 'Cursed Legion', source: 'Cold Fervour' }),
          note({ kind: 'core', source: 'Battle-shock', stat: 'oc', op: 'set', value: '-', applied: false, live: false, when: { en: 'while Battle-shocked', ru: 'x' } }),
        ],
      },
    })
    expect(w.findAll('.ds-mods-h').map((n) => n.text())).toEqual(['Modifiers in play'])
    expect(w.text()).not.toContain('Battle-shock')
  })

  // In a game the card answers "what is true right now", so a modifier that is not in force is not
  // the card's business at all — its condition and its switch live on the rule block below.
  it('drops them entirely when the caller says a game is on', () => {
    const w = mount(DatasheetCard, {
      props: {
        hidePossible: true,
        sheet: sheet(),
        statNotes: [
          note({ kind: 'detachmentRule', det: 'Cursed Legion', source: 'Cold Fervour' }),
          note({ kind: 'core', source: 'Battle-shock', applied: false, live: false, when: { en: 'while Battle-shocked', ru: 'x' } }),
        ],
      },
    })
    expect(w.findAll('.ds-mods-h').map((n) => n.text())).toEqual(['Modifiers in play'])
    expect(w.find('.ds-mods').text()).not.toContain('Battle-shock')
  })

  // A modifier IS in force but had nothing computable to change (a dice value, no matching weapon
  // row): it belongs with the ones that did rewrite a number, not with the waiting ones.
  it('keeps a live modifier that changed nothing in the in-play list', () => {
    const w = mount(DatasheetCard, {
      props: {
        hidePossible: true,
        sheet: sheet(),
        statNotes: [note({ kind: 'armyRule', source: 'Dark Pacts', value: 'D3', applied: false })],
      },
    })
    expect(w.find('.ds-mods').text()).toContain('Dark Pacts')
  })

  // The heading already says which detachment it is; repeating it on every line was the noise
  // this grouping exists to remove.
  it('does not repeat the detachment on each line', () => {
    const w = mount(DatasheetCard, {
      props: { sheet: sheet(), statNotes: [note({ kind: 'detachmentRule', det: 'Creations of Bile', source: 'Experimental Augmentations' })] },
    })
    expect(w.find('.ds-mod-src').text()).toBe('Experimental Augmentations')
  })
})
