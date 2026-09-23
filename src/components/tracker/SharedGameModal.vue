<template>
  <BaseModal
    :title="labels.lobbyChoiceTitle"
    max-width="26rem"
    @close="$emit('close')"
  >
    <div class="modal-body sg-body">
      <p class="sg-hint">
        {{ labels.lobbyChoiceHint }}
      </p>

      <div class="act-list">
        <!-- Creating needs an account; joining does not, which is the whole reason these two
             sit behind one button instead of being two of equal weight on the tracker home. -->
        <button
          type="button"
          class="act-btn sg-act"
          :disabled="!canShare"
          @click="$emit('create')"
        >
          <span class="sg-act-name">{{ labels.lobbyChoiceCreate }}</span>
          <span class="sg-act-sub">{{ canShare ? labels.lobbyChoiceCreateHint : labels.partySignIn }}</span>
        </button>
        <RouterLink
          to="/tracker/join"
          class="act-btn sg-act"
          @click="$emit('close')"
        >
          <span class="sg-act-name">{{ labels.lobbyChoiceJoin }}</span>
          <span class="sg-act-sub">{{ labels.lobbyChoiceJoinHint }}</span>
        </RouterLink>
      </div>
    </div>
  </BaseModal>
</template>

<script setup>
import { computed } from 'vue'
import BaseModal from '../BaseModal.vue'
import { ui } from '../../i18n/ui.js'
import { useLocale } from '../../composables/useLocale.js'
import { useParty } from '../../composables/useParty.js'

// The two ways into a shared game, behind one button. They were two entries side by side on the
// tracker home and that was wrong in two ways: it made "join someone else's table" look as
// routine as starting your own, and it left three equal-looking links under the primary button.
// Here they are what they actually are — one subject, two directions.
defineEmits(['create', 'close'])

const { locale } = useLocale()
const labels = computed(() => ui[locale.value])
const { canShare } = useParty()
</script>

<style scoped>
.sg-body { padding: 1rem; }
.sg-hint {
  margin: 0 0 0.9rem;
  font-size: 0.85rem;
  line-height: 1.45;
  color: var(--text-muted);
}
/* Two lines per choice: what it does, and the one fact that decides between them (an account,
   a code from the host). A subtitle that stays on the button is what keeps the dialog to two
   taps instead of a paragraph above them. */
.sg-act {
  display: flex;
  flex-direction: column;
  gap: 0.2rem;
  text-decoration: none;
}
.sg-act-name { font-size: 0.95rem; }
.sg-act-sub {
  font-size: 0.78rem;
  font-weight: 400;
  color: var(--text-muted);
}
.sg-act:disabled { opacity: 0.55; cursor: not-allowed; }
@media (hover: hover) {
  a.sg-act:hover { border-color: var(--accent); }
}
</style>
