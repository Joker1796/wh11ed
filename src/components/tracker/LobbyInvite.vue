<template>
  <div class="li">
    <div class="li-card">
      <h2 class="li-title">
        {{ labels.lobbyInviteTitle }}
      </h2>
      <p class="li-hint">
        {{ labels.lobbyInviteHint }}
      </p>

      <PartyInvite
        v-if="invite"
        :invite="invite"
      />
      <p
        v-else
        class="li-hint"
      >
        {{ labels.partyStatusBusy }}
      </p>

      <!-- Who has arrived. The host does not have to wait for anyone to go on setting the game
           up — the wizard's own gate is what holds the start until the other side is in — so
           this is a report, not a turnstile. -->
      <div class="li-who">
        <span class="li-label">{{ labels.partyMembers }}</span>
        <p
          v-if="!guests.length"
          class="li-hint li-waiting"
        >
          <span
            class="li-dot"
            aria-hidden="true"
          />
          {{ labels.lobbyInviteNobody }}
        </p>
        <ul
          v-else
          class="li-list"
        >
          <li
            v-for="m in guests"
            :key="m.memberId"
          >
            {{ m.name || labels.trackerOpponent }}
          </li>
        </ul>
      </div>

      <div class="li-actions">
        <button
          class="btn-ghost"
          @click="cancelOpen = true"
        >
          {{ labels.lobbyInviteCancel }}
        </button>
        <button
          class="btn-primary"
          @click="$emit('next')"
        >
          {{ labels.lobbyInviteNext }}
        </button>
      </div>
    </div>

    <ConfirmModal
      v-if="cancelOpen"
      :title="labels.lobbyCancel"
      :message="labels.lobbyCancelConfirm"
      :confirm-label="labels.lobbyCancelConfirmYes"
      :cancel-label="labels.trackerBack"
      @confirm="$emit('cancel')"
      @close="cancelOpen = false"
    />
  </div>
</template>

<script setup>
import { computed, ref, onMounted, onUnmounted } from 'vue'
import PartyInvite from './PartyInvite.vue'
import ConfirmModal from '../ConfirmModal.vue'
import { ui } from '../../i18n/ui.js'
import { useLocale } from '../../composables/useLocale.js'
import { useParty } from '../../composables/useParty.js'

// Where a shared game begins: the code and the link, and who has come in so far. It stands
// BEFORE the wizard because that is the order the table works in — you call the other player
// over, then you settle the mission. The host can walk on at any moment; the wizard's own gate
// is what waits for the other side to confirm its army.
defineEmits(['next', 'cancel'])

const { locale } = useLocale()
const labels = computed(() => ui[locale.value])
const { invite, members, refreshMembers, refreshInvite } = useParty()

const cancelOpen = ref(false)
const guests = computed(() => members.value.filter((m) => !m.you))

// The member list is not part of the game, so no slice carries it: this screen asks for it.
let timer = null
onMounted(async () => {
  await Promise.all([refreshInvite(), refreshMembers()])
  timer = setInterval(refreshMembers, 5000)
})
onUnmounted(() => clearInterval(timer))
</script>

<style scoped>
.li {
  display: flex;
  justify-content: center;
  padding: 1rem 0 2rem;
}
.li-card {
  width: 100%;
  max-width: 28rem;
  background: var(--bg-card);
  border: 1px solid var(--border);
  padding: 1.25rem;
}
.li-title {
  font-family: var(--font-display);
  font-size: 1.5rem;
  font-weight: 500;
  color: var(--text-primary);
  margin: 0 0 0.4rem;
}
.li-hint {
  margin: 0;
  font-size: 0.85rem;
  line-height: 1.45;
  color: var(--text-muted);
}
.li-who { margin-top: 1.1rem; }
.li-label {
  display: block;
  margin-bottom: 0.3rem;
  font-size: 0.78rem;
  color: var(--text-muted);
}
.li-waiting { display: flex; align-items: center; gap: 0.5rem; }
/* The one moving thing: a phone left on the table still reads as listening. */
.li-dot {
  width: 8px;
  height: 8px;
  background: var(--accent);
  animation: li-pulse 2s ease-in-out infinite;
}
@keyframes li-pulse {
  0%, 100% { opacity: 0.25; }
  50% { opacity: 1; }
}
@media (prefers-reduced-motion: reduce) {
  .li-dot { animation: none; opacity: 0.8; }
}
.li-list {
  list-style: none;
  margin: 0;
  padding: 0;
  display: grid;
  gap: 0.25rem;
  font-size: 0.9rem;
  color: var(--text-primary);
}
.li-actions {
  margin-top: 1.4rem;
  display: flex;
  justify-content: space-between;
  gap: 0.75rem;
}
</style>
