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
            :value="shareUrl"
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
        </p>
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
import { ref, computed } from 'vue'
import BaseModal from '../BaseModal.vue'
import { ui } from '../../i18n/ui.js'
import { useLocale } from '../../composables/useLocale.js'
import { useBroadcast } from '../../composables/useBroadcast.js'

defineEmits(['close'])
const { locale } = useLocale()
const labels = computed(() => ui[locale.value])
const { enabled, shareUrl, canBroadcast, lastError, enable, regenerate, disable } = useBroadcast()

const copied = ref(false)
async function copy() {
  if (!shareUrl.value) return
  try {
    await navigator.clipboard.writeText(shareUrl.value)
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
