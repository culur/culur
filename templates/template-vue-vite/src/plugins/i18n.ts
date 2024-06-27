import { createI18n } from 'vue-i18n';
import en from '../../locales/en.yml';

const i18n = createI18n({
  legacy: false,
  locale: 'en',
  messages: {
    en,
  },
  globalInjection: true,
});

export default i18n;
