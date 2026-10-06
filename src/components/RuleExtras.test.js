import { afterEach, describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import RuleExtras from './RuleExtras.vue'
import { setLocale } from '../composables/useLocale.js'

// What the GW app applies as data rather than prints in a rule, under the rule in its own plate.
describe('RuleExtras', () => {
  afterEach(() => setLocale('en'))
  const extras = [{ en: 'KEYWORDS\nARMIGER models gain the **BATTLELINE** keyword.', ru: 'КЛЮЧЕВЫЕ СЛОВА\nМодели ARMIGER получают **BATTLELINE**.' }]

  it('draws a captioned plate in the reader\'s language', async () => {
    const w = mount(RuleExtras, { props: { extras } })
    expect(w.find('.rule-extras-title').text()).toBe('Also applies')
    expect(w.find('.rule-extras-item').text()).toContain('ARMIGER models gain the BATTLELINE keyword.')
    setLocale('ru')
    await w.vm.$nextTick()
    expect(w.find('.rule-extras-title').text()).toBe('Действует также')
    expect(w.find('.rule-extras-item').text()).toContain('Модели ARMIGER получают BATTLELINE.')
  })

  it('draws nothing without extras', () => {
    expect(mount(RuleExtras, { props: { extras: null } }).find('.rule-extras').exists()).toBe(false)
    expect(mount(RuleExtras, { props: { extras: [] } }).find('.rule-extras').exists()).toBe(false)
  })
})
