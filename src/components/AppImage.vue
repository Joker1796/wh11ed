<template>
  <picture>
    <source media="(max-width: 640px)" :srcset="sm" />
    <img v-bind="$attrs" :src="full" :alt="alt" loading="lazy" decoding="async" />
  </picture>
</template>

<script setup>
import { computed } from 'vue'

// Illustrations are stored as WebP (see scripts/gen-webp.mjs); data still references
// the original `.jpg`/`.png` paths (and the runtime `-ru` suffix), so we map the
// extension here. `<img>` uses the full-size webp; the <source> serves an 800px copy
// on phones (<=640px). Icons render via plain <img>, not this component.
const props = defineProps({
  src: { type: String, required: true },
  alt: { type: String, default: '' },
})

defineOptions({ inheritAttrs: false }) // forward class/style/width to the inner <img>

const full = computed(() => props.src.replace(/\.(jpe?g|png|webp)$/i, '.webp'))
const sm = computed(() => props.src.replace(/\.(jpe?g|png|webp)$/i, '-sm.webp'))
</script>

<style scoped>
/* Layout-transparent wrapper: the <img> stays the float/flex child of the parent. */
picture {
  display: contents;
}
</style>
