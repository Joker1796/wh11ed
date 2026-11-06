import { beforeEach, describe, it, expect, vi } from 'vitest'

let mod, tracker, share

beforeEach(async () => {
  localStorage.clear()
  vi.resetModules()
  mod = await import('./campaignHandoff.js')
  share = await import('./rosterShare.js')
  tracker = (await import('./useTracker.js')).useTracker()
})

const router = { push: vi.fn(async () => {}) }
const list = { name: 'Speed Freeks', faction: 'orks', detachments: ['War Horde'], disposition: 'Take and Hold', units: [{ uid: 'u1', id: 'boyz' }] }
const player = (over) => ({ id: 'p1', name: 'Alice', faction: 'orks', alliance: 'raiders', roster: null, ...over })
const battle = (a, b) => ({ campaignId: 'c1', phase: 2, location: null, a, b })

describe('playCampaignBattle', () => {
  it('hands all four campaign players and their own lists to Doubles', async () => {
    const code = await share.encodeRoster(list)
    await mod.playCampaignBattle({ ...battle(player({ roster: { code } }), player({ id: 'p3' })), a2: player({ id: 'p2', name: 'Partner', roster: { code } }), b2: player({ id: 'p4', name: 'Other' }) }, router)
    const d = tracker.setupDraft.value
    expect(d.settings.gameType).toBe('doubles')
    expect(d.players[0].members.map((m) => m.campaignPlayer)).toEqual(['p1', 'p2'])
    expect(d.players[1].members.map((m) => m.campaignPlayer)).toEqual(['p3', 'p4'])
    expect(d.players[0].members[1].roster.name).toBe(list.name)
    expect(d.players[0].teamName).toBe('Alice + Partner')
  })

  it('attaches the list the player keeps in the campaign', async () => {
    const code = await share.encodeRoster(list)
    await mod.playCampaignBattle(battle(player({ roster: { code } }), player({ id: 'p2', name: 'Bob' })), router)
    const [a, b] = tracker.setupDraft.value.players
    expect(a.roster.name).toBe('Speed Freeks')
    expect(a.roster.v).toBeTypeOf('number')
    expect(a.rosterId).toBe(null)
    expect(a.detachments).toEqual(['War Horde'])
    expect(a.disposition).toBe('take-and-hold')
    expect(a.campaignPlayer).toBe('p1')
    expect(a.alliance).toBe('raiders')
    expect(b.roster).toBeUndefined()
    expect(b.factionSlug).toBe('orks')
    expect(tracker.setupDraft.value.settings.dominatus).toEqual({ phase: 2, location: null, campaign: 'c1' })
  })

  it('leaves a list of another faction behind: the campaign\'s faction is played', async () => {
    const code = await share.encodeRoster({ ...list, faction: 'necrons' })
    await mod.playCampaignBattle(battle(player({ roster: { code } }), player({ id: 'p2' })), router)
    const [a] = tracker.setupDraft.value.players
    expect(a.roster).toBeUndefined()
    expect(a.factionSlug).toBe('orks')
  })

  it('takes the faction from the list when the campaign has none yet', async () => {
    const code = await share.encodeRoster(list)
    await mod.playCampaignBattle(battle(player({ faction: null, roster: { code } }), player({ id: 'p2' })), router)
    expect(tracker.setupDraft.value.players[0].factionSlug).toBe('orks')
  })

  it('a code that does not decode attaches nothing', async () => {
    await mod.playCampaignBattle(battle(player({ roster: { code: '1.broken' } }), player({ id: 'p2' })), router)
    expect(tracker.setupDraft.value.players[0].roster).toBeUndefined()
  })

  it('this device\'s own player brings the list marked for the campaign, so its pinned cards come too', async () => {
    const campaigns = await import('./useCampaigns.js')
    vi.spyOn(campaigns, 'campaignPlayerOf').mockReturnValue({ id: 'p1' })
    const { useRosters } = await import('./useRosters.js')
    const mine = useRosters().importRoster(list, 'Mine')
    useRosters().updateRoster(mine.id, { dominatus: { campaign: 'c1', upgrades: [{ slug: 'kingslayer', uid: 'u1' }] } })
    const code = await share.encodeRoster(list)
    await mod.playCampaignBattle(battle(player({ roster: { code } }), player({ id: 'p2', roster: { code } })), router)
    const [a, b] = tracker.setupDraft.value.players
    expect(a.rosterId).toBe(mine.id)
    expect(a.campaignPlayer).toBe('p1')
    expect(a.roster.units[0].uid).toBe('u1')
    expect(b.rosterId).toBeNull() // the other side's list stays the campaign's copy
    expect(b.roster.units[0].uid).toBe('u1')
  })
})
