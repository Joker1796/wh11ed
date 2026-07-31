import { describe, it, expect } from 'vitest'
import { resolveRef } from './useRefNavigation.js'

describe('resolveRef — EC: (Event Companion) tokens', () => {
  it('resolves to the chapter anchor by default when the ref names no explicit #anchor', () => {
    // Most EC: refs in the prose have no explicit anchor — without a default, this used to
    // resolve to no anchor at all, landing on the top of the merged page instead of the
    // chapter (a regression once all seven chapters became one page).
    expect(resolveRef('Mission Sequence EC:sequence')).toEqual({
      label: 'Mission Sequence',
      route: '/event-companion',
      anchor: 'ec-chapter-sequence',
    })
    expect(resolveRef('Terrain & Layouts EC:layouts')).toEqual({
      label: 'Terrain & Layouts',
      route: '/event-companion',
      anchor: 'ec-chapter-layouts',
    })
    expect(resolveRef('Teams EC:teams')).toEqual({
      label: 'Teams',
      route: '/event-companion',
      anchor: 'ec-chapter-teams',
    })
  })

  it('an explicit #anchor overrides the chapter default', () => {
    expect(resolveRef('Muster Armies EC:sequence#step-1')).toEqual({
      label: 'Muster Armies',
      route: '/event-companion',
      anchor: 'step-1',
    })
  })

  it('an unknown EC: key resolves to no route', () => {
    expect(resolveRef('Nowhere EC:nope')).toEqual({
      label: 'Nowhere',
      route: null,
      anchor: null,
    })
  })
})

describe('resolveRef — core rule numbers', () => {
  it('resolves a two-level rule number to its section anchor on /core-rules', () => {
    expect(resolveRef('Moving Models 03.02')).toEqual({
      label: 'Moving Models',
      route: '/core-rules',
      anchor: 'section-03-02',
    })
  })

  it('does not treat an out-of-range chapter number as a rule reference', () => {
    expect(resolveRef('Some Label 99.01')).toEqual({
      label: 'Some Label',
      route: null,
      anchor: null,
    })
  })
})
