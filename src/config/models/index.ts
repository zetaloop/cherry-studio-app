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

/**
 * 按 Qwen 系列模型分组
 * @param models 模型列表
 * @returns 分组后的模型
 */
export function groupQwenModels(models: Model[]): Record<string, Model[]> {
  return models.reduce(
    (groups, model) => {
      // 匹配 Qwen 系列模型的前缀
      const prefixMatch = model.id.match(/^(qwen(?:\d+\.\d+|2(?:\.\d+)?|-\d+b|-(?:max|coder|vl)))/i)
      // 匹配 qwen2.5、qwen2、qwen-7b、qwen-max、qwen-coder 等
      const groupKey = prefixMatch ? prefixMatch[1] : model.group || '其他'

      if (!groups[groupKey]) {
        groups[groupKey] = []
      }

      groups[groupKey].push(model)

      return groups
    },
    {} as Record<string, Model[]>
  )
}
