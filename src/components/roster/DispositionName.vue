<template>
  <span class="dname"><img
    v-if="icon"
    :src="icon"
    alt=""
    class="dname-icon"
  ><slot>{{ name }}</slot></span>
</template>

<script setup>
// A Force Disposition by its card's symbol and its name (owner, 2026-11-06): the desk's settings
// line, its picker and the phone's form. The slot takes the name's own dress (a tone chip).
import { computed } from 'vue'
import { dispositionIcon } from '../../data/dispositions.js'

const props = defineProps({ name: { type: String, required: true } })
const icon = computed(() => dispositionIcon(props.name))
</script>

<style scoped>
.dname { display: inline-flex; align-items: center; gap: 0.35rem; }
.dname-icon { flex: none; width: 1.15rem; height: 1.15rem; object-fit: contain; }
</style>
