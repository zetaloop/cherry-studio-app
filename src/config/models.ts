import { getProviderByModel } from '@/services/agent-service'
import { Model } from '@/types/agent'

export const SYSTEM_MODELS: Record<string, Model[]> = {
  silicon: [
    {
      id: 'deepseek-ai/DeepSeek-R1',
      name: 'deepseek-ai/DeepSeek-R1',
      provider: 'silicon',
      group: 'deepseek-ai'
    },
    {
      id: 'deepseek-ai/DeepSeek-V3',
      name: 'deepseek-ai/DeepSeek-V3',
      provider: 'silicon',
      group: 'deepseek-ai'
    }
  ],
  gemini: [
    {
      id: 'gemini-2.0-flash-exp-image-generation',
      name: 'Gemini 2.0 Flash (Image Generation) Experimental',
      provider: 'gemini',
      group: 'gemini-2.0',
      description: 'Gemini 2.0 Flash (Image Generation) Experimental'
    },
    {
      id: 'gemini-2.0-pro-exp',
      name: 'Gemini 2.0 Pro Experimental',
      provider: 'gemini',
      group: 'gemini-2.0',
      description: 'Experimental release (February 5th, 2025) of Gemini 2.0 Pro'
    },
    {
      id: 'gemini-2.5-pro-exp-03-25',
      name: 'Gemini 2.5 Pro Experimental 03-25',
      provider: 'gemini',
      group: 'gemini-2.5',
      description: 'Experimental release (March 25th, 2025) of Gemini 2.5 Pro'
    },
    {
      id: 'gemini-2.0-flash-thinking-exp-1219',
      name: 'Gemini 2.0 Flash Thinking Experimental',
      provider: 'gemini',
      group: 'gemini-2.0',
      description: 'Gemini 2.0 Flash Thinking Experimental'
    },
    {
      id: 'gemini-embedding-exp',
      name: 'Gemini Embedding Experimental',
      provider: 'gemini',
      group: 'gemini-embedding',
      description: 'Obtain a distributed representation of a text.'
    },
    {
      id: 'gemini-2.0-flash',
      provider: 'gemini',
      name: 'Gemini 2.0 Flash',
      group: 'Gemini 2.0'
    }
  ],
  aihubmix: [
    {
      id: 'o3-mini',
      name: 'o3-mini',
      provider: 'aihubmix',
      group: 'o3',
      owned_by: 'custom'
    },
    {
      id: 'gpt-4.1',
      name: 'gpt-4.1',
      provider: 'aihubmix',
      group: 'gpt',
      owned_by: 'custom'
    },
    {
      id: 'gemini-2.5-flash-preview-04-17',
      name: 'gemini-2.5-flash-preview-04-17',
      provider: 'aihubmix',
      group: 'gemini',
      owned_by: 'custom'
    },
    {
      id: 'claude-sonnet-4-20250514',
      name: 'claude-sonnet-4-20250514',
      provider: 'aihubmix',
      group: 'claude',
      owned_by: 'custom'
    },
    {
      id: 'DeepSeek-R1',
      name: 'DeepSeek-R1',
      provider: 'aihubmix',
      group: 'deepseek',
      owned_by: 'custom'
    },
    {
      id: 'Qwen/Qwen3-235B-A22B',
      name: 'Qwen/Qwen3-235B-A22B',
      provider: 'aihubmix',
      group: 'qwen',
      owned_by: 'custom'
    },
    {
      id: 'jina-reranker-m0',
      name: 'jina-reranker-m0',
      provider: 'aihubmix',
      group: 'jina',
      owned_by: 'custom'
    },
    {
      id: 'moonshot-v1-8k',
      name: 'moonshot-v1-8k',
      provider: 'aihubmix',
      group: 'moonshot',
      owned_by: 'moonshot'
    },
    {
      id: 'grok-3-mini-beta',
      name: 'grok-3-mini-beta',
      provider: 'aihubmix',
      group: 'grok',
      owned_by: 'custom'
    }
  ]
}

