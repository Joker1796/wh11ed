import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import ChapterDoubles from './ChapterDoubles.vue'
import ChapterTeams from './ChapterTeams.vue'
import ChapterPairings from './ChapterPairings.vue'

// The three prose chapters share EventProseBlocks/EventProseBlock; a template slip in the
// shared pair would take all three down at once, and none of them had a test before. Each
// assertion is a block that only that chapter carries, plus the two optional extras the
// shared block renders (Teams' DataTable, Pairings' flavor wrapper).
describe('Event Companion prose chapters', () => {
  const stubs = { RouterLink: true }

  it('Doubles renders its delta blocks — the chapter carries nothing else in the app', () => {
    const w = mount(ChapterDoubles, { global: { stubs } })
    const text = w.text()
    expect(text).toContain('Terminology')
    expect(text).toContain('Force of Convenience')
    expect(text).toContain('The Rest of the Sequence')
    expect(w.find('#doubles-terminology').exists()).toBe(true)
  })

  it('Teams still renders its scoring table through the shared block', () => {
    const w = mount(ChapterTeams, { global: { stubs } })
    expect(w.find('table').exists()).toBe(true)
    expect(w.text()).toContain('Battle Points')
  })

  it('Pairings still renders its flavor block through the shared block', () => {
    const w = mount(ChapterPairings, { global: { stubs } })
    expect(w.find('.event-flavor').exists()).toBe(true)
  })
})
