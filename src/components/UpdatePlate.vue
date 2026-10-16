<template>
  <Transition name="fade">
    <aside
      v-if="appUpdate.phase !== 'idle'"
      ref="plate"
      class="dock-card update-plate"
      :class="{ ready }"
      role="status"
      aria-live="polite"
    >
      <p class="up-title">
        <i :class="['wi', ready ? 'wi-install' : 'wi-sync']" />
        <span class="up-title-text">{{ title }}</span>
      </p>
      <template v-if="ready">
        <p class="up-text">
          {{ labels.updateReadyText }}
        </p>
        <button
          type="button"
          class="btn-primary up-apply"
          @click="applyUpdate"
        >
          {{ labels.updateApply }}
        </button>
      </template>
      <div
        v-else
        class="up-bar"
        role="progressbar"
        :aria-valuenow="done"
        aria-valuemin="0"
        :aria-valuemax="total"
      >
        <span :style="{ width: `${Math.round(progress * 100)}%` }" />
      </div>
    </aside>
  </Transition>
</template>

<script setup>
// A new version, announced (useAppUpdate.js). No ✕ on purpose (owner, 2026-10-16): the plate is
// the only way a reader learns an update came, and it leaves by the button or by the next start
// opening the new version anyway. Under the dialogs (390 < 400), so whatever is open over it is
// finished first and the button pressed when it suits. While it shows, its height is published as
// --dock-h, and the corner buttons a wide screen keeps at the bottom right stand on top of it.
import { computed, onBeforeUnmount, ref, watch } from 'vue'
import { useLocale } from '../composables/useLocale.js'
import { ui } from '../i18n/ui.js'
import { appUpdate, applyUpdate } from '../composables/useAppUpdate.js'
import { useOfflineWarmup } from '../composables/useOfflineWarmup.js'

const { locale } = useLocale()
const labels = computed(() => ui[locale.value])
const { done, total, progress } = useOfflineWarmup()

const ready = computed(() => appUpdate.phase === 'ready')
const title = computed(() => {
  const l = labels.value
  if (!ready.value) return total.value ? `${l.downloadingUpdate} ${done.value}/${total.value}` : l.downloadingUpdate
  return appUpdate.version ? l.updateReady.replace('{v}', appUpdate.version) : l.updateReadyBare
})

const plate = ref(null)
let observer = null
const root = typeof document !== 'undefined' ? document.documentElement : null
function publish(h) {
  if (h) root?.style.setProperty('--dock-h', `${Math.ceil(h)}px`)
  else root?.style.removeProperty('--dock-h')
}
watch(plate, (el) => {
  observer?.disconnect()
  observer = null
  if (!el) return publish(0)
  if (typeof ResizeObserver === 'undefined') return publish(el.offsetHeight)
  observer = new ResizeObserver(() => publish(el.offsetHeight))
  observer.observe(el)
})
onBeforeUnmount(() => {
  observer?.disconnect()
  publish(0)
})
</script>

<style scoped>
.update-plate { z-index: 390; }
.up-title {
  display: flex;
  align-items: center;
  gap: 0.45rem;
  margin: 0;
  font-weight: 700;
  font-size: 0.95rem;
}
.up-title .wi { color: var(--accent-ink); flex-shrink: 0; }
.up-title-text { min-width: 0; }
.up-text { margin: 0.35rem 0 0.6rem; font-size: 0.85rem; line-height: 1.45; }
.up-bar {
  position: relative;
  height: 3px;
  margin-top: 0.55rem;
  background: var(--border);
}
.up-bar span {
  position: absolute;
  inset: 0 auto 0 0;
  background: var(--accent);
  transition: width var(--motion-med) ease;
}
/* A phone's strip: the title and the button on one line, the explanation left out — the card
   has room for it, a strip across the screen does not. The card's breakpoint is `.dock-card`'s. */
.update-plate.ready {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  padding-top: 0.55rem;
  padding-bottom: 0.55rem;
}
.update-plate.ready .up-title { flex: 1; }
.update-plate.ready .up-text { display: none; }
@media (min-width: 720px) and (min-height: 500px) {
  .update-plate.ready { display: block; padding-top: 0.8rem; padding-bottom: 0.8rem; }
  .update-plate.ready .up-text { display: block; }
}
</style>
