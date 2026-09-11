import { describe, it, expect } from 'vitest'
import { router } from './index.js'
import { help, slugOf } from '../data/help.js'

// The guide was one page with six anchors until 2026-08-25. Links written against it — the app's
// own, and anybody's bookmark — arrive as /help#help-tracker and have to land on the page that
// section became, not on the contents.
describe('retired /help anchors', () => {
  const guard = () => router.resolve('/help').matched[0].beforeEnter

  it.each(help.en.sections.map((s) => [s.id, slugOf(s)]))('#%s → its own page', (id, slug) => {
    expect(guard()({ hash: `#${id}` })).toBe(`/help/${slug}`)
  })

  it('leaves the contents alone when there is no anchor', () => {
    expect(guard()({ hash: '' })).toBe(true)
  })

  // A topic page exists for every section, and only the slug is public — an id renamed without a
  // redirect would break a URL, which is why slugOf() is the single derivation.
  it.each(help.en.sections.map((s) => slugOf(s)))('/help/%s resolves', (slug) => {
    expect(router.resolve(`/help/${slug}`).matched.length).toBeGreaterThan(0)
  })
})
