import Anthropic from '@anthropic-ai/sdk'
import { ToolUseBlock } from '@anthropic-ai/sdk/resources'
import { ToolUnion } from '@anthropic-ai/sdk/resources/messages'

import { Provider } from '@/types/assistant'
import { AnthropicSdkMessageParam, AnthropicSdkParams, AnthropicSdkRawChunk, AnthropicSdkRawOutput } from '@/types/sdk'

import { BaseApiClient } from '../BaseApiClient'

export class AnthropicAPIClient extends BaseApiClient<
  Anthropic,
  AnthropicSdkParams,
  AnthropicSdkRawOutput,
  AnthropicSdkRawChunk,
  AnthropicSdkMessageParam,
  ToolUseBlock,
  ToolUnion
> {
  constructor(provider: Provider) {
    super(provider)
  }

  async getSdkInstance(): Promise<Anthropic> {
    if (this.sdkInstance) {
      return this.sdkInstance
    }

    this.sdkInstance = new Anthropic({
      apiKey: this.getApiKey(),
      baseURL: this.getBaseURL(),
      dangerouslyAllowBrowser: true,
      defaultHeaders: {
        'anthropic-beta': 'output-128k-2025-02-19'
      }
    })
    return this.sdkInstance
  }

  override async listModels(): Promise<Anthropic.ModelInfo[]> {
    const sdk = await this.getSdkInstance()
    const response = await sdk.models.list()
    return response.data
  }
}
