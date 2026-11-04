// A Dominatus battle entered in a campaign from the setup itself (stage 5, owner 2026-11-04): the
// campaign's phase and Location, and each side a campaign player — "you" your own, the other by the
// name when it matches, else picked — with the player's Alliance.
import { afterEach, beforeEach, describe, it, expect, vi } from 'vitest'
import { mount } from '@vue/test-utils'

const players = [
  { id: 'ann', name: 'Ann', alliance: 'liberators' },
  { id: 'cid', name: 'Cid', alliance: 'oppressors' },
  { id: 'dee', name: 'Dee', alliance: 'raiders' },
  { id: 'new', name: 'New', alliance: null },
]
let role = 'owner', me = null
vi.mock('../../composables/useCampaigns.js', () => ({
  knownCampaigns: () => [{ id: 'C', name: 'Armageddon', role }, { id: 'W', name: 'Watched', role: 'viewer' }],
  knownCampaignState: (id) => (id === 'C' ? { phase: 2, locations: { 1: 'the-mannheim-gap', 2: 'cerbera-base' }, players, roster: 'optional' } : null),
  campaignPlayerOf: () => (me ? players.find((p) => p.id === me) : null),
}))

let GameSetup
beforeEach(async () => {
  localStorage.clear()
  role = 'owner'; me = null
  GameSetup = (await import('./GameSetup.vue')).default
})
afterEach(async () => { await vi.dynamicImportSettled(); document.body.innerHTML = '' })

function setup(you, opp) {
  const w = mount(GameSetup)
  const s = w.vm.$.setupState
  s.players[0].name = you
  s.players[1].name = opp
  s.setDominatus(true)
  return s
}

describe('GameSetup — a Dominatus battle of a campaign', () => {
  it('offers the campaigns this device plays in, not one it only watches', () => {
    const s = setup('Ann', 'Cid')
    expect(s.domCampaignOptions.map((o) => o.value)).toEqual(['C'])
  })

  it('takes the campaign\'s phase and Location, and each side by its name', () => {
    const s = setup('ann ', 'Cid')
    s.linkCampaign('C')
    expect(s.settings.dominatus).toEqual({ phase: 2, location: 'cerbera-base', campaign: 'C' })
    expect(s.players.map((p) => [p.campaignPlayer, p.alliance])).toEqual([['ann', 'liberators'], ['cid', 'oppressors']])
    // A player with no Alliance yet is not offered.
    expect(s.domPlayerOptions(1).map((o) => o.value)).toEqual(['ann', 'cid', 'dee'])
  })

  it('makes "you" your own player, and leaves a side no name matches to be picked', () => {
    me = 'dee'
    const s = setup('Me', 'Someone')
    s.linkCampaign('C')
    expect(s.players.map((p) => p.campaignPlayer)).toEqual(['dee', null])
    s.setCampaignPlayer(1, 'cid')
    expect(s.players[1]).toMatchObject({ campaignPlayer: 'cid', alliance: 'oppressors' })
    // One player is one side: picked for the other, it leaves the first.
    s.setCampaignPlayer(1, 'dee')
    expect(s.players.map((p) => p.campaignPlayer)).toEqual([null, 'dee'])
  })

  it('gives a member\'s own side only their player', () => {
    role = 'member'; me = 'ann'
    const s = setup('Ann', 'Cid')
    s.linkCampaign('C')
    expect(s.domPlayerOptions(0).map((o) => o.value)).toEqual(['ann'])
    expect(s.domPlayerOptions(1).map((o) => o.value)).toEqual(['ann', 'cid', 'dee'])
  })
})
