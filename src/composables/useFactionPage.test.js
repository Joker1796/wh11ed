import { describe, it, expect, vi } from 'vitest'

// useFactionPage reads the slug from the router — stub the route.
const route = { params: { slug: 'necrons' } }
vi.mock('vue-router', () => ({ useRoute: () => route }))

import { useLocale } from './useLocale.js'
import { useFactionPage } from './useFactionPage.js'

// BOTH sides of the faction data are lazy chunks now — the EN rules (one chunk per slug, see
// src/data/factions/index.js) and the RU overlay on top of it — so `faction` starts null and
// every assertion has to wait for the import to land. Waits on the result, never on a tick
// count: the previous helper here polled a fixed 50 × 10ms, the same pattern that made
// StratagemsView.test.js flaky under load.
const until = (fn) => vi.waitFor(fn, { timeout: 15000 })

describe('useFactionPage RU overlay', () => {
  it('serves EN text in the EN locale', async () => {
    const { locale } = useLocale()
    locale.value = 'en'
    const { faction } = useFactionPage()
    await until(() => expect(faction.value?.name).toBe('Necrons'))
    expect(faction.value.armyRule.body).toMatch(/^If your Army Faction/)
  })

  it('merges the RU overlay over EN in the RU locale', async () => {
    const { locale } = useLocale()
    locale.value = 'ru'
    const { faction } = useFactionPage()
    await until(() => expect(faction.value?.armyRule?.body).toMatch(/^Если фракция вашей армии/))
    // translated texts…
    expect(faction.value.detachments[0].rule.body).toMatch(/броску на попадание/)
    // …while names / points / structure stay English and intact
    expect(faction.value.armyRule.name).toBe('Reanimation Protocols')
    expect(faction.value.detachments[0].name).toBe('Awakened Dynasty')
    expect(faction.value.detachments[0].stratagems[0].name).toBe('Protocol of the Eternal Revenant')
    expect(faction.value.detachments[0].enhancements[0].points).toBe(20)
    expect(faction.value.detachments).toHaveLength(12)
    locale.value = 'en'
  })
})
