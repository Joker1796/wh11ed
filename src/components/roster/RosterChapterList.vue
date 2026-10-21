<template>
  <!-- The rows of the Chapter picker — "not stated" first, then the faction's Chapters. One list for
       the phone's tile (AdaptivePicker) and the desk's settings line (PickerDropdown). -->
  <div class="modal-list rcl">
    <button
      v-for="c in ['', ...chapters]"
      :key="c"
      type="button"
      class="rcl-opt"
      :class="{ on: chapter === c }"
      @click="$emit('pick', c)"
    >
      {{ c || labels.rosterChapterNone }}
    </button>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { ui } from '../../i18n/ui.js'
import { useLocale } from '../../composables/useLocale.js'

defineProps({
  chapters: { type: Array, default: () => [] },
  // The declared Chapter, '' for none.
  chapter: { type: String, default: '' },
})
defineEmits(['pick'])

const { locale } = useLocale()
const labels = computed(() => ui[locale.value])
</script>

<style scoped>
.rcl { gap: 0.25rem; }
.rcl-opt {
  display: flex;
  align-items: center;
  min-height: 36px;
  padding: 0.2rem 0.6rem;
  font-size: 0.9rem;
  color: var(--text-primary);
  text-align: left;
  background: var(--bg-secondary);
  border: 1px solid var(--border);
  cursor: pointer;
}
.rcl-opt.on { border-color: var(--accent); background: color-mix(in srgb, var(--accent) 16%, transparent); }
@media (hover: hover) { .rcl-opt:hover { border-color: var(--accent); } }
</style>
