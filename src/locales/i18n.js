import { createI18n } from 'vue-i18n'
import en from './en.json'
import tr from './tr.json'
import fr from './fr.json'

const i18n = createI18n({
  legacy: false,
  locale: navigator.language,
  fallbackLocale: 'en',
  messages: {
    en: en,
    tr: tr,
    fr: fr
  }
})

export default i18n
