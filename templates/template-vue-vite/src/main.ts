import { createApp } from 'vue';
import App from './app.vue';
import head from './plugins/head';
import i18n from './plugins/i18n';
import router from './routers';
import pinia from './stores';
import './styles/main.scss';

const app = createApp(App);

app.use(head);
app.use(i18n);
app.use(pinia);
app.use(router);
app.mount('#app');

export default app;
