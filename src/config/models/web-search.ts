import { getProviderByModel } from '@/services/assistant-service'
import { Model } from '@/types/assistant'

import { isEmbeddingModel } from './embedding'
import { isOpenAIReasoningModel } from './reasoning'
import { GENERATE_IMAGE_MODELS, isTextToImageModel } from './text-to-image'

export const CLAUDE_SUPPORTED_WEBSEARCH_REGEX = new RegExp(
  `\\b(?:claude-3(-|\\.)(7|5)-sonnet(?:-[\\w-]+)|claude-3(-|\\.)5-haiku(?:-[\\w-]+))\\b`,
  'i'
)

export function isOpenAILLMModel(model: Model): boolean {
  if (!model) {
    return false
  }

  if (model.id.includes('gpt-4o-image')) {
    return false
  }

  if (isOpenAIReasoningModel(model)) {
    return true
  }

  if (model.id.includes('gpt')) {
    return true
  }

  return false
}

export const PERPLEXITY_SEARCH_MODELS = ['sonar-pro', 'sonar', 'sonar-reasoning', 'sonar-reasoning-pro']

export const GEMINI_SEARCH_MODELS = [
  'gemini-2.0-flash',
  'gemini-2.0-flash-lite',
  'gemini-2.0-flash-exp',
  'gemini-2.0-flash-001',
  'gemini-2.0-pro-exp-02-05',
  'gemini-2.0-pro-exp',
  'gemini-2.5-pro-exp',
  'gemini-2.5-pro-exp-03-25',
  'gemini-2.5-pro-preview',
  'gemini-2.5-pro-preview-03-25',
  'gemini-2.5-pro-preview-05-06',
  'gemini-2.5-flash-preview',
  'gemini-2.5-flash-preview-04-17'
]

export function isOpenAIWebSearch(model: Model): boolean {
  return model.id.includes('gpt-4o-search-preview') || model.id.includes('gpt-4o-mini-search-preview')
}

export function isWebSearchModel(model: Model): boolean {
  if (!model) {
    return false
  }

  if (model.type) {
    if (model.type.includes('web_search')) {
      return true
    }
  }

  const provider = getProviderByModel(model)

  if (!provider) {
    return false
  }

  const isEmbedding = isEmbeddingModel(model)

  if (isEmbedding) {
    return false
  }

  if (model.id.includes('claude')) {
    return CLAUDE_SUPPORTED_WEBSEARCH_REGEX.test(model.id)
  }

  if (provider.type === 'openai-response') {
    if (
      isOpenAILLMModel(model) &&
      !isTextToImageModel(model) &&
      !isOpenAIReasoningModel(model) &&
      !GENERATE_IMAGE_MODELS.includes(model.id)
    ) {
      return true
    }

    return false
  }

  if (provider.id === 'perplexity') {
    return PERPLEXITY_SEARCH_MODELS.includes(model?.id)
  }

  if (provider.id === 'aihubmix') {
    if (
      isOpenAILLMModel(model) &&
      !isTextToImageModel(model) &&
      !isOpenAIReasoningModel(model) &&
      !GENERATE_IMAGE_MODELS.includes(model.id)
    ) {
      return true
    }

    const models = ['gemini-2.0-flash-search', 'gemini-2.0-flash-exp-search', 'gemini-2.0-pro-exp-02-05-search']
    return models.includes(model?.id)
  }

  if (provider?.type === 'openai') {
    if (GEMINI_SEARCH_MODELS.includes(model?.id) || isOpenAIWebSearch(model)) {
      return true
    }
  }

  if (provider.id === 'gemini' || provider?.type === 'gemini') {
    return GEMINI_SEARCH_MODELS.includes(model?.id)
  }

  if (provider.id === 'hunyuan') {
    return model?.id !== 'hunyuan-lite'
  }

  if (provider.id === 'zhipu') {
    return model?.id?.startsWith('glm-4-')
  }

  if (provider.id === 'dashscope') {
    const models = ['qwen-turbo', 'qwen-max', 'qwen-plus', 'qwq']
    // matches id like qwen-max-0919, qwen-max-latest
    return models.some(i => model.id.startsWith(i))
  }

  if (provider.id === 'openrouter') {
    return true
  }

  return false
}
