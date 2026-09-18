<template>
  <footer class="app-footer">
    <div class="footer-cols">
      <div class="footer-col">
        <p class="footer-col-label">
          {{ t.footer.contactLabel }}
        </p>
        <p class="footer-contact">
          <a :href="'mailto:' + contactEmail">{{ contactEmail }}</a>
        </p>
        <!-- The other ways in, as one wrapped row rather than a column of underlined links: on a
             phone five red lines under "contact the author" read as a link dump, and only the
             first of them is a contact. Order: the two channels that can answer (the form, the
             VK group — the one place a bug report gets a reply), then support, then the legal
             page, quietest. -->
        <p class="footer-links">
          <button
            type="button"
            class="footer-feedback"
            @click="openFeedback"
          >
            {{ fbLabel }}
          </button>
          <a
            class="footer-vk"
            :href="vkUrl"
            target="_blank"
            rel="noopener"
          ><VkIcon /> {{ t.footer.vkLink }}</a>
          <RouterLink to="/support">
            {{ t.footer.supportLink }}
          </RouterLink>
          <RouterLink
            to="/disclaimer"
            class="footer-quiet"
          >
            {{ t.footer.disclaimerLink }}
          </RouterLink>
        </p>
        <p class="footer-version">
          <RouterLink to="/changelog">
            {{ 'v' + version }}
          </RouterLink>
          <span class="footer-data-version">· {{ t.footer.dataVersionLabel }} {{ dataVersion }}</span>
        </p>
      </div>

      <!-- Mobile-only: acknowledgements + open-source are secondary info, collapsed by
           default so the footer doesn't dominate the screen. Desktop always shows them
           (forced open, toggle hidden — see the media queries below). -->
      <button
        class="footer-toggle"
        :aria-expanded="showDetails"
        @click="showDetails = !showDetails"
      >
        <i :class="showDetails ? 'bi bi-chevron-up' : 'bi bi-chevron-down'" />
        <span>{{ showDetails ? t.footer.detailsHide : t.footer.detailsShow }}</span>
      </button>

      <CollapseTransition
        class="footer-collapse"
        :show="showDetails"
      >
        <div class="footer-secondary">
          <div class="footer-col">
            <p class="footer-col-label">
              {{ t.footer.thanksLabel }}
            </p>
            <p
              v-for="th in t.footer.thanks"
              :key="th.label"
              class="footer-thanks"
            >
              {{ th.label }}<br><span class="footer-who">{{ th.who }}</span>
            </p>
          </div>
          <div class="footer-col">
            <p class="footer-col-label">
              {{ t.footer.openSourceLabel }}
            </p>
            <p class="footer-thanks">
              {{ t.footer.openSourceText }}
            </p>
            <p class="footer-contact">
              <a
                :href="repoUrl"
                target="_blank"
                rel="noopener"
              >{{ t.footer.repoLinkLabel }}</a>
            </p>
          </div>
        </div>
      </CollapseTransition>
    </div>
  </footer>
</template>

<script setup>
// Site-wide footer, rendered once at the bottom of every page by App.vue. Carries the
// user-facing acknowledgements + the Games Workshop IP disclaimer (the site's only legal
// notice — the READMEs have it too, but crawlers and visitors see the site, not the repo).
// Content is the bilingual landing.js `footer` object.
import { ref, computed } from 'vue'
import { landing } from '../data/landing.js'
import { ui } from '../i18n/ui.js'
import { useFeedbackModal } from '../composables/useFeedbackModal.js'
import { APP_DATA_VERSION } from '../data/appDataVersion.js'
import { useLocale } from '../composables/useLocale.js'
import CollapseTransition from './CollapseTransition.vue'
import VkIcon from './VkIcon.vue'

const { locale } = useLocale()
const t = computed(() => landing[locale.value])
// The bug-report entry: same dialog the ⚙ menu opens (module-singleton state).
const { openFeedback } = useFeedbackModal()
const fbLabel = computed(() => ui[locale.value].feedbackMenu)

const contactEmail = 'gorlovevgeni9617@gmail.com'
// The umbrella repo (not this one): explains how the frontend, API and glossary fit together.
const repoUrl = 'https://github.com/Joker1796/wh-rules.ru'
// The project's VK group — news, and the place to talk about a bug report.
const vkUrl = 'https://vk.ru/whrules'
const version = __APP_VERSION__
// The GW app data_version the rules were reconciled against (shown under the app version).
const dataVersion = APP_DATA_VERSION

