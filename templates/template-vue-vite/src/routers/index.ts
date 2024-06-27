import { setupLayouts } from 'virtual:generated-layouts';
import { createRouter, createWebHashHistory } from 'vue-router/auto';

const router = createRouter({
  history: createWebHashHistory(),
  extendRoutes: routes => setupLayouts(routes),
});

export default router;
