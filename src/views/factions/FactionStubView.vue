<template>
  <FactionStub :name="route.meta.name" :category="route.meta.category" />
</template>

<script setup>
import { useRoute } from 'vue-router'
import FactionStub from '../../components/FactionStub.vue'

const route = useRoute()
</script>
