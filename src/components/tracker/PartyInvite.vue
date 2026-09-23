<template>
  <div class="pi">
    <div class="pi-row">
      <span class="pi-label">{{ labels.partyLink }}</span>
      <div class="copy-row">
        <input
          type="text"
          class="copy-field"
          readonly
          :value="joinUrl"
          @focus="$event.target.select()"
        >
        <button
          class="btn-ghost copy-btn"
          @click="copy"
        >
          {{ copied ? labels.trackerBroadcastCopied : labels.trackerBroadcastCopy }}
        </button>
      </div>
    </div>
    <div
      v-if="qrSvg"
      class="pi-qr"
      v-html="qrSvg"
    />
    <div class="pi-row pi-code-row">
      <span class="pi-label">{{ labels.partyCode }}</span>
      <span
        v-if="invite.code && codeLive"
        class="pi-code"
      >{{ codeText }}</span>
      <button
        class="btn-ghost"
        @click="newInvite()"
      >
        {{ labels.partyNewCode }}
      </button>
    </div>
    <p class="pi-note">
      {{ labels.partyCodeHint }}
    </p>
  </div>
</template>

<script setup>
import { computed, ref, watch, onMounted, onUnmounted } from 'vue'
import { ui } from '../../i18n/ui.js'
import { useLocale } from '../../composables/useLocale.js'
import { useParty } from '../../composables/useParty.js'

// The host's invitation — the link, its QR and the six-digit code — as one block, because it is
// needed in two places: the sharing dialog of a game already running, and the lobby screen where
// a shared game begins. It was written in the dialog first; a second copy on the lobby screen
// would have been a hundred lines to keep in step for no reason.
defineProps({
  invite: { type: Object, required: true },
})

const { locale } = useLocale()
const labels = computed(() => ui[locale.value])
const { invite: liveInvite, newInvite } = useParty()

// The join link: the bare path, and the reader's locale follows in the router's own way.
const joinUrl = computed(() =>
  liveInvite.value?.token && typeof window !== 'undefined'
    ? `${window.location.origin}/tracker/join/${liveInvite.value.token}`
    : '',
)
const codeText = computed(() =>
  liveInvite.value?.code ? `${liveInvite.value.code.slice(0, 3)} ${liveInvite.value.code.slice(3)}` : '',
)
// The code expires while the screen is open, so the clock has to tick for the line to know.
const now = ref(Date.now())
let timer = null
onMounted(() => { timer = setInterval(() => { now.value = Date.now() }, 10000) })
onUnmounted(() => clearInterval(timer))
const codeLive = computed(
  () => !!liveInvite.value?.codeExpiresAt && new Date(liveInvite.value.codeExpiresAt).getTime() > now.value,
)

// The QR is drawn only when there is a link to draw, by a library loaded on demand — a dialog
// opened to check who is connected must not pay for it.
const qrSvg = ref('')
watch(joinUrl, async (url) => {
  qrSvg.value = ''
  if (!url) return
  try {
    const { toString } = await import('qrcode')
    qrSvg.value = await toString(url, { type: 'svg', margin: 1, errorCorrectionLevel: 'M' })
  } catch { /* no QR is a smaller loss than no dialog */ }
}, { immediate: true })

const copied = ref(false)
async function copy() {
  if (!joinUrl.value) return
  try {
    await navigator.clipboard.writeText(joinUrl.value)
    copied.value = true
    setTimeout(() => { copied.value = false }, 1500)
  } catch { /* clipboard denied — the field stays selectable by hand */ }
}
</script>

<style scoped>
.pi-row { margin-top: 0.6rem; }
.pi-label {
  display: block;
  margin-bottom: 0.25rem;
  font-size: 0.78rem;
  color: var(--text-muted);
}
.pi-qr {
  width: 9rem;
  max-width: 100%;
  margin: 0.6rem auto 0;
  background: #fff;
  padding: 0.3rem;
}
.pi-qr :deep(svg) { display: block; width: 100%; height: auto; }
.pi-code-row {
  display: flex;
  align-items: center;
  gap: 0.6rem;
  flex-wrap: wrap;
}
.pi-code-row .pi-label { margin: 0; }
.pi-code {
  font-family: var(--font-mono);
  font-size: 1.4rem;
  letter-spacing: 0.08em;
  color: var(--text-primary);
}
.pi-note {
  margin: 0.3rem 0 0;
  font-size: 0.74rem;
  line-height: 1.45;
  color: var(--text-muted);
}
</style>
