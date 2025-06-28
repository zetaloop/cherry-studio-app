import OpenAI from 'openai'

import { Provider } from '@/types/assistant'
import {
  OpenAIResponseSdkMessageParam,
  OpenAIResponseSdkParams,
  OpenAIResponseSdkRawChunk,
  OpenAIResponseSdkRawOutput,
  OpenAIResponseSdkTool,
  OpenAIResponseSdkToolCall
} from '@/types/sdk'

import { OpenAIAPIClient } from './OpenAIApiClient'
import { OpenAIBaseClient } from './OpenAIBaseClient'

export class OpenAIResponseAPIClient extends OpenAIBaseClient<
  OpenAI,
  OpenAIResponseSdkParams,
  OpenAIResponseSdkRawOutput,
  OpenAIResponseSdkRawChunk,
  OpenAIResponseSdkMessageParam,
  OpenAIResponseSdkToolCall,
  OpenAIResponseSdkTool
> {
  private client: OpenAIAPIClient
  constructor(provider: Provider) {
    super(provider)
    this.client = new OpenAIAPIClient(provider)
  }
}
