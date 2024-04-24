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
</template>
