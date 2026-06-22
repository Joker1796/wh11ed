<template>
  <Teleport to="body">
    <Transition name="kw-pop">
      <div
        v-if="visible && activeKeyword"
        ref="popoverEl"
        class="kw-popover"
        :style="positionStyle"
        role="dialog"
        aria-modal="false"
        :aria-label="activeKeyword.name"
        tabindex="-1"
        @click.stop
      >
        <div class="kw-popover-header">
          <span class="keyword kw-name">{{ activeKeyword.name }}</span>
          <span class="kw-num" @click="navigateNum">{{ activeKeyword.num }}</span>
          <button class="kw-close" @click="close" aria-label="Close">✕</button>
        </div>
        <div class="kw-popover-body" v-html="renderInline(activeKeyword.fullText)" @click="handleBodyClick"></div>
      </div>
    </Transition>
  </Teleport>
</template>

<script setup>
import { computed, ref, watch, nextTick } from 'vue'
import { useKeywordPopover } from '../composables/useKeywordPopover.js'
import { useRenderInline } from '../composables/useRenderInline.js'
import { resolveRef, useRefNavigation } from '../composables/useRefNavigation.js'

const { visible, activeKeyword, anchor, close } = useKeywordPopover()

// Move focus into the popover when it opens so screen-reader / keyboard users land
// on the dialog (and Escape — handled globally in App.vue — closes it).
const popoverEl = ref(null)
watch(visible, async open => {
  if (open) {
    await nextTick()
    popoverEl.value?.focus()
  }
})
const { renderInline } = useRenderInline()
const { navigateTo } = useRefNavigation()

function navigateNum() {
  const { route, anchor: a } = resolveRef(activeKeyword.value.num)
  if (route && a) { close(); navigateTo({ route, anchor: a }) }
}

function handleBodyClick(e) {
  const refEl = e.target.closest('.cross-ref')
  if (refEl) {
    const { route, anchor: a } = resolveRef(refEl.dataset.ref)
    if (route && a) { close(); navigateTo({ route, anchor: a }) }
  }
}

const positionStyle = computed(() => {
  if (!anchor.value) return {}
  const r = anchor.value
  const vw = window.innerWidth
  const vh = window.innerHeight
  const popW = Math.min(360, vw - 16)
  const spaceBelow = vh - r.bottom

  let left = Math.max(8, Math.min(r.left, vw - popW - 8))
  let style = { width: popW + 'px', left: left + 'px' }

  if (spaceBelow < 220 && r.top > spaceBelow) {
    style.bottom = (vh - r.top + 8) + 'px'
  } else {
    style.top = (r.bottom + 8) + 'px'
  }
  return style
})
</script>

<style scoped>
.kw-popover {
  position: fixed;
  z-index: 500;
  background: var(--bg-insert);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 6px;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.55);
  overflow: hidden;
}

.kw-popover-header {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.6rem 0.9rem;
  border-bottom: 1px solid rgba(255, 255, 255, 0.08);
  background: rgba(0, 0, 0, 0.2);
}

.kw-popover-header .keyword {
  color: #e8c96a;
  background: rgba(232, 201, 106, 0.12);
  border-color: rgba(232, 201, 106, 0.4);
  cursor: default;
}

.kw-name {
  font-size: 0.8rem;
}

.kw-num {
  font-size: 0.72rem;
  font-family: var(--font-mono);
  color: rgba(255, 255, 255, 0.35);
  margin-left: auto;
  cursor: pointer;
}

.kw-num:hover {
  color: var(--accent);
  text-decoration: underline dotted;
  text-underline-offset: 2px;
}

.kw-close {
  background: none;
  border: none;
  color: rgba(255, 255, 255, 0.4);
  cursor: pointer;
  font-size: 0.85rem;
  line-height: 1;
  padding: 0 0 0 0.25rem;
  transition: color 0.15s;
}

.kw-close:hover {
  color: #fff;
}

.kw-popover-body {
  padding: 0.75rem 0.9rem;
  font-size: 0.88rem;
  line-height: 1.55;
  color: var(--text-on-dark);
}

.kw-popover-body :deep(strong) {
  color: #fff;
}

.kw-popover-body :deep(.keyword) {
  color: #e8c96a;
  background: rgba(232, 201, 106, 0.12);
  border-color: rgba(232, 201, 106, 0.4);
}

/* Transition */
.kw-pop-enter-active,
.kw-pop-leave-active {
  transition: opacity 0.15s, transform 0.15s;
}

.kw-pop-enter-from,
.kw-pop-leave-to {
  opacity: 0;
  transform: translateY(4px);
}
</style>
