<template>
  <FactionLayout>
    <!-- The faction's three pages (rules, units, FAQ) are children of this route: the hero and its
         tabs stay where they are and only what is under them fades over (a sideways slide by the
         tabs' order until 2026-09-29 — the owner found it jerky). Before 2026-09-28 each page was a route of its own that drew the hero again,
         so a tab switch slid the whole page, hero and tabs included, out and back in. -->
    <RouterView v-slot="{ Component }">
      <Transition
        name="fade"
        mode="out-in"
        @before-leave="pageLeaving"
        @enter="pageArrived"
      >
        <component
          :is="Component"
          :key="tabKey"
        />
      </Transition>
    </RouterView>
  </FactionLayout>
</template>

<script setup>
import { computed } from 'vue'
import { useRoute } from 'vue-router'
import FactionLayout from '../../components/FactionLayout.vue'
import { stripLocale } from '../../router/locale.js'
import { pageLeaving, pageArrived } from '../../composables/usePageMotion.js'

const route = useRoute()
// One page per tab; the locale prefix is not a different page.
const tabKey = computed(() => stripLocale(route.path))
</script>
