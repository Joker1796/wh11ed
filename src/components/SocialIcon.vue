<template>
  <!-- A channel's mark as inline SVG, at text size beside its label: an <img> would be one more
       file to precache and one colour forever, and `currentColor` lets it take whatever the text
       around it wears (the footer's accent, a button's white). Decorative — the link's text is
       the label; `aria-hidden` keeps screen readers from reading a picture. The Telegram one is
       our own drawing (a paper plane in a disc), not the service's file. -->
  <svg
    class="social-icon"
    viewBox="0 0 24 24"
    width="1em"
    height="1em"
    aria-hidden="true"
    focusable="false"
  >
    <path
      v-if="name === 'vk'"
      fill="currentColor"
      d="M15.684 0H8.316C1.592 0 0 1.592 0 8.316v7.368C0 22.408 1.592 24 8.316 24h7.368C22.408 24 24 22.408 24 15.684V8.316C24 1.592 22.391 0 15.684 0zm3.692 17.123h-1.744c-.66 0-.864-.525-2.05-1.727-1.033-1-1.49-1.135-1.744-1.135-.356 0-.458.102-.458.593v1.575c0 .424-.135.678-1.253.678-1.846 0-3.896-1.118-5.335-3.202C4.624 10.857 4.03 8.57 4.03 8.096c0-.254.102-.491.593-.491h1.744c.44 0 .61.203.78.678.863 2.49 2.303 4.675 2.896 4.675.22 0 .322-.102.322-.66V9.721c-.068-1.186-.695-1.287-.695-1.71 0-.204.17-.407.44-.407h2.744c.373 0 .508.203.508.643v3.473c0 .372.17.508.271.508.22 0 .407-.136.813-.542 1.254-1.406 2.151-3.574 2.151-3.574.119-.254.322-.491.763-.491h1.744c.525 0 .644.27.525.643-.22 1.017-2.354 4.031-2.354 4.031-.186.305-.254.44 0 .78.186.254.795.779 1.203 1.253.745.847 1.32 1.558 1.473 2.05.17.49-.085.744-.576.744z"
    />
    <path
      v-else
      fill="currentColor"
      fill-rule="evenodd"
      d="M12 0a12 12 0 1 1 0 24a12 12 0 1 1 0-24zM5 11.6l12.6-4.9c.6-.2 1.1.1.9.9l-2.1 10c-.2.7-.6.8-1.1.5l-3.2-2.4l-1.6 1.5c-.2.2-.3.3-.6.3l.2-3.3l5.9-5.4c.3-.2-.1-.4-.4-.2l-7.3 4.6l-3.2-1c-.7-.2-.7-.7.1-1z"
    />
  </svg>
</template>

<script setup>
defineProps({
  // 'vk' | 'tg'
  name: { type: String, required: true },
})
</script>

<style scoped>
.social-icon {
  display: inline-block;
  vertical-align: -0.15em;
}
</style>
