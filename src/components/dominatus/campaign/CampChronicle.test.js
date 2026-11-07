import { beforeAll, describe, expect, it } from 'vitest'
import { mount } from '@vue/test-utils'
import { computed, defineComponent, h, ref } from 'vue'
import CampChronicle from './CampChronicle.vue'
import { provideCampaignView } from './useCampaignView.js'
import { campaignState } from '../../../core/dominatus/campaign.js'
import { getDominatus } from '../../../data/dominatus.js'
import { loadDominatusDeck } from '../../../composables/dominatusMissions.js'

beforeAll(() => loadDominatusDeck())

describe('the chronicle tab', () => {
  it('opens with the latest 20 entries and adds at most 20 per click until the end', async () => {
    const events = Array.from({ length: 45 }, (_, i) => ({
      seq: i + 1, author: 'owner', type: i ? 'settings' : 'created', payload: { name: `Campaign ${i + 1}` },
    }))
    const entry = ref({ id: 'c1', events })
    const state = computed(() => campaignState(entry.value.events, getDominatus('en')))
    const Host = defineComponent({ setup() {
      provideCampaignView({ entry, state, isOwner: ref(true), mine: ref(null) })
      return () => h(CampChronicle)
    } })
    const w = mount(Host)
    expect(w.findAll('li')).toHaveLength(20)
    expect(w.find('li').text()).toContain('Campaign 45')
    expect(w.find('.camp-chron-end').exists()).toBe(false)
    await w.find('button').trigger('click')
    expect(w.findAll('li')).toHaveLength(40)
    await w.find('button').trigger('click')
    expect(w.findAll('li')).toHaveLength(45)
    expect(w.findAll('li').at(-1).text()).toContain('Campaign 1')
    expect(w.find('button').exists()).toBe(false)
    expect(w.find('.camp-chron-end').exists()).toBe(true)
    w.unmount()
  })
})
