import '@/assets/main.scss';
import 'primeicons/primeicons.css';
import 'primevue/resources/themes/aura-light-green/theme.css';
import 'vue3-tour/dist/vue3-tour.css';

import { createPinia } from 'pinia';
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate';
import PrimeVue from 'primevue/config';
import ToastService from 'primevue/toastservice';
import { createApp } from 'vue';
import Vue3Tour from 'vue3-tour';
import App from './App.vue';

const app = createApp(App);

const pinia = createPinia();
pinia.use(piniaPluginPersistedstate);

app.use(pinia);
app.use(PrimeVue);
app.use(ToastService);
app.use(Vue3Tour).provide('tours', app.config.globalProperties.$tours);

app.mount('#app');
