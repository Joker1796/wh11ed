<template>
  <div
    class="bo-root"
    :class="[theme, { fit: isFit }]"
  >
    <div
      ref="canvasEl"
      class="bo-canvas"
      :style="fitStyle"
    >
      <template v-if="state === 'ok' && data">
        <div
          v-if="show('meta')"
          class="bo-top"
        >
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
            <p
              v-if="show('roles')"
              class="bo-roles"
            >
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
            <ul
              v-if="show('players')"
              class="bo-players"
            >
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

            <dl
              v-if="show('vp') || show('cp')"
              class="bo-score"
            >
              <template v-if="show('vp')">
                <div>
                  <dt>{{ labels.trackerPrimary }}</dt>
                  <dd>{{ s.primary?.vp ?? 0 }}</dd>
                </div>
                <div>
                  <dt>{{ labels.trackerSecondary }}</dt>
                  <dd>{{ s.secondaryVp ?? 0 }}</dd>
                </div>
              </template>
              <div v-if="show('cp')">
                <dt>CP</dt>
                <dd>{{ s.cp }}</dd>
              </div>
            </dl>

            <p
              v-if="show('primary') && s.primary?.name"
              class="bo-primary"
            >
              {{ s.primary.name }}
            </p>
            <ul
              v-if="show('secs') && visibleSecs(s).length"
              class="bo-secs"
            >
              <li
                v-for="sec in visibleSecs(s)"
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
  </div>
</template>

<script setup>
import { ref, computed, watch, nextTick, onMounted, onUnmounted } from 'vue'
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

// Presentation is the LINK's business (?theme=light&hide=meta,cp,...): different OBS scenes
// are different URLs of one token, and the pushed payload stays pure data. Unknown ids in
// `hide` are ignored; the total is deliberately not hideable — it is what a scoreboard is.
const theme = computed(() => (route.query.theme === 'light' ? 'light' : 'dark'))
const hidden = computed(() => new Set(String(route.query.hide || '').split(',').filter(Boolean)))
function show(block) {
  return !hidden.value.has(block)
}
// hide=secs-done drops the set-aside (played-out) cards, leaving only the active hand.
function visibleSecs(side) {
  const list = side.secondaries || []
  return hidden.value.has('secs-done') ? list.filter((c) => c.active) : list
}

// ── Fit mode (?fit=1[&cols=1]) ────────────────────────────────────────────────────────────
// For a PREPARED window in a stream layout: OBS gives the Browser Source a fixed size, and
// the scoreboard scales itself to fill it — laid out at a fixed base width, measured, then
// transform-scaled so the whole thing fits both axes. cols=1 stacks the sides for portrait
// windows (fit mode ignores the width media query — the canvas is wider than the viewport).
const isFit = computed(() => route.query.fit === '1')
// The WINDOW is the aspect: refit() binary-searches the layout width whose natural
// proportions match the window's, so the scoreboard packs the slot as densely as it can —
// no knob to turn. Columns follow the probed width via a container query. ?w= remains as an
// expert override (fixes the layout width; fit still scales it in).
const forcedW = computed(() => {
  const n = Number(route.query.w)
  return Number.isFinite(n) && n >= 360 ? Math.min(n, 1400) : null
})
const canvasEl = ref(null)
const fitScale = ref(1)
const fitLeft = ref(0)
const fitTop = ref(0)
// Width is set imperatively by refit() (it probes layouts); the style binding carries only
// the transform and the centering offsets.
const fitStyle = computed(() => {
  if (!isFit.value) return undefined
  return {
    transform: `scale(${fitScale.value})`,
    left: `${fitLeft.value}px`,
    top: `${fitTop.value}px`,
  }
})
function refit() {
  if (!isFit.value || !canvasEl.value || typeof window === 'undefined') return
  const el = canvasEl.value
  const vw = window.innerWidth
  const vh = window.innerHeight
  let w = forcedW.value
  if (!w) {
    // Binary search the layout width whose natural aspect matches the window's. Wider is
    // always flatter (monotonic), so nine probes pin it to ~2px; each probe is a synchronous
    // set-width + scrollHeight read — a forced reflow, cheap on a DOM this small, every 2 s.
    const target = vw / Math.max(1, vh)
    let lo = 360
    let hi = 1400
    for (let i = 0; i < 9; i++) {
      const mid = Math.round((lo + hi) / 2)
      el.style.width = `${mid}px`
      const ratio = mid / (el.scrollHeight || 1)
      if (ratio > target) hi = mid
      else lo = mid
    }
    w = Math.round((lo + hi) / 2)
  }
  el.style.width = `${w}px`
  // scrollHeight is layout height — transforms don't feed back into it, so this is stable.
  const ch = el.scrollHeight || 1
  const scale = Math.min(vw / w, vh / ch)
  fitScale.value = scale
  // Center the leftover air on both axes — a slab of empty window under the scoreboard reads
  // as a bug; a symmetric margin reads as breathing room.
  fitLeft.value = Math.max(0, (vw - w * scale) / 2)
  fitTop.value = Math.max(0, (vh - ch * scale) / 2)
}
const data = ref(null)
const state = ref('waiting') // waiting | ok | gone

