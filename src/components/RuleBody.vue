<template>
  <div class="rule-body" v-html="rendered"></div>
</template>

<script setup>
import { computed } from 'vue'
import { useRenderInline } from '../composables/useRenderInline.js'

const props = defineProps({
  body: { type: String, default: '' },
})

const { renderInline } = useRenderInline()

const rendered = computed(() => parse(props.body || '', renderInline))

function parse(body, renderInline) {
  const lines = body.split('\n')
  const parts = []
  let inUl = false
  let lastLiIndex = -1

  function closeUl() {
    if (inUl) {
      parts.push('</ul>')
      inUl = false
      lastLiIndex = -1
    }
  }

  for (const raw of lines) {
    const line = raw.trim()
    if (!line) {
      closeUl()
      continue
    }

    if (line.startsWith('▪')) {
      if (!inUl) {
        parts.push('<ul>')
        inUl = true
      }
      const content = renderInline(line.slice(1).trim())
      parts.push(`<li>${content}</li>`)
      lastLiIndex = parts.length - 1
      continue
    }

    if (line.startsWith('▫')) {
      const content = renderInline(line.slice(1).trim())
      if (inUl && lastLiIndex >= 0) {
        const li = parts[lastLiIndex]
        if (li.endsWith('</ul></li>')) {
          parts[lastLiIndex] =
            li.slice(0, -'</ul></li>'.length) + `<li>${content}</li></ul></li>`
        } else if (li.endsWith('</li>')) {
          parts[lastLiIndex] =
            li.slice(0, -'</li>'.length) + `<ul class="sub"><li>${content}</li></ul></li>`
        }
      } else {
        parts.push(`<ul class="sub"><li>${content}</li></ul>`)
      }
      continue
    }

    closeUl()
    parts.push(`<p>${renderInline(line)}</p>`)
  }

  closeUl()
  return parts.join('')
}
</script>

<style scoped>
.rule-body :deep(p) {
  margin: 0.5rem 0;
}

.rule-body :deep(p:first-child) {
  margin-top: 0;
}

.rule-body :deep(p:last-child) {
  margin-bottom: 0;
}

.rule-body :deep(ul) {
  margin: 0.4rem 0;
  padding-left: 1.25rem;
}

.rule-body :deep(ul:first-child) {
  margin-top: 0;
}

.rule-body :deep(ul:last-child) {
  margin-bottom: 0;
}

.rule-body :deep(ul.sub) {
  margin: 0.2rem 0 0.2rem 0;
  padding-left: 1rem;
  list-style: circle;
}

.rule-body :deep(li) {
  margin: 0.2rem 0;
}
</style>
