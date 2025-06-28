import OpenAI, { AzureOpenAI } from 'openai'
import { ChatCompletionTool } from 'openai/resources'

import { Provider } from '@/types/assistant'
// For Copilot token
import { OpenAISdkMessageParam, OpenAISdkParams, OpenAISdkRawChunk, OpenAISdkRawOutput } from '@/types/sdk'

import { OpenAIBaseClient } from './OpenAIBaseClient'

export class OpenAIAPIClient extends OpenAIBaseClient<
  OpenAI | AzureOpenAI,
  OpenAISdkParams,
  OpenAISdkRawOutput,
  OpenAISdkRawChunk,
  OpenAISdkMessageParam,
  OpenAI.Chat.Completions.ChatCompletionMessageToolCall,
  ChatCompletionTool
> {
  constructor(provider: Provider) {
    super(provider)
  }
}
