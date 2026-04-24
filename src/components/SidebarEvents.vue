<script setup>
import MediaDropdown from '@/components/MediaDropdown.vue';
import MediaManager from '@/components/MediaManager.vue';
import MediaUploader from '@/components/MediaUploader.vue';
import days from '@/data/days.json';
import { useEventsStore } from '@/stores/events.js';
import { useMediasStore } from '@/stores/medias';
import { storeToRefs } from 'pinia';
import {
  Button,
  ContextMenu,
  Dialog,
  InputText,
  Select,
  SplitButton,
  Tag,
  ToggleSwitch,
} from 'primevue';
import { ref } from 'vue';
import draggable from 'vuedraggable';

const eventsStore = useEventsStore();
const { onSaveEvent, onDuplicateEvent, onDeleteEvent, defaultEvent } = eventsStore;
const { showTemplates, events } = storeToRefs(eventsStore);

const currentEvent = ref({ ...defaultEvent });

const resetEvent = () => {
  currentEvent.value = { ...defaultEvent };
  formType.value = null;
  visible.value = false;
};

const visible = ref(false);
const formType = ref();

const items = ref([
  {
    label: 'Dupliquer',
    icon: 'pi pi-clone',
    command: () => {
      onDuplicateEvent(currentEvent.value.id).then(() => resetEvent());
    },
  },
  {
    separator: true,
  },
  {
    label: 'Supprimer',
    icon: 'pi pi-trash',
    command: () => {
      onDeleteEvent(currentEvent.value.id).then(() => resetEvent());
    },
  },
]);

const saveEvent = async () => {
  if (!currentEvent.value.title) return;

  onSaveEvent(currentEvent.value).then(() => {
    resetEvent();
  });
};

const showModal = (type) => {
  formType.value = type;
  visible.value = true;
};

const editEvent = (eventId) => {
  currentEvent.value = {
    ...events.value.find((event) => event.id === eventId),
  };
  console.log(currentEvent.value);
  showModal('edit');
};

const mediasStore = useMediasStore();
const { medias } = storeToRefs(mediasStore);

const rightClickCurrent = ref();
const rightClickMenu = ref();
const rightClickItems = ref([
  {
    label: 'Modifier',
    icon: 'pi pi-pencil',
    command: () => {
      editEvent(rightClickCurrent.value);
      rightClickCurrent.value = null;
    },
  },
  {
    label: 'Dupliquer',
    icon: 'pi pi-clone',
    command: () => {
      onDuplicateEvent(rightClickCurrent.value).then(() => resetEvent());
      rightClickCurrent.value = null;
    },
  },
  {
    label: 'Supprimer',
    icon: 'pi pi-trash',
    command: () => {
      onDeleteEvent(rightClickCurrent.value).then(() => resetEvent());
      rightClickCurrent.value = null;
    },
  },
]);

const onEventRightClick = (event, eventId) => {
  console.log(eventId);
  rightClickCurrent.value = eventId;
  rightClickMenu.value.show(event);
};
</script>

<template>
  <div>
    <div class="flex items-center justify-between">
      <div class="flex gap-2">
        <Button label="Ajouter" icon="pi pi-plus" @click="showModal('add')" data-step="1" />
        <MediaManager />
      </div>

      <div class="flex gap-2 items-center" data-step="2">
        <span>Modèles</span>
        <ToggleSwitch v-model="showTemplates" />
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
          <label for="title" class="font-semibold">Intitulé</label>
          <InputText
            id="title"
            class="w-full"
            autocomplete="off"
            v-model="currentEvent.title"
            :autofocus="formType === 'add'"
          />
        </div>

        <div class="flex flex-col gap-2 mb-4">
          <label for="image" class="font-semibold">Média</label>
          <MediaDropdown v-model="currentEvent.media" />
        </div>
        <div class="mb-4">
          <MediaUploader />
        </div>
        <div class="grid grid-cols-3 gap-4 mb-4">
          <div class="flex flex-col gap-3 w-full">
            <label for="email" class="font-semibold">Jour</label>
            <Select
              v-model="currentEvent.day"
              :options="days"
              optionLabel="name"
              optionValue="code"
              placeholder="Modèle"
              class="w-full"
            />
          </div>
          <div class="flex flex-col gap-3 w-full">
            <label for="email" class="font-semibold">
              <span>Début</span>
            </label>
            <InputText v-model="currentEvent.start" type="time" class="w-full" />
          </div>
          <div class="flex flex-col gap-3 w-full">
            <label for="email" class="font-semibold">
              <span>Fin</span>
            </label>
            <InputText v-model="currentEvent.end" type="time" class="w-full" />
          </div>
        </div>
        <div class="flex justify-end items-center gap-2">
          <Button type="button" label="Annuler" severity="secondary" @click="resetEvent"></Button>
          <Button type="submit" label="Ajouter" v-if="formType === 'add'" />
          <SplitButton
            label="Enregistrer"
            :buttonProps="{ type: 'submit' }"
            :model="items"
            v-else
          />
        </div>
      </form>
    </Dialog>

    <draggable
      v-model="events"
      item-key="id"
      class="mt-4 border border-surface-200 rounded-lg"
      data-step="3"
    >
      <template #item="{ element: event }">
        <div
          class="cursor-pointer border-t first:border-t-0 border-surface-200 hover:bg-surface-100 py-2 px-2"
          @click="editEvent(event.id)"
          v-show="showTemplates || (!showTemplates && event.day !== 'template')"
          @contextmenu="onEventRightClick($event, event.id)"
        >
          <div class="flex justify-between items-center gap-2">
            <div class="flex grow gap-2 items-center" style="max-width: calc(100% - 5rem)">
              <img
                :src="event.mediaUrl"
                alt=""
                class="size-10 object-cover rounded-lg shrink-0"
                v-if="event.mediaUrl"
              />
              <div class="font-bold truncate w-full">
                {{ event.title }}
              </div>
            </div>

            <div class="flex gap-2 items-center">
              <Tag
                :value="days.find((d) => d.code === event.day)?.name"
                :severity="event.day === 'template' ? 'contrast' : 'success'"
              ></Tag>
            </div>
          </div>
        </div>
      </template>
    </draggable>
    <ContextMenu ref="rightClickMenu" :model="rightClickItems" />
  </div>
</template>

<style scoped>
.sortable-ghost {
  background: var(--highlight-bg);
  border-color: var(--primary-color);
}
</style>
