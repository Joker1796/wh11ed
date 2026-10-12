// @ts-check
// `v-safe-html` — `v-html` through sanitizeHtml (src/utils/sanitizeHtml.js). Imported where used
// (`import { vSafeHtml } from '…/directives/safeHtml.js'` in a <script setup>), so a component test
// renders it without registering anything. `v-html` itself is off by lint (vue/no-v-html).
import { sanitizeHtml } from '../utils/sanitizeHtml.js'

/** @type {import('vue').Directive<HTMLElement, unknown>} */
export const vSafeHtml = {
  mounted(el, { value }) {
    el.innerHTML = sanitizeHtml(value)
  },
  updated(el, { value, oldValue }) {
    if (value !== oldValue) el.innerHTML = sanitizeHtml(value)
  },
}
