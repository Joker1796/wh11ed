<template>
  <BaseModal
    :title="labels.trackerScoreHelpTitle"
    max-width="420px"
    :z-index="410"
    @close="$emit('close')"
  >
    <div class="modal-body">
      <!-- One example game's board both ways, above the table that says how BP is reckoned. -->
      <ScoreDemo />
      <HelpText
        class="sh-text"
        :text="labels.trackerScoreHelpText"
      />
      <table class="sh-table">
        <thead>
          <tr>
            <th>{{ labels.trackerScoreHelpDiff }}</th>
            <th>{{ labels.trackerScoreHelpWin }}</th>
            <th>{{ labels.trackerScoreHelpLose }}</th>
          </tr>
        </thead>
        <tbody>
          <tr
            v-for="b in BP_TABLE"
            :key="b.label"
          >
            <td>{{ b.label }}</td>
            <td>{{ b.win }}</td>
            <td>{{ b.lose }}</td>
          </tr>
        </tbody>
      </table>
    </div>
  </BaseModal>
</template>

<script setup>
import { computed, defineAsyncComponent } from 'vue'
import BaseModal from '../BaseModal.vue'
import HelpText from './HelpText.vue'
import { ui } from '../../i18n/ui.js'
import { useLocale } from '../../composables/useLocale.js'
import { BP_TABLE } from '../../core/game/gameScoring.js'

const ScoreDemo = defineAsyncComponent(() => import('./help/ScoreDemo.vue'))

defineEmits(['close'])
const { locale } = useLocale()
const labels = computed(() => ui[locale.value])
</script>

<style scoped>

.sh-text { margin: 0 0 0.8rem; }
.sh-table { width: 100%; border-collapse: collapse; font-size: 0.84rem; }
.sh-table th {
  text-align: left;
  font-size: 0.68rem;
  text-transform: uppercase;
  letter-spacing: 0.03em;
  color: var(--text-dim);
  padding: 0.35rem 0.5rem;
  border-bottom: 1px solid var(--border);
}
.sh-table td {
  padding: 0.3rem 0.5rem;
  border-bottom: 1px solid var(--border);
  font-family: var(--font-mono);
  color: var(--text-muted);
}
.sh-table td:first-child { color: var(--text-primary); }
</style>
