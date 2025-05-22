import 'react-native-get-random-values'

import { v4 as uuidv4 } from 'uuid'

import i18n from '@/i18n'
import { Agent, Topic } from '@/types/agent'

export function getDefaultAgent(): Agent {
  return {
    id: 'default',
    name: i18n.t('chat.default.name'),
    emoji: '🍒',
    prompt: '',
    topics: [getDefaultTopic('default')],
    type: 'assistant'
  }
}

export function getDefaultTopic(assistantId: string): Topic {
  return {
    id: uuidv4(),
    assistantId,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    name: i18n.t('chat.default.topic.name'),
    messages: [],
    isNameManuallyEdited: false
  }
}
