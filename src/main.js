import '@/assets/main.scss';
import 'primeicons/primeicons.css';
import 'primevue/resources/themes/aura-light-green/theme.css';

import { createApp } from 'vue';
import { createPinia } from 'pinia';
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate';

import PrimeVue from 'primevue/config';
import App from './App.vue';

const app = createApp(App);

const pinia = createPinia();
pinia.use(piniaPluginPersistedstate);

app.use(pinia);
app.use(PrimeVue);

app.mount('#app');
