<template>
  <div
    v-if="options.length"
    class="csend"
  >
    <!-- Sent: said in the open, the campaign named and one tap away (owner, 2026-11-04: folded,
         a battle sent by itself looked as if nothing had happened). -->
    <p
      v-if="sent"
      class="csend-done"
    >
      <span>{{ sentText[0] }}</span><RouterLink :to="campaignPath(cid)">
        {{ campaignName }}
      </RouterLink><span>{{ sentText[1] }}</span>
    </p>
    <CampFold
      v-else
      :label="labels.campSend"
      :start-open="!!linked"
    >
      <div class="csend-body">
        <label class="field">
          <span>{{ labels.campSendPick }}</span>
          <CampPick
            v-model="cid"
            :title="labels.campSendPick"
            :options="options.map((c) => ({ value: c.id, label: c.name || c.id }))"
          />
        </label>
        <label
          v-for="(p, i) in game.players"
          :key="i"
          class="field"
        >
          <span>{{ labels.campSideOf.replace('{name}', p.name || `#${i + 1}`) }}</span>
          <CampPick
            v-model="pick[i]"
            :title="labels.campSideOf.replace('{name}', p.name || `#${i + 1}`)"
            :options="playersFor(i).map((cp) => ({ value: cp.id, label: cp.name }))"
          />
        </label>
        <button
          type="button"
          class="btn-primary"
          :disabled="!pick[0] || !pick[1] || pick[0] === pick[1] || busy"
          @click="send()"
        >
          {{ labels.campSend }}
        </button>
      </div>
    </CampFold>
    <AppToast
      :show="!!error"
      :text="error"
      tone="error"
      @close="error = ''"
    />
  </div>
</template>

<script setup>
// A finished Dominatus battle sent to a campaign this device takes part in: which campaign, which
// of its players each side was. The battle carries the victor, each side's Agenda Achieved cards and
// the Upgrades on its units (campaign.js `battleEvent`); its id is the game's, so sending twice is
// refused by the campaign's fold.
//
// `auto` (the finished game's screen): a battle started from a campaign goes back to it by itself
// (owner, 2026-11-03) — once both sides are the campaign players it was started for. Both phones of
// a shared game do so; the second finds it there (read first) or is refused as a duplicate, and says
// nothing. Any other refusal or a failed request is said as for the button, which stays.
import { ref, reactive, computed, watch } from 'vue'
import AppToast from '../../AppToast.vue'
import CampFold from './CampFold.vue'
import CampPick from './CampPick.vue'
import { useCampaigns, refusalText } from '../../../composables/useCampaigns.js'
import { battleEvent } from '../../../core/dominatus/campaign.js'
import { leader } from '../../../core/game/gameScoring.js'
import { campaignPath } from '../../../router/nav.js'
import { ui } from '../../../i18n/ui.js'
import { useLocale } from '../../../composables/useLocale.js'

const props = defineProps({
  game: { type: Object, required: true },
  auto: { type: Boolean, default: false },
})
const { locale } = useLocale()
const labels = computed(() => ui[locale.value])
const { campaigns, stateOf, myPlayer, appendEvent, syncCampaign } = useCampaigns()

const options = computed(() => campaigns.value.filter((c) => c.role === 'owner' || c.role === 'member'))
const cid = ref(null)
const pick = reactive({ 0: null, 1: null })
const busy = ref(false)
const error = ref('')
// A battle started from a campaign goes back to it, as the players it was started for.
const linked = computed(() => props.game.settings?.dominatus?.campaign || null)
watch(options, (o) => {
  if (cid.value) return
  cid.value = (linked.value && o.some((c) => c.id === linked.value) ? linked.value : o[0]?.id) || null
}, { immediate: true })

const entry = computed(() => campaigns.value.find((c) => c.id === cid.value) || null)
const state = computed(() => (cid.value ? stateOf(cid.value) : null))
// Sent already (from this phone or the other player's): the campaign has a battle under the game's id.
const sent = computed(() => state.value?.battles.find((b) => b.id === `g-${props.game.id}`) || null)
const inCampaign = computed(() => !!sent.value)
const campaignName = computed(() => `«${entry.value?.name || cid.value}»`)
// The line around the campaign's name, by where the battle stands there: waiting for the Warmaster,
// counted, or turned down. `{name}` splits it so the name can be a link.
const sentText = computed(() => {
  const l = labels.value
  const key = sent.value?.status === 'approved' ? 'campSentCounted' : sent.value?.status === 'rejected' ? 'campSentRefused' : 'campSentPending'
  const [before, after = ''] = l[key].split('{name}')
  return [before, after]
})
// A member's own side is their player; the Warmaster may enter anyone.
function playersFor(i) {
  const s = state.value
  if (!s) return []
  const mine = myPlayer(entry.value, s)
  const all = s.players.filter((p) => p.alliance === props.game.players[i].alliance || !props.game.players[i].alliance)
  return mine && props.game.players[i].isYou ? [mine] : all
}
watch([state, () => props.game], () => {
  for (const i of [0, 1]) {
    const list = playersFor(i)
    const byName = list.find((p) => p.name && p.name === props.game.players[i].name)
    const byLink = cid.value === linked.value ? list.find((p) => p.id === props.game.players[i].campaignPlayer) : null
    if (!pick[i]) pick[i] = (byLink || (list.length === 1 ? list[0] : byName))?.id || null
  }
}, { immediate: true })

async function send(quietDuplicate = false) {
  busy.value = true
  error.value = ''
  try {
    await appendEvent(cid.value, 'battle', battleEvent(props.game, pick[0], pick[1], leader(props.game)))
    // The server keeps every entry; whether the campaign took it is the fold's word.
    const why = stateOf(cid.value)?.rejected.find((r) => r.seq === entry.value?.seq)?.reason
    if (why && !(quietDuplicate && why === 'duplicate battle')) error.value = refusalText(labels.value, why)
  } catch (e) {
    error.value = labels.value.campFailed.replace('{code}', e.code || 'network')
  } finally {
    busy.value = false
  }
}

// Each game once per visit of the screen: a refusal is said once, the button is there for another try.
const tried = ref(false)
const ready = computed(() => {
  if (!props.auto || tried.value || !linked.value || cid.value !== linked.value || !state.value) return false
  return [0, 1].every((i) => props.game.players[i]?.campaignPlayer && pick[i] === props.game.players[i].campaignPlayer)
})
watch(ready, async (go) => {
  if (!go) return
  tried.value = true
  // The other phone of a shared game may have sent it already: read the campaign first.
  try { await syncCampaign(cid.value) } catch { /* offline: the send below says so */ }
  if (!inCampaign.value) await send(true)
}, { immediate: true })
</script>

<style scoped>
.csend { margin: 1rem 0; border: 1px solid var(--border); background: var(--bg-card); padding: 0 0.75rem; }
.csend-done { margin: 0; padding: 0.6rem 0; }
.csend :deep(.cfold) { margin-top: 0; border-top: none; }
.csend-body { display: grid; gap: 0.5rem; justify-items: start; }
.csend-body .field { width: 100%; }
</style>
