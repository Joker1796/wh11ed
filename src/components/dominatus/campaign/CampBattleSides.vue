<template>
  <div class="camp-form-part">
    <div class="seg">
      <button
        v-for="n in [false, true]"
        :key="String(n)"
        type="button"
        :class="{ on: team === n }"
        @click="setTeam(n)"
      >
        {{ n ? labels.campDoubles : labels.campSingles }}
      </button>
    </div>
    <div class="camp-pair">
      <label
        v-for="k in slots"
        :key="k"
        class="field"
      >
        <span>{{ labels[k[0] === 'a' ? 'campSideA' : 'campSideB'] }}<template v-if="team"> · {{ k.endsWith('2') ? 2 : 1 }}</template></span>
        <CampPick
          :model-value="model[k]"
          :title="`${labels[k[0] === 'a' ? 'campSideA' : 'campSideB']} ${team ? k.endsWith('2') ? 2 : 1 : ''}`"
          :disabled="k === 'a' && !!fixed"
          :options="options(k)"
          @update:model-value="(id) => pick(k, id)"
        />
      </label>
    </div>
    <p
      v-if="reason && complete"
      class="camp-dim"
    >
      {{ refusalText(labels, reason) }}
    </p>
  </div>
</template>

<script setup>
// Shared by the manual battle, tracker hand-off and the Warmaster's pairings. The fold remains
// the authority on the sides; choosing a paired opponent also brings all four players along.
import { computed } from 'vue'
import CampPick from './CampPick.vue'
import { battleSidesReason, isTeam, slotOf, pairingsNow } from '../../../core/dominatus/campaign.js'
import { refusalText } from '../../../composables/useCampaigns.js'
import { useCampaignView } from './useCampaignView.js'
const props = defineProps({ fixed: { type: String, default: null }, pairing: { type: Boolean, default: false } })
const model = defineModel({ type: Object, required: true })
const { state, isOwner, labels, playerOption } = useCampaignView()
const team = computed(() => 'a2' in model.value)
const slots = computed(() => team.value ? ['a', 'a2', 'b', 'b2'] : ['a', 'b'])
const complete = computed(() => slots.value.every((k) => model.value[k]))
const reason = computed(() => battleSidesReason(state.value, model.value))
function setTeam(on) {
  if (on === team.value) return
  model.value = { a: props.fixed || model.value.a || null, b: null, ...(on ? { a2: null, b2: null } : {}) }
}
function options(k) {
  const used = slots.value.filter((x) => x !== k).map((x) => model.value[x])
  let list = state.value.players.filter((p) => p.alliance && !used.includes(p.id))
  if (!props.pairing && !isOwner.value && state.value.pairBy !== 'free' && props.fixed) {
    const ps = pairingsNow(state.value).filter((p) => !p.played && slotOf(p, props.fixed) && isTeam(p) === team.value)
    const ids = ps.flatMap((p) => {
      const side = slotOf(p, props.fixed)[0]
      return Object.keys(p).filter((s) => /^[ab]2?$/.test(s) && (s[0] === side) === (k[0] === 'a')).map((s) => p[s])
    })
    list = list.filter((p) => ids.includes(p.id))
  }
  return list.map(playerOption)
}
function pick(k, id) {
  const next = { ...model.value, [k]: id }
  if (!props.pairing && !isOwner.value && state.value.pairBy !== 'free' && next.a) {
    const pair = pairingsNow(state.value).find((p) => !p.played && slotOf(p, next.a) && slotOf(p, id) && isTeam(p) === team.value)
    if (pair) {
      const side = slotOf(pair, next.a)[0]
      const own = [pair[side], pair[`${side}2`]].filter(Boolean)
      const other = side === 'a' ? 'b' : 'a'
      model.value = { a: next.a, b: pair[other], ...(team.value ? { a2: own.find((p) => p !== next.a), b2: pair[`${other}2`] } : {}) }
      return
    }
  }
  model.value = next
}
</script>
