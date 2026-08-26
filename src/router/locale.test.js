import { describe, it, expect, beforeEach } from 'vitest'
import { router } from './index.js'
import { localeOfPath, localePath, stripLocale, RU_PREFIX } from './locale.js'
import { setLocale } from '../composables/useLocale.js'

// RU moved from `?lang=ru` onto a `/ru` path prefix on 2026-08-26 (SEO-RU-URLS-PLAN.md). Two
// things have to stay true forever: every page must exist at both addresses, and every link
// written before the move must still land where it always did.

describe('locale path helpers', () => {
  it('reads the locale off the path', () => {
    expect(localeOfPath('/rules')).toBe('en')
    expect(localeOfPath('/ru/rules')).toBe('ru')
    expect(localeOfPath(RU_PREFIX)).toBe('ru')
    // A path that merely STARTS with the letters "ru" is English.
    expect(localeOfPath('/rules-landing')).toBe('en')
    expect(localeOfPath('/russia')).toBe('en')
  })

  it('strips and applies the prefix symmetrically, including at the root', () => {
    expect(stripLocale('/ru/factions/aeldari')).toBe('/factions/aeldari')
    expect(stripLocale(RU_PREFIX)).toBe('/')
    expect(stripLocale('/factions/aeldari')).toBe('/factions/aeldari')
    expect(localePath('/factions/aeldari', 'ru')).toBe('/ru/factions/aeldari')
    expect(localePath('/', 'ru')).toBe(RU_PREFIX)
    expect(localePath('/ru/rules', 'en')).toBe('/rules')
  })

  it('is idempotent — applying the prefix twice cannot double it', () => {
    expect(localePath(localePath('/rules', 'ru'), 'ru')).toBe('/ru/rules')
  })
})

describe('router matching with the locale prefix', () => {
  const pages = [
    '/', '/core-rules', '/event-companion', '/rules', '/roster', '/roster/new',
    '/stratagems', '/factions', '/factions/aeldari', '/factions/aeldari/datasheets',
    '/factions/aeldari/datasheets/farseer', '/help', '/help/tracker', '/combat-patrol',
  ]

  it.each(pages)('%s resolves in both languages to the same page', (path) => {
    const en = router.resolve(path)
    const ru = router.resolve(localePath(path, 'ru'))
    expect(en.matched.length).toBeGreaterThan(0)
    expect(ru.matched.length).toBeGreaterThan(0)
    expect(ru.name ?? ru.matched[0].path).toBe(en.name ?? en.matched[0].path)
    expect(ru.params.lang).toBe('ru')
  })

  it('keeps a static route ahead of the :id route it could be mistaken for', () => {
    // `/roster/new` must not resolve as "the roster whose id is `new`" — in either language.
    expect(router.resolve('/ru/roster/new').matched[0].path)
      .toBe(router.resolve('/roster/new').matched[0].path)
    expect(router.resolve('/ru/roster/abc123').matched[0].path)
      .not.toBe(router.resolve('/ru/roster/new').matched[0].path)
  })

  it('sends an unknown Russian path to the 404 view, not to an English page', () => {
    expect(router.resolve('/ru/no-such-page').name).toBe('not-found')
  })
})

describe('links written before the move', () => {
  beforeEach(async () => {
    setLocale('en')
    await router.replace('/')
  })

  it('sends ?lang=ru to the Russian address, keeping the anchor and other params', async () => {
    await router.push('/core-rules?lang=ru&foo=bar#section-07')
    const r = router.currentRoute.value
    expect(r.path).toBe('/ru/core-rules')
    expect(r.query.lang).toBeUndefined()
    expect(r.query.foo).toBe('bar')
    expect(r.hash).toBe('#section-07')
  })

  it('sends ?lang=en to the English address', async () => {
    await router.push('/ru/core-rules?lang=en')
    expect(router.currentRoute.value.path).toBe('/core-rules')
  })

  it('carries a stored Russian preference onto a bare link', async () => {
    setLocale('ru')
    await router.push('/stratagems')
    expect(router.currentRoute.value.path).toBe('/ru/stratagems')
  })

  it('leaves English alone when English is what the reader chose', async () => {
    setLocale('en')
    await router.push('/stratagems')
    expect(router.currentRoute.value.path).toBe('/stratagems')
  })

  it('makes a shared Russian link stick, so the next internal click stays Russian', async () => {
    setLocale('en')
    await router.push('/ru/factions/aeldari')
    expect(router.currentRoute.value.path).toBe('/ru/factions/aeldari')
    // A bare in-app link — the kind ~170 RouterLinks in this app are written as.
    await router.push('/factions')
    expect(router.currentRoute.value.path).toBe('/ru/factions')
  })
})
