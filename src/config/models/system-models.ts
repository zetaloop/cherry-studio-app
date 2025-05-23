import { Model } from '@/types/agent'

export const SILICON_MODELS: Model[] = [
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
]

export const GEMINI_MODELS: Model[] = [
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
]

export const AIHUBMIX_MODELS: Model[] = [
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

export const SYSTEM_MODELS: Record<string, Model[]> = {
  silicon: SILICON_MODELS,
  gemini: GEMINI_MODELS,
  aihubmix: AIHUBMIX_MODELS
}
