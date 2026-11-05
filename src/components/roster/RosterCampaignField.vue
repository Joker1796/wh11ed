<template>
  <div class="rcf">
    <label class="field">
      <span>{{ labels.rosterCampaign }}</span>
      <select
        class="form-input"
        :value="value"
        @change="pick($event.target.value)"
      >
        <option value="">{{ labels.rosterCampaignNone }}</option>
        <option value="deck">Dominatus · {{ labels.rosterCampaignDeck }}</option>
        <option
          v-for="c in options"
          :key="c.id"
          :value="c.id"
        >
          Dominatus · {{ c.name }}
        </option>
      </select>
    </label>
    <ExpandTransition>
      <p
        v-if="note"
        :key="note"
        class="check-note rcf-note"
      >
        {{ note }}
      </p>
    </ExpandTransition>
  </div>
</template>

<script setup>
// Which campaign a list is played in (useRosterCampaign.js): none, the Dominatus deck as a whole
// (to try its cards on), or one of the campaigns this account plays in — the pool its units take
// Upgrade cards from in their own fields. Reports the list's new mark (null: none); the editor
// writes it.
import { computed } from 'vue'
import ExpandTransition from '../ExpandTransition.vue'
import { useRosterCampaign } from '../../composables/useRosterCampaign.js'
import { ui } from '../../i18n/ui.js'
import { useLocale } from '../../composables/useLocale.js'

const props = defineProps({ dominatus: { type: Object, default: null } })
const emit = defineEmits(['update'])
const { locale } = useLocale()
const labels = computed(() => ui[locale.value])
const { choices, choiceOf, heldOf, limitOf } = useRosterCampaign()

const dom = computed(() => props.dominatus || null)
const value = computed(() => (!dom.value ? '' : dom.value.campaign || 'deck'))
// A campaign marked on another device and not read here yet still shows as what it is.
const options = computed(() => {
  const id = dom.value?.campaign
  return id && !choices.value.some((c) => c.id === id) ? [...choices.value, { id, name: labels.value.rosterCampaignUnknown }] : choices.value
})
const note = computed(() => {
  if (!dom.value) return ''
  const l = labels.value
  const ch = choiceOf(dom.value)
  const lines = [l.rosterCampaignNote.replace('{n}', String(limitOf(dom.value)))]
  if (ch && ch.st.roster !== 'none') lines.push(l.rosterCampaignCopyNote)
  return lines.join(' ')
})

function pick(v) {
  if (!v) return emit('update', null)
  const next = { campaign: v === 'deck' ? null : v, upgrades: [...(dom.value?.upgrades || [])] }
  // Cards the new pool does not hold come off their units.
  const held = heldOf(next)
  if (held) next.upgrades = next.upgrades.filter((u) => held.has(u.slug))
  emit('update', next)
}
</script>

<style scoped>
.rcf { display: grid; gap: 0.3rem; }
.rcf-note { margin: 0; }
</style>
