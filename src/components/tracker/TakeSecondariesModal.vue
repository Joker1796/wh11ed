<template>
  <BaseModal
    :title="labels.trackerTakeTitle"
    :subtitle="`${name} · ${labels.trackerRoundShort} ${current.currentRound}`"
    max-width="440px"
    @close="$emit('close')"
  >
    <div class="modal-body">
      <!-- Taken at random: what came, and nothing to change — a random draw is final. -->
      <template v-if="taken">
        <ul class="took-list">
          <li
            v-for="m in takenMissions"
            :key="m.slug"
            class="took-item"
          >
            <span class="ti-name">{{ m.name }}</span>
            <span class="src-badge">{{ taken === 'random' ? '🎲' : '✋' }}</span>
          </li>
        </ul>
        <button
          class="btn-primary tk-main"
          @click="$emit('close')"
        >
          {{ labels.trackerTakeDone }}
        </button>
      </template>

      <template v-else>
        <p class="tk-note">
          {{ labels.trackerTakeNote }}
        </p>
        <button
          class="btn-primary tk-main"
          :disabled="picked.length > 0"
          @click="onRandom"
        >
          🎲 {{ labels.trackerTakeRandom }}
        </button>
        <div class="tk-sep">
          <span>{{ labels.trackerTakeOrChoose }}</span>
        </div>
        <ul class="pick-list">
          <li
            v-for="m in deckMissions"
            :key="m.slug"
          >
            <button
              class="pick-item"
              :class="{ on: picked.includes(m.slug) }"
              :aria-pressed="picked.includes(m.slug)"
              :disabled="!picked.includes(m.slug) && picked.length >= need"
              @click="toggle(m.slug)"
            >
              <span class="pick-name">{{ m.name }}</span>
              <span class="pick-cat">{{ m.category }}</span>
              <i
                class="bi"
                :class="picked.includes(m.slug) ? 'bi-check-square-fill' : 'bi-square'"
                aria-hidden="true"
              />
            </button>
          </li>
        </ul>
      </template>
    </div>
    <footer
      v-if="!taken"
      class="tk-foot"
    >
      <button
        class="btn-primary tk-main"
        :disabled="picked.length !== need"
        @click="onChosen"
      >
        ✋ {{ labels.trackerTakeChosen.replace('{n}', picked.length).replace('{of}', need) }}
      </button>
    </footer>
  </BaseModal>
</template>

<script setup>
import { computed, ref } from 'vue'
import BaseModal from '../BaseModal.vue'
import { ui } from '../../i18n/ui.js'
import { useLocale } from '../../composables/useLocale.js'
import { useTracker, missionBySlug } from '../../composables/useTracker.js'

// The turn's two secondaries (tactical): both at random, or both picked by hand — one way for
// the pair, as in Mikhail's prototype. The random pair is written the moment it is drawn, so
// closing and reopening this dialog shows the same two rather than rolling again.
const props = defineProps({
  pi: { type: Number, required: true },
  name: { type: String, required: true },
})
defineEmits(['close'])
const { locale } = useLocale()
const labels = computed(() => ui[locale.value])
const { current, tookSecondaries, takeRandomSecondaries, takeChosenSecondaries } = useTracker()

const player = computed(() => current.value.players[props.pi])
const taken = computed(() => tookSecondaries(props.pi))
const need = computed(() => Math.min(2, player.value.secondary.deck.length))
const mission = (slug) => missionBySlug(slug, player.value.role, locale.value)

const deckMissions = computed(() =>
  player.value.secondary.deck.map(mission).filter(Boolean).sort((a, b) => a.name.localeCompare(b.name)),
)
// What this turn brought in — the cards drawn in the live round.
const takenMissions = computed(() => {
  const drawn = player.value.secondary.drawn || {}
  return player.value.secondary.hand.filter(slug => drawn[slug] === current.value.currentRound).map(mission).filter(Boolean)
})

const picked = ref([])
function toggle(slug) {
  picked.value = picked.value.includes(slug) ? picked.value.filter(x => x !== slug) : [...picked.value, slug]
}
function onRandom() { takeRandomSecondaries(props.pi) }
function onChosen() { takeChosenSecondaries(props.pi, picked.value) }
</script>

<style scoped>
.tk-note { margin: 0 0 0.7rem; font-size: 0.84rem; color: var(--text-muted); }
.tk-main { width: 100%; justify-content: center; min-height: 46px; font-weight: 700; }
.tk-sep {
  display: flex; align-items: center; gap: 0.6rem;
  margin: 0.9rem 0 0.5rem;
  font-size: 0.72rem; font-weight: 700; text-transform: uppercase; letter-spacing: 0.05em;
  color: var(--text-dim);
}
.tk-sep::before, .tk-sep::after { content: ''; flex: 1; border-top: 1px solid var(--border); }
.pick-list, .took-list { list-style: none; margin: 0; padding: 0; display: grid; gap: 0.35rem; }
.pick-item {
  width: 100%;
  display: grid;
  grid-template-columns: 1fr auto;
  grid-template-rows: auto auto;
  column-gap: 0.6rem;
  align-items: center;
  padding: 0.5rem 0.65rem;
  border: 1px solid var(--border);
  background: var(--bg-card);
  text-align: left;
  font: inherit;
  cursor: pointer;
}
.pick-item .bi { grid-column: 2; grid-row: 1 / span 2; font-size: 1.15rem; color: var(--text-dim); }
.pick-item.on { border-color: var(--accent); background: color-mix(in srgb, var(--accent) 10%, var(--bg-card)); }
.pick-item.on .bi { color: var(--accent); }
.pick-item:disabled { opacity: 0.45; cursor: default; }
.pick-name { font-weight: 700; font-size: 0.9rem; color: var(--text-primary); }
.pick-cat { font-size: 0.74rem; color: var(--text-dim); }
.took-item {
  display: flex; align-items: center; justify-content: space-between; gap: 0.5rem;
  padding: 0.6rem 0.7rem; border: 1px solid var(--border); background: var(--bg-card);
}
.ti-name { font-weight: 700; color: var(--text-primary); }
.took-list { margin-bottom: 0.8rem; }
.tk-foot { padding: 0.6rem 0.9rem; border-top: 1px solid var(--border); }
</style>
