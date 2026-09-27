import { describe, it, expect } from 'vitest'
import { resolveSideColors, sideColorStyle, sideFactionOf, STANDARD_YOU, STANDARD_OPP } from './sideColors.js'

describe('resolveSideColors', () => {
  it('is the standard pair unless the phone asked for faction colours', () => {
    expect(resolveSideColors('orks', 'aeldari', false)).toEqual({ you: STANDARD_YOU, opp: STANDARD_OPP })
  })

  it('gives each side its faction\'s pair — the one its faction pages wear', () => {
    const c = resolveSideColors('space-marines', 'adeptus-custodes', true)
    expect(c.you.light).toBe('#1f4e8c')
    expect(c.opp.light).toBe('#8a6d1a')
  })

  // Two sides the eye cannot tell apart defeat the point of colouring them.
  it('tells two near-identical factions apart by giving the opponent a standard colour', () => {
    expect(resolveSideColors('blood-angels', 'world-eaters', true).opp).toEqual(STANDARD_OPP) // two reds
    expect(resolveSideColors('orks', 'necrons', true).opp).toEqual(STANDARD_OPP)              // two greens
    // Your faction is itself a blue: the standard blue would clash too, so the red.
    expect(resolveSideColors('space-marines', null, true).opp).toEqual(STANDARD_YOU)
  })

  it('falls back to the standard colour for a side without a faction', () => {
    expect(resolveSideColors(null, 'orks', true).you).toEqual(STANDARD_YOU)
  })
})

describe('sideColorStyle / sideFactionOf', () => {
  it('hands .side-colored its four properties', () => {
    expect(sideColorStyle({ you: STANDARD_YOU, opp: STANDARD_OPP })).toEqual({
      '--sy-light': '#8b2a33', '--sy-dark': '#c8585e', '--so-light': '#004a6e', '--so-dark': '#5fb2dc',
    })
  })
  it('takes a doubles team\'s first member that fields a faction', () => {
    expect(sideFactionOf({ members: [{ factionSlug: null }, { factionSlug: 'orks' }] })).toBe('orks')
    expect(sideFactionOf({ factionSlug: 'necrons' })).toBe('necrons')
  })
})
