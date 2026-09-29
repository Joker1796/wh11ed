import { describe, it, expect } from 'vitest'
import { reactive } from 'vue'
import { resolveSideColors, sidesClash, colorDistance, sidePicksOf, sideColorStyle, sideFactionOf, PALETTE, STANDARD_YOU, STANDARD_OPP } from './sideColors.js'
import { useColorClashGate } from './useColorClashGate.js'

describe('resolveSideColors', () => {
  // Owner, 2026-09-29: faction colours are the default, not an option.
  it('gives each side its faction\'s pair — the one its faction pages wear', () => {
    const c = resolveSideColors('space-marines', 'adeptus-custodes')
    expect(c.you.light).toBe('#1f4e8c')
    expect(c.opp.light).toBe('#8a6d1a')
  })

  it('falls back to the standard colour for a side without a faction', () => {
    expect(resolveSideColors(null, 'orks').you).toEqual(STANDARD_YOU)
    expect(resolveSideColors('orks', null).opp).toEqual(STANDARD_OPP)
  })

  it('takes the phone\'s pick for a side, and the faction colour for a side left unpicked', () => {
    const c = resolveSideColors('blood-angels', 'world-eaters', { you: null, opp: 'green' })
    expect(c.you.light).toBe('#9b1c1c')
    expect(c.opp).toMatchObject({ light: '#467a1e', dark: '#8cc25a' })
  })

  // Nothing is swapped behind the player's back any more — the setup asks instead.
  it('leaves two near-identical factions alike, and says they clash', () => {
    expect(sidesClash(resolveSideColors('blood-angels', 'world-eaters'))).toBe(true) // two reds
    expect(sidesClash(resolveSideColors('orks', 'orks'))).toBe(true)                 // a mirror
    expect(sidesClash(resolveSideColors('orks', 'aeldari'))).toBe(false)
  })

  // Muted colours sit closer than the clash line (120) allows seven of them to; what the palette must
  // not hold is two of one hue — teal against blue measured 45, orange against gold 44.
  it('has no two picks of one hue', () => {
    for (const a of PALETTE) for (const b of PALETTE) {
      if (a === b) continue
      expect(colorDistance(a.light, b.light)).toBeGreaterThan(90)
      expect(colorDistance(a.dark, b.dark)).toBeGreaterThan(90)
    }
  })

  it('reads the picks only while "Customise colours" is on', () => {
    expect(sidePicksOf({ sideColors: { you: 'red' } })).toBe(null)
    expect(sidePicksOf({ customColors: true, sideColors: { you: 'red' } })).toEqual({ you: 'red' })
    expect(sidePicksOf({ customColors: true })).toEqual({})
  })
})

describe('useColorClashGate', () => {
  const ctxOf = (you, opp) => ({ value: { you: { faction: you }, opp: { faction: opp } } })
  it('saves straight away when the sides differ', () => {
    let saved = 0
    const g = useColorClashGate(ctxOf('orks', 'aeldari'), reactive({}))
    g.guard(() => saved++)
    expect(saved).toBe(1)
    expect(g.open.value).toBe(false)
  })
  it('asks when they clash: "keep" saves, "customise" stays with the option on', () => {
    let saved = 0
    const settings = reactive({})
    const g = useColorClashGate(ctxOf('blood-angels', 'world-eaters'), settings)
    g.guard(() => saved++)
    expect(saved).toBe(0)
    expect(g.open.value).toBe(true)
    g.customise()
    expect(settings.customColors).toBe(true)
    expect(saved).toBe(0)
    g.guard(() => saved++)
    g.confirm()
    expect(saved).toBe(1)
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
