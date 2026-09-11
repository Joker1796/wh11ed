<template>
  <h2 class="chapter-heading">{{ labels.eventPairingsHeading }}</h2>
  <p class="chapter-desc">{{ labels.eventPairingsDesc }}</p>

  <p class="lead">{{ pairings.intro }}</p>

  <template v-for="grp in chunks" :key="grp.key">
    <div v-if="grp.type === 'columns'" class="rule-columns">
      <template v-for="block in grp.items" :key="block.id">
        <div v-if="block.flavor" class="event-flavor">
          <RuleBlock
            :id="block.id"
            :title="block.title"
            :body="block.body"
            :note="block.note"
            :see-also="block.seeAlso"
          />
        </div>
        <RuleBlock
          v-else
          :id="block.id"
          :title="block.title"
          :body="block.body"
          :note="block.note"
          :see-also="block.seeAlso"
        />
      </template>
    </div>
    <template v-else>
      <div v-if="grp.item.flavor" class="event-flavor">
        <RuleBlock
          :id="grp.item.id"
          :title="grp.item.title"
          :body="grp.item.body"
          :note="grp.item.note"
          :see-also="grp.item.seeAlso"
        />
      </div>
      <RuleBlock
        v-else
        :id="grp.item.id"
        :title="grp.item.title"
        :body="grp.item.body"
        :note="grp.item.note"
        :see-also="grp.item.seeAlso"
      />
    </template>
  </template>
</template>

<script setup>
import { computed } from 'vue'
import RuleBlock from '../RuleBlock.vue'
import { getEventContent } from '../../data/eventCompanion.js'
import { ui } from '../../i18n/ui.js'
import { useLocale } from '../../composables/useLocale.js'
import { chunkBlocks } from '../../composables/blockColumnChunks.js'

const { locale } = useLocale()
const labels = computed(() => ui[locale.value])
const ec = computed(() => getEventContent(locale.value))
const pairings = computed(() => ec.value.pairings)
const chunks = computed(() => chunkBlocks(pairings.value.blocks))
</script>
