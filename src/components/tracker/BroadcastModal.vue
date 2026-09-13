<template>
  <BaseModal
    :title="labels.trackerBroadcastTitle"
    max-width="440px"
    @close="$emit('close')"
  >
    <div class="modal-body">
      <p class="bc-hint">
        {{ labels.trackerBroadcastHint }}
      </p>

      <!-- Signed out: the switch is shown disabled with the reason, not hidden — the server is
           what carries the stream, so there is no offline version of this to offer. -->
      <p
        v-if="!canBroadcast"
        class="bc-signin"
      >
        {{ labels.trackerBroadcastSignIn }}
      </p>

      <template v-else-if="!enabled">
        <button
          class="btn-primary bc-enable"
          @click="onEnable"
        >
          {{ labels.trackerBroadcastEnable }}
        </button>
      </template>

      <template v-else>
        <div class="bc-link-row">
          <input
            type="text"
            class="bc-link"
            readonly
            :value="overlayUrl"
            @focus="$event.target.select()"
          >
          <button
            class="btn-ghost bc-copy"
            @click="copy"
          >
            {{ copied ? labels.trackerBroadcastCopied : labels.trackerBroadcastCopy }}
          </button>
        </div>
        <p class="bc-obs">
          {{ labels.trackerBroadcastObsHint }}
          <RouterLink
            class="bc-help"
            to="/help/broadcast"
          >
            {{ labels.trackerBroadcastHelpLink }}
          </RouterLink>
        </p>

        <!-- The overlay's presentation lives in the LINK (?theme, ?hide) — this is a URL
             builder, not settings: two OBS scenes can hold two differently-configured links
             of the same token. Defaults produce a clean parameterless URL. -->
        <details class="bc-opts">
          <summary>{{ labels.trackerBroadcastCustomize }}</summary>
          <div class="bc-opts-body">
            <div class="bc-theme-row">
              <span>{{ labels.trackerBroadcastTheme }}</span>
              <div class="seg">
                <button
                  :class="{ on: theme === 'dark' }"
                  @click="theme = 'dark'"
                >
                  {{ labels.trackerBroadcastThemeDark }}
                </button>
                <button
                  :class="{ on: theme === 'light' }"
                  @click="theme = 'light'"
                >
                  {{ labels.trackerBroadcastThemeLight }}
                </button>
              </div>
            </div>
            <label
              v-for="b in OVERLAY_BLOCKS"
              :key="b"
              class="bc-block"
            >
              <input
                v-model="shown[b]"
                type="checkbox"
              >
              <span>{{ labels[BLOCK_LABELS[b]] }}</span>
            </label>
            <label class="bc-block">
              <input
                v-model="hideDone"
                type="checkbox"
              >
              <span>{{ labels.bcHideSecsDone }}</span>
            </label>
            <label class="bc-block">
              <input
                v-model="fit"
                type="checkbox"
              >
              <span>{{ labels.trackerBroadcastFit }}</span>
            </label>
            <div
              v-if="fit"
              class="bc-theme-row"
            >
              <span>{{ labels.trackerBroadcastAspect }}</span>
              <div class="seg">
                <button
                  v-for="a in ASPECTS"
                  :key="a"
                  :class="{ on: aspect === a }"
                  @click="aspect = a"
                >
                  {{ a === 'window' ? labels.trackerBroadcastAspectWindow : a }}
                </button>
              </div>
            </div>
          </div>
        </details>
        <div class="bc-actions">
          <button
            class="btn-ghost"
            @click="onRegenerate"
          >
            {{ labels.trackerBroadcastRegenerate }}
          </button>
          <button
            class="btn-ghost bc-off"
            @click="onDisable"
          >
            {{ labels.trackerBroadcastDisable }}
          </button>
        </div>
      </template>

      <p
        v-if="lastError"
        class="bc-err"
      >
        {{ labels.trackerBroadcastError }}
      </p>
    </div>
  </BaseModal>
</template>

<script setup>
import { ref, reactive, computed } from 'vue'
import BaseModal from '../BaseModal.vue'
import { ui } from '../../i18n/ui.js'
import { useLocale } from '../../composables/useLocale.js'
import { useBroadcast } from '../../composables/useBroadcast.js'
import { useTheme } from '../../composables/useTheme.js'

defineEmits(['close'])
const { locale } = useLocale()
const labels = computed(() => ui[locale.value])
const { enabled, shareUrl, canBroadcast, lastError, enable, regenerate, disable } = useBroadcast()

