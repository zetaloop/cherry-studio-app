import { LanguageVarious } from '.'

export interface TopicNamingSetting {
  autoNaming: boolean
  prompt: string
}

export interface TranslateModelSetting {
  specifyLanguage: boolean
  sourceLanguage: LanguageVarious | undefined
  targetLanguage: LanguageVarious | undefined
  prompt: string
}
