<script setup>
const tabs = [
  {
    id: "events",
    key: "events",
    label: "Évenements",
  },
  {
    id: "settings",
    key: "settings",
    label: "Paramètres",
  },
];
</script>

<template>
  <div class="space-y-4">
    <UTabs :items="tabs" class="w-full">
      <template #item="{ item }">
        <UCard>
          <!-- Events -->
          <div v-if="item.key === 'events'">
            <SidebarEvents />
          </div>
          <!-- Paramètres -->
          <div v-else-if="item.key === 'settings'">
            <SidebarSettings />
          </div>
        </UCard>
      </template>
    </UTabs>
    <div class="flex gap-4 justify-center items-center">
      <AppThanks />
      <AppCredits />
      <a href="https://github.com/thoanny/planning-twitch" target="_blank">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 16 16"
          fill="currentColor"
          class="w-4 h-4"
        >
          <path
            fill-rule="evenodd"
            d="M4.78 4.97a.75.75 0 0 1 0 1.06L2.81 8l1.97 1.97a.75.75 0 1 1-1.06 1.06l-2.5-2.5a.75.75 0 0 1 0-1.06l2.5-2.5a.75.75 0 0 1 1.06 0ZM11.22 4.97a.75.75 0 0 0 0 1.06L13.19 8l-1.97 1.97a.75.75 0 1 0 1.06 1.06l2.5-2.5a.75.75 0 0 0 0-1.06l-2.5-2.5a.75.75 0 0 0-1.06 0ZM8.856 2.008a.75.75 0 0 1 .636.848l-1.5 10.5a.75.75 0 0 1-1.484-.212l1.5-10.5a.75.75 0 0 1 .848-.636Z"
            clip-rule="evenodd"
          />
        </svg>
        Source
      </a>
    </div>
  </div>
</template>

<style scoped>
a {
  @apply text-primary hover:text-primary-600 text-sm font-semibold inline-flex gap-1 items-center;
}
</style>
