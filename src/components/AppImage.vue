<template>
  <picture>
    <source media="(max-width: 640px)" :srcset="sm" />
    <img v-bind="$attrs" :src="full" :alt="alt" :width="dims?.[0]" :height="dims?.[1]" loading="lazy" decoding="async" />
  </picture>
</template>

<script setup>
import { computed } from 'vue'
import imageDims from '../data/imageDimensions.js'

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

// Intrinsic [width, height] so the browser reserves space before the image loads
// (prevents layout shift that would throw off anchor-scroll). Absent → no attrs set.
const dims = computed(() => imageDims[full.value])
</script>

<style scoped>
/* Layout-transparent wrapper: the <img> stays the float/flex child of the parent. */
picture {
  display: contents;
}

/* With intrinsic width/height attributes set, height:auto lets the image scale to the
   parent's width while preserving aspect ratio — so the reserved space matches the
   rendered size and the layout doesn't shift as the image loads. */
img {
  height: auto;
}
</style>
