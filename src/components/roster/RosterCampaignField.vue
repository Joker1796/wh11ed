<template>
  <div class="rcf">
    <label class="field">
      <span>{{ labels.rosterCampaign }}</span>
      <select
        class="form-input"
        :value="valueOf(dominatus)"
        @change="$emit('update', markFor(dominatus, $event.target.value))"
      >
        <option
          v-for="o in optionsOf(dominatus, labels)"
          :key="o.value"
          :value="o.value"
        >
          {{ o.label }}
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
// Which campaign a list is played in, on the desk (the settings line's "…" and its campaign field;
// a phone has the tile in RosterSetupFields): none, the Dominatus deck as a whole (to try its cards
// on), or one of the campaigns this account plays in — the pool its units take Upgrade cards from
// in their own fields. Reports the list's new mark (null: none); the editor writes it.
import { computed } from 'vue'
import ExpandTransition from '../ExpandTransition.vue'
import { useRosterCampaign } from '../../composables/useRosterCampaign.js'
import { ui } from '../../i18n/ui.js'
import { useLocale } from '../../composables/useLocale.js'

const props = defineProps({ dominatus: { type: Object, default: null } })
defineEmits(['update'])
const { locale } = useLocale()
const labels = computed(() => ui[locale.value])
const { optionsOf, valueOf, noteOf, markFor } = useRosterCampaign()
const note = computed(() => noteOf(props.dominatus, labels.value))
</script>

<style scoped>
.rcf { display: grid; gap: 0.3rem; }
.rcf select { width: 100%; }
.rcf-note { margin: 0; }
</style>
