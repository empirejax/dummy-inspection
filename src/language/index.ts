import { createI18n } from 'vue-i18n';
import zh from 'view-ui-plus/dist/locale/zh-CN';
import en from 'view-ui-plus/dist/locale/en-US'; //The new version changes 'IView' to 'View-Design'
import US from './en.json';
import CN from './zh.json';
import { setLocal, getLocal } from '../utils/local';
import { LANG } from '../config/constants/app';

const messages = {
  en: Object.assign(US, en), //Combine your English bag and IView
  zh: Object.assign(CN, zh), //Combine your own Chinese bag and IView
};

function getLocalLang() {
  let localLang = getLocal(LANG);
  if (!localLang) {
    let defaultLang = navigator.language;
    if (defaultLang) {
      // eslint-disable-next-line prefer-destructuring
      defaultLang = defaultLang.split('-')[0];
      // eslint-disable-next-line prefer-destructuring
      localLang = defaultLang.split('-')[0];
    }
    setLocal(LANG, defaultLang);
  }
  return localLang;
}
const lang = getLocalLang();

const i18n = createI18n({
  allowComposition: true,
  globalInjection: true,
  legacy: false,
  locale: lang,
  messages,
});

export const t = (key: string) => {
  // Use specific type (string) for the key parameter
  return i18n.global.t(key); // Use the imported i18n variable or module
};

export default i18n; // Export the i18n variable or module
