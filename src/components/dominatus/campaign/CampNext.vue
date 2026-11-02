<template>
  <!-- What this reader has to do now, above the tabs (owner, 2026-11-03: a player opened the
       campaign and did not know what was asked of them). Their own steps first, each with the way
       to the tab where it is done; then what they wait for. Nothing for a reader who only watches. -->
  <section
    v-if="steps.length"
    class="camp-next"
    :aria-label="labels.campNextTitle"
  >
    <p class="camp-next-title">
      {{ labels.campNextTitle }}
    </p>
    <ul>
      <li
        v-for="(x, i) in steps"
        :key="i"
        :class="{ 'is-todo': x.todo }"
      >
        <span
          class="camp-next-dot"
          aria-hidden="true"
        />
        <CountText
          class="camp-next-text"
          :text="sentence(x)"
          :vals="{ n: x.n || 0 }"
        />
        <button
          v-if="x.todo && x.tab !== tab"
          type="button"
          class="btn-ghost camp-next-go"
          @click="$emit('go', x.tab)"
        >
          {{ labels[`campGo_${x.tab}`] }}
        </button>
      </li>
    </ul>
  </section>
</template>

<script setup>
import { computed } from 'vue'
import CountText from '../../CountText.vue'
import { nextSteps } from '../../../core/dominatus/campaign.js'
import { useCampaignView } from './useCampaignView.js'

defineProps({ tab: { type: String, default: '' } })
defineEmits(['go'])

const { entry, state, isOwner, mine, labels, playerName, rewardName } = useCampaignView()
const steps = computed(() => (entry.value?.role === 'viewer' ? [] : nextSteps(state.value, mine.value, isOwner.value)))

function sentence(x) {
  const l = labels.value
  const key = x.kind === 'reward' && !x.player ? 'campNext_rewardPhase' : `campNext_${x.kind}`
  return (l[key] || x.kind)
    .replace('{p}', x.player ? playerName(x.player) : '')
    .replace('{what}', x.reward ? rewardName(x.reward) : '')
}
</script>

<style scoped>
.camp-next {
  margin: 0 0 0.75rem;
  padding: 0.5rem 0.75rem;
  border: 1px solid var(--border);
  border-left: 3px solid var(--accent);
  background: var(--bg-card);
}
.camp-next-title {
  margin: 0 0 0.3rem;
  font-size: 0.72rem;
  font-weight: 700;
  letter-spacing: 0.05em;
  text-transform: uppercase;
  color: var(--text-muted);
}
.camp-next ul { list-style: none; margin: 0; padding: 0; display: grid; gap: 0.35rem; }
.camp-next li { display: flex; align-items: center; gap: 0.5rem; font-size: 0.9rem; color: var(--text-muted); }
.camp-next li.is-todo { color: var(--text-primary); }
.camp-next-dot { flex: none; width: 0.5rem; height: 0.5rem; border: 1.5px solid currentColor; }
.camp-next li.is-todo .camp-next-dot { background: var(--accent); border-color: var(--accent); }
.camp-next-text { flex: 1 1 auto; min-width: 0; }
.camp-next-go { flex: none; min-height: 2.2rem; padding: 0.25rem 0.6rem; font-size: 0.8rem; }
</style>
