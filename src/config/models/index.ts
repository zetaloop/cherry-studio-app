// 导出所有模型相关功能
import { Model } from '@/types/agent'

export { EMBEDDING_REGEX, isEmbeddingModel } from './embedding'
export { FUNCTION_CALLING_MODELS, FUNCTION_CALLING_REGEX, isFunctionCallingModel } from './function-calling'
export {
  isClaudeReasoningModel,
  isGeminiReasoningModel,
  isGrokReasoningModel,
  isOpenAIReasoningModel,
  isQwenReasoningModel,
  isReasoningModel,
  isSupportedThinkingTokenQwenModel,
  REASONING_REGEX
} from './reasoning'
export { isRerankModel, RERANKING_REGEX } from './rerank'
export { SYSTEM_MODELS } from './system-models'
export { GENERATE_IMAGE_MODELS, isTextToImageModel, TEXT_TO_IMAGE_REGEX } from './text-to-image'
export { isVisionModel, VISION_REGEX } from './vision'
export {
  CLAUDE_SUPPORTED_WEBSEARCH_REGEX,
  GEMINI_SEARCH_MODELS,
  isOpenAILLMModel,
  isOpenAIWebSearch,
  isWebSearchModel,
  PERPLEXITY_SEARCH_MODELS
} from './web-search'

export interface ModelGroup {
  [provider: string]: Model[]
}

export type ModelCategory =
  | 'embedding'
  | 'rerank'
  | 'vision'
  | 'function_calling'
  | 'reasoning'
  | 'text_to_image'
  | 'web_search'

export function isFreeModel(model: Model) {
  return (model.id + model.name).toLocaleLowerCase().includes('free')
}
