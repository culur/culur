import { createRouter, createWebHashHistory } from 'vue-router/auto';
import { setupLayouts } from 'virtual:generated-layouts';

const router = createRouter({
  history: createWebHashHistory(),
  extendRoutes: routes => setupLayouts(routes),
});

export default router;
