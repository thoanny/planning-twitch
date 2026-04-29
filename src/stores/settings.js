import { defineStore } from 'pinia';
import { ref } from 'vue';

export const useSettingsStore = defineStore(
  'settings',
  () => {
    const defaultSettings = {
      name: 'Paramètres par défaut',
      title: 'Mon planning Twitch',

      backgroundColor: '#9810fa',
      backgroundPattern: 'topography',
      borderRadius: 16,
      fontFamily: 'noto-sans',
      fontColor: '#faf5ff',
      headingFontSizeLandscape: 72,
      headingFontSizePortrait: 64,
      eventBackgroundPrimaryColor: '#5d0ec0',
      eventBackgroundSecondaryColor: '#8200db',
      eventFontColor: '#faf5ff',
      eventFontSizeLandscape: 20,
      eventFontSizePortrait: 24,
      eventStyle: 's1',
      logoAlignment: 'left',
      linkBackgroundColor: '#faf5ff',
      linkIconColor: '#5d0ec0',
      linkFontColor: '#5d0ec0',

      links: [
        {
          type: null,
          value: '',
        },
        {
          type: null,
          value: '',
        },
        {
          type: null,
          value: '',
        },
        {
          type: null,
          value: '',
        },
        {
          type: null,
          value: '',
        },
      ],
    };

    const data = ref({ ...defaultSettings });

    const resetData = () => {
      data.value = { ...defaultSettings };
      window.location.reload();
    };

    return { data, resetData };
  },
  {
    persist: {
      key: 'settings-v3',
    },
  },
);
