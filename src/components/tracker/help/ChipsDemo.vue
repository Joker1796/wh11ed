<template>
  <HelpDemoFrame :title="demo.title[locale] || demo.title.en">
    <ConditionChips
      :switches="switches"
      @toggle="toggle"
    />
  </HelpDemoFrame>
</template>

<script setup>
// A help demo made of the roster's own chips (ConditionChips): unit states, Battle-shock, a spent
// stratagem, auras, an ability set, an army-wide state. They switch as they do in a game — the
// demo keeps its own state and forgets it when the help closes. `kind` names a CHIP_DEMOS entry.
import { computed, ref } from 'vue'
import HelpDemoFrame from './HelpDemoFrame.vue'
import ConditionChips from '../../ConditionChips.vue'
import { useLocale } from '../../../composables/useLocale.js'
import { CHIP_DEMOS } from './demos.js'

const props = defineProps({ kind: { type: String, required: true } })
const { locale } = useLocale()
const demo = computed(() => CHIP_DEMOS[props.kind])
const on = ref(new Set(demo.value.switches.filter((s) => s.on).map((s) => s.id)))
// `subLabel` is a line in the reader's language (a stratagem's Russian name, none in English).
const switches = computed(() => demo.value.switches.map((s) => ({ ...s, on: on.value.has(s.id), subLabel: s.subLabel?.[locale.value] || null })))
function toggle(sw) {
  const next = new Set(on.value)
  if (next.has(sw.id)) next.delete(sw.id)
  else {
    // A group that holds a number drops its oldest pick for a new one, as the game does.
    const mates = demo.value.switches.filter((s) => sw.group && s.group === sw.group && next.has(s.id))
    if (sw.groupLimit && mates.length >= sw.groupLimit) next.delete(mates[0].id)
    next.add(sw.id)
  }
  on.value = next
}
</script>
