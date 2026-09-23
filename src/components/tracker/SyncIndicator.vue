<template>
  <div
    v-if="party"
    class="si-wrap"
  >
    <button
      ref="btn"
      class="sync-ind"
      :class="[`is-${kind}`, { open }]"
      type="button"
      :aria-label="text"
      :aria-expanded="open"
      @click="toggle"
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
    </button>

    <!-- The state in full, ABOVE the row rather than inside it. It used to expand the button,
         which reflowed the line it sits in — on the lobby row that moved "Link and code" and
         "Close the lobby" out from under the thumb that had just tapped the dot. -->
    <Transition name="fade-pop">
      <span
        v-if="open"
        class="si-pop"
        :class="align"
        role="status"
      >{{ text }}</span>
    </Transition>
    <div
      v-if="open"
      class="si-backdrop"
      @click="open = false"
    />
  </div>
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
// Which edge the bubble hangs from, decided when it opens: an indicator in the left half of the
// screen opens to the right and one in the right half to the left, so the text never leaves the
// viewport and the page never scrolls sideways because of it.
const align = ref('start')
const btn = ref(null)
function toggle() {
  if (!open.value && btn.value && typeof window !== 'undefined') {
    const r = btn.value.getBoundingClientRect()
    align.value = r.left + r.width / 2 > window.innerWidth / 2 ? 'end' : 'start'
  }
  open.value = !open.value
}

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
/* The anchor: zero-size in the layout, so the bubble it carries changes nothing around it. */
.si-wrap { position: relative; display: inline-flex; }
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
/* The bubble. Above the button, because below it lands on the next row's controls — and on a
   phone that row is what the thumb is already over. */
.si-pop {
  position: absolute;
  bottom: calc(100% + 0.3rem);
  z-index: 5;
  padding: 0.35rem 0.55rem;
  border: 1px solid var(--border);
  background: var(--bg-card);
  color: var(--text-primary);
  font-size: 0.75rem;
  line-height: 1.3;
  white-space: nowrap;
  max-width: min(18rem, 80vw);
  overflow: hidden;
  text-overflow: ellipsis;
}
.si-pop.start { left: 0; }
.si-pop.end { right: 0; }
/* Tapping anywhere else closes it — the same recipe the account menu uses. */
.si-backdrop {
  position: fixed;
  inset: 0;
  z-index: 4;
}
@media (prefers-reduced-motion: reduce) { .si-spin { animation: none; } }
</style>
