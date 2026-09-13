<template>
  <div class="bo-root">
    <template v-if="state === 'ok' && data">
      <div class="bo-top">
        <span class="bo-round">{{ labels.trackerRound }} {{ data.round }}</span>
        <span
          v-if="data.battlePhase"
          class="bo-phase"
        >{{ phaseLabel(data.battlePhase, labels) }}</span>
        <span
          v-if="data.layout"
          class="bo-layout"
        >{{ labels.trackerLayout }} {{ data.layout }}</span>
      </div>

      <div class="bo-sides">
        <section
          v-for="(s, i) in data.sides"
          :key="i"
          class="bo-side"
          :class="{ turn: data.turn === i }"
        >
          <header class="bo-head">
            <h2 class="bo-team">
              {{ s.teamName || (i === 0 ? 'A' : 'B') }}
            </h2>
            <span class="bo-total">{{ s.total }}</span>
          </header>
          <p class="bo-roles">
            <template v-if="s.role">
              {{ s.role === 'attacker' ? labels.trackerAttacker : labels.trackerDefender }}
            </template>
            <template v-if="s.forceType">
              · {{ s.forceType === 'unified' ? 'Unified Force' : 'Force of Convenience' }}
            </template>
            <template v-if="s.firstTurn">
              · {{ labels.trackerFirstTurn }}
            </template>
          </p>
          <ul class="bo-players">
            <li
              v-for="(p, pi2) in s.players"
              :key="pi2"
            >
              <span class="bo-pname">{{ p.name || (pi2 === 0 ? labels.trackerPlayer1 : labels.trackerPlayer2) }}</span>
              <span
                v-if="p.faction"
                class="bo-pfac"
              >{{ p.faction }}<template v-if="p.detachments && p.detachments.length"> · {{ p.detachments.join(', ') }}</template></span>
            </li>
          </ul>

          <dl class="bo-score">
            <div>
              <dt>{{ labels.trackerPrimary }}</dt>
              <dd>{{ s.primary?.vp ?? 0 }}</dd>
            </div>
            <div>
              <dt>{{ labels.trackerSecondary }}</dt>
              <dd>{{ s.secondaryVp ?? 0 }}</dd>
            </div>
            <div>
              <dt>CP</dt>
              <dd>{{ s.cp }}</dd>
            </div>
          </dl>

          <p
            v-if="s.primary?.name"
            class="bo-primary"
          >
            {{ s.primary.name }}
          </p>
          <ul
            v-if="s.secondaries && s.secondaries.length"
            class="bo-secs"
          >
            <li
              v-for="sec in s.secondaries"
              :key="sec.slug"
              :class="{ aside: !sec.active }"
            >
              <span class="bo-sec-name">{{ sec.name }}</span>
              <span class="bo-sec-vp">{{ sec.vp }}</span>
            </li>
          </ul>
        </section>
      </div>
    </template>

    <p
      v-else-if="state === 'waiting'"
      class="bo-msg"
    >
      {{ labels.broadcastWaiting }}
    </p>
    <p
      v-else-if="state === 'gone'"
      class="bo-msg"
    >
      {{ labels.broadcastGone }}
    </p>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, onUnmounted } from 'vue'
import { useRoute } from 'vue-router'
import { API_BASE_URL } from '../config.js'
import { ui } from '../i18n/ui.js'
import { useLocale } from '../composables/useLocale.js'
import { phaseLabel } from '../composables/stratagemPhases.js'

// The OBS overlay: a bare page (route meta `bare` strips the app chrome, the unscoped style
// below makes the page ground transparent) polling the public broadcast endpoint. It renders
// the payload's own baked-in names and never touches the tracker store or the mission data —
// this chunk must stay light, it is loaded by a capture machine, not a reader.

const route = useRoute()
const { locale } = useLocale()
const labels = computed(() => ui[locale.value])

const data = ref(null)
const state = ref('waiting') // waiting | ok | gone
let etag = null
let timer = null
let inFlight = false

async function poll() {
  // DEV-only mock transport (fenced like useAuth's mock — Vite strips it from prod builds):
  // a 'mock-' token is served out of localStorage, where the tracker tab's dev-mock pushes
  // land, so the two-tab flow works with no server in the loop.
  if (import.meta.env.DEV && String(route.params.token).startsWith('mock-')) {
    try {
      const b = JSON.parse(localStorage.getItem('wh11ed-dev-mock-broadcast') || 'null')
      if (!b || b.token !== route.params.token) { state.value = 'gone'; return }
      if (b.payload) { data.value = b.payload; state.value = 'ok' }
      else if (state.value !== 'ok') state.value = 'waiting'
    } catch { /* ignore */ }
    return
  }
  if (inFlight) return
  inFlight = true
  try {
    const res = await fetch(`${API_BASE_URL}/broadcast/${encodeURIComponent(route.params.token)}`, {
      headers: etag ? { 'If-None-Match': etag } : {},
    })
    if (res.status === 304) return
    if (res.status === 404) {
      state.value = 'gone' // revoked, regenerated, or expired — say so instead of freezing
      return
    }
    if (!res.ok) return // transient server hiccup: keep the last state on screen
    etag = res.headers.get('ETag')
    const body = await res.json()
    if (body?.payload) {
      data.value = body.payload
      state.value = 'ok'
    } else {
      // Enabled but nothing pushed yet.
      if (state.value !== 'ok') state.value = 'waiting'
    }
  } catch {
    // Network blip: keep showing the last known state.
  } finally {
    inFlight = false
  }
}

