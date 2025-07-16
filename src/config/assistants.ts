import { getLocales } from 'expo-localization'

import assistantsEnJsonData from '@/resources/data/assistants-en.json'
import assistantsZhJsonData from '@/resources/data/assistants-zh.json'
import { Assistant } from '@/types/assistant'

export function getSystemAssistants(): Assistant[] {
  const defaultAssistant: Assistant = {
    id: 'default',
    name: 'Default Assistant',
    emoji: '😀',
    prompt: '',
    topics: [],
    type: 'system'
  }
  const translateAssistant: Assistant = {
    id: 'translate',
    name: 'Translate Assistant',
    emoji: '🌐',
    prompt: 'You are a translation assistant. Please translate the following text into English.',
    topics: [],
    type: 'system'
  }
  const topicNamingAssistant: Assistant = {
    id: 'topic_naming',
    name: 'Topic Naming Assistant',
    emoji: '🏷️',
    prompt: 'You are a topic naming assistant. Please suggest a name for the following topic.',
    topics: [],
    type: 'system'
  }

  return [defaultAssistant, translateAssistant, topicNamingAssistant]
}

export function getBuiltInAssistants(): Assistant[] {
  const language = getLocales()[0].languageCode

  try {
    if (assistantsEnJsonData && language === 'en') {
      return JSON.parse(JSON.stringify(assistantsEnJsonData)) || []
    } else if (assistantsZhJsonData && language === 'zh') {
      return JSON.parse(JSON.stringify(assistantsZhJsonData)) || []
    } else {
      return []
    }
  } catch (error) {
    console.error('Error reading assistants data:', error)
    return []
  }
}
