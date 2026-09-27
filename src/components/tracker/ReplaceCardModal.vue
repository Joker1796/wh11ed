<template>
  <BaseModal
    :title="title"
    :subtitle="subtitle"
    max-width="440px"
    @close="$emit('close')"
  >
    <div class="modal-body">
      <p
        v-if="note"
        class="rc-note"
      >
        {{ note }}
      </p>
      <button
        class="btn-primary rc-random"
        @click="$emit('pick', null)"
      >
        🎲 {{ labels.trackerReplaceRandom }}
      </button>
      <template v-if="choosable">
        <div class="or-sep">
          <span>{{ labels.trackerReplaceOrChoose }}</span>
        </div>
        <ul class="modal-list rc-list">
          <li
            v-for="m in deckMissions"
            :key="m.slug"
          >
            <button
              class="rc-item"
              @click="$emit('pick', m.slug)"
            >
              <span class="rc-name">{{ m.name }}</span>
              <span class="rc-cat">{{ m.category }}</span>
            </button>
          </li>
        </ul>
      </template>
    </div>
  </BaseModal>
</template>

<script setup>
import { computed } from 'vue'
import BaseModal from '../BaseModal.vue'
import { ui } from '../../i18n/ui.js'
import { useLocale } from '../../composables/useLocale.js'
import { useTracker, missionBySlug } from '../../composables/useTracker.js'

// The replacement for a card leaving by a rule (WHEN DRAWN, the 1CP replacement): at random
// always; by hand too when the card itself came in by hand (`choosable`) — a player who picks
// their cards picks the replacement the same way (Mikhail's prototype). Emits `pick` with the
// slug, or null for random.
const props = defineProps({
  pi: { type: Number, required: true },
  slug: { type: String, required: true },
  title: { type: String, required: true },
  subtitle: { type: String, default: '' },
  note: { type: String, default: '' },
  choosable: { type: Boolean, default: false },
})
defineEmits(['pick', 'close'])
const { locale } = useLocale()
const labels = computed(() => ui[locale.value])
const { current } = useTracker()
const player = computed(() => current.value.players[props.pi])
const deckMissions = computed(() =>
  player.value.secondary.deck
    .filter(slug => slug !== props.slug)
    .map(slug => missionBySlug(slug, player.value.role, locale.value))
    .filter(Boolean)
    .sort((a, b) => a.name.localeCompare(b.name)),
)
</script>

<style scoped>
.rc-note { margin: 0 0 0.7rem; font-size: 0.84rem; color: var(--text-muted); line-height: 1.45; }
.rc-random { width: 100%; justify-content: center; min-height: 46px; font-weight: 700; }
.rc-list { padding: 0; list-style: none; margin: 0; }
.rc-item {
  width: 100%; display: grid; gap: 0.1rem;
  padding: 0.5rem 0.65rem; border: 1px solid var(--border); background: var(--bg-card);
  text-align: left; font: inherit; cursor: pointer;
}
@media (hover: hover) { .rc-item:hover { border-color: var(--accent); } }
.rc-name { font-weight: 700; font-size: 0.9rem; color: var(--text-primary); }
.rc-cat { font-size: 0.74rem; color: var(--text-dim); }
</style>
