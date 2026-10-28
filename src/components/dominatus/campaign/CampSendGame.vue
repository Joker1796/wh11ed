<template>
  <details
    v-if="options.length"
    class="csend"
  >
    <summary>{{ labels.campSend }}</summary>
    <div class="csend-body">
      <label class="field">
        <span>{{ labels.campSendPick }}</span>
        <select
          v-model="cid"
          class="form-input"
        >
          <option
            v-for="c in options"
            :key="c.id"
            :value="c.id"
          >
            {{ c.name || c.id }}
          </option>
        </select>
      </label>
      <label
        v-for="(p, i) in game.players"
        :key="i"
        class="field"
      >
        <span>{{ labels.campSideOf.replace('{name}', p.name || `#${i + 1}`) }}</span>
        <select
          v-model="pick[i]"
          class="form-input"
        >
          <option
            :value="null"
            disabled
          >
            —
          </option>
          <option
            v-for="cp in playersFor(i)"
            :key="cp.id"
            :value="cp.id"
          >
            {{ cp.name }}
          </option>
        </select>
      </label>
      <button
        class="btn-primary"
        :disabled="!pick[0] || !pick[1] || pick[0] === pick[1] || busy || sent"
        @click="send"
      >
        {{ sent ? labels.campSent : labels.campSend }}
      </button>
      <p
        v-if="error"
        class="csend-error"
      >
        {{ error }}
      </p>
    </div>
  </details>
</template>

<script setup>
// A finished Dominatus battle sent to a campaign this device takes part in: which campaign, which
// of its players each side was. The battle carries the victor and each side's Agenda Achieved cards
// from the game; its id is the game's, so sending twice is refused by the campaign's fold.
import { ref, reactive, computed, watch } from 'vue'
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
.csend { margin: 1rem 0; border: 1px solid var(--border); background: var(--bg-card); padding: 0.5rem 0.75rem; }
.csend > summary { cursor: pointer; font-weight: 600; }
.csend-body { display: grid; gap: 0.5rem; margin-top: 0.5rem; justify-items: start; }
.csend-body .field { width: 100%; }
.csend-body select { width: 100%; }
.csend-error { margin: 0; color: var(--danger); font-size: 0.85rem; }
</style>
