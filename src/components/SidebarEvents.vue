<script setup>
import { ref } from 'vue';
import { storeToRefs } from 'pinia';
import { useEventsStore } from '@/stores/events.js';
import draggable from 'vuedraggable';

import Button from 'primevue/button';
import Dialog from 'primevue/dialog';
import InputText from 'primevue/inputtext';
import Dropdown from 'primevue/dropdown';
import Card from 'primevue/card';
import Tag from 'primevue/tag';
import ContextMenu from 'primevue/contextmenu';
import OverlayPanel from 'primevue/overlaypanel';
import InputSwitch from 'primevue/inputswitch';

import days from '@/data/days.json';

const eventsStore = useEventsStore();
const { data: events, showTemplates } = storeToRefs(eventsStore);

const currentEvent = ref({ ...eventsStore.defaultEvent });

const resetEvent = () => {
  currentEvent.value = { ...eventsStore.defaultEvent };
  visible.value = false;
  visibleEdit.value = false;
};

const visible = ref(false);
const visibleEdit = ref(false);
const selectedEventUid = ref();
const formType = ref();
const op = ref();

const toggle = (event) => {
  op.value.toggle(event);
};

const menu = ref();
const items = ref([
  {
    label: 'Modifier',
    icon: 'pi pi-pencil',
    command: () => {
      currentEvent.value = {
        ...events.value.find((event) => event.uid === selectedEventUid.value),
      };
      showModal('edit');
    },
  },
  {
    label: 'Dupliquer',
    icon: 'pi pi-clone',
    command: () => {
      eventsStore.onDuplicateEvent(selectedEventUid.value);
    },
  },
  { separator: true },
  {
    label: 'Supprimer',
    icon: 'pi pi-trash',
    command: () => {
      eventsStore.onDeleteEvent(selectedEventUid.value);
    },
  },
]);

const onEventRightClick = (event, uid) => {
  selectedEventUid.value = uid;
  menu.value.show(event);
};

const saveEvent = () => {
  if (!currentEvent.value.title) return;
  eventsStore.onSaveEvent(currentEvent.value);
  resetEvent();
};

const showModal = (type) => {
  formType.value = type;
  visible.value = true;
};
</script>

<template>
  <div>
    <div class="flex items-center justify-between">
      <Button
        label="Ajouter un événement"
        icon="pi pi-plus"
        size="small"
        @click="showModal('add')"
      />
      <div class="flex gap-2 items-center">
        <span>Modèles</span>
        <InputSwitch v-model="showTemplates" />
      </div>
    </div>

    <!-- Ajouter/modifier un événement -->
    <Dialog
      v-model:visible="visible"
      modal
      :header="formType === 'add' ? 'Ajouter un événement' : 'Modifier l\'événement'"
      :style="{ width: '35rem' }"
      class="mx-4"
    >
      <form @submit.prevent="saveEvent">
        <!-- <span class="p-text-secondary block mb-5">Update your information.</span> -->
        <div class="flex flex-col gap-2 mb-4 required">
          <label for="title" class="font-semibold">Intitulé de l'événement</label>
          <InputText id="title" class="w-full" autocomplete="off" v-model="currentEvent.title" />
        </div>
        <div class="flex flex-col gap-2 mb-4">
          <label for="image" class="font-semibold">Adresse URL de l'image</label>
          <div class="flex gap-2">
            <InputText id="image" class="flex-1" autocomplete="off" v-model="currentEvent.image" />
            <Button type="button" icon="pi pi-image" rounded outlined @click="toggle" />
          </div>
          <OverlayPanel ref="op">
            <div class="max-w-xs">
              Vous pouvez héberger vos images sur des sites spécialisés et sans avoir besoin de
              créer un compte, comme
              <a href="https://postimages.org/" target="_blank" class="p-text-secondary"
                >postimages.org</a
              >.
            </div>
          </OverlayPanel>
        </div>
        <div class="grid grid-cols-3 gap-4 mb-4">
          <div class="flex flex-col gap-3 w-full">
            <label for="email" class="font-semibold"
              >Jour <span class="hidden md:inline">de l'événement</span></label
            >
            <Dropdown
              v-model="currentEvent.day"
              :options="days"
              optionLabel="name"
              placeholder="Modèle"
              class="w-full"
            />
          </div>
          <div class="flex flex-col gap-3 w-full">
            <label for="email" class="font-semibold">
              <span class="inline md:hidden">Début</span>
              <span class="hidden md:inline">Heure de début</span>
            </label>
            <InputText v-model="currentEvent.start" type="time" class="w-full" />
          </div>
          <div class="flex flex-col gap-3 w-full">
            <label for="email" class="font-semibold">
              <span class="inline md:hidden">Fin</span>
              <span class="hidden md:inline">Heure de fin</span>
            </label>
            <InputText v-model="currentEvent.end" type="time" class="w-full" />
          </div>
        </div>
        <div class="flex justify-end gap-2">
          <Button type="button" label="Annuler" severity="secondary" @click="resetEvent"></Button>
          <Button type="submit" :label="formType === 'add' ? 'Ajouter' : 'Enregistrer'"></Button>
        </div>
      </form>
    </Dialog>

    <draggable
      v-model="events"
      group="people"
      @start="drag = true"
      @end="drag = false"
      item-key="uid"
      class="mt-4 space-y-2"
      v-if="events.length > 0"
    >
      <template #item="{ element: event }">
        <Card
          class="border shadow-none"
          :pt="{ body: { class: 'p-3 gap-2' } }"
          @contextmenu="onEventRightClick($event, event.uid)"
          v-show="showTemplates || (!showTemplates && event.day.code !== 'template')"
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
      </template>
    </draggable>

    <ContextMenu ref="menu" :model="items" />
  </div>
</template>

<style scoped>
.sortable-ghost {
  background: var(--highlight-bg);
  border-color: var(--primary-color);
}
</style>
