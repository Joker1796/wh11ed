<template>
  <button
    v-if="party"
    class="sync-ind"
    :class="[`is-${kind}`, { open }]"
    type="button"
    :aria-label="text"
    :title="text"
    @click="open = !open"
  >
    <span
      v-if="kind === 'busy'"
      class="si-spin"
      aria-hidden="true"
    />
    <i
      v-else-if="kind === 'problem'"
      class="bi bi-exclamation-triangle-fill"
      aria-hidden="true"
    />
    <span
      v-else
      class="si-dot"
      aria-hidden="true"
    />
    <span
      v-if="open"
      class="si-text"
    >{{ text }}</span>
  </button>
</template>

<script setup>
import { ref, computed, onMounted, onUnmounted } from 'vue'
import { ui } from '../../i18n/ui.js'
import { useLocale } from '../../composables/useLocale.js'
import { useParty } from '../../composables/useParty.js'

// The sync state of a shared game, in the round bar: three looks and no more. A quiet dot for
// "in sync" (tap it for how long ago), a spinner only for a request that is taking a while — a
// spinner that flashes every three seconds reads as "something is wrong" and stops being seen
// within a minute — and a warning glyph, with its reason, when the phone is not in sync and the
// player should know it.

const { locale } = useLocale()
const labels = computed(() => ui[locale.value])
const { party, status, lastSyncAt } = useParty()

const open = ref(false)
const now = ref(Date.now())
let timer = null
onMounted(() => { timer = setInterval(() => { now.value = Date.now() }, 1000) })
onUnmounted(() => clearInterval(timer))

// Paused is not a problem: it is what the state is between mount and the first answer, and
// the glyph must not flash a warning for that.
const kind = computed(() => {
  if (status.value === 'busy') return 'busy'
  if (status.value === 'ok' || status.value === 'paused' || status.value === 'off') return 'ok'
  return 'problem'
})

const text = computed(() => {
  const l = labels.value
  switch (status.value) {
    case 'ok': {
      const s = lastSyncAt.value ? Math.round((now.value - lastSyncAt.value) / 1000) : null
      const when = s == null || s < 2 ? l.partySyncedJustNow : l.partySyncedAgo.replace('{n}', s)
      return `${l.partyStatusOk} · ${when}`
    }
    case 'busy': return l.partyStatusBusy
    case 'off':
    case 'paused': return l.partyStatusPaused
    case 'offline': return l.partyStatusOffline
    case 'readonly': return l.partyStatusReadonly
    case 'revoked': return l.partyStatusRevoked
    case 'ended': return l.partyStatusEnded
    default: return l.partyStatusError
  }
})
</script>

<style scoped>
.sync-ind {
  display: inline-flex;
  align-items: center;
  gap: 0.35rem;
  min-width: 1.6rem;
  height: 1.6rem;
  padding: 0 0.35rem;
  border: 0;
  background: none;
  color: var(--text-muted);
  font: inherit;
  font-size: 0.72rem;
  cursor: pointer;
}
.si-dot {
  width: 0.5rem;
  height: 0.5rem;
  border-radius: 50%;
  background: var(--accent);
  opacity: 0.7;
}
.si-spin {
  width: 0.75rem;
  height: 0.75rem;
  border: 2px solid var(--border);
  border-top-color: var(--accent);
  border-radius: 50%;
  animation: si-rot 0.8s linear infinite;
}
@keyframes si-rot { to { transform: rotate(360deg); } }
.is-problem { color: var(--accent); }
.is-problem .bi { font-size: 0.9rem; }
.si-text { white-space: nowrap; }
@media (prefers-reduced-motion: reduce) { .si-spin { animation: none; } }
</style>
