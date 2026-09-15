import { describe, it, expect } from 'vitest'
import { useRenderInline } from './useRenderInline.js'

const { renderInline } = useRenderInline()

describe('renderInline auto-bolded keywords', () => {
  it('bolds core unit-type keywords', () => {
    expect(renderInline('an INFANTRY unit')).toBe('an <strong>INFANTRY</strong> unit')
  })

  it('bolds Faction and allegiance keywords', () => {
    expect(renderInline('a HERETIC ASTARTES unit')).toBe('a <strong>HERETIC ASTARTES</strong> unit')
    expect(renderInline('your WARLORD')).toBe('your <strong>WARLORD</strong>')
  })

  // The alternation is sorted longest-first for exactly this: CHAOS is itself a keyword and
  // a prefix of CHAOS KNIGHTS, IMPERIUM is a suffix of AGENTS OF THE IMPERIUM. A naive
  // (declaration-order) alternation bolds only the fragment.
  it('prefers the longest keyword over one nested inside it', () => {
    expect(renderInline('CHAOS KNIGHTS')).toBe('<strong>CHAOS KNIGHTS</strong>')
    expect(renderInline('AGENTS OF THE IMPERIUM')).toBe('<strong>AGENTS OF THE IMPERIUM</strong>')
    // …while the short forms still match on their own.
    expect(renderInline('the CHAOS keyword')).toBe('the <strong>CHAOS</strong> keyword')
  })

  // TITANIC is a core keyword and a strict prefix of ADEPTUS TITANICUS; the \b guard is what
  // stops it matching mid-word.
  it('does not match a keyword that is only a prefix of a longer word', () => {
    expect(renderInline('ADEPTUS TITANICUS')).toBe('<strong>ADEPTUS TITANICUS</strong>')
  })

  // Case-sensitive on purpose — data that spells a keyword in Title Case is left alone, which
  // is what keeps files like space-marines.js (Title Case throughout) visually unchanged.
  it('leaves Title Case spellings alone', () => {
    expect(renderInline('an Adeptus Astartes unit')).toBe('an Adeptus Astartes unit')
  })

  it('handles the typographic apostrophe in keyword names', () => {
    expect(renderInline('T’AU EMPIRE')).toBe('<strong>T’AU EMPIRE</strong>')
    expect(renderInline('EMPEROR’S CHILDREN')).toBe('<strong>EMPEROR’S CHILDREN</strong>')
  })

  // The module-level regex carries the /g flag; String.replace resets its lastIndex, but a
  // regression here would silently drop every other match.
  it('is not stateful across calls', () => {
    const once = renderInline('a NECRONS unit')
    expect(renderInline('a NECRONS unit')).toBe(once)
    expect(renderInline('another NECRONS unit')).toContain('<strong>NECRONS</strong>')
  })
})

// The three link shapes a changelog note or a rule can carry. The internal one is the reason
// these cases exist: it must stay an <a> (copyable, keyboard-reachable) AND carry the class
// App.vue's global handler routes on — a plain href there reloads the whole app.
describe('renderInline — links', () => {
  it('renders an external link into a new tab, safely', () => {
    const html = renderInline('see [the rules](https://example.com/x) here')
    expect(html).toContain('<a href="https://example.com/x"')
    expect(html).toContain('target="_blank"')
    expect(html).toContain('rel="noopener noreferrer"')
  })

  it('renders a mailto link in place, without a new tab', () => {
    const html = renderInline('write to [me](mailto:a@b.c)')
    expect(html).toContain('<a href="mailto:a@b.c" class="ext-link">me</a>')
    expect(html).not.toContain('target="_blank"')
  })

  it('renders an in-app path as an int-link, for the router to pick up', () => {
    const html = renderInline('open [Support the project](/support) now')
    expect(html).toContain('<a href="/support" class="int-link">Support the project</a>')
    expect(html).not.toContain('target="_blank"')
  })

  it('leaves a bare path alone — only the markdown form is a link', () => {
    expect(renderInline('go to /support')).toBe('go to /support')
  })
})

// A core ability named in rule prose. It must NOT come out as the bracketed `.keyword` pill —
// that is the weapon-row tag treatment, and the whole point of this form is that the rulebook
// prints a unit ability as bold Title Case inside the sentence.
describe('renderInline — a core ability in prose', () => {
  it('renders as a quiet clickable span, not as a keyword pill', () => {
    expect(renderInline('This unit has [core:Stealth].'))
      .toBe('This unit has <span class="core-ability">Stealth</span>.')
  })

  it('keeps the printed name as written, qualifier and all', () => {
    expect(renderInline('models in that unit have [core:Feel No Pain 5+]'))
      .toBe('models in that unit have <span class="core-ability">Feel No Pain 5+</span>')
  })

  it('leaves a bracketed weapon ability as the pill it is', () => {
    expect(renderInline('attacks have [LETHAL HITS]'))
      .toBe('attacks have <span class="keyword">[LETHAL HITS]</span>')
  })
})

// The plural the rules write and the datasheet does not: a sheet carries MONSTER, a rule says
// "excluding MONSTERS and VEHICLES".
describe('renderInline — plural keywords', () => {
  it('bolds the plural of a core keyword', () => {
    expect(renderInline('excluding MONSTERS and VEHICLES'))
      .toBe('excluding <strong>MONSTERS</strong> and <strong>VEHICLES</strong>')
  })

  it('still refuses a keyword that is only a prefix of a longer word', () => {
    expect(renderInline('INFANTRYMAN')).toBe('INFANTRYMAN')
  })
})
