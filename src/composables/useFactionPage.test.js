import { describe, it, expect, vi } from 'vitest'
import { nextTick } from 'vue'

// useFactionPage reads the slug from the router — stub the route.
const route = { params: { slug: 'necrons' } }
vi.mock('vue-router', () => ({ useRoute: () => route }))

import { useLocale } from './useLocale.js'
import { useFactionPage } from './useFactionPage.js'

async function untilRu(faction) {
  // the RU overlay chunk loads async — poll a few ticks until the merge lands
  for (let i = 0; i < 50; i++) {
    await nextTick()
    await new Promise((r) => setTimeout(r, 10))
    if (/[а-я]/.test(faction.value?.armyRule?.body || '')) return
  }
}

describe('useFactionPage RU overlay', () => {
  it('serves EN text in the EN locale', () => {
    const { locale } = useLocale()
    locale.value = 'en'
    const { faction } = useFactionPage()
    expect(faction.value.name).toBe('Necrons')
    expect(faction.value.armyRule.body).toMatch(/^If your Army Faction/)
  })

  it('merges the RU overlay over EN in the RU locale', async () => {
    const { locale } = useLocale()
    locale.value = 'ru'
    const { faction } = useFactionPage()
    await untilRu(faction)
    // translated texts…
    expect(faction.value.armyRule.body).toMatch(/^Если фракция вашей армии/)
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
