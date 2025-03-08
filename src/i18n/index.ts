import AsyncStorage from '@react-native-async-storage/async-storage'
import * as Localization from 'expo-localization'
import i18n from 'i18next'
import { initReactI18next } from 'react-i18next'

import enUS from './locales/en-us.json'
import jaJP from './locales/ja-jp.json'
import ruRU from './locales/ru-ru.json'
import zhCN from './locales/zh-cn.json'
import zhTW from './locales/zh-tw.json'

const resources = {
  'en-US': enUS,
  'zh-CN': zhCN,
  'zh-TW': zhTW,
  'ja-JP': jaJP,
  'ru-RU': ruRU
}

export const getLanguage = async () => {
  let savedLanguage = await AsyncStorage.getItem('language')

  if (!savedLanguage) {
    savedLanguage = Localization.getLocales()[0].languageTag
  }

  return savedLanguage
}

export const getLanguageCode = async () => {
  const lang = await getLanguage()
  return lang.split('-')[0]
}

const initI18n = async () => {
  i18n.use(initReactI18next).init({
    resources,
    lng: await getLanguage(),
    fallbackLng: 'en-US',
    interpolation: {
      escapeValue: false
    }
  })
}

initI18n()

export default i18n
