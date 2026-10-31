<template>
  <div
    v-if="options.length"
    class="csend"
  >
    <CampFold :label="labels.campSend">
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
          class="btn-primary"
          :disabled="!pick[0] || !pick[1] || pick[0] === pick[1] || busy || sent"
          @click="send"
        >
          {{ sent ? labels.campSent : labels.campSend }}
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
// of its players each side was. The battle carries the victor and each side's Agenda Achieved cards
// from the game; its id is the game's, so sending twice is refused by the campaign's fold.
import { ref, reactive, computed, watch } from 'vue'
import AppToast from '../../AppToast.vue'
import CampFold from './CampFold.vue'
import CampPick from './CampPick.vue'
import { useCampaigns } from '../../../composables/useCampaigns.js'
import { leader } from '../../../core/game/gameScoring.js'
import { ui } from '../../../i18n/ui.js'
import { useLocale } from '../../../composables/useLocale.js'

const props = defineProps({
  game: { type: Object, required: true },
})
const { locale } = useLocale()
const labels = computed(() => ui[locale.value])
const { campaigns, stateOf, myPlayer, appendEvent } = useCampaigns()

const options = computed(() => campaigns.value.filter((c) => c.role === 'owner' || c.role === 'member'))
const cid = ref(null)
const pick = reactive({ 0: null, 1: null })
const busy = ref(false)
const sent = ref(false)
const error = ref('')
watch(options, (o) => { if (!cid.value && o.length) cid.value = o[0].id }, { immediate: true })

const entry = computed(() => campaigns.value.find((c) => c.id === cid.value) || null)
const state = computed(() => (cid.value ? stateOf(cid.value) : null))
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
    if (!pick[i]) pick[i] = (list.length === 1 ? list[0] : byName)?.id || null
  }
}, { immediate: true })

async function send() {
  busy.value = true
  error.value = ''
  const w = leader(props.game)
  try {
    await appendEvent(cid.value, 'battle', {
      id: `g-${props.game.id}`,
      a: pick[0],
      b: pick[1],
      victor: w === 0 ? 'a' : w === 1 ? 'b' : null,
      achieved: { a: props.game.players[0].agendaAchieved || 0, b: props.game.players[1].agendaAchieved || 0 },
    })
    sent.value = true
  } catch (e) {
    error.value = labels.value.campFailed.replace('{code}', e.code || 'network')
  } finally {
    busy.value = false
  }
}
</script>

<style scoped>
.csend { margin: 1rem 0; border: 1px solid var(--border); background: var(--bg-card); padding: 0 0.75rem; }
.csend :deep(.cfold) { margin-top: 0; border-top: none; }
.csend-body { display: grid; gap: 0.5rem; justify-items: start; }
.csend-body .field { width: 100%; }
</style>
