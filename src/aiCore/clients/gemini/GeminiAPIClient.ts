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
import { fetch } from 'expo/fetch'

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
    const response = await fetch(`${this.getBaseURL()}/v1beta/models?key=${this.apiKey}`, {
      method: 'GET'
    }).then(res => res.json())
    if (!response || !response.models) {
      throw new Error('Failed to fetch models from Gemini API')
    }
    console.log('Gemini models:', response.models)
    return response.models as GeminiModel[]
    // const sdk = await this.getSdkInstance()
    // const response = await sdk.models.list()
    // const models: GeminiModel[] = []

    // for await (const model of response) {
    //   models.push(model)
    // }

    // return models
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
