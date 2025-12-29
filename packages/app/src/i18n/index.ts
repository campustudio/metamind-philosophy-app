import i18n from 'i18next'
import { initReactI18next } from 'react-i18next'
import { locales, RTL_LANGUAGES, DEFAULT_LANGUAGE } from '@yuansixiang/shared'
import Taro from '@tarojs/taro'

i18n.use(initReactI18next).init({
  resources: locales,
  lng: DEFAULT_LANGUAGE,
  fallbackLng: 'en',
  interpolation: {
    escapeValue: false,
  },
  react: {
    useSuspense: false,
  },
})

i18n.on('languageChanged', lng => {
  const isRTL = RTL_LANGUAGES.includes(lng as any)

  if (typeof document !== 'undefined') {
    document.documentElement.dir = isRTL ? 'rtl' : 'ltr'
    document.documentElement.lang = lng
  }

  Taro.setStorageSync('language', lng)
})

const savedLanguage = Taro.getStorageSync('language')
if (savedLanguage) {
  i18n.changeLanguage(savedLanguage)
}

export default i18n
