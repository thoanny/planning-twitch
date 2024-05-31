import { defineStore } from 'pinia';
import { ref } from 'vue';

export const useSettingsStore = defineStore(
  'settings',
  () => {
    const data = ref({
      logo: '',
      align: false,
      rounded: true,
      color: {},
      pattern: {},
      font: {},
      title: 'Mon planning Twitch',
      hideEmpty: {
        landscape: false,
        portrait: false,
      },
      background: {
        landscape: '',
        portrait: '',
      },
      links: [
        {
          type: '',
          value: '',
        },
        {
          type: '',
          value: '',
        },
        {
          type: '',
          value: '',
        },
        {
          type: '',
          value: '',
        },
        {
          type: '',
          value: '',
        },
      ],
    });

    return { data };
  },
  {
    persist: {
      key: 'settings-v2',
    },
  },
);