onMounted(() => {
  poll()
  timer = setInterval(poll, 2000)
})
onUnmounted(() => {
  if (timer) clearInterval(timer)
})
</script>

<!-- Unscoped on purpose: OBS keys the page ground out only if nothing paints it, and the app's
     background lives on html/body — cleared here, gated on this view's root being present. -->
<style>
html:has(.bo-root),
html:has(.bo-root) body,
html:has(.bo-root) .app-layout {
  background: transparent;
}
</style>

<style scoped>
/* Self-contained palette: the overlay sits ON VIDEO, so it ignores the app themes entirely —
   translucent dark panels + light text read on any footage. */
.bo-root {
  --bo-panel: rgba(12, 12, 16, 0.82);
  --bo-line: rgba(255, 255, 255, 0.18);
  --bo-text: #f5f4f0;
  --bo-dim: rgba(245, 244, 240, 0.65);
  --bo-gold: #d8b45a;
  color: var(--bo-text);
  font-family: var(--font-sans, sans-serif);
  padding: 1rem;
  max-width: 900px;
  margin: 0 auto;
}
.bo-top {
  display: flex;
  align-items: baseline;
  gap: 1rem;
  background: var(--bo-panel);
  border: 1px solid var(--bo-line);
  padding: 0.5rem 0.9rem;
  margin-bottom: 0.75rem;
}
.bo-round {
  font-family: var(--font-display, inherit);
  font-size: 1.4rem;
  color: var(--bo-gold);
}
.bo-phase { font-size: 1rem; }
.bo-layout {
  margin-left: auto;
  color: var(--bo-dim);
  font-size: 0.9rem;
}
.bo-sides {
  display: grid;
  grid-template-columns: minmax(0, 1fr) minmax(0, 1fr);
  gap: 0.75rem;
}
.bo-side {
  background: var(--bo-panel);
  border: 1px solid var(--bo-line);
  padding: 0.7rem 0.9rem;
}
.bo-side.turn { border-color: var(--bo-gold); }
.bo-head {
  display: flex;
  align-items: baseline;
  justify-content: space-between;
  gap: 0.6rem;
}
.bo-team {
  margin: 0;
  font-family: var(--font-display, inherit);
  font-size: 1.5rem;
  font-weight: 500;
  min-width: 0;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
.bo-total {
  font-family: var(--font-display, inherit);
  font-size: 2.2rem;
  color: var(--bo-gold);
  line-height: 1;
}
.bo-roles {
  margin: 0.1rem 0 0.5rem;
  font-size: 0.78rem;
  color: var(--bo-dim);
}
.bo-players {
  list-style: none;
  margin: 0 0 0.6rem;
  padding: 0;
}
.bo-players li {
  display: flex;
  gap: 0.5rem;
  align-items: baseline;
  font-size: 0.92rem;
  min-width: 0;
}
.bo-pname { font-weight: 600; white-space: nowrap; }
.bo-pfac {
  color: var(--bo-dim);
  font-size: 0.82rem;
  min-width: 0;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
.bo-score {
  display: flex;
  gap: 1.2rem;
  margin: 0 0 0.5rem;
  padding: 0.4rem 0;
  border-top: 1px solid var(--bo-line);
  border-bottom: 1px solid var(--bo-line);
}
.bo-score div { display: flex; align-items: baseline; gap: 0.4rem; }
.bo-score dt { font-size: 0.72rem; text-transform: uppercase; color: var(--bo-dim); }
.bo-score dd { margin: 0; font-size: 1.25rem; font-weight: 700; }
.bo-primary {
  margin: 0 0 0.35rem;
  font-size: 0.85rem;
  color: var(--bo-gold);
}
.bo-secs { list-style: none; margin: 0; padding: 0; }
.bo-secs li {
  display: flex;
  justify-content: space-between;
  gap: 0.6rem;
  font-size: 0.85rem;
  padding: 0.12rem 0;
}
.bo-secs li.aside { color: var(--bo-dim); }
.bo-sec-vp { font-weight: 700; }
.bo-msg {
  background: var(--bo-panel);
  border: 1px solid var(--bo-line);
  padding: 0.8rem 1rem;
  font-size: 1rem;
  max-width: 480px;
}
@media (max-width: 640px) {
  .bo-sides { grid-template-columns: minmax(0, 1fr); }
}
</style>
