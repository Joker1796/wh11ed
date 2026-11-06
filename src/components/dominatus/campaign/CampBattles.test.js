import { beforeAll, describe, expect, it, vi } from 'vitest'
import { mount, flushPromises } from '@vue/test-utils'
import { computed, defineComponent, h, ref } from 'vue'
import CampBattles from './CampBattles.vue'
import CampBattleSides from './CampBattleSides.vue'
import CampTeamRewards from './CampTeamRewards.vue'
import { provideCampaignView } from './useCampaignView.js'
import { campaignState } from '../../../core/dominatus/campaign.js'
import { getDominatus } from '../../../data/dominatus.js'
import { loadDominatusDeck } from '../../../composables/dominatusMissions.js'

vi.mock('vue-router', () => ({ useRouter: () => ({ push: vi.fn() }) }))
beforeAll(() => loadDominatusDeck())
function render(owner = true, extra = []) {
  const deck = getDominatus('en')
  const ev = (type, payload) => ({ seq: ++seq, author: 'owner', type, payload })
  let seq = 0
  const players = ['ann', 'ben', 'cid', 'dee'].map((id, i) => ({ id, name: id, alliance: i < 2 ? 'liberators' : 'oppressors' }))
  const entry = ref({ id: 'C', events: [ev('created', { name: 'Test' }), ...players.map((p) => ev('player', p)), ev('location', { phase: 1, slug: 'the-mannheim-gap' }), ...extra.map(([t, p]) => ev(t, p))] })
  const state = computed(() => campaignState(entry.value.events, deck))
  const act = vi.fn(async (t, p) => { entry.value.events.push(ev(t, p)); return true })
  const ask = ref(null)
  const Host = defineComponent({ setup() {
    provideCampaignView({ entry, state, isOwner: ref(owner), mine: computed(() => owner ? null : state.value.players[1]), act, ask })
    return () => h(CampBattles)
  } })
  const wrapper = mount(Host, { global: { stubs: { teleport: true } } })
  return { wrapper, state, act, ask }
}
const team = { a: 'ann', a2: 'ben', b: 'cid', b2: 'dee' }
describe('campaign team battle screens', () => {
  it('enters four players and hands out their rewards', async () => {
    const { wrapper: w, state, act, ask } = render()
    const add = w.findAll('button').find((b) => b.text() === 'Enter a battle')
    await add.trigger('click')
    const picker = w.findComponent(CampBattleSides)
    picker.vm.$emit('update:modelValue', team)
    await w.vm.$nextTick()
    await picker.element.closest('form').dispatchEvent(new Event('submit', { bubbles: true, cancelable: true }))
    await flushPromises()
    expect(state.value.battles[0]).toMatchObject(team)
    ask.value = { kind: 'teamRewards' }
    await flushPromises()
    const rewards = w.findComponent(CampTeamRewards)
    expect(rewards.exists()).toBe(true)
    await rewards.find('form').trigger('submit')
    await flushPromises()
    expect(act.mock.calls.at(-1)[0]).toBe('teamRewards')
    expect(state.value.pending).toHaveLength(4)
    expect(state.value.rejected).toEqual([])
    w.unmount()
  })
  it('opens the requested team pairing when several battles are still to play', async () => {
    const { wrapper: w, ask } = render(false, [
      ['player', { id:'eve', name:'Eve', alliance:'oppressors' }],
      ['player', { id:'fox', name:'Fox', alliance:'oppressors' }],
      ['pairing', { ...team, id:'p1', phase:1 }],
      ['pairing', { ...team, b:'eve', b2:'fox', id:'p2', phase:1 }],
    ])
    ask.value = { kind:'play', player:'eve', players:['eve','fox'] }
    await flushPromises()
    expect(w.findComponent(CampBattleSides).props('modelValue')).toEqual({ a:'ben', a2:'ann', b:'eve', b2:'fox' })
    w.unmount()
  })

  it('starts from all four paired players even when this device is the second partner', async () => {
    const { wrapper: w, ask } = render(false, [['pairing', { ...team, id: 'p1', phase: 1 }]])
    ask.value = { kind: 'play', player: 'cid', players: ['cid', 'dee'] }
    await flushPromises()
    const p = w.findComponent(CampBattleSides)
    expect(p.props('modelValue')).toEqual({ a: 'ben', a2: 'ann', b: 'cid', b2: 'dee' })
    w.unmount()
  })
})