// Embedding models
export const EMBEDDING_REGEX =
  /(?:^text-|embed|bge-|e5-|LLM2Vec|retrieval|uae-|gte-|jina-clip|jina-embeddings|voyage-)/i

export function isEmbeddingModel(model: Model): boolean {
  if (!model) {
    return false
  }

  if (['anthropic'].includes(model?.provider)) {
    return false
  }

  if (model.provider === 'doubao') {
    return EMBEDDING_REGEX.test(model.name)
  }

  if (isRerankModel(model)) {
    return false
  }

  return EMBEDDING_REGEX.test(model.id) || model.type?.includes('embedding') || false
}

// Rerank models
export const RERANKING_REGEX = /(?:rerank|re-rank|re-ranker|re-ranking|retrieval|retriever)/i

export function isRerankModel(model: Model): boolean {
  return model ? RERANKING_REGEX.test(model.id) || false : false
}

// Vision models
const visionAllowedModels = [
  'llava',
  'moondream',
  'minicpm',
  'gemini-1\\.5',
  'gemini-2\\.0',
  'gemini-2\\.5',
  'gemini-exp',
  'claude-3',
  'vision',
  'glm-4v',
  'qwen-vl',
  'qwen2-vl',
  'qwen2.5-vl',
  'qwen2.5-omni',
  'qvq',
  'internvl2',
  'grok-vision-beta',
  'pixtral',
  'gpt-4(?:-[\\w-]+)',
  'gpt-4.1(?:-[\\w-]+)?',
  'gpt-4o(?:-[\\w-]+)?',
  'gpt-4.5(?:-[\\w-]+)',
  'chatgpt-4o(?:-[\\w-]+)?',
  'o1(?:-[\\w-]+)?',
  'o3(?:-[\\w-]+)?',
  'o4(?:-[\\w-]+)?',
  'deepseek-vl(?:[\\w-]+)?',
  'kimi-latest',
  'gemma-3(?:-[\\w-]+)'
]

const visionExcludedModels = [
  'gpt-4-\\d+-preview',
  'gpt-4-turbo-preview',
  'gpt-4-32k',
  'gpt-4-\\d+',
  'o1-mini',
  'o3-mini',
  'o1-preview',
  'AIDC-AI/Marco-o1'
]
export const VISION_REGEX = new RegExp(
  `\\b(?!(?:${visionExcludedModels.join('|')})\\b)(${visionAllowedModels.join('|')})\\b`,
  'i'
)

export function isVisionModel(model: Model): boolean {
  if (!model) {
    return false
  }
  // 新添字段 copilot-vision-request 后可使用 vision
  // if (model.provider === 'copilot') {
  //   return false
  // }

  if (model.provider === 'doubao') {
    return VISION_REGEX.test(model.name) || model.type?.includes('vision') || false
  }

  return VISION_REGEX.test(model.id) || model.type?.includes('vision') || false
}

// Tool calling models
export const FUNCTION_CALLING_MODELS = [
  'gpt-4o',
  'gpt-4o-mini',
  'gpt-4',
  'gpt-4.5',
  'o(1|3|4)(?:-[\\w-]+)?',
  'claude',
  'qwen',
  'qwen3',
  'hunyuan',
  'deepseek',
  'glm-4(?:-[\\w-]+)?',
  'learnlm(?:-[\\w-]+)?',
  'gemini(?:-[\\w-]+)?', // 提前排除了gemini的嵌入模型
  'grok-3(?:-[\\w-]+)?'
]

const FUNCTION_CALLING_EXCLUDED_MODELS = [
  'aqa(?:-[\\w-]+)?',
  'imagen(?:-[\\w-]+)?',
  'o1-mini',
  'o1-preview',
  'AIDC-AI/Marco-o1'
]

export const FUNCTION_CALLING_REGEX = new RegExp(
  `\\b(?!(?:${FUNCTION_CALLING_EXCLUDED_MODELS.join('|')})\\b)(?:${FUNCTION_CALLING_MODELS.join('|')})\\b`,
  'i'
)

