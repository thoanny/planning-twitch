import { defineStore } from 'pinia';
import { ref, reactive } from 'vue';
import { v4 as uuidv4 } from 'uuid';
import days from '@/data/days.json';

export const useEventsStore = defineStore(
  'events',
  () => {
    const data = ref([]);
    const showTemplates = ref(true);

    const defaultEvent = {
      uid: '',
      title: '',
      start: '',
      end: '',
      image: '',
      day: days.find((d) => d.code === 'template'),
    };

    const onSaveEvent = (event) => {
      if (!event.uid) {
        event.uid = uuidv4();
        data.value.push(event);
      } else {
        const idx = data.value.findIndex((e) => e.uid === event.uid);
        if (idx < 0) return;
        data.value[idx] = event;
      }
    };

    const onDuplicateEvent = (uid) => {
      const event = { ...data.value.find((event) => event.uid === uid) };
      event.uid = uuidv4();
      data.value.push(event);
    };

    const onDeleteEvent = (uid) => {
      const idx = data.value.findIndex((event) => event.uid === uid);
      if (idx < 0) return;
      data.value.splice(idx, 1);
    };

    return {
      data,
      showTemplates,
      defaultEvent,
      onSaveEvent,
      onDuplicateEvent,
      onDeleteEvent,
    };
  },
  {
    persist: {
      key: 'events-v2',
      paths: ['data', 'showTemplates'],
    },
  },
);