// Mobile-only disclosure state; ignored on desktop (see the ≥901px override below).
const showDetails = ref(false)
</script>

<style scoped>
.app-footer {
  margin-top: 2.5rem;
  padding-top: 1.1rem;
  border-top: 1px solid var(--border);
  color: var(--text-muted);
  font-size: 0.84rem;
  line-height: 1.6;
}

.footer-cols {
  display: flex;
  flex-wrap: wrap;
  gap: 1rem 3rem;
}

.footer-col {
  flex: 1 1 220px;
  min-width: 0;
  display: flex;
  flex-direction: column;
}

.footer-col-label {
  margin: 0 0 0.3rem;
  font-weight: 600;
  color: var(--text-primary);
}

.footer-contact {
  margin: 0;
}

.footer-contact a {
  color: var(--accent);
  text-decoration: underline;
  text-underline-offset: 2px;
}

.footer-contact a:hover {
  color: var(--accent-hover);
}

/* The row of ways in: accent text, no underline (the email above keeps its underline — it is
   the one address to copy), wrapping onto a second line on a phone. */
.footer-links {
  display: flex;
  flex-wrap: wrap;
  gap: 0.15rem 1.1rem;
  margin: 0.35rem 0 0;
}
.footer-links a,
.footer-links .footer-feedback {
  color: var(--accent);
  text-decoration: none;
}
@media (hover: hover) {
  .footer-links a:hover,
  .footer-links .footer-feedback:hover { color: var(--accent-hover); text-decoration: underline; text-underline-offset: 2px; }
}
/* The legal page is the one nobody comes here for: muted, not accent. */
.footer-links .footer-quiet { color: var(--text-muted); }
/* The mark rides at text size beside its label. */
.footer-vk {
  display: inline-flex;
  align-items: center;
  gap: 0.35em;
}

.footer-thanks {
  margin: 0 0 0.4rem;
  color: var(--text-dim);
}

.footer-who {
  font-style: italic;
}

.footer-feedback {
  background: none;
  border: none;
  padding: 0;
  font: inherit;
  cursor: pointer;
}

.footer-version {
  /* pinned to the bottom of the contact column, level with the tallest column's last line */
  margin: auto 0 0;
  padding-top: 0.9rem;
  color: var(--text-dim);
  font-family: var(--font-mono);
  font-size: 0.75rem;
}

.footer-version a {
  color: inherit;
  text-decoration: underline;
  text-underline-offset: 2px;
}

.footer-version a:hover {
  color: var(--accent);
}

/* One line with the app version — two stacked mono lines was the tallest thing in the column. */
.footer-data-version {
  margin-left: 0.3rem;
  color: var(--text-muted);
  font-size: 0.68rem;
}

/* Desktop: three columns in a row, always fully shown — no toggle. */
.footer-toggle {
  display: none;
}

.footer-collapse {
  flex: 1 1 460px;
  min-width: 0;
}

.footer-secondary {
  display: flex;
  flex-wrap: wrap;
  gap: 1rem 3rem;
}

/* Mobile: acknowledgements + open-source are secondary, so collapse them behind a toggle
   and let only contact/legal/version show by default. */
@media (max-width: 900px) {
  .footer-toggle {
    display: flex;
    align-items: center;
    gap: 0.4rem;
    align-self: flex-start;
    margin: -0.4rem 0 0;
    padding: 0.5rem 0;
    background: none;
    border: none;
    color: var(--text-muted);
    font-family: inherit;
    font-size: 0.82rem;
    font-weight: 600;
    cursor: pointer;
  }

  .footer-toggle i {
    font-size: 0.7rem;
  }

  .footer-toggle:hover {
    color: var(--text-primary);
  }

  .footer-collapse {
    flex-basis: 100%;
  }
}

/* Desktop: ignore the collapsed JS state entirely, force the secondary columns open. */
@media (min-width: 901px) {
  .footer-collapse {
    grid-template-rows: 1fr !important;
  }

  .footer-collapse :deep(.collapse-clip) {
    opacity: 1 !important;
    visibility: visible !important;
  }
}
</style>
