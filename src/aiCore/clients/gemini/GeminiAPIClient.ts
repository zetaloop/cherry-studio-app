import { GoogleGenAI, Model as GeminiModel, Tool } from '@google/genai'

import { Provider } from '@/types/assistant'
import {
  GeminiSdkMessageParam,
  GeminiSdkParams,
  GeminiSdkRawChunk,
  GeminiSdkRawOutput,
  GeminiSdkToolCall
} from '@/types/sdk'

import { BaseApiClient } from '../BaseApiClient'

export class GeminiAPIClient extends BaseApiClient<
  GoogleGenAI,
  GeminiSdkParams,
  GeminiSdkRawOutput,
  GeminiSdkRawChunk,
  GeminiSdkMessageParam,
  GeminiSdkToolCall,
  Tool
> {
  constructor(provider: Provider) {
    super(provider)
  }

  override async listModels(): Promise<GeminiModel[]> {
    const sdk = await this.getSdkInstance()
    const response = await sdk.models.list()
    const models: GeminiModel[] = []

    for await (const model of response) {
      models.push(model)
    }

    return models
  }

  override async getSdkInstance() {
    if (this.sdkInstance) {
      return this.sdkInstance
    }

    this.sdkInstance = new GoogleGenAI({
      vertexai: false,
      apiKey: this.apiKey,
      httpOptions: { baseUrl: this.getBaseURL() }
    })

    return this.sdkInstance
  }
}
