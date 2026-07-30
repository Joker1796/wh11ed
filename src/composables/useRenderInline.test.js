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
