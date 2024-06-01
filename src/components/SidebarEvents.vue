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
import OverlayPanel from 'primevue/overlaypanel';
import InputSwitch from 'primevue/inputswitch';
import SplitButton from 'primevue/splitbutton';

import days from '@/data/days.json';

const eventsStore = useEventsStore();
const { data: events, showTemplates } = storeToRefs(eventsStore);

const currentEvent = ref({ ...eventsStore.defaultEvent });

const resetEvent = () => {
  currentEvent.value = { ...eventsStore.defaultEvent };
  formType.value = null;
  visible.value = false;
};

const visible = ref(false);
const formType = ref();
const op = ref();

const toggle = (event) => {
  op.value.toggle(event);
};

const menu = ref();
const items = ref([
  {
    label: 'Dupliquer',
    icon: 'pi pi-clone',
    command: () => {
      const uid = currentEvent.value.uid;
      resetEvent();
      eventsStore.onDuplicateEvent(uid);
    },
  },
  {
    separator: true,
  },
  {
    label: 'Supprimer',
    icon: 'pi pi-trash',
    command: () => {
      const uid = currentEvent.value.uid;
      resetEvent();
      eventsStore.onDeleteEvent(uid);
    },
  },
]);

const saveEvent = () => {
  if (!currentEvent.value.title) return;
  eventsStore.onSaveEvent(currentEvent.value);
  resetEvent();
};

const showModal = (type) => {
  formType.value = type;
  visible.value = true;
};

const editEvent = (uid) => {
  currentEvent.value = {
    ...events.value.find((event) => event.uid === uid),
  };
  showModal('edit');
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
        data-step="1"
      />
      <div class="flex gap-2 items-center" data-step="2">
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
        <div class="flex flex-col gap-2 mb-4 required">
          <label for="title" class="font-semibold">Intitulé de l'événement</label>
          <InputText
            id="title"
            class="w-full"
            autocomplete="off"
            v-model="currentEvent.title"
            :autofocus="formType === 'add'"
          />
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
        <div class="flex justify-end items-center gap-2">
          <Button type="button" label="Annuler" severity="secondary" @click="resetEvent"></Button>
          <SplitButton
            :label="formType === 'add' ? 'Ajouter' : 'Enregistrer'"
            :buttonProps="{ type: 'submit' }"
            :model="items"
          />
        </div>
      </form>
    </Dialog>

    <draggable v-model="events" item-key="uid" class="mt-4 space-y-2" data-step="3">
      <template #item="{ element: event }">
        <Card
          class="border shadow-none"
          :pt="{ body: { class: 'p-3 gap-2' } }"
          @click="editEvent(event.uid)"
          v-show="showTemplates || (!showTemplates && event.day.code !== 'template')"
        >
          <template #content>
            <div class="flex justify-between items-center gap-2">
              <div class="font-bold">{{ event.title }}</div>
              <div class="flex gap-2 items-center">
                <Tag
                  :value="event.day.name"
                  :severity="event.day.code === 'template' ? 'secondary' : 'success'"
                ></Tag>
              </div>
            </div>
          </template>
        </Card>
      </template>
    </draggable>
  </div>
</template>

<style scoped>
.sortable-ghost {
  background: var(--highlight-bg);
  border-color: var(--primary-color);
}
</style>
