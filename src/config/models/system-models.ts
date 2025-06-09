import { Model } from '@/types/assistant'

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

// mock data
export const AIHUBMIX_MODELS: Model[] = [
  {
    id: 'gpt-3.5-turbo',
    name: 'gpt-3.5-turbo',
    provider: 'aihubmix',
    group: 'gpt',
    owned_by: 'OpenAI'
  },
  {
    id: 'gpt-3.5-turbo-1106',
    name: 'gpt-3.5-turbo-1106',
    provider: 'aihubmix',
    group: 'gpt',
    owned_by: 'OpenAI'
  },
  {
    id: 'gpt-3.5-turbo-0125',
    name: 'gpt-3.5-turbo-0125',
    provider: 'aihubmix',
    group: 'gpt',
    owned_by: 'OpenAI'
  },
  {
    id: 'gpt-3.5-turbo-16k',
    name: 'gpt-3.5-turbo-16k',
    provider: 'aihubmix',
    group: 'gpt',
    owned_by: 'OpenAI'
  },
  {
    id: 'gpt-3.5-turbo-instruct',
    name: 'gpt-3.5-turbo-instruct',
    provider: 'aihubmix',
    group: 'gpt',
    owned_by: 'OpenAI'
  },
  {
    id: 'gpt-4',
    name: 'gpt-4',
    provider: 'aihubmix',
    group: 'gpt',
    owned_by: 'OpenAI'
  },
  {
    id: 'gpt-4-0613',
    name: 'gpt-4-0613',
    provider: 'aihubmix',
    group: 'gpt',
    owned_by: 'OpenAI'
  },
  {
    id: 'gpt-4-1106-preview',
    name: 'gpt-4-1106-preview',
    provider: 'aihubmix',
    group: 'gpt',
    owned_by: 'OpenAI'
  },
  {
    id: 'gpt-4-0125-preview',
    name: 'gpt-4-0125-preview',
    provider: 'aihubmix',
    group: 'gpt',
    owned_by: 'OpenAI'
  },
  {
    id: 'gpt-4-32k',
    name: 'gpt-4-32k',
    provider: 'aihubmix',
    group: 'gpt',
    owned_by: 'OpenAI'
  },
  {
    id: 'gpt-4-turbo-preview',
    name: 'gpt-4-turbo-preview',
    provider: 'aihubmix',
    group: 'gpt',
    owned_by: 'OpenAI'
  },
  {
    id: 'gpt-4-turbo',
    name: 'gpt-4-turbo',
    provider: 'aihubmix',
    group: 'gpt',
    owned_by: 'OpenAI'
  },
  {
    id: 'gpt-4-turbo-2024-04-09',
    name: 'gpt-4-turbo-2024-04-09',
    provider: 'aihubmix',
    group: 'gpt',
    owned_by: 'OpenAI'
  },
  {
    id: 'gpt-4o',
    name: 'gpt-4o',
    provider: 'aihubmix',
    group: 'gpt',
    owned_by: 'OpenAI'
  },
  {
    id: 'gpt-4o-2024-05-13',
    name: 'gpt-4o-2024-05-13',
    provider: 'aihubmix',
    group: 'gpt',
    owned_by: 'OpenAI'
  },
  {
    id: 'gpt-4o-2024-08-06',
    name: 'gpt-4o-2024-08-06',
    provider: 'aihubmix',
    group: 'gpt',
    owned_by: 'OpenAI'
  },
  {
    id: 'gpt-4o-2024-11-20',
    name: 'gpt-4o-2024-11-20',
    provider: 'aihubmix',
    group: 'gpt',
    owned_by: 'OpenAI'
  },
  {
    id: 'chatgpt-4o-latest',
    name: 'chatgpt-4o-latest',
    provider: 'aihubmix',
    group: 'chatgpt',
    owned_by: 'OpenAI'
  },
  {
    id: 'gpt-4o-mini',
    name: 'gpt-4o-mini',
    provider: 'aihubmix',
    group: 'gpt',
    owned_by: 'OpenAI'
  },
  {
    id: 'gpt-4o-mini-2024-07-18',
    name: 'gpt-4o-mini-2024-07-18',
    provider: 'aihubmix',
    group: 'gpt',
    owned_by: 'OpenAI'
  },
  {
    id: 'gpt-4-vision-preview',
    name: 'gpt-4-vision-preview',
    provider: 'aihubmix',
    group: 'gpt',
    owned_by: 'OpenAI'
  },
  {
    id: 'text-embedding-ada-002',
    name: 'text-embedding-ada-002',
    provider: 'aihubmix',
    group: 'text',
    owned_by: 'OpenAI'
  },
  {
    id: 'text-embedding-3-small',
    name: 'text-embedding-3-small',
    provider: 'aihubmix',
    group: 'text',
    owned_by: 'OpenAI'
  },
  {
    id: 'text-embedding-3-large',
    name: 'text-embedding-3-large',
    provider: 'aihubmix',
    group: 'text',
    owned_by: 'OpenAI'
  },
  {
    id: 'text-babbage-001',
    name: 'text-babbage-001',
    provider: 'aihubmix',
    group: 'text',
    owned_by: 'OpenAI'
  },
  {
    id: 'text-ada-001',
    name: 'text-ada-001',
    provider: 'aihubmix',
    group: 'text',
    owned_by: 'OpenAI'
  },
  {
    id: 'text-davinci-002',
    name: 'text-davinci-002',
    provider: 'aihubmix',
    group: 'text',
    owned_by: 'OpenAI'
  },
  {
    id: 'text-davinci-003',
    name: 'text-davinci-003',
    provider: 'aihubmix',
    group: 'text',
    owned_by: 'OpenAI'
  },
  {
    id: 'text-moderation-stable',
    name: 'text-moderation-stable',
    provider: 'aihubmix',
    group: 'text',
    owned_by: 'OpenAI'
  },
  {
    id: 'text-davinci-edit-001',
    name: 'text-davinci-edit-001',
    provider: 'aihubmix',
    group: 'text',
    owned_by: 'OpenAI'
  },
  {
    id: 'davinci-002',
    name: 'davinci-002',
    provider: 'aihubmix',
    group: 'davinci',
    owned_by: 'OpenAI'
  },
  {
    id: 'babbage-002',
    name: 'babbage-002',
    provider: 'aihubmix',
    group: 'babbage',
    owned_by: 'OpenAI'
  },
  {
    id: 'dall-e-2',
    name: 'dall-e-2',
    provider: 'aihubmix',
    group: 'dall',
    owned_by: 'OpenAI'
  },
  {
    id: 'dall-e-3',
    name: 'dall-e-3',
    provider: 'aihubmix',
    group: 'dall',
    owned_by: 'OpenAI'
  },
  {
    id: 'o1',
    name: 'o1',
    provider: 'aihubmix',
    group: 'o1',
    owned_by: 'OpenAI'
  },
  {
    id: 'o1-2024-12-17',
    name: 'o1-2024-12-17',
    provider: 'aihubmix',
    group: 'o1',
    owned_by: 'OpenAI'
  },
  {
    id: 'o1-preview',
    name: 'o1-preview',
    provider: 'aihubmix',
    group: 'o1',
    owned_by: 'OpenAI'
  },
  {
    id: 'o1-preview-2024-09-12',
    name: 'o1-preview-2024-09-12',
    provider: 'aihubmix',
    group: 'o1',
    owned_by: 'OpenAI'
  },
  {
    id: 'o1-mini',
    name: 'o1-mini',
    provider: 'aihubmix',
    group: 'o1',
    owned_by: 'OpenAI'
  },
  {
    id: 'o1-mini-2024-09-12',
    name: 'o1-mini-2024-09-12',
    provider: 'aihubmix',
    group: 'o1',
    owned_by: 'OpenAI'
  },
  {
    id: 'claude-3-haiku-20240307',
    name: 'claude-3-haiku-20240307',
    provider: 'aihubmix',
    group: 'claude',
    owned_by: 'Anthropic'
  },
  {
    id: 'claude-3-5-haiku-20241022',
    name: 'claude-3-5-haiku-20241022',
    provider: 'aihubmix',
    group: 'claude',
    owned_by: 'Anthropic'
  },
  {
    id: 'claude-3-sonnet-20240229',
    name: 'claude-3-sonnet-20240229',
    provider: 'aihubmix',
    group: 'claude',
    owned_by: 'Anthropic'
  },
  {
    id: 'claude-3-opus-20240229',
    name: 'claude-3-opus-20240229',
    provider: 'aihubmix',
    group: 'claude',
    owned_by: 'Anthropic'
  },
  {
    id: 'claude-3-5-sonnet-20240620',
    name: 'claude-3-5-sonnet-20240620',
    provider: 'aihubmix',
    group: 'claude',
    owned_by: 'Anthropic'
  },
  {
    id: 'claude-3-5-sonnet-20241022',
    name: 'claude-3-5-sonnet-20241022',
    provider: 'aihubmix',
    group: 'claude',
    owned_by: 'Anthropic'
  },
  {
    id: 'claude-3-5-sonnet-latest',
    name: 'claude-3-5-sonnet-latest',
    provider: 'aihubmix',
    group: 'claude',
    owned_by: 'Anthropic'
  },
  {
    id: 'qwen-turbo',
    name: 'qwen-turbo',
    provider: 'aihubmix',
    group: 'qwen',
    owned_by: 'Qwen'
  },
  {
    id: 'qwen-plus',
    name: 'qwen-plus',
    provider: 'aihubmix',
    group: 'qwen',
    owned_by: 'Qwen'
  },
  {
    id: 'qwen-max',
    name: 'qwen-max',
    provider: 'aihubmix',
    group: 'qwen',
    owned_by: 'Qwen'
  },
  {
    id: 'qwen-max-longcontext',
    name: 'qwen-max-longcontext',
    provider: 'aihubmix',
    group: 'qwen',
    owned_by: 'Qwen'
  },
  {
    id: 'qwen2.5-72b-instruct',
    name: 'qwen2.5-72b-instruct',
    provider: 'aihubmix',
    group: 'qwen2.5',
    owned_by: 'Qwen'
  },
  {
    id: 'qwen2.5-32b-instruct',
    name: 'qwen2.5-32b-instruct',
    provider: 'aihubmix',
    group: 'qwen2.5',
    owned_by: 'Qwen'
  },
  {
    id: 'qwen2.5-14b-instruct',
    name: 'qwen2.5-14b-instruct',
    provider: 'aihubmix',
    group: 'qwen2.5',
    owned_by: 'Qwen'
  },
  {
    id: 'qwen2.5-7b-instruct',
    name: 'qwen2.5-7b-instruct',
    provider: 'aihubmix',
    group: 'qwen2.5',
    owned_by: 'Qwen'
  },
  {
    id: 'qwen2.5-3b-instruct',
    name: 'qwen2.5-3b-instruct',
    provider: 'aihubmix',
    group: 'qwen2.5',
    owned_by: 'Qwen'
  },
  {
    id: 'qwen2.5-math-72b-instruct',
    name: 'qwen2.5-math-72b-instruct',
    provider: 'aihubmix',
    group: 'qwen2.5',
    owned_by: 'Qwen'
  },
  {
    id: 'qwen2.5-math-7b-instruct',
    name: 'qwen2.5-math-7b-instruct',
    provider: 'aihubmix',
    group: 'qwen2.5',
    owned_by: 'Qwen'
  },
  {
    id: 'qwen2.5-coder-7b-instruct',
    name: 'qwen2.5-coder-7b-instruct',
    provider: 'aihubmix',
    group: 'qwen2.5',
    owned_by: 'Qwen'
  },
  {
    id: 'qwen2.5-coder-1.5b-instruct',
    name: 'qwen2.5-coder-1.5b-instruct',
    provider: 'aihubmix',
    group: 'qwen2.5',
    owned_by: 'Qwen'
  },
  {
    id: 'gemini-1.5-flash',
    name: 'gemini-1.5-flash',
    provider: 'aihubmix',
    group: 'gemini',
    owned_by: 'Google'
  },
  {
    id: 'gemini-1.5-pro',
    name: 'gemini-1.5-pro',
    provider: 'aihubmix',
    group: 'gemini',
    owned_by: 'Google'
  },
  {
    id: 'gemini-2.0-flash-exp',
    name: 'gemini-2.0-flash-exp',
    provider: 'aihubmix',
    group: 'gemini',
    owned_by: 'Google'
  },
  {
    id: 'gemini-2.0-flash-thinking-exp',
    name: 'gemini-2.0-flash-thinking-exp',
    provider: 'aihubmix',
    group: 'gemini',
    owned_by: 'Google'
  },
  {
    id: 'claude-opus-4-20250514',
    name: 'claude-opus-4-20250514',
    provider: 'aihubmix',
    group: 'claude',
    owned_by: 'Anthropic'
  },
  {
    id: 'claude-3-opus-20240229',
    name: 'claude-3-opus-20240229',
    provider: 'aihubmix',
    group: 'claude',
    owned_by: 'Anthropic'
  },
  {
    id: 'llama3-70b-8192',
    name: 'llama3-70b-8192',
    provider: 'aihubmix',
    group: 'llama3',
    owned_by: 'Meta'
  },
  {
    id: 'claude-sonnet-4-20250514',
    name: 'claude-sonnet-4-20250514',
    provider: 'aihubmix',
    group: 'claude',
    owned_by: 'Anthropic'
  },
  {
    id: 'claude-3-haiku-20240307',
    name: 'claude-3-haiku-20240307',
    provider: 'aihubmix',
    group: 'claude',
    owned_by: 'Anthropic'
  },
  {
    id: 'claude-3-5-haiku-20241022',
    name: 'claude-3-5-haiku-20241022',
    provider: 'aihubmix',
    group: 'claude',
    owned_by: 'Anthropic'
  },
  {
    id: 'claude-3-5-sonnet-latest',
    name: 'claude-3-5-sonnet-latest',
    provider: 'aihubmix',
    group: 'claude',
    owned_by: 'Anthropic'
  },
  {
    id: 'claude-3-5-sonnet-20240620',
    name: 'claude-3-5-sonnet-20240620',
    provider: 'aihubmix',
    group: 'claude',
    owned_by: 'Anthropic'
  },
  {
    id: 'claude-3-5-sonnet-20241022',
    name: 'claude-3-5-sonnet-20241022',
    provider: 'aihubmix',
    group: 'claude',
    owned_by: 'Anthropic'
  },
  {
    id: 'claude-3-7-sonnet-20250219',
    name: 'claude-3-7-sonnet-20250219',
    provider: 'aihubmix',
    group: 'claude',
    owned_by: 'Anthropic'
  },
  {
    id: 'llama3-8b-8192',
    name: 'llama3-8b-8192',
    provider: 'aihubmix',
    group: 'llama3',
    owned_by: 'Meta'
  },
  {
    id: 'claude-3-sonnet-20240229',
    name: 'claude-3-sonnet-20240229',
    provider: 'aihubmix',
    group: 'claude',
    owned_by: 'Anthropic'
  },
  {
    id: 'command',
    name: 'command',
    provider: 'aihubmix',
    group: 'command',
    owned_by: 'Cohere'
  },
  {
    id: 'command-nightly',
    name: 'command-nightly',
    provider: 'aihubmix',
    group: 'command',
    owned_by: 'Cohere'
  },
  {
    id: 'command-light',
    name: 'command-light',
    provider: 'aihubmix',
    group: 'command',
    owned_by: 'Cohere'
  },
  {
    id: 'command-light-nightly',
    name: 'command-light-nightly',
    provider: 'aihubmix',
    group: 'command',
    owned_by: 'Cohere'
  },
  {
    id: 'command-r',
    name: 'command-r',
    provider: 'aihubmix',
    group: 'command',
    owned_by: 'Cohere'
  },
  {
    id: 'command-r-plus',
    name: 'command-r-plus',
    provider: 'aihubmix',
    group: 'command',
    owned_by: 'Cohere'
  },
  {
    id: 'claude-3-5-sonnet@20240620',
    name: 'claude-3-5-sonnet@20240620',
    provider: 'aihubmix',
    group: 'claude',
    owned_by: 'Anthropic'
  },
  {
    id: 'gemini-1.5-pro-002',
    name: 'gemini-1.5-pro-002',
    provider: 'aihubmix',
    group: 'gemini',
    owned_by: 'Google'
  },
  {
    id: 'gemini-1.5-flash-002',
    name: 'gemini-1.5-flash-002',
    provider: 'aihubmix',
    group: 'gemini',
    owned_by: 'Google'
  },
  {
    id: 'gemini-2.0-flash-exp',
    name: 'gemini-2.0-flash-exp',
    provider: 'aihubmix',
    group: 'gemini',
    owned_by: 'Google'
  },
  {
    id: 'gemini-2.0-flash-thinking-exp',
    name: 'gemini-2.0-flash-thinking-exp',
    provider: 'aihubmix',
    group: 'gemini',
    owned_by: 'Google'
  },
  {
    id: 'jina-deepsearch-v1',
    name: 'jina-deepsearch-v1',
    provider: 'aihubmix',
    group: 'jina',
    owned_by: 'Jina AI'
  },
  {
    id: 'jina-embeddings-v3',
    name: 'jina-embeddings-v3',
    provider: 'aihubmix',
    group: 'jina',
    owned_by: 'Jina AI'
  },
  {
    id: 'jina-clip-v2',
    name: 'jina-clip-v2',
    provider: 'aihubmix',
    group: 'jina',
    owned_by: 'Jina AI'
  },
  {
    id: 'moonshot-v1-8k',
    name: 'moonshot-v1-8k',
    provider: 'aihubmix',
    group: 'moonshot',
    owned_by: 'moonshot'
  },
  {
    id: 'moonshot-v1-32k',
    name: 'moonshot-v1-32k',
    provider: 'aihubmix',
    group: 'moonshot',
    owned_by: 'moonshot'
  },
  {
    id: 'moonshot-v1-128k',
    name: 'moonshot-v1-128k',
    provider: 'aihubmix',
    group: 'moonshot',
    owned_by: 'moonshot'
  },
  {
    id: 'Doubao-pro-128k',
    name: 'Doubao-pro-128k',
    provider: 'aihubmix',
    group: 'doubao',
    owned_by: 'doubao'
  },
  {
    id: 'Doubao-pro-32k',
    name: 'Doubao-pro-32k',
    provider: 'aihubmix',
    group: 'doubao',
    owned_by: 'doubao'
  },
  {
    id: 'Doubao-pro-4k',
    name: 'Doubao-pro-4k',
    provider: 'aihubmix',
    group: 'doubao',
    owned_by: 'doubao'
  },
  {
    id: 'Doubao-lite-128k',
    name: 'Doubao-lite-128k',
    provider: 'aihubmix',
    group: 'doubao',
    owned_by: 'doubao'
  },
  {
    id: 'Doubao-lite-32k',
    name: 'Doubao-lite-32k',
    provider: 'aihubmix',
    group: 'doubao',
    owned_by: 'doubao'
  },
  {
    id: 'Doubao-lite-4k',
    name: 'Doubao-lite-4k',
    provider: 'aihubmix',
    group: 'doubao',
    owned_by: 'doubao'
  },
  {
    id: 'mistral-small-latest',
    name: 'mistral-small-latest',
    provider: 'aihubmix',
    group: 'mistral',
    owned_by: 'mistralai'
  },
  {
    id: 'mistral-large-latest',
    name: 'mistral-large-latest',
    provider: 'aihubmix',
    group: 'mistral',
    owned_by: 'mistralai'
  },
  {
    id: 'gemma2-9b-it',
    name: 'gemma2-9b-it',
    provider: 'aihubmix',
    group: 'gemma2',
    owned_by: 'groq'
  },
  {
    id: 'llama-3.1-70b-versatile',
    name: 'llama-3.1-70b-versatile',
    provider: 'aihubmix',
    group: 'llama',
    owned_by: 'groq'
  },
  {
    id: 'llama-3.1-8b-instant',
    name: 'llama-3.1-8b-instant',
    provider: 'aihubmix',
    group: 'llama',
    owned_by: 'groq'
  },
  {
    id: 'llama-3.2-11b-vision-preview',
    name: 'llama-3.2-11b-vision-preview',
    provider: 'aihubmix',
    group: 'llama',
    owned_by: 'groq'
  },
  {
    id: 'llama-3.2-1b-preview',
    name: 'llama-3.2-1b-preview',
    provider: 'aihubmix',
    group: 'llama',
    owned_by: 'groq'
  },
  {
    id: 'llama-3.2-3b-preview',
    name: 'llama-3.2-3b-preview',
    provider: 'aihubmix',
    group: 'llama',
    owned_by: 'groq'
  },
  {
    id: 'llama-3.2-11b-vision-preview',
    name: 'llama-3.2-11b-vision-preview',
    provider: 'aihubmix',
    group: 'llama',
    owned_by: 'groq'
  },
  {
    id: 'llama-3.2-90b-vision-preview',
    name: 'llama-3.2-90b-vision-preview',
    provider: 'aihubmix',
    group: 'llama',
    owned_by: 'groq'
  },
  {
    id: 'llama3-70b-8192',
    name: 'llama3-70b-8192',
    provider: 'aihubmix',
    group: 'llama3',
    owned_by: 'groq'
  },
  {
    id: 'llama3-8b-8192',
    name: 'llama3-8b-8192',
    provider: 'aihubmix',
    group: 'llama3',
    owned_by: 'groq'
  },
  {
    id: 'yi-34b-chat-0205',
    name: 'yi-34b-chat-0205',
    provider: 'aihubmix',
    group: 'yi',
    owned_by: 'lingyiwanwu'
  },
  {
    id: 'yi-34b-chat-200k',
    name: 'yi-34b-chat-200k',
    provider: 'aihubmix',
    group: 'yi',
    owned_by: 'lingyiwanwu'
  },
  {
    id: 'yi-vl-plus',
    name: 'yi-vl-plus',
    provider: 'aihubmix',
    group: 'yi',
    owned_by: 'lingyiwanwu'
  },
  {
    id: 'step-2-16k',
    name: 'step-2-16k',
    provider: 'aihubmix',
    group: 'step',
    owned_by: 'stepfun'
  },
  {
    id: 'deepseek-chat',
    name: 'deepseek-chat',
    provider: 'aihubmix',
    group: 'deepseek',
    owned_by: 'deepseek'
  },
  {
    id: 'THUDM/chatglm3-6b',
    name: 'THUDM/chatglm3-6b',
    provider: 'aihubmix',
    group: 'thudm',
    owned_by: 'siliconflow'
  },
  {
    id: 'THUDM/glm-4-9b-chat',
    name: 'THUDM/glm-4-9b-chat',
    provider: 'aihubmix',
    group: 'thudm',
    owned_by: 'siliconflow'
  },
  {
    id: 'Qwen/Qwen2-7B-Instruct',
    name: 'Qwen/Qwen2-7B-Instruct',
    provider: 'aihubmix',
    group: 'qwen',
    owned_by: 'siliconflow'
  },
  {
    id: 'THUDM/GLM-Z1-9B-0414',
    name: 'THUDM/GLM-Z1-9B-0414',
    provider: 'aihubmix',
    group: 'thudm',
    owned_by: 'custom'
  },
  {
    id: 'gemini-1.5-pro-exp-0801',
    name: 'gemini-1.5-pro-exp-0801',
    provider: 'aihubmix',
    group: 'gemini',
    owned_by: 'custom'
  },
  {
    id: 'AiHubmix-mistral-medium',
    name: 'AiHubmix-mistral-medium',
    provider: 'aihubmix',
    group: 'aihubmix',
    owned_by: 'custom'
  },
  {
    id: 'grok-3-mini-beta',
    name: 'grok-3-mini-beta',
    provider: 'aihubmix',
    group: 'grok',
    owned_by: 'custom'
  },
  {
    id: 'aihubmix-Mistral-Large-2411',
    name: 'aihubmix-Mistral-Large-2411',
    provider: 'aihubmix',
    group: 'aihubmix',
    owned_by: 'custom'
  },
  {
    id: 'gemini-2.0-flash-preview-image-generation',
    name: 'gemini-2.0-flash-preview-image-generation',
    provider: 'aihubmix',
    group: 'gemini',
    owned_by: 'custom'
  },
  {
    id: 'gemini-2.5-pro-preview-05-06',
    name: 'gemini-2.5-pro-preview-05-06',
    provider: 'aihubmix',
    group: 'gemini',
    owned_by: 'custom'
  },
  {
    id: 'o3-mini',
    name: 'o3-mini',
    provider: 'aihubmix',
    group: 'o3',
    owned_by: 'custom'
  },
  {
    id: 'Qwen/Qwen2.5-VL-72B-Instruct',
    name: 'Qwen/Qwen2.5-VL-72B-Instruct',
    provider: 'aihubmix',
    group: 'qwen',
    owned_by: 'custom'
  },
  {
    id: 'aihubmix-Llama-3-2-90B-Vision',
    name: 'aihubmix-Llama-3-2-90B-Vision',
    provider: 'aihubmix',
    group: 'aihubmix',
    owned_by: 'custom'
  },
  {
    id: 'ahm-Phi-3-5-mini-instruct',
    name: 'ahm-Phi-3-5-mini-instruct',
    provider: 'aihubmix',
    group: 'ahm',
    owned_by: 'custom'
  },
  {
    id: 'imagen-4.0-generate-preview-05-20',
    name: 'imagen-4.0-generate-preview-05-20',
    provider: 'aihubmix',
    group: 'imagen',
    owned_by: 'custom'
  },
  {
    id: 'aihubmix-command-r-08-2024',
    name: 'aihubmix-command-r-08-2024',
    provider: 'aihubmix',
    group: 'aihubmix',
    owned_by: 'custom'
  },
  {
    id: 'V_1_TURBO',
    name: 'V_1_TURBO',
    provider: 'aihubmix',
    group: 'v',
    owned_by: 'custom'
  },
  {
    id: 'V_1',
    name: 'V_1',
    provider: 'aihubmix',
    group: 'v',
    owned_by: 'custom'
  },
  {
    id: 'ahm-Phi-3-medium-128k',
    name: 'ahm-Phi-3-medium-128k',
    provider: 'aihubmix',
    group: 'ahm',
    owned_by: 'custom'
  },
  {
    id: 'aihubmix-Cohere-command-r',
    name: 'aihubmix-Cohere-command-r',
    provider: 'aihubmix',
    group: 'aihubmix',
    owned_by: 'custom'
  },
  {
    id: 'AiHubmix-Phi-4-mini-reasoning',
    name: 'AiHubmix-Phi-4-mini-reasoning',
    provider: 'aihubmix',
    group: 'aihubmix',
    owned_by: 'custom'
  },
  {
    id: 'gpt-4.5-preview-2025-02-27',
    name: 'gpt-4.5-preview-2025-02-27',
    provider: 'aihubmix',
    group: 'gpt',
    owned_by: 'custom'
  },
  {
    id: 'chutesai/Llama-4-Maverick-17B-128E-Instruct-FP8',
    name: 'chutesai/Llama-4-Maverick-17B-128E-Instruct-FP8',
    provider: 'aihubmix',
    group: 'chutesai',
    owned_by: 'custom'
  },
  {
    id: 'deepseek-ai/DeepSeek-V3-0324',
    name: 'deepseek-ai/DeepSeek-V3-0324',
    provider: 'aihubmix',
    group: 'deepseek-ai',
    owned_by: 'custom'
  },
  {
    id: 'DeepSeek-V3',
    name: 'DeepSeek-V3',
    provider: 'aihubmix',
    group: 'deepseek',
    owned_by: 'custom'
  },
  {
    id: 'Doubao-1.5-vision-pro-32k',
    name: 'Doubao-1.5-vision-pro-32k',
    provider: 'aihubmix',
    group: 'doubao',
    owned_by: 'custom'
  },
  {
    id: 'aihubmix-Llama-3-1-8B-Instruct',
    name: 'aihubmix-Llama-3-1-8B-Instruct',
    provider: 'aihubmix',
    group: 'aihubmix',
    owned_by: 'custom'
  },
  {
    id: 'aihubmix-command-r-plus',
    name: 'aihubmix-command-r-plus',
    provider: 'aihubmix',
    group: 'aihubmix',
    owned_by: 'custom'
  },
  {
    id: 'deepseek-ai/DeepSeek-V3',
    name: 'deepseek-ai/DeepSeek-V3',
    provider: 'aihubmix',
    group: 'deepseek-ai',
    owned_by: 'custom'
  },
  {
    id: 'tngtech/DeepSeek-R1T-Chimera',
    name: 'tngtech/DeepSeek-R1T-Chimera',
    provider: 'aihubmix',
    group: 'tngtech',
    owned_by: 'custom'
  },
  {
    id: 'AiHubmix-Phi-4-reasoning',
    name: 'AiHubmix-Phi-4-reasoning',
    provider: 'aihubmix',
    group: 'aihubmix',
    owned_by: 'custom'
  },
  {
    id: 'gemini-exp-1121',
    name: 'gemini-exp-1121',
    provider: 'aihubmix',
    group: 'gemini',
    owned_by: 'custom'
  },
  {
    id: 'codestral-latest',
    name: 'codestral-latest',
    provider: 'aihubmix',
    group: 'codestral',
    owned_by: 'custom'
  },
  {
    id: 'Qwen/Qwen2.5-7B-Instruct',
    name: 'Qwen/Qwen2.5-7B-Instruct',
    provider: 'aihubmix',
    group: 'qwen',
    owned_by: 'custom'
  },
  {
    id: 'aihubmix-Codestral-2501',
    name: 'aihubmix-Codestral-2501',
    provider: 'aihubmix',
    group: 'aihubmix',
    owned_by: 'custom'
  },
  {
    id: 'aihubmix-Llama-3-1-405B-Instruct',
    name: 'aihubmix-Llama-3-1-405B-Instruct',
    provider: 'aihubmix',
    group: 'aihubmix',
    owned_by: 'custom'
  },
  {
    id: 'deepseek-ai/DeepSeek-V2.5',
    name: 'deepseek-ai/DeepSeek-V2.5',
    provider: 'aihubmix',
    group: 'deepseek-ai',
    owned_by: 'custom'
  },
  {
    id: 'gemini-2.5-pro-exp-03-25',
    name: 'gemini-2.5-pro-exp-03-25',
    provider: 'aihubmix',
    group: 'gemini',
    owned_by: 'custom'
  },
  {
    id: 'learnlm-1.5-pro-experimental',
    name: 'learnlm-1.5-pro-experimental',
    provider: 'aihubmix',
    group: 'learnlm',
    owned_by: 'custom'
  },
  {
    id: 'Qwen/Qwen2.5-72B-Instruct-128K',
    name: 'Qwen/Qwen2.5-72B-Instruct-128K',
    provider: 'aihubmix',
    group: 'qwen',
    owned_by: 'custom'
  },
  {
    id: 'llama-3.3-70b-versatile',
    name: 'llama-3.3-70b-versatile',
    provider: 'aihubmix',
    group: 'llama',
    owned_by: 'custom'
  },
  {
    id: 'o1-pro',
    name: 'o1-pro',
    provider: 'aihubmix',
    group: 'o1',
    owned_by: 'custom'
  },
  {
    id: 'Baichuan3-Turbo-128k',
    name: 'Baichuan3-Turbo-128k',
    provider: 'aihubmix',
    group: 'baichuan3',
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
    id: 'MiniMax-Text-01',
    name: 'MiniMax-Text-01',
    provider: 'aihubmix',
    group: 'minimax',
    owned_by: 'custom'
  },
  {
    id: 'omni-moderation-latest',
    name: 'omni-moderation-latest',
    provider: 'aihubmix',
    group: 'omni',
    owned_by: 'custom'
  },
  {
    id: 'Aihubmix-MAI-DS-R1',
    name: 'Aihubmix-MAI-DS-R1',
    provider: 'aihubmix',
    group: 'aihubmix',
    owned_by: 'custom'
  },
  {
    id: 'gemini-2.5-flash-preview-04-17-nothink',
    name: 'gemini-2.5-flash-preview-04-17-nothink',
    provider: 'aihubmix',
    group: 'gemini',
    owned_by: 'custom'
  },
  {
    id: 'grok-2-1212',
    name: 'grok-2-1212',
    provider: 'aihubmix',
    group: 'grok',
    owned_by: 'custom'
  },
  {
    id: 'aihubmix-router',
    name: 'aihubmix-router',
    provider: 'aihubmix',
    group: 'aihubmix',
    owned_by: 'custom'
  },
  {
    id: 'gemini-2.0-flash-001',
    name: 'gemini-2.0-flash-001',
    provider: 'aihubmix',
    group: 'gemini',
    owned_by: 'custom'
  },
  {
    id: 'Doubao-1.5-lite-32k',
    name: 'Doubao-1.5-lite-32k',
    provider: 'aihubmix',
    group: 'doubao',
    owned_by: 'custom'
  },
  {
    id: 'UPSCALE',
    name: 'UPSCALE',
    provider: 'aihubmix',
    group: 'upscale',
    owned_by: 'custom'
  },
  {
    id: 'aihub-Phi-4-mini-instruct',
    name: 'aihub-Phi-4-mini-instruct',
    provider: 'aihubmix',
    group: 'aihub',
    owned_by: 'custom'
  },
  {
    id: 'chutesai/Mistral-Small-3.1-24B-Instruct-2503',
    name: 'chutesai/Mistral-Small-3.1-24B-Instruct-2503',
    provider: 'aihubmix',
    group: 'chutesai',
    owned_by: 'custom'
  },
  {
    id: 'gemini-1.5-flash-exp-0827',
    name: 'gemini-1.5-flash-exp-0827',
    provider: 'aihubmix',
    group: 'gemini',
    owned_by: 'custom'
  },
  {
    id: 'gemini-2.0-flash-exp-image-generation',
    name: 'gemini-2.0-flash-exp-image-generation',
    provider: 'aihubmix',
    group: 'gemini',
    owned_by: 'custom'
  },
  {
    id: 'THUDM/GLM-4-32B-0414',
    name: 'THUDM/GLM-4-32B-0414',
    provider: 'aihubmix',
    group: 'thudm',
    owned_by: 'custom'
  },
  {
    id: 'Qwen/QwQ-32B-Preview',
    name: 'Qwen/QwQ-32B-Preview',
    provider: 'aihubmix',
    group: 'qwen',
    owned_by: 'custom'
  },
  {
    id: 'V3',
    name: 'V3',
    provider: 'aihubmix',
    group: 'v3',
    owned_by: 'custom'
  },
  {
    id: 'o4-mini',
    name: 'o4-mini',
    provider: 'aihubmix',
    group: 'o4',
    owned_by: 'custom'
  },
  {
    id: 'yi-lightning',
    name: 'yi-lightning',
    provider: 'aihubmix',
    group: 'yi',
    owned_by: 'custom'
  },
  {
    id: 'gemini-2.0-flash-lite-preview-02-05',
    name: 'gemini-2.0-flash-lite-preview-02-05',
    provider: 'aihubmix',
    group: 'gemini',
    owned_by: 'custom'
  },
  {
    id: 'gpt-4o-audio-preview',
    name: 'gpt-4o-audio-preview',
    provider: 'aihubmix',
    group: 'gpt',
    owned_by: 'custom'
  },
  {
    id: 'meta-llama/llama-4-scout-17b-16e-instruct',
    name: 'meta-llama/llama-4-scout-17b-16e-instruct',
    provider: 'aihubmix',
    group: 'meta-llama',
    owned_by: 'custom'
  },
  {
    id: 'aihubmix-Jamba-1-5-Large',
    name: 'aihubmix-Jamba-1-5-Large',
    provider: 'aihubmix',
    group: 'aihubmix',
    owned_by: 'custom'
  },
  {
    id: 'gemini-2.5-pro-preview-03-25-search',
    name: 'gemini-2.5-pro-preview-03-25-search',
    provider: 'aihubmix',
    group: 'gemini',
    owned_by: 'custom'
  },
  {
    id: 'Qwen/Qwen2.5-72B-Instruct',
    name: 'Qwen/Qwen2.5-72B-Instruct',
    provider: 'aihubmix',
    group: 'qwen',
    owned_by: 'custom'
  },
  {
    id: 'Qwen/Qwen2.5-Coder-32B-Instruct',
    name: 'Qwen/Qwen2.5-Coder-32B-Instruct',
    provider: 'aihubmix',
    group: 'qwen',
    owned_by: 'custom'
  },
  {
    id: 'deepseek-ai/DeepSeek-R1-Distill-Qwen-14B',
    name: 'deepseek-ai/DeepSeek-R1-Distill-Qwen-14B',
    provider: 'aihubmix',
    group: 'deepseek-ai',
    owned_by: 'custom'
  },
  {
    id: 'deepseek-r1-250120',
    name: 'deepseek-r1-250120',
    provider: 'aihubmix',
    group: 'deepseek',
    owned_by: 'custom'
  },
  {
    id: 'imagen-4.0-ultra-generate-exp-05-20',
    name: 'imagen-4.0-ultra-generate-exp-05-20',
    provider: 'aihubmix',
    group: 'imagen',
    owned_by: 'custom'
  },
  {
    id: 'DESCRIBE',
    name: 'DESCRIBE',
    provider: 'aihubmix',
    group: 'describe',
    owned_by: 'custom'
  },
  {
    id: 'aihubmix-DeepSeek-R1',
    name: 'aihubmix-DeepSeek-R1',
    provider: 'aihubmix',
    group: 'aihubmix',
    owned_by: 'custom'
  },
  {
    id: 'Qwen/Qwen3-32B',
    name: 'Qwen/Qwen3-32B',
    provider: 'aihubmix',
    group: 'qwen',
    owned_by: 'custom'
  },
  {
    id: 'gemini-2.0-flash-exp-search',
    name: 'gemini-2.0-flash-exp-search',
    provider: 'aihubmix',
    group: 'gemini',
    owned_by: 'custom'
  },
  {
    id: 'gemini-2.5-pro-preview-03-25',
    name: 'gemini-2.5-pro-preview-03-25',
    provider: 'aihubmix',
    group: 'gemini',
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
    id: 'gemini-embedding-exp-03-07',
    name: 'gemini-embedding-exp-03-07',
    provider: 'aihubmix',
    group: 'gemini',
    owned_by: 'custom'
  },
  {
    id: 'claude-3-opus-latest',
    name: 'claude-3-opus-latest',
    provider: 'aihubmix',
    group: 'claude',
    owned_by: 'custom'
  },
  {
    id: 'gemini-2.0-flash-thinking-exp-1219',
    name: 'gemini-2.0-flash-thinking-exp-1219',
    provider: 'aihubmix',
    group: 'gemini',
    owned_by: 'custom'
  },
  {
    id: 'Baichuan4-Air',
    name: 'Baichuan4-Air',
    provider: 'aihubmix',
    group: 'baichuan4',
    owned_by: 'custom'
  },
  {
    id: 'text-moderation-latest',
    name: 'text-moderation-latest',
    provider: 'aihubmix',
    group: 'text',
    owned_by: 'custom'
  },
  {
    id: 'codex-mini-latest',
    name: 'codex-mini-latest',
    provider: 'aihubmix',
    group: 'codex',
    owned_by: 'custom'
  },
  {
    id: 'ahm-Phi-3-5-MoE-instruct',
    name: 'ahm-Phi-3-5-MoE-instruct',
    provider: 'aihubmix',
    group: 'ahm',
    owned_by: 'custom'
  },
  {
    id: 'aihubmix-Mistral-large',
    name: 'aihubmix-Mistral-large',
    provider: 'aihubmix',
    group: 'aihubmix',
    owned_by: 'custom'
  },
  {
    id: 'gpt-4.1-mini',
    name: 'gpt-4.1-mini',
    provider: 'aihubmix',
    group: 'gpt',
    owned_by: 'custom'
  },
  {
    id: 'qwen-qwq-32b',
    name: 'qwen-qwq-32b',
    provider: 'aihubmix',
    group: 'qwen',
    owned_by: 'custom'
  },
  {
    id: 'V_2',
    name: 'V_2',
    provider: 'aihubmix',
    group: 'v',
    owned_by: 'custom'
  },
  {
    id: 'THUDM/GLM-Z1-32B-0414',
    name: 'THUDM/GLM-Z1-32B-0414',
    provider: 'aihubmix',
    group: 'thudm',
    owned_by: 'custom'
  },
  {
    id: 'Qwen/Qwen3-30B-A3B',
    name: 'Qwen/Qwen3-30B-A3B',
    provider: 'aihubmix',
    group: 'qwen',
    owned_by: 'custom'
  },
  {
    id: 'gemini-2.0-flash-thinking-exp-01-21',
    name: 'gemini-2.0-flash-thinking-exp-01-21',
    provider: 'aihubmix',
    group: 'gemini',
    owned_by: 'custom'
  },
  {
    id: 'grok-3-fast-beta',
    name: 'grok-3-fast-beta',
    provider: 'aihubmix',
    group: 'grok',
    owned_by: 'custom'
  },
  {
    id: 'grok-vision-beta',
    name: 'grok-vision-beta',
    provider: 'aihubmix',
    group: 'grok',
    owned_by: 'custom'
  },
  {
    id: 'moonshot-v1-128k-vision-preview',
    name: 'moonshot-v1-128k-vision-preview',
    provider: 'aihubmix',
    group: 'moonshot',
    owned_by: 'custom'
  },
  {
    id: 'meta-llama/Llama-3.2-90B-Vision-Instruct',
    name: 'meta-llama/Llama-3.2-90B-Vision-Instruct',
    provider: 'aihubmix',
    group: 'meta-llama',
    owned_by: 'custom'
  },
  {
    id: 'aihubmix-Llama-3-70B-Instruct',
    name: 'aihubmix-Llama-3-70B-Instruct',
    provider: 'aihubmix',
    group: 'aihubmix',
    owned_by: 'custom'
  },
  {
    id: 'grok-beta',
    name: 'grok-beta',
    provider: 'aihubmix',
    group: 'grok',
    owned_by: 'custom'
  },
  {
    id: 'gemini-2.0-flash',
    name: 'gemini-2.0-flash',
    provider: 'aihubmix',
    group: 'gemini',
    owned_by: 'custom'
  },
  {
    id: 'Qwen/Qwen3-14B',
    name: 'Qwen/Qwen3-14B',
    provider: 'aihubmix',
    group: 'qwen',
    owned_by: 'custom'
  },
  {
    id: 'Mistral-large-2407',
    name: 'Mistral-large-2407',
    provider: 'aihubmix',
    group: 'mistral',
    owned_by: 'custom'
  },
  {
    id: 'THUDM/GLM-4-9B-0414',
    name: 'THUDM/GLM-4-9B-0414',
    provider: 'aihubmix',
    group: 'thudm',
    owned_by: 'custom'
  },
  {
    id: 'command-a-03-2025',
    name: 'command-a-03-2025',
    provider: 'aihubmix',
    group: 'command',
    owned_by: 'custom'
  },
  {
    id: 'Qwen/QwQ-32B',
    name: 'Qwen/QwQ-32B',
    provider: 'aihubmix',
    group: 'qwen',
    owned_by: 'custom'
  },
  {
    id: 'moonshot-v1-32k-vision-preview',
    name: 'moonshot-v1-32k-vision-preview',
    provider: 'aihubmix',
    group: 'moonshot',
    owned_by: 'custom'
  },
  {
    id: 'Doubao-1.5-pro-32k',
    name: 'Doubao-1.5-pro-32k',
    provider: 'aihubmix',
    group: 'doubao',
    owned_by: 'custom'
  },
  {
    id: 'V_2A_TURBO',
    name: 'V_2A_TURBO',
    provider: 'aihubmix',
    group: 'v',
    owned_by: 'custom'
  },
  {
    id: 'gpt-4o-mini-search-preview',
    name: 'gpt-4o-mini-search-preview',
    provider: 'aihubmix',
    group: 'gpt',
    owned_by: 'custom'
  },
  {
    id: 'imagen-3.0-generate-002',
    name: 'imagen-3.0-generate-002',
    provider: 'aihubmix',
    group: 'imagen',
    owned_by: 'custom'
  },
  {
    id: 'Doubao-1.5-pro-256k',
    name: 'Doubao-1.5-pro-256k',
    provider: 'aihubmix',
    group: 'doubao',
    owned_by: 'custom'
  },
  {
    id: 'o3',
    name: 'o3',
    provider: 'aihubmix',
    group: 'o3',
    owned_by: 'custom'
  },
  {
    id: 'deepseek-ai/DeepSeek-R1-Distill-Qwen-7B',
    name: 'deepseek-ai/DeepSeek-R1-Distill-Qwen-7B',
    provider: 'aihubmix',
    group: 'deepseek-ai',
    owned_by: 'custom'
  },
  {
    id: 'Baichuan3-Turbo',
    name: 'Baichuan3-Turbo',
    provider: 'aihubmix',
    group: 'baichuan3',
    owned_by: 'custom'
  },
  {
    id: 'aihub-Phi-4-multimodal-instruct',
    name: 'aihub-Phi-4-multimodal-instruct',
    provider: 'aihubmix',
    group: 'aihub',
    owned_by: 'custom'
  },
  {
    id: 'computer-use-preview',
    name: 'computer-use-preview',
    provider: 'aihubmix',
    group: 'computer',
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
    id: 'nvidia/Llama-3_1-Nemotron-Ultra-253B-v1',
    name: 'nvidia/Llama-3_1-Nemotron-Ultra-253B-v1',
    provider: 'aihubmix',
    group: 'nvidia',
    owned_by: 'custom'
  },
  {
    id: 'Baichuan4',
    name: 'Baichuan4',
    provider: 'aihubmix',
    group: 'baichuan4',
    owned_by: 'custom'
  },
  {
    id: 'Qwen/Qwen2.5-VL-32B-Instruct',
    name: 'Qwen/Qwen2.5-VL-32B-Instruct',
    provider: 'aihubmix',
    group: 'qwen',
    owned_by: 'custom'
  },
  {
    id: 'ahm-Phi-3-medium-4k',
    name: 'ahm-Phi-3-medium-4k',
    provider: 'aihubmix',
    group: 'ahm',
    owned_by: 'custom'
  },
  {
    id: 'chutesai/Llama-4-Scout-17B-16E-Instruct',
    name: 'chutesai/Llama-4-Scout-17B-16E-Instruct',
    provider: 'aihubmix',
    group: 'chutesai',
    owned_by: 'custom'
  },
  {
    id: 'claude-3-7-sonnet-latest',
    name: 'claude-3-7-sonnet-latest',
    provider: 'aihubmix',
    group: 'claude',
    owned_by: 'custom'
  },
  {
    id: 'llama-3.1-70b',
    name: 'llama-3.1-70b',
    provider: 'aihubmix',
    group: 'llama',
    owned_by: 'custom'
  },
  {
    id: 'Baichuan4-Turbo',
    name: 'Baichuan4-Turbo',
    provider: 'aihubmix',
    group: 'baichuan4',
    owned_by: 'custom'
  },
  {
    id: 'gemini-exp-1114',
    name: 'gemini-exp-1114',
    provider: 'aihubmix',
    group: 'gemini',
    owned_by: 'custom'
  },
  {
    id: 'gpt-4.1-nano',
    name: 'gpt-4.1-nano',
    provider: 'aihubmix',
    group: 'gpt',
    owned_by: 'custom'
  },
  {
    id: 'yi-large-turbo',
    name: 'yi-large-turbo',
    provider: 'aihubmix',
    group: 'yi',
    owned_by: 'custom'
  },
  {
    id: 'yi-medium',
    name: 'yi-medium',
    provider: 'aihubmix',
    group: 'yi',
    owned_by: 'custom'
  },
  {
    id: 'anthropic-3-5-sonnet-20241022',
    name: 'anthropic-3-5-sonnet-20241022',
    provider: 'aihubmix',
    group: 'anthropic',
    owned_by: 'custom'
  },
  {
    id: 'gemini-2.5-pro-preview-05-06-search',
    name: 'gemini-2.5-pro-preview-05-06-search',
    provider: 'aihubmix',
    group: 'gemini',
    owned_by: 'custom'
  },
  {
    id: 'gpt-4o-image-vip',
    name: 'gpt-4o-image-vip',
    provider: 'aihubmix',
    group: 'gpt',
    owned_by: 'custom'
  },
  {
    id: 'grok-3-beta',
    name: 'grok-3-beta',
    provider: 'aihubmix',
    group: 'grok',
    owned_by: 'custom'
  },
  {
    id: 'Qwen/Qwen3-8B',
    name: 'Qwen/Qwen3-8B',
    provider: 'aihubmix',
    group: 'qwen',
    owned_by: 'custom'
  },
  {
    id: 'jina-embeddings-v2-base-code',
    name: 'jina-embeddings-v2-base-code',
    provider: 'aihubmix',
    group: 'jina',
    owned_by: 'custom'
  },
  {
    id: 'veo-2.0-generate-001',
    name: 'veo-2.0-generate-001',
    provider: 'aihubmix',
    group: 'veo',
    owned_by: 'custom'
  },
  {
    id: 'gemini-2.0-flash-lite',
    name: 'gemini-2.0-flash-lite',
    provider: 'aihubmix',
    group: 'gemini',
    owned_by: 'custom'
  },
  {
    id: 'deepseek-ai/DeepSeek-Prover-V2-671B',
    name: 'deepseek-ai/DeepSeek-Prover-V2-671B',
    provider: 'aihubmix',
    group: 'deepseek-ai',
    owned_by: 'custom'
  },
  {
    id: 'deepseek-r1-distill-llama-70b',
    name: 'deepseek-r1-distill-llama-70b',
    provider: 'aihubmix',
    group: 'deepseek',
    owned_by: 'custom'
  },
  {
    id: 'gemini-2.5-flash-preview-05-20-nothink',
    name: 'gemini-2.5-flash-preview-05-20-nothink',
    provider: 'aihubmix',
    group: 'gemini',
    owned_by: 'custom'
  },
  {
    id: 'llama-3.1-405b-instruct',
    name: 'llama-3.1-405b-instruct',
    provider: 'aihubmix',
    group: 'llama',
    owned_by: 'custom'
  },
  {
    id: 'gemini-2.5-flash-preview-05-20',
    name: 'gemini-2.5-flash-preview-05-20',
    provider: 'aihubmix',
    group: 'gemini',
    owned_by: 'custom'
  },
  {
    id: 'anthropic-3-7-sonnet-20250219',
    name: 'anthropic-3-7-sonnet-20250219',
    provider: 'aihubmix',
    group: 'anthropic',
    owned_by: 'custom'
  },
  {
    id: 'claude-3-5-haiku-latest',
    name: 'claude-3-5-haiku-latest',
    provider: 'aihubmix',
    group: 'claude',
    owned_by: 'custom'
  },
  {
    id: 'deepseek-v3-250324',
    name: 'deepseek-v3-250324',
    provider: 'aihubmix',
    group: 'deepseek',
    owned_by: 'custom'
  },
  {
    id: 'Doubao-pro-256k',
    name: 'Doubao-pro-256k',
    provider: 'aihubmix',
    group: 'doubao',
    owned_by: 'custom'
  },
  {
    id: 'kimi-thinking-preview',
    name: 'kimi-thinking-preview',
    provider: 'aihubmix',
    group: 'kimi',
    owned_by: 'custom'
  },
  {
    id: 'moonshot-v1-8k-vision-preview',
    name: 'moonshot-v1-8k-vision-preview',
    provider: 'aihubmix',
    group: 'moonshot',
    owned_by: 'custom'
  },
  {
    id: 'yi-large',
    name: 'yi-large',
    provider: 'aihubmix',
    group: 'yi',
    owned_by: 'custom'
  },
  {
    id: 'V_2A',
    name: 'V_2A',
    provider: 'aihubmix',
    group: 'v',
    owned_by: 'custom'
  },
  {
    id: 'aihubmix-command-r-plus-08-2024',
    name: 'aihubmix-command-r-plus-08-2024',
    provider: 'aihubmix',
    group: 'aihubmix',
    owned_by: 'custom'
  },
  {
    id: 'gemini-1.5-pro-exp-0827',
    name: 'gemini-1.5-pro-exp-0827',
    provider: 'aihubmix',
    group: 'gemini',
    owned_by: 'custom'
  },
  {
    id: 'gemini-2.0-pro-exp-02-05-search',
    name: 'gemini-2.0-pro-exp-02-05-search',
    provider: 'aihubmix',
    group: 'gemini',
    owned_by: 'custom'
  },
  {
    id: 'gpt-4.5-preview',
    name: 'gpt-4.5-preview',
    provider: 'aihubmix',
    group: 'gpt',
    owned_by: 'custom'
  },
  {
    id: 'grok-2-vision-1212',
    name: 'grok-2-vision-1212',
    provider: 'aihubmix',
    group: 'grok',
    owned_by: 'custom'
  },
  {
    id: 'Qwen/Qwen2.5-32B-Instruct',
    name: 'Qwen/Qwen2.5-32B-Instruct',
    provider: 'aihubmix',
    group: 'qwen',
    owned_by: 'custom'
  },
  {
    id: 'deepseek-ai/DeepSeek-R1-Distill-Qwen-1.5B',
    name: 'deepseek-ai/DeepSeek-R1-Distill-Qwen-1.5B',
    provider: 'aihubmix',
    group: 'deepseek-ai',
    owned_by: 'custom'
  },
  {
    id: 'gemini-2.0-pro-exp-02-05',
    name: 'gemini-2.0-pro-exp-02-05',
    provider: 'aihubmix',
    group: 'gemini',
    owned_by: 'custom'
  },
  {
    id: 'gpt-4o-search-preview',
    name: 'gpt-4o-search-preview',
    provider: 'aihubmix',
    group: 'gpt',
    owned_by: 'custom'
  },
  {
    id: 'grok-3-mini-fast-beta',
    name: 'grok-3-mini-fast-beta',
    provider: 'aihubmix',
    group: 'grok',
    owned_by: 'custom'
  },
  {
    id: 'qwen-max-0125',
    name: 'qwen-max-0125',
    provider: 'aihubmix',
    group: 'qwen',
    owned_by: 'custom'
  },
  {
    id: 'ahm-Phi-3-5-vision-instruct',
    name: 'ahm-Phi-3-5-vision-instruct',
    provider: 'aihubmix',
    group: 'ahm',
    owned_by: 'custom'
  },
  {
    id: 'deepseek-ai/DeepSeek-R1-Distill-Qwen-32B',
    name: 'deepseek-ai/DeepSeek-R1-Distill-Qwen-32B',
    provider: 'aihubmix',
    group: 'deepseek-ai',
    owned_by: 'custom'
  },
  {
    id: 'deepseek-ai/DeepSeek-R1-Zero',
    name: 'deepseek-ai/DeepSeek-R1-Zero',
    provider: 'aihubmix',
    group: 'deepseek-ai',
    owned_by: 'custom'
  },
  {
    id: 'nvidia/llama-3.1-nemotron-70b-instruct',
    name: 'nvidia/llama-3.1-nemotron-70b-instruct',
    provider: 'aihubmix',
    group: 'nvidia',
    owned_by: 'custom'
  },
  {
    id: 'qwen-turbo-2024-11-01',
    name: 'qwen-turbo-2024-11-01',
    provider: 'aihubmix',
    group: 'qwen',
    owned_by: 'custom'
  },
  {
    id: 'anthropic-3-5-sonnet-20240620',
    name: 'anthropic-3-5-sonnet-20240620',
    provider: 'aihubmix',
    group: 'anthropic',
    owned_by: 'custom'
  },
  {
    id: 'google/gemma-3-27b-it',
    name: 'google/gemma-3-27b-it',
    provider: 'aihubmix',
    group: 'google',
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
    id: 'kimi-latest',
    name: 'kimi-latest',
    provider: 'aihubmix',
    group: 'kimi',
    owned_by: 'custom'
  },
  {
    id: 'command-r-plus-08-2024',
    name: 'command-r-plus-08-2024',
    provider: 'aihubmix',
    group: 'command',
    owned_by: 'custom'
  },
  {
    id: 'gpt-4o-audio-preview-2024-10-01',
    name: 'gpt-4o-audio-preview-2024-10-01',
    provider: 'aihubmix',
    group: 'gpt',
    owned_by: 'custom'
  },
  {
    id: 'gpt-4o-image',
    name: 'gpt-4o-image',
    provider: 'aihubmix',
    group: 'gpt',
    owned_by: 'custom'
  },
  {
    id: 'gpt-image-1',
    name: 'gpt-image-1',
    provider: 'aihubmix',
    group: 'gpt',
    owned_by: 'custom'
  },
  {
    id: 'aihubmix-Mistral-large-2407',
    name: 'aihubmix-Mistral-large-2407',
    provider: 'aihubmix',
    group: 'aihubmix',
    owned_by: 'custom'
  },
  {
    id: 'gemini-exp-1206',
    name: 'gemini-exp-1206',
    provider: 'aihubmix',
    group: 'gemini',
    owned_by: 'custom'
  },
  {
    id: 'aihub-Phi-4',
    name: 'aihub-Phi-4',
    provider: 'aihubmix',
    group: 'aihub',
    owned_by: 'custom'
  },
  {
    id: 'moonshotai/Moonlight-16B-A3B-Instruct',
    name: 'moonshotai/Moonlight-16B-A3B-Instruct',
    provider: 'aihubmix',
    group: 'moonshotai',
    owned_by: 'custom'
  },
  {
    id: 'deepseek-ai/deepseek-vl2',
    name: 'deepseek-ai/deepseek-vl2',
    provider: 'aihubmix',
    group: 'deepseek-ai',
    owned_by: 'custom'
  },
  {
    id: 'Qwen/QVQ-72B-Preview',
    name: 'Qwen/QVQ-72B-Preview',
    provider: 'aihubmix',
    group: 'qwen',
    owned_by: 'custom'
  },
  {
    id: 'jina-colbert-v2',
    name: 'jina-colbert-v2',
    provider: 'aihubmix',
    group: 'jina',
    owned_by: 'custom'
  },
  {
    id: 'Doubao-1.5-thinking-pro',
    name: 'Doubao-1.5-thinking-pro',
    provider: 'aihubmix',
    group: 'doubao',
    owned_by: 'custom'
  },
  {
    id: 'aihubmix-Llama-3-3-70B-Instruct',
    name: 'aihubmix-Llama-3-3-70B-Instruct',
    provider: 'aihubmix',
    group: 'aihubmix',
    owned_by: 'custom'
  },
  {
    id: 'gpt-4o-mini-tts',
    name: 'gpt-4o-mini-tts',
    provider: 'aihubmix',
    group: 'gpt',
    owned_by: 'custom'
  },
  {
    id: 'qwen-long',
    name: 'qwen-long',
    provider: 'aihubmix',
    group: 'qwen',
    owned_by: 'custom'
  },
  {
    id: 'aihubmix-Llama-3-1-70B-Instruct',
    name: 'aihubmix-Llama-3-1-70B-Instruct',
    provider: 'aihubmix',
    group: 'aihubmix',
    owned_by: 'custom'
  },
  {
    id: 'command-r-08-2024',
    name: 'command-r-08-2024',
    provider: 'aihubmix',
    group: 'command',
    owned_by: 'custom'
  },
  {
    id: 'gemini-2.0-flash-lite-001',
    name: 'gemini-2.0-flash-lite-001',
    provider: 'aihubmix',
    group: 'gemini',
    owned_by: 'custom'
  },
  {
    id: 'google/gemma-2-27b-it',
    name: 'google/gemma-2-27b-it',
    provider: 'aihubmix',
    group: 'google',
    owned_by: 'custom'
  },
  {
    id: 'unsloth/gemma-3-27b-it',
    name: 'unsloth/gemma-3-27b-it',
    provider: 'aihubmix',
    group: 'unsloth',
    owned_by: 'custom'
  },
  {
    id: 'aihubmix-Llama-3-2-11B-Vision',
    name: 'aihubmix-Llama-3-2-11B-Vision',
    provider: 'aihubmix',
    group: 'aihubmix',
    owned_by: 'custom'
  },
  {
    id: 'deepseek-ai/DeepSeek-R1',
    name: 'deepseek-ai/DeepSeek-R1',
    provider: 'aihubmix',
    group: 'deepseek-ai',
    owned_by: 'custom'
  },
  {
    id: 'qwen2.5-vl-72b-instruct',
    name: 'qwen2.5-vl-72b-instruct',
    provider: 'aihubmix',
    group: 'qwen2.5',
    owned_by: 'custom'
  },
  {
    id: 'ahm-Phi-3-small-128k',
    name: 'ahm-Phi-3-small-128k',
    provider: 'aihubmix',
    group: 'ahm',
    owned_by: 'custom'
  },
  {
    id: 'V_2_TURBO',
    name: 'V_2_TURBO',
    provider: 'aihubmix',
    group: 'v',
    owned_by: 'custom'
  },
  {
    id: 'gemini-2.0-flash-search',
    name: 'gemini-2.0-flash-search',
    provider: 'aihubmix',
    group: 'gemini',
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
    id: 'yi-large-rag',
    name: 'yi-large-rag',
    provider: 'aihubmix',
    group: 'yi',
    owned_by: 'custom'
  },
  {
    id: 'unsloth/gemma-3-12b-it',
    name: 'unsloth/gemma-3-12b-it',
    provider: 'aihubmix',
    group: 'unsloth',
    owned_by: 'custom'
  }
]

export const SYSTEM_MODELS: Record<string, Model[]> = {
  silicon: SILICON_MODELS,
  gemini: GEMINI_MODELS,
  aihubmix: AIHUBMIX_MODELS
}
