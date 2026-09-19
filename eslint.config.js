import js from '@eslint/js'
import pluginVue from 'eslint-plugin-vue'
import globals from 'globals'

// Why a linter in a repo whose style already holds by discipline: the discipline is held from
// two machines, and `eslint-plugin-vue` catches the class of mistake review keeps missing here —
// a `v-for` without `:key`, a function called from a template (so it re-runs on every render),
// an unreachable branch dressed up as a safety net, an import nobody uses any more.
//
// Deliberately NOT included: a formatter. Nothing here reformats existing code; every rule below
// either reports a real defect or reports nothing. `npm run lint` is a gate, not a rewriter.
export default [
  {
    // dist/ and dev-dist/ are build output; public/ ships third-party assets we do not own.
    ignores: ['dist/**', 'dev-dist/**', 'public/**'],
  },

  js.configs.recommended,
  ...pluginVue.configs['flat/recommended'],

  {
    // The SPA. jsdom-flavoured browser globals, plus the one constant vite's `define` injects
    // at build time (see vite.config.js / vitest.config.js) — without it `no-undef` flags the
    // footer and the export header.
    files: ['src/**/*.{js,vue}'],
    languageOptions: {
      ecmaVersion: 'latest',
      sourceType: 'module',
      globals: { ...globals.browser, __APP_VERSION__: 'readonly' },
    },
  },

  {
    // The generators and guardrails in scripts/ run under node, not in a browser.
    files: ['scripts/**/*.{js,mjs}', '*.config.js', '*.config.mjs'],
    languageOptions: {
      ecmaVersion: 'latest',
      sourceType: 'module',
      globals: { ...globals.node },
    },
  },

  {
    // Tests import describe/it/expect from 'vitest' explicitly (all 87 of them), so no test
    // globals are declared here on purpose — an accidental reliance on vitest's `globals: true`
    // should surface as `no-undef` rather than pass silently.
    files: ['src/**/*.test.js', 'scripts/**/*.test.js'],
    languageOptions: { globals: { ...globals.node } },
  },

  {
    rules: {
      // `const { lang: _dropped, ...query } = to.query` (router/index.js) is how you drop one
      // query param and keep the rest — the binding is meant to go unread. Same for an `_`-
      // prefixed name anywhere else: the underscore already says "declared, not used".
      'no-unused-vars': ['error', {
        ignoreRestSiblings: true,
        varsIgnorePattern: '^_',
        argsIgnorePattern: '^_',
        caughtErrorsIgnorePattern: '^_',
      }],

      // This app IS a rules renderer: every rule body is a data string with `**`-markup that
      // src/utils turns into HTML, and all 86 call sites feed it data from src/data — never
      // user input. The rule has nothing to warn about here.
      'vue/no-v-html': 'off',

      // An optional prop without a default is valid Vue 3; the call sites handle `undefined`
      // (`v-if`, `?.`, `|| fallback`). Requiring a default would mostly add noise like
      // `default: undefined`.
      'vue/require-default-prop': 'off',
    },
  },

  {
    // Route components render inside App.vue's `<Transition mode="out-in">`. A comment before the
    // root element makes the root a Fragment in dev (comments are kept there, stripped in prod) —
    // and a Fragment cannot be animated, so the leave never reports back and the next page never
    // mounts: a blank screen under the navbar after leaving that view (2026-09-19, the roster
    // wizard and editor). Views must have exactly one root node, comments included.
    files: ['src/views/**/*.vue'],
    rules: { 'vue/no-multiple-template-root': ['error', { disallowComments: true }] },
  },

  {
    // UpdateToast is headless on purpose: it registers the service worker and applies updates
    // silently, and its template is a comment explaining that. An empty root is the point, not
    // an oversight — and it still needs the `<template>` block, or Vue warns about a component
    // with neither template nor render function.
    files: ['src/components/UpdateToast.vue'],
    rules: { 'vue/valid-template-root': 'off' },
  },

  {
    // These two edit the object they are handed, on purpose: `entry` IS the row inside the saved
    // roster (useRoster's reactive store) and `settings` IS the tracker's settings object, so
    // `props.entry.size = i` and `v-model="settings[o.setting]"` write straight to the thing
    // being persisted. The rule is right in general and stays on everywhere else — only these
    // two opt out, and turning them into `defineModel`/emit is a refactor of the editor's data
    // flow, not a lint fix.
    files: ['src/components/roster/UnitEditorFields.vue', 'src/components/tracker/TrackOptions.vue'],
    rules: { 'vue/no-mutating-props': 'off' },
  },
]
