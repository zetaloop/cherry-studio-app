import 'react-native-get-random-values'

import { v4 as uuidv4 } from 'uuid'

import i18n from '@/i18n'
import { INITIAL_PROVIDERS } from '@/mock'
import { Agent, Model, Provider, Topic } from '@/types/agent'

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

export function getDefaultProvider() {
  return getProviderByModel(getDefaultModel())
}

export function getDefaultModel() {
  return INITIAL_PROVIDERS[0].models[0]
}

export function getProviderByModel(model?: Model): Provider {
  const providers = INITIAL_PROVIDERS
  const providerId = model ? model.provider : getDefaultProvider().id
  return providers.find(p => p.id === providerId) as Provider
}
