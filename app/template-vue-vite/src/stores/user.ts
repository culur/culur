import { defineStore } from 'pinia';
import { shallowRef } from 'vue';

export const useUserStore = defineStore('user', () => {
  const user = shallowRef();

  return {
    user,
  };
});