export function isFunctionCallingModel(model: Model): boolean {
  if (model.type?.includes('function_calling')) {
    return true
  }

  if (isEmbeddingModel(model)) {
    return false
  }

  if (model.provider === 'qiniu') {
    return ['deepseek-v3-tool', 'deepseek-v3-0324', 'qwq-32b', 'qwen2.5-72b-instruct'].includes(model.id)
  }

  if (['deepseek', 'anthropic'].includes(model.provider)) {
    return true
  }

  return FUNCTION_CALLING_REGEX.test(model.id)
}

// Reasoning models
export const REASONING_REGEX =
  /^(o\d+(?:-[\w-]+)?|.*\b(?:reasoning|reasoner|thinking)\b.*|.*-[rR]\d+.*|.*\bqwq(?:-[\w-]+)?\b.*|.*\bhunyuan-t1(?:-[\w-]+)?\b.*|.*\bglm-zero-preview\b.*|.*\bgrok-3-mini(?:-[\w-]+)?\b.*)$/i

export function isClaudeReasoningModel(model?: Model): boolean {
  if (!model) {
    return false
  }

  return model.id.includes('claude-3-7-sonnet') || model.id.includes('claude-3.7-sonnet')
}

export function isOpenAIReasoningModel(model: Model): boolean {
  return model.id.includes('o1') || model.id.includes('o3') || model.id.includes('o4')
}

export function isGeminiReasoningModel(model?: Model): boolean {
  if (!model) {
    return false
  }

  if (model.id.includes('gemini-2.5')) {
    return true
  }

  return false
}

export function isQwenReasoningModel(model?: Model): boolean {
  if (!model) {
    return false
  }

  if (isSupportedThinkingTokenQwenModel(model)) {
    return true
  }

  if (model.id.includes('qwq') || model.id.includes('qvq')) {
    return true
  }

  return false
}

export function isSupportedThinkingTokenQwenModel(model?: Model): boolean {
  if (!model) {
    return false
  }

  return (
    model.id.toLowerCase().includes('qwen3') ||
    [
      'qwen-plus-latest',
      'qwen-plus-0428',
      'qwen-plus-2025-04-28',
      'qwen-turbo-latest',
      'qwen-turbo-0428',
      'qwen-turbo-2025-04-28'
    ].includes(model.id.toLowerCase())
  )
}

export function isGrokReasoningModel(model?: Model): boolean {
  if (!model) {
    return false
  }

  if (model.id.includes('grok-3-mini')) {
    return true
  }

  return false
}

export function isReasoningModel(model?: Model): boolean {
  if (!model) {
    return false
  }

  if (model.provider === 'doubao') {
    return REASONING_REGEX.test(model.name) || model.type?.includes('reasoning') || false
  }

  if (
    isClaudeReasoningModel(model) ||
    isOpenAIReasoningModel(model) ||
    isGeminiReasoningModel(model) ||
    isQwenReasoningModel(model) ||
    isGrokReasoningModel(model) ||
    model.id.includes('glm-z1')
  ) {
    return true
  }

  return REASONING_REGEX.test(model.id) || model.type?.includes('reasoning') || false
}

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

// Text to image models
export const TEXT_TO_IMAGE_REGEX = /flux|diffusion|stabilityai|sd-|dall|cogview|janus/i

export function isTextToImageModel(model: Model): boolean {
  return TEXT_TO_IMAGE_REGEX.test(model.id)
}

export const GENERATE_IMAGE_MODELS = [
  'gemini-2.0-flash-exp-image-generation',
  'gemini-2.0-flash-preview-image-generation',
  'gemini-2.0-flash-exp',
  'grok-2-image-1212',
  'grok-2-image',
  'grok-2-image-latest',
  'gpt-image-1'
]

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

export function isFreeModel(model: Model) {
  return (model.id + model.name).toLocaleLowerCase().includes('free')
}
