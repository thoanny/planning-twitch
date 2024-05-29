<script setup>
import { ref } from 'vue';
import { storeToRefs } from 'pinia';
import { useDragAndDrop } from '@formkit/drag-and-drop/vue';
import { useEventsStore } from '@/stores/events.js';

import Button from 'primevue/button';
import Dialog from 'primevue/dialog';
import InputText from 'primevue/inputtext';
import Dropdown from 'primevue/dropdown';
import Card from 'primevue/card';
import Tag from 'primevue/tag';
import ContextMenu from 'primevue/contextmenu';

import days from '@/data/days.json';

const eventsStore = useEventsStore();
const { data: events } = storeToRefs(eventsStore);

const currentEvent = ref({ ...eventsStore.defaultEvent });

const resetEvent = () => {
  currentEvent.value = { ...eventsStore.defaultEvent };
  visible.value = false;
  visibleEdit.value = false;
};

const visible = ref(false);
const visibleEdit = ref(false);
const selectedEventUid = ref();

// TODO : ajouter un plugin pour qu'au drag end, les événements soient modifiés dans le store
const [parent, eventsList] = useDragAndDrop(events.value);

const menu = ref();
const items = ref([
  {
    label: 'Modifier',
    icon: 'pi pi-file-edit',
    command: () => {
      console.log('edit event', selectedEventUid.value);
      currentEvent.value = {
        ...events.value.find((event) => event.uid === selectedEventUid.value),
      };
      visibleEdit.value = true;
    },
  },
  {
    label: 'Dupliquer',
    icon: 'pi pi-copy',
    command: () => {
      console.log('copy event', selectedEventUid.value);
      eventsStore.onDuplicateEvent(selectedEventUid.value);
    },
  },
  { separator: true },
  {
    label: 'Supprimer',
    icon: 'pi pi-trash',
    command: () => {
      console.log('delete event', selectedEventUid.value);
      eventsStore.onDeleteEvent(selectedEventUid.value);
    },
  },
]);

const onEventRightClick = (event, uid) => {
  selectedEventUid.value = uid;
  menu.value.show(event);
};

const addEvent = () => {
  if (!currentEvent.value.title) return;
  eventsStore.onAddEvent(currentEvent.value);
  resetEvent();
};

const editEvent = () => {
  if (!currentEvent.value.title) return;
  eventsStore.onEditEvent(currentEvent.value);
  resetEvent();
};
</script>

<template>
  <div>
    <Button label="Ajouter un événement" icon="pi pi-calendar-plus" @click="visible = true" />

    <!-- Ajouter un événement -->
    <Dialog
      v-model:visible="visible"
      modal
      header="Ajouter un événement"
      :style="{ width: '35rem' }"
    >
      <form @submit.prevent="addEvent">
        <!-- <span class="p-text-secondary block mb-5">Update your information.</span> -->
        <div class="flex flex-col gap-2 mb-4 required">
          <label for="title" class="font-semibold">Titre</label>
          <InputText id="title" class="w-full" autocomplete="off" v-model="currentEvent.title" />
        </div>
        <div class="flex flex-col gap-2 mb-4">
          <label for="image" class="font-semibold">Image</label>
          <InputText id="image" class="w-full" autocomplete="off" v-model="currentEvent.image" />
        </div>
        <div class="grid grid-cols-3 gap-4 mb-4">
          <div class="flex flex-col gap-3 w-full">
            <label for="email" class="font-semibold">Jour</label>
            <Dropdown
              v-model="currentEvent.day"
              :options="days"
              optionLabel="name"
              placeholder="Modèle"
              class="w-full"
            />
          </div>
          <div class="flex flex-col gap-3 w-full">
            <label for="email" class="font-semibold">Début</label>
            <InputText v-model="currentEvent.start" type="time" class="w-full" />
          </div>
          <div class="flex flex-col gap-3 w-full">
            <label for="email" class="font-semibold">Fin</label>
            <InputText v-model="currentEvent.end" type="time" class="w-full" />
          </div>
        </div>
        <div class="flex justify-end gap-2">
          <Button type="button" label="Annuler" severity="secondary" @click="resetEvent"></Button>
          <Button type="submit" label="Ajouter"></Button>
        </div>
      </form>
    </Dialog>

    <!-- Ajouter un événement -->
    <Dialog
      v-model:visible="visibleEdit"
      modal
      header="Modifier un événement"
      :style="{ width: '35rem' }"
    >
      <form @submit.prevent="editEvent">
        <div class="flex flex-col gap-2 mb-4 required">
          <label for="title" class="font-semibold">Titre</label>
          <InputText id="title" class="w-full" autocomplete="off" v-model="currentEvent.title" />
        </div>
        <div class="flex flex-col gap-2 mb-4">
          <label for="image" class="font-semibold">Image</label>
          <InputText id="image" class="w-full" autocomplete="off" v-model="currentEvent.image" />
        </div>
        <div class="grid grid-cols-3 gap-4 mb-4">
          <div class="flex flex-col gap-3 w-full">
            <label for="email" class="font-semibold">Jour</label>
            <Dropdown
              v-model="currentEvent.day"
              :options="days"
              optionLabel="name"
              placeholder="Modèle"
              class="w-full"
            />
          </div>
          <div class="flex flex-col gap-3 w-full">
            <label for="email" class="font-semibold">Début</label>
            <InputText v-model="currentEvent.start" type="time" class="w-full" />
          </div>
          <div class="flex flex-col gap-3 w-full">
            <label for="email" class="font-semibold">Fin</label>
            <InputText v-model="currentEvent.end" type="time" class="w-full" />
          </div>
        </div>
        <div class="flex justify-end gap-2">
          <Button type="button" label="Annuler" severity="secondary" @click="resetEvent"></Button>
          <Button type="submit" label="Enregistrer"></Button>
        </div>
      </form>
    </Dialog>

    <div class="mt-4 space-y-2" ref="parent">
      <Card
        class="border shadow-none"
        :pt="{ body: { class: 'p-3 gap-2' } }"
        v-for="event in eventsList"
        :key="event.uid"
        @contextmenu="onEventRightClick($event, event.uid)"
      >
        <template #content>
          <div class="flex justify-between items-center gap-2">
            <div class="font-bold">{{ event.title }}</div>
            <Tag
              :value="event.day.name"
              :severity="event.day.code === 'template' ? 'secondary' : 'success'"
            ></Tag>
          </div>
        </template>
      </Card>
    </div>
    <ContextMenu ref="menu" :model="items" />
  </div>
</template>
