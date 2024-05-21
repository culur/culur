import type { Router } from 'vue-router/auto';

declare module 'pinia' {
  export interface PiniaCustomProperties {
    router: Router;
  }
}
