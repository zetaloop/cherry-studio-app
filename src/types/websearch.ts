import type { WebSearchResultBlock } from '@anthropic-ai/sdk/resources'
import type { GroundingMetadata } from '@google/genai'
import type OpenAI from 'openai'

export enum WebSearchSource {
  WEBSEARCH = 'websearch',
  OPENAI = 'openai',
  OPENAI_RESPONSE = 'openai-response',
  OPENROUTER = 'openrouter',
  ANTHROPIC = 'anthropic',
  GEMINI = 'gemini',
  PERPLEXITY = 'perplexity',
  QWEN = 'qwen',
  HUNYUAN = 'hunyuan',
  ZHIPU = 'zhipu'
}

export type WebSearchResponse = {
  results: WebSearchResults
  source: WebSearchSource
}

export type WebSearchProviderResult = {
  title: string
  content: string
  url: string
}

export type WebSearchProviderResponse = {
  query?: string
  results: WebSearchProviderResult[]
}

export type WebSearchResults =
  | WebSearchProviderResponse
  | GroundingMetadata
  | OpenAI.Chat.Completions.ChatCompletionMessage.Annotation.URLCitation[]
  | OpenAI.Responses.ResponseOutputText.URLCitation[]
  | WebSearchResultBlock[]
  | any[]

export interface Citation {
  number: number
  url: string
  title?: string
  hostname?: string
  content?: string
  showFavicon?: boolean
  type?: string
  metadata?: Record<string, any>
}
