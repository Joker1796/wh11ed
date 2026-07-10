<template>
  <FactionLayout>
    <section class="fsection" id="army-rule">
      <h2 class="fsection-title">{{ labels.factionArmyRule }}</h2>
      <p v-if="faction.armyRule.flavor" class="faction-flavor">{{ faction.armyRule.flavor }}</p>
      <RuleBlock
        :id="faction.armyRule.id"
        :title="faction.armyRule.name"
        :body="faction.armyRule.body"
        :example="faction.armyRule.example"
      />
    </section>
  </FactionLayout>
</template>

<script setup>
import { computed } from 'vue'
import FactionLayout from '../../components/FactionLayout.vue'
import RuleBlock from '../../components/RuleBlock.vue'
import { useFactionPage } from '../../composables/useFactionPage.js'
import { ui } from '../../i18n/ui.js'
import { useLocale } from '../../composables/useLocale.js'

const { faction } = useFactionPage()
const { locale } = useLocale()
const labels = computed(() => ui[locale.value])
</script>

<style scoped>
.fsection {
  margin-bottom: 2.5rem;
  scroll-margin-top: var(--header-total);
}

.fsection-title {
  font-family: var(--font-display);
  font-size: 2rem;
  font-weight: 400;
  color: var(--text-primary);
  margin-bottom: 0.8rem;
}

.faction-flavor {
  font-style: italic;
  color: var(--text-muted);
  font-size: 0.9rem;
  line-height: 1.5;
  margin-bottom: 0.75rem;
}

@media (max-width: 640px) {
  .fsection-title { font-size: 1.6rem; }
}
</style>