// The overlay's toggleable blocks, in display order — ids match BroadcastOverlayView's `hide=`
// vocabulary. The total is deliberately not here: it is what a scoreboard is.
const OVERLAY_BLOCKS = ['meta', 'players', 'roles', 'cp', 'vp', 'bp', 'rounds', 'primary', 'secs']
const BLOCK_LABELS = {
  meta: 'bcBlockMeta', players: 'bcBlockPlayers', roles: 'bcBlockRoles', cp: 'bcBlockCp',
  vp: 'bcBlockVp', bp: 'bcBlockBp', rounds: 'bcBlockRounds', primary: 'bcBlockPrimary',
  secs: 'bcBlockSecs',
}
// Seeded from the SITE's current theme — the dialog is recreated on every open, so the seg
// starts on whatever the reader is looking at; the overlay itself still obeys only its URL.
const { theme: appTheme } = useTheme()
const theme = ref(appTheme.value === 'light' ? 'light' : 'dark')
// Defaults tuned for a stream slot: rosters and roles OFF (the table talk covers who plays
// what — the slot's pixels go to the score), everything else on.
const shown = reactive({
  ...Object.fromEntries(OVERLAY_BLOCKS.map((bk) => [bk, true])),
  players: false,
  roles: false,
  rounds: false, // a per-round strip is a wide thing; a slot has to ask for it
})
// Phrased (and stored) as an ACTION, unlike the show-rows above: checked = the set-aside
// cards leave the overlay. Rides the same hide= vocabulary as 'secs-done'.
const hideDone = ref(true) // hidden by default — the stream cares about the live hand

// The configured link. Defaults add no parameters, so the plain URL stays the common case.
// Fit mode: the overlay scales itself into whatever window OBS gives the Browser Source —
// for a prepared slot in a stream layout. cols=1 stacks the two sides for portrait slots.
const fit = ref(true) // on by default — the overlay is built for a prepared OBS slot;
// the window's own aspect drives the layout unless a fixed ratio below locks it.
const ASPECTS = ['window', '16:9', '4:3', '1:1', '9:16']
const aspect = ref('window')

const overlayUrl = computed(() => {
  if (!shareUrl.value) return null
  const params = new URLSearchParams()
  if (theme.value === 'light') params.set('theme', 'light')
  const hide = OVERLAY_BLOCKS.filter((b) => !shown[b])
  if (hideDone.value) hide.push('secs-done')
  if (hide.length) params.set('hide', hide.join(','))
  if (fit.value) {
    params.set('fit', '1')
    if (aspect.value !== 'window') params.set('ar', aspect.value)
  }
  const q = params.toString()
  return q ? `${shareUrl.value}?${q}` : shareUrl.value
})

const copied = ref(false)
async function copy() {
  if (!overlayUrl.value) return
  try {
    await navigator.clipboard.writeText(overlayUrl.value)
    copied.value = true
    setTimeout(() => { copied.value = false }, 1500)
  } catch { /* clipboard denied — the input stays selectable by hand */ }
}
function onEnable() { enable() }
function onRegenerate() { copied.value = false; regenerate() }
function onDisable() { disable() }
</script>

<style scoped>
.modal-body { padding: 0.9rem 1rem 1rem; }
.bc-hint {
  margin: 0 0 0.75rem;
  font-size: 0.85rem;
  line-height: 1.5;
  color: var(--text-muted);
}
.bc-signin {
  margin: 0;
  padding: 0.6rem 0.7rem;
  background: var(--bg-secondary);
  font-size: 0.82rem;
  color: var(--text-muted);
}
.bc-enable { width: 100%; }
.bc-link-row { display: flex; gap: 0.4rem; }
.bc-link {
  flex: 1;
  min-width: 0;
  padding: 0.5rem 0.6rem;
  border: 1px solid var(--accent);
  background: var(--bg-secondary);
  color: var(--text-primary);
  /* ≥16px on coarse pointers is the global rule; the URL benefits from mono anyway. */
  font-family: var(--font-mono);
  font-size: 0.8rem;
}
.bc-copy { white-space: nowrap; }
.bc-obs {
  margin: 0.6rem 0 0;
  font-size: 0.78rem;
  line-height: 1.5;
  color: var(--text-muted);
}
.bc-help { white-space: nowrap; }
.bc-opts { margin-top: 0.7rem; }
.bc-opts > summary {
  cursor: pointer;
  font-size: 0.78rem;
  font-weight: 600;
  color: var(--text-muted);
  padding: 0.15rem 0;
}
@media (hover: hover) { .bc-opts > summary:hover { color: var(--text-primary); } }
.bc-opts-body {
  display: flex;
  flex-direction: column;
  gap: 0.35rem;
  padding: 0.5rem 0 0.1rem;
}
.bc-theme-row {
  display: flex;
  align-items: center;
  gap: 0.6rem;
  font-size: 0.8rem;
  color: var(--text-muted);
  margin-bottom: 0.2rem;
}
.bc-block {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-size: 0.82rem;
  color: var(--text-primary);
  cursor: pointer;
}
.bc-actions {
  display: flex;
  gap: 0.5rem;
  margin-top: 0.8rem;
}
.bc-off { color: var(--text-muted); }
.bc-err {
  margin: 0.6rem 0 0;
  font-size: 0.78rem;
  color: var(--accent);
}
@media (pointer: coarse) {
  .bc-link { font-size: 16px; }
}
</style>
