import { createI18n } from 'vue-i18n';
import en from '../../locales/en.yml';
import type { Plugin } from 'vue';

export const i18n = createI18n({
  legacy: false,
  locale: 'en',
  messages: {
    en,
  },
  globalInjection: true,
});

export const install: Plugin = app => {
  app.use(i18n);
};
