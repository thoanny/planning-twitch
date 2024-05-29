import { defineStore } from 'pinia';
import { ref, reactive } from 'vue';
import { v4 as uuidv4 } from 'uuid';
import days from '@/data/days.json';

export const useEventsStore = defineStore(
  'events',
  () => {
    const data = ref([]);

    const defaultEvent = {
      uid: '',
      title: '',
      start: '',
      end: '',
      image: '',
      day: days.find((d) => d.code === 'template'),
    };

    const onAddEvent = (event) => {
      event.uid = uuidv4();
      data.value.push(event);
    };

    const onEditEvent = (event) => {
      const idx = data.value.findIndex((e) => e.uid === event.uid);
      if (idx < 0) return;
      data.value[idx] = event;
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
      defaultEvent,
      onAddEvent,
      onDuplicateEvent,
      onEditEvent,
      onDeleteEvent,
    };
  },
  {
    persist: {
      key: 'events-v2',
      paths: ['data'],
    },
  },
);
