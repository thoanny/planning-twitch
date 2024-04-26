<script setup>
const isOpen = ref(false);
</script>

<template>
  <a
    href="#!"
    @click.prevent="isOpen = true"
    class="text-sm font-semibold text-primary hover:text-primary-800 inline-flex items-center gap-1"
  >
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 16 16"
      fill="currentColor"
      class="w-4 h-4"
    >
      <path
        fill-rule="evenodd"
        d="M15 8A7 7 0 1 1 1 8a7 7 0 0 1 14 0ZM9 5a1 1 0 1 1-2 0 1 1 0 0 1 2 0ZM6.75 8a.75.75 0 0 0 0 1.5h.75v1.75a.75.75 0 0 0 1.5 0v-2.5A.75.75 0 0 0 8.25 8h-1.5Z"
        clip-rule="evenodd"
      />
    </svg>
    Crédits
  </a>

  <UModal v-model="isOpen">
    <UCard>
      <div class="links-underline">
        Réalisé par
        <a href="https://thoanny.fr" target="_blank">Thoanny</a>
        avec&nbsp;:

        <ul class="list-disc ml-6 mt-2">
          <li>
            <a href="https://nuxt.com" target="_blank">Vue.js</a> (framework)
          </li>
          <li>
            <a href="https://nuxt.com" target="_blank">Nuxt</a> (framework)
          </li>
          <li>
            <a href="https://pinia.vuejs.org" target="_blank">Pinia</a>
            (library)
          </li>
          <li>
            <a
              href="https://github.com/1904labs/dom-to-image-more"
              target="_blank"
              >dom-to-image</a
            >
            (library)
          </li>
          <li>
            <a
              href="https://developer.mozilla.org/en-US/docs/Web/API/Window/localStorage"
              target="_blank"
              >localStorage</a
            >
            (api)
          </li>
          <li>
            <a href="https://ui.nuxt.com" target="_blank">Nuxt UI</a> (library)
          </li>
          <li>
            <a href="https://tailwindcss.com" target="_blank">TailwindCSS</a>
            (framework)
          </li>
          <li>
            <a href="https://heroicons.com" target="_blank">Heroicons</a>
            (ressource)
          </li>
          <li>
            <a href="https://heropatterns.com" target="_blank">Hero Patterns</a>
            (ressource)
          </li>
        </ul>
      </div>
    </UCard>
  </UModal>
</template>

<style scoped>
.links-underline a {
  @apply underline underline-offset-2 font-semibold;
}
</style>
