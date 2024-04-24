<script setup>
import days from "~/data/days.json";
const eventsStore = useEventsStore();
const { editedEvent: edit, modalOpen } = storeToRefs(eventsStore);
</script>

<template>
  <div class="space-y-3">
    <!-- Ajouter un événement -->
    <UButton
      size="sm"
      color="primary"
      icon="i-heroicons-calendar-days"
      variant="solid"
      label="Ajouter un événement"
      :trailing="false"
      @click="eventsStore.handleEditEvent()"
    />

    <!-- Formulaire -->

    <UModal v-model="modalOpen">
      <UCard
        :ui="{
          ring: '',
          divide: 'divide-y divide-gray-100 dark:divide-gray-800',
        }"
        @submit.prevent="eventsStore.handleSaveEvent()"
      >
        <div class="space-y-3">
          <UFormGroup label="Intitulé" required>
            <UInput v-model="edit.event.title" required />
          </UFormGroup>
          <UFormGroup label="Image">
            <UInput type="url" v-model="edit.event.image" />
          </UFormGroup>
          <div class="flex w-full gap-4">
            <UFormGroup label="Jour" class="w-full" v-if="edit.type === 'new'">
              <USelectMenu v-model="edit.day" :options="days" />
            </UFormGroup>
            <UFormGroup label="Début" class="w-full">
              <UInput type="time" v-model="edit.event.start" />
            </UFormGroup>
            <UFormGroup label="Fin" class="w-full">
              <UInput type="time" v-model="edit.event.end" />
            </UFormGroup>
          </div>
        </div>

        <template #footer>
          <UButton
            icon="i-heroicons-check"
            size="sm"
            variant="solid"
            label="Enregistrer"
            :trailing="false"
            type="submit"
          />
        </template>
      </UCard>
    </UModal>

    <!-- Liste des événements -->

    <div v-for="day in days" :key="day.id">
      <h4>{{ day.label }}</h4>
      <div
        v-if="eventsStore.findByDay(day.id).length"
        class="flex flex-col space-y-2"
      >
        <UButtonGroup
          size="sm"
          orientation="horizontal"
          v-for="event in eventsStore.findByDay(day.id)"
          :key="event.uid"
        >
          <UButton
            icon="i-heroicons-pencil-square"
            :label="event.title"
            color="white"
            class="flex-1"
            @click="eventsStore.handleEditEvent(event.uid)"
          />
          <UButton
            icon="i-heroicons-trash"
            color="red"
            @click="eventsStore.handleDeleteEvent(event.uid)"
          />
        </UButtonGroup>
      </div>
    </div>
  </div>
</template>
