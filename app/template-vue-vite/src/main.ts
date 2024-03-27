import { createPinia } from 'pinia';
import { createApp, markRaw } from 'vue';
import App from './app.vue';
// import { i18n } from './plugins/i18n';
import router from './routers';
import './stores';
import './styles/main.scss';

const app = createApp(App);

const pinia = createPinia().use(({ store }) => {
  store.router = markRaw(router);
});

// app.use(i18n);
app.use(pinia);
app.use(router);
app.mount('#app');

export default app;
