import { createPinia } from 'pinia';
import { markRaw } from 'vue';
import router from '../routers';

export * from './user';

const pinia = createPinia().use(({ store }) => {
  store.router = markRaw(router);
});

export default pinia;
