// The phase tab's blocks each stand on a condition of their own: the campaign's final result once
// it is over, and never in a campaign that has just begun (2026-11-01: a `v-else` left behind by a
// reshuffle hung the final result off the Warmaster's block, and a new campaign said "finished").
import { describe, it, expect, beforeAll } from 'vitest'
import { mount } from '@vue/test-utils'
import { defineComponent, h, ref, computed } from 'vue'
import CampPhase from './CampPhase.vue'
import { provideCampaignView } from './useCampaignView.js'
import { campaignState } from '../../../core/dominatus/campaign.js'
import { getDominatus } from '../../../data/dominatus.js'
import { loadDominatusDeck } from '../../../composables/dominatusMissions.js'
import { ui } from '../../../i18n/ui.js'

beforeAll(() => loadDominatusDeck())

function render(events, isOwner = true) {
  const deck = getDominatus('en')
  const entry = ref({ id: 'c1', events })
  const state = computed(() => campaignState(entry.value.events, deck))
  const Host = defineComponent({
    setup() {
      provideCampaignView({ entry, state, isOwner: ref(isOwner), mine: ref(null), act: async () => true })
      return () => h(CampPhase)
    },
  })
  return mount(Host, { global: { stubs: { CampChronicle: true, BaseModal: true, CampLocationPicker: true } } })
}

const created = { seq: 1, author: 'owner', type: 'created', payload: { name: 'New', draw: 'app' } }
const endOf = (phase, seq) => [
  { seq, author: 'owner', type: 'location', payload: { phase, slug: getDominatus('en').locations.find((l) => l.phase === phase).slug } },
  { seq: seq + 1, author: 'owner', type: 'endPhase', payload: { phase } },
]

describe('the phase tab', () => {
  it('a campaign just begun shows no final result, the Warmaster its block', () => {
    const w = render([created])
    expect(w.text()).not.toContain(ui.en.campFinal)
    expect(w.text()).toContain(ui.en.campForWarmaster)
  })

  it('a finished campaign shows its final result', () => {
    const w = render([created, ...endOf(1, 2), ...endOf(2, 4), ...endOf(3, 6)])
    expect(w.text()).toContain(ui.en.campFinal)
  })
})
