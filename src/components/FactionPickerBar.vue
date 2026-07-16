<template>
  <!-- Global army-choice bar shared by the faction rule and datasheets pages: the
       Chapter picker (factions with `chapters`, i.e. Space Marines) and the
       Detachment picker. Sticks right under the navbar (the subnav is hidden on
       faction pages) so you can switch while reading further down. Background +
       border-bottom mirror App.vue's .subnav treatment. Bled to full viewport
       width (negative-margin trick) rather than being capped by .main-content's
       max-width/padding; the inner wrapper re-applies .main-content's padding
       tiers so the visible controls line up with the rest of the page. -->
  <div class="fpb">
    <div class="fpb-inner">
      <button
        v-if="chapters.length"
        type="button"
        class="fpb-trigger"
        :aria-label="labels.dsChapterFilter"
        @click="showChapterPicker = true"
      >
        <span class="fpb-trigger-main">
          <span class="fpb-trigger-label">{{ labels.dsChapterFilter }}</span>
          <span class="fpb-trigger-name">{{ chapter || labels.dsChapterAll }}</span>
        </span>
        <i class="bi bi-chevron-right fpb-trigger-chev"></i>
      </button>

      <button
        v-if="detachments.length > 1"
        type="button"
        class="fpb-trigger"
        :aria-label="labels.factionDetachments"
        @click="showDetPicker = true"
      >
        <span class="fpb-trigger-main">
          <span class="fpb-trigger-label">{{ labels.factionDetachments }}</span>
          <span class="fpb-trigger-name">{{ activeDet?.name }}</span>
        </span>
        <i class="bi bi-chevron-right fpb-trigger-chev"></i>
      </button>
    </div>

    <FactionDetachmentPickerModal
      v-if="showChapterPicker"
      :title="labels.dsChapterFilter"
      :detachments="chapterOptions"
      :active-id="chapter || 'all'"
      @pick="(id) => { pickChapter(id); showChapterPicker = false }"
      @close="showChapterPicker = false"
    />
    <FactionDetachmentPickerModal
      v-if="showDetPicker"
      :detachments="detachmentOptions"
      :active-id="activeDet?.id"
      @pick="(id) => { pickDetachment(detachments.find((d) => d.id === id)); showDetPicker = false }"
      @close="showDetPicker = false"
    />
  </div>
</template>

<script setup>
import { computed, ref } from 'vue'
import FactionDetachmentPickerModal from './FactionDetachmentPickerModal.vue'
import { ui } from '../i18n/ui.js'
import { useLocale } from '../composables/useLocale.js'
import { useFactionChoice } from '../composables/useFactionChoice.js'

const props = defineProps({
  slug: { type: String, required: true },
  detachments: { type: Array, default: () => [] },
  chapters: { type: Array, default: () => [] },
})

const { locale } = useLocale()
const labels = computed(() => ui[locale.value])
const { setDetachment, setChapter, activeDetachment, activeChapter } = useFactionChoice()

const showChapterPicker = ref(false)
const showDetPicker = ref(false)

const chapter = computed(() => activeChapter(props.slug, props.chapters))
const activeDet = computed(() => activeDetachment(props.slug, props.detachments))

// With a chapter chosen, detachments locked to other chapters are hidden — same
// treatment as the datasheet list (an army of chapter X can't use them at all).
const visibleDetachments = computed(() => {
  const c = chapter.value
  if (!c) return props.detachments
  return props.detachments.filter((d) => !d.chapter || d.chapter === c)
})

// Chapter names are keywords — they stay English in both locales.
const chapterOptions = computed(() => [
  { id: 'all', name: labels.value.dsChapterAll },
  ...props.chapters.map((c) => ({ id: c, name: c })),
])

// Modal items: the chapter lock rides in the quiet corner tag (shown while no
// chapter is chosen — once one is, foreign locked detachments are filtered out).
const detachmentOptions = computed(() =>
  visibleDetachments.value.map((d) => ({
    ...d,
    tag: !chapter.value ? d.chapter : undefined,
  })),
)

// Picking a chapter-locked detachment implies its chapter; picking a chapter that
// contradicts the active detachment's lock falls back to the first open detachment.
function pickDetachment(d) {
  if (!d) return
  setDetachment(props.slug, d.id)
  if (d.chapter) setChapter(props.slug, d.chapter)
}

function pickChapter(id) {
  const c = id === 'all' ? null : id
  setChapter(props.slug, c)
  const det = activeDet.value
  if (c && det?.chapter && det.chapter !== c) {
    const open = props.detachments.find((d) => !d.chapter)
    if (open) setDetachment(props.slug, open.id)
  }
}
</script>

<style scoped>
.fpb {
  position: sticky;
  top: calc(var(--navbar-height) + var(--safe-top));
  z-index: 150;
  width: 100vw;
  margin-left: calc(50% - 50vw);
  background: var(--bg-secondary);
  border-bottom: 1px solid var(--border);
}

/* Both pickers are compact "label + current value + chevron" pill buttons on every
   viewport — no separate eyebrow line, so the pinned bar stays low. Side by side on
   wide screens, stacked on narrow. */
.fpb-inner {
  max-width: 860px;
  margin: 0 auto;
  padding: 0.35rem 2rem;
  display: flex;
  gap: 0.5rem;
}

@media (max-width: 900px) {
  .fpb-inner {
    padding: 0.35rem calc(1rem + var(--safe-right)) 0.35rem calc(1rem + var(--safe-left));
  }
}

@media (max-width: 480px) {
  .fpb-inner {
    padding: 0.35rem calc(0.5rem + var(--safe-right)) 0.35rem calc(0.5rem + var(--safe-left));
  }
}

/* Trigger — a compact pill that opens the picker modal. The label rides inside it as a
   quiet dim prefix (no eyebrow line above), keeping the whole bar to a single row height. */
.fpb-trigger {
  flex: 1;
  min-width: 0;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 0.5rem;
  min-height: 34px;
  padding: 0.3rem 0.65rem;
  border: 1px solid var(--border);
  border-radius: 6px;
  background: var(--bg-secondary);
  color: var(--text-primary);
  cursor: pointer;
  font-size: 0.88rem;
  font-weight: 600;
  transition: border-color var(--motion-fast);
}

.fpb-trigger:hover {
  border-color: var(--accent);
}

.fpb-trigger-main {
  display: flex;
  align-items: baseline;
  gap: 0.45rem;
  min-width: 0;
}

.fpb-trigger-label {
  flex-shrink: 0;
  font-size: 0.58rem;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.5px;
  color: var(--text-dim);
}

.fpb-trigger-name {
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.fpb-trigger-chev {
  flex-shrink: 0;
  color: var(--text-dim);
}

/* Narrow phones: two triggers side by side would cramp long detachment names, so stack
   them instead (still just two thin rows, ~half the old eyebrow+44px-button height). */
@media (max-width: 640px) {
  .fpb-inner {
    flex-direction: column;
    gap: 0.25rem;
  }
}
</style>
