import en from './locales/lang/en'
import zh from './locales/lang/zh_CN'

export default defineI18nConfig(() => ({
  legacy: false,
  locale: 'en',
  fallbackLocale: 'en',
  messages: {
    en,
    zh,
  },
}))
