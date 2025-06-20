import 'react-native-get-random-values'

import { v4 as uuidv4 } from 'uuid'

import { DEFAULT_CONTEXTCOUNT, DEFAULT_MAX_TOKENS, DEFAULT_TEMPERATURE } from '@/constants'
import i18n from '@/i18n'
import { getSystemAssistants, INITIAL_PROVIDERS } from '@/mock'
import { Assistant, AssistantSettings, Model, Provider, Topic } from '@/types/assistant'

export function getDefaultAssistant(): Assistant {
  // todo get from store
  return getSystemAssistants()[0]
}

export function getAssistantProvider(assistant: Assistant): Provider {
  // todo
  // const providers = store.getState().llm.providers
  const providers = INITIAL_PROVIDERS
  const provider = providers.find(p => p.id === assistant.model?.provider)
  return provider || getDefaultProvider()
}

export function getDefaultTopic(assistantId: string): Topic {
  // todo
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
  // todo
  return INITIAL_PROVIDERS[0].models[0]
}

export function getProviderByModel(model?: Model): Provider {
  // todo
  const providers = INITIAL_PROVIDERS
  const providerId = model ? model.provider : getDefaultProvider().id
  return providers.find(p => p.id === providerId) as Provider
}

export const getAssistantSettings = (assistant: Assistant): AssistantSettings => {
  const contextCount = assistant?.settings?.contextCount ?? DEFAULT_CONTEXTCOUNT

  const getAssistantMaxTokens = () => {
    if (assistant.settings?.enableMaxTokens) {
      const maxTokens = assistant.settings.maxTokens

      if (typeof maxTokens === 'number') {
        return maxTokens > 0 ? maxTokens : DEFAULT_MAX_TOKENS
      }

      return DEFAULT_MAX_TOKENS
    }

    return undefined
  }

  return {
    contextCount: contextCount === 100 ? 100000 : contextCount,
    temperature: assistant?.settings?.temperature ?? DEFAULT_TEMPERATURE,
    topP: assistant?.settings?.topP ?? 1,
    enableMaxTokens: assistant?.settings?.enableMaxTokens ?? false,
    maxTokens: getAssistantMaxTokens(),
    streamOutput: assistant?.settings?.streamOutput ?? true,
    toolUseMode: assistant?.settings?.toolUseMode ?? 'prompt',
    defaultModel: assistant?.defaultModel ?? undefined,
    customParameters: assistant?.settings?.customParameters ?? []
  }
}
