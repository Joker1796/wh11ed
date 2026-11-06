// A battle started from a campaign goes back to it by itself on the finished screen (owner,
// 2026-11-03), once, as the players it was started for; the second phone of a shared game finds it
// sent or is refused as a duplicate, and says nothing.
import { beforeEach, describe, expect, it, vi } from 'vitest'
import { flushPromises, mount } from '@vue/test-utils'
import { ref } from 'vue'

const players = [
  { id: 'ann', name: 'Ann', alliance: 'liberators' },
  { id: 'cid', name: 'Cid', alliance: 'oppressors' },
]
// The log as the device holds it: a sync or a send changes it, and the folded state follows.
const log = ref({ battles: [], rejected: [] })
let appendEvent, syncCampaign, ownPlayer
const campaigns = ref([{ id: 'C', name: 'Armageddon', role: 'member', seq: 7 }])

vi.mock('../../../composables/useCampaigns.js', () => ({
  useCampaigns: () => ({
    campaigns,
    stateOf: () => ({ players, ...log.value }),
    myPlayer: () => ownPlayer,
    appendEvent: (...a) => appendEvent(...a),
    syncCampaign: (...a) => syncCampaign(...a),
  }),
  refusalText: (_l, why) => `refused: ${why}`,
}))
vi.mock('../../../core/game/gameScoring.js', () => ({ leader: () => 0 }))

const { default: CampSendGame } = await import('./CampSendGame.vue')

const game = (campaign = 'C') => ({
  id: 'G1',
  settings: { dominatus: { phase: 1, ...(campaign ? { campaign } : {}) } },
  players: [
    { name: 'Ann', alliance: 'liberators', campaignPlayer: 'ann', agendaAchieved: 1, upgrades: [{ slug: 'high-strategy', unit: 'Captain' }] },
    { name: 'Cid', alliance: 'oppressors', campaignPlayer: 'cid', agendaAchieved: 0, upgrades: [] },
  ],
})
const toast = (w) => w.findComponent({ name: 'AppToast' }).props('text')

describe('CampSendGame — the battle goes back to its campaign', () => {
  beforeEach(() => {
    ownPlayer = null
    log.value = { battles: [], rejected: [] }
    syncCampaign = vi.fn(async () => {})
    appendEvent = vi.fn(async () => {})
  })

  it('keeps a member’s own player fixed when sending an unlinked singles game', async () => {
    ownPlayer = players[0]
    players.push({ id:'ben', name:'Ben', alliance:'liberators' })
    try {
      const g = game(null)
      g.players[0].isYou = true
      g.players[0].name = 'Local name'
      const w = mount(CampSendGame, { props:{ game:g } })
      await flushPromises()
      expect(w.vm.$.setupState.playersFor(0).map((p) => p.id)).toEqual(['ann'])
      w.unmount()
    } finally { players.splice(2) }
  })

  it('automatically sends a Doubles battle as all four campaign players', async () => {
    const extra = [{ id: 'ben', name: 'Ben', alliance: 'liberators' }, { id: 'dee', name: 'Dee', alliance: 'oppressors' }]
    players.push(...extra)
    try {
      const g = game()
      g.settings.gameType = 'doubles'
      g.players = g.players.map((p, i) => ({ name: `Team ${i}`, members: [p, { name: extra[i].name, alliance: extra[i].alliance, campaignPlayer: extra[i].id, agendaAchieved: 1 }] }))
      const w = mount(CampSendGame, { props: { game: g, auto: true } })
      await flushPromises()
      expect(appendEvent).toHaveBeenCalledTimes(1)
      expect(appendEvent.mock.calls[0][2]).toMatchObject({ a: 'ann', a2: 'ben', b: 'cid', b2: 'dee', achieved: { a: 1, a2: 1, b: 0, b2: 1 } })
      w.unmount()
    } finally { players.splice(2) }
  })

  it('sends it once, with the Upgrades, as the campaign players it was started for', async () => {
    const w = mount(CampSendGame, { props: { game: game(), auto: true } })
    await flushPromises()
    expect(syncCampaign).toHaveBeenCalledWith('C')
    expect(appendEvent).toHaveBeenCalledTimes(1)
    const [cid, type, payload] = appendEvent.mock.calls[0]
    expect([cid, type]).toEqual(['C', 'battle'])
    expect(payload).toMatchObject({ id: 'g-G1', phase: 1, a: 'ann', b: 'cid', victor: 'a', upgrades: [{ side: 'a', slug: 'high-strategy', unit: 'Captain' }] })
    await w.setProps({ game: { ...game() } })
    await flushPromises()
    expect(appendEvent).toHaveBeenCalledTimes(1)
  })

  it('does not send what the other phone sent, nor speak of a duplicate', async () => {
    syncCampaign = vi.fn(async () => { log.value = { battles: [{ id: 'g-G1' }], rejected: [] } })
    mount(CampSendGame, { props: { game: game(), auto: true } })
    await flushPromises()
    expect(appendEvent).not.toHaveBeenCalled()

    log.value = { battles: [], rejected: [] }
    syncCampaign = vi.fn(async () => {})
    appendEvent = vi.fn(async () => { log.value = { battles: [], rejected: [{ seq: 7, reason: 'duplicate battle' }] } })
    const w = mount(CampSendGame, { props: { game: game(), auto: true } })
    await flushPromises()
    expect(appendEvent).toHaveBeenCalledTimes(1)
    expect(toast(w)).toBe('')
  })

  it('says any other refusal', async () => {
    appendEvent = vi.fn(async () => { log.value = { battles: [], rejected: [{ seq: 7, reason: 'no roster' }] } })
    const w = mount(CampSendGame, { props: { game: game(), auto: true } })
    await flushPromises()
    expect(toast(w)).toBe('refused: no roster')
  })

  // Owner, 2026-11-04: folded, a battle sent by itself looked as if nothing had happened.
  it('says in the open that the battle is in the campaign, and where it stands there', async () => {
    log.value = { battles: [{ id: 'g-G1', status: 'pending' }], rejected: [] }
    const w = mount(CampSendGame, { props: { game: game(), auto: true }, global: { stubs: { RouterLink: { props: ['to'], template: '<a :href="to"><slot /></a>' } } } })
    await flushPromises()
    expect(appendEvent).not.toHaveBeenCalled()
    expect(w.find('.csend-done').text()).toBe('The battle went to the campaign «Armageddon». The Warmaster will count it.')
    expect(w.find('.csend-done a').attributes('href')).toBe('/campaigns/dominatus/C')
    expect(w.findComponent({ name: 'CampFold' }).exists()).toBe(false)
    log.value = { battles: [{ id: 'g-G1', status: 'approved' }], rejected: [] }
    await flushPromises()
    expect(w.find('.csend-done').text()).toBe('The battle is counted in the campaign «Armageddon».')
  })

  it('waits for the button where the game is not a campaign\'s, or on the history screen', async () => {
    mount(CampSendGame, { props: { game: game(null), auto: true } })
    mount(CampSendGame, { props: { game: game() } })
    await flushPromises()
    expect(appendEvent).not.toHaveBeenCalled()
  })
})
