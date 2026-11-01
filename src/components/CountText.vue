<template>
  <span class="count-text"><template
    v-for="(x, i) in pieces"
    :key="i"
  ><b
    v-if="x.n"
    class="count-n"
  >{{ x.t }}</b><template v-else>{{ x.t }}</template></template></span>
</template>

<script setup>
// A sentence whose numbers change with the data: each number drawn apart (the face numbers wear,
// bold) and each noun after it in the form the number takes — «1 битва», «2 битвы», «5 битв».
// The markup is the label's: `{n}` a number, `{n:битва|битвы|битв}` its noun (utils/plural.js).
import { computed } from 'vue'
import { countPieces } from '../utils/plural.js'

const props = defineProps({
  text: { type: String, required: true },
  vals: { type: Object, required: true },
})
const pieces = computed(() => countPieces(props.text, props.vals))
</script>

<style scoped>
.count-n { font-family: var(--font-num); font-weight: 700; color: var(--text-primary); }
</style>
