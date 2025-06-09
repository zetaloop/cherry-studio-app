import { Model } from '@/types/assistant'

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