// Refit whenever the payload changes shape (a drawn card adds a row) or the mode flips.
watch([data, isFit, forcedW], async () => {
  await nextTick()
  refit()
})
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
  window.addEventListener('resize', refit)
  refit()
})
onUnmounted(() => {
  if (timer) clearInterval(timer)
  window.removeEventListener('resize', refit)
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
/* The light preset (?theme=light): translucent light panels + dark text, for bright tables
   and light stream layouts. Same tokens, different values — nothing else changes. */
.bo-root.light {
  --bo-panel: rgba(248, 247, 243, 0.9);
  --bo-line: rgba(20, 20, 24, 0.22);
  --bo-text: #17171b;
  --bo-dim: rgba(23, 23, 27, 0.62);
  --bo-gold: #8a6a1f;
}
/* Fit mode: the root pins to the viewport, the canvas lays out at its fixed base width and
   is transform-scaled by refit() to fill the window OBS gave us. */
.bo-root.fit {
  position: fixed;
  inset: 0;
  padding: 0;
  max-width: none;
  margin: 0;
  overflow: hidden;
}
.bo-root.fit .bo-canvas {
  position: absolute;
  transform-origin: top left;
  padding: 0.35rem;
}
/* Fit mode is a stream slot — density over air: every pixel of the window is paid for. */
.bo-root.fit .bo-top {
  padding: 0.35rem 0.7rem;
  margin-bottom: 0.45rem;
}
.bo-root.fit .bo-sides { gap: 0.45rem; }
.bo-root.fit .bo-side { padding: 0.45rem 0.7rem; }
.bo-root.fit .bo-roles { margin-bottom: 0.3rem; }
.bo-root.fit .bo-players { margin-bottom: 0.35rem; }
.bo-root.fit .bo-score {
  margin-bottom: 0.3rem;
  padding: 0.25rem 0;
  gap: 1rem;
}
.bo-root.fit .bo-primary { margin-bottom: 0.2rem; }
.bo-root.fit .bo-secs li { padding: 0.06rem 0; }
/* The canvas is wider (or narrower) than the viewport in fit mode, so column count follows
   the CANVAS width via a container query, not the viewport media query — which is also what
   lets refit()'s width probes see the real reflowed height at every candidate width. */
.bo-root.fit .bo-canvas { container-type: inline-size; }
.bo-root.fit .bo-sides { grid-template-columns: minmax(0, 1fr) minmax(0, 1fr); }
@container (max-width: 639px) {
  .bo-root.fit .bo-sides { grid-template-columns: minmax(0, 1fr); }
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
  /* Explicit: the global h1-h4 rule colors headings by the APP theme, which the overlay must
     not follow — it sits on video and answers only to its own ?theme=. */
  color: var(--bo-text);
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
