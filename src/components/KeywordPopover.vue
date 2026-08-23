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
          <span class="kw-heading">
            <span :class="activeKeyword.kind === 'gloss' ? 'gloss-name' : 'keyword kw-name'">{{ activeKeyword.name }}</span>
            <!-- A name that stays English carries its translation under it, the way StratCard
                 prints the pair on the card itself. -->
            <span v-if="activeKeyword.sub" class="kw-name-ru">{{ activeKeyword.sub }}</span>
          </span>
          <span v-if="activeKeyword.num" class="kw-num" @click="navigateNum">{{ activeKeyword.num }}</span>
          <button class="kw-close" :class="{ 'kw-close-push': !activeKeyword.num }" @click="close" :aria-label="labels.modalClose">✕</button>
        </div>
        <div v-if="activeKeyword.fullText" class="kw-popover-body" v-html="renderRichText(activeKeyword.fullText)" @click="handleBodyClick"></div>
      </div>
    </Transition>
  </Teleport>
</template>

<script setup>
import { computed, ref, watch, nextTick, onUnmounted } from 'vue'
import { useKeywordPopover } from '../composables/useKeywordPopover.js'
import { useRenderInline } from '../composables/useRenderInline.js'
import { resolveRef, useRefNavigation } from '../composables/useRefNavigation.js'
import { ui } from '../i18n/ui.js'
import { useLocale } from '../composables/useLocale.js'

const { locale } = useLocale()
const labels = computed(() => ui[locale.value])
const { visible, activeKeyword, anchor, open, openGloss, close } = useKeywordPopover()

// Move focus into the popover when it opens so screen-reader / keyboard users land
// on the dialog (and Escape — handled globally in App.vue — closes it).
// The popover is anchored to a rect captured at open time and positioned `fixed`, so it
// can't follow the page as it scrolls — dismiss it on scroll/resize instead (matches the
// usual anchored-popover behaviour). preventScroll on focus() avoids the focus itself
// nudging the page and self-closing the popover.
const popoverEl = ref(null)
function dismissOnMove() { if (visible.value) close() }
watch(visible, async open => {
  if (open) {
    await nextTick()
    popoverEl.value?.focus({ preventScroll: true })
    window.addEventListener('scroll', dismissOnMove, { capture: true, passive: true })
    window.addEventListener('resize', dismissOnMove, { passive: true })
  } else {
    window.removeEventListener('scroll', dismissOnMove, { capture: true })
    window.removeEventListener('resize', dismissOnMove)
  }
})
onUnmounted(() => {
  window.removeEventListener('scroll', dismissOnMove, { capture: true })
  window.removeEventListener('resize', dismissOnMove)
})
const { renderRichText } = useRenderInline()
const { navigateTo } = useRefNavigation()

function navigateNum() {
  const { route, anchor: a } = resolveRef(activeKeyword.value.num)
  if (route && a) { close(); navigateTo({ route, anchor: a }) }
}

// The popover root has @click.stop (so a click inside doesn't reach App.vue's global handler
// and self-close), so we resolve in-popover clicks here — mirroring App.vue's onGlobalClick:
// cross-refs navigate; a gloss or nested keyword re-anchors and replaces the popover content.
function handleBodyClick(e) {
  const refEl = e.target.closest('.cross-ref')
  if (refEl) {
    const { route, anchor: a } = resolveRef(refEl.dataset.ref)
    if (route && a) { close(); navigateTo({ route, anchor: a }) }
    return
  }
  const glossEl = e.target.closest('.gloss')
  if (glossEl) {
    openGloss(glossEl.dataset.gloss, glossEl.getBoundingClientRect())
    return
  }
  const kwEl = e.target.closest('.keyword')
  if (kwEl) {
    open(kwEl.textContent.replace(/^\[|\]$/g, '').trim(), kwEl.getBoundingClientRect())
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

.kw-heading {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 0.2rem;
  min-width: 0;
}

.kw-name {
  font-size: 0.8rem;
}

.kw-name-ru {
  font-size: 0.72rem;
  color: rgba(255, 255, 255, 0.55);
}

.gloss-name {
  font-size: 0.9rem;
  font-weight: 600;
  color: #e8c96a;
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

.kw-close-push {
  margin-left: auto;
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

.kw-popover-body :deep(ul),
.kw-popover-body :deep(ol) {
  margin: 0.4rem 0 0;
  padding-left: 1.2rem;
}

.kw-popover-body :deep(li) {
  margin-bottom: 0.2rem;
}

.kw-popover-body :deep(.keyword) {
  color: #e8c96a;
  background: rgba(232, 201, 106, 0.12);
  border-color: rgba(232, 201, 106, 0.4);
}

/* Glosses inside the (always-dark) popover: the page's .gloss:hover uses --link-accent-hover,
   which is dark red in light theme → dark-on-dark here. Pin to the popover's gold accent so
   it stays readable in both themes (inline page glosses keep their theme-aware colours). */
.kw-popover-body :deep(.gloss) {
  text-decoration-color: #e8c96a;
}
.kw-popover-body :deep(.gloss:hover) {
  color: #e8c96a;
  text-decoration-color: #e8c96a;
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
